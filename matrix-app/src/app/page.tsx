'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const [videoEnded, setVideoEnded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(100); // 0–300
  const [audioUnlocked, setAudioUnlocked] = useState(false);

  const router = useRouter();

  // ── Web Audio API kurulumu (ilk kullanıcı etkileşiminde) ──
  const setupAudio = useCallback(() => {
    if (audioUnlocked || !videoRef.current) return;
    try {
      const ctx = new AudioContext();
      const source = ctx.createMediaElementSource(videoRef.current);
      const gain = ctx.createGain();
      gain.gain.value = volume / 100;
      source.connect(gain);
      gain.connect(ctx.destination);
      audioCtxRef.current = ctx;
      gainNodeRef.current = gain;

      // MediaElementSource bağlandıktan sonra video durabilir — hemen tekrar başlat
      videoRef.current.muted = false;
      videoRef.current.play().catch(() => {});

      setAudioUnlocked(true);
      setIsPlaying(true);
    } catch (e) {
      console.warn('AudioContext hatası:', e);
    }
  }, [audioUnlocked, volume]);

  // ── Volume değişince GainNode'u güncelle ──
  useEffect(() => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = volume / 100;
    }
  }, [volume]);

  // ── Oynat / Duraklat ──
  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  // ── Başa Sar ──
  const handleRestart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setVideoEnded(false);
    setIsPlaying(true);
  };

  // ── Son Sahneye Atla (hap sahnesi) ──
  // Video'nun son 3 saniyesine atlar, doğal olarak biter → hap butonları açılır
  const handleSkipToEnd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const dur = videoRef.current.duration;
    if (isNaN(dur)) return;
    videoRef.current.currentTime = Math.max(dur - 3, 0);
    videoRef.current.play();
    setVideoEnded(false);
    setIsPlaying(true);
  };

  const handleRedPill = () => router.push('/login');
  const handleBluePill = () => router.push('/login?pill=blue');

  return (
    <div
      className="relative h-screen w-screen overflow-hidden bg-black"
      onClick={setupAudio}
    >
      {/* ── TAM EKRAN VİDEO ── */}
      <video
        ref={videoRef}
        src="/videos/morpheus.mp4"
        autoPlay
        muted
        playsInline
        onEnded={() => { setVideoEnded(true); setIsPlaying(false); }}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Hafif karartma */}
      <div className="absolute inset-0 z-10 bg-black/20 pointer-events-none" />

      {/* ══════════════════════════════
          KIRMIZI HAP — Sol el
      ══════════════════════════ */}
      <button
        onClick={handleRedPill}
        title="Kırmızı Hap – Hakikati seç"
        className={`absolute z-30 rounded-full transition-all duration-700 ${
          videoEnded ? 'opacity-100 cursor-pointer' : 'opacity-0 pointer-events-none'
        }`}
        style={{
          left: '18%', top: '30%', width: '20%', height: '40%',
          background: videoEnded
            ? 'radial-gradient(ellipse at center, rgba(255,0,0,0.18) 0%, transparent 70%)'
            : 'transparent',
          boxShadow: videoEnded ? '0 0 40px 10px rgba(255,0,0,0.15)' : 'none',
        }}
      >
        {videoEnded && (
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-6 text-red-500 text-xs font-mono tracking-widest whitespace-nowrap animate-pulse">
            KIRMIZI HAP
          </span>
        )}
      </button>

      {/* ══════════════════════════════
          MAVİ HAP — Sağ el
      ══════════════════════════ */}
      <button
        onClick={handleBluePill}
        title="Mavi Hap – Sisteme geri dön"
        className={`absolute z-30 rounded-full transition-all duration-700 ${
          videoEnded ? 'opacity-100 cursor-pointer' : 'opacity-0 pointer-events-none'
        }`}
        style={{
          left: '57%', top: '30%', width: '20%', height: '40%',
          background: videoEnded
            ? 'radial-gradient(ellipse at center, rgba(0,100,255,0.18) 0%, transparent 70%)'
            : 'transparent',
          boxShadow: videoEnded ? '0 0 40px 10px rgba(0,100,255,0.12)' : 'none',
        }}
      >
        {videoEnded && (
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-6 text-blue-400 text-xs font-mono tracking-widest whitespace-nowrap animate-pulse">
            MAVİ HAP
          </span>
        )}
      </button>

      {/* ══════════════════════════════════════════
          ALT KONTROL ÇUBUĞU
      ══════════════════════════════════════════ */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-40 flex items-center gap-4 px-5 py-2 bg-black/70 border border-green-900/60 backdrop-blur-sm font-mono text-xs text-green-600 select-none rounded-sm">

        {/* ▶ / ⏸ Oynat-Duraklat */}
        <button
          onClick={togglePlay}
          className="flex items-center gap-1 hover:text-green-400 transition-colors"
          title={isPlaying ? 'Duraklat' : 'Oynat'}
        >
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 19h4V5H6zm8-14v14h4V5z"/>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
          )}
          {isPlaying ? 'DURAKLAT' : 'OYNAT'}
        </button>

        <div className="w-px h-4 bg-green-900" />

        {/* ⏮ Başa Sar */}
        <button
          onClick={handleRestart}
          className="flex items-center gap-1 hover:text-green-400 transition-colors"
          title="Başa sar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z"/>
          </svg>
          BAŞA SAR
        </button>

        <div className="w-px h-4 bg-green-900" />

        {/* ⏭ Son Sahneye Atla */}
        <button
          onClick={handleSkipToEnd}
          className="flex items-center gap-1 hover:text-yellow-400 text-yellow-600 transition-colors"
          title="Hap seçim sahnesine atla"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 18l8.5-6L6 6v12zm2-8.14L11.03 12 8 14.14V9.86zM16 6h2v12h-2z"/>
          </svg>
          SEÇIM SAHNESINE ATLA
        </button>

        <div className="w-px h-4 bg-green-900" />

        {/* 🔊 Ses + Slider 0–300% */}
        <div className="flex items-center gap-2">
          {!audioUnlocked && (
            <button
              onClick={(e) => { e.stopPropagation(); setupAudio(); }}
              className="hover:text-green-400 text-yellow-600 animate-pulse mr-1"
            >
              🔇
            </button>
          )}
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
          </svg>
          <input
            type="range"
            min={0}
            max={300}
            step={5}
            value={volume}
            onChange={(e) => { e.stopPropagation(); setVolume(Number(e.target.value)); }}
            onClick={(e) => e.stopPropagation()}
            className="w-28 accent-green-500 cursor-pointer"
          />
          <span className={`w-10 text-right font-bold ${volume > 100 ? 'text-yellow-400' : 'text-green-500'}`}>
            %{volume}
          </span>
        </div>

      </div>
    </div>
  );
}
