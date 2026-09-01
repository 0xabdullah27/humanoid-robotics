import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { QdrantClient } from '@qdrant/js-client-rest';
import { CohereClientV2 } from 'cohere-ai';

// Load environment variables from .env.local or .env
const envLocalPath = path.resolve(__dirname, '../.env.local');
const envPath = path.resolve(__dirname, '../.env');
if (fs.existsSync(envLocalPath)) {
  dotenv.config({ path: envLocalPath });
} else if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
}

const QDRANT_URL = process.env.QDRANT_URL;
const QDRANT_API_KEY = process.env.QDRANT_API_KEY;
const COLLECTION_NAME = process.env.QDRANT_COLLECTION_NAME || 'book_content';
const COHERE_API_KEY = process.env.COHERE_API_KEY;
const COHERE_MODEL = process.env.COHERE_EMBEDDING_MODEL || 'embed-english-v3.0';

interface DocumentChunk {
  id: string;
  source_id: string;
  title: string;
  chapter: string;
  section: string;
  text: string;
  file_path: string;
}

function getMarkdownFiles(dir: string): string[] {
  let results: string[] = [];
  if (!fs.existsSync(dir)) return results;

  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getMarkdownFiles(filePath));
    } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
      results.push(filePath);
    }
  }
  return results;
}

function chunkText(content: string, maxTokens = 500, overlap = 50): string[] {
  // Simple token estimator: ~4 chars per token
  const maxChars = maxTokens * 4;
  const overlapChars = overlap * 4;

  const paragraphs = content.split(/\n\n+/);
  const chunks: string[] = [];
  let currentChunk = '';

  for (const para of paragraphs) {
    if ((currentChunk + '\n\n' + para).length > maxChars) {
      if (currentChunk) {
        chunks.push(currentChunk.trim());
        // keep overlap
        currentChunk = currentChunk.slice(-overlapChars) + '\n\n' + para;
      } else {
        chunks.push(para.trim());
        currentChunk = '';
      }
    } else {
      currentChunk = currentChunk ? currentChunk + '\n\n' + para : para;
    }
  }

  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim());
  }

  return chunks.filter((c) => c.length > 30);
}

function extractMetadata(filePath: string, content: string) {
  const titleMatch = content.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1].trim() : path.basename(filePath, path.extname(filePath));

  const relPath = path.relative(path.resolve(__dirname, '../../book-source/docs'), filePath);
  const parts = relPath.split(path.sep);
  const chapter = parts.length > 1 ? parts[0] : 'General';
  const section = parts.length > 2 ? parts[1] : title;

  return { title, chapter, section, source_id: relPath.replace(/\\/g, '/') };
}

async function main() {
  console.log('🚀 Starting Book Ingestion Pipeline...');

  if (!COHERE_API_KEY || COHERE_API_KEY.includes('your_cohere')) {
    console.error('❌ Error: COHERE_API_KEY is not configured in .env.local');
    process.exit(1);
  }

  if (!QDRANT_URL || QDRANT_URL.includes('your-cluster')) {
    console.error('❌ Error: QDRANT_URL is not configured in .env.local');
    process.exit(1);
  }

  const docsDir = path.resolve(__dirname, '../../book-source/docs');
  console.log(`📁 Scanning markdown files from: ${docsDir}`);
  const files = getMarkdownFiles(docsDir);
  console.log(`📄 Found ${files.length} document files.`);

  const chunks: DocumentChunk[] = [];
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf-8');
    const meta = extractMetadata(file, content);
    const textChunks = chunkText(content);

    textChunks.forEach((chunkText, idx) => {
      chunks.push({
        id: `${meta.source_id}_chunk_${idx}`,
        source_id: meta.source_id,
        title: meta.title,
        chapter: meta.chapter,
        section: meta.section,
        text: chunkText,
        file_path: file,
      });
    });
  }

  console.log(`🧩 Created ${chunks.length} total text chunks.`);

  // Initialize clients
  const cohere = new CohereClientV2({ token: COHERE_API_KEY });
  const qdrant = new QdrantClient({
    url: QDRANT_URL,
    apiKey: QDRANT_API_KEY || undefined,
  });

  // Ensure collection exists
  console.log(`🔍 Checking Qdrant collection "${COLLECTION_NAME}"...`);
  const collections = await qdrant.getCollections();
  const exists = collections.collections.some((c) => c.name === COLLECTION_NAME);

  if (!exists) {
    console.log(`✨ Creating collection "${COLLECTION_NAME}" with 1024-dim Cosine vectors...`);
    await qdrant.createCollection(COLLECTION_NAME, {
      vectors: {
        size: 1024,
        distance: 'Cosine',
      },
    });
  }

  // Embed and Upsert in Batches
  const BATCH_SIZE = 20;
  console.log(`⚡ Generating embeddings & uploading to Qdrant in batches of ${BATCH_SIZE}...`);

  for (let i = 0; i < chunks.length; i += BATCH_SIZE) {
    const batch = chunks.slice(i, i + BATCH_SIZE);
    const texts = batch.map((c) => c.text);

    console.log(`Processing batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(chunks.length / BATCH_SIZE)}...`);

    const embedRes = await cohere.embed({
      texts: texts,
      model: COHERE_MODEL,
      inputType: 'search_document',
      embeddingTypes: ['float'],
    });

    const embeddings = embedRes.embeddings.float || [];

    const points = batch.map((chunk, idx) => {
      // Deterministic integer ID or UUID for Qdrant
      const numericId = Math.abs(
        chunk.id.split('').reduce((hash, char) => (hash << 5) - hash + char.charCodeAt(0), 0)
      );

      return {
        id: numericId,
        vector: embeddings[idx],
        payload: {
          chunk_id: chunk.id,
          source_id: chunk.source_id,
          title: chunk.title,
          chapter: chunk.chapter,
          section: chunk.section,
          text: chunk.text,
        },
      };
    });

    await qdrant.upsert(COLLECTION_NAME, {
      points: points,
    });

    // Rate limit breather
    await new Promise((resolve) => setTimeout(resolve, 600));
  }

  console.log('✅ Ingestion completed successfully!');
}

main().catch((err) => {
  console.error('❌ Ingestion failed:', err);
  process.exit(1);
});
