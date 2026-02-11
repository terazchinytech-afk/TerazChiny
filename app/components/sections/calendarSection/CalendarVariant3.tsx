"use client";

import React, { useMemo } from "react";
import { ListFilter, Sun, Snowflake, Leaf, Sprout } from "lucide-react";
import { motion } from "framer-motion";
import { CalendarStripProps } from "./CalendarConstants";

// Konfiguracja 5 bloków chronologicznych
const SEASONAL_RANGES = [
  {
    id: "early_winter",
    label: "ZIMA",
    months: ["STY", "LUT"],
    displayRange: "STY • LUT",
    icon: Snowflake,
  },
  {
    id: "spring",
    label: "WIOSNA",
    months: ["MAR", "KWI", "MAJ"],
    displayRange: "MAR • KWI • MAJ",
    icon: Sprout,
  },
  {
    id: "summer",
    label: "LATO",
    months: ["CZE", "LIP", "SIE"],
    displayRange: "CZE • LIP • SIE",
    icon: Sun,
  },
  {
    id: "autumn",
    label: "JESIEŃ",
    months: ["WRZ", "PAŹ", "LIS"],
    displayRange: "WRZ • PAŹ • LIS",
    icon: Leaf,
  },
  {
    id: "late_winter",
    label: "GRUDZIEŃ",
    months: ["GRU"],
    displayRange: "GRUDZIEŃ",
    icon: Snowflake,
  },
];

export const CalendarVariant3 = ({
  selectedYear,
  selectedMonth,
  onYearChange,
  onMonthSelect,
  events,
}: CalendarStripProps) => {
  // --- 1. WYBÓR LAT DO WYŚWIETLENIA ---
  // Pobieramy obecny rok i następny (lub więcej, jeśli wolisz)
  const yearsToDisplay = useMemo(() => {
    const currentYear = new Date().getFullYear();
    // Generujemy tablicę lat: [Obecny, Obecny+1] -> np. [2026, 2027]
    return [currentYear, currentYear + 1];
  }, []);

  // --- 2. HANDLERY ---
  const handleRangeClick = (rangeId: string, year: number) => {
    // Jeśli kliknięto w ten sam, odznaczamy (opcjonalne, tu zostawiam proste przełączanie)
    if (year !== selectedYear) onYearChange(year);
    onMonthSelect(rangeId);
  };

  const handleShowAll = () => {
    onYearChange(0);
    onMonthSelect("ALL");
  };

  const BRAND_RED = "#b32a2e";

  // Styl kafelka - kompaktowy, żeby zmieścić 5 w rzędzie
  // Na mobile (max-390) jeszcze mniejszy
  const CARD_CLASS =
    "relative flex-1 min-w-[58px] h-[72px] md:h-[80px] rounded-xl flex flex-col items-center justify-center gap-0.5 pointer-cursor transition-transform active:scale-95 border select-none";

  return (
    <div className="w-full flex flex-col gap-8 font-montserrat pb-4">
      {/* --- GÓRA: BUTTON WSZYSTKIE (Wycentrowany) --- */}
      <div className="flex justify-center w-full">
        <button
          onClick={handleShowAll}
          className={`relative px-8 h-10 flex items-center justify-center gap-2 rounded-full text-xs font-bold transition-all shadow-sm border
            ${
              selectedMonth === "ALL" && selectedYear === 0
                ? "bg-[#b32a2e] text-white shadow-red-200 border-[#b32a2e]"
                : "bg-white text-gray-600 border-gray-200 hover:border-red-200 hover:text-red-600"
            }`}
        >
          {selectedMonth === "ALL" && selectedYear === 0 && (
            <motion.div
              layoutId="active-pill-centered"
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

      {/* --- SIATKA LAT (2 Kolumny na Desktop, 1 na Mobile) --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 px-2 md:px-4">
        {yearsToDisplay.map((year) => (
          <div key={year} className="flex flex-col gap-5">
            {/* Nagłówek Roku z liniami */}
            <div className="flex items-center gap-4">
              <div className="h-px bg-gray-200 grow rounded-full"></div>
              <span className="text-xl md:text-2xl font-black text-gray-300 tracking-tight">
                {year}
              </span>
              <div className="h-px bg-gray-200 grow rounded-full"></div>
            </div>

            {/* Lista 5 Sezonów */}
            <div className="flex justify-between gap-2">
              {SEASONAL_RANGES.map((range) => {
                const isActive =
                  selectedYear === year && selectedMonth === range.id;
                const Icon = range.icon;

                // Sprawdzamy dostępność
                const hasEvents = events.some(
                  (e) => e.year === year && range.months.includes(e.month),
                );

                // Styl wyszarzenia
                const opacityClass = hasEvents
                  ? "opacity-100"
                  : "opacity-40 grayscale";
                const borderClass = isActive
                  ? "border-[#b32a2e]" // Aktywny border (zastąpiony bg w motion)
                  : "bg-white border-gray-100 hover:border-red-100";

                return (
                  <button
                    key={`${year}-${range.id}`}
                    onClick={() => handleRangeClick(range.id, year)}
                    className={`${CARD_CLASS} ${opacityClass} ${borderClass}`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-season-bg"
                        className="absolute inset-0 rounded-xl shadow-lg shadow-red-900/20"
                        style={{ backgroundColor: BRAND_RED }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}

                    {/* Ikona */}
                    <div
                      className={`relative z-10 ${isActive ? "text-white" : "text-gray-400 group-hover:text-red-400"}`}
                    >
                      <Icon size={16} strokeWidth={2} />
                    </div>

                    {/* Etykieta */}
                    <span
                      className={`relative z-10 text-[9px] md:text-[10px] font-black uppercase tracking-tight mt-0.5 ${isActive ? "text-white" : "text-gray-700"}`}
                    >
                      {range.label}
                    </span>

                    {/* Zakres miesięcy (np. STY•LUT) */}
                    <span
                      className={`relative z-10 text-[7px] font-medium uppercase tracking-wide opacity-80 ${isActive ? "text-red-100" : "text-gray-400"}`}
                    >
                      {range.displayRange.replace(/ • /g, "·")}{" "}
                      {/* Oszczędność miejsca znakiem kropki środkowej */}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
