/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Clock,
  MapPin,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  Calendar as CalendarIcon,
} from "lucide-react";

const getOptimizedImageUrl = (url: string, width = 400) => {
  if (!url) return "";
  try {
    const optimizedUrl = new URL(url);
    optimizedUrl.searchParams.set("w", width.toString());
    optimizedUrl.searchParams.set("q", "75");
    optimizedUrl.searchParams.set("auto", "format");
    return optimizedUrl.href;
  } catch (e) {
    return url;
  }
};

const getStatusText = (status: string) => {
  const s = status?.replace("-", "_");
  switch (s) {
    case "available":
      return {
        text: "Dostępne miejsca",
        color: "text-green-600",
        icon: CheckCircle,
      };
    case "last_spots":
      return {
        text: "Ostatnie miejsca!",
        color: "text-orange-600",
        icon: AlertCircle,
      };
    case "sold_out":
      return { text: "Lista rezerwowa", color: "text-gray-400", icon: Clock };
    default:
      return { text: "Dostępne", color: "text-green-600", icon: CheckCircle };
  }
};

const formatDate = (dateString: string) => {
  if (!dateString) return { day: "--", month: "---", year: "----" };
  const date = new Date(dateString);
  return {
    day: date.getDate().toString().padStart(2, "0"),
    month: date.toLocaleString("pl-PL", { month: "short" }).toUpperCase(),
    year: date.getFullYear().toString(),
  };
};

interface Trip {
  title: string;
  slug: { current: string };
  date: string;
  duration: string;
  price: string;
  status: string;
  mainImage: string;
}

interface CalendarSectionProps {
  data: {
    header: {
      badge: string;
      title: {
        fullText: string;
        highlight: string;
      };
      description: string;
      ctaText: string;
      ctaLink: string;
    };
    tripsSettings: {
      selectedTrips: Trip[];
    };
  };
}

