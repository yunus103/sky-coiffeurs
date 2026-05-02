import { groq } from "next-sanity";

const imageFragment = groq`{ asset->{ _id, url, metadata { lqip, dimensions } }, alt, hotspot, crop }`;

// ─── Layout ──────────────────────────────────────────────────────────────────
export const layoutQuery = groq`{
  "settings": *[_type == "siteSettings"][0] {
    siteName, siteTagline,
    logo { asset->{ _id, url, metadata { lqip, dimensions } }, hotspot, crop },
    favicon { asset->{ _id, url } },
    contactInfo { phone, email, address, whatsappNumber, mapIframe, workingHours[] { day, hours } },
    socialLinks[] { platform, url },
    googlePlaceId,
    gaId, gtmId, googleSearchConsoleId
  },
  "navigation": *[_type == "navigation"][0] {
    headerLinks[] { label, href, openInNewTab, subLinks[] { label, href, openInNewTab } },
    footerLinks[] { label, href, openInNewTab, subLinks[] { label, href, openInNewTab } }
  }
}`;

// ─── Ana Sayfa ────────────────────────────────────────────────────────────────
export const homePageQuery = groq`*[_type == "homePage"][0] {
  heroImages[] ${imageFragment},
  heroEyebrow, heroTitle, heroSubtitle,
  heroPrimaryCtaLabel, heroPrimaryCtaHref,
  heroSecondaryCtaLabel, heroSecondaryCtaHref,
  servicesSectionTitle,
  gallerySectionTitle, gallerySectionSubtitle, galleryCtaLabel,
  reviewsSectionTitle,
  reviews[] {
    name, rating, text, date,
    avatar { asset->{ _id, url, metadata { lqip, dimensions } }, hotspot, crop }
  },
  atmosphereQuote, atmosphereSectionTitle,
  atmosphereImage ${imageFragment},
  seo
}`;

// ─── Hakkımızda ───────────────────────────────────────────────────────────────
export const aboutPageQuery = groq`*[_type == "aboutPage"][0] {
  pageTitle, pageSubtitle, body,
  mainImage ${imageFragment},
  seo
}`;

// ─── İletişim ─────────────────────────────────────────────────────────────────
export const contactPageQuery = groq`*[_type == "contactPage"][0] {
  pageTitle, pageSubtitle, formTitle, successMessage,
  workingHours, instagramUrl, whatsappMessage, seo
}`;

// ─── Blog ─────────────────────────────────────────────────────────────────────
export const blogPageQuery = groq`*[_type == "blogPage"][0] {
  pageTitle, pageSubtitle, ctaLabel, ctaLink, seo
}`;

export const blogListQuery = groq`*[_type == "blogPost"] | order(publishedAt desc) {
  title, slug, excerpt, publishedAt, category->{ title, slug },
  mainImage ${imageFragment}
}`;

export const blogPostBySlugQuery = groq`*[_type == "blogPost" && slug.current == $slug][0] {
  _id, title, slug, publishedAt, excerpt, category->{ _id, title, slug }, seoTags,
  mainImage ${imageFragment},
  body[] {
    ...,
    _type == "image" => { asset->{ _id, url, metadata { lqip, dimensions } }, alt, alignment, size, hotspot, crop }
  },
  seo
}`;

export const blogCategoriesQuery = groq`*[_type == "blogCategory"] | order(title asc) { _id, title, slug }`;

export const blogListByCategorySlugQuery = groq`*[_type == "blogPost" && category->slug.current == $slug] | order(publishedAt desc) {
  title, slug, excerpt, publishedAt, category->{ title, slug },
  mainImage ${imageFragment}
}`;

export const blogRelatedPostsQuery = groq`*[_type == "blogPost" && category._ref == $categoryId && _id != $currentPostId] | order(publishedAt desc)[0...3] {
  title, slug, excerpt, publishedAt, category->{ title, slug },
  mainImage ${imageFragment}
}`;

// ─── Hizmetler ────────────────────────────────────────────────────────────────
export const servicesPageQuery = groq`*[_type == "servicesPage"][0] {
  pageTitle, pageSubtitle, headerImage ${imageFragment}, seo
}`;

export const serviceListQuery = groq`*[_type == "service"] | order(order asc, _createdAt asc) {
  _id, title, slug, gender, shortDescription,
  mainImage ${imageFragment}
}`;

export const serviceBySlugQuery = groq`*[_type == "service" && slug.current == $slug][0] {
  title, slug, gender, shortDescription,
  mainImage ${imageFragment},
  body[] {
    ...,
    _type == "image" => { asset->{ _id, url, metadata { lqip, dimensions } }, alt, alignment, size, hotspot, crop }
  },
  seo
}`;

// ─── Galeri ───────────────────────────────────────────────────────────────────
export const galeriPageQuery = groq`*[_type == "galeriPage"][0] { 
  pageTitle, pageSubtitle, seo,
  images[] {
    _key, title, category, featured,
    "image": {
      "asset": asset->{ _id, url, metadata { lqip, dimensions } },
      "alt": alt,
      "hotspot": hotspot,
      "crop": crop
    }
  }
}`;

export const galleryItemsQuery = groq`*[_type == "galeriPage"][0].images[] {
  _key, title, category, featured,
  "image": {
    "asset": asset->{ _id, url, metadata { lqip, dimensions } },
    "alt": alt,
    "hotspot": hotspot,
    "crop": crop
  }
}`;

export const galleryPreviewQuery = groq`(
  *[_type == "galeriPage"][0].images[featured == true] + 
  *[_type == "galeriPage"][0].images[featured != true]
)[0...8] {
  _key, title, category, featured,
  "image": {
    "asset": asset->{ _id, url, metadata { lqip, dimensions } },
    "alt": alt,
    "hotspot": hotspot,
    "crop": crop
  }
}`;

// ─── Yasal ────────────────────────────────────────────────────────────────────
export const legalPageBySlugQuery = groq`*[_type == "legalPage" && slug.current == $slug][0] {
  title, slug, body, _updatedAt, seo
}`;

// ─── Sitemap ──────────────────────────────────────────────────────────────────
export const allSlugsForSitemapQuery = groq`{
  "blogPosts": *[_type == "blogPost" && defined(slug.current)] { "slug": slug.current, _updatedAt },
  "services": *[_type == "service" && defined(slug.current)] { "slug": slug.current, _updatedAt },
  "legalPages": *[_type == "legalPage" && defined(slug.current)] { "slug": slug.current, _updatedAt }
}`;

// ─── Varsayılan SEO ───────────────────────────────────────────────────────────
export const defaultSeoQuery = groq`*[_type == "siteSettings"][0] {
  "title": defaultSeo.metaTitle,
  "description": defaultSeo.metaDescription,
  "ogImage": defaultOgImage,
  siteName, siteTagline,
  favicon { asset->{ _id, url } },
  googleSearchConsoleId
}`;

export const settingsQuery = groq`*[_type == "siteSettings"][0] {
  contactInfo { phone, email, address, whatsappNumber, mapIframe, workingHours[] { day, hours } },
  socialLinks[] { platform, url }
}`;
