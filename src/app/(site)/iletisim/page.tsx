import { Metadata } from "next";
import { draftMode } from "next/headers";
import { getClient } from "@/sanity/lib/client";
import { contactPageQuery, settingsQuery } from "@/sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { FadeIn } from "@/components/ui/FadeIn";
import { ContactForm } from "@/components/forms/ContactForm";
import { JsonLd, contactPageJsonLd } from "@/components/seo/JsonLd";
import { RiPhoneLine, RiMailLine, RiMapPinLine, RiTimeLine, RiInstagramLine } from "react-icons/ri";
import { FaWhatsapp } from "react-icons/fa";

const FALLBACK_HOURS = [
  { day: "Pazartesi", hours: "09:00–21:00" },
  { day: "Salı", hours: "09:00–21:00" },
  { day: "Çarşamba", hours: "09:00–21:00" },
  { day: "Perşembe", hours: "09:00–21:00" },
  { day: "Cuma", hours: "09:00–21:00" },
  { day: "Cumartesi", hours: "09:00–21:00" },
  { day: "Pazar", hours: "09:00–21:00" },
];

export async function generateMetadata(): Promise<Metadata> {
  const data = await getClient().fetch(contactPageQuery, {}, { next: { tags: ["contact"] } });
  return buildMetadata({
    title: data?.pageTitle || "İletişim",
    canonicalPath: "/iletisim",
    pageSeo: data?.seo,
  });
}

