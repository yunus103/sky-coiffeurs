<div align="right">
  <a href="./README.md">
    <img src="https://img.shields.io/badge/English_EN-374151?style=for-the-badge" alt="English" />
  </a>
  <img src="https://img.shields.io/badge/Türkçe_TR-2563EB?style=for-the-badge" alt="Türkçe" />
</div>

# Sky Coiffeurs — Lüks Kuaför & Salon Dijital Deneyimi

> **Sky Coiffeurs** lüks kuaför ve güzellik markası için özel olarak tasarlanmış, headless mimariye sahip, kurumsal ve yüksek performanslı web platformu. Salise altı sayfa yükleme hızları, özgün marka estetiği, yüksek dönüşüm odaklı kullanıcı deneyimi ve zahmetsiz içerik yönetimi hedeflenerek geliştirilmiştir.

---

## 🏛 Mimari ve Teknoloji Yığını

| Katman | Teknoloji | Detay ve Kullanım Amacı |
| :--- | :--- | :--- |
| **Framework** | **Next.js 16** (App Router) | React Server Components (RSC), dinamik route handler'lar, streaming |
| **Çalışma Zamanı & Dil** | **React 19 & TypeScript 5** | Katı tip güvenliği, concurrent özellikler, modern bileşen mimarisi |
| **Headless CMS** | **Sanity Studio v3** (`next-sanity`) | Gömülü stüdyo (`/studio`), anlık Draft Mode önizlemesi, GROQ sorguları |
| **Stil & Tasarım** | **Tailwind CSS v4** | `@tailwindcss/postcss` ve `@tailwindcss/typography` ile modern CSS motoru |
| **Arayüz Bileşenleri** | **shadcn/ui & Base UI** | Erişilebilir primitifler (`@base-ui/react`), Lucide ikonları, responsive navigasyon |
| **Animasyon & Efektler**| **Framer Motion v12** | Mikro etkileşimler, scroll-reveal animasyonları, modal lightbox, bento geçişleri |
| **Önbellek & Yenileme** | **Tag Tabanlı On-Demand ISR** | `@sanity/webhook` imza doğrulaması ve hedefe yönelik `revalidateTag` |
| **Tip & Veri Doğrulama**| **Zod & `@t3-oss/env-nextjs`**| Çalışma zamanı ortam değişkeni (env) doğrulaması ve katı şema denetimi |
| **İletişim & Entegrasyon**| **Nodemailer & WhatsApp** | Sunucu taraflı güvenli SMTP e-posta gönderimi ve tek tıkla WhatsApp asistanı |
| **SEO & Yapısal Veri** | **Next Metadata & Schema.org**| Dinamik OpenGraph, otomatik sitemap üretimi ve zengin JSON-LD şemaları |

---

## ⚡ Temel Modüller ve Fonksiyonel Özellikler

- **Dinamik Hero & Atmosfer Vitrini**: Güçlü tipografi, akıcı kaydırma animasyonları ve yüksek çözünürlüklü editoryal görsel yerleşimi.
- **Bento-Grid Portföy & Lightbox Galerisi**: Sanity CMS üzerinden yönetilen, tam ekran modal lightbox destekli interaktif görsel vitrin.
- **Hizmet Kataloğu ve Bakım Detayları**: Kapsamlı açıklama, süre ve fiyatlandırma meta verileri içeren, dönüşüm odaklı hizmet kartları.
- **SEO Odaklı Editoryal Blog**: Kök dizin URL mimarisi (`/[slug]`), zengin taşınabilir metin (Portable Text) desteği, kategori filtreleme ve ilişkili makale önerileri.
- **Doğrulanmış Müşteri Yorumları**: Google Haritalar üzerinden alınan gerçek müşteri yorumlarını sunan dinamik karusel.
- **İletişim & Randevu Altyapısı**: Nodemailer üzerinden güvenli sunucu taraflı e-posta bildirimi ve anlık WhatsApp randevu yönlendirmesi.
- **Gömülü CMS Stüdyosu & Draft Mode**: Canlı `/studio` paneli ve yayın öncesi anlık içerik önizleme altyapısı (`/api/draft/enable` ve `/api/draft/disable`).

