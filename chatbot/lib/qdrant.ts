import { QdrantClient } from '@qdrant/js-client-rest';

export interface RetrievedChunk {
  id: string | number;
  score: number;
  payload: {
    text?: string;
    source_id?: string;
    title?: string;
    chapter?: string;
    section?: string;
    url?: string;
    [key: string]: any;
  };
}

let qdrantClient: QdrantClient | null = null;

export function getQdrantClient(): QdrantClient | null {
  const url = process.env.QDRANT_URL;
  if (!url || url.includes('your-cluster')) {
    return null;
  }

  if (!qdrantClient) {
    const apiKey = process.env.QDRANT_API_KEY || undefined;
    qdrantClient = new QdrantClient({
      url: url,
      apiKey: apiKey,
      checkCompatibility: false,
    });
  }

  return qdrantClient;
}

export const COLLECTION_NAME = process.env.QDRANT_COLLECTION_NAME || 'book_content';

export async function ensureCollection(
  collectionName: string = COLLECTION_NAME,
  vectorSize: number = 1024
): Promise<boolean> {
  const client = getQdrantClient();
  if (!client) return false;

  try {
    const status = await client.collectionExists(collectionName);

    if (!status.exists) {
      await client.createCollection(collectionName, {
        vectors: {
          size: vectorSize,
          distance: 'Cosine',
        },
      });
      console.log(`[Qdrant] Created collection ${collectionName}`);
    }
    return true;
  } catch (error) {
    console.error('[Qdrant] Error ensuring collection:', error);
    return false;
  }
}

/**
 * Searches Qdrant for similar chunks matching the query vector
 */
export async function searchVector(
  queryVector: number[],
  limit = 8,
  scoreThreshold = 0.5
): Promise<RetrievedChunk[]> {
  const client = getQdrantClient();
  if (!client) {
    console.warn('[Qdrant] Client not configured. Running in fallback mode.');
    return [];
  }

  try {
    const response = await client.query(COLLECTION_NAME, {
      query: queryVector,
      limit: limit,
      score_threshold: scoreThreshold,
      with_payload: true,
    });

    const points = response.points || [];

    return points.map((r: any) => ({
      id: r.id,
      score: r.score,
      payload: (r.payload as RetrievedChunk['payload']) || {},
    }));
  } catch (error) {
    console.error('[Qdrant] Search error:', error);
    return [];
  }
}
