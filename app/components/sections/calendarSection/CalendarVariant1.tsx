"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  ListFilter,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MONTHS_BASE, CalendarStripProps } from "./CalendarConstants";

export const CalendarVariant1 = ({
  selectedYear,
  selectedMonth,
  onYearChange,
  onMonthSelect,
  events,
}: CalendarStripProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftGradient, setShowLeftGradient] = useState(false);

  // --- 1. STABILNA OŚ CZASU (36 miesięcy w przód) ---
  const timeline = useMemo(() => {
    const now = new Date();
    const startMonthIdx = now.getMonth();
    const startYear = now.getFullYear();
    const monthsToGenerate = 36;

    return Array.from({ length: monthsToGenerate }).map((_, i) => {
      const totalMonths = startMonthIdx + i;
      const yearOffset = Math.floor(totalMonths / 12);
      const monthIndex = totalMonths % 12;
      const year = startYear + yearOffset;
      const monthData = MONTHS_BASE[monthIndex];

      return {
        ...monthData,
        year: year,
        isNewYear: monthData.value === "STY",
        key: `${year}-${monthData.value}`,
      };
    });
  }, []);

  // --- 2. LOGIKA SCROLLA I GRADIENTU ---
  useEffect(() => {
    const container = scrollContainerRef.current;
    const handleScroll = () => {
      if (container) setShowLeftGradient(container.scrollLeft > 10);
    };
    if (container) {
      container.addEventListener("scroll", handleScroll);
      handleScroll();
    }
    return () => container?.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (selectedMonth === "ALL" && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }
    const targetId = `month-${selectedYear}-${selectedMonth}`;
    const targetElement = document.getElementById(targetId);

    if (targetElement && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const containerWidth = container.offsetWidth;
      const targetWidth = targetElement.offsetWidth;
      const targetLeft = targetElement.offsetLeft;
      const scrollPosition = targetLeft - containerWidth / 2 + targetWidth / 2;

      container.scrollTo({ left: scrollPosition, behavior: "smooth" });
    }
  }, [selectedMonth, selectedYear]);

  // --- 3. HANDLERY ---
  const handleMonthClick = (val: string, year: number) => {
    if (year !== selectedYear) onYearChange(year);
    onMonthSelect(val);
  };

  const handleShowAll = () => {
    // Przekazujemy 0 lub null do onYearChange, aby nadrzędny komponent wiedział,
    // że ma wyświetlić WSZYSTKIE lata. Jeśli Twój backend/logika wymaga konkretnej wartości,
    // zmień 0 na null.
    onYearChange(0);
    onMonthSelect("ALL");
  };

  const currentYear = new Date().getFullYear();
  const handlePrevYear = () => {
    // Jeśli selectedYear jest 0 (tryb "Wszystkie"), przywracamy obecny rok
    const baseYear = selectedYear === 0 ? currentYear : selectedYear;
    if (baseYear > currentYear) onYearChange(baseYear - 1);
  };

  const handleNextYear = () => {
    const baseYear = selectedYear === 0 ? currentYear : selectedYear;
    onYearChange(baseYear + 1);
  };

  const BRAND_RED = "#b32a2e";
  const BRAND_GOLD = "#efd075";

  const CARD_SIZE_CLASSES =
    "w-[72px] h-[70px] max-[390px]:w-[54px] max-[390px]:h-[60px] md:w-[88px] md:h-[64px]";

  return (
    <div className="w-full flex flex-col gap-6 font-montserrat select-none max-[487px]:gap-6">
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pl-2 pr-4 max-[487px]:gap-6">
        <div className="flex items-center justify-between w-full md:w-auto">
          <motion.div
            key={selectedYear}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 max-[390px]:gap-2"
          >
            <div className="p-2.5 max-[390px]:p-1.5 rounded-2xl bg-red-50 text-[#b32a2e]">
              {selectedYear !== 0 && (
                <CalendarDays
                  size={24}
                  className="max-[390px]:w-5 max-[390px]:h-5"
                  strokeWidth={1.8}
                />
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] max-[390px]:text-[8px] mb-1 font-bold text-gray-400 uppercase tracking-widest leading-tight">
                Kalendarz Wypraw
              </span>
              <span className="text-3xl max-[390px]:text-2xl font-black text-gray-900 leading-none tracking-tight">
                {selectedYear === 0 ? "Nadchodzące" : selectedYear}
              </span>
            </div>
          </motion.div>

          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={handlePrevYear}
              disabled={selectedYear !== 0 && selectedYear <= currentYear}
              className={`w-10 h-10 max-[390px]:w-8 max-[390px]:h-8 flex items-center justify-center rounded-xl border border-gray-200 bg-white transition-colors shadow-sm pointer-cursor
                        ${selectedYear === 0 || selectedYear > currentYear ? "text-gray-500" : "text-gray-300 opacity-50"}`}
            >
              <ChevronLeft
                size={20}
                className="max-[390px]:w-4 max-[390px]:h-4"
              />
            </button>
            <button
              onClick={handleNextYear}
              className="w-10 h-10 max-[390px]:w-8 max-[390px]:h-8 flex items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-400 hover:border-[#b32a2e] hover:text-[#b32a2e] transition-colors shadow-sm pointer-cursor"
            >
              <ChevronRight
                size={20}
                className="max-[390px]:w-4 max-[390px]:h-4"
              />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center md:justify-end gap-3 w-full md:w-auto">
          <button
            onClick={handleShowAll}
            className={`relative w-fit px-6 h-11 max-[390px]:px-3 max-[390px]:h-9 flex items-center justify-center gap-2 max-[390px]:gap-1 rounded-xl text-xs max-[390px]:text-[10px] font-bold transition-all shadow-sm border pointer-cursor
                    ${
                      selectedMonth === "ALL"
                        ? "bg-[#b32a2e] text-white shadow-red-200 border-[#b32a2e]"
                        : "bg-white text-gray-600 border-gray-300 hover:border-red-200 hover:text-red-600"
                    }`}
          >
            {selectedMonth === "ALL" && (
              <motion.div
                layoutId="active-pill"
                className="absolute inset-0 rounded-xl bg-[#b32a2e]"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2 max-[390px]:gap-1">
              <ListFilter
                size={16}
                className="max-[390px]:w-3 max-[390px]:h-3"
              />
              <span className="whitespace-nowrap uppercase">
                Wszystkie terminy
              </span>
            </span>
          </button>

          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={handlePrevYear}
              disabled={selectedYear !== 0 && selectedYear <= currentYear}
              className={`w-11 h-11 flex items-center justify-center rounded-xl border border-gray-200 bg-white transition-colors shadow-sm pointer-cursor
                        ${selectedYear === 0 || selectedYear > currentYear ? "text-gray-500" : "text-gray-300 cursor-not-allowed opacity-50"}`}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNextYear}
              className="w-11 h-11 flex items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-400 hover:border-[#b32a2e] hover:text-[#b32a2e] transition-colors shadow-sm pointer-cursor"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* --- OŚ CZASU --- */}
      <div className="relative w-full">
        <AnimatePresence>
          {showLeftGradient && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-white via-white/90 to-transparent z-10 pointer-events-none"
            />
          )}
        </AnimatePresence>

        <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-white via-white/90 to-transparent z-10 pointer-events-none" />

        <div
          ref={scrollContainerRef}
          className="flex gap-2 max-[390px]:gap-1.5 md:gap-3 overflow-x-auto no-scrollbar py-2 pb-8 px-4 snap-x scroll-smooth items-center relative z-0"
        >
          {timeline.map((item) => {
            const isActive =
              selectedMonth === item.value && selectedYear === item.year;
            const hasEvents = events.some(
              (e) => e.month === item.value && e.year === item.year,
            );

            return (
              <React.Fragment key={item.key}>
                {item.isNewYear && (
                  <div className="flex flex-col items-center justify-center shrink-0 mx-1 md:mx-3 opacity-100 h-full relative">
                    <div className="h-8 md:h-10 w-px bg-gray-200 mb-1"></div>
                    <span className="text-[10px] max-[390px]:text-[8px] font-black bg-white px-2 py-0.5 border border-gray-100 rounded text-gray-400 shadow-sm whitespace-nowrap">
                      {item.year}
                    </span>
                  </div>
                )}

                <button
                  id={`month-${item.year}-${item.value}`}
                  onClick={() => handleMonthClick(item.value, item.year)}
                  className={`relative shrink-0 ${CARD_SIZE_CLASSES} rounded-2xl pointer-cursor snap-center flex flex-col items-center justify-center outline-none group transition-transform active:scale-95`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-bg-scroll"
                      className="absolute inset-0 rounded-2xl shadow-xl shadow-red-900/30"
                      style={{ backgroundColor: BRAND_RED }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}

                  {!isActive && (
                    <div className="absolute inset-0 rounded-2xl bg-transparent border border-gray-100 group-hover:border-red-100 group-hover:bg-red-50/30 transition-all duration-300" />
                  )}

                  <span
                    className={`relative z-10 text-[8px] md:text-[9px] max-[390px]:text-[7px] font-bold mb-0.5 transition-colors duration-200 
                                ${isActive ? "text-white/80" : "text-gray-400 group-hover:text-red-400"}`}
                  >
                    {item.year}
                  </span>

                  <span
                    className={`relative z-10 text-xs md:text-sm max-[390px]:text-[10px] font-black uppercase tracking-tight transition-colors duration-200 
                                ${isActive ? "text-white" : "text-gray-700 group-hover:text-gray-900"}`}
                  >
                    {item.label.slice(0, 3)}
                  </span>

                  {hasEvents && (
                    <span className="absolute top-1.5 right-1.5 md:top-2 md:right-2 flex h-2 w-2 max-[390px]:h-2.5 max-[390px]:w-2.5 z-20">
                      {!isActive && (
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-[#efd075]"></span>
                      )}
                      <span
                        className={`relative inline-flex rounded-full h-full w-full ring-2 max-[390px]:ring-1 transition-colors
                                            ${isActive ? "ring-[#b32a2e]" : "ring-white"}`}
                        style={{ backgroundColor: BRAND_GOLD }}
                      />
                    </span>
                  )}
                </button>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};
