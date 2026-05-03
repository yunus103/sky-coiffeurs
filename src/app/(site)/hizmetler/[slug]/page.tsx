import { Metadata } from "next";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import { getClient, client } from "@/sanity/lib/client";
import { serviceBySlugQuery, serviceListQuery } from "@/sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { RichText } from "@/components/ui/RichText";
import { SanityImage } from "@/components/ui/SanityImage";
import { FadeIn } from "@/components/ui/FadeIn";
import { JsonLd, serviceDetailJsonLd } from "@/components/seo/JsonLd";
import Link from "next/link";
import { RiArrowRightLine, RiArrowLeftLine } from "react-icons/ri";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const services = await client.fetch(serviceListQuery, {}, { next: { tags: ["services"] } });
  return (services || []).map((s: any) => ({ slug: s.slug?.current }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await getClient().fetch(serviceBySlugQuery, { slug }, { next: { tags: ["services"] } });
  if (!service) return {};
  return buildMetadata({
    title: service.title,
    canonicalPath: `/hizmetler/${slug}`,
    pageSeo: service.seo,
  });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const isDraft = (await draftMode()).isEnabled;

  const [service, allServices] = await Promise.all([
    getClient(isDraft).fetch(serviceBySlugQuery, { slug }, { next: { tags: ["services"] } }),
    getClient(isDraft).fetch(serviceListQuery, {}, { next: { tags: ["services"] } }),
  ]);

  if (!service) notFound();

  const otherServices = (allServices ?? [])
    .filter((s: any) => s.slug?.current !== slug)
    .slice(0, 4);

  const genderLabel = service.gender === "men" ? "Erkek" : service.gender === "women" ? "Kadın" : "Unisex";

  return (
    <>
      <JsonLd data={serviceDetailJsonLd(service)} />

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden bg-primary flex items-end">
        {service.mainImage && (
          <SanityImage
            image={service.mainImage}
            fill
            priority
            noBlur
            sizes="100vw"
            className="object-cover opacity-50"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
        <div className="relative z-10 container mx-auto px-6 lg:px-10 pb-16">
          <FadeIn direction="up">
            <Link
              href="/hizmetler"
              className="inline-flex items-center gap-2 font-sans text-[10px] tracking-[0.3em] uppercase text-primary-foreground/50 hover:text-secondary transition-colors duration-300 mb-6"
            >
              <RiArrowLeftLine size={12} />
              Hizmetlerimiz
            </Link>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-sans text-[9px] tracking-[0.3em] uppercase bg-secondary text-secondary-foreground px-3 py-1.5">
                {genderLabel}
              </span>
            </div>
            <h1 className="font-serif text-5xl md:text-7xl font-light text-primary-foreground leading-[1.05]">
              {service.title}
            </h1>
            {service.shortDescription && (
              <p className="font-sans text-primary-foreground/60 text-base mt-4 max-w-xl leading-relaxed">
                {service.shortDescription}
              </p>
            )}
          </FadeIn>
        </div>
      </section>

      {/* ── İçerik + Kenar Çubuğu ─────────────────────────────────── */}
      <section className="bg-background py-20 md:py-28">
        <div className="container mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-[1fr_360px] gap-12 lg:gap-16 items-start">

            {/* Sol: RichText İçerik */}
            <FadeIn direction="up">
              {service.body ? (
                <div className="prose prose-lg max-w-none">
                  <RichText value={service.body} />
                </div>
              ) : (
                <div className="py-12 text-muted-foreground font-sans text-base leading-relaxed max-w-lg">
                  <p>Bu hizmet hakkında detaylı bilgi yakında eklenecektir.</p>
                </div>
              )}
            </FadeIn>

            {/* Sağ: Yapışkan Panel */}
            <FadeIn direction="up" delay={0.15} className="lg:sticky lg:top-28">
              <div className="bg-muted p-8 border border-border space-y-8">
                {/* Randevu CTA */}
                <div>
                  <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-secondary mb-3">
                    Randevu Al
                  </p>
                  <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-6">
                    {service.title} için hemen randevu alın veya bilgi alın.
                  </p>
                  <Link
                    href="/iletisim"
                    className="flex items-center justify-center gap-3 bg-primary text-primary-foreground px-6 py-4 text-[10px] font-sans tracking-[0.3em] uppercase hover:bg-primary/85 transition-all duration-300 group w-full"
                  >
                    Randevu Al
                    <RiArrowRightLine size={12} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>

                {/* Diğer Hizmetler */}
                {otherServices.length > 0 && (
                  <div>
                    <div className="border-t border-border pt-8">
                      <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-4">
                        Diğer Hizmetler
                      </p>
                      <ul className="space-y-2">
                        {otherServices.map((s: any) => (
                          <li key={s._id}>
                            <Link
                              href={`/hizmetler/${s.slug?.current}`}
                              className="flex items-center justify-between font-sans text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 py-2 border-b border-border/50 group"
                            >
                              <span>{s.title}</span>
                              <RiArrowRightLine size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Geri Dön ──────────────────────────────────────────────── */}
      <section className="bg-muted border-t border-border py-10">
        <div className="container mx-auto px-6 lg:px-10">
          <Link
            href="/hizmetler"
            className="inline-flex items-center gap-2 font-sans text-[10px] tracking-[0.3em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300 group"
          >
            <RiArrowLeftLine size={12} className="transition-transform group-hover:-translate-x-1" />
            Tüm Hizmetlere Dön
          </Link>
        </div>
      </section>
    </>
  );
}