---

## 🗺 Özel Routing ve URL Mimarisi

```
/                             → Yüksek dönüşümlü ana sayfa (Hero, Hizmetler, Bento, Yorumlar, CTA)
├── /hakkimizda               → Marka hikayesi, felsefesi ve salon atmosferi
├── /hizmetler                → Tüm kuaförlük ve bakım hizmetleri kataloğu
│   └── /hizmetler/[slug]     → İlgili hizmete özel detay ve randevu sayfası
├── /galeri                   → Filtrelenebilir görsel portföy ve lookbook
├── /blog                     → Saç tasarımı trendleri ve editoryal rehberler
├── /[slug]                   → SEO dostu doğrudan kök seviye dinamik blog yazıları
├── /iletisim                 → Adres, çalışma saatleri, interaktif harita ve iletişim formu
├── /yasal/[slug]             → Dinamik yasal metinler (KVKK, Gizlilik, Kullanım Koşulları)
├── /studio/[[...tool]]       → Gömülü Sanity Studio yönetim paneli
└── /api/                     → Güvenli uç noktalar (ISR revalidate, draft mode, iletişim bildirimi)
```

---

## 🔄 Caching, API, ISR / Revalidation ve SEO Standartları

### On-Demand ISR ve Önbellek Yenileme
Sanity Studio'da bir içerik yayınlandığında veya güncellendiğinde, `/api/revalidate` adresine bir webhook tetiklenir. Bu uç nokta `@sanity/webhook` ile HMAC imzasını doğrular ve yalnızca ilgili Next.js önbellek etiketlerini geçersiz kılar:

$$\text{Webhook Olayı} \longrightarrow \text{HMAC İmza Kontrolü} \longrightarrow \text{revalidateTag(['layout' \mid 'services' \mid 'gallery' \mid \dots])}$$

- **Sıfır Sunucu Yeniden Başlatma**: İçerik güncellemeleri tüm siteyi baştan derlemeye gerek kalmadan anında canlıya yansır.
- **Hassas Etiketleme (Granular Invalidation)**: `siteSettings`, `navigation`, `homePage`, `blogPost`, `service`, `faq`, `legalPage` gibi hedefe yönelik etiketler sayesinde gereksiz önbellek boşaltımları engellenir.

### Kapsamlı Yapısal Veri (JSON-LD)
Her sayfada arama motorları için optimize edilmiş Schema.org nesneleri dinamik olarak enjekte edilir:
- `HairSalon`: İşletme adı, açık adres, telefon, e-posta, fiyat aralığı ve detaylı çalışma saatleri spesifikasyonları.
- `Article` & `Blog`: Google Keşfet (Discover) ve zengin sonuçlar için yayınlanma tarihi, başlık ve yazar meta verileri.
- `ItemList` & `Service`: Arama sonuçlarında listelenen hizmet ve paket şemaları.
- `AboutPage`, `ContactPage` ve `CollectionPage`: Maksimum yerel SEO görünürlüğü için semantik sayfa hiyerarşisi.

### Dinamik Sitemap ve Meta Veri Motoru
- `sitemap.ts`: Sanity üzerindeki tüm aktif slug'ları dinamik sorgulayarak doğru `lastModified` ve `priority` değerleriyle güncel XML site haritası oluşturur.
- `buildMetadata()`: OpenGraph görselleri, Twitter kartları, kanonik (canonical) URL çözünürlüğü ve Google Search Console doğrulamalarını tek merkezden yönetir.

---

## 📂 Proje Dizin Yapısı

