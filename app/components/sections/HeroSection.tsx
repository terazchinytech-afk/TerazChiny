/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Image from "next/image";
import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { Droga } from "../Droga";
import { ArrowRight, ChevronUp, Info, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SliderProgress } from "../SliderProgress";
import { NavBar } from "../NavBar";

// --- 1. KONFIGURACJA WIZUALNA + DANE STARTOWE (ZACHOWANA CO DO PIXELA) ---
const STATIC_LAYOUT = [
  {
    id: 0,
    subtitle: "Mur Chiński",
    desc: "Jeden z siedmiu nowych cudów świata. Symbol potęgi i wytrwałości, wijący się przez tysiące kilometrów górskich szczytów.",
    img: "/mur-chinski.png",
    outlineImage: "/murChińskiOutline.png",
    position:
      "left-[100px] top-[35px] min-[2050px]:left-[120px] max-[650px]:!h-[150px] max-[650px]:!w-[auto] max-[650px]:top-[90px] max-[650px]:left-[40px] max-[450px]:!h-[130px] max-[450px]:!w-[auto] max-[450px]:top-[90px] max-[450px]:left-[40px] max-[420px]:!h-[110px] max-[420px]:!w-[auto] max-[420px]:top-[120px] max-[420px]:left-[-50px]",
    imageSizes: { height: 250, width: 250 },
  },
  {
    id: 1,
    subtitle: "Zakazane Miasto",
    desc: "Największy kompleks pałacowy świata. Przez 500 lat dom cesarzy, niedostępny dla zwykłych śmiertelników, pełen tajemnic.",
    img: "/zakazane-miasto.png",
    outlineImage: "/zakazaneMiastoOutline.png",
    position:
      "left-[100px] top-[-135px] max-[720px]:!h-[230px] max-[720px]:!w-[auto] max-[720px]:top-[-180px] max-[720px]:left-[40px] max-[540px]:!h-[230px] max-[540px]:!w-[auto] max-[540px]:top-[10px] max-[540px]:left-[-170px]",
    imageSizes: { height: 350, width: 350 },
  },
  {
    id: 2,
    subtitle: "Armia Terakotowa",
    desc: "Tysiące naturalnej wielkości figur żołnierzy, koni i rydwanów, które miały strzec Pierwszego Cesarza w życiu pozagrobowym.",
    img: "/armia-terakotowa.png",
    outlineImage: "/armiaOutline.png",
    position:
      "left-[120px] top-[95px] rounded-2xl max-[650px]:top-[95px] max-[650px]:left-[10px] max-[420px]:top-[125px] max-[420px]:left-[-150px]",
    imageSizes: { height: 200, width: 205 },
  },
  {
    id: 3,
    subtitle: "Pałac Letni",
    desc: "Arcydzieło chińskiego projektowania ogrodów. Miejsce, gdzie cesarze uciekali przed upałem Pekinu, by odpocząć nad jeziorem Kunming.",
    img: "/palac-letni.png",
    outlineImage: "/palacLetniOutline.png",
    position:
      "left-[130px] top-[-115px] max-[770px]:top-[125px] max-[770px]:left-[0px] max-[420px]:top-[125px] max-[420px]:left-[-100px] max-[420px]:!h-[110px] max-[420px]:w-auto",
    imageSizes: { height: 250, width: 250 },
  },
  {
    id: 4,
    subtitle: "Góry Zhangjiajie",
    desc: "Mistyczne filary z piaskowca tonące w chmurach. To właśnie ten krajobraz był inspiracją do stworzenia lewitujących gór w filmie Avatar.",
    img: "/zhangjiajie.png",
    outlineImage: "/góryZahangjiajieOutline.png",
    position:
      "left-[150px] top-[-120px] max-[1140px]:h-[130px] max-[1140px]:w-auto max-[1140px]:top-[100px] max-[1140px]:left-[-30px] max-[900px]:left-[-100px] max-[420px]:left-[-200px]",
    imageSizes: { height: 350, width: 250 },
  },
];

