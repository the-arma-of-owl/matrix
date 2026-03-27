import Link from 'next/link';
import OracleChatWidget from '@/components/ui/OracleChatWidget';

/* ── CSV'den alınan gerçek eğitim içerikleri ── */
const LEARNING_MODULES = [
  {
    id: 'M1',
    title: 'Bütçe Temelleri',
    icon: '📊',
    body: 'Ay sonunda paran bitiyorsa sorun her zaman az kazanmak değildir. Küçük ama sık harcamalar bütçeyi fark edilmeden eritir. İlk adım, harcamalarını kategorilere ayırmak ve "ihtiyaç" ile "keyfi" ayrımını yapmaktır.',
    tip: 'Önce zorunluları öde → birikim ayır → kalanla keyfi harcamayı yönet',
    tag: 'bütçe',
  },
  {
    id: 'M2',
    title: 'Harcama Davranışı & Farkındalık',
    icon: '☕',
    body: 'Günde 2–3 küçük harcama masum görünür; ancak ay sonunda ciddi bir toplam oluşturabilir. Kahve, atıştırmalık, abonelik ve taksi gibi kalemler "fark edilmeden" artabilir.',
    tip: 'En sık tekrar eden harcamayı bul ve bir hafta boyunca küçük bir iyileştirme dene.',
    tag: 'harcama',
  },
  {
    id: 'M3',
    title: 'Birikime Giriş',
    icon: '💰',
    body: 'Birikim yapmak için büyük paralar gerekmez. Önemli olan düzenli bir alışkanlık oluşturmak. Önce acil durum fonu: Beklenmedik giderler için küçük bir yastık stresini azaltır.',
    tip: 'Her ay küçük bir tutarı otomatik ayırmak, "canım isterse biriktiririm"den çok daha etkilidir.',
    tag: 'birikim',
  },
];

