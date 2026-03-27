"use client";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  usePresence,
} from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Terminal = {
  title: string;
  highlight: string;
  description: string;
  colors: string;
  termColor: string;
  image: string;
  webm: string;
  mp4: string;
};

const REVEAL_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const REVEAL_DURATION = 0.85;
const HEADER_DURATION = 0.9;
const REVEAL_VIEWPORT = { once: false, amount: 0.2 };
const CARD_VIEWPORT = { once: false, amount: 0.18 };
/** Negative % is valid for IntersectionObserver but narrower than framer-motion's MarginType. */
const DESKTOP_SEQUENCE_VIEWPORT = {
  amount: 0.2,
  margin: "0px 0px -10% 0px",
} as NonNullable<Parameters<typeof useInView>[1]>;

const TERMINALS: Terminal[] = [
  {
    title: "Scalper",
    highlight: "Terminal",
    description:
      "One-click order execution with ultra-low latency, built for scalpers who trade in split seconds.",
    colors: "#10201d 0%, #0b5f54 100%",
    termColor: "#3db5a8",
    image: "/listings/terminal-1.png",
    webm: "https://5bxzwezzqwfyfzs4.public.blob.vercel-storage.com/terminal-1.webm",
    mp4: "https://5bxzwezzqwfyfzs4.public.blob.vercel-storage.com/terminal-1.mp4",
  },
  {
    title: "Option",
    highlight: "Terminal",
    description:
      "Build, analyze, and execute strategies with Greeks, OI and pay-off charts on a single screen.",
    colors: "#1a2030 0%, #5569a8 100%",
    termColor: "#8ba3e8",
    image: "/listings/terminal-2.png",
    webm: "https://5bxzwezzqwfyfzs4.public.blob.vercel-storage.com/terminal-2.webm",
    mp4: "https://5bxzwezzqwfyfzs4.public.blob.vercel-storage.com/terminal-2.mp4",
  },
  {
    title: "Decade",
    highlight: "View",
    description:
      "Explore over 10 years of company history, financials, and performance metrics",
    colors: "#13303a 0%, #1e89ab 100%",
    termColor: "#05a8d6",
    image: "/listings/terminal-3.png",
    webm: "https://5bxzwezzqwfyfzs4.public.blob.vercel-storage.com/terminal-3.webm",
    mp4: "https://5bxzwezzqwfyfzs4.public.blob.vercel-storage.com/terminal-3.mp4",
  },
  {
    title: "Chart",
    highlight: "Terminal",
    description:
      "Trade straight from charts with pro grade, indicators, multi chart layout, drawing tools, and one-click execution.",
    colors: "#1b2f20 0%, #2a8a42 100%",
    termColor: "#2dc557",
    image: "/listings/terminal-4.png",
    webm: "https://5bxzwezzqwfyfzs4.public.blob.vercel-storage.com/terminal-4.webm",
    mp4: "https://5bxzwezzqwfyfzs4.public.blob.vercel-storage.com/terminal-4.mp4",
  },
];

const cardVariantsLeft = {
  hidden: {
    opacity: 0,
    x: -72,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: REVEAL_DURATION,
      delay: 0.12,
      ease: REVEAL_EASE,
    },
  },
};

const cardVariantsRight = {
  hidden: {
    opacity: 0,
    x: 72,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: REVEAL_DURATION,
      delay: 0.12,
      ease: REVEAL_EASE,
    },
  },
};

const contentVariants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: REVEAL_EASE,
    },
  },
};

const carouselVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 120 : -120,
    opacity: 0,
    scale: 0.99,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -120 : 120,
    opacity: 0,
    scale: 0.99,
  }),
};

const headerBottomVariants = {
  hidden: {
    opacity: 0,
    y: 36,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: HEADER_DURATION,
      delay: 0.12,
      ease: REVEAL_EASE,
    },
  },
};

const surfaceMotionStyle = {
  willChange: "transform, opacity",
  transform: "translateZ(0)",
  backfaceVisibility: "hidden" as const,
};

const getTerminalSurfaceStyle = (terminal: Terminal) => ({
  ...surfaceMotionStyle,
  backgroundImage: `linear-gradient(298deg, ${terminal.colors})`,
  backgroundColor: "#0b1012",
  backgroundSize: "cover",
  backgroundPosition: "center",
});

