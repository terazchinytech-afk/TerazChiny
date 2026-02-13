"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface TripFAQProps {
  faqData: FAQItem[];
}

const AccordionItem = ({
  item,
  isOpen,
  onClick,
}: {
  item: FAQItem;
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <div className="border-b border-gray-100 last:border-0 overflow-hidden">
      <button
        onClick={onClick}
        className="w-full py-6 flex items-center justify-between text-left group transition-all"
        aria-label="Rozwiń odpowiedź"
      >
        <span
          className={`text-lg font-bold transition-colors ${isOpen ? "text-[#b32a2e]" : "text-gray-900 group-hover:text-[#b32a2e]"}`}
        >
          {item.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          className={`${isOpen ? "text-[#b32a2e]" : "text-gray-400"}`}
        >
          <ChevronDown size={22} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <p className="pb-8 text-gray-500 leading-relaxed max-w-[90%]">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const TripFAQ = ({ faqData }: TripFAQProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!faqData || faqData.length === 0) return null;

  return (
    <section className="mt-20">
      <div className="flex items-center gap-4 mb-10">
        <div className="p-3 bg-red-50 rounded-2xl text-[#b32a2e]">
          <HelpCircle size={28} />
        </div>
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">
            FAQ
          </h2>
          <p className="text-sm text-gray-400 font-medium">
            Wszystko, co musisz wiedzieć przed wylotem
          </p>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 md:p-12 shadow-sm max-[500px]:px-4">
        <div className="flex flex-col">
          {faqData.map((item, index) => (
            <AccordionItem
              key={index}
              item={item}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
