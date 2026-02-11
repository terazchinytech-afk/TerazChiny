"use client";

import React, { useMemo } from "react";
import { ListFilter } from "lucide-react";
import { motion } from "framer-motion";
import { MONTHS_BASE, CalendarStripProps } from "./CalendarConstants";

export const CalendarVariant4 = ({
  selectedYear,
  selectedMonth,
  onYearChange,
  onMonthSelect,
  events,
}: CalendarStripProps) => {
  // --- 1. OBLICZANIE DOSTĘPNYCH LAT ---
  const availableYears = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const eventYears = new Set(events.map((e) => e.year));
    eventYears.add(currentYear);
    eventYears.add(currentYear + 1);

    return Array.from(eventYears).sort((a, b) => a - b);
  }, [events]);

  // --- 2. HANDLERY ---
  const handleShowAll = () => {
    onYearChange(0);
    onMonthSelect("ALL");
  };

  const handleYearTabClick = (year: number) => {
    onYearChange(year);
    if (selectedMonth !== "ALL") onMonthSelect("ALL");
  };

  return (
    <div className="w-full flex flex-col gap-6 font-montserrat select-none">
      {/* --- SEKCJA ZAKŁADEK (LATA) --- */}
      <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4">
        {/* Przycisk WSZYSTKIE */}
        <button
          onClick={handleShowAll}
          className={`relative px-5 h-10 rounded-full flex items-center gap-2 text-xs font-bold transition-all border
            ${
              selectedYear === 0
                ? "bg-[#b32a2e] text-white border-[#b32a2e] shadow-md shadow-red-200"
                : "bg-white text-gray-500 border-gray-200 hover:border-red-200 hover:text-red-600"
            }`}
        >
          <ListFilter size={14} />
          <span>WSZYSTKIE</span>
        </button>

        <div className="w-px h-6 bg-gray-200 mx-2 hidden md:block"></div>

        {/* Zakładki Lat */}
        {availableYears.map((year) => {
          const isActive = selectedYear === year;
          return (
            <button
              key={year}
              onClick={() => handleYearTabClick(year)}
              className={`relative px-6 h-10 rounded-full text-sm font-black transition-all border
                ${
                  isActive
                    ? "text-white border-[#b32a2e] shadow-md shadow-red-200"
                    : "bg-white text-gray-400 border-gray-200 hover:border-red-200 hover:text-gray-800"
                }`}
            >
              {isActive && (
                <motion.div
                  layoutId="active-year-tab"
                  className="absolute inset-0 rounded-full bg-[#b32a2e]"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{year}</span>
            </button>
          );
        })}
      </div>

      {/* --- SIATKA MIESIĘCY --- */}
      <div className="relative w-full bg-white rounded-3xl border border-gray-100 p-4 md:p-6 shadow-sm">
        {/* Jeśli wybrano "Wszystkie" (Rok 0) */}
        {selectedYear === 0 ? (
          <div className="flex flex-col items-center justify-center py-6 text-center gap-2">
            <div className="p-2.5 bg-red-50 text-[#b32a2e] rounded-xl">
              <ListFilter size={20} />
            </div>
            <div>
              <h3 className="text-gray-900 font-bold text-base">
                Wszystkie terminy
              </h3>
              <p className="text-gray-400 text-xs max-w-xs mx-auto">
                Wyświetlamy listę wszystkich dostępnych wypraw.
              </p>
            </div>
          </div>
        ) : (
          /* Siatka 12 miesięcy */
          <motion.div
            key={selectedYear}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 md:gap-3"
          >
            {MONTHS_BASE.map((month) => {
              const hasEvents = events.some(
                (e) => e.year === selectedYear && e.month === month.value,
              );

              const isActive = selectedMonth === month.value;

              return (
                <button
                  key={month.value}
                  onClick={() => hasEvents && onMonthSelect(month.value)}
                  disabled={!hasEvents}
                  className={`
                    relative flex items-center justify-center h-[46px] rounded-xl border transition-all duration-200
                    text-xs font-black uppercase tracking-wider
                    ${
                      hasEvents
                        ? "cursor-pointer hover:border-red-200 hover:text-[#b32a2e] hover:shadow-sm"
                        : "cursor-not-allowed opacity-25 bg-gray-50 border-transparent text-gray-400"
                    }
                    ${
                      isActive
                        ? "border-[#b32a2e] bg-red-50 text-[#b32a2e]"
                        : "border-gray-100 bg-white text-gray-600"
                    }
                  `}
                >
                  {month.label}
                </button>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
};
