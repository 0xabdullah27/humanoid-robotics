import { NextResponse } from 'next/server';

export async function POST() {
  const sessionId = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  return NextResponse.json({
    session_id: sessionId,
    created_at: new Date().toISOString(),
  });
}
