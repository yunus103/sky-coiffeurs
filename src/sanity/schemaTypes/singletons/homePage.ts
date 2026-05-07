import { defineField, defineType } from "sanity";

const imageField = (name: string, title: string, required = false) =>
  defineField({
    name,
    title,
    type: "image",
    options: { hotspot: true },
    fields: [
      defineField({
        name: "alt",
        title: "Alt Metni",
        type: "string",
        validation: (Rule) => (required ? Rule.required() : Rule),
      }),
    ],
    ...(required && { validation: (Rule: any) => Rule.required() }),
  });

export const homePageType = defineType({
  name: "homePage",
  title: "Ana Sayfa",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "services", title: "Hizmetler Section" },
    { name: "gallery", title: "Galeri Section" },
    { name: "reviews", title: "Yorumlar" },
    { name: "atmosphere", title: "Atmosfer" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    // ─── Hero ─────────────────────────────────────────────────────────────────
    defineField({
      name: "heroImages",
      title: "Hero Görselleri",
      type: "array",
      group: "hero",
      description: "1–3 görsel ekleyin. Birden fazla görsel otomatik geçiş yapar.",
      validation: (Rule) => Rule.max(3),
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", title: "Alt Metni", type: "string", validation: (Rule) => Rule.required() }),
          ],
        },
      ],
    }),
    defineField({ name: "heroEyebrow", title: "Hero Üst Etiket", type: "string", group: "hero", description: 'Gold renkte küçük üst yazı. Örn: "Kadın & Erkek Kuaförü"', initialValue: "Kadın & Erkek Kuaförü" }),
    defineField({ name: "heroTitle", title: "Hero Ana Başlık", type: "string", group: "hero", validation: (Rule) => Rule.required(), initialValue: "Tarzınızı\nYansıtın", description: "Yeni satır için \\n kullanın" }),
    defineField({ name: "heroSubtitle", title: "Hero Alt Metin", type: "text", rows: 2, group: "hero", initialValue: "Profesyonel ekibimizle size özel bakım deneyimi" }),
    defineField({ name: "heroPrimaryCtaLabel", title: "Ana Buton Metni", type: "string", group: "hero", initialValue: "Randevu Al" }),
    defineField({ name: "heroPrimaryCtaHref", title: "Ana Buton Linki", type: "string", group: "hero", initialValue: "/iletisim", description: "Örn: /iletisim veya tel:+905001234567" }),
    defineField({ name: "heroSecondaryCtaLabel", title: "İkincil Buton Metni", type: "string", group: "hero", initialValue: "Hizmetlerimiz" }),
    defineField({ name: "heroSecondaryCtaHref", title: "İkincil Buton Linki", type: "string", group: "hero", initialValue: "/hizmetler" }),

    // ─── Services ─────────────────────────────────────────────────────────────
    defineField({ name: "servicesSectionTitle", title: "Hizmetler Başlığı", type: "string", group: "services", initialValue: "Hizmetlerimiz" }),

    // ─── Gallery ──────────────────────────────────────────────────────────────
    defineField({ name: "gallerySectionTitle", title: "Galeri Başlığı", type: "string", group: "gallery", initialValue: "Çalışmalarımızdan" }),
    defineField({ name: "gallerySectionSubtitle", title: "Galeri Alt Yazısı", type: "text", rows: 2, group: "gallery" }),
    defineField({ name: "galleryCtaLabel", title: "Galeri CTA Butonu", type: "string", group: "gallery", initialValue: "Tüm Galeriyi Gör" }),

    // ─── Reviews ──────────────────────────────────────────────────────────────
    defineField({ name: "reviewsSectionTitle", title: "Yorumlar Başlığı", type: "string", group: "reviews", initialValue: "Müşterilerimiz Ne Diyor" }),
    defineField({
      name: "reviews",
      title: "Müşteri Yorumları",
      type: "array",
      group: "reviews",
      description: "Boş bırakılırsa varsayılan yorumlar gösterilir.",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "name", title: "İsim", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "rating", title: "Puan (1-5)", type: "number", validation: (Rule) => Rule.required().min(1).max(5), initialValue: 5 }),
            defineField({ name: "text", title: "Yorum Metni", type: "text", rows: 3, validation: (Rule) => Rule.required() }),
            defineField({ name: "date", title: "Tarih", type: "string", description: 'Örn: "Nisan 2025"' }),
          ],
          preview: { select: { title: "name", subtitle: "text" } },
        },
      ],
    }),

    // ─── Atmosphere ───────────────────────────────────────────────────────────
    defineField({ name: "atmosphereQuote", title: "Atmosfer Alıntısı", type: "text", rows: 2, group: "atmosphere", description: 'Kısa, güçlü bir cümle. Örn: "Stilinizi kusursuz bir deneyimle buluşturuyoruz."', initialValue: "Stilinizi kusursuz bir deneyimle buluşturuyoruz." }),
    defineField({ name: "atmosphereSectionTitle", title: "Atmosfer Başlığı (SEO)", type: "string", group: "atmosphere", initialValue: "Felsefemiz", description: "Görsel olarak büyük gösterilmez, sadece SEO için" }),
    defineField({
      name: "atmosphereImage",
      title: "Atmosfer Görseli",
      type: "image",
      group: "atmosphere",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Metni",
          type: "string",
        }),
      ],
    }),

    // ─── SEO ──────────────────────────────────────────────────────────────────
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
});
