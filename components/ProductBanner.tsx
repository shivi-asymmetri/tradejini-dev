"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import LightRays from "../components/LightRays";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
        },
    },
};

// Images to cycle through on scroll
const bannerImages = [
    "/mockup.png",
    "/mockup-2.png",
];

export default function ProductBanner() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Text opacity - fades out slowly as image 2 moves up
    const textOpacity = useTransform(scrollYProgress, [0, 0.5, 0.95], [1, 1, 0]);

    // Transform scroll progress to opacity and scale for each image
    // Image 1: starts lower, moves up on scroll, then scales up and fades out (zooms past the viewer) - slower transition
    const opacity1 = useTransform(scrollYProgress, [0, 0.4, 0.6], [1, 1, 0]);
    const scale1 = useTransform(scrollYProgress, [0, 0.4, 0.6], [1, 1, 1.15]);
    const filter1 = useTransform(scrollYProgress, [0.4, 0.6], ["blur(0px)", "blur(10px)"]);
    const rotateX1 = useTransform(scrollYProgress, [0.4, 0.6], [0, -8]);
    const y1 = useTransform(scrollYProgress, [0, 0.15, 0.35, 0.4], [isMobile ? 80 : 120, isMobile ? -50 : -100, isMobile ? -130 : -180, isMobile ? -130 : -180]);

    // Image 2: starts small and behind, scales up as it comes into view, then moves up to cover text
    const opacity2 = useTransform(scrollYProgress, [0.4, 0.6, 1], [0, 1, 1]);
    const scale2 = useTransform(scrollYProgress, [0.4, 0.6, 0.75, 1], [0.75, 1, 1.05, 1.1]);
    const filter2 = useTransform(scrollYProgress, [0.4, 0.6], ["blur(6px)", "blur(0px)"]);
    const y2 = useTransform(scrollYProgress, [0.4, 0.6, 1], [isMobile ? -130 : -180, isMobile ? -130 : -180, isMobile ? -80 : -220]);

    return (
        // Tall scroll container - this creates the scroll space for sticky effect
        <div ref={containerRef} className="relative h-[350vh] w-full bg-[#000000]">
            {/* Sticky wrapper - stays fixed while scrolling through the container */}
            <div className="sticky top-16 h-screen w-full overflow-hidden">
                {/* Banner Container */}
                <div
                    className="relative h-full w-full bg-[#000000] flex flex-col overflow-hidden"
                >
                    {/* LightRays Background */}
                    <div className="absolute inset-0 z-0">
                        <LightRays
                            raysOrigin="top-center"
                            raysColor="#38b990"
                            raysSpeed={1}
                            lightSpread={3}
                            rayLength={5}
                            pulsating={false}
                            fadeDistance={3}
                            saturation={0.6}
                            followMouse
                            mouseInfluence={0.1}
                            noiseAmount={0}
                            distortion={0}
                        />
                    </div>

                    {/* Content */}
                    <motion.div
                        className="relative z-10 flex flex-col items-center pt-12 md:pt-16 lg:pt-20 px-6 flex-1"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        {/* Text content wrapper - fades on scroll */}
                        <motion.div
                            style={{ opacity: textOpacity }}
                            className="flex flex-col items-center"
                        >
                            {/* Heading */}
                            <motion.h1
                                variants={itemVariants}
                                className="text-center text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight"
                            >
                                The Platform You Deserve.
                            </motion.h1>
                            <motion.h1
                                variants={itemVariants}
                                className="text-center text-2xl md:text-4xl lg:text-5xl font-bold leading-tight mt-1"
                            >
                                <span className="text-[#00BD67]">The Power You Need.</span>
                            </motion.h1>

                            {/* Subtitle */}
                            <motion.p
                                variants={itemVariants}
                                className="mt-4 md:mt-6 text-center text-sm md:text-base text-white/60 max-w-md"
                            >
                                For traders who demand precision, not confusion. Get powerful
                                tools & clean interface you need to trade with confidence.
                            </motion.p>

                            {/* Button */}
                            <motion.div variants={itemVariants} className="mt-6 md:mt-8">
                                <Link href="https://cubeplus.tradejini.com/" target="_blank">
                                    <button className="px-8 py-3 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm text-white text-sm md:text-base font-medium hover:bg-white/20 transition-all duration-300">
                                        Get started
                                    </button>
                                </Link>
                            </motion.div>
                        </motion.div>

                        {/* Scroll-based Image Carousel - centered in remaining space */}
                        <div className="mt-8 md:mt-12 w-full max-w-4xl relative flex-1 min-h-[250px] sm:min-h-[320px] md:min-h-[400px] flex items-center justify-center">
                            <div
                                className="relative w-full h-[250px] sm:h-[320px] md:h-[400px] lg:h-[450px]"
                                style={{ perspective: "1200px" }}
                            >
                                {/* Image 1 - starts lower, moves up on scroll, then scales up, blurs and fades out */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <motion.img
                                        src={bannerImages[0]}
                                        alt="CubePlus Web Platform"
                                        style={{
                                            opacity: opacity1,
                                            scale: scale1,
                                            y: y1,
                                            rotateX: rotateX1,
                                            filter: filter1,
                                        }}
                                        className="max-w-full max-h-full w-auto h-auto object-contain drop-shadow-2xl will-change-transform origin-center"
                                    />
                                </div>

                                {/* Image 2 - emerges from behind with scale up and unblur */}
                                <motion.img
                                    src={bannerImages[1]}
                                    alt="Hive Platform"
                                    style={{
                                        opacity: opacity2,
                                        scale: scale2,
                                        y: y2,
                                        filter: filter2,
                                    }}
                                    className="absolute inset-0 w-full h-full object-contain drop-shadow-2xl will-change-transform origin-center"
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
