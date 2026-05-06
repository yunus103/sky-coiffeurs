import { getSiteUrl } from "@/lib/utils";

export function JsonLd({ data }: { data: Record<string, any> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function hairSalonJsonLd(settings: any) {
  const baseUrl = getSiteUrl();
  const contact = settings?.contactInfo;
  const social = settings?.socialLinks?.map((s: any) => s.url).filter(Boolean) ?? [];
  const hours = contact?.workingHours ?? [];

  return {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    name: settings?.siteName ?? "Sky Coiffeurs",
    url: baseUrl,
    ...(contact?.phone && { telephone: contact.phone }),
    ...(contact?.email && { email: contact.email }),
    ...(contact?.address && {
      address: {
        "@type": "PostalAddress",
        streetAddress: contact.address,
      },
    }),
    ...(hours.length > 0 && {
      openingHoursSpecification: hours.map((h: any) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: h.day,
        opens: h.hours?.split("–")[0]?.trim() ?? "09:00",
        closes: h.hours?.split("–")[1]?.trim() ?? "21:00",
      })),
    }),
    priceRange: "$$",
    ...(social.length && { sameAs: social }),
  };
}

/** @deprecated Yeni projeler hairSalonJsonLd kullanmalı */
export function organizationJsonLd(settings: any) {
  return hairSalonJsonLd(settings);
}

export function articleJsonLd(post: any) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post?.title,
    datePublished: post?.publishedAt,
    url: `${getSiteUrl()}/${post?.slug?.current}`,
  };
}

export function blogListJsonLd(posts: any[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Sky Coiffeurs Blog",
    url: `${getSiteUrl()}/blog`,
    blogPost: (posts ?? []).map((post: any) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: `${getSiteUrl()}/${post.slug?.current}`,
      datePublished: post.publishedAt,
    })),
  };
}

export function aboutPageJsonLd(settings: any) {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: settings?.siteName ?? "Sky Coiffeurs",
    url: `${getSiteUrl()}/hakkimizda`,
  };
}

export function servicesListJsonLd(services: any[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Hizmetlerimiz",
    url: `${getSiteUrl()}/hizmetler`,
    itemListElement: (services ?? []).map((s: any, i: number) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s.title,
      url: `${getSiteUrl()}/hizmetler/${s.slug?.current}`,
    })),
  };
}

export function serviceDetailJsonLd(service: any) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service?.title,
    description: service?.shortDescription,
    url: `${getSiteUrl()}/hizmetler/${service?.slug?.current}`,
    provider: {
      "@type": "HairSalon",
      name: "Sky Coiffeurs",
      url: getSiteUrl(),
    },
  };
}

export function galleryPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Galeri",
    url: `${getSiteUrl()}/galeri`,
  };
}

export function contactPageJsonLd(settings: any) {
  const contact = settings?.contactInfo;
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "İletişim",
    url: `${getSiteUrl()}/iletisim`,
    ...(contact?.phone && { telephone: contact.phone }),
    ...(contact?.email && { email: contact.email }),
  };
}

