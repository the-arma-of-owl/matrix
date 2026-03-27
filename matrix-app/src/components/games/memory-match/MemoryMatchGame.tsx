'use client';

import React, { useState, useEffect } from 'react';

// Bireysel Emeklilik Sistemi (BES) & Agesa İkonları (Matrix Teması)
const BES_CARDS_DATA = [
  {
    id: 'agesa',
    label: 'Agesa',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" className="w-12 h-12 mb-1 text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.8)]">
        <circle cx="12" cy="8" r="3.5" />
        <circle cx="12" cy="16" r="3.5" />
        <circle cx="8" cy="12" r="3.5" />
        <circle cx="16" cy="12" r="3.5" />
      </svg>
    )
  },
  {
    id: 'state-contrib',
    label: '%20 Devlet',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 mb-1 text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.8)]">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <text x="12" y="15" fontSize="8" textAnchor="middle" fill="currentColor" strokeWidth="0" fontWeight="bold">%20</text>
      </svg>
    )
  },
  {
    id: 'growth',
    label: 'Fon Getirisi',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 mb-1 text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.8)]">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    )
  },
  {
    id: 'shield',
    label: 'Hayat Sigortası',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 mb-1 text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.8)]">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        <path d="M12 17l-4-4 4-4 4 4-4 4z" />
      </svg>
    )
  },
  {
    id: 'portfolio',
    label: 'Portföy',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 mb-1 text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.8)]">
        <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
        <path d="M22 12A10 10 0 0 0 12 2v10z" />
      </svg>
    )
  },
  {
    id: 'future',
    label: 'Emeklilik',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 mb-1 text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.8)]">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    )
  },
  {
    id: 'target',
    label: 'Hedefler',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 mb-1 text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.8)]">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
      </svg>
    )
  },
  {
    id: 'saving',
    label: 'Tasarruf',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 mb-1 text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.8)]">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    )
  }
];

interface CardState {
  uniqueId: number;
  dataId: string;
  label: string;
  icon: React.ReactNode;
  isFlipped: boolean;
  isMatched: boolean;
}