export default async function ContactPage() {
  const isDraft = (await draftMode()).isEnabled;
  const client = getClient(isDraft);

  const [pageData, settings] = await Promise.all([
    client.fetch(contactPageQuery, {}, { next: { tags: ["contact"] } }),
    client.fetch(settingsQuery, {}, { next: { tags: ["settings"] } }),
  ]);

  const pageTitle = pageData?.pageTitle ?? "İletişim";
  const pageSubtitle = pageData?.pageSubtitle ?? "Randevu almak veya bilgi almak için bize ulaşın.";
  const formTitle = pageData?.formTitle ?? "Randevu Talep Et";
  const successMessage = pageData?.successMessage ?? "Randevu talebiniz alındı. En kısa sürede size dönüş yapacağız.";

  const contact = settings?.contactInfo;
  const socialLinks = settings?.socialLinks ?? [];
  const instagramUrl = socialLinks.find((l: any) => l.platform?.toLowerCase() === "instagram")?.url;
  const workingHours = contact?.workingHours?.length ? contact.workingHours : FALLBACK_HOURS;
  const whatsappHref = contact?.whatsappNumber
    ? `https://wa.me/${contact.whatsappNumber.replace(/[^0-9]/g, "")}`
    : null;

  return (
    <>
      <JsonLd data={contactPageJsonLd(settings)} />

      {/* ── Page Header ─────────────────────────────────────────── */}
      <section className="bg-primary pt-36 pb-16">
        <div className="container mx-auto px-6 lg:px-10">
          <FadeIn direction="up">
            <p className="font-sans text-[10px] tracking-[0.5em] uppercase text-secondary mb-4">
              Bize Ulaşın
            </p>
            <h1 className="font-serif text-5xl md:text-7xl font-light text-primary-foreground leading-[1.05]">
              {pageTitle}
            </h1>
            <p className="font-sans text-primary-foreground/60 text-base mt-4 max-w-lg leading-relaxed">
              {pageSubtitle}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Randevu Formu (ÖNCE) ─────────────────────────────────── */}
      <section className="bg-background py-20 md:py-28">
        <div className="container mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-[1fr_1.6fr] gap-12 lg:gap-20 items-start">
            <FadeIn direction="up">
              <p className="font-sans text-[10px] tracking-[0.5em] uppercase text-secondary mb-4">
                Randevu
              </p>
              <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground leading-tight mb-6">
                {formTitle}
              </h2>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed max-w-xs">
                Tercih ettiğiniz tarihi ve isteğinizi belirtin, size en kısa sürede dönelim.
              </p>
            </FadeIn>

            <FadeIn direction="up" delay={0.1}>
              <div className="bg-muted border border-border p-8 md:p-10">
                <ContactForm
                  formTitle=""
                  successMessage={successMessage}
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── İletişim Bilgileri + Harita (SONRA) ──────────────────── */}
      <section className="bg-muted border-t border-border py-20 md:py-28">
        <div className="container mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">

            {/* Sol: Bilgiler */}
            <FadeIn direction="up">
              <div className="space-y-10">

                {contact?.phone && (
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <RiPhoneLine size={18} className="text-secondary shrink-0" />
                      <h3 className="font-sans text-[11px] tracking-widest uppercase text-muted-foreground">Telefon</h3>
                    </div>
                    <a href={`tel:${contact.phone}`} className="font-serif text-3xl text-foreground hover:text-primary transition-colors duration-300">
                      {contact.phone}
                    </a>
                  </div>
                )}

                {contact?.email && (
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <RiMailLine size={18} className="text-secondary shrink-0" />
                      <h3 className="font-sans text-[11px] tracking-widest uppercase text-muted-foreground">E-posta</h3>
                    </div>
                    <a href={`mailto:${contact.email}`} className="font-sans text-base text-foreground hover:text-primary transition-colors duration-300">
                      {contact.email}
                    </a>
                  </div>
                )}

                {contact?.address && (
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <RiMapPinLine size={18} className="text-secondary shrink-0" />
                      <h3 className="font-sans text-[11px] tracking-widest uppercase text-muted-foreground">Adres</h3>
                    </div>
                    <p className="font-sans text-sm text-foreground leading-relaxed max-w-xs">
                      {contact.address}
                    </p>
                  </div>
                )}

                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <RiTimeLine size={18} className="text-secondary shrink-0" />
                    <h3 className="font-sans text-[11px] tracking-widest uppercase text-muted-foreground">Çalışma Saatleri</h3>
                  </div>
                  <ul className="space-y-2.5 max-w-xs">
                    {workingHours.map((item: { day: string; hours: string }, i: number) => (
                      <li key={i} className="flex justify-between items-center text-sm border-b border-border pb-2">
                        <span className="text-muted-foreground">{item.day}</span>
                        <span className="text-foreground font-medium">{item.hours}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-4 pt-4">
                  {whatsappHref && (
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-6 py-3 text-[10px] font-sans tracking-[0.2em] uppercase hover:bg-primary/85 transition-all duration-300"
                    >
                      <FaWhatsapp size={16} />
                      WhatsApp
                    </a>
                  )}
                  {instagramUrl && (
                    <a
                      href={instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 border border-border text-foreground px-6 py-3 text-[10px] font-sans tracking-[0.2em] uppercase hover:border-primary hover:text-primary transition-all duration-300"
                    >
                      <RiInstagramLine size={16} />
                      Instagram
                    </a>
                  )}
                </div>
              </div>
            </FadeIn>

            {/* Sağ: Harita */}
            <FadeIn direction="up" delay={0.15}>
              {contact?.mapIframe ? (
                <div
                  className="w-full h-full min-h-[400px] lg:min-h-[500px] overflow-hidden border border-border [&>iframe]:w-full [&>iframe]:h-full [&>iframe]:min-h-[400px] lg:[&>iframe]:min-h-[500px]"
                  dangerouslySetInnerHTML={{ __html: contact.mapIframe }}
                />
              ) : (
                <div className="w-full min-h-[400px] bg-background border border-border flex flex-col items-center justify-center gap-4">
                  <RiMapPinLine size={40} className="text-muted-foreground/30" />
                  <p className="font-sans text-sm text-muted-foreground">
                    Harita henüz eklenmedi.
                  </p>
                </div>
              )}
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
