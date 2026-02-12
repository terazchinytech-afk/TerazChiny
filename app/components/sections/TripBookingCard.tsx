"use client";
import React from "react";
import Link from "next/link";
import { ShieldCheck, Calendar } from "lucide-react";

interface TripBookingCardProps {
  price: string;
  bookingUrl?: string;
  tripTitle: string;
  tripSlug: string;
}

export const TripBookingCard = ({
  price,
  bookingUrl,
  tripTitle,
  tripSlug,
}: TripBookingCardProps) => {
  const safePrice = price || "Cena wkrótce";

  const parts = safePrice.includes("+")
    ? safePrice.split("+")
    : [safePrice, ""];
  const pln = parts[0].trim();
  const usd = parts[1] ? parts[1].trim() : null;

  const internalBookingPath = {
    pathname: "/rezerwacja",
    query: {
      trip: tripTitle,
      ref: tripSlug,
    },
  };

  const finalHref = bookingUrl || internalBookingPath;
  const isAvailable = Boolean(bookingUrl || tripSlug);

  return (
    <aside className="lg:w-96">
      <div className="sticky top-24 bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-xl shadow-gray-200/50">
        <div className="mb-8">
          <span className="text-gray-400 text-xs font-bold uppercase block mb-2">
            Cena wyprawy
          </span>
          <div className="flex flex-col">
            <span className="text-3xl font-black text-gray-900 leading-tight">
              {pln}
            </span>
            {usd && (
              <span className="text-xl font-bold text-[#b32a2e]">+{usd}</span>
            )}
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 flex items-center gap-2">
              <ShieldCheck size={18} /> Gwarancja ceny
            </span>
            <span className="font-bold text-emerald-600">TAK</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 flex items-center gap-2">
              <Calendar size={18} /> Rezerwacja online
            </span>
            <span
              className={`font-bold ${isAvailable ? "text-gray-900" : "text-red-500"}`}
            >
              {isAvailable ? "Dostępna" : "Wkrótce"}
            </span>
          </div>
        </div>

        {isAvailable ? (
          <Link
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            href={finalHref as any}
            className="block w-full py-5 bg-[#b32a2e] text-white rounded-2xl font-black uppercase tracking-widest hover:bg-[#962326] transition-all shadow-lg shadow-red-900/20 active:scale-[0.98] text-center"
          >
            Zarezerwuj miejsce
          </Link>
        ) : (
          <div className="block w-full py-5 bg-gray-400 text-white rounded-2xl font-black uppercase tracking-widest text-center grayscale opacity-50 cursor-not-allowed">
            Rezerwacja wkrótce
          </div>
        )}

        <p className="text-[10px] text-gray-400 text-center mt-4 px-4">
          {isAvailable
            ? "Liczba miejsc ograniczona. Klikając, zostaniesz przekierowany do formularza rezerwacji."
            : "Zapisy na tę wyprawę jeszcze nie ruszyły. Spróbuj ponownie później."}
        </p>
      </div>
    </aside>
  );
};
