"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SanityImage } from "@/components/ui/SanityImage";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { urlForImage } from "@/sanity/lib/image";
import { RiScissors2Line } from "react-icons/ri";

export function prefetchLightboxImage(image: any) {
  if (typeof window === "undefined" || !image?.asset) return;
  try {
    const url = urlForImage(image)
      ?.auto("format")
      .width(1920)
      .fit("max")
      .quality(90)
      .url();
    if (!url) return;
    if (document.querySelector(`link[href="${url}"]`)) return;
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.as = "image";
    link.href = url;
    document.head.appendChild(link);
  } catch {
    // ignore
  }
}

export interface LightboxItem {
  image: any;
  title?: string;
  relatedService?: {
    title: string;
  };
}

export interface LightboxModalProps {
  items: LightboxItem[];
  startIndex: number | null;
  onClose: () => void;
}

export function LightboxModal({ items, startIndex, onClose }: LightboxModalProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(startIndex);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    setSelectedImage(startIndex);
  }, [startIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") paginate(-1);
      if (e.key === "ArrowRight") paginate(1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, items.length]);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setSelectedImage((prev) => {
      if (prev === null) return 0;
      if (newDirection === 1) return prev < items.length - 1 ? prev + 1 : 0;
      return prev > 0 ? prev - 1 : items.length - 1;
    });
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
  };

  if (!items || items.length === 0) return null;

  return (
    <AnimatePresence initial={false} custom={direction}>
      {selectedImage !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/98 px-4 md:px-12 backdrop-blur-md touch-none"
          onClick={onClose}
        >
          {/* Top Bar */}
          <div className="absolute top-0 left-0 right-0 p-6 md:p-10 flex justify-between items-center z-10">
            <div className="text-white font-sans text-sm tracking-[0.2em] uppercase opacity-70">
              {selectedImage + 1}{" "}
              <span className="mx-2 text-white/30">/</span> {items.length}
            </div>
            <button
              className="w-12 h-12 flex items-center justify-center text-white/50 hover:text-white transition-colors cursor-pointer group"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
            >
              <X
                size={36}
                className="transform group-hover:rotate-90 transition-transform duration-300"
              />
            </button>
          </div>

          {/* Navigation Arrows */}
          {items.length > 1 && (
            <>
              <button
                className="hidden md:flex absolute left-4 md:left-10 top-1/2 -translate-y-1/2 w-16 h-16 items-center justify-center text-white/40 hover:text-white transition-all cursor-pointer z-20 group"
                onClick={(e) => {
                  e.stopPropagation();
                  paginate(-1);
                }}
              >
                <ChevronLeft
                  size={56}
                  className="transform group-hover:-translate-x-2 transition-transform"
                />
              </button>
              <button
                className="hidden md:flex absolute right-4 md:right-10 top-1/2 -translate-y-1/2 w-16 h-16 items-center justify-center text-white/40 hover:text-white transition-all cursor-pointer z-20 group"
                onClick={(e) => {
                  e.stopPropagation();
                  paginate(1);
                }}
              >
                <ChevronRight
                  size={56}
                  className="transform group-hover:translate-x-2 transition-transform"
                />
              </button>
            </>
          )}

          {/* Main Image Container */}
          <div className="relative w-full h-[70vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
            <motion.div
              key={selectedImage}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                if (offset.x > 100 || (offset.x > 20 && velocity.x > 500)) {
                  paginate(-1);
                } else if (
                  offset.x < -100 ||
                  (offset.x < -20 && velocity.x < -500)
                ) {
                  paginate(1);
                }
              }}
              className="absolute w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
              onClick={(e) => e.stopPropagation()}
            >
              <SanityImage
                image={items[selectedImage].image}
                fill
                fit="max"
                quality={95}
                sizes="(max-width: 1920px) 100vw, 1920px"
                className="pointer-events-none select-none"
                objectFit="contain"
              />
            </motion.div>
          </div>

          {/* Bottom Info */}
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-center pointer-events-none">
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-2xl mx-auto space-y-4"
            >
              {items[selectedImage].title && (
                <h3 className="font-serif text-2xl md:text-3xl text-white font-light">
                  {items[selectedImage].title}
                </h3>
              )}
              {items[selectedImage].relatedService && (
                <div className="flex items-center justify-center gap-2 text-secondary">
                  <RiScissors2Line size={16} />
                  <span className="font-sans text-xs tracking-[0.3em] uppercase">
                    {items[selectedImage].relatedService?.title}
                  </span>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
