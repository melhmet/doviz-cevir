# DövizÇevir — Sistem Dokümantasyonu

> Anlık döviz kuru dönüşüm uygulaması
> Versiyon: 0.1.0 | Son Güncelleme: 2026-04-13

---

## 1. Proje Özeti

**DövizÇevir**, kullanıcıların anlık ve güvenilir döviz kuru verilerine erişerek para birimleri arasında hızlı dönüşüm yapabilmesini sağlayan mobil öncelikli bir uygulamadır. İlk aşamada Android platformu hedeflenmekte, ilerleyen süreçte iOS desteği planlanmaktadır.

### 1.1 Vizyon

Türkiye pazarında TRY odaklı, reklamsız (Pro) veya minimal reklamlı (Free) bir döviz çevirici olarak konumlanmak. Altın fiyatları, TCMB efektif kur farkları ve ana ekran widget desteği ile rakiplerden ayrışmak.

### 1.2 Hedef Kitle

- Döviz alım-satımı yapan bireysel kullanıcılar
- Seyahat planlayan turistler
- E-ticaret / freelance çalışanlar (USD/EUR faturalandırma)
- Öğrenciler ve akademisyenler

---

## 2. Teknik Mimari

### 2.1 Genel Yapı

```
┌─────────────────────────────────────────────────┐
│                    CLIENT                        │
│  React Native (Expo)                             │
│  ┌──────────┐ ┌──────────┐ ┌──────────────────┐ │
│  │ Converter│ │ Rates    │ │ Widget (native)  │ │
│  │ Screen   │ │ Screen   │ │ Home Screen      │ │
│  └──────────┘ └──────────┘ └──────────────────┘ │
└─────────────────┬───────────────────────────────┘
                  │ HTTPS
┌─────────────────▼───────────────────────────────┐
│              PROXY / BACKEND                     │
│  Cloudflare Workers (veya Vercel Edge)           │
│  - API key gizleme                               │
│  - Rate limiting                                 │
│  - Cache (5dk TTL)                               │
│  - CORS yönetimi                                 │
└─────────────────┬───────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────┐
│            HARİCİ VERİ KAYNAKLARI                │
│  ┌─────────────────┐  ┌───────────────────────┐ │
│  │ ExchangeRate-API│  │ TCMB Açık Veri (XML)  │ │
│  │ (Birincil)      │  │ (Altın/BIST opsiyonel)│ │
│  └─────────────────┘  └───────────────────────┘ │
└─────────────────────────────────────────────────┘
```

### 2.2 Teknoloji Yığını

| Katman | Teknoloji | Gerekçe |
|--------|-----------|---------|
| **Mobil Framework** | React Native + Expo | Tek kod tabanı, hızlı geliştirme, web deneyiminden kolay geçiş |
| **State Management** | Zustand | Hafif, boilerplate az, React hooks uyumlu |
| **HTTP Client** | Axios | Interceptor desteği, timeout yönetimi |
| **Lokal Depolama** | AsyncStorage + MMKV | Favori çiftler, son kurlar, kullanıcı tercihleri |
| **Backend Proxy** | Cloudflare Workers | Ücretsiz plan (100K istek/gün), edge caching |
| **Kur API** | ExchangeRate-API (ücretsiz) | 1.500 istek/ay, 161 para birimi |
| **Yedek API** | FreecurrencyAPI | Günlük 5.000 istek ücretsiz |
| **Analytics** | Firebase Analytics | Ücretsiz, crash reporting dahil |
| **Reklam** | Google AdMob | Banner + interstitial, Türkiye'de iyi doluluk |
| **CI/CD** | EAS Build + GitHub Actions | OTA güncellemeler, otomatik build |

### 2.3 Desteklenen Para Birimleri (v1.0)

**Birincil (20 adet):** TRY, USD, EUR, GBP, CHF, JPY, SAR, AED, CAD, AUD, RUB, CNY, KWD, NOK, SEK, DKK, BGN, GEL, QAR, KRW

