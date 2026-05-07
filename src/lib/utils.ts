import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string, locale = "tr-TR"): string {
  return new Date(dateString).toLocaleDateString(locale, {
    year: "numeric", month: "long", day: "numeric",
  });
}

export function getSiteUrl(): string {
  let url = process.env.NEXT_PUBLIC_SITE_URL || "https://skycoiffeur.com";
  // Protocol kontrolü: Eğer protokol yoksa https:// ekle
  if (!url.startsWith("http")) {
    url = `https://${url}`;
  }
  return url.replace(/\/$/, "");
}
