import { NextResponse } from 'next/server';

/**
 * Bu route artık opsiyonel.
 * OracleChatWidget, RAG API'sine (http://localhost:8000) doğrudan bağlanır.
 *
 * Eğer localhost:8000 kapalıyken bile çalışmasını istersen buraya fallback yazabilirsin.
 */
export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    // Doğrudan RAG backend'e proxy
    const askRes = await fetch('http://localhost:8000/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: message }),
    });

    if (!askRes.ok) {
      return NextResponse.json({ reply: 'Oracle bağlantısı kurulamadı.' }, { status: 502 });
    }

    const { task_id } = await askRes.json();
    return NextResponse.json({ task_id });

  } catch {
    return NextResponse.json({ reply: 'Sistem hatası.' }, { status: 500 });
  }
}
