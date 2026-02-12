"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../sanity.config";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function StudioPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: "#121212",
        position: "relative",
      }}
    >
      <AnimatePresence>
        {!mounted && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#121212]"
          >
            {/* LOGO */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-10"
            >
              <Image
                src="/TerazChinyLogo.svg"
                height={80}
                width={250}
                alt="Logo Teraz Chiny"
                priority
                className="object-contain"
              />
            </motion.div>

            <div className="flex items-center justify-center gap-2 h-16">
              {[0, 1, 2].map((index) => (
                <motion.div
                  key={index}
                  style={{
                    width: 10,
                    backgroundColor: "#efd075",
                    borderRadius: 9999,
                  }}
                  animate={{
                    height: [20, 50, 20],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.2,
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <NextStudio config={config} />
    </div>
  );
}
