import { defineField, defineType } from "sanity";

export const aboutPageType = defineType({
  name: "aboutPage",
  title: "Hakkımızda",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "story", title: "Hikaye" },
    { name: "values", title: "Değerler" },
    { name: "owner", title: "Sahibi" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    // Hero
    defineField({ name: "pageTitle", title: "Sayfa Başlığı", type: "string", group: "hero", initialValue: "Hakkımızda" }),
    defineField({ name: "pageSubtitle", title: "Alt Başlık", type: "text", rows: 2, group: "hero", initialValue: "Saçınıza değer katıyoruz." }),
    defineField({
      name: "heroImage",
      title: "Hero Görseli",
      type: "image",
      group: "hero",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Metni", type: "string" })],
    }),

    // Story
    defineField({ name: "storyTitle", title: "Hikaye Başlığı", type: "string", group: "story", initialValue: "Hikayemiz" }),
    defineField({ name: "storyText", title: "Hikaye Metni", type: "text", rows: 5, group: "story", initialValue: "Sky Coiffeurs, müşterilerine en iyi deneyimi sunma tutkusuyla kuruldu. Her ziyaret, kişisel bir bakım deneyimidir." }),
    defineField({
      name: "storyImage",
      title: "Hikaye Görseli",
      type: "image",
      group: "story",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Metni", type: "string" })],
    }),

    // Values
    defineField({ name: "valuesTitle", title: "Değerler Başlığı", type: "string", group: "values", initialValue: "Değerlerimiz" }),
    defineField({
      name: "values",
      title: "Değerler",
      type: "array",
      group: "values",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "title", title: "Başlık", type: "string", validation: (Rule) => Rule.required() }),
          defineField({ name: "description", title: "Açıklama", type: "text", rows: 2 }),
        ],
        preview: { select: { title: "title", subtitle: "description" } },
      }],
    }),

    // Owner
    defineField({ name: "ownerTitle", title: "Bölüm Başlığı", type: "string", group: "owner", initialValue: "Arkasındaki İsim" }),
    defineField({ name: "ownerName", title: "Ad Soyad", type: "string", group: "owner" }),
    defineField({ name: "ownerRole", title: "Unvan / Rol", type: "string", group: "owner", initialValue: "Kurucu & Baş Stilist" }),
    defineField({ name: "ownerBio", title: "Kısa Biyografi", type: "text", rows: 4, group: "owner" }),
    defineField({
      name: "ownerPhoto",
      title: "Fotoğraf",
      type: "image",
      group: "owner",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Metni", type: "string" })],
    }),

    // CTA
    defineField({ name: "ctaLabel", title: "CTA Buton Metni", type: "string", group: "seo", initialValue: "Randevu Al" }),
    defineField({ name: "ctaHref", title: "CTA Buton Linki", type: "string", group: "seo", initialValue: "/iletisim" }),

    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
});
