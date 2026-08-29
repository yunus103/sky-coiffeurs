<div align="right">
  <img src="https://img.shields.io/badge/English_EN-2563EB?style=for-the-badge" alt="English" />
  <a href="./README.tr.md">
    <img src="https://img.shields.io/badge/Türkçe_TR-374151?style=for-the-badge" alt="Türkçe" />
  </a>
</div>

# Sky Coiffeurs — Luxury Salon Digital Experience

> A production-grade, headless digital web application engineered for **Sky Coiffeurs**, a premier luxury hair styling and salon brand. Designed for sub-second performance, bespoke brand aesthetics, high-conversion customer engagement, and effortless content operations.

---

## 🏛 Architecture & Tech Stack

| Layer | Technology | Details & Purpose |
| :--- | :--- | :--- |
| **Framework** | **Next.js 16** (App Router) | React Server Components (RSC), dynamic route handlers, streaming |
| **Runtime & Core** | **React 19 & TypeScript 5** | Strict type-safety, concurrent features, modern component design |
| **Headless CMS** | **Sanity Studio v3** (`next-sanity`) | Embedded studio (`/studio`), real-time Draft Mode, GROQ queries |
| **Styling & Design** | **Tailwind CSS v4** | Modern CSS engine with `@tailwindcss/postcss` and `@tailwindcss/typography` |
| **UI Components** | **shadcn/ui & Base UI** | Accessible primitives (`@base-ui/react`), Lucide icons, responsive navigation |
| **Motion & FX** | **Framer Motion v12** | Micro-interactions, scroll-reveals, responsive lightbox, interactive bento |
| **Cache & Invalidation** | **Tag-based On-Demand ISR** | `@sanity/webhook` signature validation & targeted `revalidateTag` |
| **Type Validation** | **Zod & `@t3-oss/env-nextjs`** | Strict runtime environment variable validation & schema enforcement |
| **Communication** | **Nodemailer & WhatsApp** | Server-side SMTP dispatch & direct one-tap concierge integration |
| **SEO & Structured Data** | **Next Metadata & Schema.org** | Dynamic OpenGraph, automated sitemap, and rich JSON-LD graph |

---

## ⚡ Key Modules & Functional Highlights

- **Dynamic Hero & Atmosphere Showcase**: High-impact editorial imagery with immersive typography and fluid scroll animations.
- **Bento-Grid Portfolio & Lightbox**: Interactive visual showcase driven by Sanity CMS assets with modal lightbox exploration.
- **Service Catalog & Treatment Cards**: Structured treatment listings with rich details, transparent pricing metadata, and direct booking triggers.
- **SEO-Optimized Editorial & Blog**: Clean root-level article routing (`/[slug]`), rich text Portable Text rendering, category filtering, and automated related-post discovery.
- **Verified Client Reviews Carousel**: Real customer feedback and testimonial carousel integrated for social proof.
- **Concierge Contact & Booking Gateway**: Contact form with server-side email dispatch via Nodemailer and instant WhatsApp direct booking.
- **Embedded CMS Studio & Draft Mode**: Live `/studio` interface with preview mode toggles (`/api/draft/enable` and `/api/draft/disable`) for real-time editorial previews before publishing.

---

## 🗺 Custom Routing & URL Architecture

```
/                             → High-conversion landing page (Hero, Services, Bento, Reviews, CTA)
├── /hakkimizda               → Brand story, philosophy, and salon atmosphere
├── /hizmetler                → Full service and treatment catalog
│   └── /hizmetler/[slug]     → Detailed service landing page with tailored specs
├── /galeri                   → Filterable visual portfolio and lookbook
├── /blog                     → Categorized hair styling trends and editorial guides
├── /[slug]                   → SEO-first root-level dynamic blog post URLs
├── /iletisim                 → Location, working hours, interactive map, and inquiry form
├── /yasal/[slug]             → Dynamic legal documents (KVKK, Privacy, Terms)
├── /studio/[[...tool]]       → Embedded Sanity Studio CMS
└── /api/                     → Secure endpoints (revalidate, draft mode, contact dispatch)
```

---

## 🔄 Caching, API, ISR & SEO Standards

### On-Demand ISR & Revalidation
Content updates in Sanity Studio trigger an automated webhook payload to `/api/revalidate`. The endpoint cryptographically verifies the HMAC signature using `@sanity/webhook` and invalidates only relevant Next.js cache tags:

$$\text{Webhook Event} \longrightarrow \text{HMAC Signature Check} \longrightarrow \text{revalidateTag(['layout' \mid 'services' \mid 'gallery' \mid \dots])}$$

