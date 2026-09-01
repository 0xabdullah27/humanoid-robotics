import { NextRequest, NextResponse } from 'next/server';
import * as fs from 'fs';
import * as path from 'path';
import { embedDocuments } from '@/lib/embeddings';
import { getQdrantClient, ensureCollection } from '@/lib/qdrant';
import { getCorsHeaders, handleOptions } from '@/lib/cors';

export async function OPTIONS(req: NextRequest) {
  return handleOptions(req);
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
  const maxChars = maxTokens * 4;
  const overlapChars = overlap * 4;
  const paragraphs = content.split(/\n\n+/);
  const chunks: string[] = [];
  let currentChunk = '';

  for (const para of paragraphs) {
    if ((currentChunk + '\n\n' + para).length > maxChars) {
      if (currentChunk) {
        chunks.push(currentChunk.trim());
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

export async function POST(req: NextRequest) {
  const corsHeaders = getCorsHeaders(req);

  // Admin Key Protection
  const adminKey = process.env.ADMIN_INGEST_KEY;
  if (adminKey && adminKey.trim() !== '') {
    const providedKey =
      req.headers.get('x-admin-key') ||
      req.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
    if (providedKey !== adminKey) {
      return NextResponse.json(
        { error: 'Unauthorized: A valid "x-admin-key" or "Authorization: Bearer <key>" is required to trigger ingestion.' },
        { status: 401, headers: corsHeaders }
      );
    }
  }

  try {
    const docsDir = path.resolve(process.cwd(), '../book-source/docs');
    const files = getMarkdownFiles(docsDir);

    if (files.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'No markdown documentation files found in docs directory.',
        },
        { status: 404, headers: corsHeaders }
      );
    }

    const allChunks: Array<{ id: string; source_id: string; title: string; chapter: string; section: string; text: string; file_path: string }> = [];

    for (const filePath of files) {
      const content = fs.readFileSync(filePath, 'utf-8');
      const titleMatch = content.match(/^#\s+(.+)$/m);
      const title = titleMatch ? titleMatch[1].trim() : path.basename(filePath, path.extname(filePath));
      const relPath = path.relative(docsDir, filePath).replace(/\\/g, '/');
      const parts = relPath.split('/');
      const chapter = parts.length > 1 ? parts[0] : 'General';
      const section = parts.length > 2 ? parts[1] : title;

      const rawChunks = chunkText(content);
      rawChunks.forEach((chunk, idx) => {
        allChunks.push({
          id: `${relPath.replace(/\//g, '_')}_chunk_${idx}`,
          source_id: relPath,
          title,
          chapter,
          section,
          text: chunk,
          file_path: relPath,
        });
      });
    }

    const client = getQdrantClient();
    if (!client) {
      return NextResponse.json(
        { error: 'Qdrant is not configured. Please set QDRANT_URL and QDRANT_API_KEY in .env.local.' },
        { status: 500, headers: corsHeaders }
      );
    }

    const collectionName = process.env.QDRANT_COLLECTION_NAME || 'book_content';
    await ensureCollection(collectionName, 1024);

    const batchSize = 32;
    let indexedCount = 0;

    for (let i = 0; i < allChunks.length; i += batchSize) {
      const batch = allChunks.slice(i, i + batchSize);
      const texts = batch.map((c) => c.text);
      const vectors = await embedDocuments(texts);

      if (vectors && vectors.length > 0) {
        const points = batch.map((chunk, idx) => ({
          id: i + idx + 1,
          vector: vectors[idx],
          payload: {
            source_id: chunk.source_id,
            title: chunk.title,
            chapter: chunk.chapter,
            section: chunk.section,
            text: chunk.text,
            file_path: chunk.file_path,
          },
        }));

        await client.upsert(collectionName, {
          wait: true,
          points,
        });
        indexedCount += points.length;
      }
    }

    return NextResponse.json(
      {
        success: true,
        files_processed: files.length,
        chunks_indexed: indexedCount,
        collection: collectionName,
      },
      { status: 200, headers: corsHeaders }
    );
  } catch (error: any) {
    console.error('Ingestion API error:', error);
    return NextResponse.json(
      { error: error.message || 'Ingestion failed' },
      { status: 500, headers: corsHeaders }
    );
  }
}
