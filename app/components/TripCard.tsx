"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Users,
  Clock,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

// --- INTERFEJSY ---
export interface Trip {
  slug: string;
  id: string;
  year: number;
  month: string;
  day: string;
  dates: string;
  duration: string;
  title: string;
  description: string;
  price: string;
  spots: string;
  image: string;
}

interface TripCardProps {
  trip: Trip;
  index: number;
}

// --- FUNKCJA TRUNCATE ---
const truncateText = (text: string, maxLength: number) => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  const truncated = text.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");
  return truncated.slice(0, lastSpace > 0 ? lastSpace : maxLength) + "...";
};

// --- STATUS BADGE ---
const StatusBadge = ({ status }: { status: string }) => {
  if (status === "sold_out") {
    return (
      <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-gray-400 bg-gray-100 px-3 py-1.5 rounded-full border border-gray-200">
        <AlertCircle size={12} /> Lista rezerwowa
      </span>
    );
  }
  if (status === "last_spots") {
    return (
      <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#b32a2e] bg-red-50 px-3 py-1.5 rounded-full border border-red-100">
        <AlertCircle size={12} /> Ostatnie miejsca
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
      <CheckCircle2 size={12} /> Dostępny
    </span>
  );
};

export const TripCard = ({ trip, index }: TripCardProps) => {
  const isSoldOut = trip.spots === "sold_out";
  const DESC_LIMIT = 240;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className={`
        group flex flex-col min-[1031px]:flex-row w-full bg-white rounded-3xl shadow-sm border border-gray-100 
        hover:shadow-xl transition-all duration-300 overflow-hidden
        ${isSoldOut ? "opacity-60 grayscale-[0.8] pointer-events-none" : ""}
      `}
    >
      {/* 1. ZDJĘCIE */}
      <div className="relative w-full min-[1031px]:basis-80 shrink-0 h-64 min-[1031px]:h-auto overflow-hidden">
        <Image
          src={trip.image}
          alt={trip.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl text-center shadow-lg min-w-[70px] z-10">
          <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">
            {trip.month}
          </span>
          <span className="block text-2xl font-black text-[#b32a2e] leading-none">
            {trip.day}
          </span>
        </div>
      </div>

      {/* 2. TREŚĆ */}
      <div className="flex flex-col flex-1 p-6 min-[1031px]:p-8 min-w-0">
        {/* Info bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <StatusBadge status={trip.spots} />
          <div className="flex items-center gap-4 text-xs font-medium text-gray-400">
            <span className="flex items-center gap-1.5">
              <Clock size={16} /> {trip.duration}
            </span>
            <span className="flex items-center gap-1.5">
              <Users size={16} /> Max 12
            </span>
          </div>
        </div>

        {/* Tytuł i Opis */}
        <div className="flex-grow min-w-0">
          <h3 className="text-xl min-[1031px]:text-2xl font-bold text-gray-900 group-hover:text-[#b32a2e] transition-colors leading-tight mb-3 break-words">
            {trip.title}
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed font-medium break-words whitespace-normal">
            {truncateText(trip.description, DESC_LIMIT)}
          </p>
        </div>

        {/* STOPKA DLA MOBILE (poniżej 1030px) */}
        <div className="flex min-[1031px]:hidden items-center justify-between pt-6 border-t border-gray-100 mt-6 max-[550px]:mt-4 max-[550px]:pt-4">
          <div className="flex flex-col">
            <p className="text-[10px] uppercase font-bold text-gray-400 mb-0.5">
              Cena od osoby
            </p>
            <p className="font-black text-gray-900 text-lg max-[550px]:text-base leading-none">
              {trip.price}
            </p>
          </div>

          <Link
            href={`/kalendarz-wypraw/${trip.id}`}
            className="max-[550px]:ml-4"
          >
            {/* Przycisk zmienia się na mniejszy (tylko ikona lub krótki tekst) poniżej 550px */}
            <button className="bg-[#b32a2e] text-white px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 max-[550px]:px-4 max-[550px]:py-2.5 max-[550px]:text-xs transition-all active:scale-95">
              <span className="max-[380px]:hidden">Szczegóły</span>
              <ArrowRight
                size={16}
                className="max-[550px]:w-4 max-[550px]:h-4"
              />
            </button>
          </Link>
        </div>
      </div>

      {/* 3. PANEL CENY DLA DESKTOP (powyżej 1030px) */}
      <div className="hidden min-[1031px]:flex flex-col justify-between items-end w-72 shrink-0 p-8 bg-gray-50/50 border-l border-gray-100 group-hover:bg-[#b32a2e]/5 transition-colors text-right">
        <div className="flex flex-col gap-1">
          <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
            Cena od osoby
          </p>
          <p className="text-2xl font-black text-gray-900 leading-tight">
            {trip.price}
          </p>
        </div>

        <Link href={`/kalendarz-wypraw/${trip.slug}`} className="w-full">
          <button className="w-full py-4 rounded-2xl bg-[#b32a2e] text-white text-[11px] font-bold uppercase tracking-widest hover:bg-[#962326] transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md">
            Szczegóły <ArrowRight size={14} />
          </button>
        </Link>
      </div>
    </motion.div>
  );
};
