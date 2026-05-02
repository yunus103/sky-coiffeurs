import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";
import { RiPhoneLine, RiTimeLine, RiInstagramLine, RiArrowRightLine, RiMapPinLine } from "react-icons/ri";

interface Props {
  contactInfo?: {
    phone?: string;
    address?: string;
    whatsappNumber?: string;
    workingHours?: { day: string; hours: string }[];
  };
  socialLinks?: { platform: string; url: string }[];
  siteName?: string;
}

const fallbackHours = [
  { day: "Pazartesi", hours: "09:00–21:00" },
  { day: "Salı", hours: "09:00–21:00" },
  { day: "Çarşamba", hours: "09:00–21:00" },
  { day: "Perşembe", hours: "09:00–21:00" },
  { day: "Cuma", hours: "09:00–21:00" },
  { day: "Cumartesi", hours: "09:00–21:00" },
  { day: "Pazar", hours: "09:00–21:00" },
];

export function ContactCta({ contactInfo, socialLinks, siteName }: Props) {
  const phone = contactInfo?.phone;
  const address = contactInfo?.address;
  const instagramUrl = socialLinks?.find((l) => l.platform.toLowerCase() === "instagram")?.url;
  const hours = contactInfo?.workingHours?.length ? contactInfo.workingHours : fallbackHours;

  return (
    <section id="iletisim-cta" className="bg-primary text-primary-foreground relative overflow-hidden">
      {/* Background elegant accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-foreground/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 lg:px-10 py-24 md:py-32 relative z-10">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-24">

          {/* Left: Content & CTA */}
          <FadeIn direction="up" className="flex flex-col justify-center">
            <p className="font-sans text-[10px] tracking-[0.5em] uppercase text-secondary mb-6">
              İletişim
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl font-light text-primary-foreground leading-[1.1] mb-8">
              Sizi salonumuza<br/>bekliyoruz.
            </h2>
            <p className="font-sans text-primary-foreground/60 text-base lg:text-lg mb-12 max-w-md leading-relaxed">
              Özel bakım deneyimini yaşamak, stilinize yeni bir dokunuş katmak veya detaylı bilgi almak için bizimle iletişime geçin.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/iletisim"
                className="inline-flex items-center gap-3 bg-secondary text-secondary-foreground px-8 py-4 text-[10px] font-sans tracking-[0.3em] uppercase hover:bg-secondary/85 transition-all duration-300 group"
              >
                Randevu Al
                <RiArrowRightLine size={12} className="transition-transform group-hover:translate-x-1" />
              </Link>
              {contactInfo?.whatsappNumber && (
                <a
                  href={`https://wa.me/${contactInfo.whatsappNumber.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 border border-secondary/30 text-primary-foreground px-8 py-4 text-[10px] font-sans tracking-[0.3em] uppercase hover:bg-white/5 transition-all duration-300 group"
                >
                  WhatsApp
                </a>
              )}
            </div>
          </FadeIn>

          {/* Right: Info Grid */}
          <FadeIn direction="up" delay={0.15} className="lg:pl-10">
            <div className="grid sm:grid-cols-2 gap-12 sm:gap-x-8 sm:gap-y-16 border-t border-primary-foreground/10 pt-12 lg:border-t-0 lg:pt-0">
              
              {/* Phone */}
              {phone && (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <RiPhoneLine size={18} className="text-secondary" />
                    <h3 className="font-sans text-[11px] tracking-widest uppercase text-primary-foreground/50">Telefon</h3>
                  </div>
                  <a href={`tel:${phone}`} className="font-serif text-3xl text-primary-foreground hover:text-secondary transition-colors duration-300 block">
                    {phone}
                  </a>
                </div>
              )}

              {/* Instagram */}
              {instagramUrl && (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <RiInstagramLine size={18} className="text-secondary" />
                    <h3 className="font-sans text-[11px] tracking-widest uppercase text-primary-foreground/50">Instagram</h3>
                  </div>
                  <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="font-sans text-lg text-primary-foreground/90 hover:text-secondary transition-colors duration-300 block mt-1">
                    {instagramUrl.replace("https://instagram.com/", "@").replace("https://www.instagram.com/", "@").replace(/\/$/, "")}
                  </a>
                </div>
              )}

              {/* Address */}
              {address && (
                <div className="sm:col-span-2 lg:col-span-1">
                  <div className="flex items-center gap-3 mb-4">
                    <RiMapPinLine size={18} className="text-secondary" />
                    <h3 className="font-sans text-[11px] tracking-widest uppercase text-primary-foreground/50">Adres</h3>
                  </div>
                  <p className="font-sans text-sm text-primary-foreground/80 leading-relaxed max-w-xs">
                    {address}
                  </p>
                </div>
              )}

              {/* Working Hours */}
              <div className="sm:col-span-2 lg:col-span-1">
                <div className="flex items-center gap-3 mb-6">
                  <RiTimeLine size={18} className="text-secondary" />
                  <h3 className="font-sans text-[11px] tracking-widest uppercase text-primary-foreground/50">Çalışma Saatleri</h3>
                </div>
                <ul className="space-y-3">
                  {hours.map((item, i) => (
                    <li key={i} className="flex justify-between items-center text-sm border-b border-primary-foreground/5 pb-2">
                      <span className="text-primary-foreground/60">{item.day}</span>
                      <span className="text-primary-foreground/90 font-medium">{item.hours}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}
