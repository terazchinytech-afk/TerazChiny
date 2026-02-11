"use client";

import { motion } from "framer-motion";
import {
  FileCheck,
  Users,
  PlaneTakeoff,
  MapPin,
  ArrowDown,
} from "lucide-react";

const STEPS = [
  {
    id: "01",
    stepName: "FORMALNOŚCI",
    title: "My załatwiamy wizę. Ty się pakujesz.",
    desc: "Koniec ze stresem wizowym. Wypełniamy wnioski, sprawdzamy paszporty i dostarczamy gotową wizę. Ty tylko wysyłasz nam zdjęcie.",
    icon: FileCheck,
  },
  {
    id: "02",
    stepName: "PRZYGOTOWANIE",
    title: "Odprawa i Wiedza",
    desc: "Dwa tygodnie przed wylotem otrzymujesz 'Pakiet Podróżnika' i spotykamy się online. Omawiamy walutę, internet (VPN) i co spakować.",
    icon: Users,
  },
  {
    id: "03",
    stepName: "LOTNISKO",
    title: "Spotkanie w Warszawie",
    desc: "Nasz polski pilot czeka na Ciebie przy stanowisku odpraw. Od tego momentu nie musisz się o nic martwić. Jesteśmy razem.",
    icon: PlaneTakeoff,
  },
  {
    id: "04",
    stepName: "LĄDOWANIE",
    title: "Prywatny Transfer",
    desc: "Na miejscu czeka nasz lokalny przewodnik i kierowca. Żadnego szukania taksówek czy błądzenia. Jedziemy prosto do hotelu.",
    icon: MapPin,
  },
];

export const ProcessSection = () => {
  return (
    <section className="relative w-full bg-brand-red text-white py-32">
      <div className="container mx-auto px-4 relative z-10">
        {/* --- NAGŁÓWEK --- */}
        <div className="flex flex-col items-center text-center mb-24">
          {/* Badge */}
          <div className="inline-flex items-center gap-3 bg-gold px-6 py-2 rounded-full mb-6 border-[2px] border-gold">
            <span className="text-brand-red font-black tracking-[2px] uppercase text-[10px]">
              Plan wyjazdu
            </span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-montserrat font-black leading-tight max-w-2xl text-white">
            Kupiłeś bilet. <br />
            <span className="text-gold drop-shadow-sm">
              Co dzieje się teraz?
            </span>
          </h2>
        </div>

        {/* --- KOLUMNA PROCESU (CENTRALNA) --- */}
        <div className="max-w-5xl mx-auto relative">
          {/* PIONOWA LINIA ŁĄCZĄCA (OŚ) - Złota */}
          <div className="absolute left-[28px] lg:left-[50%] top-0 bottom-0 w-[4px] bg-gold -translate-x-1/2 rounded-full max-[450px]:left-[5px]" />

          {/* ZMIANA: gap-24 dla mobile (więcej miejsca), lg:gap-0 dla desktopu */}
          <div className="flex flex-col gap-24 lg:gap-0">
            {STEPS.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                // Układ Zig-Zag
                className={`relative flex items-center lg:justify-between w-full ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                {/* 1. CENTRALNY PUNKT (NUMER NA OSI) */}
                <div className="absolute left-[28px] lg:left-[50%] -translate-x-1/2 z-20 flex flex-col items-center justify-center gap-2 max-[450px]:left-[6px]">
                  {/* Złote kółko z czerwonym numerem */}
                  <div className="w-14 h-14 bg-gold rounded-full flex items-center justify-center shadow-xl">
                    <span className="font-bold text-brand-red text-lg">
                      {step.id}
                    </span>
                  </div>
                </div>

                {/* 2. PUSTA PRZESTRZEŃ (Dla balansu na desktopie) */}
                <div className="hidden lg:block w-[45%]" />

                {/* 3. KARTA TREŚCI */}
                <div className="w-full lg:w-[45%] pl-20 lg:pl-0  max-[450px]:pl-14">
                  <div className="bg-white text-black p-8 rounded-[24px] border-b-[8px] border-gold relative hover:-translate-y-1 transition-transform duration-300 shadow-[0_20px_40px_rgba(0,0,0,0.2)] group pointer-cursor text-left max-[400px]:p-6">
                    {/* IKONA - DUŻA, PRAWY GÓRNY RÓG (BEZ RAMKI) */}
                    <div className="absolute -top-4 -right-4 w-18 h-18 max-[500px]:w-15 max-[500px]:h-15 bg-brand-red rounded-[24px] flex shadow-2xl items-center justify-center shadow-inner transform group-hover:scale-105 transition-transform duration-500">
                      <step.icon
                        className="text-white/90 w-10 h-10 max-[500px]:w-7 max-[500px]:h-7"
                        strokeWidth={2}
                      />
                    </div>

                    {/* Treść */}
                    <div className="relative z-10 flex flex-col gap-4 mt-2 ">
                      <span className="text-brand-red font-bold tracking-[2px] uppercase text-xs border-l-4 border-gold pl-3  max-[400px]:text-[10px]">
                        {step.stepName}
                      </span>
                      <h3 className="text-2xl font-black font-montserrat leading-tight text-black max-[400px]:text-[20px]">
                        {step.title}
                      </h3>
                      <p className="text-neutral-600 font-medium text-sm leading-relaxed max-[400px]:text-[12px]">
                        {step.desc}
                      </p>
                    </div>

                    {/* STRZAŁKA (CYCEK) */}
                    <div
                      className={`hidden lg:block absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white rotate-45
                        ${index % 2 === 0 ? "-left-3" : "-right-3"}
                      `}
                    />
                    <div className="lg:hidden absolute top-1/2 -translate-y-1/2 -left-3 w-6 h-6 bg-white rotate-45" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
