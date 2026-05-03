"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SanityImage } from "@/components/ui/SanityImage";
import { LightboxModal, prefetchLightboxImage } from "@/components/ui/Lightbox";
import { cn } from "@/lib/utils";
import { RiExpandLeftLine, RiScissors2Line } from "react-icons/ri";

type Category = "general" | "women" | "men";

interface GalleryItem {
  _key: string;
  title?: string;
  category?: "men" | "women"; // "general" is now the absence of these or the "all" filter
  relatedService?: {
    _id: string;
    title: string;
  };
  image: any;
}

const CATEGORY_LABELS: Record<Category, string> = {
  general: "Genel",
  women: "Kadın",
  men: "Erkek",
};

export function GalleryGrid({ images }: { images: GalleryItem[] }) {
  const [activeCategory, setActiveCategory] = useState<Category>("general");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  // Filter logic: general shows all, others show specific category
  const filtered = activeCategory === "general"
    ? images
    : images.filter((img) => img.category === activeCategory);


  const open = (idx: number) => {
    setStartIndex(idx);
    setLightboxOpen(true);
  };

  if (images.length === 0) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-border min-h-[400px]">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-background aspect-square flex items-center justify-center">
            <span className="font-serif text-5xl text-border">✦</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-10">
        {(["general", "women", "men"] as Category[]).map((c) => (
          <button
            key={c}
            onClick={() => setActiveCategory(c)}
            className={cn(
              "px-6 py-2.5 text-[10px] font-sans tracking-[0.3em] uppercase border transition-all duration-300",
              activeCategory === c
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-transparent text-muted-foreground border-border hover:border-primary hover:text-foreground"
            )}
          >
            {CATEGORY_LABELS[c]}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div layout className="grid grid-cols-2 md:grid-cols-3 gap-px bg-border">
        <AnimatePresence mode="popLayout">
          {filtered.map((item, i) => (
            <motion.div
              key={item._key}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative aspect-square overflow-hidden bg-muted group cursor-pointer"
              onClick={() => open(i)}
              onMouseEnter={() => item.image && prefetchLightboxImage(item.image)}
            >
              {item.image && (
                <SanityImage
                  image={item.image}
                  fill
                  sizes="(max-width: 640px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/45 transition-all duration-500 flex flex-col items-center justify-center p-4">
                <div className="opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-400 mb-4">
                  <div className="w-12 h-12 border border-white/70 flex items-center justify-center text-white backdrop-blur-sm">
                    <RiExpandLeftLine size={18} />
                  </div>
                </div>
                
                {/* Related Service - Card View */}
                {item.relatedService && (
                  <div className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 text-center">
                    <span className="inline-flex items-center gap-1.5 font-sans text-[10px] tracking-[0.15em] uppercase text-white bg-secondary/80 px-3 py-1.5 backdrop-blur-sm">
                      <RiScissors2Line size={12} />
                      {item.relatedService.title}
                    </span>
                  </div>
                )}
              </div>

              {/* Category badge */}
              {item.category && (
                <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="bg-white/10 text-white text-[9px] font-sans tracking-widest uppercase px-2 py-1 backdrop-blur-md border border-white/10">
                    {item.category === "men" ? "Erkek" : "Kadın"}
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Count */}
      <p className="font-sans text-xs text-muted-foreground tracking-widest mt-6 text-right">
        {filtered.length} fotoğraf gösteriliyor
      </p>

      {/* Lightbox */}
      <LightboxModal
        items={filtered}
        startIndex={lightboxOpen ? startIndex : null}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
}
