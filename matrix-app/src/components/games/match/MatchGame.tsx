'use client';

import React, { useState, useEffect } from 'react';

const KNOWLEDGE_DATA = [
  { id: 1, kelime: "Devlet Katkısı", tanim: "Devletten gelen %20 ek nakit desteği." },
  { id: 2, kelime: "Katkı Payı", tanim: "Senin yatırdığın düzenli ana para." },
  { id: 3, kelime: "Emeklilik Fonu", tanim: "Paranın değerlendiği (altın, hisse vb.) havuz." },
  { id: 4, kelime: "EYF Değişimi", tanim: "Fonlarını yılda 12 kez değiştirme hakkın." },
  { id: 5, kelime: "Stopaj", tanim: "Erken çıkışta sadece getiri üzerinden alınan vergi." },
  { id: 6, kelime: "BEFAS", tanim: "Diğer şirketlerin fonlarını da alabilme platformu." },
  { id: 7, kelime: "Giriş Aidatı", tanim: "Sisteme girişte alınan (bazen ertelenen) ücret." },
  { id: 8, kelime: "Takasbank", tanim: "Paranın devlet güvencesinde saklandığı kasa." },
  { id: 9, kelime: "EGM", tanim: "Sistemin tüm kayıtlarını tutan merkez." },
  { id: 10, kelime: "Emeklilik Şartı", tanim: "10 yıl sistemde kalmak + 56 yaşını doldurmak." },
  { id: 11, kelime: "Hak Ediş", tanim: "Devlet katkısını alma oranı (3 yıl %15, 6 yıl %35...)." },
  { id: 12, kelime: "YGK", tanim: "Şirketin yönetim için kestiği masraf payı." },
  { id: 13, kelime: "FİGK", tanim: "Fonun yönetimi için günlük yapılan kesinti." },
  { id: 14, kelime: "OKS", tanim: "İş yerinden otomatik olarak başlatılan BES." },
  { id: 15, kelime: "Ara Verme", tanim: "Ödemeleri dondurup sistemde kalmaya devam etme." },
  { id: 16, kelime: "Toplu Ödeme", tanim: "Beklenmedik parayı sisteme tek seferde yatırma." },
  { id: 17, kelime: "Risk Profili", tanim: "Risk iştahına göre seçilen yatırım karakteri." },
  { id: 18, kelime: "Portföy Yöneticisi", tanim: "Fonu yöneten uzman kadro." },
  { id: 19, kelime: "Birikim", tanim: "Yatırdığın para + Getiri + Devlet katkısı toplamı." },
  { id: 20, kelime: "Sistemden Ayrılma", tanim: "Emeklilik dolmadan parayı çekme işlemi." }
];

interface MatchItem {
  id: number;
  pairId: number;
  text: string;
  source?: string;
  status: 'idle' | 'selected' | 'matched' | 'error';
}

