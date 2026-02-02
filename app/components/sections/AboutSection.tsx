"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Map, Users, Globe, LucideIcon, Coffee, UserCheck } from "lucide-react";
import { useMemo } from "react";

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
    // NOWE POLA Z SANITY
    differentiation?: {
      title: string;
      longDescription: string;
      flexibilityTitle: string;
      flexibilityDesc: string;
      sideImage: string;
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

  const {
    sectionTag,
    title,
    description,
    images,
    statistics,
    differentiation,
  } = data;

  // Logika kolorowego tekstu dla pierwszego bloku
  const titleParts = useMemo(
    () => title.fullText.split(new RegExp(`(${title.highlight})`, "gi")),
    [title.fullText, title.highlight],
  );

  // Logika kolorowego tekstu dla sekcji "Lokalni Eksperci" (Blok 2)
  // Szukamy frazy "lokalnymi ekspertami" w tytule z Sanity, aby nadać jej kolor gold
  const diffTitleHighlight = "lokalnymi ekspertami";
  const diffTitleParts = useMemo(
    () =>
      differentiation?.title.split(new RegExp(`(${diffTitleHighlight})`, "gi")),
    [differentiation?.title],
  );

  return (
    <section className="relative w-full bg-brand-red text-white landing-spacing pt-24 pb-32 overflow-hidden flex flex-col gap-32">
      {/* --- BLOK 1: STANDARDOWY (ZDJĘCIE PO LEWEJ) --- */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 max-lg:gap-16 gap-24 items-center">
          {/* LEWA STRONA: ZDJĘCIA */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative h-[450px] max-[812px]:h-[500px] w-full"
          >
            <div className="absolute top-0 left-0 w-[85%] h-[85%] overflow-hidden shadow-2xl z-10 rounded-[29px] bg-gold/10">
              {images.mainImage && (
                <Image
                  src={images.mainImage}
                  alt="Podróż do Chin"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700 border-[12px] border-gold rounded-[29px]"
                  sizes="(max-width: 812px) 100vw, 50vw"
                  priority
                />
              )}
            </div>
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
                    alt="Kultura Chin"
                    fill
                    sizes="(max-width: 490px) 70vw, 25vw"
                    className="object-cover"
                    loading="lazy"
                  />
                )}
              </div>
            </motion.div>
            <div className="absolute bottom-0 left-8 w-[85%] h-[85%] border-2 border-gold/40 -z-10 translate-x-4 translate-y-4 rounded-[29px] max-[490px]:hidden" />
          </motion.div>

          {/* PRAWA STRONA: TEKST ORAZ STATYSTYKI */}
          <div className="flex flex-col gap-10">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col gap-6"
            >
              <div className="space-y-4">
                <h3 className="text-gold font-bold tracking-[3px] uppercase text-xs flex items-center gap-3 max-[812px]:justify-center">
                  <span className="w-10 h-[1px] bg-gold/50"></span>
                  {sectionTag}
                </h3>
                <h2 className="text-3xl max-[812px]:text-4xl lg:text-5xl font-montserrat font-black text-white leading-[1.1] max-[812px]:text-center">
                  {titleParts.map((part, i) =>
                    part.toLowerCase() === title.highlight?.toLowerCase() ? (
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
                    ),
                  )}
                </h2>
              </div>
              <div className="space-y-5 text-white/70 font-montserrat leading-relaxed text-sm lg:text-base max-[812px]:text-center">
                {description?.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </motion.div>

            <div className="grid grid-cols-3 gap-6 py-10 border-y border-white/10 max-[812px]:flex max-[812px]:justify-center max-[812px]:flex-wrap">
              {statistics?.map((stat, idx) => {
                const Icon = ICON_MAP[stat.iconType] || Globe;
                return (
                  <div
                    key={idx}
                    className="flex flex-col gap-2 max-[812px]:items-center max-[812px]:min-w-[120px]"
                  >
                    <Icon size={24} className="text-gold" />
                    <span className="text-3xl font-black text-white italic">
                      {stat.value}
                    </span>
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-[2px]">
                      {stat.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* --- BLOK 2: ODWRÓCONY (TEKST PO LEWEJ, ZDJĘCIE PO PRAWEJ) --- */}
      {differentiation && (
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 max-lg:gap-16 gap-24 items-center">
            {/* LEWA STRONA: DANE Z SANITY */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col gap-8 order-2 lg:order-1"
            >
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <UserCheck className="text-gold" size={28} />
                  <h3 className="text-gold font-bold tracking-[3px] uppercase text-xs">
                    Prawdziwe Chiny oczami Chińczyków
                  </h3>
                </div>
                <h2 className="text-3xl lg:text-4xl font-montserrat font-black text-white leading-tight">
                  {diffTitleParts?.map((part, i) =>
                    part.toLowerCase() === diffTitleHighlight ? (
                      <span key={i} className="text-gold italic">
                        {part}
                      </span>
                    ) : (
                      part
                    ),
                  )}
                </h2>
                <p className="text-white/70 font-montserrat leading-relaxed text-base">
                  {differentiation.longDescription}
                </p>

                <div className="flex items-start gap-4 pt-4 border-t border-white/10">
                  <Coffee className="text-gold shrink-0 mt-1" size={24} />
                  <div className="space-y-2">
                    <h4 className="font-bold text-white uppercase text-sm tracking-wider">
                      {differentiation.flexibilityTitle}
                    </h4>
                    <p className="text-white/60 text-sm leading-relaxed">
                      {differentiation.flexibilityDesc}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* PRAWA STRONA: ZDJĘCIE Z SANITY */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[500px] w-full order-1 lg:order-2"
            >
              <div className="absolute top-0 right-0 w-[90%] h-full overflow-hidden shadow-2xl rounded-[40px] border-[1px] border-white/20">
                {differentiation.sideImage && (
                  <Image
                    src={differentiation.sideImage}
                    alt="Lokalni przewodnicy w Chinach"
                    fill
                    className="object-cover opacity-90 hover:scale-105 transition-transform duration-1000"
                    sizes="(max-width: 812px) 100vw, 50vw"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-l from-brand-red/20 to-transparent pointer-events-none" />
              </div>

              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gold rounded-full flex items-center justify-center shadow-xl z-20 border-8 border-brand-red">
                <Globe className="text-brand-red animate-pulse" size={48} />
              </div>

              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-gold/20 rounded-[40px] -z-10" />
            </motion.div>
          </div>
        </div>
      )}
    </section>
  );
};
