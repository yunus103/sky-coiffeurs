import { Metadata } from "next";
import { draftMode } from "next/headers";
import { getClient } from "@/sanity/lib/client";
import { homePageQuery, serviceListQuery, galleryPreviewQuery, settingsQuery } from "@/sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { HeroSection } from "@/components/home/HeroSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { GalleryBento } from "@/components/home/GalleryBento";
import { ReviewsCarousel } from "@/components/home/ReviewsCarousel";
import { AtmosphereSection } from "@/components/home/AtmosphereSection";
import { ContactCta } from "@/components/home/ContactCta";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getClient().fetch(homePageQuery, {}, { next: { tags: ["home"] } });
  return buildMetadata({ canonicalPath: "/", pageSeo: data?.seo });
}

export default async function HomePage() {
  const isDraft = (await draftMode()).isEnabled;
  const client = getClient(isDraft);

  const [homeData, services, galleryItems, settings] = await Promise.all([
    client.fetch(homePageQuery,       {}, { next: { tags: ["home"] } }),
    client.fetch(serviceListQuery,    {}, { next: { tags: ["services"] } }),
    client.fetch(galleryPreviewQuery, {}, { next: { tags: ["gallery"] } }),
    client.fetch(settingsQuery,       {}, { next: { tags: ["settings"] } }),
  ]);

  return (
    <>
      <HeroSection data={homeData} />

      <ServicesSection
        services={services}
        sectionTitle={homeData?.servicesSectionTitle}
      />

      <GalleryBento
        items={galleryItems}
        sectionTitle={homeData?.gallerySectionTitle}
        sectionSubtitle={homeData?.gallerySectionSubtitle}
        ctaLabel={homeData?.galleryCtaLabel}
      />

      <ReviewsCarousel
        reviews={homeData?.reviews}
        sectionTitle={homeData?.reviewsSectionTitle}
      />

      <AtmosphereSection
        quote={homeData?.atmosphereQuote}
        image={homeData?.atmosphereImage}
        sectionTitle={homeData?.atmosphereSectionTitle}
      />

      <ContactCta
        contactInfo={settings?.contactInfo}
        socialLinks={settings?.socialLinks}
      />
    </>
  );
}
