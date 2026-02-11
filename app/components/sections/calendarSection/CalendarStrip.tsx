"use client";

import React, { useState, useRef, useEffect } from "react";
import type { FormattedTrip } from "./CalendarConstants";
import { MONTHS_BASE } from "./CalendarConstants";
import { CalendarVariant1 } from "./CalendarVariant1";
import { CalendarVariant2 } from "./CalendarVariant2";
import { CalendarDebugPanel } from "./CalendarDebugPanel";
import { CalendarVariant3 } from "./CalendarVariant3";
import { CalendarVariant4 } from "./CalendarVariant4";
import { CalendarVariant5 } from "./CalendarVariant5";

interface CalendarStripContainerProps {
  selectedYear: number;
  selectedMonth: string;
  onYearChange: (year: number) => void;
  onMonthSelect: (month: string) => void;
  events: FormattedTrip[];
}

export const CalendarStrip = ({
  selectedYear,
  selectedMonth,
  onYearChange,
  onMonthSelect,
  events,
}: CalendarStripContainerProps) => {
  const [activeVariant, setActiveVariant] = useState(1);
  const isInitialized = useRef(false);

  // --- SMART INIT ---
  useEffect(() => {
    if (!isInitialized.current && events.length > 0) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const getTripDate = (trip: FormattedTrip): Date => {
        const monthIndex = MONTHS_BASE.findIndex((m) => m.value === trip.month);
        const safeMonthIndex = monthIndex !== -1 ? monthIndex : 0;
        const day = parseInt(trip.day) || 1;
        return new Date(trip.year, safeMonthIndex, day);
      };

      const futureEvents = events
        .filter((event) => {
          const eventDate = getTripDate(event);
          return eventDate >= today;
        })
        .sort((a, b) => getTripDate(a).getTime() - getTripDate(b).getTime());

      if (futureEvents.length > 0) {
        const nearestEvent = futureEvents[0];
        onYearChange(nearestEvent.year);
        onMonthSelect(nearestEvent.month);
      } else {
        const currentMonthIndex = today.getMonth();
        onMonthSelect(MONTHS_BASE[currentMonthIndex].value);
        onYearChange(today.getFullYear());
      }
      isInitialized.current = true;
    }
  }, [events, onYearChange, onMonthSelect]);

  return (
    // ZMIANA: bg-transparent zamiast bg-white. Usunięto border-b.
    <div className="w-full relative bg-transparent font-montserrat z-20">
      <div className="container mx-auto px-4 max-w-[1200px] py-6">
        <div className="animate-in fade-in duration-500">
          {activeVariant === 1 && (
            <CalendarVariant1
              selectedYear={selectedYear}
              selectedMonth={selectedMonth}
              onYearChange={onYearChange}
              onMonthSelect={onMonthSelect}
              events={events}
            />
          )}

          {activeVariant === 2 && (
            <CalendarVariant2
              selectedYear={selectedYear}
              selectedMonth={selectedMonth}
              onYearChange={onYearChange}
              onMonthSelect={onMonthSelect}
              events={events}
            />
          )}
          {activeVariant === 3 && (
            <CalendarVariant3
              selectedYear={selectedYear}
              selectedMonth={selectedMonth}
              onYearChange={onYearChange}
              onMonthSelect={onMonthSelect}
              events={events}
            />
          )}
          {activeVariant === 4 && (
            <CalendarVariant4
              selectedYear={selectedYear}
              selectedMonth={selectedMonth}
              onYearChange={onYearChange}
              onMonthSelect={onMonthSelect}
              events={events}
            />
          )}
          {activeVariant === 5 && (
            <CalendarVariant5
              selectedYear={selectedYear}
              selectedMonth={selectedMonth}
              onYearChange={onYearChange}
              onMonthSelect={onMonthSelect}
              events={events}
            />
          )}
        </div>
      </div>

      <CalendarDebugPanel
        activeVariant={activeVariant}
        setActiveVariant={setActiveVariant}
        selectedYear={selectedYear}
        selectedMonth={selectedMonth}
        eventCount={events.length}
      />

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};
