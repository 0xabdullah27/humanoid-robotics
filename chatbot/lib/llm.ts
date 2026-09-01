import OpenAI from 'openai';
import { RetrievedChunk } from './qdrant';

export interface Citation {
  source_id: string;
  title: string;
  text?: string;
  score?: number;
}

export interface ChatResult {
  answer: string;
  citations: Citation[];
  is_from_book: boolean;
  has_disclaimer: boolean;
}

const SYSTEM_PROMPT = `You are an expert AI assistant specialized in Physical AI, Humanoid Robotics, and the Physical AI Book content.
Answer the user's question accurately, clearly, and concisely based ONLY on the provided context when available.
Always cite your sources using the format [source_id] where relevant.

If the context does not contain sufficient information, you may provide a helpful answer using general robotics knowledge, but you MUST start with:
"Note: This specific information is not in the book index, but based on general robotics principles:"

Keep answers well-structured using markdown headings, bullet points, and code snippets when appropriate.`;

let openaiClient: OpenAI | null = null;

function getOpenAIClient(): OpenAI | null {
  const apiKey =
    process.env.LLM_API_KEY ||
    process.env.OPENROUTER_API_KEY ||
    process.env.OPENAI_API_KEY;

  if (!apiKey || apiKey.trim() === '' || apiKey.includes('your_')) {
    return null;
  }

  const baseURL =
    process.env.LLM_BASE_URL ||
    process.env.LLM_API_BASE ||
    (process.env.OPENROUTER_API_KEY ? 'https://openrouter.ai/api/v1' : undefined);

  return new OpenAI({
    apiKey: apiKey.trim(),
    baseURL: baseURL?.trim() || undefined,
  });
}

export interface ConversationMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export async function generateRAGAnswer(
  messagesOrQuestion: string | ConversationMessage[],
  chunks: RetrievedChunk[],
  selectedContext?: string
): Promise<ChatResult> {
  const client = getOpenAIClient();

  // Normalize input to messages array
  const conversationMessages: ConversationMessage[] = Array.isArray(messagesOrQuestion)
    ? messagesOrQuestion
    : [{ role: 'user', content: messagesOrQuestion }];

  // Deduplicate and extract citations
  const citations: Citation[] = [];
  const seenSources = new Set<string>();

  for (const chunk of chunks) {
    const sourceId = chunk.payload.source_id || 'document';
    if (!seenSources.has(sourceId)) {
      seenSources.add(sourceId);
      citations.push({
        source_id: sourceId,
        title: chunk.payload.title || sourceId,
        text: (chunk.payload.text || '').slice(0, 300),
        score: chunk.score,
      });
    }
  }

  // Format context block
  let formattedContext = '';
  if (selectedContext) {
    formattedContext += `[User Highlighted Context]:\n${selectedContext}\n\n`;
  }

  if (chunks.length > 0) {
    formattedContext += chunks
      .map((c) => `[Source: ${c.payload.source_id || 'docs'} | Title: ${c.payload.title || 'Untitled'}]\n${c.payload.text}`)
      .join('\n\n---\n\n');
  }

  const hasContext = formattedContext.trim().length > 50;

  if (!client) {
    // If no LLM key is configured, provide a helpful mockup response with retrieved citations
    if (hasContext) {
      return {
        answer: `Here is the relevant information retrieved from the robotics book:\n\n${chunks[0]?.payload.text || selectedContext}\n\n*(Connect OPENROUTER_API_KEY or OPENAI_API_KEY in .env.local for full AI synthesis)*`,
        citations: citations,
        is_from_book: true,
        has_disclaimer: false,
      };
    }
    return {
      answer: `I am currently running in offline demonstration mode. To enable live AI answers and book search, please provide your API keys in \`.env.local\`.`,
      citations: [],
      is_from_book: false,
      has_disclaimer: true,
    };
  }

  const model = process.env.LLM_MODEL || 'gpt-4o-mini';

  // Construct complete prompt: System prompt with book context + conversation history
  const systemInstruction = hasContext
    ? `${SYSTEM_PROMPT}\n\n--- BOOK CONTEXT ---\n${formattedContext}\n-------------------`
    : SYSTEM_PROMPT;

  const finalMessages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
    { role: 'system', content: systemInstruction },
    ...conversationMessages.map((m) => ({
      role: m.role as 'system' | 'user' | 'assistant',
      content: m.content,
    })),
  ];

  try {
    const completion = await client.chat.completions.create({
      model: model,
      temperature: 0.3,
      messages: finalMessages,
    });

    const answer = completion.choices[0]?.message?.content || 'No response generated.';
    const isFromBook = hasContext && !answer.toLowerCase().includes('not in the book');

    return {
      answer: answer,
      citations: citations,
      is_from_book: isFromBook,
      has_disclaimer: !isFromBook,
    };
  } catch (error: any) {
    console.error('[LLM] Completion error:', error);
    return {
      answer: `Error generating response: ${error.message || 'LLM service unavailable.'}`,
      citations: citations,
      is_from_book: false,
      has_disclaimer: true,
    };
  }
}
