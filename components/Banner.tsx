"use client";

import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
export default function Banner() {
  return (
    <AnimatePresence>
      <motion.div
        initial={{
          y: 0,
        }}
        animate={{
          y: "-100%",
        }}
        exit={{
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
        className="fixed left-0 top-0 z-[99999999999999] flex h-screen w-screen items-center justify-center bg-white text-themeGreen"
      >
        <img className="w-64 p-1" src="/logo.svg" alt="" />
      </motion.div>
    </AnimatePresence>
  );
}
