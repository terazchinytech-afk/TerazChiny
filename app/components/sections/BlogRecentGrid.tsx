/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link"; // Dodany import
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Clock,
  Search,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const POSTS_PER_PAGE = 9;

export const BlogRecentGrid = ({ posts }: { posts: any[] }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const mainPost = posts[0];
  const sidePosts = posts.slice(1, 4);

  const filteredDiscoveryPosts = useMemo(() => {
    const remainingPosts = posts;
    return remainingPosts.filter((post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [posts, searchQuery]);

  const totalPages = Math.ceil(filteredDiscoveryPosts.length / POSTS_PER_PAGE);
  const indexOfLastPost = currentPage * POSTS_PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;
  const currentDiscoveryPosts = filteredDiscoveryPosts.slice(
    indexOfFirstPost,
    indexOfLastPost,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    document
      .getElementById("discovery-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-24 px-6 rounded-[5rem] max-[1024px]:rounded-[3rem] max-[640px]:rounded-[2rem] max-[640px]:px-4 my-8 -mb-24 mx-4 relative overflow-hidden bg-[#b32a2e]">
      <Image
        src="/symbol.webp"
        width={300}
        height={150}
        className="absolute top-20 -right-6 pointer-events-none z-10 max-[1220px]:hidden"
        alt=""
        aria-hidden="true"
      />
      <Image
        src="/symbol.webp"
        width={300}
        height={150}
        className="absolute bottom-20 -left-6 pointer-events-none z-10 max-[1220px]:hidden"
        alt=""
        aria-hidden="true"
      />
      <Image
        src={"/smok.webp"}
        width={300}
        height={110}
        className="absolute bottom-110 -right-0 "
        alt=""
        aria-hidden="true"
      />
      <Image
        src="/chmura.webp"
        width={300}
        height={150}
        className="absolute top-146 -left-6 pointer-events-none z-10"
        alt=""
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* --- TOP SECTION --- */}
        <div className="grid grid-cols-[3fr_2fr] max-[1100px]:grid-cols-1 gap-12 mb-32 max-[768px]:mb-16 items-stretch h-auto min-[1100px]:h-[500px]">
          {/* LINK: Main Featured Post */}
          <Link href={`/blog/${mainPost.slug}`} className="block h-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="group cursor-pointer h-full relative"
            >
              <div className="max-[1200px]:hidden">
                <Image
                  src={"/symbol.webp"}
                  width={180}
                  height={180}
                  className="absolute -top-10 -right-10 opacity-40 rotate-12"
                  alt=""
                />
                <Image
                  src={"/smok.webp"}
                  width={200}
                  height={110}
                  className="absolute -top-24 -left-20 opacity-30"
                  alt=""
                />
              </div>

              <div className="relative h-[500px] max-[1100px]:h-[400px] max-[640px]:h-[300px] overflow-hidden rounded-[1.5rem] bg-white shadow-2xl">
                <Image
                  src={mainPost.image}
                  alt={mainPost.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-10 max-[768px]:p-6 max-[480px]:p-4">
                  <span className="montserrat bg-[#b32a2e] text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-3 inline-block">
                    {mainPost.category}
                  </span>
                  <h2 className="montserrat text-3xl max-[1100px]:text-2xl max-[640px]:text-xl max-[480px]:text-lg font-bold text-white leading-tight mb-4 tracking-tight">
                    {mainPost.title}
                  </h2>
                  <p className="montserrat text-gray-200 text-sm max-[480px]:text-xs font-medium leading-relaxed line-clamp-2 max-w-[90%] opacity-80">
                    {mainPost.excerpt}
                  </p>
                </div>
              </div>
            </motion.div>
          </Link>

          {/* Sidebar: Najnowsze wpisy */}
          <div className="flex flex-col h-full py-2 relative">
            <h3 className="montserrat text-white text-[20px] max-[640px]:text-[16px] font-black mb-6 border-l-4 border-gold pl-4 uppercase tracking-tighter">
              Najnowsze wpisy
            </h3>
            <div className="flex flex-col justify-between h-full space-y-4 max-[1100px]:space-y-6">
              {sidePosts.map((post, i) => (
                <Link
                  href={`/blog/${post.slug}`}
                  key={post.id}
                  className="block"
                >
                  <motion.div className="flex items-center max-[480px]:flex-col max-[480px]:items-start gap-6 max-[480px]:gap-4 group cursor-pointer p-3 rounded-3xl hover:bg-white/10 transition-all duration-500 max-[480px]:bg-white/5">
                    <div className="relative h-[110px] w-[150px] max-[640px]:h-[80px] max-[640px]:w-[110px] max-[480px]:w-full max-[480px]:h-[160px] shrink-0 overflow-hidden rounded-2xl shadow-xl">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-110 duration-700"
                      />
                    </div>
                    <div className="flex flex-col pr-1 justify-around h-full">
                      <span className="montserrat text-[9px] uppercase py-[2px] px-2 rounded-full bg-gold w-fit font-bold text-black mb-2">
                        {post.category}
                      </span>
                      <h4 className="montserrat text-white text-[15px] max-[640px]:text-[13px] max-[480px]:text-[15px] font-bold leading-tight group-hover:text-gold transition-colors line-clamp-2">
                        {post.title}
                      </h4>
                      <div className="flex items-center gap-4 text-white text-[10px] font-bold uppercase tracking-widest montserrat mt-2 opacity-70">
                        <div className="flex items-center gap-1.5 whitespace-nowrap">
                          <Calendar size={12} className="text-gold" />{" "}
                          {post.date}
                        </div>
                        <div className="h-3 w-px bg-white/40" />
                        <div className="flex items-center gap-1.5 whitespace-nowrap">
                          <Clock size={12} className="text-gold" />{" "}
                          {post.readingTime}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* --- SEARCH BAR SECTION --- */}
        <div
          id="discovery-section"
          className="flex flex-row max-[900px]:flex-col relative items-center max-[900px]:items-start justify-between mb-16 gap-8"
        >
          <h2 className="montserrat text-4xl max-[768px]:text-2xl max-[480px]:text-xl font-bold text-white tracking-tighter capitalize border-l-4 border-gold pl-4">
            Wszystkie wpisy
          </h2>
          <div className="relative w-full max-w-[400px] max-[900px]:max-w-full group">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#b32a2e] z-10"
              size={18}
            />
            <input
              type="text"
              placeholder="Szukaj wpisów..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-white text-black font-semibold montserrat text-sm rounded-full py-4 max-[480px]:py-3 pl-12 pr-6 shadow-2xl focus:outline-none focus:ring-2 focus:ring-gold transition-all"
            />
          </div>
        </div>

        {/* --- PAGINATED GRID --- */}
        <div className="grid grid-cols-3 max-[1024px]:grid-cols-2 max-[640px]:grid-cols-1 gap-x-16 gap-y-24 max-[768px]:gap-y-12 relative min-h-[600px]">
          <AnimatePresence mode="popLayout">
            {currentDiscoveryPosts.map((post) => (
              <Link href={`/blog/${post.slug}`} key={post.id} className="block">
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[1.5rem] mb-6 shadow-2xl">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Tag kategorii w lewym górnym rogu */}
                    <div className="absolute top-4 left-4 z-20">
                      <span className="montserrat bg-gold text-black px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-lg">
                        {post.category}
                      </span>
                    </div>

                    <div className="absolute top-4 right-4 z-20">
                      <div className="p-2.5 max-[480px]:p-2 rounded-full bg-white text-[#b32a2e] shadow-xl group-hover:bg-gold group-hover:text-black group-hover:rotate-45 transition-all duration-300">
                        <ArrowUpRight
                          size={20}
                          className="max-[480px]:w-4 max-[480px]:h-4"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="px-1">
                    <div className="flex items-center gap-4 mb-3 text-white text-[10px] max-[480px]:text-[8px] font-bold uppercase tracking-widest montserrat opacity-70">
                      <span className="flex items-center gap-1.5 whitespace-nowrap">
                        <Calendar size={12} className="text-gold" /> {post.date}
                      </span>
                      <span className="h-3 w-px bg-white/30"></span>
                      <span className="flex items-center gap-1.5 whitespace-nowrap">
                        <Clock size={12} className="text-gold" />{" "}
                        {post.readingTime}
                      </span>
                    </div>
                    <h3 className="montserrat text-white text-xl max-[768px]:text-lg max-[480px]:text-base font-bold leading-tight mb-3 group-hover:text-gold transition-colors line-clamp-2 uppercase tracking-tight">
                      {post.title}
                    </h3>
                    <p className="montserrat text-gray-200 text-[13px] max-[480px]:text-xs font-regular leading-relaxed line-clamp-2 opacity-80">
                      {post.excerpt}
                    </p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </AnimatePresence>
        </div>

        {/* --- PAGINATION --- */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 max-[480px]:gap-2 mt-32 max-[768px]:mt-16">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-3 max-[480px]:p-2 rounded-full bg-white/10 text-white disabled:opacity-20 hover:bg-gold hover:text-black transition-all shadow-lg"
              aria-label={`Wróć do strony numer ${currentPage - 1}`}
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex gap-2 max-[480px]:gap-1">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  aria-label={`Przejdź do strony ${i + 1}`}
                  className={`w-12 h-12 max-[480px]:w-10 max-[480px]:h-10 rounded-full font-bold montserrat text-sm transition-all ${currentPage === i + 1 ? "bg-gold text-black shadow-xl scale-110" : "bg-white/10 text-white hover:bg-white/20"}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-3 max-[480px]:p-2 rounded-full bg-white/10 text-white disabled:opacity-20 hover:bg-gold hover:text-black transition-all shadow-lg"
              aria-label={`Przejdź do strony ${currentPage + 1}`}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
