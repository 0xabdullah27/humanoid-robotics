import { NextRequest, NextResponse } from 'next/server';
import { embedQuery } from '@/lib/embeddings';
import { searchVector, RetrievedChunk } from '@/lib/qdrant';
import { generateRAGAnswer } from '@/lib/llm';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { question, context, selected_text, content_selection, sessionId } = body;

    if (!question || typeof question !== 'string') {
      return NextResponse.json(
        { error: 'Question is required and must be a string.' },
        { status: 400 }
      );
    }

    const activeContext = selected_text || context || (content_selection ? `Section: ${content_selection.source_id}` : undefined);

    let chunks: RetrievedChunk[] = [];

    // 1. Generate embedding with Cohere if configured
    const queryVector = await embedQuery(question);

    // 2. If vector generated, search Qdrant
    if (queryVector) {
      const threshold = parseFloat(process.env.RAG_SIMILARITY_THRESHOLD || '0.5');
      const maxChunks = parseInt(process.env.RAG_MAX_CHUNKS || '6', 10);
      chunks = await searchVector(queryVector, maxChunks, threshold);
    }

    // 3. Generate response with LLM
    const result = await generateRAGAnswer(question, chunks, activeContext);

    return NextResponse.json({
      answer: result.answer,
      citations: result.citations,
      is_from_book: result.is_from_book,
      has_disclaimer: result.has_disclaimer,
      session_id: sessionId || `sess-${Date.now()}`,
      chunks_count: chunks.length,
    });
  } catch (error: any) {
    console.error('API /api/chat error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
