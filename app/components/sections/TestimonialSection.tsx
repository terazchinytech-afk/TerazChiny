/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useState, useEffect, useMemo, memo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight, Compass } from "lucide-react";

// --- HELPERY OPTYMALIZACYJNE ---
const getOptimizedImageUrl = (url: string, width = 600) => {
  if (!url || url.startsWith("/")) return url;
  try {
    const optimized = new URL(url);
    optimized.searchParams.set("w", width.toString());
    optimized.searchParams.set("q", "75");
    optimized.searchParams.set("auto", "format");
    return optimized.href;
  } catch (e) {
    return url;
  }
};

// Memoizowane tło, aby nie obciążać procesora przy zmianie slajdów
const FloatingParticles = memo(() => {
  const particles = useMemo(() => {
    return [...Array(6)].map((_, i) => ({
      id: i,
      size: Math.random() * 15 + 5,
      left: Math.random() * 100,
      top: Math.random() * 100,
      randomX: Math.random() * 30 - 15,
      duration: Math.random() * 10 + 15,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-gold/10 blur-md"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            top: `${p.top}%`,
            willChange: "transform, opacity",
          }}
          animate={{
            y: [0, -80, 0],
            x: [0, p.randomX, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
});

FloatingParticles.displayName = "FloatingParticles";

export const TestimonialsSection = ({ data }: any) => {
  const { header, selectedReviews } = data || {};

  const reviews = useMemo(
    () =>
      (selectedReviews || []).map((review: any, index: any) => ({
        id: index,
        name: review.author,
        trip: review.trip?.title || "Wyprawa do Chin",
        rating: review.rating || 5,
        text: review.content,
        image: getOptimizedImageUrl(
          review.reviewImage || review.trip?.mainImage || "/heroBackground.png",
          600,
        ),
      })),
    [selectedReviews],
  );

  const [activeIndex, setActiveIndex] = useState(() =>
    reviews.length > 0 ? Math.floor(reviews.length / 2) : 0,
  );
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const handleNext = () =>
    reviews.length && setActiveIndex((prev) => (prev + 1) % reviews.length);
  const handlePrev = () =>
    reviews.length &&
    setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);

  useEffect(() => {
    if (!isAutoPlaying || reviews.length <= 1) return;
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, reviews.length]);

  const getCircularPosition = (index: number) => {
    const len = reviews.length;
    let diff = index - activeIndex;
    if (diff > len / 2) diff -= len;
    if (diff < -len / 2) diff += len;
    return diff;
  };

  if (!data || !reviews.length) return null;

  const titleParts = (header?.fullText || "").split(
    new RegExp(`(${header?.highlight || ""})`, "gi"),
  );

  return (
    <section
      className="w-full max-[767px]:py-16 bg-brand-red text-white relative z-10 overflow-hidden py-32 pb-6"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-[0.02] mix-blend-overlay -z-20 pointer-events-none" />
      <FloatingParticles />

      <div className="container mx-auto px-4 max-w-6xl relative">
        {/* Dekoracyjna kompas - optymalizacja animacji */}
        <div className="absolute right-[-2%] top-1/2 -translate-y-1/2 opacity-[0.10] pointer-events-none -z-50 max-[1023px]:hidden">
          <Compass
            size={400}
            strokeWidth={0.5}
            color="#efd075"
            className="animate-[spin_120s_linear_infinite] will-change-transform"
          />
        </div>

        <div className="text-center mb-16 max-[1023px]:mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl pb-6 lg:text-5xl font-montserrat font-black text-white leading-tight"
          >
            {titleParts.map((part: any, i: any) =>
              part.toLowerCase() === header?.highlight?.toLowerCase() ? (
                <span key={i} className="text-gold block max-[1023px]:inline">
                  {part}
                </span>
              ) : (
                <span key={i}>{part}</span>
              ),
            )}
          </motion.h2>
          <p className="text-white/50 max-w-sm font-light text-base leading-relaxed hidden lg:block mx-auto">
            {header?.description}
          </p>
        </div>

        {/* Karuzela 3D */}
        <div
          className="relative h-[480px] flex items-center justify-center -mt-6 max-[1023px]:mt-0"
          style={{ perspective: "2000px" }}
        >
          <div
            className="relative w-full h-full flex items-center justify-center"
            style={{ transformStyle: "preserve-3d" }}
          >
            {reviews.map((review: any, index: any) => {
              const position = getCircularPosition(index);
              const absPosition = Math.abs(position);
              if (absPosition > 2) return null;

              return (
                <motion.div
                  key={review.id}
                  animate={{
                    x: position * 320,
                    rotateY: position * -30,
                    z: position === 0 ? 0 : -250,
                    scale: position === 0 ? 1 : 0.8,
                    opacity: 1 - absPosition * 0.4,
                    filter: position === 0 ? "none" : "blur(2px)",
                  }}
                  transition={{ type: "spring", stiffness: 150, damping: 25 }}
                  className="absolute w-full max-w-[310px] cursor-pointer will-change-transform"
                  style={{
                    zIndex: 10 - Math.round(absPosition),
                    transformStyle: "preserve-3d",
                  }}
                  onClick={() => setActiveIndex(index)}
                >
                  <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col h-full group">
                    <div className="relative h-44 shrink-0 overflow-hidden">
                      <Image
                        src={review.image}
                        alt={review.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="310px"
                      />
                      <div className="absolute inset-0 bg-black/30" />
                      <Quote
                        className="absolute top-4 left-6 text-gold/40"
                        size={24}
                      />
                    </div>

                    <div className="p-7 flex flex-col items-center text-center bg-white flex-grow">
                      <div className="flex gap-0.5 mb-4">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className="text-gold fill-gold"
                          />
                        ))}
                      </div>
                      <p className="text-gray-600 font-serif italic leading-relaxed text-[13px] mb-6 line-clamp-4">
                        &quot;{review.text}&quot;
                      </p>
                      <div className="mt-auto pt-4 border-t border-gray-50 w-full">
                        <div className="font-black text-black font-montserrat uppercase tracking-widest text-[10px]">
                          {review.name}
                        </div>
                        <div className="text-[9px] text-brand-red font-bold mt-1 uppercase tracking-widest">
                          {review.trip}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Nawigacja */}
        <div className="flex flex-col items-center gap-8 mt-6 relative z-30">
          <div className="flex items-center gap-10">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full border border-white/10 hover:bg-white/5 transition-all cursor-pointer"
            >
              <ChevronLeft size={24} className="text-white hover:text-gold" />
            </button>
            <div className="flex gap-3">
              {reviews.map((_: any, i: any) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`h-1.5 transition-all duration-500 rounded-full ${i === activeIndex ? "w-10 bg-gold" : "w-2 bg-white/20"}`}
                />
              ))}
            </div>
            <button
              onClick={handleNext}
              className="p-3 rounded-full border border-white/10 hover:bg-white/5 transition-all cursor-pointer"
            >
              <ChevronRight size={24} className="text-white hover:text-gold" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
