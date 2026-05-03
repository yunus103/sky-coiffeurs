import { Metadata } from "next";
import { draftMode } from "next/headers";
import { getClient } from "@/sanity/lib/client";
import { galeriPageQuery } from "@/sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { FadeIn } from "@/components/ui/FadeIn";
import { JsonLd, galleryPageJsonLd } from "@/components/seo/JsonLd";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getClient().fetch(galeriPageQuery, {}, { next: { tags: ["gallery"] } });
  return buildMetadata({
    title: data?.pageTitle || "Galeri",
    canonicalPath: "/galeri",
    pageSeo: data?.seo,
  });
}

export default async function GalleryPage() {
  const isDraft = (await draftMode()).isEnabled;
  const client = getClient(isDraft);

  const data = await client.fetch(galeriPageQuery, {}, { next: { tags: ["gallery"] } });

  const pageTitle = data?.pageTitle ?? "Galeri";
  const pageSubtitle = data?.pageSubtitle ?? "Çalışmalarımızdan seçmeler.";
  const images = data?.images ?? [];

  return (
    <>
      <JsonLd data={galleryPageJsonLd()} />

      {/* ── Page Header ─────────────────────────────────────────── */}
      <section className="bg-primary pt-36 pb-16">
        <div className="container mx-auto px-6 lg:px-10">
          <FadeIn direction="up">
            <p className="font-sans text-[10px] tracking-[0.5em] uppercase text-secondary mb-4">
              Çalışmalarımız
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

      {/* ── Gallery Grid ────────────────────────────────────────── */}
      <section className="bg-background py-16 md:py-20">
        <div className="container mx-auto px-6 lg:px-10">
          <GalleryGrid images={images} />
        </div>
      </section>
    </>
  );
}
