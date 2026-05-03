"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SanityImage } from "@/components/ui/SanityImage";
import { cn } from "@/lib/utils";

type Gender = "men" | "women";

interface Service {
  _id: string;
  title: string;
  slug: { current: string };
  gender: "men" | "women" | "unisex";
  shortDescription?: string;
  mainImage?: any;
}

const GENDER_LABELS: Record<Gender, string> = {
  women: "Kadın",
  men: "Erkek",
};

const FALLBACK_SERVICES: Service[] = [
  { _id: "f1", title: "Saç Kesimi", slug: { current: "#" }, gender: "women", shortDescription: "Her saç tipine uygun kesim ve şekillendirme." },
  { _id: "f2", title: "Röfle & Balayage", slug: { current: "#" }, gender: "women", shortDescription: "Işıltılı, doğal görünümlü renk teknikleri." },
  { _id: "f3", title: "Keratin Bakımı", slug: { current: "#" }, gender: "unisex", shortDescription: "Düzleştirici bakım ve derin nemlendirme." },
  { _id: "f4", title: "Saç Kesimi", slug: { current: "#" }, gender: "men", shortDescription: "Kişiye özel tekniklerle modern ya da klasik kesimler." },
  { _id: "f5", title: "Sakal Düzeltme", slug: { current: "#" }, gender: "men", shortDescription: "Yüz şekline göre sakal şekillendirme ve bakım." },
  { _id: "f6", title: "Saç Boyama", slug: { current: "#" }, gender: "men", shortDescription: "Doğal geçişli renk uygulamaları." },
];

export function ServicesGrid({ services }: { services: Service[] }) {
  const [activeGender, setActiveGender] = useState<Gender>("women");

  const allServices = services?.length ? services : FALLBACK_SERVICES;

  // unisex hizmetler aktif sekmenin altına girer
  const filtered = allServices.filter(
    (s) => s.gender === activeGender || s.gender === "unisex"
  );

  return (
    <div>
      {/* Filter Tabs — sadece Kadın / Erkek */}
      <div className="flex gap-2 mb-12">
        {(["women", "men"] as Gender[]).map((g) => (
          <button
            key={g}
            onClick={() => setActiveGender(g)}
            className={cn(
              "px-6 py-2.5 text-[10px] font-sans tracking-[0.3em] uppercase border transition-all duration-300",
              activeGender === g
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-transparent text-muted-foreground border-border hover:border-primary hover:text-foreground"
            )}
          >
            {GENDER_LABELS[g]}
          </button>
        ))}
      </div>

      {/* Grid — kartlar link değil, sadece görsel */}
      <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
        <AnimatePresence mode="popLayout">
          {filtered.map((service) => (
            <motion.div
              key={service._id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="bg-background"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                {service.mainImage ? (
                  <SanityImage
                    image={service.mainImage}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <span className="font-serif text-6xl text-primary/10">✦</span>
                  </div>
                )}
                {/* Category badge */}
                <div className="absolute top-4 left-4">
                  <span className="font-sans text-[9px] tracking-[0.3em] uppercase bg-primary text-primary-foreground px-3 py-1.5">
                    {service.gender === "men" ? "Erkek" : service.gender === "women" ? "Kadın" : "Unisex"}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-7 border-t border-border">
                <h3 className="font-serif text-xl font-light text-foreground mb-3">
                  {service.title}
                </h3>
                {service.shortDescription && (
                  <p className="font-sans text-sm text-muted-foreground leading-relaxed line-clamp-2">
                    {service.shortDescription}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