/* ── CSV'den alınan gerçek quiz soruları (ilk 3) ── */
const DAILY_QUESTIONS = [
  {
    id: 'Q0001',
    text: "Aşağıdakilerden hangisi 'keyfi harcama'ya örnektir?",
    options: ['Kira ödemesi', 'Elektrik faturası', 'Lüks restoran yemeği', 'İlaç gideri'],
    correct: 'Lüks restoran yemeği',
    xp: 10,
    feedback_correct: 'Doğru! Keyfi harcamalar ertelenebilir.',
    feedback_wrong: 'Keyfi harcamalar zorunlu olmayan, ertelenebilir harcamalardır.',
  },
  {
    id: 'Q0003',
    text: 'Bütçe yönetiminde en sağlıklı ilk adım hangisidir?',
    options: ['Tüm geliri harcamak', 'Gelir ve zorunlu giderleri görmek', 'Sadece acil giderleri ödemek', 'Tasarruf hedefi olmadan biriktirmek'],
    correct: 'Gelir ve zorunlu giderleri görmek',
    xp: 20,
    feedback_correct: 'Evet! Önce tabloyu görmek gerekir.',
    feedback_wrong: 'Bütçe yönetimi için önce gelir ve zorunlu giderleri görmek gerekir.',
  },
  {
    id: 'Q0008',
    text: 'Düzenli birikim yapmak istiyorsun. En sağlam yöntem hangisi?',
    options: ['Ay sonu artan parayı biriktirmek', 'Gelir gelince otomatik ayırmak', 'Sadece büyük tutarları biriktirmek', 'Her ödeme döneminde karar vermek'],
    correct: 'Gelir gelince otomatik ayırmak',
    xp: 30,
    feedback_correct: 'Doğru! Otomatik ve ay başı ayırmak en etkilidir.',
    feedback_wrong: 'En etkili yöntem, gelir gelir gelmez birikimi otomatik ayırmaktır.',
  },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#070707] text-gray-300 font-mono">
      <div className="ml-[72px] min-h-screen flex flex-col px-4 sm:px-6 pt-8 pb-24">

        {/* Üst Bar */}
        <header className="border-b border-green-800/50 pb-4 mb-8 flex flex-col sm:flex-row sm:items-end gap-3 sm:justify-between">
          <div className="min-w-0">
            <p className="text-green-600 text-xs tracking-widest mb-1">SYSTEM://dashboard</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-green-500 tracking-wide">
              LEVEL 1: UYANIŞ
            </h1>
            <p className="text-xs sm:text-sm text-green-700 mt-1">
              Sistem Tehdidi: %14 — YOLO Spending Eğilimi Tespit Edildi
            </p>
          </div>
          <div className="flex-shrink-0">
            <div className="text-xs text-green-600 mb-1">XP PROGRESS</div>
            <div className="w-full sm:w-48 h-2 bg-gray-900 border border-green-800">
              <div className="h-full bg-green-500 transition-all" style={{ width: '30%' }} />
            </div>
            <p className="text-[10px] text-green-800 mt-1">300 / 1000 XP</p>
          </div>
        </header>

        {/* Üst: Eğitim modülleri — 3 kart */}
        <section className="mb-6">
          <h2 className="text-xs text-green-700 tracking-widest mb-3">// EĞİTİM MODÜLLERİ</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {LEARNING_MODULES.map(mod => (
              <div key={mod.id} className="bg-black border border-green-900/40 p-4 hover:border-green-600/50 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{mod.icon}</span>
                  <span className="text-green-400 font-bold text-sm">{mod.title}</span>
                </div>
                <p className="text-gray-500 text-xs leading-relaxed mb-3">{mod.body}</p>
                <div className="border-l-2 border-green-800 pl-2">
                  <p className="text-green-700 text-[10px] font-mono">💡 {mod.tip}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Alt: Günlük sorular + Oyunlar */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 flex-1">

          {/* SOL: Günlük Sorular */}
          <section className="bg-black border border-gray-800 rounded overflow-hidden shadow-2xl">
            <div className="w-full h-8 bg-gray-900 flex items-center px-4 border-b border-gray-800">
              <span className="text-xs text-green-500">root@matrix:~# ./daily_quiz.sh</span>
            </div>
            <div className="p-5 space-y-4">
              <h3 className="text-sm text-green-400 font-bold">📝 Günlük 3 Soru</h3>
              {DAILY_QUESTIONS.map((q, i) => (
                <div key={q.id} className="border border-gray-800 p-3">
                  <p className="text-xs text-gray-400 mb-2">
                    <span className="text-green-700 mr-1">Q{i + 1}.</span>
                    {q.text}
                  </p>
                  <div className="grid grid-cols-1 gap-1">
                    {q.options.map(opt => (
                      <button key={opt}
                        className="text-left text-xs px-3 py-1.5 border border-gray-800 text-gray-500 hover:border-green-700 hover:text-green-400 transition-colors font-mono">
                        <span className="text-green-900 mr-1">›</span>{opt}
                      </button>
                    ))}
                  </div>
                  <p className="text-[10px] text-green-900 mt-1">+{q.xp} XP</p>
                </div>
              ))}
              <Link href="/level1"
                className="block w-full text-center py-2.5 border border-green-600/40 text-green-600 hover:bg-green-900/20 hover:border-green-500 transition-all text-xs font-bold">
                📚 Tüm BES Quiz&apos;i Çöz (26 Soru) →
              </Link>
            </div>
          </section>

          {/* SAĞ: Oyun Seçim Alanı */}
          <section className="bg-black border border-red-900/30 rounded overflow-hidden shadow-[0_0_20px_rgba(255,0,0,0.05)]">
            <div className="w-full h-8 bg-red-900/10 flex items-center px-4 border-b border-red-900/30">
              <span className="text-xs text-red-500">⚡ AKSİYON MODÜLÜ — Oyun Seç</span>
            </div>
            <div className="p-5 grid grid-cols-1 gap-3">

              <Link href="/games/memory-match"
                className="group flex items-center gap-4 p-4 border border-red-900/40 hover:border-red-500 hover:bg-red-900/10 transition-all min-w-0">
                <div className="text-2xl flex-shrink-0">🃏</div>
                <div className="min-w-0 flex-1">
                  <div className="text-red-400 font-bold group-hover:text-red-300 truncate">Kırmızı Elbiseli Kadın</div>
                  <div className="text-xs text-gray-600 mt-0.5">Dikkat dağıtıcıları eşleştir, harcama tuzaklarını engelle</div>
                </div>
                <span className="ml-auto text-green-600 text-xs flex-shrink-0">+150 XP →</span>
              </Link>

              <Link href="/games/match"
                className="group flex items-center gap-4 p-4 border border-yellow-900/40 hover:border-yellow-500 hover:bg-yellow-900/10 transition-all min-w-0">
                <div className="text-2xl flex-shrink-0">⚡</div>
                <div className="min-w-0 flex-1">
                  <div className="text-yellow-400 font-bold group-hover:text-yellow-300 truncate">Akıllı Eşleştirme</div>
                  <div className="text-xs text-gray-600 mt-0.5">Finansal kavramları doğru eşleştir, sistemi hackle</div>
                </div>
                <span className="ml-auto text-green-600 text-xs flex-shrink-0">+200 XP →</span>
              </Link>

              <Link href="/games/bes-tower"
                className="group flex items-center gap-4 p-4 border border-green-900/40 hover:border-green-500 hover:bg-green-900/10 transition-all min-w-0">
                <div className="text-2xl flex-shrink-0">🏗️</div>
                <div className="min-w-0 flex-1">
                  <div className="text-green-400 font-bold group-hover:text-green-300 truncate">BES Kulesi</div>
                  <div className="text-xs text-gray-600 mt-0.5">Yatırım bloklarını istifliyerek geleceğini inşa et</div>
                </div>
                <span className="ml-auto text-green-600 text-xs flex-shrink-0">+300 XP →</span>
              </Link>

              <Link href="/leaderboard"
                className="group flex items-center gap-4 p-4 border border-purple-900/40 hover:border-purple-500 hover:bg-purple-900/10 transition-all min-w-0">
                <div className="text-2xl flex-shrink-0">🏆</div>
                <div className="min-w-0 flex-1">
                  <div className="text-purple-400 font-bold group-hover:text-purple-300 truncate">Sıralama Tablosu</div>
                  <div className="text-xs text-gray-600 mt-0.5">En iyi tasarrufçuları gör</div>
                </div>
                <span className="ml-auto text-green-600 text-xs flex-shrink-0">→</span>
              </Link>

            </div>
          </section>
        </div>
      </div>

      <OracleChatWidget />
    </div>
  );
}
