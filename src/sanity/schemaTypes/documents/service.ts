import { defineField, defineType } from "sanity";

export const serviceType = defineType({
  name: "service",
  title: "Hizmet",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Başlık", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (Rule) => Rule.required() }),
    defineField({
      name: "gender",
      title: "Kategori",
      type: "string",
      options: {
        list: [
          { title: "Erkek", value: "men" },
          { title: "Kadın", value: "women" },
          { title: "Unisex", value: "unisex" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
      initialValue: "unisex",
    }),
    defineField({ name: "shortDescription", title: "Kısa Açıklama", type: "text", rows: 2, description: "Hizmet kartında ve ana sayfada gösterilecek kısa metin." }),
    defineField({ name: "order", title: "Sıralama", type: "number", description: "Küçük sayı önce gösterilir.", initialValue: 10 }),
    defineField({
      name: "mainImage",
      title: "Ana Görsel",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Metni", type: "string", validation: (Rule) => Rule.required() })],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "body",
      title: "İçerik",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", title: "Alt Metni", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "alignment", title: "Hizalama", type: "string", options: { list: [{ title: "Sol", value: "left" }, { title: "Orta", value: "center" }, { title: "Sağ", value: "right" }, { title: "Tam Genişlik", value: "full" }] }, initialValue: "center" }),
            defineField({ name: "size", title: "Boyut", type: "string", options: { list: [{ title: "Küçük (%33)", value: "33" }, { title: "Orta (%50)", value: "50" }, { title: "Geniş (%75)", value: "75" }, { title: "Tam Genişlik (%100)", value: "100" }] }, initialValue: "100" }),
          ],
        },
        { type: "customHtml" },
      ],
    }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  orderings: [{ title: "Sıralama", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "title", subtitle: "gender", media: "mainImage" },
    prepare({ title, subtitle, media }) {
      const genderLabel = subtitle === "men" ? "Erkek" : subtitle === "women" ? "Kadın" : "Unisex";
      return { title, subtitle: genderLabel, media };
    },
  },
});
