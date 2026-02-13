/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  data: {
    header: {
      badge?: string;
      mainText: string;
      highlightedText: string;
    };
    contactCtaText?: string;
    items: FaqItem[];
  };
}

export const FaqSection = ({ data }: FaqSectionProps) => {
  if (!data || !data.items || data.items.length === 0) return null;

  const { header, contactCtaText, items } = data;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const titleParts = useMemo(
    () =>
      header.mainText.split(new RegExp(`(${header.highlightedText})`, "gi")),
    [header.mainText, header.highlightedText],
  );

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const element = document.getElementById("kontakt");
    if (element) {
      e.preventDefault();
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="w-full bg-[#F8F8F6] relative overflow-hidden py-32">
      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-5xl">
        <div className="mb-12 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            {header.badge && (
              <div className="flex items-center gap-4 mb-4 max-md:justify-center">
                <span className="w-12 h-[3px] bg-brand-red inline-block rounded-full"></span>
                <span className="text-brand-red font-black tracking-[0.3em] uppercase text-[10px] font-montserrat">
                  {header.badge}
                </span>
                <span className="w-12 h-[3px] bg-brand-red hidden rounded-full max-md:inline-block"></span>
              </div>
            )}

            <h2 className="text-3xl lg:text-5xl font-montserrat font-black text-black leading-[1.1] max-md:text-center tracking-tighter">
              {titleParts.map((part, i) =>
                part.toLowerCase() === header.highlightedText?.toLowerCase() ? (
                  <span key={i} className="text-brand-red">
                    {part}
                  </span>
                ) : (
                  <span key={i}>{part}</span>
                ),
              )}
            </h2>
          </div>

          <Link
            href="/#kontakt"
            onClick={handleScroll}
            className="group hidden md:flex items-center gap-3 text-xs font-black uppercase tracking-widest hover:text-brand-red transition-all"
          >
            {contactCtaText || "Masz inne pytanie?"}
            <span className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-brand-red group-hover:bg-brand-red group-hover:text-white transition-all duration-300">
              <ArrowUpRight size={18} />
            </span>
          </Link>
        </div>

        <div className="flex flex-col gap-2">
          {items.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="relative border-b border-gray-100 last:border-none transition-all duration-500"
              >
                <motion.div
                  animate={{
                    backgroundColor: isOpen ? "#ffffff" : "transparent",
                    padding: isOpen ? "24px" : "0px",
                    borderRadius: isOpen ? "24px" : "0px",
                  }}
                  className={`transition-shadow duration-500 ${isOpen ? "shadow-xl shadow-black/5" : ""}`}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-start justify-between gap-6 text-left group py-8 focus:outline-none"
                    aria-expanded={isOpen}
                    aria-label="Rozwiń odpowiedź"
                  >
                    <div className="flex items-center gap-6 md:gap-10">
                      <div
                        className={`shrink-0 flex items-center justify-center font-mono rounded-full transition-all duration-500
                        ${
                          isOpen
                            ? "w-12 h-12 bg-brand-red text-white text-xl"
                            : "w-10 h-10 bg-gray-50 text-gray-300 text-sm group-hover:text-brand-red"
                        }`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </div>

                      <h3
                        className={`text-lg md:text-2xl font-black font-montserrat transition-colors duration-300 tracking-tight
                        ${isOpen ? "text-black" : "text-gray-800 group-hover:text-brand-red"}`}
                      >
                        {faq.question}
                      </h3>
                    </div>

                    <div
                      className={`shrink-0 mt-2 transition-transform duration-500 ${isOpen ? "rotate-45 text-brand-red" : "rotate-0 text-gray-300"}`}
                    >
                      <Plus
                        size={isOpen ? 28 : 24}
                        strokeWidth={isOpen ? 3 : 2}
                      />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.4,
                          ease: [0.04, 0.62, 0.23, 0.98],
                        }}
                        className="overflow-hidden"
                      >
                        <div className="md:pl-[6.5rem] pr-6 pb-8 max-w-3xl">
                          <p className="text-gray-500 leading-relaxed font-montserrat text-sm md:text-base">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