export function MatchGame() {
  const [leftCol, setLeftCol] = useState<MatchItem[]>([]);
  const [rightCol, setRightCol] = useState<MatchItem[]>([]);
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [selectedRight, setSelectedRight] = useState<number | null>(null);
  const [matches, setMatches] = useState(0);
  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'won'>('menu');

  useEffect(() => {
    initGame();
  }, []);

  const initGame = () => {
    // Toplam veri havuzundan rastgele 8 terim seç
    const selectedData = [...KNOWLEDGE_DATA]
      .sort(() => Math.random() - 0.5)
      .slice(0, 8);

    const left: MatchItem[] = selectedData.map((item, index) => ({
      id: index * 2,
      pairId: item.id,
      text: item.kelime,
      status: 'idle' as const
    })).sort(() => Math.random() - 0.5);

    const right: MatchItem[] = selectedData.map((item, index) => ({
      id: index * 2 + 1,
      pairId: item.id,
      text: item.tanim,
      status: 'idle' as const
    })).sort(() => Math.random() - 0.5);

    setLeftCol(left);
    setRightCol(right);
    setSelectedLeft(null);
    setSelectedRight(null);
    setMatches(0);
    setMoves(0);
    setScore(0);
    setIsLocked(false);
    setGameState('playing');
  };

  useEffect(() => {
    if (selectedLeft !== null && selectedRight !== null && !isLocked) {
      checkMatch();
    }
  }, [selectedLeft, selectedRight]);

  const checkMatch = () => {
    setIsLocked(true);
    setMoves(m => m + 1);

    const leftItem = leftCol.find(item => item.id === selectedLeft);
    const rightItem = rightCol.find(item => item.id === selectedRight);

    if (leftItem && rightItem && leftItem.pairId === rightItem.pairId) {
      // Doğru eşleşme
      setLeftCol(prev => prev.map(item => item.id === selectedLeft ? { ...item, status: 'matched' } : item));
      setRightCol(prev => prev.map(item => item.id === selectedRight ? { ...item, status: 'matched' } : item));
      
      setMatches(m => {
        if (m + 1 === 8) { // Sadece seçilen 8 kart eşleştiğinde oyun biter
          setTimeout(() => setGameState('won'), 500);
        }
        return m + 1;
      });
      setScore(s => s + 100); // 100 PTS bonus for correct match
      setSelectedLeft(null);
      setSelectedRight(null);
      setIsLocked(false);
    } else {
      // Yanlış eşleşme
      setLeftCol(prev => prev.map(item => item.id === selectedLeft ? { ...item, status: 'error' } : item));
      setRightCol(prev => prev.map(item => item.id === selectedRight ? { ...item, status: 'error' } : item));

      setTimeout(() => {
        setLeftCol(prev => prev.map(item => item.id === selectedLeft ? { ...item, status: 'idle' as const } : item));
        setRightCol(prev => prev.map(item => item.id === selectedRight ? { ...item, status: 'idle' as const } : item));
        setSelectedLeft(null);
        setSelectedRight(null);
        setIsLocked(false);
        setScore(s => Math.max(0, s - 10)); // 10 PTS penalty for mismatch
      }, 800);
    }
  };

  const handleLeftClick = (id: number) => {
    if (isLocked || leftCol.find(i => i.id === id)?.status === 'matched') return;
    
    // Toggle seçimini iptal etme
    if (selectedLeft === id) {
      setSelectedLeft(null);
      setLeftCol(prev => prev.map(item => item.id === id ? { ...item, status: 'idle' as const } : item));
      return;
    }

    // Önceki seçileni iptal edip yenisini seçme
    setLeftCol(prev => prev.map(item => {
      if (item.id === id) return { ...item, status: 'selected' as const };
      if (item.id === selectedLeft) return { ...item, status: 'idle' as const };
      return item;
    }));
    setSelectedLeft(id);
  };

  const handleRightClick = (id: number) => {
    if (isLocked || rightCol.find(i => i.id === id)?.status === 'matched') return;

    if (selectedRight === id) {
      setSelectedRight(null);
      setRightCol(prev => prev.map(item => item.id === id ? { ...item, status: 'idle' as const } : item));
      return;
    }

    setRightCol(prev => prev.map(item => {
      if (item.id === id) return { ...item, status: 'selected' as const };
      if (item.id === selectedRight) return { ...item, status: 'idle' as const };
      return item;
    }));
    setSelectedRight(id);
  };

  const getCardClasses = (status: string, isLeft: boolean) => {
    const base = "relative overflow-hidden w-full rounded-md border text-sm sm:text-base cursor-pointer px-4 py-3 flex items-center min-h-[4rem] transition-all duration-300";
    if (status === 'matched') return `${base} bg-green-900/40 border-green-700/50 text-green-700/50 opacity-40 grayscale pointer-events-none line-through decoration-green-900/70 shadow-none`;
    if (status === 'error') return `${base} bg-red-900/60 border-red-500 text-red-200 shadow-[0_0_15px_rgba(239,68,68,0.6)] animate-[shake_0.5s_ease-in-out]`;
    
    if (isLeft) {
      if (status === 'selected') return `${base} bg-green-500 text-black border-green-400 shadow-[0_0_20px_rgba(34,197,94,0.8)] font-bold scale-[1.02]`;
      return `${base} bg-black/50 border-green-500/40 text-green-400 hover:border-green-400 hover:bg-green-900/30 hover:shadow-[inset_0_0_10px_rgba(34,197,94,0.3)] font-medium`;
    } else {
      if (status === 'selected') return `${base} bg-cyan-500 text-black border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.8)] font-bold scale-[1.02]`;
      return `${base} bg-black/50 border-cyan-600/40 text-cyan-300 hover:border-cyan-400 hover:bg-cyan-900/30 hover:shadow-[inset_0_0_10px_rgba(8,145,178,0.3)] font-normal text-xs sm:text-sm`;
    }
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden text-green-400 bg-black font-mono flex flex-col pt-4 pb-10">
      
      {/* Matrix YouTube Arka Plan */}
      <iframe 
          className="fixed top-1/2 left-1/2 w-[300%] h-[300%] -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-30 z-0"
          src="https://www.youtube.com/embed/MUVo20q6tx8?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&playsinline=1&playlist=MUVo20q6tx8" 
          title="Matrix Rain Background" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          referrerPolicy="strict-origin-when-cross-origin" 
          allowFullScreen
      />
      
      {/* Karanlık Tül */}
      <div className="fixed inset-0 z-0 bg-black/60 pointer-events-none"></div>

      {/* Main UI */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col h-full px-2 sm:px-6">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6 px-4 py-3 bg-black/80 backdrop-blur-xl rounded-xl border border-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.3)] sticky top-4 z-20">
          <div className="flex flex-col w-[100px]">
            <span className="text-[10px] sm:text-xs font-bold tracking-widest text-green-600 uppercase">Ağ Node'ları</span>
            <span className="text-lg sm:text-3xl font-black text-green-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]">
              {matches} <span className="text-xs sm:text-sm text-green-800">/ 8</span>
            </span>
          </div>
          
          {/* Live Score Display */}
          <div className="flex flex-col items-center flex-1">
             <span className="text-[10px] sm:text-xs font-bold text-cyan-400 tracking-[0.2em] uppercase drop-shadow-[0_0_8px_rgba(6,182,212,0.8)] animate-pulse">Canlı Skor</span>
             <h2 className="text-2xl sm:text-4xl text-cyan-300 font-black mt-0 drop-shadow-[0_0_12px_rgba(6,182,212,1)]">{score}</h2>
          </div>

          <div className="flex flex-col items-end w-[100px]">
            <span className="text-[10px] sm:text-xs font-bold tracking-widest text-green-600 uppercase">Sorgu Denemesi</span>
            <span className="text-lg sm:text-3xl font-black text-green-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]">{moves}</span>
          </div>
        </div>

        {/* 2 Sütun Eşleştirme Tahtası */}
        <div className="flex-1 w-full grid grid-cols-2 gap-4 sm:gap-6 bg-black/40 p-4 rounded-xl border border-green-500/20 backdrop-blur-sm overflow-y-auto custom-scrollbar shadow-inner mt-2">
           
           {/* Sol Sütun: Terimler */}
           <div className="flex flex-col gap-3">
              <h2 className="text-sm font-bold tracking-[0.2em] text-green-600 uppercase mb-2 border-b border-green-800/50 pb-2">Anahtar Kelimeler (Node A)</h2>
              {leftCol.map(item => (
                 <div key={`left-${item.id}`} onClick={() => handleLeftClick(item.id)} className={getCardClasses(item.status, true)}>
                    {item.text}
                 </div>
              ))}
           </div>

           {/* Sağ Sütun: Tanımlar */}
           <div className="flex flex-col gap-3">
              <h2 className="text-sm font-bold tracking-[0.2em] text-cyan-700 uppercase mb-2 border-b border-cyan-900/50 pb-2 text-right">Veri Tanımları (Node B)</h2>
              {rightCol.map(item => (
                 <div key={`right-${item.id}`} onClick={() => handleRightClick(item.id)} className={getCardClasses(item.status, false)}>
                    <div className="flex flex-col w-full">
                       <span className="leading-snug">{item.text}</span>
                    </div>
                 </div>
              ))}
           </div>

        </div>

        {/* Game Over Modal */}
        <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-lg transition-opacity duration-700 ${gameState === 'won' ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <div className={`flex flex-col items-center bg-black/90 p-8 rounded-2xl shadow-[0_0_50px_rgba(34,197,94,0.5)] border border-green-500 max-w-md w-[90%] transform transition-transform duration-700 delay-300 ${gameState === 'won' ? 'translate-y-0 scale-100' : 'translate-y-20 scale-90'}`}>
             <div className="text-6xl mb-4 text-green-500 animate-pulse">✓</div>
             <h2 className="text-2xl sm:text-3xl font-black text-green-400 mb-2 tracking-[0.2em] uppercase text-center drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]">Ağ Yapılandırıldı</h2>
             
             <div className="bg-green-900/30 border border-green-500/50 rounded-lg p-4 w-full mb-6">
                 <div className="flex justify-between items-center mb-2">
                     <span className="text-green-600 text-xs font-bold uppercase tracking-widest">Hamle Sayısı</span>
                     <span className="text-green-400 font-bold">{moves}</span>
                 </div>
                 <hr className="border-green-800 my-2" />
                 <div className="flex justify-between items-center">
                     <span className="text-green-500 font-black uppercase tracking-widest">Sistem Skoru</span>
                     <span className="text-3xl text-green-400 font-black drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]">
                         {score} <span className="text-sm">PTS</span>
                     </span>
                 </div>
             </div>

             <p className="text-green-600/80 font-medium mb-6 text-center text-xs">
               Kurumsal hafıza senkronize edildi. Minimum hamle ile yüksek puan kazanılır.
             </p>
             <button 
                onClick={initGame}
                className="w-full py-4 bg-transparent border-2 border-green-500 hover:bg-green-500 hover:text-black text-green-400 font-bold text-lg rounded-xl shadow-[0_0_15px_rgba(34,197,94,0.4)] hover:shadow-[0_0_25px_rgba(34,197,94,0.8)] transition-all active:scale-95 uppercase tracking-widest"
             >
                Yeni Oturum Başlat
             </button>
          </div>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shake {
           0%, 100% { transform: translateX(0); }
           25% { transform: translateX(-5px); }
           50% { transform: translateX(5px); }
           75% { transform: translateX(-5px); }
        }
        .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: rgba(0,0,0,0.5);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(34, 197, 94, 0.4);
            border-radius: 10px;
        }
      `}} />
    </div>
  );
}
