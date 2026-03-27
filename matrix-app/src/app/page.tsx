'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const [videoEnded, setVideoEnded] = useState(false);
  const [volume, setVolume] = useState(100); // 0–150
  const [isMuted, setIsMuted] = useState(true);
  const [audioUnlocked, setAudioUnlocked] = useState(false);
  const router = useRouter();

  // Web Audio API kurulumu — sesi %150'ye çıkarabilmek için GainNode
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
      videoRef.current.muted = false;
      setIsMuted(false);
      setAudioUnlocked(true);
    } catch (e) {
      console.warn('AudioContext kurulum hatası:', e);
    }
  }, [audioUnlocked, volume]);

  // Ses seviyesi değişince GainNode'u güncelle
  useEffect(() => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = volume / 100;
    }
    if (videoRef.current && !audioUnlocked) {
      videoRef.current.volume = Math.min(volume / 100, 1);
    }
  }, [volume, audioUnlocked]);

  const handleRestart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setVideoEnded(false);
    }
  };

  // Kırmızı hap → login (sistemi hackle / BES yolculuğu)
  const handleRedPill = () => router.push('/login');

  // Mavi hap → Cypher sahnesi (şimdilik de login, ileride farklı akış)
  const handleBluePill = () => router.push('/login?pill=blue');

  return (
    <div
      className="relative h-screen w-screen overflow-hidden bg-black"
      onClick={setupAudio} // İlk tıklamada AudioContext unlock
    >
      {/* ── TAM EKRAN VİDEO ── */}
      <video
        ref={videoRef}
        src="/videos/morpheus.mp4"
        autoPlay
        muted
        playsInline
        onEnded={() => setVideoEnded(true)}
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Hafif karartma */}
      <div className="absolute inset-0 z-10 bg-black/20 pointer-events-none" />

      {/* ══════════════════════════════════════════════════
          GÖRÜNMEZ HAP BUTONLARI — sadece video bitince aktif
          Pozisyonlar: Sol el = kırmızı hap, Sağ el = mavi hap
          (videodan alınan görsel referansa göre ayarlandı)
      ══════════════════════════════════════════════════ */}

      {/* KIRMIZI HAP — Sol el, orta-sol bölge */}
      <button
        onClick={handleRedPill}
        title="Kırmızı Hap – Hakikati seç"
        className={`absolute z-30 rounded-full transition-all duration-700 ${
          videoEnded
            ? 'opacity-100 cursor-pointer'
            : 'opacity-0 pointer-events-none'
        }`}
        style={{
          /* Sol avucun tam üzeri — ekranın %18-%38 yatay, %30-%70 dikey */
          left: '18%',
          top: '30%',
          width: '20%',
          height: '40%',
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

      {/* MAVİ HAP — Sağ el, orta-sağ bölge */}
      <button
        onClick={handleBluePill}
        title="Mavi Hap – Sisteme geri dön"
        className={`absolute z-30 rounded-full transition-all duration-700 ${
          videoEnded
            ? 'opacity-100 cursor-pointer'
            : 'opacity-0 pointer-events-none'
        }`}
        style={{
          /* Sağ avucun tam üzeri — ekranın %57-%77 yatay, %30-%70 dikey */
          left: '57%',
          top: '30%',
          width: '20%',
          height: '40%',
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

      {/* ══════════════════════════════════════════════════
          ALT KONTROL ÇUBUĞU
          • Ses aç/kapat + %0–150 slider
          • Videoyu başa sar
      ══════════════════════════════════════════════════ */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-40 flex items-center gap-4 px-5 py-2 bg-black/60 border border-green-900/60 backdrop-blur-sm rounded-sm font-mono text-xs text-green-600 select-none">

        {/* Başa Sar */}
        <button
          onClick={handleRestart}
          className="flex items-center gap-1 hover:text-green-400 transition-colors"
          title="Videoyu başa sar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z"/>
          </svg>
          BAŞA SAR
        </button>

        <div className="w-px h-4 bg-green-900" />

        {/* Ses Aç */}
        {!audioUnlocked && (
          <button
            onClick={(e) => { e.stopPropagation(); setupAudio(); }}
            className="hover:text-green-400 transition-colors animate-pulse"
          >
            🔇 SES AÇ
          </button>
        )}

        {/* Ses Slider — 0 ile 150 arası */}
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
          </svg>
          <input
            type="range"
            min={0}
            max={150}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            onClick={(e) => e.stopPropagation()}
            className="w-24 accent-green-500 cursor-pointer"
            title={`Ses: %${volume}`}
          />
          <span className="w-8 text-right text-green-500">%{volume}</span>
        </div>

      </div>

    </div>
  );
}