export const CalendarSection = ({ data }: CalendarSectionProps) => {
  if (!data) return null;

  const { header, tripsSettings } = data;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const trips = useMemo(
    () => tripsSettings?.selectedTrips || [],
    [tripsSettings],
  );
  const hasTrips = trips.length > 0;

  const titleParts = useMemo(
    () =>
      header.title.fullText.split(
        new RegExp(`(${header.title.highlight})`, "gi"),
      ),
    [header.title.fullText, header.title.highlight],
  );
  console.log(data);

  return (
    <section className="w-full bg-gray-50 landing-spacing py-32">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 min-[1110px]:grid-cols-12 gap-12 min-[1110px]:gap-8">
          <div className="min-[1110px]:col-span-4 relative">
            <div className="min-[1110px]:sticky min-[1110px]:top-32">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-6 min-w-[360px] max-[1110px]:flex max-[1110px]:flex-col max-[1110px]:items-center max-[1110px]:text-center max-[390px]:min-w-auto"
              >
                {header.badge && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full shadow-sm text-xs font-bold uppercase tracking-widest text-white bg-brand-red">
                    <TrendingUp size={14} /> {header.badge}
                  </div>
                )}

                <h2 className="text-3xl max-[812px]:text-4xl lg:text-5xl font-montserrat font-black text-black leading-tight max-[812px]:text-center">
                  {titleParts.map((part, i) =>
                    part.toLowerCase() ===
                    header.title.highlight?.toLowerCase() ? (
                      <span
                        key={i}
                        className="italic font-serif text-brand-red"
                      >
                        {part}
                      </span>
                    ) : (
                      <span key={i}>{part}</span>
                    ),
                  )}
                </h2>

                <p className="text-gray-500 leading-relaxed text-sm md:text-base max-w-sm">
                  {header.description}
                </p>

                <div className="pt-4 hidden min-[1110px]:block">
                  <Link
                    href={header.ctaLink || "/kalendarz-wypraw"}
                    className="inline-flex items-center gap-3 font-bold text-black hover:text-brand-red transition-colors group"
                  >
                    <div className="w-12 h-12 bg-brand-red text-white rounded-full flex items-center justify-center group-hover:bg-brand-red transition-colors duration-300">
                      <ArrowRight size={20} />
                    </div>
                    <span className="text-sm uppercase tracking-wider">
                      {header.ctaText}
                    </span>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="min-[1110px]:col-span-8 flex flex-col gap-6">
            {!hasTrips ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center justify-center text-center p-12 bg-white rounded-2xl border border-dashed border-gray-300 min-h-[400px]"
              >
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                  <CalendarIcon size={40} className="text-gray-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 font-montserrat">
                  Brak zaplanowanych terminów
                </h3>
                <p className="text-gray-500 max-w-md mb-8 leading-relaxed">
                  Aktualnie dopinamy szczegóły wypraw na nadchodzący sezon.
                </p>
              </motion.div>
            ) : (
              trips.map((trip, index) => {
                const statusInfo = getStatusText(trip.status);
                const StatusIcon = statusInfo.icon;
                const isSoldOut = trip.status?.replace("-", "_") === "sold_out";
                const dateObj = formatDate(trip.date);
                console.log(trip.slug.current);

                return (
                  <motion.div
                    key={trip.slug?.current || index}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={
                        isSoldOut
                          ? "#"
                          : `/kalendarz-wypraw/${trip.slug.current}`
                      }
                      aria-disabled={isSoldOut}
                      className={`block relative transition-all duration-300 ${isSoldOut ? "opacity-60 grayscale cursor-not-allowed pointer-events-none" : "group"}`}
                    >
                      <div
                        className={`flex flex-col md:flex-row bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 transition-all duration-300 ${!isSoldOut ? "group-hover:shadow-2xl group-hover:-translate-y-1" : ""}`}
                      >
                        {/* 1. SEKCJA DATY (Zoptymalizowana LCP) */}
                        <div className="relative md:w-[160px] min-h-[140px] md:min-h-0 p-6 flex flex-row md:flex-col items-center justify-center gap-4 md:gap-1 text-center overflow-hidden">
                          {trip.mainImage && (
                            <Image
                              src={getOptimizedImageUrl(trip.mainImage, 400)}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-110"
                              alt={trip.title}
                              sizes="160px"
                              priority={index === 0} // Kluczowe dla LCP
                            />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/60 z-10" />
                          <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-gray-50 rounded-full hidden md:block z-20" />

                          <div className="relative z-20 text-white">
                            <span className="text-4xl md:text-5xl font-black block tracking-tighter drop-shadow-md">
                              {dateObj.day}
                            </span>
                            <span className="text-sm font-bold uppercase tracking-[0.2em] block">
                              {dateObj.month}
                            </span>
                            <span className="text-xs opacity-80 block mt-1">
                              {dateObj.year}
                            </span>
                          </div>
                        </div>

                        {/* 2. GŁÓWNA TREŚĆ */}
                        <div className="flex-1 p-6 md:p-8 flex flex-col justify-center border-b md:border-b-0 md:border-r border-gray-100 border-dashed relative bg-white">
                          <div
                            className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider mb-3 ${statusInfo.color}`}
                          >
                            <StatusIcon size={12} /> {statusInfo.text}
                          </div>

                          <h3 className="text-xl font-bold font-montserrat text-black mb-4 group-hover:text-brand-red transition-colors">
                            {trip.title}
                          </h3>

                          <div className="flex flex-wrap gap-4 text-sm font-medium text-gray-500">
                            <span className="flex items-center gap-1.5">
                              <Clock size={15} className="text-black" />
                              {trip.duration}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <MapPin size={15} className="text-black" /> Chiny
                            </span>
                          </div>
                          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-gray-50 rounded-full md:hidden z-10" />
                        </div>

                        {/* 3. CENA I CTA */}
                        <div className="md:w-[220px] p-6 flex flex-row md:flex-col items-center md:justify-center justify-between gap-2 bg-gray-50/50 group-hover:bg-brand-red/5 transition-colors">
                          <div className="text-right md:text-center">
                            <span className="block text-[10px] uppercase text-gray-400 font-bold mb-1 max-[768px]:text-start">
                              Cena od
                            </span>
                            <span className="block text-2xl font-black text-black">
                              {trip.price}
                            </span>
                          </div>

                          <div className="hidden md:flex mt-2 items-center gap-2 text-xs font-black uppercase tracking-widest text-brand-red opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                            Zobacz <ArrowRight size={14} />
                          </div>

                          <div
                            className={`md:hidden p-2 rounded-lg ${isSoldOut ? "bg-gray-200 text-gray-400" : "bg-black text-white"}`}
                          >
                            <ArrowRight size={20} />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })
            )}
          </div>

          <div className="min-[1110px]:hidden mt-8 flex justify-center">
            <Link
              href={header.ctaLink || "/kalendarz-wypraw"}
              className="flex items-center gap-2 text-sm font-bold border-b-2 border-brand-red pb-1"
            >
              {header.ctaText} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
