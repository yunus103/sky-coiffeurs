"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SanityImage } from "@/components/ui/SanityImage";
import { FadeIn } from "@/components/ui/FadeIn";

interface Props {
  quote?: string;
  image?: any;
  sectionTitle?: string;
}

export function AtmosphereSection({ quote, image, sectionTitle }: Props) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  const displayQuote = quote ?? "Stilinizi kusursuz bir deneyimle buluşturuyoruz.";

  return (
    <section ref={ref} id="atmosfer" className="bg-background py-20 md:py-0 overflow-hidden">
      <div className="grid lg:grid-cols-[45%_55%] min-h-[60vh]">

        {/* Left: Parallax Image */}
        <div className="relative overflow-hidden min-h-[400px] lg:min-h-0">
          <motion.div style={{ y }} className="absolute inset-[-10%] will-change-transform">
            {image ? (
              <SanityImage
                image={image}
                fill
                sizes="45vw"
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
                <span className="font-serif text-8xl text-primary/10">✦</span>
              </div>
            )}
          </motion.div>
          {/* Right edge fade */}
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-r from-transparent to-background hidden lg:block" />
        </div>

        {/* Right: Quote */}
        <div className="flex flex-col justify-center px-10 md:px-16 lg:px-20 py-16 lg:py-24">
          <FadeIn direction="up">
            {sectionTitle && (
              <p className="font-sans text-[10px] tracking-[0.5em] uppercase text-secondary mb-8">
                {sectionTitle}
              </p>
            )}

            {/* Decorative large quote mark */}
            <div className="font-serif text-[120px] leading-none text-secondary/15 select-none mb-[-2rem]">
              &ldquo;
            </div>

            <blockquote className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-foreground leading-[1.15] mb-10">
              {displayQuote}
            </blockquote>

            <div className="flex items-center gap-4">
              <div className="gold-divider" />
              <span className="font-sans text-xs tracking-[0.3em] uppercase text-muted-foreground">
                Sky Coiffeurs
              </span>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