**v1.1+ ile genişletilecek:** Tüm ExchangeRate-API destekli 161 para birimi

---

## 3. Uygulama Özellikleri

### 3.1 MVP (v1.0) — Minimum Uygulanabilir Ürün

| Özellik | Öncelik | Açıklama |
|---------|---------|----------|
| Çift yönlü dönüşüm | P0 | Her iki alana da giriş yapılabilmeli |
| Para birimi seçici | P0 | Arama destekli, bayrak ikonlu modal |
| Anlık kur verisi | P0 | API'den çekilen güncel kurlar |
| Swap (yer değiştir) | P0 | Tek tuşla para birimlerini değiştir |
| Popüler kurlar kartları | P0 | Seçilen baz birime göre 4-5 popüler kur |
| Çevrimdışı mod | P1 | Son başarılı kur verisini cache'le |
| Karanlık / Aydınlık tema | P1 | Sistem temasına otomatik uyum |
| Türkçe / İngilizce dil desteği | P1 | i18n altyapısı |

### 3.2 v1.1 — İkinci Sürüm

| Özellik | Açıklama |
|---------|----------|
| Ana ekran widget | Android widget ile anlık kur gösterimi |
| Favori para çiftleri | Sık kullanılan çiftleri kaydet |
| Kur değişim grafiği | Son 7/30/90 gün trendi (line chart) |
| Push bildirim | Belirli kur eşiğinde uyarı |
| Altın fiyatları | Gram/ons altın, TCMB verisinden |

### 3.3 v2.0 — Gelecek Planlama

| Özellik | Açıklama |
|---------|----------|
| iOS sürümü | Apple App Store yayını |
| TCMB efektif kur farkı | Döviz alış/satış spread gösterimi |
| Çoklu dönüşüm | Aynı anda birden fazla para birimine çevir |
| Affiliate entegrasyonu | Wise/Papara yönlendirme komisyonu |
| Pro abonelik | Reklamsız, gelişmiş özellikler |

---

## 4. API Stratejisi

### 4.1 Birincil: ExchangeRate-API

```
GET https://v6.exchangerate-api.com/v6/{API_KEY}/latest/USD

Yanıt:
{
  "result": "success",
  "base_code": "USD",
  "conversion_rates": {
    "TRY": 38.45,
    "EUR": 0.88,
    ...
  }
}
```

**Limitler (Ücretsiz Plan):**
- 1.500 istek/ay
- Günlük güncelleme (saatlik değil)
- 161 para birimi

### 4.2 Yedek: FreecurrencyAPI

```
GET https://api.freecurrencyapi.com/v1/latest?apikey={KEY}&base_currency=USD

Yanıt:
{
  "data": {
    "TRY": 38.45,
    "EUR": 0.88,
    ...
  }
}
```

**Limitler (Ücretsiz Plan):**
- 5.000 istek/ay
- 32 para birimi

### 4.3 Cache Stratejisi

```
Kullanıcı isteği
    │
    ▼
[MMKV Cache kontrol]
    │
    ├─ Cache < 5 dk → Cache'den dön
    │
    └─ Cache ≥ 5 dk → API çağrısı
                          │
                          ├─ Başarılı → Güncelle + dön
                          │
                          └─ Başarısız → Eski cache + uyarı
```

- **Cache süresi:** 5 dakika (ücretsiz API günlük güncellediği için agresif cache güvenli)
- **Offline fallback:** En son başarılı API yanıtı kalıcı olarak saklanır
- **Proxy cache:** Cloudflare Workers'da 10 dk edge cache

### 4.4 API Anahtarı Güvenliği

API anahtarları **hiçbir zaman** istemci tarafında saklanmaz. Tüm çağrılar Cloudflare Workers proxy'si üzerinden yapılır:

```
Mobil Uygulama → Cloudflare Worker → ExchangeRate-API
                  (API key burada)
```

---

## 5. Proje Yapısı

