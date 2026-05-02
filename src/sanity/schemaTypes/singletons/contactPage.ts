import { defineField, defineType } from "sanity";

export const contactPageType = defineType({
  name: "contactPage",
  title: "İletişim Sayfası",
  type: "document",
  fields: [
    defineField({ name: "pageTitle", title: "Sayfa Başlığı", type: "string", validation: (Rule) => Rule.required(), initialValue: "İletişim" }),
    defineField({ name: "pageSubtitle", title: "Giriş Metni", type: "text", rows: 3 }),
    defineField({ name: "formTitle", title: "Form Başlığı", type: "string", initialValue: "Randevu Al" }),
    defineField({
      name: "successMessage",
      title: "Form Başarı Mesajı",
      type: "text",
      rows: 2,
      initialValue: "Mesajınız alındı. En kısa sürede size dönüş yapacağız.",
    }),
    defineField({
      name: "workingHours",
      title: "Çalışma Saatleri",
      type: "text",
      rows: 4,
      description: "Her satır ayrı gün/saat olabilir. Örn:\nPazartesi – Cumartesi: 09:00 – 20:00\nPazar: Kapalı",
      initialValue: "Pazartesi – Cumartesi: 09:00 – 20:00\nPazar: Kapalı",
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram Profil Linki",
      type: "string",
      description: "Örn: https://instagram.com/skycoiffeurs",
    }),
    defineField({
      name: "whatsappMessage",
      title: "WhatsApp Ön Mesajı",
      type: "string",
      description: "WhatsApp butonu tıklandığında otomatik dolan mesaj.",
      initialValue: "Merhaba, randevu almak istiyorum.",
    }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
});
