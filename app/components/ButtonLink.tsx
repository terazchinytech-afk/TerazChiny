"use client";

import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { ChevronRight, ChevronUp } from "lucide-react";

interface ButtonLinkProps {
  href: string;
  variant?: "gold" | "red" | "white";
  icon?: "arrow" | "up" | "none";
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const ButtonLink = ({
  href,
  variant = "gold",
  icon = "none",
  children,
  className = "",
  onClick,
}: ButtonLinkProps) => {
  // Style bazowe oparte na Twoim przykładzie
  const baseStyles =
    "montserrat inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold text-sm transition-all duration-300 shadow-lg cursor-pointer";

  // Warianty kolorystyczne wykorzystujące Twoje zmienne z @theme
  const variants = {
    gold: "bg-gold text-brand-red hover:bg-white hover:scale-105",
    red: "bg-brand-red text-white hover:bg-gold hover:text-brand-red",
    white: "bg-white text-brand-red hover:bg-beige",
  };

  const content = (
    <>
      {icon === "up" && (
        <ChevronUp size={18} className="transition-transform" />
      )}
      {children}
      {icon === "arrow" && (
        <ChevronRight
          size={18}
          className="transition-transform group-hover:translate-x-1"
        />
      )}
    </>
  );

  return (
    <Link href={href} onClick={onClick} className="w-fit">
      <motion.div
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        className={`${baseStyles} ${variants[variant]} ${className}`}
      >
        {content}
      </motion.div>
    </Link>
  );
};
