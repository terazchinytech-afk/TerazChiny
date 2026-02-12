import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SliderProgressProps {
  total: number;
  current: number;
}

export const SliderProgress = ({ total, current }: SliderProgressProps) => {
  return (
    <div className="relative flex items-center justify-between w-full max-w-[80%]">
      <div className="absolute top-1/2 left-[15px] right-[15px] h-[2px] -translate-y-1/2 bg-[#F0D68F] -z-10" />

      {Array.from({ length: total }).map((_, index) => {
        const isActive = index === current;

        return (
          <div
            key={index}
            className="relative flex items-center justify-center w-[30px] h-[30px]"
          >
            <motion.div
              initial={false}
              animate={{
                width: isActive ? 30 : 10,
                height: isActive ? 30 : 10,
                backgroundColor: isActive ? "#BFA16D" : "#F0D68F",
              }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="flex items-center justify-center rounded-full shadow-sm overflow-hidden"
            >
              <AnimatePresence>
                {isActive && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.4 }}
                    className="text-[15px] font-medium text-white"
                  >
                    {index + 1}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
};
