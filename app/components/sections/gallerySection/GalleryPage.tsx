"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  X,
  ZoomIn,
  Download,
  Calendar,
  Loader2,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { NavBar } from "../../NavBar";
import { Footer } from "../../Footer";

// --- TYPY DANYCH (Zgodne z Sanity) ---
type GalleryImage = {
  id: string;
  url: string;
  alt?: string;
  date?: string;
  year?: string; // Dodajemy pomocniczo rok do płaskiej struktury
};

type GalleryYear = {
  year: string;
  images: GalleryImage[];
};

type GalleryPageProps = {
  initialData: GalleryYear[];
};

// --- LOGIKA GRIDU (Bez zmian) ---
const getGridVariant = (index: number) => {
  const pattern = [
    "big",
    "normal",
    "tall",
    "normal",
    "wide",
    "normal",
    "tall",
    "big",
    "normal",
    "wide",
  ];
  return pattern[index % pattern.length];
};

const getGridClass = (variant: string) => {
  switch (variant) {
    case "big":
      return "col-span-1 row-span-4 md:col-span-2 md:row-span-4 h-[400px] md:h-[420px]";
    case "wide":
      return "col-span-1 row-span-2 md:col-span-2 md:row-span-2 h-[200px]";
    case "tall":
      return "col-span-1 row-span-4 md:col-span-1 md:row-span-4 h-[400px] md:h-[420px]";
    default:
      return "col-span-1 row-span-2 md:col-span-1 md:row-span-2 h-[200px]";
  }
};

const IMAGES_PER_PAGE = 15;

