import RedDressGame from '@/components/games/RedDressGame';
import OracleChatWidget from '@/components/ui/OracleChatWidget';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#070707] text-gray-300 font-mono flex flex-col pt-10 px-4 pb-20">
      
      {/* Üst Bar: Kullanıcı Durumu */}
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

      {/* Ana Mimar - İkiye Bölünmüş TryHackMe Formatı */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1">
        
        {/* SOL: Öğrenme ve Görevler Terminali (TryHackMe stili) */}
        <section className="bg-black border border-gray-800 rounded p-6 shadow-2xl relative">
          <div className="absolute top-0 left-0 w-full h-8 bg-gray-900 flex items-center px-4 border-b border-gray-800">
            <span className="text-xs text-green-500">root@oracle:~# ./bes_module.sh</span>
          </div>
          
          <div className="mt-6 space-y-6">
            <div>
              <h3 className="text-xl text-green-400 font-bold mb-2">Görev 1: Sistem Nasıl Beslenir?</h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                Sistem (Doom Spending) sizin anlık streslerinizi kullanarak küçük harcamalar yaptırır. 
                Her sabah aldığınız O kahve... aslında 20 yıl sonra size 150.000 TL'lik bir geleceğe mal oluyor.
                Geleceğinizin finansal olarak kontrolünü ele almak (BES) tek çıkış yoludur.
              </p>
            </div>
            
            <div className="bg-gray-900/50 p-4 border border-gray-800">
              <label className="block text-sm text-green-600 mb-2">Soru: Eğitimi yarıda bırakıp kaçmayı teklif eden karakterin Matrix'teki adı nedir?</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  className="flex-1 bg-black border border-green-800 p-2 text-green-400 outline-none focus:border-green-500"
                  placeholder="Cevap buraya..."
                />
                <button className="px-4 py-2 bg-green-800/20 border border-green-600 text-green-400 hover:bg-green-500 hover:text-black">
                   SUBMIT
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SAĞ: OYUN / AKSİYON ALANI (RED DRESS KARTLARI VS) */}
        <section className="bg-black border border-red-900/30 rounded p-6 shadow-[0_0_20px_rgba(255,0,0,0.05)] relative flex flex-col justify-center items-center">
            
            <div className="absolute top-0 left-0 w-full h-8 bg-red-900/10 flex items-center px-4 border-b border-red-900/30">
                <span className="text-xs text-red-500">Uyarı: Çeldirici (Red Dress) Algılandı</span>
            </div>

            {/* OYUN GELİŞTİRİCİSİNİN COMPONENTİ BURAYA GELECEK */}
            <div className="mt-8 w-full">
                <RedDressGame />
            </div>

        </section>
      </div>

      {/* SAĞ ALT RAG AI CHAT WIDGET */}
      <OracleChatWidget />

    </div>
  );
}
