"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
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
    "/listings/monitor.png",
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

    // Smooth the scroll progress so animations ease in/out even if the user scrolls quickly
    const smoothScrollYProgress = useSpring(scrollYProgress, {
        stiffness: 80,
        damping: 24,
        mass: 0.6,
    });

    // Text opacity - fades out as soon as the main image reaches the top
    const textOpacity = useTransform(smoothScrollYProgress, [0, 0.15, 0.25], [1, 1, 0]);

    // Transform scroll progress to opacity and scale for each image
    // Image 1: starts lower, moves up on scroll, then slightly scales down as the four images emerge
    const opacity1 = useTransform(smoothScrollYProgress, [0, 0.2, 0.4, 0.6], [1, 1, 1, 1]);
    // As the four images emerge, gently scale down the central image
    // Sync the main image scale with the four images so both finish scaling at the same time
    const scale1 = useTransform(
        smoothScrollYProgress,
        [0.1, 0.4, 0.6, 0.9],
        [1.05, 1, 0.9, 0.9]
    );
    // Blur also finishes increasing when scaling finishes to avoid late visual drift
    const filter1 = useTransform(
        smoothScrollYProgress,
        [0.4, 0.6, 0.9],
        ["blur(0px)", "blur(6px)", "blur(6px)"]
    );
    const rotateX1 = useTransform(smoothScrollYProgress, [0.4, 0.5], [0, 0]);
    const y1 = useTransform(smoothScrollYProgress, [0, 0.15, 0.2, 0.6], [isMobile ? -80 : -120, isMobile ? -160 : -180, isMobile ? -200 : -200, isMobile ? -200 : -200]);

    // Four emerging images: appear more gradually WITH image 1, then remain visible
    // Softer emergence: spread over a wider scroll range so it doesn't feel sudden,
    // and use the smoothed scroll progress so it stays visible even on fast scroll
    const fourImagesOpacity = useTransform(smoothScrollYProgress, [0.15, 0.35, 0.55, 0.85], [0, 1, 1, 1]);
    const fourImagesBlur = useTransform(smoothScrollYProgress, [0.15, 0.35, 0.55, 0.85], ["blur(20px)", "blur(6px)", "blur(0px)", "blur(0px)"]);

    // Individual transforms for each of the four emerging images - positioned around the central image
    // All four images use the same scale for consistent sizing - with a gentle scale-up as they settle
    const fourImagesScale = useTransform(
        smoothScrollYProgress,
        [0.15, 0.4, 0.6, 0.9],
        [0.6, 0.8, 0.9, 0.9]
    );

    // Top Left - smoother emergence from top-left corner, easing out to its final position
    // Added an early "settle" so it stops shifting as much later in the scroll
    const img1X = useTransform(
        smoothScrollYProgress,
        [0.15, 0.4, 0.6, 0.9],
        [
            isMobile ? -160 : -240,
            isMobile ? -140 : -280,
            isMobile ? -140 : -300,
            isMobile ? -140 : -300,
        ]
    );
    const img1Y = useTransform(
        smoothScrollYProgress,
        [0.15, 0.4, 0.6, 0.9],
        [
            isMobile ? -160 : -240,
            isMobile ? -140 : -220,
            isMobile ? -140 : -180,
            isMobile ? -140 : -180,
        ]
    );

    // Top Right - smoother emergence from top-right corner, easing out to its final position
    const img2X = useTransform(
        smoothScrollYProgress,
        [0.15, 0.4, 0.6, 0.9],
        [
            isMobile ? 160 : 240,
            isMobile ? 140 : 280,
            isMobile ? 140 : 300,
            isMobile ? 140 : 300,
        ]
    );
    const img2Y = useTransform(
        smoothScrollYProgress,
        [0.15, 0.4, 0.6, 0.9],
        [
            isMobile ? -160 : -240,
            isMobile ? -140 : -220,
            isMobile ? -140 : -180,
            isMobile ? -140 : -180,
        ]
    );

    // Bottom Left - smoother emergence from bottom-left corner, easing out to its final position
    const img3X = useTransform(
        smoothScrollYProgress,
        [0.15, 0.4, 0.6, 0.9],
        [
            isMobile ? -160 : -240,
            isMobile ? -140 : -280,
            isMobile ? -140 : -300,
            isMobile ? -140 : -300,
        ]
    );
    const img3Y = useTransform(
        smoothScrollYProgress,
        [0.15, 0.4, 0.6, 0.9],
        [
            isMobile ? 160 : 240,
            isMobile ? 140 : 220,
            isMobile ? 140 : 180,
            isMobile ? 140 : 180,
        ]
    );

    // Bottom Right - smoother emergence from bottom-right corner, easing out to its final position
    const img4X = useTransform(
        smoothScrollYProgress,
        [0.15, 0.4, 0.6, 0.9],
        [
            isMobile ? 160 : 240,
            isMobile ? 140 : 280,
            isMobile ? 140 : 300,
            isMobile ? 140 : 300,
        ]
    );
    const img4Y = useTransform(
        smoothScrollYProgress,
        [0.15, 0.4, 0.6, 0.9],
        [
            isMobile ? 160 : 240,
            isMobile ? 140 : 220,
            isMobile ? 140 : 180,
            isMobile ? 140 : 180,
        ]
    );

    return (
        // Tall scroll container - this creates the scroll space for sticky effect
        // Slightly extended height to allow extra scroll after the four images collapse
        <div ref={containerRef} className="relative min-h-screen w-full bg-[#000000] md:h-[260vh]">
            {/* Sticky wrapper - stays fixed while scrolling through the container */}
            <div className="w-full overflow-visible md:sticky md:top-16 md:h-screen md:overflow-hidden">
                {/* Banner Container */}
                <div
                    className="relative w-full bg-[#000000] flex flex-col overflow-hidden md:h-full"
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
                        className="relative z-10 flex flex-col items-center pt-12 px-6 flex-1"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        {/* Text content wrapper - fades on scroll */}
                        <motion.div
                            style={{ opacity: isMobile ? 1 : textOpacity }}
                            className="flex flex-col items-center"
                        >
                            {/* Heading */}
                            <motion.h1
                                variants={itemVariants}
                                className="text-center text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight"
                            >
                                The Platform You Deserve.{" "}<span className="text-[#00BD67]">The Power You Need.</span>
                            </motion.h1>

                            {/* Subtitle */}
                            <motion.p
                                variants={itemVariants}
                                className="mt-4 text-center text-sm md:text-base text-white/60"
                            >
                                For traders who demand precision, not confusion. Get powerful
                                tools & clean interface you need to trade with confidence.
                            </motion.p>
                        </motion.div>

                        {/* Mobile-only video (below text content) */}
                        <div className="mt-8 w-full md:hidden">
                            <div className="relative h-[60svh] min-h-[320px] w-full overflow-hidden">
                                <video
                                    className="h-full w-full object-cover"
                                    src="https://5bxzwezzqwfyfzs4.public.blob.vercel-storage.com/animation.webm"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    webkit-playsinline="true"
                                    preload="auto"
                                    style={{
                                        backgroundColor: 'transparent'
                                    }}
                                />
                            </div>
                        </div>

                        {/* Scroll-based Image Carousel - centered in remaining space */}
                        <div className="mt-8 md:mt-16 w-full max-w-6xl relative flex-1 min-h-[350px] sm:min-h-[450px] md:min-h-[550px] hidden md:flex items-center justify-center">
                            <div
                                className="relative w-full h-[350px] sm:h-[450px] md:h-[550px] lg:h-[650px]"
                                style={{ perspective: "1200px" }}
                            >
                                {/* Image 1 - central image, stays visible while four images emerge */}
                                <div className="absolute inset-0 flex items-center justify-center overflow-visible">
                                    <motion.img
                                        src={bannerImages[0]}
                                        initial={{
                                            opacity: 0,
                                            rotateY: -60,
                                            scaleX: 0.5,
                                            x: -150,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            rotateY: 0,
                                            scaleX: 1,
                                            x: 0,
                                        }}
                                        transition={{
                                            duration: 1.5,
                                            ease: [0.16, 1, 0.3, 1],
                                            delay: 0.4,
                                        }}
                                        alt="CubePlus Web Platform"
                                        style={{
                                            opacity: opacity1,
                                            scale: scale1,
                                            y: y1,
                                            rotateX: rotateX1,
                                            filter: filter1,
                                            transformStyle: "preserve-3d",
                                        }}
                                        className="w-[85%] h-auto object-contain drop-shadow-2xl will-change-transform origin-center"
                                    />
                                </div>

                                {/* Four Emerging Images - appear quickly around the central image */}
                                <motion.div
                                    className="absolute inset-0 flex items-center justify-center"
                                    style={{
                                        y: y1,
                                    }}
                                >
                                    {/* Top Left Screen */}
                                    <motion.img
                                        src={"/one.png"}
                                        alt="Screen 1"
                                        style={{
                                            opacity: fourImagesOpacity,
                                            x: img1X,
                                            y: img1Y,
                                            scale: fourImagesScale,
                                            filter: fourImagesBlur,
                                        }}
                                        className="absolute w-[240px] sm:w-[300px] md:w-[380px] lg:w-[520px] h-auto object-contain rounded-xl overflow-hidden will-change-transform border-2 border-white/40 ring-2 ring-white/25 shadow-[0_0_40px_rgba(15,23,42,0.9)]"
                                    />
                                    {/* Top Right Screen */}
                                    <motion.img
                                        src={"/two.png"}
                                        alt="Screen 2"
                                        style={{
                                            opacity: fourImagesOpacity,
                                            x: img2X,
                                            y: img2Y,
                                            scale: fourImagesScale,
                                            filter: fourImagesBlur,
                                        }}
                                        className="absolute w-[240px] sm:w-[300px] md:w-[380px] lg:w-[520px] h-auto object-contain rounded-xl overflow-hidden will-change-transform border-2 border-white/40 ring-2 ring-white/25 shadow-[0_0_40px_rgba(15,23,42,0.9)]"
                                    />
                                    {/* Bottom Left Screen */}
                                    <motion.img
                                        src={"/three.png"}
                                        alt="Screen 3"
                                        style={{
                                            opacity: fourImagesOpacity,
                                            x: img3X,
                                            y: img3Y,
                                            scale: fourImagesScale,
                                            filter: fourImagesBlur,
                                        }}
                                        className="absolute w-[240px] sm:w-[300px] md:w-[380px] lg:w-[520px] h-auto object-contain rounded-xl overflow-hidden will-change-transform border-2 border-white/40 ring-2 ring-white/25 shadow-[0_0_40px_rgba(15,23,42,0.9)]"
                                    />
                                    {/* Bottom Right Screen */}
                                    <motion.img
                                        src={"/four.png"}
                                        alt="Screen 4"
                                        style={{
                                            opacity: fourImagesOpacity,
                                            x: img4X,
                                            y: img4Y,
                                            scale: fourImagesScale,
                                            filter: fourImagesBlur,
                                        }}
                                        className="absolute w-[240px] sm:w-[300px] md:w-[380px] lg:w-[520px] h-auto object-contain rounded-xl overflow-hidden will-change-transform border-2 border-white/40 ring-2 ring-white/25 shadow-[0_0_40px_rgba(15,23,42,0.9)]"
                                    />
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div >
    );
}