export function MemoryMatchGame() {
  const [cards, setCards] = useState<CardState[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'won'>('menu');

  useEffect(() => {
    initGame();
  }, []);

  const initGame = () => {
    const deck = [...BES_CARDS_DATA, ...BES_CARDS_DATA];
    const shuffledCards = deck
      .sort(() => Math.random() - 0.5)
      .map((item, index) => ({
        uniqueId: index,
        dataId: item.id,
        label: item.label,
        icon: item.icon,
        isFlipped: false,
        isMatched: false,
      }));
    
    setCards(shuffledCards);
    setFlippedIndices([]);
    setMoves(0);
    setMatches(0);
    setIsLocked(false);
    setGameState('playing');
  };

  const handleCardClick = (index: number) => {
    if (gameState !== 'playing' || isLocked || cards[index].isFlipped || cards[index].isMatched) return;

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);

    if (newFlippedIndices.length === 2) {
      setIsLocked(true);
      setMoves(m => m + 1);

      const [firstIndex, secondIndex] = newFlippedIndices;
      if (newCards[firstIndex].dataId === newCards[secondIndex].dataId) {
        setTimeout(() => {
          const matchedCards = [...newCards];
          matchedCards[firstIndex].isMatched = true;
          matchedCards[secondIndex].isMatched = true;
          setCards(matchedCards);
          setFlippedIndices([]);
          setIsLocked(false);
          setMatches(m => {
            if (m + 1 === BES_CARDS_DATA.length) {
              setGameState('won');
            }
            return m + 1;
          });
        }, 500);
      } else {
        setTimeout(() => {
          const resetCards = [...newCards];
          resetCards[firstIndex].isFlipped = false;
          resetCards[secondIndex].isFlipped = false;
          setCards(resetCards);
          setFlippedIndices([]);
          setIsLocked(false);
        }, 1000);
      }
    }
  };

  return (
    <div className="relative w-full h-screen mx-auto overflow-hidden text-green-400 bg-black font-mono flex flex-col pt-8 sm:pt-16">
      
      {/* Background Styling: Matrix Rain Video iframe */}
      <iframe 
          className="absolute top-1/2 left-1/2 w-[300%] h-[300%] -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-40 z-0"
          src="https://www.youtube.com/embed/MUVo20q6tx8?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&playsinline=1&playlist=MUVo20q6tx8" 
          title="Matrix Rain Codes (4K FULL HD)" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          referrerPolicy="strict-origin-when-cross-origin" 
          allowFullScreen
      />
      
      {/* Vignette/Shadow overlay to focus the center and blend iframe */}
      <div className="absolute inset-0 z-0 bg-black/50 pointer-events-none drop-shadow-2xl"></div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-lg mx-auto flex flex-col h-full px-4">
        
        {/* Header HUD */}
        <div className="flex justify-between items-center mb-8 px-6 py-4 bg-black/60 backdrop-blur-md rounded-xl border border-green-500/40 shadow-[0_0_20px_rgba(34,197,94,0.2)]">
          <div className="flex flex-col">
            <span className="text-xs font-bold tracking-widest text-green-500 uppercase">Ağ Eşleşmesi</span>
            <span className="text-3xl font-black text-green-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]">{matches} <span className="text-lg text-green-800">/ {BES_CARDS_DATA.length}</span></span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-xs font-bold tracking-widest text-green-500 uppercase">Sistem Hamlesi</span>
            <span className="text-3xl font-black text-green-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]">{moves}</span>
          </div>
        </div>

        {/* Board */}
        <div className="flex-1 w-full max-h-[500px] aspect-square grid grid-cols-4 gap-3 sm:gap-4 p-4 bg-black/40 rounded-2xl border border-green-500/30 shadow-[0_0_30px_rgba(34,197,94,0.15)] backdrop-blur-xl mx-auto">
          {cards.map((card, index) => (
            <div 
              key={card.uniqueId}
              className="relative w-full h-full cursor-pointer touch-none group"
              onClick={() => handleCardClick(index)}
              style={{ perspective: '1000px' }}
            >
              <div 
                 className="w-full h-full transition-transform duration-500 ease-out" 
                 style={{ 
                   transformStyle: 'preserve-3d', 
                   transform: card.isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                 }}
              >
                  
                {/* BACK OF CARD (Closed) - Custom Agesa Matrix Logo */}
                <div 
                  className="absolute inset-0 w-full h-full rounded-xl overflow-hidden border-2 border-green-500/60 bg-black flex items-center justify-center group-hover:shadow-[0_0_15px_rgba(34,197,94,0.6)] group-hover:border-green-400 transition-all duration-300"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                    {/* User Provided Agesa Logo */}
                    <img 
                        src="/agesa.jpg" 
                        alt="Agesa Logo" 
                        className="w-12 h-12 object-contain mix-blend-screen opacity-90 drop-shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse"
                    />
                    
                    {/* Corner decorative Matrix nodes */}
                    <div className="absolute top-1 left-1 w-1 h-1 bg-green-500 rounded-full"></div>
                    <div className="absolute top-1 right-1 w-1 h-1 bg-green-500 rounded-full"></div>
                    <div className="absolute bottom-1 left-1 w-1 h-1 bg-green-500 rounded-full"></div>
                    <div className="absolute bottom-1 right-1 w-1 h-1 bg-green-500 rounded-full"></div>
                </div>

                {/* FRONT OF CARD (Open) - Matrix Hologram & Icon */}
                <div 
                  className="absolute inset-0 w-full h-full rounded-xl flex flex-col items-center justify-center border-2 border-green-500 bg-black/90 text-center"
                  style={{ 
                    backfaceVisibility: 'hidden', 
                    transform: 'rotateY(180deg)',
                    boxShadow: card.isMatched ? '0 0 20px rgba(34, 197, 94, 0.6)' : 'inset 0 0 15px rgba(34, 197, 94, 0.2)',
                    opacity: card.isMatched ? 0.5 : 1
                  }}
                >
                    <div className={`transition-all duration-300 text-green-400 ${card.isMatched ? 'scale-110 drop-shadow-[0_0_15px_rgba(34,197,94,1)]' : 'scale-100 drop-shadow-md'}`}>
                        {card.icon}
                    </div>
                    <span 
                        className="text-[9px] sm:text-xs font-bold text-green-300 uppercase tracking-wider drop-shadow-md px-1 leading-tight"
                        style={{
                           textShadow: '0 0 5px rgba(34,197,94,0.5)'
                        }}
                    >
                        {card.label}
                    </span>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Game Over / Hack Complete Screen */}
        <div className={`absolute inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md transition-opacity duration-700 ${gameState === 'won' ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <div className={`flex flex-col items-center bg-black/80 p-8 rounded-2xl shadow-[0_0_40px_rgba(34,197,94,0.4)] border-2 border-green-400 max-w-sm w-[90%] transform transition-transform duration-700 delay-300 ${gameState === 'won' ? 'translate-y-0 scale-100' : 'translate-y-20 scale-90'}`}>
             <div className="text-6xl mb-4 animate-[pulse_2s_infinite]">💻</div>
             <h2 className="text-3xl font-black text-green-400 mb-2 tracking-widest uppercase origin-bottom drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]">Sistem Kırıldı!</h2>
             <p className="text-gray-300 font-medium mb-6 text-center">Tüm veritabanını <strong className="text-green-400">{moves}</strong> hamlede eşleştirdin.</p>
             <button 
                onClick={initGame}
                className="w-full py-4 bg-black border-2 border-green-500 hover:bg-green-500 hover:text-black text-green-400 font-bold text-lg rounded-xl shadow-[0_0_15px_rgba(34,197,94,0.4)] hover:shadow-[0_0_25px_rgba(34,197,94,0.8)] transition-all active:scale-95 uppercase tracking-widest"
             >
                Yeniden Araştır
             </button>
          </div>
        </div>

      </div>
    </div>
  );
}
