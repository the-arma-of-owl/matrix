# MATRIX FI: Hackathon Ekibi Başlangıç Rehberi 💊

> Bu depo (repository), AgeSA Insurtech Hackathonu için hazırladığımız ana projeyi içermektedir. "Fintek Dashboard" mantığının ötesine geçerek bir finansal simülasyon yarattık.  Her bir ekip arkadaşının nereye kod yazacağı ve nasıl çalışacağı aşağıda detaylandırılmıştır.

---

## 🏗️ Projenin Mimari İş Bölümü

```text
/src
  /app/
    /api           -> (AI ve Veri Analizi Yapan Kişinin Çalışma Alanı)
    /dashboard     -> (TryHackMe Mimarisi Geliştiricisinin Alanı)
    /login         -> (Matrix Login UI Geliştiricisi)
    /profile       -> (Profil Yükleme Ekranı)
    page.tsx       -> (Video arka planlı giriş ekranı)
  
  /components/
    /games/        -> (Red Dress, Quiz vs. Oyun Geliştiren Ekibin İzole Alanı)
    /ui/           -> (Butonlar, AI Chat Baloncuğu)

/public            -> (Videocu & Animatör Arkadaşın Assets Klasörü)
```

### 👩‍💻 Kim Nereyi Yapacak?

**1️⃣ Video ve Animasyon Sorumlusu**
- Ana Sayfa (`/app/page.tsx`) arkasında çalışacak "Morpheus" videolarını, Glitch ve Matrix code rain efektlerini veya AI üretilmiş `.mp4` dosyalarını doğrudan `public/videos/` klasörü altına atacak. Sayfalar arası geçişlerde kullanılmak için kısa loop edilen siberpunk videolar üretecek. Eğitimi bırakma ekranı (Cypher) için efsanevi bir şok videosu hazırlayacak.

**2️⃣ Oyun Geliştiricisi (React - Mini Games)**
- Dosya: `src/components/games/RedDressGame.tsx` ve `QuizModule.tsx`
- Dashboard kodlama karmaşasına HİÇ GİRMEDEN, oyunlarınızı tamamen dışarıdan prop alıp puan dışarı verecek şekilde yazacaksınız. 
- Oyun içi "Zorluk" seviyesini, ve puanlamayı Dashboard'a (Ana React state'ine) bir callback olarak geri döndüreceksiniz: `onComplete={(score) => setTotalXp(x)}`

**3️⃣ AI & Veri (Backend/RAG) Sorumlusu**
- Dosya: `src/app/api/chat/route.ts` (Sohbet Baloncuğu)
- Kendi localhostunuzda koşturduğunuz RAG Python (FastAPI/Flask) projesinin uç noktasını Next.js'e bağlama yeri burasıdır. (Kendi python scriptinize CORS ayarı eklemeyi unutmayın!)
- Dosya: `src/app/api/bes/route.ts` vs. 
- Masaüstündeki `spendings.csv` ve `bes_scenarios.csv` dosyalarını okuyup o veri analizini bu Next.js API route'larının içerisinde dönüp, Frontend'e json formatında JSON çekeceksiniz.

---

## 🔌 Nasıl Başlayacağız?

Projeyi bilgisayarınıza klonladıktan sonra:
1. `npm install` (Bağımlılıkları yükleyin)
2. `npm run dev` (Localhost:3000'de başlatın)

Her sayfanın içi şu anda basit placeholder'lardan (iskelet yapılardan) oluşuyor. İlgili klasöre girip kendi modülünüzü yazmaya direkt başlayabilirsiniz! Başarılar! 🚀
