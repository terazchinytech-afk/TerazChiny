"use client";

import React, { useMemo } from "react";
import { ListFilter } from "lucide-react";
import { motion } from "framer-motion";
import { MONTHS_BASE, CalendarStripProps } from "./CalendarConstants";

export const CalendarVariant5 = ({
  selectedYear,
  selectedMonth,
  onYearChange,
  onMonthSelect,
  events,
}: CalendarStripProps) => {
  const BRAND_COLOR = "#b32a2e"; // Możesz zmienić na pomarańczowy #f97316 jeśli wolisz kolor ze screena

  // --- 1. OBLICZANIE DOSTĘPNYCH LAT ---
  const yearsToDisplay = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const eventYears = new Set(events.map((e) => e.year));
    // Gwarantujemy obecny i następny rok
    eventYears.add(currentYear);
    eventYears.add(currentYear + 1);

    return Array.from(eventYears).sort((a, b) => a - b);
  }, [events]);

  // --- 2. HANDLERY ---
  const handleShowAll = () => {
    onYearChange(0);
    onMonthSelect("ALL");
  };

  const handleMonthClick = (monthVal: string, year: number) => {
    if (year !== selectedYear) onYearChange(year);
    onMonthSelect(monthVal);
  };

  return (
    <div className="w-full flex flex-col gap-8 font-montserrat select-none pb-4">
      {/* --- GÓRA: PRZYCISK "WSZYSTKIE" --- */}
      <div className="flex justify-center w-full mb-4">
        <button
          onClick={handleShowAll}
          className={`relative px-6 h-9 flex items-center justify-center gap-2 rounded-full text-xs font-bold transition-all
            ${
              selectedYear === 0
                ? "bg-[#b32a2e] text-white shadow-md shadow-red-200"
                : "bg-white text-gray-500 border border-gray-200 hover:border-red-200 hover:text-red-600"
            }`}
        >
          {selectedYear === 0 && (
            <motion.div
              layoutId="active-pill-v5"
              className="absolute inset-0 rounded-full bg-[#b32a2e]"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-2">
            <ListFilter size={14} />
            <span className="uppercase tracking-wide">Wszystkie terminy</span>
          </span>
        </button>
      </div>

      {/* --- LISTA ROCZNA --- */}
      <div className="flex flex-col gap-6 px-2 md:px-0">
        {yearsToDisplay.map((year) => (
          <div
            key={year}
            className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-6 border-b border-gray-100 pb-5 last:border-0 last:pb-0"
          >
            {/* ETYKIETA ROKU (Badge) */}
            <div className="shrink-0 pt-1 md:pt-0">
              <span
                className={`inline-block px-3 py-1 rounded bg-gray-100 text-sm font-bold tracking-wide
                    ${selectedYear === year ? "text-[#b32a2e]" : "text-gray-500/80"}
                `}
              >
                {year}
              </span>
            </div>

            {/* LISTA MIESIĘCY */}
            <div className="grow w-full overflow-x-auto no-scrollbar">
              <div className="flex items-center gap-4 md:gap-6 min-w-max pb-1">
                {/* pb-1 dodane by zrobić miejsce na podkreślenie */}

                {MONTHS_BASE.map((month) => {
                  // Sprawdzamy czy w tym miesiącu są wyjazdy
                  const hasEvents = events.some(
                    (e) => e.year === year && e.month === month.value,
                  );

                  // Wyświetlamy TYLKO miesiące z wyjazdami (jak na screenie)
                  if (!hasEvents) return null;

                  const isActive =
                    selectedYear === year && selectedMonth === month.value;

                  return (
                    <button
                      key={`${year}-${month.value}`}
                      onClick={() => handleMonthClick(month.value, year)}
                      className={`relative py-1 text-sm md:text-[15px] font-bold transition-colors duration-200 lowercase
                                    ${
                                      isActive
                                        ? "text-black"
                                        : "text-black hover:text-[#b32a2e]"
                                    }
                                `}
                    >
                      {month.label.toLowerCase()}

                      {/* Aktywna linia (podkreślenie) */}
                      {isActive && (
                        <motion.div
                          layoutId="active-underline-thick"
                          className="absolute -bottom-1.5 left-0 right-0 h-[3px]"
                          style={{ backgroundColor: BRAND_COLOR }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 30,
                          }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
