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
    url: `${getSiteUrl()}/blog/${post?.slug?.current}`,
  };
}
