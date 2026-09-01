import { NextResponse } from 'next/server';
import { getQdrantClient, COLLECTION_NAME } from '@/lib/qdrant';

export async function GET() {
  const qdrantConfigured = Boolean(process.env.QDRANT_URL && !process.env.QDRANT_URL.includes('your-cluster'));
  const cohereConfigured = Boolean(process.env.COHERE_API_KEY && !process.env.COHERE_API_KEY.includes('your_cohere'));
  const llmConfigured = Boolean(
    (process.env.OPENROUTER_API_KEY && !process.env.OPENROUTER_API_KEY.includes('your_')) ||
    (process.env.OPENAI_API_KEY && !process.env.OPENAI_API_KEY.includes('your_'))
  );

  let qdrantStatus = 'unconfigured';
  if (qdrantConfigured) {
    try {
      const client = getQdrantClient();
      if (client) {
        await client.getCollections();
        qdrantStatus = 'connected';
      }
    } catch (e: any) {
      qdrantStatus = `error: ${e.message}`;
    }
  }

  return NextResponse.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    services: {
      qdrant: { configured: qdrantConfigured, status: qdrantStatus, collection: COLLECTION_NAME },
      cohere: { configured: cohereConfigured, model: process.env.COHERE_EMBEDDING_MODEL || 'embed-english-v3.0' },
      llm: { configured: llmConfigured, model: process.env.LLM_MODEL || 'gpt-4o-mini' },
    },
  });
}