```
doviz-cevir/
├── app/                          # Expo Router ekranları
│   ├── (tabs)/
│   │   ├── index.tsx             # Ana çevirici ekranı
│   │   ├── rates.tsx             # Tüm kurlar listesi
│   │   └── settings.tsx          # Ayarlar
│   ├── _layout.tsx               # Root layout
│   └── currency-select.tsx       # Modal: para birimi seçici
│
├── components/
│   ├── converter/
│   │   ├── AmountInput.tsx       # Tutar giriş alanı
│   │   ├── CurrencyButton.tsx    # Para birimi seçim butonu
│   │   ├── SwapButton.tsx        # Yer değiştirme butonu
│   │   └── RateInfo.tsx          # Kur bilgi satırı
│   ├── rates/
│   │   ├── QuickRates.tsx        # Popüler kurlar grid
│   │   └── RateCard.tsx          # Tekil kur kartı
│   └── common/
│       ├── Header.tsx
│       └── LoadingSpinner.tsx
│
├── store/
│   ├── useCurrencyStore.ts       # Zustand: seçili birimler, tutar
│   └── useRatesStore.ts          # Zustand: kur verileri, cache
│
├── services/
│   ├── api.ts                    # Axios instance + interceptors
│   ├── exchangeRate.ts           # Kur API çağrıları
│   └── cache.ts                  # MMKV cache yönetimi
│
├── utils/
│   ├── currencies.ts             # Para birimi meta verileri
│   ├── format.ts                 # Sayı formatlama (TR locale)
│   └── convert.ts                # Dönüşüm hesaplama
│
├── constants/
│   ├── colors.ts                 # Tema renkleri
│   └── config.ts                 # API URL'leri, cache süreleri
│
├── hooks/
│   ├── useExchangeRates.ts       # Kur verisi hook'u
│   └── useOfflineStatus.ts       # Çevrimdışı durum
│
├── workers/                      # Cloudflare Workers proxy
│   ├── src/
│   │   └── index.ts              # Worker handler
│   ├── wrangler.toml             # Worker konfigürasyonu
│   └── package.json
│
├── assets/
│   ├── fonts/
│   └── images/
│
├── app.json                      # Expo konfigürasyonu
├── eas.json                      # EAS Build konfigürasyonu
├── package.json
├── tsconfig.json
└── README.md
```

---

## 6. Gelir Modeli

### 6.1 Aşamalı Monetizasyon

| Aşama | Strateji | Tahmini Gelir |
|-------|----------|---------------|
| **v1.0 (0-3 ay)** | Reklam yok, kullanıcı tabanı oluşturma | $0 |
| **v1.1 (3-6 ay)** | Banner reklam (AdMob) ekleme | $10-150/ay |
| **v1.2 (6-12 ay)** | Interstitial reklam + Pro (reklamsız) seçeneği | $100-500/ay |
| **v2.0 (12+ ay)** | Affiliate + Pro abonelik + genişleme | $500-2000/ay |

### 6.2 Reklam Yapılandırması

```
Free Tier:
├── Banner reklam (ekran altı, sürekli)
├── Interstitial (her 10 dönüşümde 1)
└── Uygulama açılışında splash reklam (opsiyonel)

Pro Tier ($0.99/ay veya $7.99/yıl):
├── Sıfır reklam
├── Widget desteği
├── Kur alarmları
└── Gelişmiş grafikler
```

### 6.3 Maliyet Tahmini

| Kalem | Başlangıç | Aylık (büyüme) |
|-------|-----------|----------------|
| Google Play geliştirici | $25 (tek sefer) | — |
| ExchangeRate-API | $0 | $0-12 |
| Cloudflare Workers | $0 | $0-5 |
| Firebase | $0 | $0 |
| **Toplam** | **$25** | **$0-17** |

---

## 7. Dağıtım ve Yayınlama

### 7.1 Build Pipeline

