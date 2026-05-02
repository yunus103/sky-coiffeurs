"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SanityImage } from "@/components/ui/SanityImage";
import { cn } from "@/lib/utils";
import { RiArrowRightLine } from "react-icons/ri";

const FALLBACK_GRADIENT = "linear-gradient(135deg, #1B4332 0%, #2d6a4f 50%, #1B4332 100%)";

interface HeroData {
  heroImages?: any[];
  heroEyebrow?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroPrimaryCtaLabel?: string;
  heroPrimaryCtaHref?: string;
  heroSecondaryCtaLabel?: string;
  heroSecondaryCtaHref?: string;
}

export function HeroSection({ data }: { data: HeroData | null }) {
  const [current, setCurrent] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const images = data?.heroImages?.length ? data.heroImages : null;
  const eyebrow = data?.heroEyebrow ?? "Kadın & Erkek Kuaförü";
  const title = data?.heroTitle ?? "Tarzınızı\nYansıtın";
  const subtitle = data?.heroSubtitle ?? "Profesyonel ekibimizle size özel bakım deneyimi.";
  const primaryLabel = data?.heroPrimaryCtaLabel ?? "Randevu Al";
  const primaryHref = data?.heroPrimaryCtaHref ?? "/iletisim";
  const secondaryLabel = data?.heroSecondaryCtaLabel ?? "Hizmetlerimiz";
  const secondaryHref = data?.heroSecondaryCtaHref ?? "/hizmetler";

  const titleLines = title.split("\\n");

  const advance = (next: number) => {
    setCurrent(next);
    setAnimKey((k) => k + 1);
  };

  useEffect(() => {
    if (!images || images.length <= 1) return;
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => {
        const next = (prev + 1) % images.length;
        setAnimKey((k) => k + 1);
        return next;
      });
    }, 6000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [images?.length]);

  return (
    <section id="hero" className="relative h-svh min-h-[600px] w-full overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0">
        {images ? (
          images.map((img, i) => (
            <div
              key={i}
              className={cn(
                "absolute inset-0 transition-opacity duration-1000",
                i === current ? "opacity-100" : "opacity-0"
              )}
            >
              <div
                key={`zoom-${animKey}-${i}`}
                className={cn("absolute inset-0", i === current && "hero-zoom-active")}
              >
                <SanityImage
                  image={img}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority={i === 0}
                  noBlur={i === 0}
                />
              </div>
            </div>
          ))
        ) : (
          <div className="absolute inset-0" style={{ background: FALLBACK_GRADIENT }} />
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />
      </div>

      {/* Content — bottom left */}
      <div className="relative z-10 h-full flex flex-col justify-end px-8 md:px-16 lg:px-24 pb-24 md:pb-32">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-secondary font-sans text-[10px] tracking-[0.5em] uppercase mb-6"
          >
            {eyebrow}
          </motion.p>

          {/* Gold divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="gold-divider mb-6 origin-left"
          />

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl text-white font-light leading-[0.92] mb-8 drop-shadow-md"
          >
            {titleLines.map((line, i) => (
              <span key={i} className="block">{line}</span>
            ))}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-white/90 text-base md:text-lg font-sans leading-relaxed max-w-sm mb-10 drop-shadow"
          >
            {subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href={primaryHref}
              className="inline-flex items-center justify-center gap-2 bg-secondary text-secondary-foreground px-8 py-4 text-[10px] tracking-[0.3em] uppercase font-sans hover:bg-secondary/85 transition-all duration-300 group"
            >
              {primaryLabel}
              <RiArrowRightLine size={12} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href={secondaryHref}
              className="inline-flex items-center justify-center px-8 py-4 text-[10px] tracking-[0.3em] uppercase font-sans border border-white/35 text-white hover:bg-white/10 transition-all duration-300"
            >
              {secondaryLabel}
            </a>
          </motion.div>
        </div>
      </div>

      {/* Carousel dots — right side vertical */}
      {images && images.length > 1 && (
        <div className="absolute right-8 md:right-12 bottom-1/2 translate-y-1/2 z-10 flex flex-col gap-3">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => advance(i)}
              className={cn(
                "w-0.5 transition-all duration-500 cursor-pointer",
                i === current ? "h-10 bg-secondary" : "h-5 bg-white/30 hover:bg-white/60"
              )}
              aria-label={`Görsel ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Scroll indicator — right bottom */}
      <div className="absolute right-8 md:right-12 bottom-8 z-10 flex flex-col items-center gap-3">
        <span className="writing-vertical text-white/35 text-[9px] tracking-[0.4em] uppercase font-sans">
          Keşfet
        </span>
        <div className="w-px h-10 bg-white/15 relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full h-[40%] bg-white/50"
            animate={{ y: ["0%", "250%"] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "linear" as const }}
          />
        </div>
      </div>
    </section>
  );
}
