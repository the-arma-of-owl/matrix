'use client';

import { useState } from 'react';
import { ArrowRight, CheckCircle, AlertTriangle, Lightbulb, Sparkles } from 'lucide-react';
import Link from 'next/link';

/* ── 26 BES QUIZ SORUSU (agesa'dan adapte) ── */
interface QuizQuestion { id: number; question: string; options: string[]; correct: string; }

const BES_QUESTIONS: QuizQuestion[] = [
  { id:1, question:"BES'te devlet katkısı 1 Ocak 2026'dan itibaren kaç % olarak güncellendi?", options:['%30','%25','%20','%15'], correct:'%20' },
  { id:2, question:"1 Ocak 2026 sonrası devlet katkısı değişikliği kimlerin hesabını etkiler?", options:['Mevcut hesaplardaki devlet katkısı tutarları','2026 öncesi tüm katkı payları','2026 sonrası şirket hesaplarına intikal eden katkı payları','Sadece yeni sözleşmeler'], correct:'2026 sonrası şirket hesaplarına intikal eden katkı payları' },
  { id:3, question:"2026 yılı sonrasında yatırılan tüm katkı paylarına hangi oranda devlet katkısı uygulanır?", options:['%30','%25','%20','%10'], correct:'%20' },
  { id:4, question:"Yıllara yaygın devlet katkısında, limiti aşan ödemeler hangi oran üzerinden katkıya tabidir?", options:['%30','%25','%15','%20'], correct:'%20' },
  { id:5, question:"Devlet katkısı oranının %30'dan %20'ye düşmesinin nedeni nedir?", options:["AgeSA'ya özel alınan bir karar","BES'in başarısız olması","Katılımcı sayısının azalması","Kamu politikaları kapsamında tüm şirketler için yapılan düzenleme"], correct:'Kamu politikaları kapsamında tüm şirketler için yapılan düzenleme' },
  { id:6, question:"Bugün itibarıyla devlet katkısının tamamen kaldırılmasına yönelik bir karar var mı?", options:["Evet, 2027'de kaldırılıyor","Evet, yeni katılımcılar için kaldırıldı","Hayır, böyle bir karar bulunmamaktadır","Belirsiz, henüz açıklanmadı"], correct:'Hayır, böyle bir karar bulunmamaktadır' },
  { id:7, question:"Devlet katkısı %20'ye düşmesine rağmen BES'te kalmalı mısınız?", options:["Hayır, diğer yatırım araçları daha avantajlı","Kesinlikle evet, BES yalnızca devlet katkısından ibaret değildir","Belirsiz, piyasaya göre karar verilmeli","Hayır, devlet katkısı çok düştü"], correct:"Kesinlikle evet, BES yalnızca devlet katkısından ibaret değildir" },
  { id:8, question:"BES'in diğer yatırım araçlarından temel farkı nedir?", options:["BES her zaman daha yüksek getiri sağlar","BES'te hiç risk yoktur","BES; devlet katkısı ve uzun vadeli teşvik yapısı sunan bir sistemdir","BES'te vergiden tam muafiyet vardır"], correct:"BES; devlet katkısı ve uzun vadeli teşvik yapısı sunan bir sistemdir" },
  { id:9, question:"Gerekli evrak ibrazı zamanında yapılmazsa ne olur?", options:["Sözleşme otomatik iptal edilir","Tüm devlet katkısı Hazine'ye iade edilir","Kısmen alınan tutarın %20'si devlet katkısı hesabından Hazine'ye iade edilir","Yalnızca ceza ödemesi yapılır"], correct:"Kısmen alınan tutarın %20'si devlet katkısı hesabından Hazine'ye iade edilir" },
  { id:10, question:"Bireysel emeklilik sisteminde devlet katkısı oranı kaçtır?", options:['%10','%25','%30','%20'], correct:'%20' },
  { id:11, question:"Devlet katkısı nedir?", options:["Vergi indirimi uygulaması","Devletin BES katılımcılarına teşvik amacıyla yaptığı destek ödemesi","Emeklilik maaşı","Sigorta prim desteği"], correct:"Devletin BES katılımcılarına teşvik amacıyla yaptığı destek ödemesi" },
  { id:12, question:"Devlet katkısından kimler faydalanabilir?", options:["Sadece vergi mükellefi çalışanlar","Yalnızca 25 yaş üstü T.C. vatandaşları","Katkı payı ödeyen, vergi mükellefi olsun olmasın tüm T.C. vatandaşları","Yalnızca devlet memurları"], correct:"Katkı payı ödeyen, vergi mükellefi olsun olmasın tüm T.C. vatandaşları" },
  { id:13, question:"Eşiniz ve çocuklarınız adına katkı payı ödüyorsunuz. Devlet katkısı alma hakkı kime aittir?", options:["Yalnızca ödeme yapan kişiye (size)","Sadece eşinize","Eşiniz ve çocuklarınız katkıdan ayrı ayrı faydalanabilir","Yalnızca reşit olanlara"], correct:"Eşiniz ve çocuklarınız katkıdan ayrı ayrı faydalanabilir" },
  { id:14, question:"Devlet katkısından faydalanmak için katılımcının yapması gereken işlem nedir?", options:["Her yıl başvuru formu doldurmak","Vergi dairesine bildirimde bulunmak","Özel bir başvuru yapmak","Herhangi bir işlem gerekmez, katkı payı ödemesi yeterlidir"], correct:"Herhangi bir işlem gerekmez, katkı payı ödemesi yeterlidir" },
  { id:15, question:"Yıllık devlet katkısı üst sınırı nasıl belirlenir?", options:["Yıllık net asgari ücretin %30'u","Yıllık brüt asgari ücretin %20'si","Ödenen toplam katkı payının tamamı","Yıllık gelirin %10'u"], correct:"Yıllık brüt asgari ücretin %20'si" },
  { id:16, question:"Devlet katkısı hangi hesapta değerlendirilir?", options:["Ticari bankalardaki mevduat hesabında","Sigortacılık şirketinin ana hesabında","Takasbank nezdinde katılımcının bireysel emeklilik alt hesabında","Hazinenin yönettiği özel hesapta"], correct:"Takasbank nezdinde katılımcının bireysel emeklilik alt hesabında" },
  { id:17, question:"1 Ocak 2013 itibarıyla devlet katkısı hak edişi nasıl uygulanmaktadır?", options:["İlk günden itibaren %100 hak edilir","Kademeli bir hak ediş yapısı uygulanmaktadır","Yalnızca emeklilik anında hak edilir","5 yıl sonra tek seferde hak edilir"], correct:"Kademeli bir hak ediş yapısı uygulanmaktadır" },
  { id:18, question:"1 Ocak 2013 öncesinde BES'te olan ve 1 Ocak 2016 itibarıyla sözleşmesi yürürlükte olanlara ne avantajı sağlanmıştır?", options:["%30 devlet katkısı almaya devam ederler","Hak ediş süresinde ek avantaj tesis edilmiştir","Ek katkı payı ödemesi alırlar","Vergiden tam muaf tutulurlar"], correct:"Hak ediş süresinde ek avantaj tesis edilmiştir" },
  { id:19, question:"BES'te devlet katkısı istisnası hangi tarihe kadar uygulanmıştır?", options:["29 Mayıs 2014'e kadar","31 Aralık 2014'e kadar","1 Ocak 2015'e kadar","29 Haziran 2015'e kadar"], correct:"31 Aralık 2014'e kadar" },
  { id:20, question:"Devlet katkısı hangi sözleşme türlerine uygulanır?", options:["Yalnızca işveren grup emeklilik sözleşmelerine","Tüm emeklilik ve sigorta sözleşmelerine","Bireysel ve gruba bağlı bireysel emeklilik sözleşmelerine","Yalnızca bireysel sözleşmelere"], correct:"Bireysel ve gruba bağlı bireysel emeklilik sözleşmelerine" },
  { id:21, question:"BES'te devlet katkısı ile vergi matrahından indirim aynı anda uygulanabilir mi?", options:["Evet, her ikisi birden kullanılabilir","Hayır, devlet katkısı, vergi matrahından indirim uygulamasının yerine geçmiştir","Yalnızca yüksek gelirli kişiler ikisini birden kullanabilir","Belirli limite kadar ikisi birlikte kullanılabilir"], correct:"Hayır, devlet katkısı, vergi matrahından indirim uygulamasının yerine geçmiştir" },
  { id:22, question:"Emeklilik hakkı kazanıldıktan sonra BES sözleşmesine devam edilirse devlet katkısı alınabilir mi?", options:["Hayır, emeklilik hakkı kazanıldıktan sonra katkı durur","Evet, katkı payı ödenmeye devam edilirse devlet katkısı da alınmaya devam edilir","Yalnızca 2 yıl daha alınabilir","Yalnızca yarım oranında alınabilir"], correct:"Evet, katkı payı ödenmeye devam edilirse devlet katkısı da alınmaya devam edilir" },
  { id:23, question:"Devlet katkısı üst limitini aşan katkı payları için ne olur?", options:["O tutarlara hiç devlet katkısı ödenemez","Fazla ödeme iade edilir","Sonraki yıllara devredilerek katkı hak edilmeye devam edilir","Yalnızca yarısı için devlet katkısı ödenir"], correct:"Sonraki yıllara devredilerek katkı hak edilmeye devam edilir" },
  { id:24, question:"Birden fazla BES sözleşmesi varsa devlet katkısı nasıl hesaplanır?", options:["Her sözleşme için sabit tutar ödenir","Yalnızca en eski sözleşmeye katkı ödenir","Katılımcı bazında, sözleşmelere ödenen tutara göre oransal dağıtılır","Sözleşme sayısı arttıkça oran düşer"], correct:"Katılımcı bazında, sözleşmelere ödenen tutara göre oransal dağıtılır" },
  { id:25, question:"Devlet katkısı üst limitini aşan tutarlar ne zaman hesaba yansıtılır?", options:["Aynı ay içinde","Bir sonraki yılın Şubat ayında","Bir sonraki yılın Temmuz ayında","İki yıl sonra"], correct:"Bir sonraki yılın Şubat ayında" },
  { id:26, question:"Devlet katkısı devir hakkı ne kadar süre geçerlidir?", options:["En fazla 5 yıl","Emeklilik yaşına kadar","En fazla 10 yıl","Sözleşme devam ettiği sürece, herhangi bir süre sınırı yoktur"], correct:"Sözleşme devam ettiği sürece, herhangi bir süre sınırı yoktur" },
];

