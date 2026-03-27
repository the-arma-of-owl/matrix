'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const router = useRouter();

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [showLoginPass, setShowLoginPass] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [statusLine, setStatusLine] = useState('');

  // Register form
  const [regOpen, setRegOpen] = useState(false);
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPass, setRegPass] = useState('');
  const [regPass2, setRegPass2] = useState('');
  const [showRegPass, setShowRegPass] = useState(false);
  const [strength, setStrength] = useState(0);

  const [toast, setToast] = useState<{ msg: string; err: boolean } | null>(null);
  const [hudTime, setHudTime] = useState('00:00:00');

  // ── Matrix Rain ──
  useEffect(() => {
    const C = canvasRef.current;
    if (!C) return;
    const X = C.getContext('2d')!;
    const CH = 'アイウカキクケサシスセソABCDEFGHJKLMN0123456789@#$%&<>{}';
    let cols: number, drops: number[];
    const resize = () => {
      C.width = window.innerWidth; C.height = window.innerHeight;
      cols = Math.floor(window.innerWidth / 16);
      drops = Array(cols).fill(1);
    };
    const draw = () => {
      X.fillStyle = 'rgba(0,0,0,0.05)'; X.fillRect(0, 0, C.width, C.height);
      for (let i = 0; i < cols; i++) {
        const r = Math.random();
        const ch = CH[Math.floor(Math.random() * CH.length)];
        X.fillStyle = r > 0.97 ? '#e0ffe0' : r > 0.85 ? '#00ff41' : `rgba(0,${Math.floor(160 + r * 95)},${Math.floor(r * 25)},${0.25 + r * 0.4})`;
        X.font = '13px Share Tech Mono, monospace';
        X.fillText(ch, i * 16, drops[i] * 16);
        if (drops[i] * 16 > C.height && Math.random() > 0.972) drops[i] = 0;
        drops[i]++;
      }
    };
    resize();
    window.addEventListener('resize', resize);
    const id = setInterval(draw, 38);
    return () => { clearInterval(id); window.removeEventListener('resize', resize); };
  }, []);

  // ── Clock ──
  useEffect(() => {
    const id = setInterval(() => {
      const n = new Date();
      setHudTime([n.getHours(), n.getMinutes(), n.getSeconds()].map(v => String(v).padStart(2, '0')).join(':'));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  // ── Toast ──
  const showToast = (msg: string, err = false) => {
    setToast({ msg, err });
    setTimeout(() => setToast(null), 3200);
  };

  // ── Password Strength ──
  const calcStrength = (v: string) => {
    let s = 0;
    if (v.length >= 8) s++;
    if (/[A-Z]/.test(v)) s++;
    if (/[0-9]/.test(v)) s++;
    if (/[^A-Za-z0-9]/.test(v)) s++;
    setStrength(s);
  };

  // ── Login ──
  const handleLogin = () => {
    if (!loginEmail || !loginPass) { showToast('Tüm alanları doldur', true); return; }
    setLoginLoading(true);
    setStatusLine('> Kimlik doğrulanıyor...');
    setTimeout(() => setStatusLine('> Şifreleme kontrol ediliyor...'), 700);
    setTimeout(() => setStatusLine('> Erişim onaylandı.'), 1400);
    setTimeout(() => router.push('/dashboard'), 2000);
  };

  // ── Register ──
  const handleRegister = () => {
    if (!regName || !regEmail || !regPass || !regPass2) { showToast('Tüm alanları doldur', true); return; }
    if (regPass !== regPass2) { showToast('Şifreler eşleşmiyor', true); return; }
    if (regPass.length < 8) { showToast('Şifre en az 8 karakter', true); return; }
    setStatusLine('> Ajan profili oluşturuluyor...');
    setTimeout(() => { setStatusLine('> Kayıt başarılı.'); setTimeout(() => router.push('/dashboard'), 1000); }, 1400);
  };

  const strengthColors = ['', '#ff0040', '#ffaa00', '#ffaa00', '#00ff41'];
  const strengthLabel = ['', 'ZAYIF', 'ZAYIF', 'ORTA', 'GÜÇLÜ'];

  return (
    <>
      {/* Google Font */}
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@700;900&display=swap');`}</style>

      <div style={{ fontFamily: "'Share Tech Mono', monospace", background: '#000', minHeight: '100vh', color: '#00ff41', overflowX: 'hidden' }}>

        {/* Rain */}
        <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, zIndex: 0 }} />

        {/* Overlays */}
        <div style={{ position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none', background: 'radial-gradient(ellipse 70% 70% at 50% 50%, transparent 30%, rgba(0,0,0,0.84) 100%)' }} />
        <div style={{ position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none', background: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.04) 2px,rgba(0,0,0,0.04) 4px)' }} />

        {/* HUD corners — minimal */}
        <div style={{ position: 'fixed', top: 14, left: 18, zIndex: 5, fontSize: '0.5rem', letterSpacing: '0.12em', color: 'rgba(0,255,65,0.3)', lineHeight: 1.7 }}>
          MATRIX_AUTH<br />{hudTime}
        </div>
        <div style={{ position: 'fixed', top: 14, right: 18, zIndex: 5, fontSize: '0.5rem', letterSpacing: '0.12em', color: 'rgba(0,255,65,0.3)', textAlign: 'right', lineHeight: 1.7 }}>
          NODE: NEO-7<br />ONLINE
        </div>

        {/* Main */}
        <div style={{ position: 'relative', zIndex: 10, maxWidth: 400, margin: '0 auto', padding: '2.5rem 1rem 3rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.2rem' }}>

          {/* Logo */}
          <div style={{ textAlign: 'center', marginBottom: '0.4rem' }}>
            <div style={{ fontFamily: "'Orbitron',monospace", fontWeight: 900, fontSize: '1.4rem', letterSpacing: '0.22em', color: '#00ff41', textShadow: '0 0 12px rgba(0,255,65,0.55),0 0 28px rgba(0,255,65,0.2)' }}>
              MATRIX // GİRİŞ
            </div>
          </div>

          {/* Panel */}
          <div style={{ width: '100%', background: 'rgba(2,14,6,0.92)', border: '1px solid rgba(0,255,65,0.28)', padding: '2rem 2rem 1.6rem', position: 'relative', boxShadow: '0 0 40px rgba(0,0,0,0.8)' }}>
            {/* Corner brackets */}
            {[{ top: -1, left: -1, borderTop: '2px solid #00ff41', borderLeft: '2px solid #00ff41' },
              { top: -1, right: -1, borderTop: '2px solid #00ff41', borderRight: '2px solid #00ff41' },
              { bottom: -1, left: -1, borderBottom: '2px solid #00ff41', borderLeft: '2px solid #00ff41' },
              { bottom: -1, right: -1, borderBottom: '2px solid #00ff41', borderRight: '2px solid #00ff41' }]
              .map((s, i) => <div key={i} style={{ position: 'absolute', width: 20, height: 20, ...s }} />)}

            {/* Email */}
            <Field label="E-POSTA">
              <input type="email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)}
                placeholder="neo@matrix.io" autoComplete="email"
                style={inputStyle} onFocus={e => (e.target.style.borderColor = 'rgba(0,255,65,0.65)')} onBlur={e => (e.target.style.borderColor = 'rgba(0,255,65,0.28)')} />
            </Field>

            {/* Password */}
            <Field label="ŞİFRE">
              <div style={{ position: 'relative' }}>
                <input type={showLoginPass ? 'text' : 'password'} value={loginPass} onChange={e => setLoginPass(e.target.value)}
                  placeholder="••••••••" autoComplete="current-password"
                  style={inputStyle} onFocus={e => (e.target.style.borderColor = 'rgba(0,255,65,0.65)')} onBlur={e => (e.target.style.borderColor = 'rgba(0,255,65,0.28)')}
                  onKeyDown={e => e.key === 'Enter' && handleLogin()} />
                <button onClick={() => setShowLoginPass(p => !p)} tabIndex={-1}
                  style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'rgba(0,255,65,0.4)', cursor: 'pointer', fontSize: '0.85rem' }}>
                  {showLoginPass ? '🙈' : '👁'}
                </button>
              </div>
            </Field>

            {/* Login button */}
            <button onClick={handleLogin} disabled={loginLoading}
              style={{ ...btnStyle, marginTop: '0.4rem', opacity: loginLoading ? 0.7 : 1 }}>
              {loginLoading ? '[ DOĞRULANIYOAR... ]' : '[ SİSTEME GİR ]'}
            </button>

            {statusLine && <div style={{ fontSize: '0.62rem', color: 'rgba(0,255,65,0.55)', marginTop: '0.7rem', letterSpacing: '0.08em' }}>{statusLine}</div>}
          </div>

          {/* Register box */}
          <div style={{ width: '100%', background: 'rgba(0,10,4,0.75)', border: '1px solid rgba(0,255,65,0.18)', padding: regOpen ? '1.4rem 2rem' : '1.2rem 2rem', position: 'relative', transition: 'padding 0.3s' }}>
            <div style={{ textAlign: 'center', marginBottom: regOpen ? '1rem' : 0 }}>
              <button onClick={() => setRegOpen(o => !o)}
                style={{ background: 'none', border: '1px solid rgba(0,255,65,0.25)', color: 'rgba(0,255,65,0.55)', fontFamily: "'Share Tech Mono',monospace", fontSize: '0.62rem', letterSpacing: '0.12em', cursor: 'pointer', padding: '0.4rem 1rem', transition: 'all 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#00ff41')} onMouseLeave={e => (e.currentTarget.style.color = 'rgba(0,255,65,0.55)')}>
                HESAP OLUŞTUR {regOpen ? '▲' : '▼'}
              </button>
            </div>

            {regOpen && (
              <div>
                <Field label="KOD ADI">
                  <input type="text" value={regName} onChange={e => setRegName(e.target.value)} placeholder="Neo, Morpheus..." style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = 'rgba(0,255,65,0.65)')} onBlur={e => (e.target.style.borderColor = 'rgba(0,255,65,0.28)')} />
                </Field>
                <Field label="E-POSTA">
                  <input type="email" value={regEmail} onChange={e => setRegEmail(e.target.value)} placeholder="neo@matrix.io" style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = 'rgba(0,255,65,0.65)')} onBlur={e => (e.target.style.borderColor = 'rgba(0,255,65,0.28)')} />
                </Field>
                <Field label="ŞİFRE">
                  <div style={{ position: 'relative' }}>
                    <input type={showRegPass ? 'text' : 'password'} value={regPass}
                      onChange={e => { setRegPass(e.target.value); calcStrength(e.target.value); }}
                      placeholder="Min. 8 karakter" style={inputStyle}
                      onFocus={e => (e.target.style.borderColor = 'rgba(0,255,65,0.65)')} onBlur={e => (e.target.style.borderColor = 'rgba(0,255,65,0.28)')} />
                    <button onClick={() => setShowRegPass(p => !p)} tabIndex={-1}
                      style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'rgba(0,255,65,0.4)', cursor: 'pointer', fontSize: '0.85rem' }}>
                      {showRegPass ? '🙈' : '👁'}
                    </button>
                  </div>
                  {/* Strength bars */}
                  {regPass && (
                    <div style={{ display: 'flex', gap: 3, marginTop: 5 }}>
                      {[1, 2, 3, 4].map(i => (
                        <div key={i} style={{ flex: 1, height: 2, borderRadius: 1, background: i <= strength ? strengthColors[strength] : 'rgba(0,255,65,0.12)', transition: 'background 0.3s' }} />
                      ))}
                    </div>
                  )}
                  {regPass && <div style={{ fontSize: '0.55rem', color: strengthColors[strength], marginTop: 3, letterSpacing: '0.1em' }}>{strengthLabel[strength]}</div>}
                </Field>
                <Field label="ŞİFRE TEKRAR">
                  <input type="password" value={regPass2} onChange={e => setRegPass2(e.target.value)} placeholder="Şifreyi tekrar gir" style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = 'rgba(0,255,65,0.65)')} onBlur={e => (e.target.style.borderColor = 'rgba(0,255,65,0.28)')} />
                </Field>
                <button onClick={handleRegister} style={{ ...btnStyle, marginTop: '0.4rem', borderColor: 'rgba(0,255,65,0.55)', color: 'rgba(0,255,65,0.85)' }}>
                  [ KAYIT OL ]
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Toast */}
        {toast && (
          <div style={{
            position: 'fixed', bottom: '1.8rem', left: '50%', transform: 'translateX(-50%)',
            background: 'rgba(0,12,4,0.97)', border: `1px solid ${toast.err ? 'rgba(255,0,64,0.6)' : 'rgba(0,255,65,0.28)'}`,
            padding: '0.55rem 1.4rem', fontSize: '0.72rem', letterSpacing: '0.08em', zIndex: 999,
            color: toast.err ? '#ff0040' : '#00ff41', whiteSpace: 'nowrap',
            boxShadow: '0 0 12px rgba(0,255,65,0.3)'
          }}>
            {toast.err ? '⚠ ' : ''}{toast.msg}
          </div>
        )}
      </div>
    </>
  );
}

// ── Helper Components ──
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <div style={{ fontSize: '0.55rem', letterSpacing: '0.22em', color: 'rgba(0,255,65,0.4)', marginBottom: '0.35rem' }}>{label}</div>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%', background: 'rgba(0,18,6,0.7)', border: '1px solid rgba(0,255,65,0.28)',
  color: '#00ff41', fontFamily: "'Share Tech Mono', monospace", fontSize: '0.82rem',
  padding: '0.65rem 0.9rem', outline: 'none', letterSpacing: '0.06em', transition: 'border-color 0.25s',
  WebkitAppearance: 'none', borderRadius: 0,
};

const btnStyle: React.CSSProperties = {
  width: '100%', padding: '0.8rem', background: 'rgba(0,255,65,0.06)',
  border: '1px solid #00ff41', color: '#00ff41', fontFamily: "'Orbitron', monospace",
  fontSize: '0.72rem', letterSpacing: '0.22em', cursor: 'pointer', transition: 'all 0.25s',
};
