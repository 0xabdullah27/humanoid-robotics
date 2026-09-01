import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 font-sans">
      <div className="max-w-xl w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-8 shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
          <h1 className="text-xl font-bold tracking-tight">Physical AI & Humanoid Robotics — RAG API</h1>
        </div>

        <p className="text-sm text-zinc-400 mb-6">
          This Next.js service operates purely as the Serverless RAG backend powering the embedded book chatbot.
        </p>

        <div className="space-y-3">
          <h2 className="text-xs uppercase tracking-wider text-zinc-500 font-semibold">Available Endpoints</h2>

          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-3 flex items-center justify-between text-xs">
            <span className="font-mono text-emerald-400">POST /api/chat</span>
            <span className="text-zinc-500">Main RAG query</span>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-3 flex items-center justify-between text-xs">
            <span className="font-mono text-emerald-400">POST /api/chat/start</span>
            <span className="text-zinc-500">Session init</span>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-3 flex items-center justify-between text-xs">
            <span className="font-mono text-cyan-400">GET /api/chat/history/[id]</span>
            <span className="text-zinc-500">Chat history</span>
          </div>

          <Link href="/api/health" className="bg-zinc-900 hover:bg-zinc-800 transition border border-zinc-800 rounded-lg p-3 flex items-center justify-between text-xs block">
            <span className="font-mono text-cyan-400">GET /api/health ↗</span>
            <span className="text-emerald-400">Status & Diagnostics</span>
          </Link>

          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-3 flex items-center justify-between text-xs">
            <span className="font-mono text-emerald-400">POST /api/ingestion</span>
            <span className="text-zinc-500">On-demand re-index</span>
          </div>
        </div>
      </div>
    </main>
  );
}