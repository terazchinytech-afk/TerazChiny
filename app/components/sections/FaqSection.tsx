"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, ArrowUpRight } from "lucide-react";
import Link from "next/link";

// --- TYPY DANYCH ---
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
  const { header, contactCtaText, items } = data;
  const faqs = items || [];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const element = document.getElementById("kontakt");
    if (element) {
      e.preventDefault();
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const titleParts = header.mainText.split(
    new RegExp(`(${header.highlightedText})`, "gi"),
  );
  if (!data) return null;
  if (faqs.length === 0) return null;
  return (
    <section className="w-full bg-[#F8F8F6] relative overflow-hidden py-32">
      <div className="absolute inset-0 opacity-[0.4] mix-blend-multiply pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-5xl">
        {/* --- NAGŁÓWEK SEKCYJNY --- */}
        <div className="mb-12 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            {header.badge && (
              <div className="flex items-center gap-4 mb-4 max-md:items-center max-md:justify-center max-md:text-center">
                <span className="w-12 h-[3px] bg-brand-red inline-block rounded-full"></span>
                <span className="text-brand-red font-bold tracking-[0.2em] uppercase text-xs font-montserrat">
                  {header.badge}
                </span>
                <span className="w-12 h-[3px] bg-brand-red hidden rounded-full max-md:inline-block"></span>
              </div>
            )}

            <h2 className="text-3xl max-[812px]:text-4xl lg:text-5xl font-montserrat font-black text-black leading-tight max-[812px]:text-center">
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
            className="group hidden md:flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-brand-red transition-colors"
          >
            {contactCtaText || "Masz inne pytanie?"}
            <span className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center group-hover:border-brand-red group-hover:bg-brand-red group-hover:text-white transition-all">
              <ArrowUpRight size={16} />
            </span>
          </Link>
        </div>

        {/* --- LISTA FAQ --- */}
        <div className="flex flex-col">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                animate={{
                  backgroundColor: isOpen ? "#ffffff" : "rgba(255,255,255,0)",
                  borderRadius: isOpen ? "24px" : "0px",
                  padding: isOpen ? "20px" : "0px",
                  marginBottom: isOpen ? "24px" : "0px",
                  marginTop: isOpen ? "24px" : "0px",
                  boxShadow: isOpen
                    ? "0px 20px 40px -10px rgba(0,0,0,0.08)"
                    : "none",
                }}
                className={`relative border-b border-gray-200 last:border-none md:rounded-[32px] 
                  ${isOpen ? "md:!p-8 border-transparent" : ""}`}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className={`
                    w-full flex items-start justify-between gap-4 md:gap-6 text-left group focus:outline-none transition-all duration-300
                    ${isOpen ? "py-0" : "py-6 md:py-8"} 
                  `}
                >
                  <div className="flex items-start md:items-center gap-4 md:gap-10">
                    <motion.div
                      animate={{
                        backgroundColor: isOpen ? "#b32a2e" : "rgba(0,0,0,0)",
                        color: isOpen ? "#ffffff" : "#d1d5db",
                        width: isOpen ? 40 : 24,
                        height: isOpen ? 40 : 24,
                        fontSize: isOpen ? "1rem" : "0.875rem",
                      }}
                      className={`shrink-0 flex items-center justify-center font-mono rounded-full 
                        md:w-auto md:h-auto 
                        ${isOpen ? "md:!w-12 md:!h-12 md:!text-xl" : ""}`}
                      transition={{ duration: 0.3 }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </motion.div>

                    <h3
                      className={`text-lg md:text-2xl font-bold font-montserrat transition-colors duration-300 pr-2 pt-1 md:pt-0
                      ${
                        isOpen
                          ? "text-black"
                          : "text-gray-800 group-hover:text-brand-red"
                      }`}
                    >
                      {faq.question}
                    </h3>
                  </div>

                  <div
                    className={`
                    shrink-0 w-8 h-8 flex items-center justify-center transition-transform duration-500 mt-1 md:mt-0
                    ${
                      isOpen
                        ? "rotate-45 text-brand-red"
                        : "rotate-0 text-gray-400 group-hover:text-brand-red"
                    }
                  `}
                  >
                    <Plus
                      size={20}
                      className="md:w-6 md:h-6"
                      strokeWidth={isOpen ? 3 : 2}
                    />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "circOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pl-0 md:pl-[6rem] pr-0 md:pr-4 pt-4 md:pt-6 max-w-3xl">
                        <p className="text-gray-500 leading-relaxed font-montserrat text-sm md:text-base text-justify md:text-left">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
