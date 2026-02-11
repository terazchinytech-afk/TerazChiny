/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Clock,
  Calendar,
  ArrowRight,
  BookOpen,
} from "lucide-react";

// --- HELPERY OPTYMALIZACYJNE (LOGICZNE) ---

// Funkcja zapobiega błędom 500/Timeout poprzez ograniczenie rozmiaru wejściowego z Sanity
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

interface BlogPost {
  id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt: string;
  category: string;
  readingTime?: number;
  mainImage: string;
}

interface BlogSectionProps {
  headerData: {
    header: {
      subtitle?: string;
      fullText: string;
      highlight?: string;
    };
    ctaText?: string;
  };
  posts: BlogPost[];
}

const formatDate = (dateString: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const BlogSection = ({ headerData, posts }: BlogSectionProps) => {
  if (!headerData) return null;

  const { header, ctaText } = headerData;

  // Memoizacja danych dla stabilności renderowania
  const latestPosts = useMemo(() => (posts ? posts.slice(0, 3) : []), [posts]);
  const hasPosts = latestPosts.length > 0;

  const titleParts = useMemo(
    () => header.fullText.split(new RegExp(`(${header.highlight})`, "gi")),
    [header.fullText, header.highlight],
  );

  return (
    <section className="px-8 max-[1024px]:px-4 rounded-[5rem] max-[640px]:rounded-[2.5rem] mx-4 relative overflow-hidden bg-[#b32a2e] py-32 landing-spacing">
      {/* Optymalizacja tła - pointer-events-none dla lepszej wydajności przewijania */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: "url('/pattern.svg')",
          backgroundSize: "400px",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col gap-16">
        {/* --- NAGŁÓWEK --- */}
        <div className="flex flex-row  justify-between items-end max-[900px]:items-start mb-16 gap-8  max-[720px]:text-center  max-[720px]:self-center">
          <div>
            {header.subtitle && (
              <span className="montserrat text-gold text-xs font-black uppercase tracking-[0.4em] mb-4 block">
                {header.subtitle}
              </span>
            )}
            <h2 className="text-3xl  max-[812px]:text-4xl lg:text-5xl font-montserrat font-black text-white leading-tight max-[812px]:text-center">
              {titleParts.map((part, i) =>
                part.toLowerCase() === header.highlight?.toLowerCase() ? (
                  <span key={i} className="text-gold">
                    {part}
                  </span>
                ) : (
                  <span key={i}>{part}</span>
                ),
              )}
            </h2>
          </div>

          <Link href={"/blog"} className="w-fit block -mt-4 max-[720px]:hidden">
            <motion.div
              whileTap={{ scale: 0.95 }}
              className="group mt-4 flex items-center justify-center rounded-lg bg-[#efd075] px-10 py-3 font-bold text-[#b32a2e] shadow-lg transition-all duration-300"
            >
              <span className="font-montserrat text-[11px] font-bold uppercase tracking-widest transition-transform duration-300 group-hover:-translate-x-2">
                {ctaText || "Zobacz wszystkie"}
              </span>

              <div className="flex w-0 opacity-0 -translate-x-4 transition-all duration-300 ease-out group-hover:w-5 group-hover:translate-x-2 group-hover:opacity-100">
                <ArrowRight size={16} className="shrink-0" />
              </div>
            </motion.div>
          </Link>
        </div>

        {/* --- TREŚĆ: LISTA LUB PLACEHOLDER --- */}
        {!hasPosts ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-white/20 rounded-3xl bg-white/5 backdrop-blur-sm min-h-[300px]"
          >
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-6 text-gold">
              <BookOpen size={32} />
            </div>
            <h3 className="text-2xl font-montserrat font-bold text-white mb-2">
              Dziennik jest pusty
            </h3>
            <p className="text-white/60 max-w-md font-montserrat text-sm leading-relaxed">
              Aktualnie nie ma opublikowanych wpisów. Nasz zespół redakcyjny
              właśnie pracuje nad nowymi historiami z Państwa Środka.
            </p>
          </motion.div>
        ) : (
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-16">
            {latestPosts.map((post, idx) => {
              // Optymalizacja obrazu dla każdego posta z osobna
              const optimizedImg = getOptimizedImageUrl(
                post.mainImage || "/heroBackground.png",
                600,
              );

              return (
                <motion.div
                  key={post.slug?.current || idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: idx * 0.1 }}
                  className="group w-[calc(33.333%-2.5rem)] max-[1024px]:w-[calc(50%-2.5rem)] max-[640px]:w-full"
                >
                  <Link
                    href={`/blog/${post.slug?.current}`}
                    className="block h-full flex flex-col"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden rounded-[2.5rem] max-[640px]:rounded-[1.5rem] mb-8 shadow-2xl transition-all duration-700 group-hover:rounded-[1rem]">
                      <Image
                        src={optimizedImg}
                        alt={post.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                        priority={idx === 0} // Kluczowe dla poprawy LCP
                      />

                      {post.category && (
                        <div className="absolute top-4 left-4 z-20">
                          <span className="montserrat bg-gold text-black px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest shadow-lg">
                            {post.category}
                          </span>
                        </div>
                      )}

                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-white text-[#b32a2e] flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-500 shadow-2xl">
                          <ArrowUpRight size={24} />
                        </div>
                      </div>
                    </div>

                    <div className="px-1 flex flex-col flex-grow">
                      <div className="flex items-center gap-4 mb-4 text-white/40 text-[9px] font-bold uppercase tracking-[0.2em] montserrat">
                        <span className="flex items-center gap-1.5">
                          <Calendar size={12} className="text-gold" />
                          {formatDate(post.publishedAt)}
                        </span>
                        {post.readingTime && (
                          <>
                            <span className="h-1 w-1 rounded-full bg-gold/20"></span>
                            <span className="flex items-center gap-1.5">
                              <Clock size={12} className="text-gold" />
                              {post.readingTime} min
                            </span>
                          </>
                        )}
                      </div>

                      <h3 className="montserrat text-white text-xl max-[1100px]:text-lg font-bold leading-tight mb-4 group-hover:text-gold transition-colors line-clamp-2 uppercase tracking-tight">
                        {post.title}
                      </h3>

                      <p className="montserrat text-gray-200/60 text-[13px] leading-relaxed line-clamp-2 font-medium mb-4">
                        {post.excerpt}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
        <Link
          href={"/blog"}
          className="w-fit  -mt-4 hidden max-[720px]:block self-center mt-4"
        >
          <motion.div
            whileTap={{ scale: 0.95 }}
            className="group mt-4 flex items-center justify-center rounded-lg bg-[#efd075] px-10 py-3 font-bold text-[#b32a2e] shadow-lg transition-all duration-300"
          >
            <span className="font-montserrat text-[11px] font-bold uppercase tracking-widest transition-transform duration-300 group-hover:-translate-x-2">
              {ctaText || "Zobacz wszystkie"}
            </span>

            <div className="flex w-0 opacity-0 -translate-x-4 transition-all duration-300 ease-out group-hover:w-5 group-hover:translate-x-2 group-hover:opacity-100">
              <ArrowRight size={16} className="shrink-0" />
            </div>
          </motion.div>
        </Link>
      </div>

      {/* Optymalizacja dekoracji - SVG ładowane leniwie */}
      <Image
        src="/smok.svg"
        width={600}
        height={400}
        className="absolute -bottom-20 -right-20 opacity-[0.03] pointer-events-none -rotate-12 scale-150"
        alt=""
        loading="lazy"
      />
    </section>
  );
};
