"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, Instagram, Facebook, ChevronUp } from "lucide-react";

// Linki nawigacyjne pozostają statyczne (zgodnie z projektem)
const navLinks = [
  { label: "Strona Główna", href: "/" },
  { label: "Kalendarz", href: "/kalendarz-wypraw" },
  { label: "Blog", href: "/blog" },
  { label: "Kontakt", href: "/#kontakt" },
];

// Typy danych z Sanity
interface FooterProps {
  data: {
    socials?: {
      facebook?: string;
      instagram?: string;
    };
    contactInfo?: {
      email?: string;
      phone?: string;
    };
  };
}

export const Footer = ({ data }: FooterProps) => {
  // Wyciągamy dane z Sanity (z zabezpieczeniem przed brakiem danych)
  const { socials, contactInfo } = data || {};

  // Wartości domyślne (jeśli w Sanity pole jest puste)
  const email = contactInfo?.email || "kontakt@terazchiny.pl";
  const phone = contactInfo?.phone || "+48 123 456 789";
  const facebookUrl = socials?.facebook;
  const instagramUrl = socials?.instagram;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  console.log(data);

  return (
    <footer className="bg-[#b32a2e] text-white pt-16 border-gold/20 border-t-1 font-montserrat">
      <div className="container mx-auto px-4">
        {/* --- WIDOK MOBILNY --- */}
        <div className="flex-col gap-6 max-w-[50%] hidden max-[800px]:flex items-center justify-center self-center justify-self-center mb-24 text-center max-[550px]:max-w-full">
          <div className="relative mb-2">
            <Image
              src="/TerazChinyLogo.svg"
              alt="Teraz Chiny Logo"
              width={180}
              height={50}
              className="object-contain brightness-0 invert"
            />
          </div>

          <p className="text-sm leading-relaxed max-w-sm text-white/90">
            Organizujemy świadome wyjazdy do Chin, łącząc kulturę, biznes,
            edukację i autentyczne doświadczenia.
          </p>

          <div className="flex items-center gap-4 mt-2">
            {instagramUrl && (
              <Link
                href={instagramUrl}
                target="_blank"
                className="p-2 border border-white/30 rounded-full hover:bg-white hover:text-[#b32a2e] transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </Link>
            )}
            <Link
              href={`mailto:${email}`}
              className="p-2 border border-white/30 rounded-full hover:bg-white hover:text-[#b32a2e] transition-all duration-300"
              aria-label="Email"
            >
              <Mail size={20} />
            </Link>
            {facebookUrl && (
              <Link
                href={facebookUrl}
                target="_blank"
                className="p-2 border border-white/30 rounded-full hover:bg-white hover:text-[#b32a2e] transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </Link>
            )}
          </div>

          <button
            onClick={scrollToTop}
            className="mt-6 flex items-center gap-2 bg-[#efd075] text-[#b32a2e] px-6 py-3 rounded-lg font-bold text-sm hover:bg-white transition-colors duration-300 shadow-lg"
          >
            <ChevronUp size={18} />
            Wróć do góry
          </button>
        </div>

        {/* --- WIDOK DESKTOP --- */}
        <div className="flex flex-row flex-wrap justify-between max-[800px]:justify-around gap-12 max-[496px]:text-center">
          {/* KOLUMNA 1 */}
          <div className="flex flex-col items-start gap-6 max-w-[30%] max-[800px]:hidden">
            <div className="relative mb-2">
              <Image
                src="/TerazChinyLogo.svg"
                alt="Teraz Chiny Logo"
                width={180}
                height={50}
                className="object-contain brightness-0 invert"
              />
            </div>

            <p className="text-sm leading-relaxed max-w-sm text-white/90">
              Organizujemy świadome wyjazdy do Chin, łącząc kulturę, biznes,
              edukację i autentyczne doświadczenia.
            </p>

            <div className="flex items-center gap-4 mt-2">
              {instagramUrl && (
                <Link
                  href={instagramUrl}
                  target="_blank"
                  className="p-2 border border-white/30 rounded-full hover:bg-white hover:text-[#b32a2e] transition-all duration-300"
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
                </Link>
              )}
              <Link
                href={`mailto:${email}`}
                className="p-2 border border-white/30 rounded-full hover:bg-white hover:text-[#b32a2e] transition-all duration-300"
                aria-label="Email"
              >
                <Mail size={20} />
              </Link>
              {facebookUrl && (
                <Link
                  href={facebookUrl}
                  target="_blank"
                  className="p-2 border border-white/30 rounded-full hover:bg-white hover:text-[#b32a2e] transition-all duration-300"
                  aria-label="Facebook"
                >
                  <Facebook size={20} />
                </Link>
              )}
            </div>

            <button
              onClick={scrollToTop}
              className="mt-6 flex items-center gap-2 bg-[#efd075] text-[#b32a2e] px-6 py-3 rounded-lg font-bold text-sm hover:bg-white transition-colors duration-300 shadow-lg"
            >
              <ChevronUp size={18} />
              Wróć do góry
            </button>
          </div>

          {/* KOLUMNA 2 */}
          <div className="flex flex-col md:pl-10 pt-4">
            <h3 className="font-bold text-lg mb-6 max-[497px]:text-center">
              Mapa Strony
            </h3>
            <ul className="flex flex-col gap-4 text-sm font-medium max-[497px]:text-center">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-[#efd075] transition-colors border-b border-transparent hover:border-[#efd075] w-fit pb-0.5"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* KOLUMNA 3 (DANE DYNAMICZNE) */}
          <div className="flex flex-col pt-4">
            <h3 className="font-bold text-lg mb-6 max-[497px]:text-center">
              Kontakt
            </h3>
            <div className="flex flex-col gap-6">
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-4 group max-[497px]:justify-center"
              >
                <div className="w-10 h-10 border border-white/30 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-white group-hover:text-[#b32a2e] transition-colors duration-300">
                  <Mail size={20} />
                </div>
                <span className="text-sm group-hover:text-[#efd075] transition-colors">
                  {email}
                </span>
              </a>

              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="flex items-center gap-4 group max-[497px]:justify-center"
              >
                <div className="w-10 h-10 border border-white/30 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-white group-hover:text-[#b32a2e] transition-colors duration-300">
                  <Phone size={20} />
                </div>
                <span className="text-sm group-hover:text-[#efd075] transition-colors">
                  {phone}
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="mt-16 pt-8 border-t border-white/10 text-center text-xs text-white/50">
          <p>
            © {new Date().getFullYear()} Teraz Chiny. Wszelkie prawa
            zastrzeżone.
          </p>
        </div>
      </div>
    </footer>
  );
};
