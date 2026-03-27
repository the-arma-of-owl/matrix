import { MatrixRain } from '@/components/ui/MatrixRain';

const LEADERBOARD_DATA = [
  { rank: 1, name: 'Neo_Trader', xp: 12400, savings: 87500, badges: 8,  isUser: false },
  { rank: 2, name: 'MorpheusX',  xp: 10200, savings: 73200, badges: 6,  isUser: false },
  { rank: 3, name: 'TrinityFI',  xp: 9800,  savings: 68900, badges: 7,  isUser: false },
  { rank: 4, name: 'Sen',        xp: 4200,  savings: 31500, badges: 3,  isUser: true  },
  { rank: 5, name: 'Oracle_99',  xp: 3800,  savings: 28700, badges: 4,  isUser: false },
  { rank: 6, name: 'AgentBES',   xp: 2900,  savings: 21000, badges: 2,  isUser: false },
  { rank: 7, name: 'ZionSaver',  xp: 2100,  savings: 15600, badges: 1,  isUser: false },
  { rank: 8, name: 'RedPill88',  xp: 1800,  savings: 12400, badges: 1,  isUser: false },
];

const RANK_COLORS: Record<number, string> = {
  1: 'text-yellow-400 border-yellow-400/50 bg-yellow-400/5',
  2: 'text-gray-300 border-gray-300/50 bg-gray-300/5',
  3: 'text-amber-600 border-amber-600/50 bg-amber-600/5',
};

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-[#070707] text-gray-300 font-mono relative">
      <MatrixRain opacity={0.04} speed={0.6} />

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-12">
        {/* Başlık */}
        <div className="mb-10 text-center">
          <p className="text-green-600 text-xs tracking-widest mb-2">SYSTEM://leaderboard</p>
          <h1 className="text-3xl font-bold text-green-400 tracking-wide">
            🏆 LİDERLİK TABLOSU
          </h1>
          <p className="text-gray-600 text-sm mt-2">
            En büyük rakibin dünkü kendin ve Ajan Smith (enflasyon).
          </p>
        </div>

        {/* Tablo */}
        <div className="space-y-2">
          {LEADERBOARD_DATA.map((entry) => {
            const rankStyle = RANK_COLORS[entry.rank] || 'text-green-600 border-green-900/40 bg-transparent';
            return (
              <div
                key={entry.rank}
                className={`flex items-center gap-4 p-4 border rounded transition-all ${
                  entry.isUser
                    ? 'border-green-500/60 bg-green-900/10 shadow-[0_0_20px_rgba(0,255,65,0.08)]'
                    : `border-gray-800/60 hover:border-gray-700`
                }`}
              >
                {/* Sıra */}
                <div className={`w-10 h-10 flex items-center justify-center border rounded font-bold text-lg ${rankStyle}`}>
                  {entry.rank <= 3 ? ['🥇','🥈','🥉'][entry.rank - 1] : entry.rank}
                </div>

                {/* İsim */}
                <div className="flex-1">
                  <div className={`font-bold ${entry.isUser ? 'text-green-400' : 'text-gray-200'}`}>
                    {entry.name} {entry.isUser && <span className="text-xs text-green-600">(Sen)</span>}
                  </div>
                  <div className="text-xs text-gray-600 mt-0.5">
                    {entry.badges} rozet • {entry.xp.toLocaleString()} XP
                  </div>
                </div>

                {/* Birikim */}
                <div className="text-right">
                  <div className="text-green-400 font-bold">₺{entry.savings.toLocaleString()}</div>
                  <div className="text-xs text-gray-600">Toplam Birikim</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Alt bilgi */}
        <div className="mt-10 p-4 border border-gray-800/60 rounded">
          <h3 className="text-green-400 font-bold mb-2 text-sm">💡 Nasıl Yükselirim?</h3>
          <p className="text-gray-500 text-xs leading-relaxed">
            Daha fazla BES katkısı yaparak, mini oyunlarda başarılı olarak
            ve eğitimleri tamamlayarak birikimini ve XP&apos;ni artır.
            Her tamamlanan modül için rozet kazanırsın.
          </p>
        </div>
      </div>
    </div>
  );
}
