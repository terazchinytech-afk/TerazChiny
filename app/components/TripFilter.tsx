/* eslint-disable @typescript-eslint/no-explicit-any */
// components/TripFilter.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Calendar,
  ChevronDown,
  Check,
  ChevronRight,
} from "lucide-react";

// ... (Kod CustomSelect BEZ ZMIAN) ...
// (Zakładam, że wiesz gdzie go wkleić - tak jak w poprzednich wersjach)
interface Option {
  label: string;
  value: string;
}
interface CustomSelectProps {
  label: string;
  icon: React.ReactNode;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
}
const CustomSelect = ({
  label,
  icon,
  value,
  options,
  onChange,
}: CustomSelectProps) => {
  // ... (Logika CustomSelect bez zmian) ...
  // (Skrót dla czytelności - użyj pełnego kodu z poprzedniej odpowiedzi)
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedLabel =
    options.find((opt) => opt.value === value)?.label || value;
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      )
        setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div className="space-y-1.5 relative" ref={containerRef}>
      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">
        {label}
      </label>
      <div className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-red-600 pointer-events-none z-10">
          {icon}
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full bg-gray-50 hover:bg-gray-100 border text-left ${isOpen ? "bg-white border-red-100 ring-2 ring-red-50" : "border-transparent"} text-gray-900 text-sm rounded-2xl p-3.5 pl-11 pr-10 cursor-pointer transition-all outline-none font-semibold flex items-center justify-between`}
        >
          <span className="truncate">{selectedLabel}</span>
          <ChevronDown
            size={16}
            className={`text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 top-full mt-2 w-full bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50 py-2"
            >
              {options.map((option) => (
                <div
                  key={option.value}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`px-4 py-3 text-sm font-medium cursor-pointer flex items-center justify-between transition-colors ${option.value === value ? "bg-red-50 text-red-700" : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"}`}
                >
                  <span>{option.label}</span>
                  {option.value === value && (
                    <Check size={14} className="text-red-600" />
                  )}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// --- GŁÓWNY KOMPONENT ---
interface TripFilterProps {
  selectedRegion: string;
  onRegionChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onSearchClick: () => void;
  labels?: any;
  availableRegions?: string[]; // <-- Nowy prop
}

export const TripFilter = ({
  selectedRegion,
  onRegionChange,
  onSearchClick,
  labels,
  availableRegions = [], // Domyślnie pusta tablica
}: TripFilterProps) => {
  const handleRegionSelect = (val: string) => {
    const syntheticEvent = {
      target: { value: val },
    } as React.ChangeEvent<HTMLSelectElement>;
    onRegionChange(syntheticEvent);
  };

  // 1. Budujemy opcje dynamicznie na podstawie unikalnych regionów z bazy
  const defaultRegion = { label: "Całe Chiny", value: "Wszystkie regiony" };

  // Mapujemy stringi regionów na obiekty {label, value}
  const dynamicRegions = availableRegions.map((region) => ({
    label: region,
    value: region,
  }));

  const regionOptions = [defaultRegion, ...dynamicRegions];

  const dateOptions = [
    { label: "Najbliższy termin", value: "Najbliższy termin" },
    { label: "Wiosna 2025", value: "Wiosna 2025" },
    { label: "Jesień 2025", value: "Jesień 2025" },
    { label: "Lato 2026", value: "Lato 2026" },
  ];

  const [date, setDate] = useState(dateOptions[0].value);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="w-full max-w-[400px] bg-white rounded-3xl shadow-2xl shadow-black/20 p-6 relative z-20"
    >
      <div className="mb-5">
        <h3 className="text-xl font-bold text-gray-900">
          {labels?.title || "Znajdź swoją wyprawę"}
        </h3>
        <p className="text-gray-400 text-xs mt-1">
          {labels?.subtitle || "Zaplanuj przygodę życia"}
        </p>
      </div>

      <div className="flex flex-col gap-4 mb-6">
        <CustomSelect
          label={labels?.locationLabel || "Gdzie jedziemy?"}
          icon={<MapPin size={18} />}
          value={selectedRegion}
          options={regionOptions}
          onChange={handleRegionSelect}
        />
      </div>

      <button
        onClick={onSearchClick}
        className="w-full bg-brand-red hover:bg-brand-red/90 text-white font-bold py-4 px-6 rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2 group text-sm"
      >
        <span>{labels?.buttonText || "Szukaj Wyprawy"}</span>
        <ChevronRight
          size={18}
          className="group-hover:translate-x-1 transition-transform"
        />
      </button>
    </motion.div>
  );
};
