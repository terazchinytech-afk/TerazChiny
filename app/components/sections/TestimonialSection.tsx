/* eslint-disable react-hooks/purity */
"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight, Compass } from "lucide-react";

interface SanityReview {
  author: string;
  rating: number;
  content: string;
  reviewImage?: string; // Nowe pole na dedykowane zdjęcie uczestnika
  trip?: {
    title: string;
    mainImage: string;
  };
}

interface TestimonialsSectionProps {
  data: {
    header: {
      fullText: string;
      highlight: string;
      description: string;
    };
    selectedReviews: SanityReview[];
  };
}

const FloatingParticles = () => {
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
};

export const TestimonialsSection = ({ data }: TestimonialsSectionProps) => {
  const { header, selectedReviews } = data || {};

  // --- POPRAWIONE MAPOWANIE Z LOGIKĄ WYBORU ZDJĘCIA ---
  const reviews = (selectedReviews || []).map((review, index) => {
    // Logika wyboru: 1. Zdjęcie z recenzji, 2. Zdjęcie z wyprawy, 3. Placeholder
    const displayImage =
      review.reviewImage || review.trip?.mainImage || "/heroBackground.png";

    return {
      id: index,
      name: review.author,
      trip: review.trip?.title || "Wyprawa do Chin",
      rating: review.rating || 5,
      text: review.content,
      image: displayImage,
    };
  });

  const [activeIndex, setActiveIndex] = useState(() =>
    reviews.length > 0 ? Math.floor(reviews.length / 2) : 0,
  );
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const handleNext = () => {
    if (reviews.length === 0) return;
    setActiveIndex((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    if (reviews.length === 0) return;
    setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  useEffect(() => {
    if (!isAutoPlaying || reviews.length === 0) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, reviews.length]);

  const getCircularPosition = (index: number) => {
    const len = reviews.length;
    if (len === 0) return 0;
    let diff = index - activeIndex;
    if (diff > len / 2) diff -= len;
    if (diff < -len / 2) diff += len;
    return diff;
  };

  if (!data || reviews.length === 0) return null;

  const fullText = header?.fullText || "";
  const highlight = header?.highlight || "";

  const titleParts = fullText.split(new RegExp(`(${highlight})`, "gi"));

  return (
    <section
      className="w-full max-[767px]:py-16 bg-brand-red text-white relative z-10 overflow-hidden py-32 pb-6"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-[0.02] mix-blend-overlay -z-20" />
      <FloatingParticles />

      <div className="container mx-auto px-4 max-w-6xl relative">
        <div className="absolute right-[-2%] top-1/2 -translate-y-1/2 opacity-[0.10] pointer-events-none -z-50 max-[1023px]:hidden">
          <Compass
            size={400}
            strokeWidth={0.5}
            color="#efd075"
            className="animate-[spin_120s_linear_infinite] stroke-[#efd075]"
          />
        </div>

        <div className="flex flex-row items-center justify-center mb-16 max-[1023px]:flex-col max-[1023px]:items-center max-[1023px]:mb-10">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl pb-6 max-[812px]:text-4xl lg:text-5xl font-montserrat font-black text-white leading-tight max-[812px]:text-center">
                {titleParts.map((part, i) =>
                  part.toLowerCase() === highlight.toLowerCase() ? (
                    <span
                      key={i}
                      className="text-gold block max-[1023px]:inline"
                    >
                      {part}
                    </span>
                  ) : (
                    <span key={i}>{part}</span>
                  ),
                )}
              </h2>

              <p className="text-white/50 max-w-sm font-light text-base leading-relaxed max-[1023px]:hidden mx-auto">
                {header.description}
              </p>
            </motion.div>
          </div>
        </div>

        <div
          className="relative h-[480px] flex items-center justify-center -mt-6 max-[1023px]:mt-0"
          style={{ perspective: "1800px" }}
        >
          <div
            className="relative w-full h-full flex items-center justify-center"
            style={{ transformStyle: "preserve-3d" }}
          >
            {reviews.map((review, index) => {
              const position = getCircularPosition(index);
              const isCenter = position === 0;
              const absPosition = Math.abs(position);

              if (absPosition > 2) return null;

              return (
                <motion.div
                  key={review.id}
                  initial={false}
                  animate={{
                    x: position * 320,
                    rotateY: position * -30,
                    z: isCenter ? 0 : -250,
                    scale: isCenter ? 1 : 0.75,
                    opacity: 1 - absPosition * 0.45,
                    filter: isCenter ? "none" : "blur(3px)",
                    transformPerspective: 1800,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 160,
                    damping: 26,
                    mass: 1,
                  }}
                  className="absolute w-full max-w-[300px] cursor-pointer"
                  style={{
                    zIndex: 10 - absPosition,
                    transformStyle: isCenter ? "flat" : "preserve-3d",
                    pointerEvents: absPosition > 1.2 ? "none" : "auto",
                    WebkitFontSmoothing: "antialiased",
                    backfaceVisibility: "hidden",
                  }}
                  onClick={() => setActiveIndex(index)}
                >
                  <div className="bg-white rounded-[2rem] shadow-[0_30px_60px_rgba(0,0,0,0.4)] overflow-hidden flex flex-col h-full group transition-all duration-500">
                    <div className="relative h-40 shrink-0 overflow-hidden">
                      <Image
                        src={review.image}
                        alt={review.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                      <div className="absolute top-3 left-5">
                        <Quote className="text-gold/30" size={24} />
                      </div>
                    </div>

                    <div
                      className="p-6 flex flex-col items-center text-center bg-white flex-grow"
                      style={{
                        transform: "translateZ(0)",
                      }}
                    >
                      <div className="flex gap-0.5 mb-3">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className="text-gold fill-gold"
                          />
                        ))}
                      </div>
                      <p className="text-gray-600 font-serif italic leading-relaxed text-sm max-[767px]:text-[13px] mb-5">
                        &quot;{review.text}&quot;
                      </p>
                      <div className="mt-auto">
                        <div className="w-8 h-[1px] bg-brand-red/10 mx-auto mb-3" />
                        <div className="font-bold text-black font-montserrat uppercase tracking-wider text-[10px]">
                          {review.name}
                        </div>
                        <div className="text-[8px] text-brand-red font-bold mt-0.5 uppercase tracking-widest">
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

        <div className="flex flex-col items-center gap-6 mt-2 relative z-30">
          <div className="flex items-center gap-8">
            <button
              onClick={handlePrev}
              className="group p-3 rounded-full border border-white/10 hover:border-gold/30 transition-all"
            >
              <ChevronLeft
                size={22}
                className="group-hover:text-gold group-hover:-translate-x-0.5 transition-all"
              />
            </button>

            <div className="flex gap-2.5">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`h-1 transition-all duration-500 rounded-full ${
                    i === activeIndex
                      ? "w-8 bg-gold shadow-[0_0_10px_rgba(239,208,117,0.4)]"
                      : "w-1.5 bg-white/10 hover:bg-white/30"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="group p-3 rounded-full border border-white/10 hover:border-gold/30 transition-all"
            >
              <ChevronRight
                size={22}
                className="group-hover:text-gold group-hover:translate-x-0.5 transition-all"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
