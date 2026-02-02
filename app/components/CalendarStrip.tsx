"use client";

import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MONTHS = [
  { label: "Styczeń", value: "STY" },
  { label: "Luty", value: "LUT" },
  { label: "Marzec", value: "MAR" },
  { label: "Kwiecień", value: "KWI" },
  { label: "Maj", value: "MAJ" },
  { label: "Czerwiec", value: "CZE" },
  { label: "Lipiec", value: "LIP" },
  { label: "Sierpień", value: "SIE" },
  { label: "Wrzesień", value: "WRZ" },
  { label: "Październik", value: "PAŹ" },
  { label: "Listopad", value: "LIS" },
  { label: "Grudzień", value: "GRU" },
];

interface CalendarStripProps {
  selectedYear: number;
  selectedMonth: string;
  onYearChange: (year: number) => void;
  onMonthSelect: (month: string) => void;
}

export const CalendarStrip = ({
  selectedYear,
  selectedMonth,
  onYearChange,
  onMonthSelect,
}: CalendarStripProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Funkcja do przewijania scrollbara strzałkami (poniżej 550px)
  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full py-6 z-30 bg-gray-50/50 top-[80px] backdrop-blur-sm border-b border-gray-100">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex flex-col items-center gap-6">
          {/* --- ROK (Własne strzałki widoczne zawsze) --- */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => onYearChange(selectedYear - 1)}
              className="p-2 rounded-full hover:bg-white hover:shadow-sm transition-all text-gray-400 hover:text-red-600"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="relative">
              <h2 className="text-4xl max-[550px]:text-3xl font-black text-gray-900 tracking-tight">
                {selectedYear}
              </h2>
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-10 h-1 bg-red-600 rounded-full" />
            </div>

            <button
              onClick={() => onYearChange(selectedYear + 1)}
              className="p-2 rounded-full hover:bg-white hover:shadow-sm transition-all text-gray-400 hover:text-red-600"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* --- KONTROLER MIESIĘCY --- */}
          <div className="flex items-center w-full gap-2">
            {/* Strzałka Scrolla Lewo (Tylko < 550px) */}
            <button
              onClick={() => scroll("left")}
              className="hidden max-[550px]:flex shrink-0 p-2 text-gray-400 hover:text-red-600"
            >
              <ChevronLeft size={24} />
            </button>

            {/* KONTENER MIESIĘCY */}
            {/* desktop: wrap | mobile: no-wrap + scroll */}
            <div
              ref={scrollContainerRef}
              className="flex flex-wrap max-[550px]:flex-nowrap justify-center max-[550px]:justify-start gap-2 grow overflow-x-auto no-scrollbar py-2 px-1"
            >
              <button
                onClick={() => onMonthSelect("ALL")}
                className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide transition-all border
                  ${
                    selectedMonth === "ALL"
                      ? "bg-gray-900 text-white border-gray-900 shadow-md ring-2 ring-gray-200"
                      : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"
                  }`}
              >
                Cały rok
              </button>

              {MONTHS.map((m) => {
                const isActive = selectedMonth === m.value;
                return (
                  <button
                    key={m.value}
                    onClick={() => onMonthSelect(m.value)}
                    className={`shrink-0 px-4 py-2 rounded-full text-sm font-bold transition-all border
                      ${
                        isActive
                          ? "bg-red-700 text-white border-red-700 shadow-md transform scale-105"
                          : "bg-white text-gray-600 border-gray-200 hover:border-red-100 hover:text-red-700"
                      }`}
                  >
                    {/* Na bardzo małych ekranach (< 400px) pokazuj skróty STY, LUT itd. */}
                    <span className="max-[400px]:hidden">{m.label}</span>
                    <span className="min-[401px]:hidden">{m.value}</span>
                  </button>
                );
              })}
            </div>

            {/* Strzałka Scrolla Prawo (Tylko < 550px) */}
            <button
              onClick={() => scroll("right")}
              className="hidden max-[550px]:flex shrink-0 p-2 text-gray-400 hover:text-red-600"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Styl ukrywający scrollbar (możesz go też wrzucić do global.css) */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};
