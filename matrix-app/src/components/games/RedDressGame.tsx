'use client';
import { useState } from 'react';

export default function RedDressGame() {
    /* 
      1. KİŞİ OYUN GELİŞTİRİCİ: 
      Tüm Memory Match mantığını veya Red Dress dikkat tıklama mantığını bu dosyaya yaz.
      Eğer Vite'ta ayrı yazdıysan sadece komponent divi içeriğini kendi yazdığın JSX'le değiştir.
    */
    const [score, setScore] = useState(0);

    return (
        <div className="w-full flex justify-center flex-col items-center gap-4">
            <h3 className="text-red-500 font-bold uppercase tracking-widest text-lg">Dikkat Dağıtıcıları Engelle</h3>
            <p className="text-gray-500 text-sm italic mb-4">Gereksiz abonelik ve harcama kartlarını eşleştirip yok et.</p>
            
            {/* OYUN BOARD YER TUTUCU */}
            <div className="grid grid-cols-4 gap-4 w-full max-w-sm">
                {[1, 2, 3, 4, 5, 6, 7, 8].map(card => (
                    <div key={card} className="aspect-[3/4] bg-red-950/20 border border-red-900 hover:bg-red-900/40 cursor-pointer flex items-center justify-center transition-colors">
                        <span className="text-red-500/20">?</span>
                    </div>
                ))}
            </div>

            <div className="mt-6 text-xl text-green-500">XP: {score}</div>
        </div>
    );
}