```
sky-coiffeurs/
├── src/
│   ├── app/
│   │   ├── (site)/               # Ziyaretçilere açık olan sayfalar
│   │   │   ├── [slug]/           # Dinamik SEO uyumlu blog detay sayfaları
│   │   │   ├── blog/             # Blog listesi ve kategori filtreleme
│   │   │   ├── galeri/           # Görsel portföy ve galeri sayfası
│   │   │   ├── hakkimizda/       # Hakkımızda ve vizyon sayfası
│   │   │   ├── hizmetler/        # Hizmetler listesi ve [slug] detayları
│   │   │   ├── iletisim/         # İletişim, harita ve form sayfası
│   │   │   ├── yasal/[slug]/     # Dinamik yasal metin sayfaları
│   │   │   ├── layout.tsx        # Ortak arayüz (Header, Footer, WhatsApp Butonu, JSON-LD)
│   │   │   └── page.tsx          # Ana sayfa
│   │   ├── api/
│   │   │   ├── contact/          # Nodemailer iletişim formu işleyicisi
│   │   │   ├── draft/            # Canlı önizleme (draft mode) açma/kapama
│   │   │   └── revalidate/       # Kriptografik Sanity ISR webhook rotası
│   │   ├── studio/[[...tool]]/   # Gömülü Sanity Studio rotası
│   │   ├── layout.tsx            # Kök layout (ThemeProvider, fontlar ve meta)
│   │   ├── robots.ts             # Arama motoru robot direktifleri
│   │   └── sitemap.ts            # Dinamik XML sitemap üreticisi
│   ├── components/
│   │   ├── forms/                # İletişim ve geri bildirim formları
│   │   ├── gallery/              # Galeri ızgarası ve interaktif bileşenler
│   │   ├── home/                 # Ana sayfa modülleri (Hero, Bento, Hizmetler, Yorumlar, Atmosfer)
│   │   ├── layout/               # Header, Footer, ThemeToggle, WhatsAppButton, ScrollToTop
│   │   ├── seo/                  # JsonLd yapısal veri bileşenleri
│   │   ├── services/             # Hizmet kartları ve ızgara görünümleri
│   │   └── ui/                   # SanityImage, RichText, Lightbox, FadeIn, AnimateGroup, Base UI
│   ├── lib/
│   │   ├── env.ts                # Tip güvenli Zod ortam değişkeni doğrulaması (@t3-oss)
│   │   ├── seo.ts                # OpenGraph ve kanonik URL için buildMetadata yardımcısı
│   │   └── utils.ts              # Yardımcı fonksiyonlar, stil birleştiriciler (cn), formatlayıcılar
│   └── sanity/
│       ├── lib/                  # Sanity client, görsel oluşturucu, GROQ sorguları
│       ├── plugins/              # Singleton doküman yapılandırmaları ve eklentiler
│       ├── schemaTypes/          # Doküman şemaları (blog, hizmet, sss, yasal, singleton sayfalar)
│       └── structure.ts          # Özelleştirilmiş Studio panel hiyerarşisi
├── sanity.config.ts              # Sanity Studio çekirdek konfigürasyonu
└── next.config.ts                # Next.js derleme ve optimizasyon parametreleri
```

---

## 🛡 Güvenlik ve Mühendislik Standartları

- **Tip Güvenli Ortam Değişkenleri**: `@t3-oss/env-nextjs` ve `zod` entegrasyonu sayesinde derleme ve çalışma zamanında eksik/hatalı değişken oluşumu engellenir.
- **Kriptografik Webhook Doğrulaması**: `@sanity/webhook` paketi kullanılarak gelen tüm ISR çağrılarının HMAC imzası kontrol edilir; yetkisiz önbellek temizleme istekleri engellenir.
- **Kümülatif Düzen Kayması (CLS) Koruması**: `next/image`, responsive `sizes` parametreleri, bulanık önizleme (blur placeholder) ve önceden tanımlı oranlarla sıfır düzen kayması sağlanır.
- **Kusursuz Tema Yönetimi**: `next-themes` ve CSS değişkenleri ile stil sıçraması (FOUC) olmadan pürüzsüz açık/koyu tema geçişi.