```
GitHub Push
    │
    ▼
GitHub Actions
    │
    ├─ Lint + Type Check
    ├─ Unit Tests (Jest)
    │
    ▼
EAS Build (Expo Application Services)
    │
    ├─ Android APK/AAB → Google Play Console
    │                      ├─ Internal Testing
    │                      ├─ Closed Beta
    │                      └─ Production
    │
    └─ (v2.0) iOS IPA → App Store Connect
```

### 7.2 OTA Güncellemeler

Expo EAS Update ile JavaScript bundle güncellemeleri kullanıcıya anında ulaşır — mağaza onayı beklemeye gerek yok.

```bash
eas update --branch production --message "Kur API cache iyileştirmesi"
```

### 7.3 Ortam Değişkenleri

```env
# .env.development
API_BASE_URL=http://localhost:8787
ADMOB_BANNER_ID=ca-app-pub-xxx/test

# .env.production
API_BASE_URL=https://doviz-proxy.your-worker.workers.dev
ADMOB_BANNER_ID=ca-app-pub-xxx/production
EXCHANGERATE_API_KEY=your_key_here   # Sadece Worker'da
```

---

## 8. Google Play Store Bilgileri

### 8.1 Mağaza Listesi

| Alan | Değer |
|------|-------|
| **Uygulama Adı** | DövizÇevir - Anlık Döviz Kuru |
| **Kısa Açıklama** | Türk Lirası ve 160+ para birimi arasında anlık, güvenilir kur dönüşümü |
| **Kategori** | Finans |
| **İçerik Derecelendirmesi** | Herkes (Everyone) |
| **Fiyat** | Ücretsiz (uygulama içi satın alma mevcut) |

### 8.2 ASO (App Store Optimization) Anahtar Kelimeleri

Birincil: döviz çevirici, döviz kuru, kur hesaplama, TL dolar, TL euro
İkincil: döviz hesap makinesi, anlık kur, dolar kuru, euro kuru, altın fiyatı
Uzun kuyruk: dolar kaç tl, euro kaç tl, sterlin kaç tl

---

## 9. Güvenlik Kontrol Listesi

- [ ] API anahtarları hiçbir zaman istemci kodunda bulunmaz
- [ ] Tüm API çağrıları HTTPS üzerinden yapılır
- [ ] Cloudflare Worker'da rate limiting aktif (IP başına 60 istek/dk)
- [ ] ProGuard/R8 ile kod obfuscation (Android)
- [ ] Certificate pinning (v2.0)
- [ ] Kullanıcı verisi toplamama — KVKK uyumluluğu
- [ ] Reklam SDK izin yönetimi (ATT framework iOS)
- [ ] Sürüm güncellemelerinde force-update mekanizması

---

## 10. Test Stratejisi

| Test Türü | Araç | Kapsam |
|-----------|------|--------|
| Unit | Jest | Dönüşüm hesaplamaları, formatlama |
| Component | React Native Testing Library | UI bileşenleri |
| E2E | Detox | Tam kullanıcı akışları |
| API | Postman / Thunder Client | Worker endpoint'leri |
| Performance | Flipper + React DevTools | Render optimizasyonu |

---

## 11. Takvim

| Hafta | Hedef |
|-------|-------|
| 1 | Proje iskeleti, navigasyon, tema sistemi |
| 2 | Ana çevirici ekranı + para birimi seçici |
| 3 | Cloudflare Worker proxy + API entegrasyonu |
| 4 | Cache sistemi, çevrimdışı mod, hata yönetimi |
| 5 | Popüler kurlar, kur detay bilgisi, polish |
| 6 | AdMob entegrasyonu, test, hata düzeltme |
| 7 | EAS Build, Google Play Console kurulumu |
| 8 | Beta test, ASO, mağaza görselleri, yayın |

---

## 12. Lisans ve Yasal

- Uygulama kaynak kodu: Özel (proprietary)
- Kur verileri: ExchangeRate-API kullanım şartları dahilinde
- KVKK uyumu: Kişisel veri toplanmaz, analitik anonim
- Sorumluluk reddi: "Kur verileri bilgi amaçlıdır, finansal tavsiye niteliği taşımaz"
