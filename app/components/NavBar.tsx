/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Strona Główna", href: "/" },
  { label: "Kalendarz", href: "/kalendarz-wypraw" },
  { label: "Galeria", href: "/galeria-zdjec" },
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
  const isHomePage = pathname === "/";

  const toggleMenu = () => setOpen((prev) => !prev);

  useEffect(() => {
    if (isHomePage && typeof window !== "undefined" && window.location.hash) {
      const id = window.location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        const timeout = setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 150);
        return () => clearTimeout(timeout);
      }
    }
  }, [isHomePage]);

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
        if (open) setOpen(false);
      }
    }
  };

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  useEffect(() => {
    const handleScrollEvent = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY >= 100 && !isSticky) {
        setIsSticky(true);
      } else if (currentScrollY < 100 && isSticky) {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScrollEvent, { passive: true });
    return () => window.removeEventListener("scroll", handleScrollEvent);
  }, [isSticky]);

  const navBackground = useMemo(
    () => (isSticky ? "#b32a2ecc" : "transparent"),
    [isSticky],
  );

  return (
    <>
      {!isHomePage && !isSticky && (
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#b32a2e] to-transparent z-[90] pointer-events-none" />
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
        initial={false}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`z-[100] transition-shadow duration-300 ${
          isSticky
            ? "fixed top-0 left-0 w-full shadow-2xl shadow-black/10"
            : "absolute top-0 left-0 w-full"
        } ${className}`}
        style={{ willChange: "transform, background-color" }}
      >
        <div className="container mx-auto px-4 md:px-12 flex flex-row justify-between items-center relative z-[101]">
          <div className="relative z-50">
            <Link href="/" className="block">
              <Image
                src="/TerazChinyLogo.svg"
                alt="Logo Teraz Chiny"
                height={40}
                width={168}
                className="object-contain cursor-pointer"
                priority
              />
            </Link>
          </div>

          <ul className="flex gap-8 max-[775px]:hidden">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={(e) => handleScroll(e, link.href)}
                  className="inline-block text-xs text-[#efd075]  tracking-[0.5px] font-montserrat font-bold transition-all duration-300 ease-out hover:text-white hover:-translate-y-0.5"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden max-[775px]:block relative z-50">
            <button
              onClick={toggleMenu}
              className="text-white p-2 hover:bg-white/10 rounded-full transition-colors active:scale-90"
              aria-label="Menu"
            >
              {open ? <X size={32} /> : <Menu size={32} />}
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
              className="fixed left-0 top-0 w-full h-screen bg-[#b32a2e]/98 backdrop-blur-xl origin-top flex flex-col justify-center items-center z-40"
              style={{ willChange: "transform" }}
            >
              <motion.div
                variants={containerVars}
                initial="initial"
                animate="open"
                exit="initial"
                className="flex flex-col gap-10 text-center font-montserrat"
              >
                {navLinks.map((link) => (
                  <div key={link.href} className="overflow-hidden">
                    <motion.div variants={mobileLinkVars}>
                      <Link
                        href={link.href}
                        onClick={(e) => {
                          handleScroll(e, link.href);
                          if (!link.href.includes("#")) setOpen(false);
                        }}
                        className="text-3xl text-white font-black uppercase tracking-[0.2em] hover:text-[#efd075] transition-colors"
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
                className="absolute bottom-12 text-white/20 text-[10px] font-bold tracking-[0.3em] uppercase"
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
