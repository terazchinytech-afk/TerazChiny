/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { motion } from "framer-motion";
import { FileCheck, Users, PlaneTakeoff, MapPin } from "lucide-react";

const FIXED_ICONS = [FileCheck, Users, PlaneTakeoff, MapPin];

export const ProcessSection = ({ data }: any) => {
  if (!data) return null;

  const { header, step1, step2, step3, step4 } = data;

  const steps = [
    {
      ...step1,
      id: "01",
      icon: FIXED_ICONS[0],

      title: step1?.title || "Formalności",
      description: step1?.description || "My załatwiamy wizę...",
    },
    {
      ...step2,
      id: "02",
      icon: FIXED_ICONS[1],
      title: step2?.title || "Przygotowanie",
      description: step2?.description || "Odprawa i wiedza...",
    },
    {
      ...step3,
      id: "03",
      icon: FIXED_ICONS[2],
      title: step3?.title || "Lotnisko",
      description: step3?.description || "Spotkanie w Warszawie...",
    },
    {
      ...step4,
      id: "04",
      icon: FIXED_ICONS[3],
      title: step4?.title || "Lądowanie",
      description: step4?.description || "Prywatny transfer...",
    },
  ];

  return (
    <section className="relative w-full bg-brand-red text-white py-32">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center mb-24">
          <div className="inline-flex items-center gap-3 bg-gold px-6 py-2 rounded-full mb-6 border-[2px] border-gold">
            <span className="text-brand-red font-black tracking-[2px] uppercase text-[10px]">
              {header?.badge || "Plan wyjazdu"}
            </span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-montserrat font-black leading-tight max-w-2xl text-white">
            {header?.mainTitle || "Kupiłeś bilet."} <br />
            <span className="text-gold drop-shadow-sm">
              {header?.highlightedTitle || "Co dzieje się teraz?"}
            </span>
          </h2>
        </div>

        <div className="max-w-5xl mx-auto relative">
          <div className="absolute left-[28px] lg:left-[50%] top-0 bottom-0 w-[4px] bg-gold -translate-x-1/2 rounded-full max-[450px]:left-[5px]" />

          <div className="flex flex-col gap-24 lg:gap-0">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex items-center lg:justify-between w-full ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                <div className="absolute left-[28px] lg:left-[50%] -translate-x-1/2 z-20 flex flex-col items-center justify-center gap-2 max-[450px]:left-[6px]">
                  <div className="w-14 h-14 bg-gold rounded-full flex items-center justify-center shadow-xl">
                    <span className="font-bold text-brand-red text-lg">
                      {step.id}
                    </span>
                  </div>
                </div>

                <div className="hidden lg:block w-[45%]" />

                <div className="w-full lg:w-[45%] pl-20 lg:pl-0 max-[450px]:pl-14">
                  <div className="bg-white text-black p-8 rounded-[24px] border-b-[8px] border-gold relative hover:-translate-y-1 transition-transform duration-300 shadow-[0_20px_40px_rgba(0,0,0,0.2)] group pointer-cursor text-left max-[400px]:p-6">
                    <div className="absolute -top-4 -right-4 w-18 h-18 max-[500px]:w-15 max-[500px]:h-15 bg-brand-red rounded-[24px] flex shadow-2xl items-center justify-center shadow-inner transform group-hover:scale-105 transition-transform duration-500">
                      <step.icon
                        className="text-white/90 w-10 h-10 max-[500px]:w-7 max-[500px]:h-7"
                        strokeWidth={2}
                      />
                    </div>

                    <div className="relative z-10 flex flex-col gap-4 mt-2 ">
                      <span className="text-brand-red font-bold tracking-[2px] uppercase text-xs border-l-4 border-gold pl-3 max-[400px]:text-[10px]">
                        {step.stepName}
                      </span>
                      <h3 className="text-2xl font-black font-montserrat leading-tight text-black max-[400px]:text-[20px]">
                        {step.title}
                      </h3>
                      <p className="text-neutral-600 font-medium text-sm leading-relaxed max-[400px]:text-[12px]">
                        {step.description}
                      </p>
                    </div>

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
