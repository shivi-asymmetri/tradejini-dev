"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TradingTerminals = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 1 for next, -1 for previous

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setActiveIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        if (nextIndex >= terminals.length) return 0;
        return nextIndex;
      });
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, []);

  const goToNext = () => {
    setDirection(1);
    setActiveIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      if (nextIndex >= terminals.length) return 0;
      return nextIndex;
    });
  };

  const goToPrevious = () => {
    setDirection(-1);
    setActiveIndex((prevIndex) => {
      const nextIndex = prevIndex - 1;
      if (nextIndex < 0) return terminals.length - 1;
      return nextIndex;
    });
  };

  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  const terminals = [
    {
      title: "Scalper",
      highlight: "Terminal",
      description:
        "One-click order execution with ultra-low latency, built for scalpers who trade in split seconds.",
      colors: "#0a2d28, #0a2d28, #0d0d0d, #047a6b, #0a5a4d",
      termColor: "#3db5a8",
      image: "/listings/terminal-1.png",
      animation: "gradientAnimationBlue",
    },
    {
      title: "Option",
      highlight: "Terminal",
      description:
        "Build, analyze, and execute strategies with Greeks, OI and pay-off charts on a single screen.",
      colors: "#1f2638, #1f2638, #0d0d0d, #3d4f85, #2d3858",
      termColor: "#8ba3e8",
      image: "/listings/terminal-2.png",
      animation: "gradientAnimationPurple",
    },
    {
      title: "Decade",
      highlight: "View",
      description:
        "Explore over 10 years of company history, financials, and performance metrics",
      colors: "#0f3a45, #0f3a45, #0d0d0d, #05a8d6, #2a8fa8",
      termColor: "#05a8d6",
      image: "/listings/terminal-3.png",
      animation: "gradientAnimationLightGreen",
    },
    {
      title: "Chart",
      highlight: "Terminal",
      description:
        "Trade straight from charts with pro grade, indicators, multi chart layout, drawing tools, and one-click execution.",
      colors: "#1f4028, #1f4028, #0d0d0d, #1fb03a, #188f42",
      termColor: "#2dc557",
      image: "/listings/terminal-4.png",
      animation: "gradientAnimationGreen",
    },
  ];

  // Animation variants - smooth and slow animations
  const cardVariantsLeft: Variants = {
    hidden: {
      opacity: 0,
      x: -100,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 1.0,
        delay: 0.2,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  const cardVariantsRight: Variants = {
    hidden: {
      opacity: 0,
      x: 100,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 1.0,
        delay: 0.2,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  const contentVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  const imageVariants: Variants = {
    hidden: {
      scale: 0.9,
      y: 20,
    },
    visible: {
      scale: 1,
      y: 0,
      transition: {
        duration: 1.0,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  // Carousel slide variants
  const carouselVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  const headerBottomVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.0,
        delay: 0.3,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  const activeTerminal = terminals[activeIndex];

  return (
    <div className="flex flex-col items-center bg-white px-4 pt-6 sm:px-6 md:px-8 md:pt-20">
      {/* Header */}
      {/* Mobile View - Slide from Bottom */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-100px" }}
        variants={headerBottomVariants}
        className="mb-8 flex max-w-4xl flex-col items-start gap-3 text-left md:hidden"
      >
        <h1 className="text-left text-black/99 text-2xl font-semibold sm:text-4xl">
          Dedicated Trading Terminals
        </h1>
        <p className="text-gray-400 text-base font-medium sm:text-lg">
          We&apos;ve built specialized terminals for traders who demand
          precision and focus
        </p>
      </motion.div>

      {/* Desktop View - Slide from Left */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 1.0, delay: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className="mb-8 hidden max-w-4xl flex-col items-start gap-3 text-left md:flex md:items-center md:text-center md:mb-10 md:gap-5"
      >
        <h1 className="text-left md:text-center text-black/99 text-2xl font-semibold sm:text-4xl md:text-5xl">
          Dedicated Trading Terminals
        </h1>
        <p className="text-gray-400 text-base font-medium sm:text-lg">
          We&apos;ve built specialized terminals for traders who demand
          precision and focus
        </p>
      </motion.div>

      {/* Mobile Carousel View */}
      <div className="lg:hidden w-full max-w-[1300px]">
        <div className="relative">
          {/* Carousel Card */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={carouselVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 },
              }}
              className="relative h-[400px] w-full overflow-hidden rounded-2xl"
              style={{
                backgroundImage: `linear-gradient(298deg, ${activeTerminal.colors})`,
                backgroundSize: "300% 300%",
                animation: `${activeTerminal.animation} 10s ease infinite`,
              }}
            >
              {/* Soft glowing overlays */}
              <div
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(ellipse 620px 620px at 50% 120%, ${activeTerminal.termColor}25 0%, transparent 50%),
                               radial-gradient(ellipse 620px 620px at -20% -30%, ${activeTerminal.termColor}15 0%, transparent 50%),
                               radial-gradient(ellipse 620px 620px at 120% -30%, ${activeTerminal.termColor}15 0%, transparent 50%)`,
                  mixBlendMode: "screen",
                  opacity: 0.35,
                  filter: "blur(80px)",
                }}
              ></div>

              {/* Content */}
              <div className="relative z-10 flex h-full flex-col items-center justify-center gap-6 px-6 sm:gap-8 sm:px-8">
                <div className="flex w-full max-w-md flex-col gap-2 sm:gap-2.5">
                  <h3 className="text-xl font-semibold text-white sm:text-2xl">
                    {activeTerminal.title}{" "}
                    <span
                      style={{ color: activeTerminal.termColor }}
                      className="drop-shadow-[0_0_6px_rgba(0,0,0,0.6)]"
                    >
                      {activeTerminal.highlight}
                    </span>
                  </h3>
                  <p className="text-sm font-medium leading-relaxed text-white/80 sm:text-base">
                    {activeTerminal.description}
                  </p>
                </div>

                {/* Image */}
                <div className="h-48 w-full max-w-lg overflow-hidden rounded-lg sm:h-64">
                  <img
                    src={activeTerminal.image}
                    alt={`${activeTerminal.title} ${activeTerminal.highlight}`}
                    className="h-full w-full object-contain"
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows - Bottom Left */}
          <div className="mt-8 flex items-center gap-2 z-20">
            <button
              onClick={goToPrevious}
              disabled={activeIndex === 0}
              className="flex items-center justify-center disabled:opacity-10 disabled:cursor-not-allowed w-10 h-10 rounded-full bg-[#058172] shadow-lg hover:bg-[#047a6b] transition-colors"
              aria-label="Previous terminal"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={goToNext}
              disabled={activeIndex === terminals.length - 1}
              className="flex items-center justify-center disabled:opacity-10 disabled:cursor-not-allowed w-10 h-10 rounded-full bg-[#058172] shadow-lg hover:bg-[#047a6b] transition-colors"
              aria-label="Next terminal"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Grid View */}
      <div className="max-lg:hidden overflow-hidden flex w-full max-w-[80rem] mx-auto flex-col gap-4 md:gap-5">
        {[0, 2].map((start) => (
          <div
            key={start}
            className="grid grid-cols-1 gap-4 md:gap-5 lg:grid-cols-2"
          >
            {terminals.slice(start, start + 2).map((terminal, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-200px" }}
                variants={index === 0 ? cardVariantsLeft : cardVariantsRight}
                transition={{
                  duration: 1.0,
                  delay: 0.3 + index * 0.25,
                  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                }}
                className="relative h-[350px] w-full overflow-hidden rounded-2xl sm:h-[500px] md:h-[550px] lg:h-[500px] lg:rounded-3xl"
                style={{
                  backgroundImage: `linear-gradient(298deg, ${terminal.colors})`,
                  backgroundSize: "300% 300%",
                  animation: `${terminal.animation} 10s ease infinite`,
                }}
              >
                {/* Soft glowing overlays */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(ellipse 620px 620px at 50% 120%, ${terminal.termColor}25 0%, transparent 50%),
                                 radial-gradient(ellipse 620px 620px at -20% -30%, ${terminal.termColor}15 0%, transparent 50%),
                                 radial-gradient(ellipse 620px 620px at 120% -30%, ${terminal.termColor}15 0%, transparent 50%)`,
                    mixBlendMode: "screen",
                    opacity: 0.35,
                    filter: "blur(80px)",
                  }}
                ></div>

                {/* Content */}
                <div className="relative z-10 flex h-full flex-col items-center justify-center gap-6 p-8 text-center sm:gap-8 md:gap-10 md:text-start">
                  <motion.div
                    variants={contentVariants}
                    transition={{
                      duration: 0.9,
                      delay: 0.5 + index * 0.25,
                      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                    }}
                    className="flex w-full max-w-lg flex-col gap-2 sm:gap-2.5"
                  >
                    <h3 className="text-xl font-semibold text-white sm:text-2xl">
                      {terminal.title}{" "}
                      <span
                        style={{ color: terminal.termColor }}
                        className="drop-shadow-[0_0_6px_rgba(0,0,0,0.6)]"
                      >
                        {terminal.highlight}
                      </span>
                    </h3>
                    <p className="text-sm font-medium leading-relaxed text-white/80 sm:text-base md:text-lg lg:text-xl">
                      {terminal.description}
                    </p>
                  </motion.div>

                  {/* Image */}
                  <motion.div
                    variants={imageVariants}
                    transition={{
                      duration: 1.0,
                      delay: 0.7 + index * 0.25,
                      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                    }}
                    className="h-48 w-full max-w-lg overflow-hidden rounded-lg sm:h-64 md:h-72 lg:h-80 lg:rounded-xl"
                  >
                    <img
                      src={terminal.image}
                      alt={`${terminal.title} ${terminal.highlight}`}
                      className="h-full w-full object-contain rounded-xl"
                    />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        ))}
      </div>

      {/* Inline Keyframes */}
      <style jsx>{`
        @keyframes gradientAnimationBlue {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        @keyframes gradientAnimationPurple {
          0% {
            background-position: 100% 0%;
          }
          50% {
            background-position: 0% 100%;
          }
          100% {
            background-position: 100% 0%;
          }
        }
        @keyframes gradientAnimationLightGreen {
          0% {
            background-position: 50% 0%;
          }
          25% {
            background-position: 0% 50%;
          }
          75% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 50% 0%;
          }
        }
        @keyframes gradientAnimationGreen {
          0% {
            background-position: 0% 100%;
          }
          33% {
            background-position: 100% 0%;
          }
          66% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 0% 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default TradingTerminals;
