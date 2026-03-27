'use client';

import { useState, useRef, useEffect } from 'react';

// ngrok tüneli üzerinden erişilen RAG backend
const RAG_BASE = 'https://uncalcined-gavyn-interspheral.ngrok-free.dev';

// ngrok free tier için gerekli ortak header'lar
const NGROK_HEADERS = {
  'Content-Type': 'application/json',
  'ngrok-skip-browser-warning': 'true',
};

// Bağlantı kontrolü — 3 sn timeout
async function checkHealth(): Promise<boolean> {
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 3000);
    const r = await fetch(`${RAG_BASE}/health`, { signal: ctrl.signal, headers: NGROK_HEADERS });
    clearTimeout(t);
    return r.ok;
  } catch {
    return false;
  }
}
const POLL_INTERVAL = 1500; // ms — her 1.5 sn sonucu kontrol et
const MAX_POLLS = 20;       // maks 30 sn bekle

type Message = {
  role: 'user' | 'oracle';
  text: string;
  loading?: boolean;
};

export default function OracleChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOnline, setIsOnline] = useState<boolean | null>(null); // null = bilinmiyor
  const [messages, setMessages] = useState<Message[]>([
    { role: 'oracle', text: 'Sistem hazır. BES, harcama alışkanlıkların veya yatırım senaryoları hakkında sorularını yaz.' },
  ]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Yeni mesaj gelince otomatik aşağı kaydır
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Widget açılınca health check yap
  useEffect(() => {
    if (!isOpen) return;
    checkHealth().then(ok => setIsOnline(ok));
  }, [isOpen]);

  // ── Mesaj gönder ──
  const sendMessage = async () => {
    const q = input.trim();
    if (!q || isSending) return;

    setInput('');
    setIsSending(true);

    // Kullanıcı mesajını ekle
    setMessages(prev => [...prev, { role: 'user', text: q }]);

    // Yükleniyor placeholder
    const loadingId = Date.now();
    setMessages(prev => [...prev, { role: 'oracle', text: '...', loading: true }]);

    try {
      // 1️⃣ POST /ask → task_id al
      const askRes = await fetch(`${RAG_BASE}/ask`, {
        method: 'POST',
        headers: NGROK_HEADERS,
        body: JSON.stringify({ query: q }),
      });

      if (!askRes.ok) throw new Error(`HTTP ${askRes.status}`);
      const { task_id } = await askRes.json();

      // 2️⃣ GET /result/{task_id} polling
      let polls = 0;
      const poll = async (): Promise<void> => {
        if (polls++ > MAX_POLLS) {
          replaceLoading('Oracle yanıt vermedi. Tekrar dene.');
          setIsSending(false);
          return;
        }

        const res = await fetch(`${RAG_BASE}/result/${task_id}`, { headers: NGROK_HEADERS });
        const data = await res.json();

        if (data.status === 'completed') {
          const answer = data.result ?? data.answer ?? JSON.stringify(data);
          replaceLoading(answer);
          setIsSending(false);
        } else if (data.status === 'failed') {
          replaceLoading('Oracle bir hatayla karşılaştı: ' + (data.error ?? 'bilinmeyen hata'));
          setIsSending(false);
        } else {
          // pending | processing → tekrar polling
          setTimeout(poll, POLL_INTERVAL);
        }
      };

      setTimeout(poll, POLL_INTERVAL);

    } catch (err) {
      replaceLoading('Oracle bağlantısı kurulamadı. Arka uç çalışıyor mu? (localhost:8000)');
      setIsSending(false);
    }
  };

  // Yükleniyor mesajını gerçek cevapla değiştir
  const replaceLoading = (text: string) => {
    setMessages(prev => {
      const idx = [...prev].reverse().findIndex(m => m.loading);
      if (idx === -1) return [...prev, { role: 'oracle', text }];
      const copy = [...prev];
      copy[copy.length - 1 - idx] = { role: 'oracle', text };
      return copy;
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end" style={{ fontFamily: "'Share Tech Mono', monospace" }}>

      {/* ── Sohbet Penceresi ── */}
      {isOpen && (
        <div style={{
          width: 340, height: 460, marginBottom: 12,
          background: 'rgba(2,14,6,0.97)',
          border: `1px solid ${isOnline ? 'rgba(0,255,65,0.35)' : 'rgba(255,60,60,0.3)'}`,
          boxShadow: '0 0 30px rgba(0,255,65,0.12)',
          display: 'flex', flexDirection: 'column',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Tarama çizgisi */}
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
            backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.05) 2px,rgba(0,0,0,0.05) 4px)' }} />

          {/* Başlık */}
          <div style={{ padding: '10px 14px', borderBottom: '1px solid rgba(0,255,65,0.15)',
            background: 'rgba(0,255,65,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 1 }}>
            <span style={{ color: '#00ff41', fontSize: '0.68rem', letterSpacing: '0.2em' }}>
              {'>'} ORACLE // RAG ENGINE
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: '0.5rem', letterSpacing: '0.1em',
                color: isOnline === null ? '#888' : isOnline ? '#00ff41' : '#ff4444' }}>
                {isOnline === null ? 'KONTROL...' : isOnline ? '● ONLINE' : '● OFFLİNE'}
              </span>
              <button onClick={() => setIsOpen(false)}
                style={{ background: 'none', border: 'none', color: 'rgba(0,255,65,0.4)', cursor: 'pointer', fontSize: '0.75rem' }}>
                ✕
              </button>
            </div>
          </div>

          {/* Offline uyarısı */}
          {isOnline === false && (
            <div style={{ padding: '16px 14px', background: 'rgba(255,40,40,0.06)',
              borderBottom: '1px solid rgba(255,40,40,0.2)', zIndex: 1 }}>
              <div style={{ color: '#ff6666', fontSize: '0.66rem', lineHeight: 1.6, letterSpacing: '0.04em' }}>
                ⚠ AI SERVİSİ ÇALIŞMIYOR<br/>
                <span style={{ color: 'rgba(255,100,100,0.6)', fontSize: '0.58rem' }}>
                  Sorumlu arkadaş: AgeSA-code-night-chatbot<br/>
                  reposunu <strong style={{color:'#ff8888'}}>./start.sh</strong> ile başlatmalı<br/>
                  (localhost:8000 üzerinde)
                </span>
              </div>
              <button onClick={() => checkHealth().then(ok => setIsOnline(ok))}
                style={{ marginTop: 8, background: 'none', border: '1px solid rgba(255,60,60,0.4)',
                  color: '#ff8888', fontFamily: "'Share Tech Mono',monospace", fontSize: '0.58rem',
                  padding: '4px 10px', cursor: 'pointer', letterSpacing: '0.1em' }}>
                TEKRAR DENE
              </button>
            </div>
          )}

          {/* Mesajlar */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '12px', display: 'flex', flexDirection: 'column', gap: 10, zIndex: 1 }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  maxWidth: '82%',
                  padding: '8px 10px',
                  fontSize: '0.72rem',
                  lineHeight: 1.6,
                  letterSpacing: '0.03em',
                  ...(msg.role === 'user'
                    ? { background: 'rgba(0,255,65,0.12)', color: '#00ff41', borderLeft: '2px solid #00ff41' }
                    : { background: 'rgba(0,0,0,0.4)', color: msg.loading ? 'rgba(0,255,65,0.4)' : 'rgba(0,255,65,0.85)', borderLeft: '2px solid rgba(0,255,65,0.3)' }
                  )
                }}>
                  {msg.loading ? <BlinkDots /> : msg.text}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{ padding: '8px 12px', borderTop: '1px solid rgba(0,255,65,0.15)', display: 'flex', gap: 8, zIndex: 1, background: 'rgba(0,0,0,0.3)' }}>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder={isSending ? 'Oracle düşünüyor...' : 'Soruyu yaz...'}
              disabled={isSending}
              style={{
                flex: 1, background: 'transparent', border: 'none', outline: 'none',
                color: '#00ff41', fontFamily: "'Share Tech Mono', monospace", fontSize: '0.72rem',
                letterSpacing: '0.04em',
              }}
            />
            <button onClick={sendMessage} disabled={isSending}
              style={{ background: 'none', border: 'none', color: isSending ? 'rgba(0,255,65,0.3)' : '#00ff41', cursor: isSending ? 'default' : 'pointer', fontSize: '0.85rem' }}>
              {isSending ? '⏳' : '▶'}
            </button>
          </div>
        </div>
      )}

      {/* ── Açma Butonu ── */}
      <button
        onClick={() => setIsOpen(o => !o)}
        style={{
          width: 52, height: 52, borderRadius: '50%',
          background: isOpen ? 'rgba(0,255,65,0.15)' : 'rgba(0,20,8,0.95)',
          border: `2px solid ${isOnline === false ? '#ff4444' : '#00ff41'}`,
          color: isOnline === false ? '#ff6666' : '#00ff41',
          fontFamily: "'Orbitron', monospace",
          fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.05em',
          cursor: 'pointer',
          boxShadow: isOnline === false ? '0 0 16px rgba(255,60,60,0.3)' : '0 0 16px rgba(0,255,65,0.35)',
          transition: 'all 0.2s',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
        title={isOnline === false ? 'Oracle AI - Çevrimdışı' : 'Oracle AI (RAG)'}
      >
        {isOpen ? '✕' : 'AI'}
      </button>

    </div>
  );
}

// Yükleniyor animasyonu
function BlinkDots() {
  return (
    <span style={{ display: 'inline-flex', gap: 4, alignItems: 'center' }}>
      {[0, 1, 2].map(i => (
        <span key={i} style={{
          width: 5, height: 5, borderRadius: '50%', background: '#00ff41',
          display: 'inline-block',
          animation: `blink 1.2s ${i * 0.2}s ease-in-out infinite`,
        }} />
      ))}
      <style>{`@keyframes blink { 0%,100%{opacity:0.2} 50%{opacity:1} }`}</style>
    </span>
  );
}
