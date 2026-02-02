/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { TripFilter } from "../TripFilter";
import { CalendarStrip } from "../CalendarStrip";
import { TripCard } from "../TripCard";

export interface FormattedTrip {
  id: string;
  year: number;
  month: string;
  day: string;
  dates: string;
  duration: string;
  title: string;
  region: string;
  description: string;
  price: string;
  spots: string;
  image: string;
  slug: string;
}

interface CalendarClientProps {
  trips: FormattedTrip[];
  heroData?: any;
  filterData?: any;
  availableRegions: string[]; // <-- Odbieramy listę regionów
}

const ITEMS_PER_PAGE = 4;

export default function CalendarClient({
  trips,
  heroData,
  filterData,
  availableRegions,
}: CalendarClientProps) {
  console.log(trips);

  // Reszta logiki stanu bez zmian...
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRegion, setSelectedRegion] = useState("Wszystkie regiony");
  const defaultYear =
    trips.length > 0 ? trips[0].year : new Date().getFullYear();

  const [selectedYear, setSelectedYear] = useState(defaultYear);
  const [selectedMonth, setSelectedMonth] = useState("ALL");

  const filteredTrips = useMemo(() => {
    let filtered = [...trips];
    if (selectedRegion !== "Wszystkie regiony") {
      filtered = filtered.filter((trip) => trip.region === selectedRegion);
    }
    filtered = filtered.filter((trip) => trip.year === selectedYear);
    if (selectedMonth !== "ALL") {
      filtered = filtered.filter((trip) => trip.month === selectedMonth);
    }
    return filtered;
  }, [selectedRegion, selectedMonth, selectedYear, trips]);

  const totalItems = filteredTrips.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentTrips = filteredTrips.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    document
      .getElementById("lista-wypraw")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRegion(e.target.value);
    setCurrentPage(1);
  };

  const scrollToTrips = () => {
    document
      .getElementById("lista-wypraw")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen font-montserrat bg-gray-50">
      <div className="relative w-full min-h-[650px] h-[85vh] max-[1024px]:h-auto max-[1024px]:pb-12 bg-white max-[1024px]:mb-44">
        <div className="relative h-full w-full rounded-b-[60px] max-[768px]:rounded-b-[40px] shadow-xl z-10">
          <Image
            src={heroData?.heroImage || "/wyjazdy-zdjecie.png"}
            alt="Kalendarz Wypraw"
            fill
            className="object-cover rounded-b-[60px] max-[768px]:rounded-b-[40px]"
            priority
          />
          <div className="absolute inset-0 bg-black/40 rounded-b-[60px] max-[768px]:rounded-b-[40px]" />
          <div className="absolute inset-0 max-[1024px]:relative container mx-auto px-8 max-[480px]:px-4 flex items-center justify-between max-[1024px]:flex-col max-[1024px]:justify-center h-full pt-20 max-[1024px]:pt-32 gap-10">
            <div className="w-1/2 max-[1024px]:w-full text-left max-[1024px]:text-center text-white z-20 max-[1024px]:relative max-[1024px]:top-20">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-7xl max-[1280px]:text-6xl max-[768px]:text-4xl font-black mb-6 leading-tight drop-shadow-xl">
                  {heroData?.titlePart1 || "Stwórz"}{" "}
                  <span className="text-brand-red">
                    {heroData?.titleHighlight || "wspomnienia"}
                  </span>
                  <br />
                  <span className="text-white">
                    {heroData?.titlePart2 || "na całe życie"}
                  </span>
                </h1>
                <p className="text-lg text-white/95 max-w-lg max-[1024px]:mx-auto font-normal drop-shadow-lg leading-relaxed">
                  {heroData?.description || "Chiny to nie tylko Wielki Mur..."}
                </p>
              </motion.div>
            </div>

            {/* Przekazujemy regiony do filtra */}
            <div className="w-1/2 max-[1024px]:w-full flex justify-end max-[1024px]:justify-center z-30 max-[1024px]:relative max-[1024px]:top-[145px]">
              <TripFilter
                selectedRegion={selectedRegion}
                onRegionChange={handleFilterChange}
                onSearchClick={scrollToTrips}
                labels={filterData}
                availableRegions={availableRegions} // <-- TU PRZEKAZUJEMY LISTĘ
              />
            </div>
          </div>
        </div>
      </div>

      <CalendarStrip
        selectedYear={selectedYear}
        selectedMonth={selectedMonth}
        onYearChange={(year) => {
          setSelectedYear(year);
          setCurrentPage(1);
        }}
        onMonthSelect={(month) => {
          setSelectedMonth(month);
          setCurrentPage(1);
        }}
      />

      <section
        id="lista-wypraw"
        className="py-24 max-[768px]:py-12 px-6 max-[480px]:px-4 container mx-auto"
      >
        <div className="flex justify-between items-end max-[768px]:flex-col max-[768px]:items-center mb-12 border-b border-gray-200 pb-6 gap-4">
          <div className="max-[768px]:flex max-[768px]:items-center flex-col">
            <span className="text-xs font-bold text-red-700 uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full border border-red-100 ">
              {selectedMonth === "ALL"
                ? `Rok ${selectedYear}`
                : `${selectedMonth} ${selectedYear}`}
            </span>
            <h2 className="text-4xl max-[768px]:text-3xl font-bold text-gray-900 mt-4">
              Dostępne terminy
            </h2>
          </div>
          <div className="text-sm text-gray-500 font-medium px-4 py-2 rounded-lg bg-white border border-gray-200 shadow-sm">
            Wyświetlanie{" "}
            <span className="font-bold text-gray-900">
              {currentTrips.length > 0 ? indexOfFirstItem + 1 : 0}-
              {Math.min(indexOfLastItem, totalItems)}
            </span>{" "}
            z {totalItems} wypraw
          </div>
        </div>

        {currentTrips.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 max-[768px]:gap-6">
            {currentTrips.map((trip, index) => (
              <TripCard key={trip.id} trip={trip} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 max-[768px]:py-16 bg-white rounded-3xl border border-dashed border-gray-300">
            <div className="text-6xl mb-6 grayscale opacity-50">📅</div>
            <h3 className="text-2xl font-bold text-gray-900">
              Brak wypraw w tym terminie
            </h3>
            <p className="text-gray-500 mt-2">
              Spróbuj zmienić rok lub miesiąc w kalendarzu powyżej.
            </p>
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-20 max-[768px]:mt-12 flex justify-center items-center gap-3">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${currentPage === page ? "bg-brand-red text-white shadow-md scale-110" : "bg-white text-gray-700 border border-gray-200 hover:border-brand-red hover:text-brand-red"}`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