- **Zero Full Rebuilds**: Content updates propagate in under a second without restarting or rebuilding the server.
- **Fine-Grained Invalidation**: Targeted tags (`siteSettings`, `navigation`, `homePage`, `blogPost`, `service`, `faq`, `legalPage`) keep server memory efficient.

### Deep Structured Data (JSON-LD)
Every route dynamically injects Google-compliant Schema.org entities:
- `HairSalon`: Includes precise business name, geo address, telephone, email, price range, and opening hours specification.
- `Article` & `Blog`: Full publishing dates, headlines, and author metadata for Google Discover and Search cards.
- `ItemList` & `Service`: Indexed service menus and individual treatment metadata.
- `AboutPage`, `ContactPage`, and `CollectionPage`: Semantic schema hierarchy for maximum local SEO footprint.

### Dynamic Sitemap & Meta Tags
- Automated `sitemap.ts` dynamically queries all published Sanity slugs to generate canonical entries with custom priority and change frequency metrics.
- Centralized `buildMetadata()` utility handles OpenGraph banners, Twitter cards, canonical resolution, and search console verification.

---

## 📂 Project Directory Structure

```
sky-coiffeurs/
├── src/
│   ├── app/
│   │   ├── (site)/               # Public client-facing routes
│   │   │   ├── [slug]/           # Dynamic SEO-optimized blog posts
│   │   │   ├── blog/             # Blog index & category filter
│   │   │   ├── galeri/           # Visual portfolio & gallery
│   │   │   ├── hakkimizda/       # Brand heritage & about
│   │   │   ├── hizmetler/        # Service index & [slug] detail
│   │   │   ├── iletisim/         # Contact center & maps
│   │   │   ├── yasal/[slug]/     # Dynamic legal pages
│   │   │   ├── layout.tsx        # Shell layout (Header, Footer, Floating WhatsApp, JSON-LD)
│   │   │   └── page.tsx          # Main landing page
│   │   ├── api/
│   │   │   ├── contact/          # Nodemailer contact submission handler
│   │   │   ├── draft/            # Live preview mode enable/disable
│   │   │   └── revalidate/       # Cryptographic Sanity ISR revalidation
│   │   ├── studio/[[...tool]]/   # Embedded Sanity Studio route
│   │   ├── layout.tsx            # Root HTML layout with ThemeProvider & fonts
│   │   ├── robots.ts             # Search crawler directives
│   │   └── sitemap.ts            # Dynamic XML sitemap generator
│   ├── components/
│   │   ├── forms/                # Contact and lead forms
│   │   ├── gallery/              # Gallery grid & interactive components
│   │   ├── home/                 # Landing sections (Hero, Bento, Services, Reviews, Atmosphere)
│   │   ├── layout/               # Header, Footer, ThemeToggle, WhatsAppButton, ScrollToTop
│   │   ├── seo/                  # JsonLd structured data injectors
│   │   ├── services/             # Service grid and detail cards
│   │   └── ui/                   # SanityImage, RichText, Lightbox, FadeIn, AnimateGroup, Base UI
│   ├── lib/
│   │   ├── env.ts                # Type-safe Zod environment validation (@t3-oss)
│   │   ├── seo.ts                # buildMetadata helper for OpenGraph & canonicals
│   │   └── utils.ts              # Utility helpers, styling wrappers (cn), formatting
│   └── sanity/
│       ├── lib/                  # Sanity client, image URL builder, GROQ query definitions
│       ├── plugins/              # Singleton document restrictions & custom plugins
│       ├── schemaTypes/          # Document schemas (blog, service, faq, legal, singletons)
│       └── structure.ts          # Customized Sanity Studio workspace hierarchy
├── sanity.config.ts              # Sanity Studio core configuration
└── next.config.ts                # Next.js build and optimization parameters
```

---

## 🛡 Security & Engineering Standards

- **Type-Safe Environment Variables**: Strictly validated at build and runtime via `@t3-oss/env-nextjs` and `zod`, eliminating runtime omissions.
- **Webhook Security**: Inbound cache purge endpoints enforce cryptographic verification via `@sanity/webhook` to prevent unauthorized revalidation spikes.
- **Zero Layout Shift (CLS)**: Optimized image pipelines utilizing `next/image`, responsive `sizes`, blur placeholders, and pre-computed aspect ratios.
- **Theme Resilience**: Seamless dark/light theme switching with `next-themes` and CSS custom properties without flash-of-unstyled-content (FOUC).
