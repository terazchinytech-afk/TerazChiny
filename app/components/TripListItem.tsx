import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  ChevronRight,
  AlertCircle,
} from "lucide-react";

interface Trip {
  id: number;
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
}

export const TripListItem = ({
  trip,
  index,
}: {
  trip: Trip;
  index: number;
}) => {
  const isAvailable = trip.spots === "available";
  const isLastSpots = trip.spots === "last_spots";
  const isSoldOut = trip.spots === "sold_out";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group relative bg-white rounded-[32px] p-4 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 border border-gray-100 transition-all duration-300 flex flex-col md:flex-row gap-6"
    >
      <div className="relative w-full md:w-64 h-56 md:h-auto shrink-0">
        <div className="relative w-full h-full rounded-[24px] overflow-hidden">
          <Image
            src={trip.image}
            alt={trip.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-lg text-center min-w-[70px]">
          <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            {trip.month}
          </span>
          <span className="block text-2xl font-black text-gray-900 leading-none mt-1">
            {trip.day}
          </span>
        </div>
      </div>

      <div className="flex-grow flex flex-col justify-center py-2">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-bold uppercase tracking-wide">
            <MapPin size={12} /> {trip.region}
          </span>

          {isLastSpots && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-orange-600 text-xs font-bold uppercase tracking-wide border border-orange-100">
              <AlertCircle size={12} /> Ostatnie miejsca
            </span>
          )}
          {isSoldOut && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-gray-400 text-xs font-bold uppercase tracking-wide">
              Wyprzedane
            </span>
          )}
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#b32a2e] transition-colors">
          {trip.title}
        </h3>

        <div className="flex items-center gap-6 text-sm text-gray-500 mb-4 font-medium">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-[#b32a2e]" />
            {trip.dates} {trip.year}
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-[#b32a2e]" />
            {trip.duration}
          </div>
        </div>

        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 md:line-clamp-none max-w-xl">
          {trip.description}
        </p>
      </div>

      <div className="md:w-56 md:border-l border-gray-100 md:pl-6 flex flex-col justify-center items-start md:items-end gap-4 py-2">
        <div className="text-left md:text-right">
          <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">
            Cena od
          </p>
          <div className="flex flex-col">
            <span className="text-lg font-black text-gray-900">
              {trip.price.split("+")[0]}
            </span>
            {trip.price.includes("+") && (
              <span className="text-sm font-bold text-gray-500">
                + {trip.price.split("+")[1]}
              </span>
            )}
          </div>
        </div>

        <button className="w-full md:w-auto bg-gray-900 hover:bg-[#b32a2e] text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group/btn">
          <span>Szczegóły</span>
          <ChevronRight
            size={16}
            className="group-hover/btn:translate-x-1 transition-transform"
          />
        </button>
      </div>
    </motion.div>
  );
};
