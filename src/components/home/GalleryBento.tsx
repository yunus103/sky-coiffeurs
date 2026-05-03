"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { SanityImage } from "@/components/ui/SanityImage";
import { LightboxModal, prefetchLightboxImage } from "@/components/ui/Lightbox";
import { FadeIn } from "@/components/ui/FadeIn";
import { cn } from "@/lib/utils";
import { RiExpandLeftLine, RiArrowRightLine, RiScissors2Line } from "react-icons/ri";

interface GalleryItem {
  _key?: string;
  title?: string;
  image: any;
  category?: "men" | "women";
  featured?: boolean;
  relatedService?: {
    _id: string;
    title: string;
  };
}

interface Props {
  items: GalleryItem[];
  sectionTitle?: string;
  sectionSubtitle?: string;
  ctaLabel?: string;
}

const BENTO_CLASSES = [
  "bento-1",
  "bento-2",
  "bento-3",
  "bento-4",
  "bento-5",
  "bento-6",
  "bento-7",
  "bento-8",
];

export function GalleryBento({ items, sectionTitle, sectionSubtitle, ctaLabel }: Props) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  const displayItems = items?.length ? items.slice(0, 8) : [];

  const open = (idx: number) => {
    setStartIndex(idx);
    setLightboxOpen(true);
  };

  return (
    <section id="galeri-onizleme" className="bg-muted py-20 md:py-28">
      <div className="container mx-auto px-6 lg:px-10">

        {/* Header */}
        <FadeIn direction="up" className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="font-sans text-[10px] tracking-[0.5em] uppercase text-secondary mb-4">
              Galeri
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground leading-tight">
              {sectionTitle ?? "Çalışmalarımızdan"}
            </h2>
            {sectionSubtitle && (
              <p className="text-muted-foreground font-sans mt-3 max-w-sm leading-relaxed">
                {sectionSubtitle}
              </p>
            )}
          </div>
          <Link
            href="/galeri"
            className="inline-flex items-center gap-2 text-[10px] font-sans tracking-[0.3em] uppercase text-primary border-b border-primary pb-0.5 hover:gap-3 transition-all duration-300 group shrink-0"
          >
            {ctaLabel ?? "Tüm Galeriyi Gör"}
            <RiArrowRightLine size={12} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </FadeIn>

        {/* Bento Grid */}
        {displayItems.length > 0 ? (
          <FadeIn direction="up" delay={0.1}>
            <div className="bento-grid">
              {displayItems.map((item, i) => (
                <motion.div
                  key={item._key || i}
                  className={cn(
                    "relative overflow-hidden bg-border group cursor-pointer",
                    BENTO_CLASSES[i] ?? "col-span-3"
                  )}
                  whileHover={{ zIndex: 10 }}
                  onClick={() => open(i)}
                  onMouseEnter={() => item.image && prefetchLightboxImage(item.image)}
                >
                  {item.image ? (
                    <SanityImage
                      image={item.image}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5" />
                  )}

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex flex-col items-center justify-center p-4">
                    <div className="opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-400 mb-2">
                      <div className="w-10 h-10 border border-white/60 flex items-center justify-center text-white backdrop-blur-sm">
                        <RiExpandLeftLine size={16} />
                      </div>
                    </div>

                    {item.relatedService && (
                      <div className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 text-center">
                        <span className="inline-flex items-center gap-1.5 font-sans text-[8px] tracking-[0.15em] uppercase text-white bg-secondary/80 px-2 py-1 backdrop-blur-sm">
                          <RiScissors2Line size={10} />
                          {item.relatedService.title}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Category badge */}
                  {item.category && (
                    <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="bg-white/10 text-white text-[9px] font-sans tracking-widest uppercase px-2 py-1 backdrop-blur-md border border-white/10">
                        {item.category === "men" ? "Erkek" : "Kadın"}
                      </span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </FadeIn>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-background aspect-square flex items-center justify-center">
                <span className="font-serif text-4xl text-border">✦</span>
              </div>
            ))}
          </div>
        )}

        {/* Lightbox */}
        <LightboxModal 
          items={displayItems} 
          startIndex={lightboxOpen ? startIndex : null} 
          onClose={() => setLightboxOpen(false)} 
        />
      </div>
    </section>
  );
}
