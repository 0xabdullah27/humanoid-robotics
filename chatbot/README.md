# Vectra Physical AI — RAG Copilot Backend

> Serverless Retrieval-Augmented Generation (RAG) backend API powering the intelligent AI Copilot widget for the **Vectra Physical AI & Humanoid Robotics** curriculum.

---

## 🏗️ Architecture

```
                       +-----------------------------------+
                       |    Client Query / Highlight Text  |
                       +-----------------+-----------------+
                                         |
                                         v
                       +-----------------------------------+
                       |  Next.js 16 Edge / Serverless API |
                       |        (/api/chat Endpoint)       |
                       +--------+-----------------+--------+
                                |                 |
         1. Vector Search Query |                 | 3. Augmented Context + Prompt
                                v                 v
         +-----------------------------+   +-----------------------------+
         |     Qdrant Vector DB        |   |   Universal LLM Provider    |
         | (1024-dim Cohere Embeddings)|   | (OpenRouter / OpenAI / Groq)|
         +-----------------------------+   +--------------+--------------+
                                                          |
                                                          | 4. Grounded Answer + Citations
                                                          v
                                           +-----------------------------+
                                           |      JSON Chat Response     |
                                           +-----------------------------+
```

---

## 📦 Stack & Integrations

- **Framework**: Next.js 16 (App Router, TypeScript 5, React 19)
- **Vector Database**: Qdrant Vector Cloud (`@qdrant/js-client-rest`)
- **Embeddings**: Cohere API (`embed-english-v3.0` / 1024-dimension dense vectors)
- **LLM Engine**: OpenAI / OpenRouter API (`openai` SDK compatible)
- **Security**: In-memory token-bucket rate limiting (`lib/rateLimit.ts`) & granular CORS middleware (`lib/cors.ts`)
- **Ingestion**: Automated Markdown parser with hierarchical chunking (`scripts/ingest.ts`)

---

## ⚙️ Environment Setup

1. Copy the sample environment file:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in your credentials in `.env.local`:
   ```ini
   # Qdrant Vector Database
   QDRANT_URL=https://your-cluster.qdrant.io:6333
   QDRANT_API_KEY=your_qdrant_api_key
   QDRANT_COLLECTION_NAME=book_content

   # Cohere Embeddings
   COHERE_API_KEY=your_cohere_api_key
   COHERE_EMBEDDING_MODEL=embed-english-v3.0

   # Universal LLM Provider
   LLM_API_KEY=your_openrouter_or_openai_api_key
   LLM_BASE_URL=https://openrouter.ai/api/v1
   LLM_MODEL=openai/gpt-4o-mini

   # Security & CORS
   ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3005,https://0xabdullah27.github.io
   RATE_LIMIT_PER_MINUTE=20
   ADMIN_INGEST_KEY=your_secret_admin_ingest_key
   ```

---

## 🚀 Running the Service

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Book Ingestion Pipeline
To chunk and index all book chapters and lessons into Qdrant:
```bash
npm run ingest
```

### 3. Start Local Development Server
```bash
npm run dev
# Server starts at http://localhost:3000
```

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## 📡 API Reference

### 1. `POST /api/chat`
Handles multi-turn RAG conversations with document citations.

**Request Body:**
```json
{
  "messages": [
    { "role": "user", "content": "How do I setup QoS profiles in ROS 2 Jazzy?" }
  ],
  "context": "Optional user-highlighted text from the documentation"
}
```

**Response (`200 OK`):**
```json
{
  "reply": "In ROS 2 Jazzy, QoS profiles dictate how topics handle message delivery...",
  "citations": [
    {
      "title": "Lesson 5: Quality of Service (QoS)",
      "url": "/docs/Part-1-ROS2-Foundation/ros2-nodes-topics-services/qos-configuration",
      "score": 0.89
    }
  ]
}
```

### 2. `GET /api/health`
Health probe and system diagnostic endpoint.

**Response (`200 OK`):**
```json
{
  "status": "healthy",
  "qdrant": "connected",
  "llm_provider": "online",
  "timestamp": "2026-09-01T22:30:00.000Z"
}
```

### 3. `POST /api/ingestion`
Protected endpoint for on-demand re-indexing. Requires `x-admin-key: <ADMIN_INGEST_KEY>`.

---

## 🛡️ Security Best Practices

- **Rate Limiting**: Built-in sliding-window limiter prevents API abuse.
- **CORS Protection**: Only requests originating from configured `ALLOWED_ORIGINS` are processed with valid headers.
- **Input Sanitization**: Multi-turn history is capped at 20 messages and strictly typed to prevent prompt injection.
