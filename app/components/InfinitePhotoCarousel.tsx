/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useRef, useMemo } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
  wrap,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import { X, ZoomIn, Calendar } from "lucide-react";

// --- TYPY ---
export interface SanityGalleryImage {
  alt: string | null;
  id: string | null;
  tag: string | null; // Rok
  url: string | null;
}

interface InfinitePhotoCarouselProps {
  images: SanityGalleryImage[];
}

// --- HELPERY (Automatyczny układ) ---
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const organizeIntoColumns = (images: SanityGalleryImage[]) => {
  const columns: any[] = [];
  let buffer: SanityGalleryImage[] = [];

  // Algorytm: [Tall] -> [Split + Split] -> [Tall]...
  images.forEach((img, index) => {
    const isTall = index % 3 === 0;

    if (isTall) {
      if (buffer.length > 0) {
        columns.push({ type: "split", items: [...buffer] });
        buffer = [];
      }
      columns.push({ type: "tall", items: [img] });
    } else {
      buffer.push(img);
      if (buffer.length === 2) {
        columns.push({ type: "split", items: [...buffer] });
        buffer = [];
      }
    }
  });

  if (buffer.length > 0) {
    columns.push({ type: "tall", items: buffer });
  }

  return columns;
};

// --- KOMPONENT POJEDYNCZEGO ZDJĘCIA ---
const ImageCard = ({
  img,
  className,
  onClick,
  layoutId,
}: {
  img: SanityGalleryImage;
  className: string;
  onClick: () => void;
  layoutId: string;
}) => (
  <motion.div
    layoutId={layoutId}
    className={`relative overflow-hidden rounded-2xl cursor-pointer group ${className}  select-none inter-cursor`}
    onClick={onClick}
    whileHover={{ scale: 0.98 }}
    transition={{ duration: 0.3 }}
  >
    <Image
      src={img.url!}
      alt={img.alt || "Zdjęcie"}
      fill
      className="object-cover transition-transform duration-700 group-hover:scale-110 pointer-events-none"
      sizes="(max-width: 768px) 50vw, 33vw"
    />

    {/* Tag z rokiem na hoverze */}
    <div className="absolute top-4 left-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <div className="bg-[#b32a2e]/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5 border border-white/20">
        <Calendar size={10} className="text-[#efd075]" />
        <span className="text-white font-bold text-[10px] uppercase tracking-wider font-montserrat">
          {img.tag}
        </span>
      </div>
    </div>

    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
      <div className="bg-white/90 p-3 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
        <ZoomIn size={20} className="text-[#b32a2e]" />
      </div>
    </div>
  </motion.div>
);

// --- GŁÓWNY KOMPONENT ---
export const InfinitePhotoCarousel = ({
  images,
}: InfinitePhotoCarouselProps) => {
  const [selectedImage, setSelectedImage] = useState<{
    data: SanityGalleryImage;
    layoutId: string;
  } | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const isDraggingRef = useRef(false);

  // 1. Filtrujemy dane (usuwamy wpisy bez URL i ID)
  const validImages = useMemo(() => {
    return images.filter((img) => img.url && img.id);
  }, [images]);

  // 2. Organizujemy w kolumny
  const columns = useMemo(
    () => organizeIntoColumns(validImages),
    [validImages],
  );

  // 3. Powielamy dla efektu Marquee
  const repeatedColumns = useMemo(() => {
    if (columns.length === 0) return [];
    // Jeśli zdjęć jest mało, powielamy więcej razy, żeby wypełnić ekran
    const repeatCount = validImages.length < 6 ? 8 : 4;
    return Array(repeatCount).fill(columns).flat();
  }, [columns, validImages]);

  const baseX = useMotionValue(0);
  const baseVelocity = -0.4;

  useAnimationFrame((t, delta) => {
    if (
      !isHovered &&
      !selectedImage &&
      !isDraggingRef.current &&
      repeatedColumns.length > 0
    ) {
      const moveBy = baseVelocity * (delta / 16);
      baseX.set(baseX.get() + moveBy);
    }
  });

  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v / 100)}%`);

  const handleImageClick = (img: SanityGalleryImage, layoutId: string) => {
    if (isDraggingRef.current) return;
    setSelectedImage({ data: img, layoutId });
  };

  if (validImages.length === 0) return null;

  return (
    <>
      {/* --- MARQUEE CONTAINER --- */}
      <div
        className="relative w-full h-[500px] lg:h-[600px] flex items-center cursor-grab active:cursor-grabbing touch-pan-y overflow-hidden "
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="hidden min-[700px]:block absolute inset-0 z-20 pointer-events-none [mask-image:linear-gradient(to_right,white_0%,transparent_15%,transparent_85%,white_100%)] bg-white/0" />
        <div className="hidden min-[700px]:block absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#fff] to-transparent z-20 pointer-events-none" />
        <div className="hidden min-[700px]:block absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#fff] to-transparent z-20 pointer-events-none" />

        <motion.div
          className="flex gap-6 pl-6 w-max"
          style={{ x }}
          onPanStart={() => {
            isDraggingRef.current = true;
          }}
          onPan={(event, info) => {
            baseX.set(baseX.get() + info.delta.x * 2.5);
          }}
          onPanEnd={() => {
            setTimeout(() => {
              isDraggingRef.current = false;
            }, 50);
          }}
        >
          {repeatedColumns.map((col, colIndex) => (
            <div
              key={`${colIndex}-${col.type}`}
              className="w-[220px] md:w-[280px] shrink-0 flex flex-col gap-6 h-full justify-center"
            >
              {col.type === "tall" ? (
                <ImageCard
                  img={col.items[0]}
                  layoutId={`gal-${colIndex}-${col.items[0].id}`}
                  className="h-[420px] md:h-[500px] w-full"
                  onClick={() =>
                    handleImageClick(
                      col.items[0],
                      `gal-${colIndex}-${col.items[0].id}`,
                    )
                  }
                />
              ) : (
                <>
                  {col.items[0] && (
                    <ImageCard
                      img={col.items[0]}
                      layoutId={`gal-${colIndex}-${col.items[0].id}`}
                      className="h-[200px] md:h-[240px] w-full"
                      onClick={() =>
                        handleImageClick(
                          col.items[0],
                          `gal-${colIndex}-${col.items[0].id}`,
                        )
                      }
                    />
                  )}
                  {col.items[1] && (
                    <ImageCard
                      img={col.items[1]}
                      layoutId={`gal-${colIndex}-${col.items[1].id}`}
                      className="h-[200px] md:h-[240px] w-full"
                      onClick={() =>
                        handleImageClick(
                          col.items[1],
                          `gal-${colIndex}-${col.items[1].id}`,
                        )
                      }
                    />
                  )}
                </>
              )}
            </div>
          ))}
        </motion.div>
      </div>

      {/* --- LIGHTBOX --- */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4 md:p-10"
            onClick={() => setSelectedImage(null)}
          >
            {/* Top Bar Lightbox */}
            <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#b32a2e] border border-[#efd075] flex items-center justify-center">
                  <Calendar size={18} className="text-[#efd075]" />
                </div>
                <div>
                  <p className="text-white font-bold font-montserrat">
                    {selectedImage.data.tag}
                  </p>
                  <p className="text-white/50 text-[10px] uppercase tracking-widest">
                    Archiwum wypraw
                  </p>
                </div>
              </div>
              <button
                aria-label="Zamknij"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(null);
                }}
                className="text-white/50 hover:text-white transition-colors bg-white/10 p-3 rounded-full backdrop-blur-md pointer-cursor"
              >
                <X size={24} />
              </button>
            </div>

            <motion.div
              layoutId={selectedImage.layoutId}
              className="relative w-full max-w-6xl aspect-[4/5] md:aspect-[3/2] rounded-2xl overflow-hidden shadow-2xl bg-neutral-900 border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage.data.url!}
                alt={selectedImage.data.alt || "Zdjęcie"}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 via-black/40 to-transparent text-center">
                <h3 className="text-2xl font-black font-montserrat text-white drop-shadow-md">
                  {selectedImage.data.alt}
                </h3>
                <div className="w-12 h-1 bg-[#efd075] mx-auto mt-4 rounded-full" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
