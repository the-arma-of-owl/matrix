import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black flex items-center justify-center">
      {/* 
        VİDEOCU ARKADAŞ İÇİN NOT: Buradaki arka planı oluşturduğun video ile değiştirebilirsin.
        Video tagına autoPlay, loop, muted eklemeyi unutma.
      */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent to-black opacity-80 mix-blend-multiply"></div>
      
      <div className="z-10 text-center flex flex-col items-center gap-8 px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-green-500 tracking-widest drop-shadow-[0_0_15px_rgba(0,255,156,0.8)] glitched-text">
          KADERE İNANIR MISIN NEO?
        </h1>
        <p className="text-gray-400 text-lg md:text-2xl max-w-2xl font-mono">
          Mikro harcamaların seni yoksullaştırıyor. Sistem senden besleniyor.
          Matrix'ten çıkmak ve geleceğini geri almak için seçimini yap.
        </p>

        <Link
          href="/login"
          className="mt-6 px-8 py-4 bg-transparent border-2 border-green-500 text-green-500 font-bold uppercase tracking-widest hover:bg-green-500 hover:text-black hover:shadow-[0_0_20px_#00FF9C] transition-all duration-300"
        >
          KADERİ DEĞİŞTİR (SİSTEMİ HACKLE)
        </Link>
      </div>
    </div>
  );
}