// --- KONFIGURACJA POZYCJI DROGI (NIETKNIĘTA) ---
const ROAD_CONFIG = [
  {
    maxWidth: 420,
    positions: [
      { x: 0, y: 160 },
      { x: -220, y: 370 },
      { x: -610, y: -4 },
      { x: -825, y: 195 },
      { x: -1100, y: 102 },
    ],
  },
  {
    maxWidth: 640,
    positions: [
      { x: 0, y: 160 },
      { x: -220, y: 360 },
      { x: -610, y: -20 },
      { x: -825, y: 185 },
      { x: -1090, y: 90 },
    ],
  },
  {
    maxWidth: 900,
    positions: [
      { x: 0, y: 160 },
      { x: -220, y: 360 },
      { x: -610, y: -20 },
      { x: -825, y: 185 },
      { x: -1090, y: 90 },
    ],
  },
  {
    maxWidth: 1300,
    positions: [
      { x: -100, y: 295 },
      { x: -430, y: 509 },
      { x: -750, y: 129 },
      { x: -925, y: 335 },
      { x: -1110, y: 310 },
    ],
  },
  {
    maxWidth: 1700,
    positions: [
      { x: -105, y: 295 },
      { x: -430, y: 509 },
      { x: -750, y: 129 },
      { x: -925, y: 335 },
      { x: -1110, y: 312 },
    ],
  },
  {
    maxWidth: 1920,
    positions: [
      { x: -119, y: 295 },
      { x: -430, y: 509 },
      { x: -750, y: 129 },
      { x: -925, y: 335 },
      { x: -1110, y: 312 },
    ],
  },
  {
    maxWidth: 2560,
    positions: [
      { x: -150, y: 295 },
      { x: -430, y: 509 },
      { x: -750, y: 129 },
      { x: -925, y: 335 },
      { x: -1110, y: 322 },
    ],
  },
  {
    maxWidth: Infinity,
    positions: [
      { x: -109, y: 295 },
      { x: -201, y: 395 },
      { x: -750, y: 125 },
      { x: -725, y: 195 },
      { x: -1100, y: 379 },
    ],
  },
];

const ANIMATION_CONFIG = [
  { arrowDelay: 1.7 },
  { arrowDelay: 1.2 },
  { arrowDelay: 1.2 },
  { arrowDelay: 1.4 },
  { arrowDelay: 1.5 },
];

interface SanitySlide {
  title: string;
  description: string;
  img: string;
  outlineImage?: string;
}

interface HeroSectionProps {
  data: {
    mainTitle: string;
    mainDescription: string;
    ctaLabel: string;
    slides: SanitySlide[];
    ctaLink?: string;
  };
}

