import { defineField, defineType } from "sanity";

export const galeriPageType = defineType({
  name: "galeriPage",
  title: "Galeri Sayfası",
  type: "document",
  fields: [
    defineField({ name: "pageTitle", title: "Sayfa Başlığı", type: "string", validation: (Rule) => Rule.required(), initialValue: "Galeri" }),
    defineField({ name: "pageSubtitle", title: "Alt Yazı", type: "text", rows: 2, initialValue: "Çalışmalarımızdan seçmeler" }),
    defineField({
      name: "images",
      title: "Galeri Fotoğrafları",
      type: "array",
      of: [
        {
          type: "image",
          name: "galleryImage",
          title: "Fotoğraf",
          options: { hotspot: true },
          fields: [
            defineField({ name: "title", title: "Başlık / Açıklama", type: "string" }),
            defineField({ name: "alt", title: "Alt Metni", type: "string" }),
            defineField({
              name: "category",
              title: "Kategori",
              type: "string",
              options: {
                list: [
                  { title: "Kadın", value: "women" },
                  { title: "Erkek", value: "men" },
                ],
                layout: "radio",
              },
              description: "Kategori seçilmezse 'Genel' olarak kabul edilir.",
            }),
            defineField({
              name: "featured",
              title: "Ana Sayfada Göster",
              type: "boolean",
              initialValue: false,
            }),
            defineField({
              name: "relatedService",
              title: "İlgili Hizmet",
              type: "reference",
              to: [{ type: "service" }],
              description: "Bu fotoğrafın hangi hizmetle ilgili olduğunu seçin (Opsiyonel).",
            }),
          ],
          preview: {
            select: { title: "title", subtitle: "category", media: "asset" },
            prepare({ title, subtitle, media }) {
              const cat = subtitle === "men" ? "Erkek" : subtitle === "women" ? "Kadın" : "Genel";
              return { title: title || "İsimsiz Fotoğraf", subtitle: cat, media };
            },
          },
        }
      ],
      options: { layout: "grid" }
    }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
});
