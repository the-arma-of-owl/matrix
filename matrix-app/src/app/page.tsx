'use client';

import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true); // Tarayıcılar ses açık autoplay'e izin vermez, başta muted açarız
  const [videoEnded, setVideoEnded] = useState(false);
  const router = useRouter();

  // Sayfa açıldığında video çal, kullanıcı tıklayınca ses aç
  const handleUnmute = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      setIsMuted(false);
    }
  };

  const handleEnterMatrix = () => {
    router.push('/login');
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black flex items-center justify-center">

      {/* 
        ================================================================
        VİDEOCU ARKADAŞ İÇİN TALİMATLAR:
        - Morpheus konuşma videonuzu "morpheus.mp4" adıyla kaydedin
        - public/videos/ klasörünün altına atın
        - Video 16:9 oranında, minimum 1080p kalitesinde olsun
        - Tercih edilen format: .mp4 (H.264) veya .webm
        ================================================================
      */}
      <video
        ref={videoRef}
        src="/videos/morpheus.mp4"
        autoPlay
        muted         // Başlangıçta muted (tarayıcı politikası gereği)
        playsInline
        onEnded={() => setVideoEnded(true)}
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Üstten alta solan siyah katman — videonun üzerine okunabilirlik için */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/30 via-transparent to-black/80 pointer-events-none" />

      {/* Matrix yeşil kod yağmuru efekti overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay opacity-20"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 255, 100, 0.03) 2px,
            rgba(0, 255, 100, 0.03) 4px
          )`,
        }}
      />

      {/* Ses Aç Uyarısı — kullanıcı tıklamadan önce göster */}
      {isMuted && (
        <button
          onClick={handleUnmute}
          className="absolute top-6 right-6 z-30 flex items-center gap-2 px-3 py-2 border border-green-700 text-green-600 text-xs font-mono hover:border-green-400 hover:text-green-400 transition-all backdrop-blur-sm"
          title="Sesi Aç"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
          </svg>
          SES AÇ
        </button>
      )}

      {/* Ana içerik: Orta konumlanmış, videonun bitmesiyle veya hemen beliren */}
      <div className="relative z-20 flex flex-col items-center justify-end h-full pb-24 gap-10 px-6 text-center">

        {/* Alt yazı / Lore */}
        <p className="text-green-600 font-mono text-sm tracking-widest uppercase animate-pulse">
          [ SİSTEM UYARISI: Finansal Simülasyon Aktif ]
        </p>

        {/* TEK BUTON */}
        <button
          id="change-fate-btn"
          onClick={handleEnterMatrix}
          className="
            group relative px-12 py-5
            border-2 border-green-500
            text-green-400 font-mono font-bold
            text-xl tracking-[0.3em] uppercase
            transition-all duration-300
            hover:bg-green-500 hover:text-black
            hover:shadow-[0_0_40px_#00FF9C,0_0_80px_#00FF9C44]
            focus:outline-none
            overflow-hidden
          "
        >
          {/* Tarama efekti */}
          <span className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-green-500 transition-transform duration-300 z-0" />
          <span className="relative z-10">KADERİMİ DEĞİŞTİR</span>
        </button>

        {/* Küçük alt not */}
        <p className="text-gray-700 text-xs font-mono">
          Bu kararı bir kez verirsin. Geri dönüş yoktur.
        </p>
      </div>

    </div>
  );
}
