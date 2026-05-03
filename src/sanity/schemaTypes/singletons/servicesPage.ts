import { defineField, defineType } from "sanity";

export const servicesPageType = defineType({
  name: "servicesPage",
  title: "Hizmetler Sayfası",
  type: "document",
  fields: [
    defineField({ name: "pageTitle", title: "Sayfa Başlığı", type: "string", initialValue: "Hizmetlerimiz" }),
    defineField({ name: "pageSubtitle", title: "Alt Başlık", type: "text", rows: 2, initialValue: "Size özel bakım ve şekillendirme hizmetleri." }),
    defineField({ name: "introText", title: "Giriş Metni", type: "text", rows: 3, description: "Hizmet listesinin üzerinde görünecek tanıtıcı metin." }),
    defineField({
      name: "headerImage",
      title: "Başlık Görseli (Opsiyonel)",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Metni", type: "string" })],
    }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
});
