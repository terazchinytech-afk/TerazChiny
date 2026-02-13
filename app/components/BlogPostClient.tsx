/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { PortableText } from "@portabletext/react";
import { Calendar, Clock, ChevronLeft, Share2 } from "lucide-react";

const portableTextComponents = {
  block: {
    h2: ({ children }: any) => (
      <h2 className="montserrat text-3xl max-[640px]:text-2xl font-bold text-white mt-16 mb-8 border-l-4 border-gold pl-5 uppercase tracking-tighter">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="montserrat text-xl font-bold text-gold mt-10 mb-5 uppercase tracking-wide">
        {children}
      </h3>
    ),
    normal: ({ children }: any) => (
      <p className="montserrat text-gray-100 text-lg max-[640px]:text-base leading-relaxed mb-8 opacity-90 font-light">
        {children}
      </p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="relative my-12 p-10 bg-black/20 border-l-8 border-gold rounded-r-3xl italic shadow-inner">
        <p className="montserrat text-white text-xl max-[640px]:text-lg leading-relaxed">
          {children}
        </p>
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="space-y-6 mb-10 ml-2">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="space-y-6 mb-10 ml-6 list-decimal text-gold font-bold">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li className="montserrat text-gray-100 flex items-start gap-4 group">
        <span className="h-2.5 w-2.5 rounded-full bg-gold mt-2 shrink-0 shadow-[0_0_10px_rgba(255,215,0,0.5)]" />
        <span className="text-lg max-[640px]:text-base opacity-95 leading-snug">
          {children}
        </span>
      </li>
    ),
    number: ({ children }: any) => (
      <li className="montserrat text-gray-100 pl-2">
        <span className="text-lg max-[640px]:text-base opacity-95 leading-snug font-normal text-gray-100">
          {children}
        </span>
      </li>
    ),
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-bold text-white border-b border-gold/30">
        {children}
      </strong>
    ),
  },
  types: {
    image: ({ value }: any) => (
      <div className="relative w-full aspect-[16/9] my-16 overflow-hidden rounded-[2.5rem] shadow-2xl border border-white/5">
        <Image
          src={value.assetUrl || value.image}
          alt={value.alt || "Obraz we wpisie"}
          fill
          className="object-cover"
        />
      </div>
    ),
  },
};

interface BlogPostClientProps {
  post: any;
  recommendedPosts: any[];
}

export const BlogPostClient = ({
  post,
  recommendedPosts,
}: BlogPostClientProps) => {
  return (
    <main className="relative min-h-screen bg-[#b32a2e] pb-32 pt-12 overflow-hidden ">
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
        className="absolute bottom-96 -right-20 "
        alt=""
        aria-hidden="true"
      />
      <Image
        src="/chmura.webp"
        width={300}
        height={150}
        className="absolute top-96 -left-6 pointer-events-none z-10"
        alt=""
        aria-hidden="true"
      />
      <div className="max-w-4xl mx-auto px-6 relative z-10 mt-24">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-white/50 hover:text-gold transition-all montserrat text-xs font-bold uppercase tracking-[0.2em] mb-16 group"
        >
          <ChevronLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Powrót do bloga
        </Link>

        <header className="mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 mb-8"
          >
            <span className="bg-gold text-black px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
              {post.category}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="montserrat text-6xl max-[768px]:text-4xl max-[480px]:text-3xl font-bold text-white leading-[1.1] tracking-tighter mb-10"
          >
            {post.title}
          </motion.h1>

          <div className="flex flex-wrap items-center gap-10 max-[480px]:gap-6 text-white/60 text-[11px] font-bold uppercase tracking-[0.15em] montserrat border-y border-white/10 py-8">
            <div className="flex items-center gap-2.5">
              <Calendar size={18} className="text-gold" /> {post.date}
            </div>
            <div className="flex items-center gap-2.5">
              <Clock size={18} className="text-gold" /> {post.readingTime}{" "}
              czytania
            </div>
          </div>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative aspect-[21/9] max-[640px]:aspect-[16/9] w-full mb-20 overflow-hidden rounded-[3.5rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]"
        >
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </motion.div>

        <article className="prose prose-invert max-w-none">
          <PortableText value={post.body} components={portableTextComponents} />
        </article>

        <section className="mt-32 pt-20 border-t border-white/10">
          <h3 className="montserrat text-2xl font-bold text-white mb-12 uppercase tracking-tighter border-l-4 border-gold pl-4">
            Zobacz również
          </h3>
          <div className="grid grid-cols-3 max-[900px]:grid-cols-1 gap-8">
            {recommendedPosts?.map((item: any, index: number) => (
              <motion.div
                key={item.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={`/blog/${item.slug}`} className="group">
                  <div className="relative aspect-[16/10] rounded-3xl overflow-hidden mb-4 shadow-xl">
                    <Image
                      src={item.image || "/heroBackground.png"}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                  </div>
                  <div className="px-2">
                    <span className="text-gold text-[10px] font-black uppercase tracking-widest mb-2 block">
                      {item.category}
                    </span>
                    <h4 className="text-white font-bold leading-tight group-hover:text-gold transition-colors line-clamp-2">
                      {item.title}
                    </h4>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};
