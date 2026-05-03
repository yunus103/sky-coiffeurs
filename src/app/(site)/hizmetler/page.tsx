import { Metadata } from "next";
import { draftMode } from "next/headers";
import { getClient } from "@/sanity/lib/client";
import { servicesPageQuery, serviceListQuery } from "@/sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { JsonLd, servicesListJsonLd } from "@/components/seo/JsonLd";
import { ServicesGrid } from "@/components/services/ServicesGrid";
import { FadeIn } from "@/components/ui/FadeIn";
import { SanityImage } from "@/components/ui/SanityImage";
import Link from "next/link";
import { RiArrowRightLine } from "react-icons/ri";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getClient().fetch(servicesPageQuery, {}, { next: { tags: ["services"] } });
  return buildMetadata({
    title: data?.pageTitle || "Hizmetlerimiz",
    canonicalPath: "/hizmetler",
    pageSeo: data?.seo,
  });
}

export default async function ServicesPage() {
  const isDraft = (await draftMode()).isEnabled;
  const client = getClient(isDraft);

  const [pageData, services] = await Promise.all([
    client.fetch(servicesPageQuery, {}, { next: { tags: ["services"] } }),
    client.fetch(serviceListQuery, {}, { next: { tags: ["services"] } }),
  ]);

  const pageTitle = pageData?.pageTitle ?? "Hizmetlerimiz";
  const pageSubtitle = pageData?.pageSubtitle ?? "Size özel bakım ve şekillendirme hizmetleri.";
  const introText = pageData?.introText;

  return (
    <>
      <JsonLd data={servicesListJsonLd(services ?? [])} />

      {/* ── Page Header ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-primary">
        {pageData?.headerImage && (
          <SanityImage
            image={pageData.headerImage}
            fill
            priority
            noBlur
            sizes="100vw"
            className="object-cover opacity-30"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/60 to-primary" />
        <div className="relative z-10 container mx-auto px-6 lg:px-10 pt-40 pb-20">
          <FadeIn direction="up">
            <p className="font-sans text-[10px] tracking-[0.5em] uppercase text-secondary mb-4">
              Neler Yapıyoruz
            </p>
            <h1 className="font-serif text-5xl md:text-7xl font-light text-primary-foreground leading-[1.05] max-w-2xl">
              {pageTitle}
            </h1>
            <p className="font-sans text-primary-foreground/60 text-base mt-6 max-w-lg leading-relaxed">
              {pageSubtitle}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Intro bar */}
      {introText && (
        <section className="bg-muted border-b border-border py-10">
          <div className="container mx-auto px-6 lg:px-10">
            <p className="font-sans text-muted-foreground text-base max-w-3xl leading-relaxed">
              {introText}
            </p>
          </div>
        </section>
      )}

      {/* ── Hizmet Grid ─────────────────────────────────────────── */}
      <section className="bg-background py-20 md:py-28">
        <div className="container mx-auto px-6 lg:px-10">
          <ServicesGrid services={services ?? []} />
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────── */}
      <section className="bg-primary text-primary-foreground py-20 md:py-24">
        <div className="container mx-auto px-6 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <FadeIn direction="up">
            <p className="font-sans text-[10px] tracking-[0.5em] uppercase text-secondary mb-3">
              Bugün Başlayın
            </p>
            <h2 className="font-serif text-3xl md:text-5xl font-light text-primary-foreground">
              Randevu almak çok kolay.
            </h2>
          </FadeIn>
          <FadeIn direction="up" delay={0.1}>
            <Link
              href="/iletisim"
              className="inline-flex items-center gap-3 bg-secondary text-secondary-foreground px-8 py-4 text-[10px] font-sans tracking-[0.3em] uppercase hover:bg-secondary/85 transition-all duration-300 group whitespace-nowrap"
            >
              Randevu Al
              <RiArrowRightLine size={12} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
