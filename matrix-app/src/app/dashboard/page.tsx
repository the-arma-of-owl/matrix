import Link from 'next/link';
import OracleChatWidget from '@/components/ui/OracleChatWidget';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#070707] text-gray-300 font-mono">
      {/* Sidebar offset — NavigationBar 72px wide */}
      <div className="ml-[72px] min-h-screen flex flex-col px-4 sm:px-6 pt-8 pb-24 max-w-[1200px]">

        {/* Üst Bar */}
        <header className="border-b border-green-800/50 pb-4 mb-8 flex flex-col sm:flex-row sm:items-end gap-3 sm:gap-0 sm:justify-between">
          <div className="min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-green-500 tracking-wide truncate">
              LEVEL 1: UYANIŞ
            </h1>
            <p className="text-xs sm:text-sm text-green-700 mt-1">
              Sistem Tehdidi: %14 — YOLO Spending Eğilimi Tespit Edildi
            </p>
          </div>
          <div className="text-left sm:text-right flex-shrink-0">
            <div className="text-xs text-green-600 mb-1">XP PROGRESS</div>
            <div className="w-full sm:w-48 h-3 bg-gray-900 border border-green-800">
              <div className="h-full bg-green-500" style={{ width: '30%' }} />
            </div>
          </div>
        </header>

        {/* Ana Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 flex-1">

          {/* SOL: Öğrenme Terminali */}
          <section className="bg-black border border-gray-800 rounded overflow-hidden shadow-2xl relative">
            <div className="w-full h-8 bg-gray-900 flex items-center px-4 border-b border-gray-800 flex-shrink-0">
              <span className="text-xs text-green-500 truncate">root@oracle:~# ./bes_module.sh</span>
            </div>

            <div className="p-5 space-y-5">
              <div>
                <h3 className="text-lg text-green-400 font-bold mb-2">Görev 1: Sistem Nasıl Beslenir?</h3>
                <p className="text-gray-400 leading-relaxed text-sm">
                  Sistem (Doom Spending) sizin anlık streslerinizi kullanarak küçük harcamalar yaptırır.
                  Her sabah aldığınız o kahve... aslında 20 yıl sonra size 150.000 TL&apos;lik bir geleceğe mal oluyor.
                  Geleceğinizin finansal kontrolünü ele almak (BES) tek çıkış yoludur.
                </p>
              </div>

              <div className="bg-gray-900/50 p-4 border border-gray-800">
                <label className="block text-sm text-green-600 mb-2">
                  Soru: Eğitimi yarıda bırakıp kaçmayı teklif eden Matrix karakterinin adı nedir?
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="flex-1 min-w-0 bg-black border border-green-800 p-2 text-green-400 outline-none focus:border-green-500 text-sm"
                    placeholder="Cevap buraya..."
                  />
                  <button className="px-3 py-2 bg-green-800/20 border border-green-600 text-green-400 hover:bg-green-500 hover:text-black text-sm whitespace-nowrap flex-shrink-0 transition-colors">
                    SUBMIT
                  </button>
                </div>
              </div>

              <Link href="/level1"
                className="block w-full text-center py-3 border border-green-600/40 text-green-400 hover:bg-green-900/20 hover:border-green-500 transition-all text-sm font-bold">
                📚 BES Quiz&apos;e Başla (26 Soru) →
              </Link>
            </div>
          </section>

          {/* SAĞ: Oyun Seçim Alanı */}
          <section className="bg-black border border-red-900/30 rounded overflow-hidden shadow-[0_0_20px_rgba(255,0,0,0.05)] relative">
            <div className="w-full h-8 bg-red-900/10 flex items-center px-4 border-b border-red-900/30">
              <span className="text-xs text-red-500">⚡ AKSİYON MODÜLÜ — Oyun Seç</span>
            </div>

            <div className="p-5 grid grid-cols-1 gap-3">

              {/* Memory Match */}
              <Link href="/games/memory-match"
                className="group flex items-center gap-4 p-4 border border-red-900/40 hover:border-red-500 hover:bg-red-900/10 transition-all min-w-0">
                <div className="text-2xl flex-shrink-0">🃏</div>
                <div className="min-w-0 flex-1">
                  <div className="text-red-400 font-bold group-hover:text-red-300 truncate">Kırmızı Elbiseli Kadın</div>
                  <div className="text-xs text-gray-600 mt-1 line-clamp-2">Dikkat dağıtıcıları eşleştir, harcama tuzaklarını engelle</div>
                </div>
                <span className="ml-auto text-green-600 text-xs flex-shrink-0">+150 XP →</span>
              </Link>

              {/* Match Game */}
              <Link href="/games/match"
                className="group flex items-center gap-4 p-4 border border-yellow-900/40 hover:border-yellow-500 hover:bg-yellow-900/10 transition-all min-w-0">
                <div className="text-2xl flex-shrink-0">⚡</div>
                <div className="min-w-0 flex-1">
                  <div className="text-yellow-400 font-bold group-hover:text-yellow-300 truncate">Akıllı Eşleştirme</div>
                  <div className="text-xs text-gray-600 mt-1 line-clamp-2">Finansal kavramları doğru eşleştir, sistemi hackle</div>
                </div>
                <span className="ml-auto text-green-600 text-xs flex-shrink-0">+200 XP →</span>
              </Link>

              {/* BES Tower */}
              <Link href="/games/bes-tower"
                className="group flex items-center gap-4 p-4 border border-green-900/40 hover:border-green-500 hover:bg-green-900/10 transition-all min-w-0">
                <div className="text-2xl flex-shrink-0">🏗️</div>
                <div className="min-w-0 flex-1">
                  <div className="text-green-400 font-bold group-hover:text-green-300 truncate">BES Kulesi</div>
                  <div className="text-xs text-gray-600 mt-1 line-clamp-2">Yatırım bloklarını istifliyerek geleceğini inşa et</div>
                </div>
                <span className="ml-auto text-green-600 text-xs flex-shrink-0">+300 XP →</span>
              </Link>

              {/* Leaderboard */}
              <Link href="/leaderboard"
                className="group flex items-center gap-4 p-4 border border-purple-900/40 hover:border-purple-500 hover:bg-purple-900/10 transition-all min-w-0">
                <div className="text-2xl flex-shrink-0">🏆</div>
                <div className="min-w-0 flex-1">
                  <div className="text-purple-400 font-bold group-hover:text-purple-300 truncate">Sıralama Tablosu</div>
                  <div className="text-xs text-gray-600 mt-1">En iyi tasarrufçuları gör</div>
                </div>
                <span className="ml-auto text-green-600 text-xs flex-shrink-0">→</span>
              </Link>

            </div>
          </section>
        </div>
      </div>

      {/* Oracle AI Chat Widget */}
      <OracleChatWidget />
    </div>
  );
}