export const HeroSection = ({ data }: HeroSectionProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showInfoOverlay, setShowInfoOverlay] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  // --- MERGE DANYCH (ZACHOWANA LOGIKA) ---
  const currentSlide = useMemo(() => {
    const staticSlide = STATIC_LAYOUT[currentIndex];
    const sanitySlide = data?.slides?.[currentIndex];
    return {
      ...staticSlide,
      subtitle: sanitySlide?.title || staticSlide.subtitle,
      desc: sanitySlide?.description || staticSlide.desc,
      img: sanitySlide?.img || staticSlide.img,
      outlineImage: sanitySlide?.outlineImage || staticSlide.outlineImage,
    };
  }, [currentIndex, data]);

  const mainTitle = data?.mainTitle || "CHINY";
  const mainDescription = data?.mainDescription || "Odkryj Państwo Środka...";
  const ctaLabel = data?.ctaLabel || "Sprawdź terminy";
  const ctaLink = data?.ctaLink || "/";

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const activePositions = useMemo(() => {
    const matchingConfig = ROAD_CONFIG.find(
      (config) => windowWidth <= config.maxWidth,
    );
    return matchingConfig
      ? matchingConfig.positions
      : ROAD_CONFIG[ROAD_CONFIG.length - 1].positions;
  }, [windowWidth]);

  useEffect(() => {
    setShowInfoOverlay(false);
  }, [currentIndex]);

  const changeSlide = (direction: "next" | "prev") => {
    const totalSlides = STATIC_LAYOUT.length;
    setCurrentIndex((prev) =>
      direction === "next"
        ? (prev + 1) % totalSlides
        : prev === 0
          ? totalSlides - 1
          : prev - 1,
    );
  };

  return (
    <div className="relative h-208.75 overflow-hidden max-[900px]:h-auto max-[900px]:overflow-x-hidden mb-24">
      <div className="z-50 relative">
        <NavBar />
      </div>

      {/* --- WARSTWA TREŚCI (GRID) --- */}
      <div className="container relative z-20 grid h-208.75 grid-cols-[5fr_4fr] pointer-events-none max-[900px]:flex max-[900px]:flex-col max-[900px]:h-auto">
        <div className="flex h-full items-center justify-center pointer-events-auto ml-6 max-[900px]:ml-0 max-[900px]:h-157.5">
          <div className="flex flex-col gap-4 -mt-40 max-[900px]:mt-0 max-[900px]:items-center max-[900px]:text-center">
            <h1 className="montserrat text-[90px] -ml-2 -mb-5 font-black uppercase text-gold leading-tight">
              {mainTitle}
            </h1>
            <p className="montserrat text-[14px] font-light max-w-[60%] leading-relaxed text-white max-[1110px]:max-w-[70%]">
              {mainDescription}
            </p>
            <Link href={ctaLink} className="w-fit block -mt-4">
              <motion.div
                whileTap={{ scale: 0.95 }}
                className="group mt-6 flex items-center justify-center rounded-lg bg-[#efd075] px-10 py-3 font-bold text-[#b32a2e] shadow-lg transition-all duration-300"
              >
                <span className="font-montserrat text-[11px] font-bold uppercase tracking-widest transition-transform duration-300 group-hover:-translate-x-2">
                  {ctaLabel}
                </span>
                <div className="flex w-0 opacity-0 -translate-x-4 transition-all duration-300 ease-out group-hover:w-5 group-hover:translate-x-2 group-hover:opacity-100">
                  <ArrowRight size={16} className="shrink-0" />
                </div>
              </motion.div>
            </Link>
          </div>
        </div>

        <div className="relative pointer-events-auto max-[900px]:h-160">
          <div className="absolute top-40 flex flex-col -left-20 max-[900px]:left-1/2 max-[900px]:top-75 max-[900px]:-translate-x-1/2 max-[900px]:-translate-y-1/2">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <h2 className="montserrat mb-2 min-h-8 text-2xl font-extrabold tracking-wide text-white">
                  <span className="text-gold">
                    {currentSlide.subtitle.split(" ")[0]}
                  </span>{" "}
                  {currentSlide.subtitle.split(" ").slice(1).join(" ")}
                </h2>

                <div className="flex flex-row items-start gap-3 max-[820px]:w-[400px] max-[420px]:w-fit">
                  <div className="relative h-[350px] w-[235px] min-w-58.75 shrink-0 overflow-hidden rounded-[19px] bg-black/20 shadow-2xl">
                    <Image
                      src={currentSlide.img}
                      fill
                      className="object-cover"
                      alt={currentSlide.subtitle}
                      sizes="235px"
                      priority={currentIndex === 0}
                    />
                    {!showInfoOverlay && (
                      <button
                        onClick={() => setShowInfoOverlay(true)}
                        className="absolute right-3 top-3 z-10 hidden rounded-full bg-black/30 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/60 max-[420px]:block"
                      >
                        <Info size={20} />
                      </button>
                    )}
                    <AnimatePresence>
                      {showInfoOverlay && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/85 p-6 text-center backdrop-blur-[2px]"
                        >
                          <button
                            onClick={() => setShowInfoOverlay(false)}
                            className="absolute right-3 top-3 text-white/60"
                          >
                            <X size={22} />
                          </button>
                          <h3 className="mb-3 text-sm font-bold uppercase tracking-widest text-gold">
                            {currentSlide.subtitle}
                          </h3>
                          <p className="montserrat text-[13px] font-light leading-6 text-white">
                            {currentSlide.desc}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <p className="montserrat max-w-40 pt-2 text-[14px] font-light leading-relaxed text-white max-[820px]:max-w-full max-[420px]:hidden">
                    {currentSlide.desc}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={`arrow-${currentIndex}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: ANIMATION_CONFIG[currentIndex]?.arrowDelay || 1.2,
                  duration: 0.5,
                }}
                className={`relative bottom-[40px] -right-[190px] ${currentIndex === 3 && "max-[420px]:-right-[200px]"}`}
              >
                <Image
                  src="/heroArrow.svg"
                  width={153}
                  height={70}
                  alt="arrow"
                  className="max-[420px]:hidden"
                />
                {currentSlide.outlineImage && currentSlide.imageSizes && (
                  <Image
                    src={currentSlide.outlineImage}
                    height={currentSlide.imageSizes.height}
                    width={currentSlide.imageSizes.width}
                    className={`absolute ${currentSlide.position}`}
                    alt="Decorative"
                  />
                )}
                <Image
                  src="/heroArrowSM.svg"
                  width={60}
                  height={70}
                  alt="arrow mobile"
                  className="hidden max-[420px]:block"
                />
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay:
                      (ANIMATION_CONFIG[currentIndex]?.arrowDelay || 1.2) + 0.5,
                    duration: 0.4,
                    type: "spring",
                    stiffness: 200,
                  }}
                  className="bg-gold absolute bottom-[60px] right-[400px] h-[10px] w-[10px] rounded-full max-[420px]:bottom-[75px] max-[420px]:right-[230px]"
                />
              </motion.div>
            </AnimatePresence>

            <div className="relative z-20 -mt-12 ml-7 flex flex-col items-center justify-center w-fit gap-2 max-[420px]:bottom-[20px] max-[420px]:-left-[25px]">
              <button
                onClick={() => changeSlide("next")}
                className="rotate-90 rounded-full bg-white/20 p-2 backdrop-blur-sm transition hover:bg-white/40 cursor-pointer"
              >
                <ChevronUp size={22} color="#FAF7F2" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- WARSTWA TŁA (OPTYMALIZACJA LCP - LAYOUT NIETKNIĘTY) --- */}
      <div className="absolute top-0 -z-10 grid h-208.75 w-screen grid-cols-[5fr_4fr] overflow-hidden max-[900px]:flex max-[900px]:flex-col max-[900px]:h-auto">
        <div className="relative z-20 h-full w-full bg-brand-red max-[900px]:h-157.5">
          <Image
            src="/heroBackground.png"
            fill
            className="scale-[1.01] rounded-br-[69px] object-cover"
            alt="Background"
            priority
            fetchPriority="high"
          />
        </div>

        <div className="relative h-full w-full overflow-hidden max-[900px]:h-[900px]">
          <Image
            src="/chmura.svg"
            width={300}
            height={150}
            className="absolute top-20 -left-20 pointer-events-none z-10"
            alt=""
          />
          <Image
            src="/symbol.svg"
            width={300}
            height={150}
            className="absolute -top-20 -right-20 pointer-events-none z-10 max-[1110px]:w-[250px]"
            alt=""
          />
          <Image
            src="/symbol.svg"
            width={300}
            height={150}
            className="absolute -bottom-20 -right-44 pointer-events-none z-10 max-[1220px]:hidden"
            alt=""
          />
          <div className="absolute bottom-0 left-0 z-10 h-64 w-full bg-gradient-to-b from-transparent via-transparent to-brand-red pointer-events-none max-[900px]:bottom-[160px]" />
          <div className="absolute bottom-0 left-65 h-full w-150 -translate-x-1/2 max-[900px]:left-1/2">
            <motion.div
              animate={activePositions[currentIndex]}
              transition={{ type: "spring", stiffness: 45, damping: 20 }}
              className="absolute -bottom-6 left-0 w-max"
            >
              <Droga className="w-max" />
            </motion.div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 flex w-screen -translate-x-1/2 items-center justify-center max-[900px]:hidden">
        <SliderProgress total={STATIC_LAYOUT.length} current={currentIndex} />
      </div>
    </div>
  );
};