const getGlowStyle = (terminal: Terminal) => ({
  background: `radial-gradient(ellipse 620px 620px at 50% 120%, ${terminal.termColor}25 0%, transparent 50%),
               radial-gradient(ellipse 620px 620px at -20% -30%, ${terminal.termColor}15 0%, transparent 50%),
               radial-gradient(ellipse 620px 620px at 120% -30%, ${terminal.termColor}15 0%, transparent 50%)`,
  mixBlendMode: "screen" as const,
  opacity: 0.35,
  filter: "blur(80px)",
  transform: "translateZ(0)",
  pointerEvents: "none" as const,
});

const TerminalVideo = memo(function TerminalVideo({
  terminal,
  className,
  preload = "metadata",
  shouldPlay,
  loop = false,
  onEnded,
}: {
  terminal: Terminal;
  className: string;
  preload?: "none" | "metadata" | "auto";
  shouldPlay: boolean;
  loop?: boolean;
  onEnded?: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || loop) return;

    const paintPausedFrame = () => {
      const v = videoRef.current;
      if (!v || loop || shouldPlay) return;
      v.pause();
      try {
        v.currentTime = 0;
      } catch {
        /* ignore */
      }
    };

    video.addEventListener("loadeddata", paintPausedFrame);
    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      paintPausedFrame();
    }
    return () => video.removeEventListener("loadeddata", paintPausedFrame);
  }, [shouldPlay, loop, terminal.mp4, terminal.webm]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.loop = loop;

    if (shouldPlay) {
      void video.play().catch(() => {});
      return;
    }

    video.pause();
    if (!loop) {
      try {
        video.currentTime = 0;
      } catch {
        /* ignore */
      }
    }
  }, [shouldPlay, loop, terminal.mp4, terminal.webm]);

  return (
    <video
      ref={videoRef}
      className={className}
      loop={loop}
      muted
      playsInline
      webkit-playsinline="true"
      preload={preload}
      disablePictureInPicture
      onEnded={onEnded}
      style={{
        backgroundColor:"transparent",
        willChange: "transform",
        transform: "translateZ(0)",
        backfaceVisibility: "hidden",
      }}
    >
      <source src={terminal.webm} type="video/webm" />
      <source src={terminal.mp4} type='video/mp4' />
    </video>
  );
});

const MobileCarouselVideo = memo(function MobileCarouselVideo({
  terminal,
  className,
}: {
  terminal: Terminal;
  className: string;
}) {
  const [isPresent] = usePresence();
  return (
    <TerminalVideo
      terminal={terminal}
      className={className}
      preload="auto"
      shouldPlay={isPresent}
      loop
    />
  );
});

const DesktopTerminalCard = memo(function DesktopTerminalCard({
  terminal,
  index,
  shouldPlay,
  onVideoEnded,
}: {
  terminal: Terminal;
  index: number;
  shouldPlay: boolean;
  onVideoEnded: () => void;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={CARD_VIEWPORT}
      variants={index === 0 ? cardVariantsLeft : cardVariantsRight}
      transition={{
        duration: REVEAL_DURATION,
        delay: 0.18 + index * 0.14,
        ease: REVEAL_EASE,
      }}
      className="relative h-[350px] w-full overflow-hidden rounded-2xl sm:h-[500px] md:h-[550px] lg:h-[500px] lg:rounded-3xl"
      style={getTerminalSurfaceStyle(terminal)}
    >
      <div className="absolute inset-0" style={getGlowStyle(terminal)}></div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center gap-0 p-6 text-center md:text-start">
        <motion.div
          variants={contentVariants}
          transition={{
            duration: 0.75,
            delay: 0.28 + index * 0.12,
            ease: REVEAL_EASE,
          }}
          className="flex w-full flex-col gap-2 sm:gap-2.5"
          style={surfaceMotionStyle}
        >
          <h3 className="px-4 text-xl font-semibold text-white sm:text-2xl">
            {terminal.title}{" "}
            <span
              style={{ color: terminal.termColor }}
              className="drop-shadow-[0_0_6px_rgba(0,0,0,0.6)]"
            >
              {terminal.highlight}
            </span>
          </h3>
          <p className="px-4 text-sm font-medium leading-relaxed text-white/80 sm:text-base md:text-lg lg:text-xl">
            {terminal.description}
          </p>
        </motion.div>

        <TerminalVideo
          terminal={terminal}
          className="h-full w-full object-cover"
          preload={shouldPlay ? "auto" : "metadata"}
          shouldPlay={shouldPlay}
          loop={false}
          onEnded={onVideoEnded}
        />
      </div>
    </motion.div>
  );
});