const FINANCIAL_TRAPS = [
  { id:1, icon:'☕', name:'Kahve Tuzağı', agentSmithTactic:'"Tek bir kahve ne yapar ki?"', description:'Her gün alınan küçük harcamalar birikerek büyük kayıplara yol açar.', solution:'Günlük 50₺ → 20 yılda %15 getiriyle ~750.000₺' },
  { id:2, icon:'🛍️', name:'İmpulse Alışveriş', agentSmithTactic:'"Sadece bu sefer, fiyat çok cazip."', description:'Anlık tatmin için yapılan plansız alımlar bütçeyi eritir.', solution:'Alımdan önce 48 saat bekle, gerçekten ihtiyacın var mı?' },
  { id:3, icon:'💳', name:'Minimum Ödeme Tuzağı', agentSmithTactic:'"Minimum ödesen yeter, geri kalanı zamanla ödersin."', description:'Kredi kartı asgari ödemesi borcun katlana katlana büyümesine yol açar.', solution:'Kartı her ay tamamen öde, yoksa faiz %5-10 arasında' },
  { id:4, icon:'📱', name:'Abonelik Tutma', agentSmithTactic:'"İptal etmek çok uğraştırıcı, belki kullanırsın."', description:'Kullanılmayan abonelikler aylık yüzlerce lira eritir.', solution:"Her 3 ayda bir aboneliklerini gözden geçir" },
];

