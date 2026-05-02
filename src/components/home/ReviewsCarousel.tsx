"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import { RiStarFill } from "react-icons/ri";

interface Review {
  name: string;
  rating: number;
  text: string;
  date?: string;
  avatar?: any;
}

const FALLBACK_REVIEWS: Review[] = [
  { name: "Ayşe K.", rating: 5, text: "Yıllardır gidiyorum, her seferinde mükemmel sonuç. Saçlarıma çok iyi baktılar, tavsiye ederim.", date: "Mart 2025" },
  { name: "Mehmet A.", rating: 5, text: "Sakal düzeltme için geldim, beklentimin çok üstünde bir hizmet aldım. Kesinlikle geri döneceğim.", date: "Nisan 2025" },
  { name: "Zeynep T.", rating: 5, text: "Balayage uygulamamı burada yaptırdım. Renk son derece doğal çıktı, çok mutluyum.", date: "Şubat 2025" },
  { name: "Can Ö.", rating: 5, text: "Temiz, şık bir mekan. Usta eller. Salonun atmosferi de çok güzel.", date: "Ocak 2025" },
  { name: "Selin Y.", rating: 5, text: "İstanbul'da gittiğim en iyi kuaför. Hem erkek hem kadın bölümü mükemmel düzenlenmiş.", date: "Nisan 2025" },
];

// Slight rotations for organic feel
const ROTATIONS = [0.8, -1.2, 0.5, -0.7, 1.0, -0.4];

interface Props {
  reviews?: Review[];
  sectionTitle?: string;
}

export function ReviewsCarousel({ reviews, sectionTitle }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const displayReviews = reviews?.length ? reviews : FALLBACK_REVIEWS;

  return (
    <section id="yorumlar" className="bg-background py-20 md:py-28 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-10 mb-12">
        <FadeIn direction="up">
          <p className="font-sans text-[10px] tracking-[0.5em] uppercase text-secondary mb-4">
            Müşteri Yorumları
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground leading-tight">
            {sectionTitle ?? "Ne Dediler"}
          </h2>
        </FadeIn>
      </div>

      {/* Draggable Carousel */}
      <FadeIn direction="none" delay={0.2}>
        <motion.div
          ref={containerRef}
          className="flex gap-5 px-6 lg:px-10 cursor-grab active:cursor-grabbing select-none"
          drag="x"
          dragConstraints={{ right: 0, left: -((displayReviews.length - 1) * 380) }}
          dragElastic={0.1}
          whileDrag={{ cursor: "grabbing" }}
        >
          {displayReviews.map((review, i) => (
            <motion.div
              key={i}
              style={{ rotate: ROTATIONS[i % ROTATIONS.length] }}
              className="shrink-0 w-[320px] md:w-[360px] bg-card border border-border p-8 shadow-sm"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: 5 }).map((_, s) => (
                  <RiStarFill
                    key={s}
                    size={12}
                    className={s < review.rating ? "text-secondary" : "text-border"}
                  />
                ))}
              </div>

              {/* Opening quote */}
              <p className="font-serif text-6xl text-secondary/20 leading-none mb-2 select-none">&ldquo;</p>

              {/* Review text */}
              <p className="font-sans text-sm text-foreground/75 leading-relaxed mb-6 line-clamp-4">
                {review.text}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-5 border-t border-border">
                <div className="w-8 h-8 bg-muted flex items-center justify-center shrink-0">
                  <span className="font-serif text-sm text-muted-foreground font-medium">
                    {review.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-sans text-xs font-medium text-foreground tracking-wide">
                    {review.name}
                  </p>
                  {review.date && (
                    <p className="font-sans text-[10px] text-muted-foreground mt-0.5">
                      {review.date}
                    </p>
                  )}
                </div>
                <div className="ml-auto">
                  <span className="font-sans text-[9px] tracking-widest uppercase text-secondary border border-secondary/30 px-2 py-0.5">
                    Google
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </FadeIn>

      {/* Drag hint */}
      <div className="container mx-auto px-6 lg:px-10 mt-8">
        <p className="font-sans text-[10px] tracking-widest uppercase text-muted-foreground/50">
          ← Sürükleyerek kaydırın
        </p>
      </div>
    </section>
  );
}
