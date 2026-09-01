import { NextRequest, NextResponse } from 'next/server';
import { embedQuery } from '@/lib/embeddings';
import { searchVector, RetrievedChunk } from '@/lib/qdrant';
import { generateRAGAnswer, ConversationMessage } from '@/lib/llm';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, question, context, selected_text, content_selection } = body;

    // Normalize messages array
    let conversationMessages: ConversationMessage[] = [];

    if (Array.isArray(messages) && messages.length > 0) {
      conversationMessages = messages.map((m: any) => ({
        role: (m.role === 'assistant' || m.role === 'bot') ? 'assistant' : 'user',
        content: String(m.content || ''),
      }));
    } else if (question && typeof question === 'string') {
      conversationMessages = [{ role: 'user', content: question }];
    } else {
      return NextResponse.json(
        { error: 'A "messages" array or "question" string is required.' },
        { status: 400 }
      );
    }

    // Limit conversation history to the last 20 messages (10 user + 10 assistant)
    const MAX_HISTORY_MESSAGES = 20;
    const recentMessages = conversationMessages.slice(-MAX_HISTORY_MESSAGES);

    // Extract the latest user query to embed and search in Qdrant
    const latestUserMessage = [...recentMessages].reverse().find((m) => m.role === 'user');
    const latestQuery = latestUserMessage?.content || question || '';

    const activeContext = selected_text || context || (content_selection ? `Section: ${content_selection.source_id}` : undefined);

    let chunks: RetrievedChunk[] = [];

    // 1. Generate embedding for the latest user question with Cohere
    if (latestQuery) {
      const queryVector = await embedQuery(latestQuery);

      // 2. Search Qdrant vector database
      if (queryVector) {
        const threshold = parseFloat(process.env.RAG_SIMILARITY_THRESHOLD || '0.5');
        const maxChunks = parseInt(process.env.RAG_MAX_CHUNKS || '6', 10);
        chunks = await searchVector(queryVector, maxChunks, threshold);
      }
    }

    // 3. Generate response with LLM passing the full conversation context
    const result = await generateRAGAnswer(recentMessages, chunks, activeContext);

    return NextResponse.json({
      answer: result.answer,
      citations: result.citations,
      is_from_book: result.is_from_book,
      has_disclaimer: result.has_disclaimer,
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