const TradingTerminals = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 1 for next, -1 for previous
  const [desktopPlayingIndex, setDesktopPlayingIndex] = useState(0);
  const desktopGridRef = useRef<HTMLDivElement>(null);
  const isDesktopGridInView = useInView(desktopGridRef, DESKTOP_SEQUENCE_VIEWPORT);
  const desktopGridInViewRef = useRef(isDesktopGridInView);

  useEffect(() => {
    desktopGridInViewRef.current = isDesktopGridInView;
  }, [isDesktopGridInView]);

  useEffect(() => {
    if (!isDesktopGridInView) {
      setDesktopPlayingIndex(0);
    }
  }, [isDesktopGridInView]);

  const advanceDesktopVideo = useCallback(() => {
    if (!desktopGridInViewRef.current) return;
    setDesktopPlayingIndex((i) => (i + 1) % TERMINALS.length);
  }, []);

  const goToNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      if (nextIndex >= TERMINALS.length) return 0;
      return nextIndex;
    });
  }, []);

  const goToPrevious = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prevIndex) => {
      const nextIndex = prevIndex - 1;
      if (nextIndex < 0) return TERMINALS.length - 1;
      return nextIndex;
    });
  }, []);

  const activeTerminal = TERMINALS[activeIndex];

  return (
    <div className="flex flex-col items-center bg-white px-4 pt-6 sm:px-6 md:px-8 md:pt-12">
      {/* Header */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={REVEAL_VIEWPORT}
        variants={headerBottomVariants}
        className="mb-8 flex max-w-4xl flex-col items-start gap-3 text-left md:text-center"
        style={surfaceMotionStyle}
      >
        <h1 className="text-left text-black/99 text-2xl font-semibold sm:text-4xl md:text-5xl">
          Dedicated Trading Terminals
        </h1>
        <p className="text-gray-400 text-base font-medium sm:text-lg md:text-lg lg:text-xl">
          We&apos;ve built specialized terminals for traders who demand
          precision and focus
        </p>
      </motion.div>


      {/* Mobile Carousel View */}
      <div className="lg:hidden w-full max-w-[1300px]">
        <div className="relative">
          {/* Carousel Card */}
          <div className="relative h-[400px] w-full overflow-hidden rounded-2xl">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={carouselVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: {
                    type: "spring",
                    stiffness: 260,
                    damping: 30,
                    mass: 0.8,
                    restDelta: 0.001,
                  },
                  opacity: { duration: 0.24, ease: REVEAL_EASE },
                  scale: { duration: 0.24, ease: REVEAL_EASE },
                }}
                className="absolute inset-0 overflow-hidden rounded-2xl"
      style={getTerminalSurfaceStyle(activeTerminal)}
              >
                {/* Soft glowing overlays */}
                <div
                  className="absolute inset-0"
                  style={getGlowStyle(activeTerminal)}
                ></div>

                {/* Content */}
                <div className="relative z-10 flex h-full flex-col items-center justify-center gap-0 px-6 sm:px-8">
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
                    <MobileCarouselVideo
                      terminal={activeTerminal}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

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
              disabled={activeIndex === TERMINALS.length - 1}
              className="flex items-center justify-center disabled:opacity-10 disabled:cursor-not-allowed w-10 h-10 rounded-full bg-[#058172] shadow-lg hover:bg-[#047a6b] transition-colors"
              aria-label="Next terminal"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Grid View */}
      <div
        ref={desktopGridRef}
        className="max-lg:hidden overflow-hidden flex w-full max-w-[80rem] mx-auto flex-col gap-4 md:gap-5"
      >
        {[0, 2].map((start) => (
          <div
            key={start}
            className="grid grid-cols-1 gap-4 md:gap-5 lg:grid-cols-2"
          >
            {TERMINALS.slice(start, start + 2).map((terminal, sliceIndex) => {
              const absoluteIndex = start + sliceIndex;
              return (
                <DesktopTerminalCard
                  key={terminal.title}
                  terminal={terminal}
                  index={sliceIndex}
                  shouldPlay={
                    isDesktopGridInView &&
                    desktopPlayingIndex === absoluteIndex
                  }
                  onVideoEnded={advanceDesktopVideo}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TradingTerminals;
