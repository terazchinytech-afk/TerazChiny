"use client";

import React from "react";
import { Settings2, Layout, X, Database } from "lucide-react";

interface CalendarDebugPanelProps {
  activeVariant: number;
  setActiveVariant: (variant: number) => void;
  selectedYear: number;
  selectedMonth: string;
  eventCount?: number;
}

export const CalendarDebugPanel = ({
  activeVariant,
  setActiveVariant,
  selectedYear,
  selectedMonth,
  eventCount = 0,
}: CalendarDebugPanelProps) => {
  const [isOpen, setIsOpen] = React.useState(true);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-5 right-5 z-50 bg-gray-900 text-white p-3 rounded-full shadow-2xl hover:scale-110 transition-transform pointer-cursor border border-gray-700"
      >
        <Settings2 size={24} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 w-[280px] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-300">
      <div className="bg-gray-900 text-white px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Settings2 size={16} />
          <span className="text-xs font-bold uppercase tracking-wider">
            Debug Panel
          </span>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-400 hover:text-white transition-colors pointer-cursor"
        >
          <X size={16} />
        </button>
      </div>

      <div className="p-4 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
            Wybierz Styl
          </label>
          <div className="grid grid-cols-1 gap-1">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                onClick={() => setActiveVariant(num)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-bold transition-all border pointer-cursor flex items-center justify-between group
                  ${
                    activeVariant === num
                      ? "bg-red-50 text-red-600 border-red-200"
                      : "bg-white text-gray-500 border-gray-100 hover:bg-gray-50 hover:border-gray-300"
                  }`}
              >
                <div className="flex items-center gap-2">
                  <Layout
                    size={14}
                    className={
                      activeVariant === num ? "text-red-500" : "text-gray-300"
                    }
                  />
                  <span>Wariant {num}</span>
                </div>
                {activeVariant === num && (
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
          <label className="text-[9px] uppercase font-bold text-gray-400 tracking-wider block mb-1">
            Aktualny Stan
          </label>
          <div className="flex justify-between items-center text-xs font-mono border-b border-gray-200 pb-1 mb-1">
            <span className="text-gray-500">Rok:</span>
            <span className="font-bold text-gray-900">{selectedYear}</span>
          </div>
          <div className="flex justify-between items-center text-xs font-mono border-b border-gray-200 pb-1 mb-1">
            <span className="text-gray-500">Miesiąc:</span>
            <span className="font-bold text-gray-900">{selectedMonth}</span>
          </div>

          <div className="flex justify-between items-center text-xs font-mono mt-1 text-blue-600">
            <span className="flex items-center gap-1">
              <Database size={10} /> Events:
            </span>
            <span className="font-bold">{eventCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
