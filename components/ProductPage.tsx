"use client";

import FeaturesGrid from "@/components/FeatureList";
import ProductShowcaseComponent from "@/components/ProductShowcase";
import StayConnectedPage from "@/components/StayConnected";
import TradingTerminals from "@/components/TradingTerminal";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import ProductBanner2 from "./ProductBanner2";

export default function Products() {
  const slideInRight : Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] } },
  };

  const slideInRightVariants : Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] } },
  };

  const slideInBottomVariants : Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] } },
  };

  const heroContainer : Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3, delayChildren: 0.3 } },
  };

  const heroTextContainer : Variants  = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.25, delayChildren: 0.4 } },
  };

  const heroItem : Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] } },
  };

  const fadeInVariants : Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <div className="font-satoshi">
      {/* HERO */}

      <ProductBanner2 />



      {/* MAIN CONTENT */}
      <section className="flex flex-col items-center justify-center space-y-8 sm:space-y-10">
        {/* Mobile View - Slide from Bottom */}
        <motion.div
          variants={slideInBottomVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="mt-12 px-6 block md:hidden"
          transition={{ delay: 0.3 }}
        >
          <motion.h1
            variants={slideInBottomVariants}
            className="text-left text-2xl font-semibold leading-tight mb-4"
          >
            Your Complete Trading Ecosystem
          </motion.h1>

          <motion.p
            variants={slideInBottomVariants}
            className="text-left text-base font-medium tracking-wide text-gray-400"
          >
            Tradejini&apos;s powerful platforms and tools are built to support every type of trader.
          </motion.p>
        </motion.div>

        {/* Desktop View - Slide from Right */}
        <motion.div
          variants={slideInRightVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="mt-12 px-6 hidden md:block"
          transition={{ delay: 0.3 }}
        >
          <motion.h1
            variants={slideInRightVariants}
            className="text-left md:text-center text-2xl font-semibold leading-tight md:text-5xl mb-4"
          >
            Your Complete Trading Ecosystem
          </motion.h1>

          <motion.p
            variants={slideInRightVariants}
            className="text-left md:text-center text-base font-medium tracking-wide text-gray-400 md:text-lg"
          >
            Tradejini&apos;s powerful platforms and tools are built to support every type of trader.
          </motion.p>
        </motion.div>

        <motion.div
          variants={fadeInVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="w-full"
        >
          <ProductShowcaseComponent />
        </motion.div>

        <div
          className="w-full"
        >
          <FeaturesGrid />
        </div>

        <div
          className="w-full"
        >
          <TradingTerminals />
        </div>

        <div
          className="w-full"
        >
          <StayConnectedPage />
        </div>
      </section>
    </div>
  );
}
