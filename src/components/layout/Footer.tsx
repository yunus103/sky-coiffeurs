import Link from "next/link";
import { FaInstagram, FaFacebook, FaYoutube, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { RiMailLine, RiPhoneLine, RiMapPinLine, RiArrowRightLine } from "react-icons/ri";
import { SanityImage } from "@/components/ui/SanityImage";

type NavItem = { label: string; href: string; openInNewTab?: boolean };
type SocialLink = { platform: string; url: string };

const socialIconMap: Record<string, React.ElementType> = {
  instagram: FaInstagram,
  facebook: FaFacebook,
  twitter: FaXTwitter,
  youtube: FaYoutube,
  tiktok: FaTiktok,
};

function resolveHref(item: NavItem): string {
  return item.href || "#";
}

export function Footer({ settings, navigation }: { settings: any; navigation: any }) {
  const footerLinks: NavItem[] = navigation?.footerLinks || [];
  const socialLinks: SocialLink[] = (settings?.socialLinks || []).filter((s: SocialLink) => s.url);
  const contact = settings?.contactInfo;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-6 lg:px-10 py-20 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">

          {/* Kolon 1: Marka & Logo */}
          <div className="space-y-6 lg:col-span-1">
            <Link href="/" className="inline-block relative">
              {settings?.logo ? (
                <div className="relative h-24 w-24 sm:h-32 sm:w-32">
                  <SanityImage
                    image={settings.logo}
                    fill
                    sizes="(max-width: 768px) 150px, 200px"
                    className="object-contain object-left"
                    objectFit="contain"
                  />
                </div>
              ) : (
                <span className="font-serif text-3xl font-light tracking-tight">
                  {settings?.siteName ?? "Sky Coiffeurs"}
                </span>
              )}
            </Link>
            {settings?.siteTagline && (
              <p className="text-sm text-background/50 font-sans leading-relaxed max-w-xs">
                {settings.siteTagline}
              </p>
            )}
          </div>

          {/* Kolon 2: Hızlı Linkler */}
          <div className="space-y-6">
            <h3 className="font-sans text-xs tracking-[0.3em] uppercase text-background/40">
              Sayfalar
            </h3>
            {footerLinks.length > 0 ? (
              <nav className="space-y-3">
                {footerLinks.map((item, i) => (
                  <Link
                    key={i}
                    href={resolveHref(item)}
                    target={item.openInNewTab ? "_blank" : undefined}
                    rel={item.openInNewTab ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-2 text-sm text-background/60 hover:text-secondary transition-colors font-sans group w-fit"
                  >
                    <RiArrowRightLine size={12} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>
            ) : (
              <p className="text-sm text-background/40 font-sans">—</p>
            )}
          </div>

          {/* Kolon 3: İletişim */}
          <div className="space-y-6">
            <h3 className="font-sans text-xs tracking-[0.3em] uppercase text-background/40">
              İletişim
            </h3>
            <div className="space-y-4">
              {contact?.phone && (
                <a href={`tel:${contact.phone}`} className="flex items-center gap-3 text-sm text-background/60 hover:text-secondary transition-colors font-sans w-fit">
                  <RiPhoneLine className="shrink-0 text-secondary" size={16} />
                  {contact.phone}
                </a>
              )}
              {contact?.email && (
                <a href={`mailto:${contact.email}`} className="flex items-center gap-3 text-sm text-background/60 hover:text-secondary transition-colors font-sans w-fit">
                  <RiMailLine className="shrink-0 text-secondary" size={16} />
                  {contact.email}
                </a>
              )}
              {contact?.address && (
                <p className="flex items-start gap-3 text-sm text-background/60 font-sans max-w-xs">
                  <RiMapPinLine className="shrink-0 mt-0.5 text-secondary" size={16} />
                  <span className="leading-relaxed">{contact.address}</span>
                </p>
              )}
            </div>
          </div>

          {/* Kolon 4: Sosyal Medya & CTA */}
          <div className="space-y-6">
            <h3 className="font-sans text-xs tracking-[0.3em] uppercase text-background/40">
              Sosyal Medya
            </h3>
            {socialLinks.length > 0 ? (
              <div className="flex flex-col gap-3">
                {socialLinks.map((social, i) => {
                  const Icon = socialIconMap[social.platform];
                  if (!Icon) return null;
                  return (
                    <a
                      key={i}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.platform}
                      className="flex items-center gap-3 text-sm text-background/60 hover:text-secondary transition-colors font-sans capitalize w-fit"
                    >
                      <Icon size={14} className="text-secondary" />
                      {social.platform}
                    </a>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-background/40 font-sans">—</p>
            )}

            <div className="pt-6">
              <Link
                href="/iletisim"
                className="inline-flex items-center gap-2 bg-transparent border border-secondary/50 text-secondary px-6 py-3 text-[10px] font-sans tracking-[0.2em] uppercase hover:bg-secondary hover:text-secondary-foreground transition-all duration-300 group"
              >
                Randevu Al
                <RiArrowRightLine size={12} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

        </div>

        {/* Alt Bar */}
        <div className="mt-20 pt-8 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-background/30 font-sans">
            © {currentYear} {settings?.siteName ?? "Sky Coiffeurs"}. Tüm hakları saklıdır.
          </p>
          <div className="flex gap-6">
            <Link href="/yasal/gizlilik-politikasi" className="text-xs text-background/30 hover:text-secondary transition-colors font-sans">
              Gizlilik Politikası
            </Link>
            <Link href="/yasal/kullanim-kosullari" className="text-xs text-background/30 hover:text-secondary transition-colors font-sans">
              Kullanım Koşulları
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
