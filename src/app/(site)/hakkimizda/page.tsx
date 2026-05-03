import { Metadata } from "next";
import { draftMode } from "next/headers";
import { getClient } from "@/sanity/lib/client";
import { aboutPageQuery, settingsQuery } from "@/sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { FadeIn } from "@/components/ui/FadeIn";
import { SanityImage } from "@/components/ui/SanityImage";
import { JsonLd, aboutPageJsonLd } from "@/components/seo/JsonLd";
import Link from "next/link";
import { RiArrowRightLine } from "react-icons/ri";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getClient().fetch(aboutPageQuery, {}, { next: { tags: ["about"] } });
  return buildMetadata({
    title: data?.pageTitle || "Hakkımızda",
    canonicalPath: "/hakkimizda",
    pageSeo: data?.seo,
  });
}

const FALLBACK_VALUES = [
  { title: "Uzmanlık", description: "Yıllarca süren deneyim ve sürekli gelişen tekniklerle her işimizi özenle yapıyoruz." },
  { title: "Kişisel Bakım", description: "Her müşteriye özel yaklaşım. Sizin için en iyi sonucu bulmak birinci önceliğimizdir." },
  { title: "Kaliteli Ürünler", description: "Saçınıza en iyi bakımı sunmak için sektörün önde gelen ürünlerini kullanıyoruz." },
];

export default async function AboutPage() {
  const isDraft = (await draftMode()).isEnabled;
  const client = getClient(isDraft);

  const [data, settings] = await Promise.all([
    client.fetch(aboutPageQuery, {}, { next: { tags: ["about"] } }),
    client.fetch(settingsQuery, {}, { next: { tags: ["settings"] } }),
  ]);

  const pageTitle = data?.pageTitle ?? "Hakkımızda";
  const pageSubtitle = data?.pageSubtitle ?? "Saçınıza değer katıyoruz.";
  const storyTitle = data?.storyTitle ?? "Hikayemiz";
  const storyText = data?.storyText ?? "Sky Coiffeurs, müşterilerine en iyi deneyimi sunma tutkusuyla kuruldu. Her ziyaret, kişisel bir bakım deneyimidir. Uzman ekibimizle stilinizi birlikte şekillendiriyoruz.";
  const valuesTitle = data?.valuesTitle ?? "Değerlerimiz";
  const values = data?.values?.length ? data.values : FALLBACK_VALUES;
  const ownerTitle = data?.ownerTitle ?? "Arkasındaki İsim";
  const ownerName = data?.ownerName ?? "";
  const ownerRole = data?.ownerRole ?? "Kurucu & Baş Stilist";
  const ownerBio = data?.ownerBio ?? "Sektördeki deneyimiyle müşterilerine özel çözümler sunan, her kesimde kendi imzasını bırakan bir stilist.";
  const ctaLabel = data?.ctaLabel ?? "Randevu Al";
  const ctaHref = data?.ctaHref ?? "/iletisim";

  return (
    <>
      <JsonLd data={aboutPageJsonLd(settings)} />

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative h-[55vh] min-h-[400px] overflow-hidden bg-primary flex items-end">
        {data?.heroImage && (
          <SanityImage
            image={data.heroImage}
            fill
            priority
            noBlur
            sizes="100vw"
            className="object-cover opacity-40"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
        <div className="relative z-10 container mx-auto px-6 lg:px-10 pb-16">
          <FadeIn direction="up">
            <p className="font-sans text-[10px] tracking-[0.5em] uppercase text-secondary mb-4">
              Biz Kimiz
            </p>
            <h1 className="font-serif text-5xl md:text-7xl font-light text-primary-foreground leading-[1.05]">
              {pageTitle}
            </h1>
            <p className="font-sans text-primary-foreground/60 text-lg mt-4 max-w-md">
              {pageSubtitle}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Hikayemiz ────────────────────────────────────────────── */}
      <section className="bg-background py-24 md:py-32 overflow-hidden">
        <div className="container mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-16 lg:gap-24 items-center">
            <FadeIn direction="up">
              <p className="font-sans text-[10px] tracking-[0.5em] uppercase text-secondary mb-6">
                {storyTitle}
              </p>
              <div className="font-serif text-[80px] leading-none text-secondary/15 select-none mb-[-1.5rem]">
                &ldquo;
              </div>
              <p className="font-serif text-2xl md:text-3xl font-light text-foreground leading-[1.4] mb-8">
                {storyText}
              </p>
              <div className="gold-divider" />
            </FadeIn>

            <FadeIn direction="left" delay={0.15}>
              {data?.storyImage ? (
                <div className="relative aspect-[3/4] overflow-hidden">
                  <SanityImage
                    image={data.storyImage}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="aspect-[3/4] bg-muted flex items-center justify-center">
                  <span className="font-serif text-8xl text-primary/10">✦</span>
                </div>
              )}
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Değerlerimiz ─────────────────────────────────────────── */}
      <section className="bg-muted py-24 md:py-32">
        <div className="container mx-auto px-6 lg:px-10">
          <FadeIn direction="up" className="text-center mb-16">
            <p className="font-sans text-[10px] tracking-[0.5em] uppercase text-secondary mb-4">
              {valuesTitle}
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground">
              Bizi biz yapan değerler
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-px bg-border">
            {values.map((v: { title: string; description: string }, i: number) => (
              <FadeIn key={i} direction="up" delay={i * 0.1}>
                <div className="bg-background p-10 md:p-12 h-full">
                  <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-secondary mb-6">
                    0{i + 1}
                  </p>
                  <h3 className="font-serif text-2xl font-light text-foreground mb-4">
                    {v.title}
                  </h3>
                  <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                    {v.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sahibi / Kurucu ─────────────────────────────────────── */}
      <section className="bg-background py-24 md:py-32 overflow-hidden">
        <div className="container mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-24 items-center">
            {/* Fotoğraf */}
            <FadeIn direction="up" className="order-2 lg:order-1">
              {data?.ownerPhoto ? (
                <div className="relative aspect-square overflow-hidden max-w-sm mx-auto lg:mx-0">
                  <SanityImage
                    image={data.ownerPhoto}
                    fill
                    sizes="(max-width: 1024px) 400px, 500px"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="aspect-square bg-muted max-w-sm mx-auto lg:mx-0 flex items-center justify-center">
                  <span className="font-serif text-8xl text-primary/10">✦</span>
                </div>
              )}
            </FadeIn>

            {/* Metin */}
            <FadeIn direction="up" delay={0.15} className="order-1 lg:order-2">
              <p className="font-sans text-[10px] tracking-[0.5em] uppercase text-secondary mb-6">
                {ownerTitle}
              </p>
              {ownerName && (
                <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground leading-tight mb-2">
                  {ownerName}
                </h2>
              )}
              <p className="font-sans text-sm text-secondary tracking-widest uppercase mb-8">
                {ownerRole}
              </p>
              <div className="gold-divider mb-8" />
              <p className="font-sans text-muted-foreground leading-relaxed text-base mb-12 max-w-md">
                {ownerBio}
              </p>
              <Link
                href={ctaHref}
                className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 text-[10px] font-sans tracking-[0.3em] uppercase hover:bg-primary/85 transition-all duration-300 group"
              >
                {ctaLabel}
                <RiArrowRightLine size={12} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
