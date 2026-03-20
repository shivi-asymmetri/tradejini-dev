"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

const itemVariants = {
  hidden: { 
    opacity: 0, 
    x: -20,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const desktopCardVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.95,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const desktopContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const mainContentVariants = {
  hidden: { 
    opacity: 0, 
    x: -20,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

const mainContentBottomVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

// Mobile card stack
const mobileStackContainer = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const mobileStackCard = {
  initial: { opacity: 0, y: 24, scale: 0.98 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};



const FeaturesGrid = () => {
  const features = [
    {
      title: "Demo Platform",
      description:
        "Mock Market Platform Explore CubePlus features without opening an account",
      link: "https://cubeplus-demo.tradejini.com/app/dashboard",
      circleImage: "/listings/features/1.svg",
      mobileImage: "/listings/features-mobile/1.svg",
    },
    {
      title: "Never miss an IPO application",
      description:
        "Get notified, apply & track IPO allotments directly through CubePlus",
      link: "https://www.tradejini.com/ipo",
      circleImage: "/listings/features/2.svg",
      mobileImage: "/listings/features-mobile/2.svg",
    },
    {
      title: "Easy User Guide",
      description:
        "Step-by-step guides to ensure you never feel stuck while using CubePlus",
      link: "https://userguide-cp.tradejini.com/index.html",
      circleImage: "/listings/features/3.svg",
      mobileImage: "/listings/features-mobile/3.svg",
    },
    {
      title: "Real Time Customer Support",
      description:
        "Skip the bots. Connect with our support team in seconds",
      link: "https://www.tradejini.com/support",
      circleImage: "/listings/features/4.svg",
      mobileImage: "/listings/features-mobile/4.svg",
    },
    {
      title: "Financial Kickstarter",
      description:
        "Look up financial jargon and turn it into practical knowledge.",
      link: "https://www.tradejini.com/finance-kickstarter",
      circleImage: "/listings/features/5.svg",
      mobileImage: "/listings/features-mobile/5.svg",
    },
    {
      title: "Jiniversity",
      description:
        "Level up your strategies through blogs, videos and research reports.",
      link: "https://www.tradejini.com/blogs",
      circleImage: "/listings/features/6.svg",
      mobileImage: "/listings/features-mobile/6.svg",
    },
  ];

  // Sticky section scroll progress (pin the section and drive horizontal motion)
  const sectionRef = React.useRef<HTMLDivElement | null>(null);
  const { scrollYProgress: marqueeProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  // Track active card index based on scroll progress
  const [activeCardIndex, setActiveCardIndex] = React.useState(0);

  const progressToCardIndex = React.useCallback(
    (latest: number) =>
      Math.min(
        Math.floor(latest * features.length),
        features.length - 1
      ),
    [features.length]
  );

  // Align with scroll position on mount / layout (e.g. refresh mid-page)
  React.useLayoutEffect(() => {
    setActiveCardIndex(progressToCardIndex(marqueeProgress.get()));
  }, [marqueeProgress, progressToCardIndex]);

  useMotionValueEvent(marqueeProgress, "change", (latest) => {
    setActiveCardIndex(progressToCardIndex(latest));
  });

  /**
   * Desktop carousel: symmetric bookends so card 0 and the last card both sit dead-center,
   * with empty (dark) space on the outer side — scroll steps only slide by card+gap.
   */
  const CARD_WIDTH_PX = 360;
  const CARD_GAP_PX = 40; // gap-10

  const viewportRef = React.useRef<HTMLDivElement | null>(null);
  const [viewportWidth, setViewportWidth] = React.useState(0);

  React.useLayoutEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const update = () => setViewportWidth(el.clientWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const step = CARD_WIDTH_PX + CARD_GAP_PX;
  const edgePad =
    viewportWidth > 0
      ? Math.max(0, viewportWidth / 2 - CARD_WIDTH_PX / 2)
      : 0;

  /** Clone last / first cards on desktop so the strip loops visually (no empty black at start/end). */
  const desktopCloneCount = Math.min(2, Math.max(0, features.length - 1));
  const desktopLeftClones =
    desktopCloneCount > 0 ? features.slice(-desktopCloneCount) : [];
  const desktopRightClones =
    desktopCloneCount > 0 ? features.slice(0, desktopCloneCount) : [];

  type DesktopTrackItem = {
    key: string;
    feature: (typeof features)[number];
    sourceIndex: number;
    isClone: boolean;
  };

  const desktopTrackItems: DesktopTrackItem[] = [
    ...desktopLeftClones.map((feature, i) => ({
      key: `clone-l-${i}`,
      feature,
      sourceIndex: features.length - desktopCloneCount + i,
      isClone: true as const,
    })),
    ...features.map((feature, i) => ({
      key: `card-${i}`,
      feature,
      sourceIndex: i,
      isClone: false as const,
    })),
    ...desktopRightClones.map((feature, i) => ({
      key: `clone-r-${i}`,
      feature,
      sourceIndex: i,
      isClone: true as const,
    })),
  ];

  const trackX = -(desktopCloneCount + activeCardIndex) * step;

  return (
    <div className="relative w-full py-12 md:py-32">
      <div className="pointer-events-none absolute inset-0 -z-20 hidden bg-[linear-gradient(180deg,#022827_0%,#011615_45%,#000000_100%)] lg:block" />
      <img
        src="/listings/features-wave.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 hidden w-full object-contain object-top lg:block"
      />
      <img
        src="/listings/features-mobile-bg.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 h-full min-h-full w-full object-cover object-center lg:hidden"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-3 z-0 bg-[#00000082] backdrop-blur-xl lg:hidden"
      />
      {/* Header Section */}
      <div className="relative z-10 px-6 md:px-8 lg:px-12 xl:px-16">
        {/* Mobile View - Slide from Bottom */}
        <motion.div className="mb-4 md:mb-16 text-left md:text-center" variants={mainContentBottomVariants} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.2 }} transition={{ delay: 0.2 }}>
          <motion.h1 variants={mainContentBottomVariants} className="text-2xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
            A powerful tool? Absolutely
          </motion.h1>

          <motion.p variants={mainContentBottomVariants} className="text-white/90 md:mt-4 text-2xl md:text-lg lg:text-2xl font-medium">
            It doesn&apos;t end there. We offer more than just the product.
          </motion.p>

          <motion.p variants={mainContentBottomVariants} className="mt-4 md:mt-16 mx-auto max-w-2xl text-left md:text-center text-base md:text-sm lg:text-lg leading-relaxed text-white/55">
            From guided tutorials and real-time support to seamless integrations,
            every detail is built to make your trading journey smoother and more
            efficient. Whether you are exploring strategies, learning on the go,
            or building your own setup, reaching out for help, Tradejini is right
            there with you.
          </motion.p>
        </motion.div>

        {/* Mobile: sticky card stack (same pattern as ProcessSteps) */}
        <motion.div
          className="lg:hidden flex flex-col gap-10"
          variants={mobileStackContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: false, amount: 0.05 }}
        >
          {features.map((feature, index) => (
            <div
              key={feature.link}
              className="sticky flex items-center"
              style={{ top: `${72 + index * 28}px` }}
            >
              <motion.div variants={mobileStackCard} className="w-full">
                <Link
                  href={feature.link}
                  className="group relative flex bg-[#011616]/60 backdrop-blur-xl overflow-hidden rounded-sm border border-white/10 p-6 transition-all duration-300 hover:border-[#058172] hover:shadow-[0_0_30px_rgba(0,255,136,0.15)]"
                >
                  <div className="flex flex-col w-full items-start gap-4">
                    <div
                      className="flex h-14 w-14 shrink-0 items-center justify-center "
                      aria-hidden
                    >
                      <Image
                        src={feature.mobileImage}
                        alt=""
                        width={32}
                        height={32}
                        className="h-8 w-8 object-contain opacity-95"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="mb-2 text-base font-semibold leading-tight text-white">
                        {feature.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-gray-300">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </div>
          ))}
        </motion.div>

        {/* Desktop: scroll-driven carousel; active card centered in viewport */}
        <div
          ref={sectionRef}
          className="relative max-w-[90rem] mx-auto h-[300vh] hidden lg:block"
        >
          <div
            ref={viewportRef}
            className="sticky top-[20vh] h-[65vh] overflow-hidden"
          >
            <div className="relative z-10 flex h-full w-full items-center">
              <motion.div
                className="flex shrink-0 gap-10 will-change-transform"
                style={{
                  paddingLeft: edgePad,
                  paddingRight: edgePad,
                }}
                animate={{ x: trackX }}
                transition={{
                  x: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
                }}
                variants={desktopContainerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
              >
                {desktopTrackItems.map(
                  ({ key, feature, sourceIndex, isClone }) => {
                    const isActive =
                      !isClone && sourceIndex === activeCardIndex;
                    const cardClass = `group relative flex w-full origin-center lg:min-h-[400px] bg-[#FCFCFC]/3 backdrop-blur-[28px] flex-col overflow-hidden rounded-sm border lg:px-6 lg:pb-6 lg:pt-8 p-6 transition-all duration-300 ${
                      isActive
                        ? "border-[#058172] shadow-[0_0_30px_rgba(0,255,136,0.15)] scale-105"
                        : "border-white/10 scale-90 blur-sm"
                    }`;

                    const inner = (decorative: boolean) => (
                      <>
                        <div className="absolute left-6 top-5 text-xl font-regular tracking-[0.2em] text-white/30">
                          {String(sourceIndex + 1).padStart(2, "0")}
                        </div>
                        <div className="absolute right-5 top-4 flex items-center justify-center p-2 rounded-sm border border-[#058172]/60">
                          <img
                            src="/right-arrow.png"
                            alt={decorative ? "" : "right arrow"}
                            className="w-full h-auto"
                            aria-hidden={decorative}
                          />
                        </div>
                        <div className="relative z-10 mt-16 flex flex-1 flex-col">
                          <h3 className="mb-3 text-lg font-semibold leading-tight text-white">
                            {feature.title}
                          </h3>
                          <p className="mb-8 flex-1 text-md leading-relaxed text-gray-300">
                            {feature.description}
                          </p>
                        </div>
                        <img
                          src={feature.circleImage}
                          alt={decorative ? "" : "icon"}
                          className="pointer-events-none w-60 h-auto rounded-full absolute -bottom-10 -right-10"
                          aria-hidden={decorative}
                        />
                      </>
                    );

                    return (
                      <motion.div
                        key={key}
                        variants={desktopCardVariants}
                        className="shrink-0"
                        style={{ width: CARD_WIDTH_PX }}
                      >
                        {isClone ? (
                          <div
                            className={cardClass}
                            aria-hidden
                            tabIndex={-1}
                          >
                            {inner(true)}
                          </div>
                        ) : (
                          <Link href={feature.link} className={cardClass}>
                            {inner(false)}
                          </Link>
                        )}
                      </motion.div>
                    );
                  }
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesGrid;
