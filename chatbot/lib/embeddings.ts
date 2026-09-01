import { CohereClientV2 } from 'cohere-ai';

let cohereClient: CohereClientV2 | null = null;

function getCohereClient(): CohereClientV2 | null {
  const apiKey = process.env.COHERE_API_KEY;
  if (!apiKey || apiKey.includes('your_cohere')) {
    return null;
  }
  if (!cohereClient) {
    cohereClient = new CohereClientV2({ token: apiKey });
  }
  return cohereClient;
}

/**
 * Generate embedding for a single query using Cohere embed-english-v3.0 (1024-dim)
 */
export async function embedQuery(query: string): Promise<number[] | null> {
  const client = getCohereClient();
  if (!client) {
    console.warn('[Embeddings] COHERE_API_KEY is not configured.');
    return null;
  }

  const model = process.env.COHERE_EMBEDDING_MODEL || 'embed-english-v3.0';

  try {
    const response = await client.embed({
      texts: [query],
      model: model,
      inputType: 'search_query',
      embeddingTypes: ['float'],
    });

    if (response.embeddings && response.embeddings.float && response.embeddings.float.length > 0) {
      return response.embeddings.float[0];
    }
    return null;
  } catch (error) {
    console.error('[Embeddings] Error generating query embedding:', error);
    return null;
  }
}

/**
 * Generate embeddings for batch of documents
 */
export async function embedDocuments(texts: string[], batchSize = 20): Promise<number[][]> {
  const client = getCohereClient();
  if (!client) {
    throw new Error('COHERE_API_KEY is not configured');
  }

  const model = process.env.COHERE_EMBEDDING_MODEL || 'embed-english-v3.0';
  const allEmbeddings: number[][] = [];

  for (let i = 0; i < texts.length; i += batchSize) {
    const batch = texts.slice(i, i + batchSize);
    const response = await client.embed({
      texts: batch,
      model: model,
      inputType: 'search_document',
      embeddingTypes: ['float'],
    });

    if (response.embeddings && response.embeddings.float) {
      allEmbeddings.push(...response.embeddings.float);
    }

    // Small delay between batches to respect rate limits
    if (i + batchSize < texts.length) {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }

  return allEmbeddings;
}
