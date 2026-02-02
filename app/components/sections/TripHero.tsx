"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, MapPin, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const TripHero = ({ trip }: { trip: any }) => {
  const router = useRouter();

  return (
    <section className="relative h-[70vh] min-h-[500px] w-full overflow-hidden bg-gray-900">
      {/* 1. Obraz z delikatnym zoomem przy wejściu */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image
          src={trip.image}
          alt={trip.title}
          fill
          priority
          className="object-cover opacity-80"
        />
      </motion.div>

      {/* 2. Wielowarstwowy gradient - dół jest ciemniejszy dla czytelności tekstu */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

      {/* 3. Content Area */}
      <div className="absolute inset-0 flex flex-col justify-end pb-16">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl"
          >
            {/* Nawigacja i Tag */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <button
                onClick={() => router.back()}
                className="group flex items-center gap-2 text-white/80 hover:text-white transition-all"
              >
                <div className="p-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 group-hover:bg-[#b32a2e] group-hover:border-[#b32a2e] transition-all">
                  <ChevronLeft size={18} />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-[0.2em]">
                  Powrót
                </span>
              </button>

              <div className="h-4 w-px bg-white/20 mx-2 hidden sm:block" />

              <span className="flex items-center gap-2 bg-[#b32a2e] text-white px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-red-900/20">
                <Sparkles size={12} /> Sezon {trip.year}
              </span>
            </div>

            {/* Tytuł z "Text Shadow" dla głębi */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.95] tracking-tighter mb-8 drop-shadow-2xl">
              {trip.title}
            </h1>

            {/* Lokalizacja i metadata */}
            <div className="flex flex-wrap items-center gap-6 text-white/90">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10">
                <MapPin size={18} className="text-[#b32a2e]" />
                <span className="text-sm font-bold tracking-wide">
                  {trip.region || "Azja Wschodnia"}
                </span>
              </div>

              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-black bg-gray-800 flex items-center justify-center overflow-hidden"
                  >
                    <div className="w-full h-full bg-gradient-to-tr from-gray-700 to-gray-500" />
                  </div>
                ))}
                <div className="pl-5 text-xs font-medium text-white/60 flex items-center italic">
                  +12 osób zapisało się w tym tygodniu
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 4. Subtelny element dekoracyjny na dole (kreska postępu/designu) */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#b32a2e] to-transparent opacity-50" />
    </section>
  );
};