export default function GalleryPage({ initialData }: GalleryPageProps) {
  // --- 1. PRZETWARZANIE DANYCH Z SANITY ---

  // Spłaszczamy strukturę: Zbieramy wszystkie zdjęcia ze wszystkich lat w jedną tablicę
  const allImages = useMemo(() => {
    if (!initialData) return [];

    // flatMap przechodzi przez lata i wyciąga z nich zdjęcia
    return initialData.flatMap((yearGroup) =>
      yearGroup.images.map((img) => ({
        ...img,
        // Przypisujemy rok z grupy do zdjęcia, żeby łatwiej filtrować
        year: yearGroup.year,
        // Zabezpieczenie: jeśli nie ma daty, używamy roku
        date: img.date || `${yearGroup.year}-01-01`,
      })),
    );
  }, [initialData]);

  // Pobieramy listę dostępnych lat bezpośrednio z danych Sanity
  const availableYears = useMemo(() => {
    if (!initialData) return [];
    // Zakładamy, że initialData jest już posortowane w zapytaniu GROQ (order year desc)
    return initialData.map((group) => group.year);
  }, [initialData]);

  // --- STAN KOMPONENTU ---
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [activeYear, setActiveYear] = useState<string | "all">("all"); // Zmieniono number na string, bo rok w Sanity to string
  const [visibleCount, setVisibleCount] = useState(IMAGES_PER_PAGE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // --- FILTROWANIE ---
  const filteredImages = useMemo(() => {
    if (activeYear === "all") return allImages;
    return allImages.filter((img) => img.year === activeYear);
  }, [activeYear, allImages]);

  const visibleImages = filteredImages.slice(0, visibleCount);
  const hasMore = visibleCount < filteredImages.length;

  const handleYearChange = (year: string | "all") => {
    setActiveYear(year);
    setVisibleCount(IMAGES_PER_PAGE);
  };

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + IMAGES_PER_PAGE);
      setIsLoadingMore(false);
    }, 600);
  };

  // --- BLOKADA SCROLLA (Lightbox) ---
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "var(--scrollbar-width, 0px)";
    } else {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
    }
    return () => {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
    };
  }, [selectedImage]);

  return (
    <>
      <NavBar />

      <main className="min-h-screen bg-brand-red pt-20 pb-20 overflow-x-hidden">
        <section className="relative py-24 px-6 max-[640px]:px-4 mx-4 bg-[#b32a2e] min-h-[800px]">
          {/* Elementy Dekoracyjne */}
          <div className="pointer-events-none">
            <Image
              src="/symbol.svg"
              width={300}
              height={150}
              className="absolute top-20 -right-6 z-10 max-[1220px]:hidden rotate-12"
              alt=""
            />
            <Image
              src="/symbol.svg"
              width={250}
              height={120}
              className="absolute bottom-20 -left-10 z-10 max-[1220px]:hidden -rotate-12"
              alt=""
            />
            <Image
              src="/smok.svg"
              width={400}
              height={200}
              className="absolute bottom-0 right-0 z-0 translate-x-20 translate-y-10"
              alt=""
            />
            <Image
              src="/chmura.svg"
              width={300}
              height={150}
              className="absolute top-32 -left-12 z-10"
              alt=""
            />
          </div>

          <div className="max-w-[1400px] mx-auto relative z-20">
            {/* Nagłówek */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full shadow-lg text-xs font-bold uppercase tracking-widest text-brand-red bg-gold mb-6">
                <span>Nasze Wspomnienia</span>
              </div>
              <h1 className="montserrat text-4xl lg:text-6xl font-black text-white mb-6">
                Galeria z <span className="text-gold">Podróży</span>
              </h1>
              <p className="text-white/80 max-w-2xl mx-auto font-medium text-lg leading-relaxed montserrat">
                Zobacz świat naszymi oczami. Prawdziwe emocje, niezapomniane
                widoki i chwile, które zostają na zawsze.
              </p>
            </div>

            {/* Filtry Lat - TERAZ DYNAMICZNE Z SANITY */}
            <div className="flex flex-wrap justify-center gap-3 mb-16">
              <button
                onClick={() => handleYearChange("all")}
                className={`px-6 py-2 rounded-full cursor-pointer text-sm font-bold uppercase tracking-wider transition-all border-2 ${
                  activeYear === "all"
                    ? "bg-gold text-brand-red border-gold shadow-lg scale-105"
                    : "bg-transparent text-white border-white/20 hover:border-gold hover:text-gold"
                }`}
              >
                Wszystkie
              </button>
              {availableYears.map((year) => (
                <button
                  key={year}
                  onClick={() => handleYearChange(year)}
                  className={`px-6 py-2 rounded-full text-sm cursor-pointer font-bold uppercase tracking-wider transition-all border-2 ${
                    activeYear === year
                      ? "bg-gold text-brand-red border-gold shadow-lg scale-105"
                      : "bg-transparent text-white border-white/20 hover:border-gold hover:text-gold"
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>

            {/* Grid Zdjęć */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[100px] grid-flow-dense">
              <AnimatePresence mode="popLayout">
                {visibleImages.map((img, index) => (
                  <motion.div
                    key={img.id} // Używamy _key z Sanity
                    layoutId={`gallery-image-${img.id}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.4 }}
                    className={`
                      relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg border-2 border-white/5 
                      bg-black/20 backdrop-blur-sm
                      ${getGridClass(getGridVariant(index))}
                    `}
                    onClick={() => setSelectedImage(img)}
                  >
                    <Image
                      src={img.url}
                      alt={img.alt || "Zdjęcie z wyprawy"}
                      fill
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />

                    {/* Overlay na hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <div className="flex items-center justify-between w-full mb-1">
                          <div className="flex items-center gap-2">
                            <Calendar size={12} className="text-gold" />
                            <span className="text-gold font-bold text-[10px] uppercase tracking-wider montserrat">
                              {img.year}{" "}
                              {/* Używamy roku przypisanego przy spłaszczaniu */}
                            </span>
                          </div>
                          <div className="bg-white p-2 rounded-full text-brand-red hover:bg-gold hover:text-black transition-colors shadow-lg">
                            <Download size={14} />
                          </div>
                        </div>
                        <h3 className="text-white font-bold text-lg montserrat leading-none mt-1 line-clamp-1">
                          {img.alt || "Bez tytułu"}
                        </h3>
                      </div>

                      <div className="absolute top-4 right-4 bg-white/20 p-2 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        <ZoomIn size={18} className="text-white" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Brak zdjęć - komunikat */}
            {visibleImages.length === 0 && (
              <div className="text-center text-white/50 py-20">
                <p>Brak zdjęć w wybranej kategorii.</p>
              </div>
            )}

            {/* Load More Button */}
            {hasMore && (
              <div className="flex justify-center mt-16">
                <button
                  onClick={handleLoadMore}
                  disabled={isLoadingMore}
                  className="group flex items-center cursor-pointer gap-3 px-10 py-4 bg-white/10 text-white border border-white/20 rounded-full font-bold montserrat text-xs uppercase tracking-widest hover:bg-gold hover:text-brand-red hover:border-gold transition-all shadow-xl disabled:opacity-70 disabled:cursor-not-allowed pointer-cursor"
                >
                  {isLoadingMore ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Ładowanie...
                    </>
                  ) : (
                    <>
                      Załaduj Więcej
                      <ArrowLeft
                        size={16}
                        className="-rotate-90 group-hover:translate-y-1 transition-transform"
                      />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* LIGHTBOX (Zaktualizowany pod nowe typy danych) */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(24px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-[100] bg-black/80 flex flex-col items-center justify-center pointer-cursor"
            onClick={() => setSelectedImage(null)}
          >
            {/* Top Bar Lightboxa */}
            <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-50 bg-gradient-to-b from-black/80 to-transparent">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-red border border-gold text-gold flex items-center justify-center backdrop-blur-md shadow-lg">
                  <Calendar size={18} />
                </div>
                <div className="text-white">
                  <p className="font-bold text-lg montserrat tracking-wide">
                    {selectedImage.year} {/* Rok */}
                  </p>
                  <p className="text-[10px] text-white/50 uppercase tracking-widest font-medium">
                    {selectedImage.date} {/* Pełna data */}
                  </p>
                </div>
              </div>

              <button
                className="w-12 h-12 flex items-center justify-center rounded-full cursor-pointer bg-brand-red border border-gold text-gold transition-all duration-300 shadow-lg pointer-cursor backdrop-blur-md"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(null);
                }}
              >
                <X size={24} />
              </button>
            </div>

            {/* Przycisk Poprzednie */}
            <button
              className="absolute left-4 top-1/2 cursor-pointer -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all backdrop-blur-md max-md:hidden"
              onClick={(e) => {
                e.stopPropagation();
                const currentIndex = visibleImages.findIndex(
                  (img) => img.id === selectedImage.id,
                );
                const prevIndex =
                  (currentIndex - 1 + visibleImages.length) %
                  visibleImages.length;
                setSelectedImage(visibleImages[prevIndex]);
              }}
            >
              <ChevronLeft size={24} />
            </button>

            {/* Przycisk Następne */}
            <button
              className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all pointer-cursor backdrop-blur-md max-md:hidden"
              onClick={(e) => {
                e.stopPropagation();
                const currentIndex = visibleImages.findIndex(
                  (img) => img.id === selectedImage.id,
                );
                const nextIndex = (currentIndex + 1) % visibleImages.length;
                setSelectedImage(visibleImages[nextIndex]);
              }}
            >
              <ChevronRight size={24} />
            </button>

            {/* Obraz */}
            <div className="relative w-full h-full flex items-center justify-center p-4 max-md:p-0 overflow-hidden">
              <motion.div
                key={selectedImage.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = Math.abs(offset.x) * velocity.x;
                  const currentIndex = visibleImages.findIndex(
                    (img) => img.id === selectedImage.id,
                  );

                  if (swipe < -10000 || offset.x < -100) {
                    const nextIndex = (currentIndex + 1) % visibleImages.length;
                    setSelectedImage(visibleImages[nextIndex]);
                  } else if (swipe > 10000 || offset.x > 100) {
                    const prevIndex =
                      (currentIndex - 1 + visibleImages.length) %
                      visibleImages.length;
                    setSelectedImage(visibleImages[prevIndex]);
                  }
                }}
                className="relative w-full h-full max-w-7xl max-h-[80vh] flex items-center justify-center pointer-cursor"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={selectedImage.url}
                  alt={selectedImage.alt || "Zdjęcie"}
                  className="object-contain drop-shadow-2xl select-none"
                  fill
                  sizes="100vw"
                  quality={90}
                  draggable={false}
                />
              </motion.div>
            </div>

            {/* Tytuł na dole */}
            <div className="absolute bottom-0 left-0 right-0 p-8 pb-10 bg-gradient-to-t from-black/90 via-black/50 to-transparent text-center z-40 pointer-events-none">
              <motion.h2
                key={`title-${selectedImage.id}`}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-white font-black text-2xl max-md:text-xl montserrat tracking-tight drop-shadow-lg"
              >
                {selectedImage.alt || "Bez tytułu"}
              </motion.h2>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100px" }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="h-1 bg-[#b32a2e] mx-auto mt-4 rounded-full"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
