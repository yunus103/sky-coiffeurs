"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { SanityImage } from "@/components/ui/SanityImage";
import { FadeIn } from "@/components/ui/FadeIn";
import { cn } from "@/lib/utils";
import { RiArrowRightLine } from "react-icons/ri";

type Gender = "men" | "women";

interface Service {
  _id: string;
  title: string;
  slug: { current: string };
  gender: "men" | "women" | "unisex";
  shortDescription?: string;
  mainImage?: any;
}

interface Props {
  services: Service[];
  sectionTitle?: string;
}

const FALLBACK_SERVICES: Service[] = [
  { _id: "f1", title: "Saç Kesimi", slug: { current: "#" }, gender: "men", shortDescription: "Kişiye özel tekniklerle modern ya da klasik kesimler." },
  { _id: "f2", title: "Sakal Düzeltme", slug: { current: "#" }, gender: "men", shortDescription: "Yüz şekline göre sakal şekillendirme ve bakım." },
  { _id: "f3", title: "Saç Boyama", slug: { current: "#" }, gender: "men", shortDescription: "Doğal geçişli renk uygulamaları." },
  { _id: "f4", title: "Saç Kesimi", slug: { current: "#" }, gender: "women", shortDescription: "Her saç tipine uygun kesim ve şekillendirme." },
  { _id: "f5", title: "Röfle & Balayage", slug: { current: "#" }, gender: "women", shortDescription: "Işıltılı, doğal görünümlü renk teknikleri." },
  { _id: "f6", title: "Keratin Bakımı", slug: { current: "#" }, gender: "women", shortDescription: "Düzleştirici bakım ve derin nemlendirme." },
];

export function ServicesSection({ services, sectionTitle }: Props) {
  const [activeGender, setActiveGender] = useState<Gender>("women");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const allServices = services?.length ? services : FALLBACK_SERVICES;
  const filtered = allServices.filter(
    (s) => s.gender === activeGender || s.gender === "unisex"
  );

  const activeImage =
    hoveredId
      ? allServices.find((s) => s._id === hoveredId)?.mainImage
      : filtered[0]?.mainImage;

  return (
    <section id="hizmetler" className="bg-background">
      <div className="grid lg:grid-cols-[55%_45%] min-h-[70vh]">

        {/* Top/Left: Sticky Image Panel */}
        <div className="relative h-64 sm:h-[40vh] lg:h-auto overflow-hidden bg-muted">
          {filtered.map((service, i) => {
            if (!service.mainImage) return null;
            
            const isHoveredOrActive = hoveredId 
              ? service._id === hoveredId 
              : i === 0; // Default to first image if nothing is hovered

            return (
              <div
                key={service._id}
                className={cn(
                  "absolute inset-0 transition-all duration-500 ease-out will-change-transform",
                  isHoveredOrActive ? "opacity-100 scale-100 z-10" : "opacity-0 scale-105 z-0 pointer-events-none"
                )}
              >
                <SanityImage
                  image={service.mainImage}
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover"
                  priority={i === 0} // Only prioritize the initially visible one
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10" />
              </div>
            );
          })}

          {/* Fallback if no images exist at all */}
          {filtered.every(s => !s.mainImage) && (
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center z-10">
              <span className="font-serif text-6xl text-primary/10">Sky</span>
            </div>
          )}
        </div>

        {/* Right: List Panel */}
        <div className="flex flex-col justify-center px-8 md:px-14 py-16 lg:py-24">
          <FadeIn direction="up">
            <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground mb-10 leading-tight">
              {sectionTitle ?? "Size özel\nbakım deneyimi"}
            </h2>
          </FadeIn>

          {/* Gender Toggle */}
          <FadeIn direction="up" delay={0.1}>
            <div className="flex gap-0 mb-10 border border-border w-fit">
              {(["women", "men"] as Gender[]).map((g) => (
                <button
                  key={g}
                  onClick={() => { setActiveGender(g); setHoveredId(null); }}
                  className={cn(
                    "px-6 py-2.5 text-[10px] font-sans tracking-[0.3em] uppercase transition-all duration-300 cursor-pointer",
                    activeGender === g
                      ? "bg-primary text-primary-foreground"
                      : "bg-transparent text-muted-foreground hover:text-foreground"
                  )}
                >
                  {g === "women" ? "Kadın" : "Erkek"}
                </button>
              ))}
            </div>
          </FadeIn>

          {/* Service List */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeGender}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="divide-y divide-border/60"
            >
              {filtered.map((service, i) => (
                <motion.div
                  key={service._id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onMouseEnter={() => setHoveredId(service._id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => setHoveredId(service._id)}
                  className="group py-4 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif text-xl font-light text-foreground group-hover:text-primary transition-colors duration-300">
                        {service.title}
                      </h3>
                      {service.shortDescription && (
                        <p className="text-sm text-muted-foreground font-sans mt-0.5 leading-relaxed">
                          {service.shortDescription}
                        </p>
                      )}
                    </div>
                    <RiArrowRightLine
                      size={16}
                      className="text-muted-foreground group-hover:text-secondary group-hover:translate-x-1 transition-all duration-300 shrink-0 ml-4"
                    />
                  </div>
                </motion.div>
              ))}

              {filtered.length === 0 && (
                <p className="text-sm text-muted-foreground font-sans py-6">
                  Bu kategoride henüz hizmet eklenmemiş.
                </p>
              )}
            </motion.div>
          </AnimatePresence>

          {/* CTA */}
          <FadeIn direction="up" delay={0.3}>
            <Link
              href="/hizmetler"
              className="inline-flex items-center gap-2 mt-10 text-[10px] font-sans tracking-[0.3em] uppercase text-primary border-b border-primary pb-0.5 hover:gap-3 transition-all duration-300 group"
            >
              Tüm Hizmetler
              <RiArrowRightLine size={12} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
