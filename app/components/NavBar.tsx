"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const navLinks = [
  { label: "Strona Główna", href: "/" },
  { label: "Kalendarz", href: "/kalendarz-wypraw" },
  { label: "Blog", href: "/blog" },
  { label: "Kontakt", href: "/#kontakt" },
];

const menuVars: Variants = {
  initial: { scaleY: 0 },
  animate: {
    scaleY: 1,
    transition: { duration: 0.5, ease: [0.12, 0, 0.39, 0] },
  },
  exit: {
    scaleY: 0,
    transition: { delay: 0.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const containerVars: Variants = {
  initial: { transition: { staggerChildren: 0.09, staggerDirection: -1 } },
  open: {
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.09,
      staggerDirection: 1,
    },
  },
};

const mobileLinkVars: Variants = {
  initial: {
    y: "30vh",
    transition: { duration: 0.5, ease: [0.37, 0, 0.63, 1] },
  },
  open: {
    y: 0,
    transition: { ease: [0, 0.55, 0.45, 1], duration: 0.7 },
  },
};

export const NavBar = ({ className }: { className?: string }) => {
  const [open, setOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === "/";

  const toggleMenu = () => {
    setOpen((prev) => !prev);
  };

  // 1. OBSŁUGA SCROLLA PO WEJŚCIU NA STRONĘ Z HASHEM (np. z /blog)
  useEffect(() => {
    if (isHomePage && window.location.hash) {
      const id = window.location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        // Małe opóźnienie, aby Next.js zdążył wyrenderować sekcję
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [isHomePage]);

  // 2. FUNKCJA OBSŁUGUJĄCA KLIKNIĘCIE (Dla płynnego scrolla na tej samej stronie)
  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (href.includes("#")) {
      const id = href.split("#")[1];
      const element = document.getElementById(id);

      if (element && isHomePage) {
        e.preventDefault();
        element.scrollIntoView({ behavior: "smooth" });
        if (open) toggleMenu();
      }
      // Jeśli nie jesteśmy na Home, Link zadziała naturalnie i useEffect powyżej obsłuży scroll po zmianie route
    }
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  useEffect(() => {
    const handleScrollEvent = () => {
      if (window.scrollY >= 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScrollEvent);
    return () => window.removeEventListener("scroll", handleScrollEvent);
  }, []);

  const navBackground = isSticky ? "#b32a2ecc" : "transparent";

  return (
    <>
      {!isHomePage && !isSticky && (
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#b32a2e] to-transparent z-[90] pointer-events-none transition-opacity duration-300" />
      )}

      <motion.nav
        animate={{
          y: 0,
          backgroundColor: navBackground,
          backdropFilter: isSticky ? "blur(10px)" : "blur(0px)",
          paddingTop: isSticky ? "10px" : "16px",
          paddingBottom: isSticky ? "10px" : "16px",
          borderBottomLeftRadius: isSticky ? "19px" : "0px",
          borderBottomRightRadius: isSticky ? "19px" : "0px",
        }}
        transition={{ duration: 0.3 }}
        className={`z-[100] transition-all duration-300 ${
          isSticky
            ? "fixed top-0 left-0 w-full shadow-xl"
            : "absolute top-0 left-0 w-full"
        } ${className}`}
      >
        <div className="container mx-auto px-4 md:px-12 flex flex-row justify-between items-center relative z-[101]">
          <div className="relative z-50">
            <Link href="/">
              <Image
                src={"/TerazChinyLogo.svg"}
                alt="Logo"
                height={40}
                width={168}
                className="object-contain cursor-pointer"
              />
            </Link>
          </div>

          <ul className="flex gap-8 max-[775px]:hidden">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={(e) => handleScroll(e, link.href)}
                  className="inline-block text-xs text-[#efd075] tracking-[0.3px] font-montserrat font-medium transition-all duration-300 ease-out hover:text-white hover:-translate-y-1 hover:drop-shadow-[0_10px_8px_rgba(250,247,242,0.3)]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden max-[775px]:block relative z-50">
            <button
              onClick={toggleMenu}
              className="text-white p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              {open ? <X size={34} /> : <Menu size={34} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              variants={menuVars}
              initial="initial"
              animate="animate"
              exit="exit"
              className="fixed left-0 top-0 w-full h-screen bg-[#b32a2e]/95 backdrop-blur-md origin-top flex flex-col justify-center items-center z-40"
            >
              <motion.div
                variants={containerVars}
                initial="initial"
                animate="open"
                exit="initial"
                className="flex flex-col gap-8 text-center font-montserrat"
              >
                {navLinks.map((link) => (
                  <div key={link.href} className="overflow-hidden">
                    <motion.div variants={mobileLinkVars}>
                      <Link
                        href={link.href}
                        onClick={(e) => {
                          handleScroll(e, link.href);
                          if (!link.href.includes("#")) toggleMenu();
                        }}
                        className="text-3xl text-white font-bold uppercase tracking-widest hover:text-[#efd075] transition-colors"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  </div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.8 } }}
                className="absolute bottom-10 text-white/30 text-xs tracking-widest uppercase"
              >
                Teraz Chiny © {new Date().getFullYear()}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};
