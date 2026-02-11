"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

interface MobileBookingManagerProps {
  price: number;
  bookingUrl?: string;
  tripTitle: string;
}

// --- 1. KOMPONENTY POMOCNICZE WYNIESIONE POZA GŁÓWNY KOMPONENT ---

const ButtonContent = () => (
  <span className="font-bold text-sm">Zarezerwuj teraz</span>
);

interface BookingButtonProps {
  bookingUrl?: string;
  tripTitle: string;
  className?: string;
}

const BookingButton = ({
  bookingUrl,
  tripTitle,
  className,
}: BookingButtonProps) => {
  // Klasy bazowe: w-fit, px-8, wyśrodkowanie
  const classes = `bg-[#b32a2e] text-white flex items-center justify-center py-3 px-8 rounded-xl shadow-lg shadow-red-900/20 active:scale-95 transition-transform w-fit ${className || ""}`;

  if (bookingUrl) {
    return (
      <a
        href={bookingUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        <ButtonContent />
      </a>
    );
  }
  return (
    <Link
      href={`/kontakt?wyprawa=${encodeURIComponent(tripTitle)}`}
      className={classes}
    >
      <ButtonContent />
    </Link>
  );
};

// --- 2. GŁÓWNY KOMPONENT ---

export const MobileBookingManager = ({
  price,
  bookingUrl,
  tripTitle,
}: MobileBookingManagerProps) => {
  const [showStickyBar, setShowStickyBar] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isAboveScreen = entry.boundingClientRect.top < 0;
        setShowStickyBar(!entry.isIntersecting && isAboveScreen);
      },
      { threshold: 0 },
    );

    if (triggerRef.current) {
      observer.observe(triggerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* 1. KARTA STATYCZNA (Widoczna na górze mobile) */}
      <div
        className="lg:hidden mb-8 bg-white border border-gray-100 rounded-3xl shadow-sm 
        p-6 max-[650px]:p-5 max-[650px]:text-center max-[1024px]:relative max-[1024px]:-top-20 max-[1024px]:-mb-8"
      >
        {/* Górna sekcja: Cena i Status */}
        <div className="flex justify-between items-start mb-4 max-[650px]:justify-center">
          <div className="flex flex-col max-[650px]:items-center">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
              Cena całkowita
            </p>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl max-[650px]:text-2xl font-black text-[#b32a2e]">
                {price.toLocaleString("pl-PL")}
              </span>
              <span className="text-sm font-bold text-gray-900">PLN</span>
            </div>
          </div>

          {/* Status dostępności - UKRYTY poniżej 650px */}
          <div className="flex items-center gap-1.5 bg-green-50 px-3 py-1.5 rounded-full border border-green-100 max-[650px]:hidden">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-bold text-green-700 uppercase tracking-wide">
              Dostępna
            </span>
          </div>
        </div>

        {/* Atuty w skrócie */}
        <div className="space-y-2 mb-6 max-[650px]:flex max-[650px]:flex-col max-[650px]:items-center">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <CheckCircle2 size={16} className="text-[#b32a2e]" />
            <span>Gwarancja pewnego terminu</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <CheckCircle2 size={16} className="text-[#b32a2e]" />
            <span>Kameralna grupa</span>
          </div>
        </div>

        {/* Trigger dla Observera */}
        <div ref={triggerRef} className="flex justify-center w-full">
          <BookingButton
            bookingUrl={bookingUrl}
            tripTitle={tripTitle}
            className="w-full max-[650px]:w-fit"
          />
        </div>
        <p className="text-center text-xs text-gray-400 mt-3">
          Brak ukrytych kosztów
        </p>
      </div>

      {/* 2. STICKY BAR (Pojawia się po przewinięciu) */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50 lg:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.08)] pb-safe transition-transform duration-300 ease-in-out ${
          showStickyBar ? "translate-y-0" : "translate-y-[120%]"
        }`}
      >
        <div className="flex items-center justify-center">
          {/* Wrapper Buttona */}
          <div className="w-auto">
            <BookingButton bookingUrl={bookingUrl} tripTitle={tripTitle} />
          </div>
        </div>
      </div>
    </>
  );
};
