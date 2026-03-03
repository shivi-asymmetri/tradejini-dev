"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform, useMotionValueEvent, Variants } from "framer-motion";

const containerVariants : Variants= {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.25, delayChildren: 0.3 } },
};

const itemVariants : Variants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const itemBottomVariants : Variants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const desktopCardVariants : Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const desktopContainerVariants : Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
};

const mainContentVariants : Variants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.2, delayChildren: 0.2 } },
};

const mainContentBottomVariants : Variants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.2, delayChildren: 0.2 } },
};



const FeaturesGrid = () => {
  const features = [
    {
      title: "Demo Platform",
      description:
        "Mock Market Platform Explore CubePlus features without opening an account",
      link: "https://cubeplus-demo.tradejini.com/app/dashboard",
      circleImage: "/listings/features/1.svg",
    },
    {
      title: "Never miss an IPO application",
      description:
        "Get notified, apply & track IPO allotments directly through CubePlus",
      link: "https://www.tradejini.com/ipo",
      circleImage: "/listings/features/2.svg",
    },
    {
      title: "Easy User Guide",
      description:
        "Step-by-step guides to ensure you never feel stuck while using CubePlus",
      link: "https://userguide-cp.tradejini.com/index.html",
      circleImage: "/listings/features/3.svg",
    },
    {
      title: "Real Time Customer Support",
      description:
        "Skip the bots. Connect with our support team in seconds",
      link: "https://www.tradejini.com/support",
      circleImage: "/listings/features/4.svg",
    },
    {
      title: "Financial Kickstarter",
      description:
        "Look up financial jargon and turn it into practical knowledge.",
      link: "https://www.tradejini.com/finance-kickstarter",
      circleImage: "/listings/features/5.svg",
    },
    {
      title: "Jiniversity",
      description:
        "Level up your strategies through blogs, videos and research reports.",
      link: "https://www.tradejini.com/blogs",
      circleImage: "/listings/features/6.svg",
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

  // Calculate active card based on scroll progress
  useMotionValueEvent(marqueeProgress, "change", (latest) => {
    // Map scroll progress (0 to 0.85) to card index (0 to 5)
    // Divide progress into 6 segments
    const cardIndex = Math.min(
      Math.floor((latest / 0.85) * features.length),
      features.length - 1
    );
    setActiveCardIndex(cardIndex);
  });

  // Slide the entire row left, adjusted for 6 cards
  const rowX = useTransform(
    marqueeProgress,
    [0, 0.5, 0.85],
    ["0%", "0%", "-50%"]
  );

  return (
    <div className="relative w-full py-12 md:py-32">
      {/* Background image */}
      <img
        src="/listings/features-bg.png"
        alt="Features background"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover object-bottom"
      />
      {/* Header Section */}
      <div className="relative z-10 px-4 md:px-8 lg:px-12 xl:px-16">
        {/* Mobile View - Slide from Bottom */}
        <motion.div className="mb-4 md:mb-16 text-left block md:hidden" variants={mainContentBottomVariants} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.2 }} transition={{ delay: 0.2 }}>
          <motion.h1 variants={mainContentBottomVariants} className="text-2xl font-bold leading-tight text-white">
            A powerful tool? Absolutely
          </motion.h1>

          <motion.p variants={mainContentBottomVariants} className="text-white text-2xl font-medium">
            It doesn&apos;t end there. We offer more than just the product.
          </motion.p>

          <motion.p variants={mainContentBottomVariants} className="mt-4 mx-auto max-w-2xl text-left text-base leading-relaxed text-white/55">
            From guided tutorials and real-time support to seamless integrations,
            every detail is built to make your trading journey smoother and more
            efficient. Whether you are exploring strategies, learning on the go,
            or building your own setup, reaching out for help, Tradejini is right
            there with you.
          </motion.p>
        </motion.div>

        {/* Desktop View - Slide from Left */}
        <motion.div className="mb-4 md:mb-16 text-left md:text-center hidden md:block" variants={mainContentVariants} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.2 }} transition={{ delay: 0.2 }}>
          <motion.h1 variants={mainContentVariants} className="md:mb-4 text-2xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
            A powerful tool? Absolutely
          </motion.h1>

          <motion.p variants={mainContentVariants} className="text-white md:text-white/70 text-2xl font-medium">
            It doesn&apos;t end there. We offer more than just the product.
          </motion.p>

          <motion.p variants={mainContentVariants} className="mt-4 md:mt-16 mx-auto max-w-2xl text-left md:text-center text-base leading-relaxed text-white/55 md:text-lg">
            From guided tutorials and real-time support to seamless integrations,
            every detail is built to make your trading journey smoother and more
            efficient. Whether you are exploring strategies, learning on the go,
            or building your own setup, reaching out for help, Tradejini is right
            there with you.
          </motion.p>
        </motion.div>

        {/* Mobile: Normal scrolling cards */}
        <motion.div 
          className="lg:hidden space-y-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
          transition={{ delay: 0.3 }}
        >
          {features.map((feature, index) => (
            <Link
              key={index}
              href={feature.link}
              className="group relative flex bg-[#FCFCFC]/3 backdrop-blur-[28px] overflow-hidden rounded-sm border border-white/10 p-6 transition-all duration-300 hover:border-[#058172] hover:shadow-[0_0_30px_rgba(0,255,136,0.15)]"
            >
              <motion.div 
                className="flex items-start gap-4"
                variants={itemBottomVariants}
              >
                {/* Icon on left for mobile */}
                <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full">
                  <img src={feature.circleImage} alt="icon"/>
                </div>
                
                {/* Content on right for mobile */}
                <div className="flex-1">
                  <h3 className="mb-2 text-base font-semibold leading-tight text-white">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-300">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>

        {/* Desktop: Horizontal scroll */}
        <div
          ref={sectionRef}
          className="relative max-w-[90rem] mx-auto h-[300vh] hidden lg:block"
        >
          {/* Sticky viewport with horizontally sliding cards */}
          <div className="sticky top-[20vh] h-[65vh] overflow-hidden">
            {/* Horizontal card row driven by scroll */}
            <div className="relative z-10 flex h-full items-center">
              <motion.div
                className="w-[3600px] md:w-[4200px] lg:w-[4800px] xl:w-[5400px] flex justify-end gap-10 px-4 sm:px-6"
                style={{ x: rowX }}
                variants={desktopContainerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.2 }}
                transition={{ delay: 0.4 }}
              >
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    variants={desktopCardVariants}
                  >
                    <Link
                      href={feature.link}
                      className={`group relative flex w-[280px] sm:w-[320px] md:w-[360px] lg:min-h-[400px] bg-[#FCFCFC]/3 backdrop-blur-[28px] flex-col overflow-hidden rounded-sm border lg:px-6 lg:pb-6 lg:pt-8 p-6 transition-all duration-300 ${
                        activeCardIndex === index
                          ? "border-[#058172] shadow-[0_0_30px_rgba(0,255,136,0.15)] scale-105"
                          : "border-white/10 hover:border-[#058172] hover:shadow-[0_0_30px_rgba(0,255,136,0.15)]"
                      }`}
                    >
                    {/* Number Label - Top Left */}
                    <div className="absolute left-6 top-5 text-xl font-regular tracking-[0.2em] text-white/30">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    {/* Circular Arrow Icon - Top Right */}
                    <div className="absolute right-5 top-4 flex items-center justify-center p-2 rounded-sm border border-[#058172]/60">
                      <img src="/right-arrow.png" alt="right arrow" className="w-full h-auto" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 mt-16 flex flex-1 flex-col">
                      {/* Feature Title */}
                      <h3 className="mb-3 text-lg font-semibold leading-tight text-white">
                        {feature.title}
                      </h3>

                      {/* Feature Description */}
                      <p className="mb-8 flex-1 text-md leading-relaxed text-gray-300">
                        {feature.description}
                      </p>
                    </div>

                    <img src={feature.circleImage} alt="icon" className="w-60 h-auto rounded-full absolute -bottom-10 -right-10" />
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesGrid;
