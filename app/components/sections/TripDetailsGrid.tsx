"use client";
import React from "react";
import { Calendar, Clock, Users, ShieldCheck } from "lucide-react";

export const TripDetailsGrid = ({ trip }: { trip: any }) => {
  const stats = [
    {
      label: "Termin wyprawy",
      value: trip.dates,
      icon: Calendar,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      label: "Czas trwania",
      value: trip.duration,
      icon: Clock,
      color: "text-emerald-500",
      bgColor: "bg-emerald-50",
    },
    {
      label: "Wielkość grupy",
      value: "Max 12 osób",
      icon: Users,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
    {
      label: "Gwarancja",
      value: "Pewny termin",
      icon: ShieldCheck,
      color: "text-[#b32a2e]",
      bgColor: "bg-red-50",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 p-6 md:p-8 bg-white border border-gray-100 rounded-[2rem] mb-12 shadow-sm">
      {stats.map((stat, index) => (
        <div key={index} className="flex flex-col gap-3 group">
          {/* Ikona z subtelnym tłem */}
          <div
            className={`w-10 h-10 rounded-xl ${stat.bgColor} flex items-center justify-center transition-transform group-hover:scale-110 duration-300`}
          >
            <stat.icon size={20} className={stat.color} />
          </div>

          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5">
              {stat.label}
            </span>
            <span className="font-bold text-gray-900 text-sm md:text-base leading-tight">
              {stat.value}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
