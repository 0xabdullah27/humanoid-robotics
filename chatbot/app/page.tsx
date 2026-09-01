import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#000', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '560px', width: '100%', backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '16px', padding: '32px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#10b981', display: 'inline-block' }}></span>
          <h1 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>Physical AI & Humanoid Robotics — RAG API</h1>
        </div>

        <p style={{ fontSize: '14px', color: '#a1a1aa', marginBottom: '24px', lineHeight: '1.5' }}>
          This Next.js service operates purely as the Serverless RAG backend powering the embedded book chatbot.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h2 style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#71717a', margin: 0, fontWeight: 600 }}>Available Endpoints</h2>

          <div style={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '13px' }}>
            <span style={{ fontFamily: 'monospace', color: '#34d399' }}>POST /api/chat</span>
            <span style={{ color: '#71717a', fontSize: '12px' }}>Stateless Multi-turn RAG Query</span>
          </div>

          <Link href="/api/health" style={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '13px', textDecoration: 'none' }}>
            <span style={{ fontFamily: 'monospace', color: '#38bdf8' }}>GET /api/health ↗</span>
            <span style={{ color: '#34d399', fontSize: '12px' }}>Status & Diagnostics</span>
          </Link>

          <div style={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '13px' }}>
            <span style={{ fontFamily: 'monospace', color: '#34d399' }}>POST /api/ingestion</span>
            <span style={{ color: '#71717a', fontSize: '12px' }}>On-demand re-index</span>
          </div>
        </div>
      </div>
    </main>
  );
}