const XP_PER_CORRECT = 15;
const COIN_PER_CORRECT = 5;

export default function Level1Page() {
  const [questionIdx, setQuestionIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [showTraps, setShowTraps] = useState(false);
  const [done, setDone] = useState(false);
  const [lastResult, setLastResult] = useState<'correct' | 'wrong' | null>(null);
  const [selectedOpt, setSelectedOpt] = useState<string | null>(null);
  const [locked, setLocked] = useState(false);

  const q = BES_QUESTIONS[questionIdx];
  const totalQ = BES_QUESTIONS.length;

  const handleAnswer = (opt: string) => {
    if (locked) return;
    setLocked(true);
    setSelectedOpt(opt);
    const isCorrect = opt === q.correct;
    setLastResult(isCorrect ? 'correct' : 'wrong');
    if (isCorrect) setScore(s => s + 1);

    setTimeout(() => {
      setSelectedOpt(null);
      setLastResult(null);
      setLocked(false);
      if (questionIdx < totalQ - 1) setQuestionIdx(i => i + 1);
      else setDone(true);
    }, isCorrect ? 800 : 1200);
  };

  const restart = () => { setQuestionIdx(0); setScore(0); setDone(false); setLastResult(null); setSelectedOpt(null); setLocked(false); };

  /* ─── FİNANSAL TUZAKLAR ─── */
  if (showTraps) return (
    <div className="min-h-screen bg-[#0D0208] p-4 pl-[88px]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <AlertTriangle className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
          <h1 className="text-2xl font-bold text-[#00FF41] font-mono tracking-widest mb-1">FİNANSAL TUZAKLAR</h1>
          <p className="text-gray-600 font-mono text-xs">// Kaçınman gereken hatalar</p>
        </div>
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {FINANCIAL_TRAPS.map(trap => (
            <div key={trap.id} className="p-5 border border-[#00FF41]/20 bg-[#0a0a0a] rounded">
              <div className="flex items-start gap-3">
                <div className="text-3xl">{trap.icon}</div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-[#00FF41] mb-1.5 font-mono flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-yellow-400" />{trap.name}
                  </h3>
                  <p className="text-gray-400 text-xs mb-2">{trap.description}</p>
                  <div className="bg-black border border-red-900/40 rounded p-2 mb-2">
                    <p className="text-red-400 text-[10px] font-mono mb-0.5">[AJAN SMİTH TEKTİĞİ]:</p>
                    <p className="text-red-300 text-xs italic">&ldquo;{trap.agentSmithTactic}&rdquo;</p>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5 text-[#00FF41] flex-shrink-0 mt-0.5" />
                    <p className="text-[#00FF41]/80 text-xs font-mono">{trap.solution}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link href="/dashboard" className="inline-flex items-center gap-2 bg-[#00FF41] text-black px-10 py-4 font-bold font-mono shadow-[0_0_20px_rgba(0,255,65,0.4)] hover:bg-[#00CC33] transition-colors">
            <Sparkles className="w-5 h-5" />DASHBOARD&apos;A DÖN<ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );

  /* ─── TAMAMLANDI ─── */
  if (done) {
    const pct = Math.round((score / totalQ) * 100);
    return (
      <div className="min-h-screen bg-[#0D0208] flex items-center justify-center p-4 pl-[88px]">
        <div className="w-full max-w-md border border-[#00FF41]/30 bg-[#0a0a0a] p-8 text-center">
          <div className="text-5xl mb-4">{pct >= 70 ? '🏆' : pct >= 50 ? '📊' : '📚'}</div>
          <h2 className="text-2xl font-bold text-[#00FF41] font-mono mb-2">QUIZ TAMAMLANDI</h2>
          <p className="text-4xl font-bold text-[#00FF41] font-mono mb-1">{score}<span className="text-gray-600 text-2xl">/{totalQ}</span></p>
          <p className="text-gray-500 font-mono text-sm mb-1">Doğru Cevap — %{pct}</p>
          <p className="text-yellow-400 font-mono text-xs mb-6">+{score * XP_PER_CORRECT} XP · +{score * COIN_PER_CORRECT} 🪙 kazandın</p>
          <div className="h-2 bg-[#001400] mb-6">
            <div className="h-full bg-gradient-to-r from-[#008F11] to-[#00FF41] transition-all" style={{ width: `${pct}%` }} />
          </div>
          <div className="flex gap-3">
            <button onClick={restart} className="flex-1 border border-[#00FF41]/30 text-[#00FF41] hover:bg-[#00FF41]/10 py-3 font-mono text-sm transition-colors">
              Tekrar Çöz
            </button>
            <button onClick={() => setShowTraps(true)} className="flex-1 bg-[#00FF41] text-black hover:bg-[#00CC33] font-bold font-mono py-3 text-sm shadow-[0_0_15px_rgba(0,255,65,0.3)] flex items-center justify-center gap-1 transition-colors">
              Devam Et <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ─── QUIZ ─── */
  return (
    <div className="min-h-screen bg-[#0D0208] flex flex-col p-4 pl-[88px]">
      <div className="max-w-2xl mx-auto w-full flex flex-col flex-1">
        <div className="flex items-center justify-between mb-4 pt-1">
          <div>
            <h1 className="text-sm font-bold text-[#00FF41] font-mono tracking-widest">BES EĞİTİM QUIZ</h1>
            <p className="text-gray-600 font-mono text-[10px]">Soru {questionIdx + 1} / {totalQ}</p>
          </div>
          <div className="bg-[#001400] border border-[#00FF41]/30 px-2.5 py-1 font-mono text-xs text-[#00FF41]">✓ {score}</div>
        </div>

        <div className="h-1 bg-[#001400] mb-6 w-full">
          <div className="h-full bg-[#00FF41] transition-all duration-300" style={{ width: `${(questionIdx / totalQ) * 100}%` }} />
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <div className="border border-[#00FF41]/20 bg-[#0a0a0a] p-6 mb-4">
            <p className="text-white text-base font-mono leading-relaxed mb-6">{q.question}</p>
            <div className="grid grid-cols-1 gap-2.5">
              {q.options.map(opt => {
                const isSelected = selectedOpt === opt;
                const isCorrect = opt === q.correct;
                let cls = 'border-[#00FF41]/20 text-gray-300 hover:border-[#00FF41]/60 hover:bg-[#00FF41]/5 cursor-pointer';
                if (isSelected && isCorrect) cls = 'bg-[#00FF41]/20 border-[#00FF41] text-[#00FF41]';
                else if (isSelected && !isCorrect) cls = 'bg-red-500/20 border-red-500 text-red-300';
                else if (locked && isCorrect) cls = 'bg-[#00FF41]/10 border-[#00FF41]/50 text-[#00FF41]/70';
                else if (locked) cls = 'border-[#00FF41]/10 text-gray-600 cursor-not-allowed';
                return (
                  <button key={opt} onClick={() => handleAnswer(opt)} disabled={locked}
                    className={`text-left px-4 py-3 border bg-transparent font-mono text-sm transition-all ${cls}`}>
                    <span className="text-[#00FF41]/30 mr-2 font-bold">›</span>{opt}
                  </button>
                );
              })}
            </div>
            {lastResult === 'correct' && <p className="mt-3 flex items-center gap-2 text-[#00FF41] font-mono text-xs"><CheckCircle className="w-4 h-4" /> Doğru! +{XP_PER_CORRECT} XP · +{COIN_PER_CORRECT} 🪙</p>}
            {lastResult === 'wrong' && <p className="mt-3 text-red-400 font-mono text-xs">✗ Yanlış — sonraki soruya geçiliyor...</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
