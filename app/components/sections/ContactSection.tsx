/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import Image from "next/image";

// --- HELPERY OPTYMALIZACYJNE (LOGICZNE) ---

// Zapobiega błędom 500/Timeout poprzez ograniczenie rozmiaru zdjęcia z Sanity
const getOptimizedImageUrl = (url: string, width = 1600) => {
  if (!url || url.startsWith("/")) return url;
  try {
    const optimized = new URL(url);
    optimized.searchParams.set("w", width.toString());
    optimized.searchParams.set("q", "80");
    optimized.searchParams.set("auto", "format");
    return optimized.href;
  } catch (e) {
    return url;
  }
};

// --- TYPY DANYCH Z SANITY ---
interface ContactSectionProps {
  data: {
    heroImage: string;
    headline: {
      fullText: string;
      highlight: string;
    };
    description: string;
    contactCard: {
      cardLogo: string;
      email: string;
      phone: string;
      workingHours: string;
    };
  };
}

export const ContactSection = ({ data }: ContactSectionProps) => {
  if (!data) return null;

  const { heroImage, headline, description, contactCard } = data;

  const titleParts = useMemo(() => {
    const fullText = headline?.fullText || "";
    const highlight = headline?.highlight || "";
    return fullText.split(new RegExp(`(${highlight})`, "gi"));
  }, [headline]);

  const optimizedHero = useMemo(
    () => getOptimizedImageUrl(heroImage || "/webp/contactImage.webp", 1600),
    [heroImage],
  );

  return (
    <section
      id="kontakt"
      className="w-full px-4 md:px-6 bg-brand-red py-32 relative overflow-hidden max-[440px]:px-0"
    >
      <Image
        src="/symbol.webp"
        width={300}
        height={150}
        className="absolute -bottom-20 -right-0 pointer-events-none z-10"
        alt=""
        aria-hidden="true"
      />
      <Image
        src="/symbol.webp"
        width={300}
        height={150}
        className="absolute -top-20 -left-0 pointer-events-none z-10 max-[740px]:hidden"
        alt=""
        aria-hidden="true"
      />
      <Image
        src="/chmura.webp"
        width={300}
        height={150}
        className="absolute top-5 right-20 pointer-events-none z-10"
        alt=""
        aria-hidden="true"
      />
      <Image
        src="/smok.webp"
        width={300}
        height={150}
        className="absolute bottom-44 left-20 pointer-events-none z-10"
        alt=""
        aria-hidden="true"
      />
      <Image
        src={"/contactLine.svg"}
        height={1600}
        width={1200}
        alt="Element dekoracyjny"
        className="absolute -top-0 left-0 pointer-events-none w-auto h-[110%] min-w-[1200px] object-cover"
        priority
        aria-hidden="true"
      />

      <div className="container mx-auto max-w-7xl relative z-10 max-[440px]:max-w-full max-[440px]:w-full ps-0 pe-0">
        <div className="relative w-full min-h-[600px] rounded-[40px] overflow-hidden shadow-2xl">
          <Image
            src={optimizedHero}
            fill
            alt="Podróż do Chin"
            className="object-cover"
            sizes="(max-width: 1280px) 100vw, 1280px"
            priority
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-transparent z-0" />

          <div className="relative z-10 flex flex-col [@media(min-width:1150px)]:flex-row items-center [@media(min-width:1150px)]:items-start justify-between h-full p-8 md:p-16 lg:p-24 gap-12 max-[515px]:p-4 max-[515px]:py-12">
            <div className="w-full [@media(min-width:1150px)]:w-1/2 text-white flex gap-6 flex-col text-center [@media(min-width:1150px)]:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-montserrat [@media(min-width:1150px)]:mt-12 font-black text-white leading-tight">
                {titleParts.map((part, i) =>
                  part.toLowerCase() === headline?.highlight?.toLowerCase() ? (
                    <span key={i} className="text-brand-red">
                      {part}
                    </span>
                  ) : (
                    <span key={i}>{part}</span>
                  ),
                )}
              </h1>
              <p className="text-white leading-relaxed text-sm md:text-base max-w-sm mx-auto [@media(min-width:1150px)]:mx-0">
                {description}
              </p>
            </div>

            <div className="w-full max-w-[450px] bg-[#F8F8F6] rounded-[35px] p-8 md:p-12 shadow-2xl max-[515px]:px-2">
              <div className="flex flex-col items-center text-center mb-10">
                <Image
                  src={"/TerazChinyLogoNegatyw.svg"}
                  width={160}
                  height={160}
                  alt="Logotyp Teraz Chiny"
                  className="mb-4"
                />
              </div>

              <div className="flex flex-col gap-6 w-full">
                {contactCard?.email && (
                  <Link
                    href={`mailto:${contactCard.email}`}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors group"
                  >
                    <div className="w-12 h-12 bg-brand-red/10 rounded-xl flex items-center justify-center text-brand-red max-[440px]:hidden">
                      <Mail size={24} />
                    </div>
                    <div className="flex flex-col text-left overflow-hidden">
                      <span className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">
                        Email
                      </span>
                      <span className="text-slate-800 font-bold break-all">
                        {contactCard.email}
                      </span>
                    </div>
                    <ArrowUpRight
                      size={18}
                      className="ml-auto text-gray-300 group-hover:text-brand-red transition-all group-hover:-translate-y-0.5"
                    />
                  </Link>
                )}

                {contactCard?.phone && (
                  <Link
                    href={`tel:${contactCard.phone.replace(/\s+/g, "")}`}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors group"
                  >
                    <div className="w-12 h-12 bg-brand-red/10 rounded-xl flex items-center justify-center text-brand-red max-[440px]:hidden">
                      <Phone size={24} />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">
                        Telefon
                      </span>
                      <span className="text-slate-800 font-bold">
                        {contactCard.phone}
                      </span>
                    </div>
                    <ArrowUpRight
                      size={18}
                      className="ml-auto text-gray-300 group-hover:text-brand-red transition-all group-hover:-translate-y-0.5"
                    />
                  </Link>
                )}
              </div>

              {contactCard?.workingHours && (
                <div className="mt-8 text-center">
                  <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-medium">
                    {contactCard.workingHours}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
