"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Map,
  Users,
  Globe,
  LucideIcon,
  Coffee,
  UserCheck,
  Star,
} from "lucide-react";
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
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const titleParts = useMemo(
    () => title.fullText.split(new RegExp(`(${title.highlight})`, "gi")),
    [title.fullText, title.highlight],
  );

  // Logika kolorowego tekstu dla sekcji "Lokalni Eksperci" (Blok 2)
  const diffTitleHighlight = "lokalnymi ekspertami";
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const diffTitleParts = useMemo(
    () =>
      differentiation?.title.split(new RegExp(`(${diffTitleHighlight})`, "gi")),
    [differentiation?.title],
  );

  return (
    <section className="relative w-full bg-brand-red text-white landing-spacing pt-24 pb-32 overflow-hidden flex flex-col gap-32">
      {/* --- BLOK 1: STANDARDOWY (ZDJĘCIE PO LEWEJ) --- */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-row max-[1024px]:flex-col gap-24 max-[1024px]:gap-20 items-center">
          {/* --- LEWA STRONA: ZDJĘCIA --- */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            // ZMIANA: Zmniejszony margines do -20px, żeby animacja odpalała się szybciej na mobile
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.8 }}
            // ZMIANA: Usunięto flex-1 na rzecz w-full i konkretnych wysokości
            className="relative w-full h-[500px] max-[1024px]:h-[450px] max-[640px]:h-[300px] shrink-0"
          >
            {/* Główne zdjęcie */}
            <div className="absolute top-0 left-0 w-[88%] h-[88%] overflow-hidden shadow-2xl z-10 rounded-[29px]">
              {images.mainImage && (
                <Image
                  src={images.mainImage}
                  alt="Podróż do Chin"
                  fill
                  className="object-cover border-[12px] max-[1024px]:border-[8px] border-gold rounded-[29px] pointer-cursor hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              )}
            </div>

            {/* Małe zdjęcie (Secondary) */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
              className="absolute bottom-0 right-0 w-[45%] h-[40%] bg-gold p-1 rounded-[29px] shadow-2xl z-20"
            >
              <div className="relative w-full h-full overflow-hidden rounded-[24px]">
                {images.secondaryImage && (
                  <Image
                    src={images.secondaryImage}
                    alt="Kultura Chin"
                    fill
                    sizes="(max-width: 1024px) 40vw, 20vw"
                    className="object-cover pointer-cursor"
                    loading="lazy"
                  />
                )}
              </div>
            </motion.div>

            {/* Ozdobna ramka w tle */}
            <div className="absolute bottom-4 left-8 w-[85%] h-[85%] border-2 border-gold/30 -z-10 translate-x-4 translate-y-4 rounded-[29px] max-[640px]:hidden" />
          </motion.div>

          {/* --- PRAWA STRONA: TEKST ORAZ STATYSTYKI --- */}
          <div className="flex flex-col gap-10 w-full lg:flex-1">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.8 }}
              className="flex flex-col gap-6"
            >
              <div className="space-y-4">
                <h3 className="text-gold font-bold tracking-[3px] uppercase text-xs flex items-center gap-3 justify-start max-[1024px]:justify-center">
                  <span className="w-10 h-[1px] bg-gold/50"></span>
                  {sectionTag}
                </h3>
                <h2 className="text-5xl max-[1024px]:text-4xl max-[640px]:text-3xl font-montserrat font-black text-white leading-[1.1] text-left max-[1024px]:text-center">
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
              <div className="space-y-5 text-white/70 font-montserrat leading-relaxed text-base max-[1024px]:text-sm text-left max-[1024px]:text-center max-w-2xl mx-0 max-[1024px]:mx-auto">
                {description?.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </motion.div>

            {/* Statystyki - używamy Grid dla precyzyjnego podziału */}
            <div className="grid grid-cols-3 gap-6 max-[1024px]:gap-4 py-10 border-y border-white/10">
              {statistics?.map((stat, idx) => {
                const Icon = ICON_MAP[stat.iconType] || Globe;
                return (
                  <div
                    key={idx}
                    className="flex flex-col items-start max-[1024px]:items-center gap-2"
                  >
                    <Icon size={24} className="text-gold" />
                    <span className="text-3xl max-[640px]:text-2xl font-black text-white italic leading-none">
                      {stat.value}
                    </span>
                    <span className="text-[10px] max-[640px]:text-[9px] font-bold text-white/40 uppercase tracking-[2px] text-left max-[1024px]:text-center">
                      {stat.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* --- BLOK 2: NOWY DESIGN (GEOMETRYCZNY / PREMIUM) --- */}
      {differentiation && (
        <div className="container mx-auto px-4 relative z-10 py-20 lg:py-32 mb-20">
          <div className="flex flex-col lg:flex-row-reverse gap-16 lg:gap-24 items-center">
            {/* --- LEWA STRONA: ZDJĘCIE W STYLU "ORGANIC FLOW" --- */}
            <motion.div
              initial={{ opacity: 0, x: 50 }} // Zmienione na 50, bo po prawej na desktopie
              whileInView={{ opacity: 1, x: 0 }}
              // Zmniejszony margines, aby animacja odpalała się na mobile bez problemu
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.8 }}
              className="relative w-full h-[320px] sm:h-[450px] lg:h-[500px] max-w-[600px] shrink-0"
            >
              {/* Dekoracyjne Tło */}
              <div className="absolute -top-6 -left-6 sm:-top-10 sm:-left-10 w-32 h-32 sm:w-40 sm:h-40 bg-gold/70 rounded-3xl -z-10 animate-pulse-slow" />
              <div className="absolute bottom-6 -right-6 sm:bottom-10 -right-10 w-20 h-20 sm:w-24 sm:h-24 bg-gold/70 rounded-3xl -z-10" />

              {/* Główny Kontener Zdjęcia */}
              <div className="relative w-full h-full rounded-tl-[60px] sm:rounded-tl-[100px] rounded-br-[60px] sm:rounded-br-[100px] rounded-tr-[30px] rounded-bl-[30px] overflow-hidden shadow-2xl border-4 border-gold/20 z-10">
                {differentiation.sideImage && (
                  <Image
                    src={differentiation.sideImage}
                    alt="Eksperci w Chinach"
                    fill
                    className="object-cover scale-105 pointer-cursor hover:scale-110 transition-transform duration-[1.5s]"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                )}
              </div>
            </motion.div>

            {/* --- PRAWA STRONA: TREŚĆ --- */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex-1 w-full flex flex-col gap-8 lg:gap-10"
            >
              {/* Nagłówki */}
              <div className="space-y-6 flex flex-col max-[1024px]:items-center max-[1024px]:text-center">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-2 bg-gold rounded-full" />
                  <h3 className="text-gold font-bold tracking-[3px] uppercase text-xs">
                    Prawdziwe Oblicze
                  </h3>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-montserrat font-black text-white leading-tight">
                  {diffTitleParts?.map((part, i) =>
                    part.toLowerCase() === diffTitleHighlight ? (
                      <span key={i} className="text-gold relative inline-block">
                        {part}
                        <svg
                          className="absolute -bottom-2 left-0 w-full"
                          height="10"
                          viewBox="0 0 100 10"
                          preserveAspectRatio="none"
                        >
                          <path
                            d="M0 5 Q 50 10, 100 5"
                            stroke="#FFD700"
                            strokeWidth="2"
                            fill="none"
                            opacity="0.6"
                          />
                        </svg>
                      </span>
                    ) : (
                      <span key={i}>{part} </span>
                    ),
                  )}
                </h2>
                <p className="text-white/80 font-montserrat leading-loose text-sm sm:text-base max-w-2xl">
                  {differentiation.longDescription}
                </p>
              </div>

              {/* Sekcja Flexibility */}
              <div className="mt-4 bg-white/5 backdrop-blur-md border-l-[6px] border-gold rounded-r-[30px] rounded-bl-[30px] p-5 sm:p-6 flex items-start gap-4 sm:gap-5 hover:bg-white/10 transition-colors group">
                <div className="p-3 bg-gold/20 rounded-full shrink-0 group-hover:bg-gold/30 transition-colors">
                  <Coffee
                    className="text-gold w-5 h-5 sm:w-6 sm:h-6"
                    size={24}
                  />
                </div>
                <div>
                  <h4 className="font-bold text-white uppercase text-xs sm:text-sm tracking-wider mb-2">
                    {differentiation.flexibilityTitle}
                  </h4>
                  <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
                    {differentiation.flexibilityDesc}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </section>
  );
};
