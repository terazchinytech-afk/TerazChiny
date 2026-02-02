"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Map, Users, Globe, LucideIcon } from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  Globe: Globe,
  Map: Map,
  Users: Users,
};

interface AboutSectionProps {
  data: {
    sectionTag: string;
    title: {
      fullText: string;
      highlight: string;
    };
    description: string[];
    images: {
      mainImage: string;
      secondaryImage: string;
    };
    statistics: {
      label: string;
      value: string;
      iconType: string;
    }[];
  };
}

export const AboutSection = ({ data }: AboutSectionProps) => {
  if (!data) return null;

  const { sectionTag, title, description, images, statistics } = data;
  const parts = title.fullText.split(new RegExp(`(${title.highlight})`, "gi"));

  return (
    <section className="relative w-full bg-brand-red text-white landing-spacing pt-24 pb-32 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 max-lg:gap-12 gap-24 max-[812px]:flex max-[812px]:flex-col-reverse items-center">
          {/* --- LEWA STRONA: ZDJĘCIA --- */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative h-[450px] max-[812px]:h-[500px] w-full"
          >
            {/* ZDJĘCIE GŁÓWNE (Zoptymalizowane pod kątem LCP) */}
            <div className="absolute top-0 left-0 w-[85%] h-[85%] overflow-hidden shadow-2xl z-10 rounded-[29px] bg-gold/10">
              {images.mainImage && (
                <Image
                  src={images.mainImage}
                  alt="Krajobraz Chin"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700 border-[12px] border-gold rounded-[29px]"
                  sizes="(max-width: 812px) 100vw, 50vw"
                  priority // Jeśli sekcja jest widoczna zaraz pod Hero
                />
              )}
            </div>

            {/* ZDJĘCIE MNIEJSZE (Zoptymalizowane pod kątem rozmiaru) */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
              className="absolute bottom-8 right-0 w-[50%] h-[40%] bg-gold p-1.5 rounded-[29px] shadow-2xl z-20 max-[812px]:-bottom-6 max-[490px]:left-1/2 max-[490px]:-translate-x-1/2 max-[490px]:w-[70%]"
            >
              <div className="relative w-full h-full overflow-hidden rounded-[24px]">
                {images.secondaryImage && (
                  <Image
                    src={images.secondaryImage}
                    alt="Detale kultury"
                    fill
                    sizes="(max-width: 490px) 70vw, 25vw"
                    className="object-cover"
                    loading="lazy"
                  />
                )}
              </div>
            </motion.div>

            {/* RAMKA DEKORACYJNA (Zoptymalizowana - brak obrazu, czysty CSS) */}
            <div className="absolute bottom-0 left-8 w-[85%] h-[85%] border-2 border-gold/40 -z-10 translate-x-4 translate-y-4 rounded-[29px] max-[490px]:hidden" />
          </motion.div>

          {/* --- PRAWA STRONA: TEKST --- */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            <div className="space-y-4">
              <h3 className="text-gold font-bold tracking-[3px] uppercase text-xs flex items-center gap-3 max-[812px]:justify-center">
                <span className="w-10 h-[1px] bg-gold/50"></span>
                {sectionTag}
                <span className="w-10 h-[1px] bg-gold/50 hidden max-[812px]:block"></span>
              </h3>

              <h2 className="text-3xl max-[812px]:text-4xl lg:text-5xl font-montserrat font-black text-white leading-[1.1] max-[812px]:text-center">
                {parts.map((part, i) => {
                  const isHighlight =
                    part.toLowerCase() === title.highlight?.toLowerCase();
                  return isHighlight ? (
                    <span
                      key={i}
                      className="relative inline-block whitespace-nowrap"
                    >
                      <span className="relative z-10 text-white">{part}</span>
                      <motion.span
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="absolute bottom-1 left-0 h-[30%] bg-gold/80 -z-0 rounded-sm"
                      />
                    </span>
                  ) : (
                    <span key={i}>{part}</span>
                  );
                })}
              </h2>
            </div>

            <div className="space-y-5 text-white/70 font-montserrat leading-relaxed text-sm lg:text-base max-[812px]:text-center">
              {description?.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* STATYSTYKI (Wyrównane) */}
            <div className="grid grid-cols-3 gap-6 py-10 mt-4 border-y border-white/10 max-[812px]:flex max-[812px]:justify-center max-[812px]:flex-wrap">
              {statistics?.map((stat, index) => {
                const IconComponent = ICON_MAP[stat.iconType] || Globe;
                return (
                  <div
                    key={index}
                    className="flex flex-col gap-2 max-[812px]:items-center max-[812px]:min-w-[120px]"
                  >
                    <IconComponent size={24} className="text-gold" />
                    <span className="text-3xl font-black text-white leading-none tracking-tighter italic">
                      {stat.value}
                    </span>
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-[2px] leading-tight">
                      {stat.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
