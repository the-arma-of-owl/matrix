import Link from 'next/link';
import OracleChatWidget from '@/components/ui/OracleChatWidget';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#070707] text-gray-300 font-mono flex flex-col pt-10 px-4 pb-20">
      
      {/* Üst Bar */}
      <header className="border-b border-green-800/50 pb-4 mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-green-500 tracking-wide">LEVEL 1: UYANIŞ</h1>
          <p className="text-sm text-green-700 mt-1">Sistem Tehdidi: %14 (YOLO Spending Eğilimi Tespit Edildi)</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-green-600 mb-1">XP PROGRESS</div>
          <div className="w-48 h-3 bg-gray-900 border border-green-800">
            <div className="h-full bg-green-500" style={{ width: '30%' }}></div>
          </div>
        </div>
      </header>

      {/* Ana Grid - TryHackMe Formatı */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1">
        
        {/* SOL: Öğrenme Terminali */}
        <section className="bg-black border border-gray-800 rounded p-6 shadow-2xl relative">
          <div className="absolute top-0 left-0 w-full h-8 bg-gray-900 flex items-center px-4 border-b border-gray-800">
            <span className="text-xs text-green-500">root@oracle:~# ./bes_module.sh</span>
          </div>
          
          <div className="mt-6 space-y-6">
            <div>
              <h3 className="text-xl text-green-400 font-bold mb-2">Görev 1: Sistem Nasıl Beslenir?</h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                Sistem (Doom Spending) sizin anlık streslerinizi kullanarak küçük harcamalar yaptırır.
                Her sabah aldığınız o kahve... aslında 20 yıl sonra size 150.000 TL&apos;lik bir geleceğe mal oluyor.
                Geleceğinizin finansal olarak kontrolünü ele almak (BES) tek çıkış yoludur.
              </p>
            </div>
            
            <div className="bg-gray-900/50 p-4 border border-gray-800">
              <label className="block text-sm text-green-600 mb-2">Soru: Eğitimi yarıda bırakıp kaçmayı teklif eden Matrix karakterinin adı nedir?</label>
              <div className="flex gap-2">
                <input type="text" className="flex-1 bg-black border border-green-800 p-2 text-green-400 outline-none focus:border-green-500" placeholder="Cevap buraya..." />
                <button className="px-4 py-2 bg-green-800/20 border border-green-600 text-green-400 hover:bg-green-500 hover:text-black">SUBMIT</button>
              </div>
            </div>
          </div>
        </section>

        {/* SAĞ: Oyun Seçim Alanı */}
        <section className="bg-black border border-red-900/30 rounded p-6 shadow-[0_0_20px_rgba(255,0,0,0.05)] relative flex flex-col gap-4">
          <div className="absolute top-0 left-0 w-full h-8 bg-red-900/10 flex items-center px-4 border-b border-red-900/30">
            <span className="text-xs text-red-500">⚡ AKSİYON MODÜLÜ — Oyun Seç</span>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4">

            {/* Memory Match */}
            <Link href="/games/memory-match" className="group flex items-center gap-4 p-4 border border-red-900/40 hover:border-red-500 hover:bg-red-900/10 transition-all">
              <div className="text-2xl">🃏</div>
              <div>
                <div className="text-red-400 font-bold group-hover:text-red-300">Kırmızı Elbiseli Kadın</div>
                <div className="text-xs text-gray-600 mt-1">Dikkat dağıtıcıları eşleştir, harcama tuzaklarını engelle</div>
              </div>
              <span className="ml-auto text-green-600 text-xs">+150 XP →</span>
            </Link>

            {/* Match Game */}
            <Link href="/games/match" className="group flex items-center gap-4 p-4 border border-yellow-900/40 hover:border-yellow-500 hover:bg-yellow-900/10 transition-all">
              <div className="text-2xl">⚡</div>
              <div>
                <div className="text-yellow-400 font-bold group-hover:text-yellow-300">Akıllı Eşleştirme</div>
                <div className="text-xs text-gray-600 mt-1">Finansal kavramları doğru eşleştir, sistemi hackle</div>
              </div>
              <span className="ml-auto text-green-600 text-xs">+200 XP →</span>
            </Link>

            {/* BES Tower */}
            <Link href="/games/bes-tower" className="group flex items-center gap-4 p-4 border border-green-900/40 hover:border-green-500 hover:bg-green-900/10 transition-all">
              <div className="text-2xl">🏗️</div>
              <div>
                <div className="text-green-400 font-bold group-hover:text-green-300">BES Kulesi</div>
                <div className="text-xs text-gray-600 mt-1">Yatırım bloklarını istifliyerek geleceğini inşa et</div>
              </div>
              <span className="ml-auto text-green-600 text-xs">+300 XP →</span>
            </Link>

          </div>
        </section>
      </div>

      {/* Oracle AI Chat Widget */}
      <OracleChatWidget />

    </div>
  );
}
