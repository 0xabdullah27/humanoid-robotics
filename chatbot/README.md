# Physical AI & Humanoid Robotics — Next.js RAG API Backend

A lightweight Next.js Serverless RAG backend providing vector search, embeddings, session memory, and LLM question answering for the Physical AI & Humanoid Robotics book.

---

## 📡 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/chat` | Stateless Multi-turn RAG (accepts up to 20 conversation messages) |
| `GET` | `/api/health` | Service diagnostics and status probe |
| `POST` | `/api/ingestion` | On-demand document chunking & re-indexing |

---

## 🚀 Environment Configuration

Create a `.env.local` file:

```ini
COHERE_API_KEY=your_cohere_api_key
QDRANT_URL=https://your-cluster.qdrant.tech:6333
QDRANT_API_KEY=your_qdrant_api_key
OPENROUTER_API_KEY=your_openrouter_or_openai_key
LLM_MODEL=openai/gpt-4o-mini
```

---

## 🛠️ Commands

```bash
# Run Development Server (Port 3001)
npm run dev

# Run Book Ingestion Pipeline
npm run ingest

# Build for Production / Vercel
npm run build
```
