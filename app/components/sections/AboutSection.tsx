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
  console.log(data);

  const { sectionTag, title, description, images, statistics } = data;

  const parts = title.fullText.split(new RegExp(`(${title.highlight})`, "gi"));

  return (
    // SEKCJA GŁÓWNA
    <section className="relative w-full bg-brand-red text-white landing-spacing pt-24 pb-32">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 max-lg:gap-12 gap-24 max-[812px]:flex max-[812px]:flex-col-reverse">
          {/* --- LEWA STRONA: ZDJĘCIA --- */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative h-[450px] max-[812px]:h-[590px] w-full lg:block"
          >
            {/* --- ZDJĘCIE DUŻE --- */}
            <div className="absolute top-0 left-0 w-[85%] h-[85%] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)] z-10 rounded-[29px] bg-gold max-[812px]:top-12 max-[490px]:left-1/2 max-[490px]:-translate-x-1/2 max-[490px]:w-full">
              {images.mainImage && (
                <Image
                  src={images.mainImage}
                  alt="Krajobraz Chin"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700 border-14 border-gold rounded-[29px]"
                />
              )}
            </div>

            {/* --- ZDJĘCIE MNIEJSZE --- */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="absolute bottom-8 right-0 w-[50%] h-[40%] bg-gold p-2 border-gold border-[5px] rounded-[29px] shadow-[0_20px_50px_rgba(0,0,0,0.3)] z-20 max-[812px]:-bottom-12 max-[490px]:right-auto max-[490px]:left-1/2 max-[490px]:-translate-x-1/2 max-[490px]:w-[80%]"
            >
              <div className="relative w-full h-full overflow-hidden rounded-[29px]">
                {images.secondaryImage && (
                  <Image
                    src={images.secondaryImage}
                    alt="Detale kultury"
                    fill
                    className="object-cover"
                  />
                )}
              </div>
            </motion.div>

            <div className="absolute bottom-0 left-8 w-[85%] h-[85%] border-2 border-[#efd075] -z-10 translate-x-4 translate-y-4 opacity-60 rounded-[29px] max-[490px]:-bottom-24 max-[490px]:left-1/2 max-[490px]:-translate-x-1/2" />
          </motion.div>

          {/* --- PRAWA STRONA: TEKST --- */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            <div>
              <h3 className="text-[#efd075] font-bold tracking-[2px] uppercase text-xs max-[812px]:text-sm mb-3 font-montserrat flex items-center gap-2 max-[812px]:justify-center">
                <span className="w-8 h-[2px] bg-[#efd075] inline-block"></span>
                {sectionTag}
                <span className="w-8 h-[2px] bg-[#efd075] inline-block !hidden max-[812px]:!inline-block"></span>
              </h3>

              <h2 className="text-3xl max-[812px]:text-4xl lg:text-5xl font-montserrat font-black text-white leading-tight max-[812px]:text-center">
                {parts.map((part, i) => {
                  const isHighlight =
                    part.toLowerCase() === title.highlight?.toLowerCase();
                  return isHighlight ? (
                    <span key={i} className="relative inline-block mt-1">
                      <span className="relative z-10">{part}</span>
                      <span className="absolute bottom-2 left-0 w-full h-3 bg-[#efd075]/80 -z-0 rounded-[29px] max-[812px]:-bottom-[0px] max-[352px]:w-[55%] max-[352px]:left-1/2 max-[352px]:-translate-x-1/2 max-[1024px]:bottom-[-2px]"></span>
                    </span>
                  ) : (
                    <span key={i}>{part}</span>
                  );
                })}
              </h2>
            </div>

            <div className="space-y-4 text-white/80 font-montserrat leading-relaxed text-sm max-[812px]:text-base max-[812px]:text-center max-[812px]:my-2">
              {description &&
                description.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
            </div>

            {/* STATYSTYKI */}
            <div className="grid grid-cols-3 gap-4 max-[812px]:gap-8 py-8 pb-0 border-y border-white/20 mt-2 max-[812px]:flex max-[812px]:justify-around max-[812px]:items-center max-[812px]:flex-wrap">
              {statistics &&
                statistics.map((stat, index) => {
                  const IconComponent = ICON_MAP[stat.iconType] || Globe;

                  return (
                    <div
                      key={index}
                      className="flex flex-col gap-1 max-[812px]:text-center max-[812px]:items-center"
                    >
                      <IconComponent
                        size={24}
                        className="text-[#efd075] mb-2"
                      />
                      <span className="text-2xl max-[812px]:text-3xl font-black text-white font-montserrat">
                        {stat.value}
                      </span>
                      <span className="text-[10px] max-[812px]:text-xs font-bold text-white/60 uppercase tracking-wider max-w-[140px] montserrat max-[812px]:text-center max-[812px]:w-full">
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
