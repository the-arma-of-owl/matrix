import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    /* 
      RAG AI GELİŞTİRİCİSİ İÇİN: 
      Eğer front-end widgetından Next.js API'sine istek gelirse, bunu senin 
      arka planda çalışan localhost AI'ına proxy (köprü) olarak atabilirsin.
      (ÖRN: http://127.0.0.1:8000/ask)
      Veya direkt Next.js üzerinden LangChain.js kurup RAG'ı burada da yapabilirsin!
    */

    // ŞİMDİLİK MOCK (Sahte) CEVAP:
    let reply = "Kelimlerinin anlamı Matrix'in içinde kayboldu. Tekrar et.";
    if (message.toLowerCase().includes("bes")) {
        reply = "BES seni kurtarabilir, ancak Doom Spending seni boğuyor.";
    }

    return NextResponse.json({ reply });
  } catch (error) {
    return NextResponse.json({ error: 'System Failure' }, { status: 500 });
  }
}
