"use client"
import Link from "next/link";
import { motion } from "framer-motion";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ComponentPropsWithoutRef,
} from "react";
import { ArrowUpRight } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;
const VIEWPORT = { once: false, amount: 0.12, margin: "12% 0px 12% 0px" } as const;
const LAYER_STYLE = {
  backfaceVisibility: "hidden" as const,
  transform: "translateZ(0)",
};
const REVEAL_STYLE = {
  ...LAYER_STYLE,
  willChange: "transform, opacity",
};
const CARD_INTERACTION_CLASS =
  "transform-gpu will-change-transform transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.08] hover:shadow-2xl";
const BUTTON_INTERACTION_CLASS =
  "transform-gpu will-change-transform transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-110";

type OptimizedImageProps = ComponentPropsWithoutRef<"img"> & {
  eager?: boolean;
};

function OptimizedImage({
  eager = false,
  className = "",
  style,
  loading,
  decoding,
  draggable,
  ...props
}: OptimizedImageProps) {
  return (
    <img
      {...props}
      loading={eager ? "eager" : loading ?? "lazy"}
      fetchPriority={eager ? "high" : "auto"}
      decoding={decoding ?? "async"}
      draggable={draggable ?? false}
      className={`pointer-events-none select-none transform-gpu ${className}`.trim()}
      style={{ ...LAYER_STYLE, ...style }}
    />
  );
}

const rowContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.06,
    },
  },
};

// Clean, smooth card reveal used everywhere
const cardVariants = {
  hidden: {
    opacity: 0,
    blur: "10px",
  },
  show: {
    opacity: 1,
    blur: "0px",
    transition: {
      duration: 0.6,
      delay: 0.04,
      ease: EASE,
    },
  },
};

const imageVariants = {
  hidden: {
    opacity: 0,
    scale: 0.75,
    y: 40,
  },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: 0.12,
      type: "spring",
      stiffness: 140,
      damping: 24,
      mass: 0.9,
    },
  },
};

const contentContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};

const headingVariants = {
  hidden: {
    opacity: 0,
    y: 15,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.72,
      ease: EASE,
    },
  },
};

const textVariants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.72,
      ease: EASE,
    },
  },
};

// Product data
const products = [
  {
    id: 'cubeplus-mobile',
    name: 'CubePlus Mobile',
    description: 'Trade on the go with lightning speed. CubePlus Mobile is designed for both beginners and professionals',
    image: '/listings/cubeplus-mobile.webp',
    activeImage: '/listings/product_icons/active-2-icon.png',
    disabledImage: '/listings/product_icons/disabled-2.png',
    link: 'https://cubeplus.tradejini.com/',
    type: 'mobile'
  },
  {
    id: 'cubeplus-web',
    name: 'CubePlus Web',
    description: 'A powerful browser-based trading platform with zero installations required. Perfect for traders who want accessibility with performance.',
    image: '/listings/cubeplus-web.webp',
    activeImage: '/listings/product_icons/active-1-icon.png',
    disabledImage: '/listings/product_icons/disabled-1.png',
    link: 'https://cubeplus.tradejini.com/',
    type: 'web'
  },
  {
    id: 'api',
    name: 'API',
    description: 'Automate your trades with our developer-friendly APIs',
    image: '/listings/api.webp',
    activeImage: '/listings/product_icons/active-3-icon.png',
    disabledImage: '/listings/product_icons/disabled-3.png',
    link: 'https://api.tradejini.com/api-doc/#overview',
    type: 'api'
  },
  {
    id: 'mutual-funds',
    name: 'Mutual Funds',
    description: 'Invest smarter with zero hassles, track and manage SIPs and lumpsum investments.',
    image: '/listings/mutual-funds.webp',
    activeImage: '/listings/product_icons/active-4-icon.png',
    disabledImage: '/listings/product_icons/disabled-4.png',
    link: 'http://cp.tradejini.com/mutual-funds?tab=dashboard',
    type: 'mutual-funds'
  },
  {
    id: 'hive',
    name: 'Hive',
    description: 'Institutional-grade analytics for serious traders with real-time signals and strategy insights.',
    image: '/listings/hive.webp',
    activeImage: '/listings/product_icons/active-5-icon.png',
    disabledImage: '/listings/product_icons/disabled-5.png',
    link: 'https://userguide-bo.tradejini.com/login.html',
    type: 'hive'
  },
  {
    id: 'nxtoption',
    name: 'NxtOption',
    description: 'Your dedicated options trading platform, built for precision and speed, tailored for professional options traders',
    image: '/listings/nxtoption.webp',
    activeImage: '/listings/product_icons/active-7-icon.png',
    disabledImage: '/listings/product_icons/disabled-6.png',
    link: 'https://app.nxtoption.com/auth/login',
    type: 'nxtoption'
  },
  {
    id: 'ekyc',
    name: 'EKYC2.0',
    description: 'Open your account in less than 5 minutes with our proprietary EKYC solution',
    image: '/listings/eykc2.webp',
    activeImage: '/listings/product_icons/active-6-icon.png',
    disabledImage: '/listings/product_icons/disabled-7.png',
    link: 'https://ekyc.tradejini.com/#/onboarding',
    type: 'ekyc'
  }
];

const mobileDeviceVariants = {
  hidden: {
    opacity: 0,
    scale: 0.75,
    y: 40,
    x: "-50%",
  },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    x: "-50%",
    transition: {
      delay: 0.12,
      type: "spring",
      stiffness: 140,
      damping: 24,
      mass: 0.9,
    },
  },
};

export default function ProductShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobileLayout, setIsMobileLayout] = useState(false);
  const activeProduct = useMemo(() => products[activeIndex], [activeIndex]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1023px)");
    const updateIsMobileLayout = () => {
      setIsMobileLayout(mediaQuery.matches);
    };

    updateIsMobileLayout();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updateIsMobileLayout);
      return () => mediaQuery.removeEventListener("change", updateIsMobileLayout);
    }

    mediaQuery.addListener(updateIsMobileLayout);
    return () => mediaQuery.removeListener(updateIsMobileLayout);
  }, []);

  useEffect(() => {
    const preloadSources = Array.from(
      new Set([
        ...products.flatMap(({ image, activeImage, disabledImage }) => [
          image,
          activeImage,
          disabledImage,
        ]),
        "/widgets.png",
        "/gridLines.webp",
        "/cubeplus-web.png",
        "/api-2.png",
        "/listings/cubeplus-iphone.webp",
        "/listings/mutual-funds.png",
        "/listings/hive.webp",
        "/widget-2.png",
        "/listings/nxtoption.png",
        "/ekyc.png",
      ]),
    );

    const timeoutId = window.setTimeout(() => {
      preloadSources.forEach((src) => {
        const img = new window.Image();
        img.decoding = "async";
        img.src = src;
      });
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (!isMobileLayout) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % products.length);
    }, 4000);

    return () => window.clearTimeout(timeoutId);
  }, [activeIndex, isMobileLayout]);

  const goToProduct = useCallback((index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? prevIndex : index));
  }, []);

  return (
    <div className="lg:min-h-screen bg-white px-4 lg:pb-12 sm:px-6 pb-4 lg:px-0">
      <div className="mx-auto max-w-7xl space-y-6 py-2">

        {/* Mobile/Tablet Carousel View */}
        <div className="lg:hidden">
          <div className="relative">
            {/* Active Product Name */}
            <h2
              className="w-fit text-sm font-medium tracking-wide text-[#000000]/70 bg-[#F5FFE8] rounded-sm px-4 py-2 border border-[#CDCDCD]/20"
            >
              {activeProduct.name}
            </h2>

            {/* Product Icons Navigation - TOP */}
            <div className="my-2 flex flex-col items-center bg-[#ECECEC]/70 rounded-sm px-2 py-2">
              <div className="flex w-full items-center md:justify-start justify-between gap-2 sm:gap-3">
                {products.map((product, index) => {
                  const isActive = activeIndex === index;
                  return (
                    <button
                      key={product.id}
                      onClick={() => goToProduct(index)}
                      aria-label={`Go to ${product.name}`}
                    >
                      <div className="h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center">
                        <OptimizedImage
                          src={isActive ? product.activeImage : product.disabledImage}
                          alt={product.name}
                          className="h-8 w-8 sm:h-10 sm:w-10 rounded-full object-contain"
                          eager={index === 0}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="w-full py-2">
              {/* Render Current Product Card */}
              {activeProduct.type === 'mobile' && (
                <Link href={activeProduct.link} target="_blank" className="block cursor-pointer">
                  <div className="group relative min-h-[450px] overflow-hidden rounded-2xl bg-[#E5EEDA57] p-6 shadow-2xl sm:min-h-[500px] sm:p-8">
                    {/* Gradient Effects - Centered */}
                    <div className="absolute top-[50%] left-1/2 -translate-x-1/2 h-[100%] w-[100%] bg-[#38B99066] rounded-full blur-2xl">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[60%] w-[60%] bg-[#F5FFE8] rounded-full blur-2xl"></div>
                    </div>

                    <OptimizedImage
                      src="/widgets.png"
                      alt="Widgets"
                      className="absolute left-0 top-20 h-full w-full object-contain"
                      eager
                    />

                    {/* Circular Button - Top Right */}
                    <div className="absolute top-4 right-4 z-20 opacity-0 transition-opacity duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100">
                      <button className={`flex h-10 w-10 items-center justify-center shadow-[0px_4px_12px_0px_#00924E66] border border-[#38B99066] rounded-full bg-[#0F4038] ${BUTTON_INTERACTION_CLASS}`}>
                        <ArrowUpRight className="h-5 w-5 text-white" />
                      </button>
                    </div>

                    <div className="relative z-10 flex flex-col items-start pt-4 sm:pt-6">
                      <h2 className="mb-3 font-poppins text-xl font-medium text-gray-900 sm:text-2xl">
                        CubePlus Mobile
                      </h2>
                      <p className="mb-6 font-inter text-sm font-medium leading-relaxed text-gray-600">
                        {activeProduct.description}
                      </p>
                    </div>

                    {/* Mobile Device Mockup */}
                    <div className="absolute bottom-0 left-1/2 h-[55%] w-[200px] -translate-x-1/2 sm:h-1/2 sm:w-[240px]">
                      <OptimizedImage
                        src="/listings/cubeplus-iphone.webp"
                        alt="CubePlus iPhone"
                        className="h-full w-full object-contain drop-shadow-2xl"
                        eager
                      />
                    </div>
                  </div>
                </Link>
              )}

              {activeProduct.type === 'web' && (
                <Link href={activeProduct.link} target="_blank" className="block cursor-pointer">
                  <div
                    className="group relative min-h-[450px] overflow-hidden rounded-2xl p-6 shadow-2xl sm:min-h-[500px] sm:p-10"
                    style={{
                      background: `linear-gradient(241.49deg, rgba(5, 53, 54, 0.77) 34.08%, #031B1B 105.55%),
      linear-gradient(184.24deg, #053536 7.9%, #000000 137.88%)`,
                    }}
                  >
                    <OptimizedImage
                      src="/gridLines.webp"
                      alt=""
                      className="absolute left-0 top-0 h-full w-full object-cover opacity-30"
                      eager
                    />
                    <div className="absolute right-0 top-0 z-20 h-full w-1/12 bg-[#38B990] blur-[100px]"></div>

                    {/* Circular Button - Top Right */}
                    <div className="absolute top-4 right-4 z-20 opacity-0 transition-opacity duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100">
                      <button className={`flex h-10 w-10 items-center justify-center shadow-[0px_4px_12px_0px_#00924E66] border border-[#A5D6C6C4] rounded-full bg-white ${BUTTON_INTERACTION_CLASS}`}>
                        <ArrowUpRight className="h-5 w-5 text-[#176355]" />
                      </button>
                    </div>

                    <div className="relative z-10 pt-4 sm:pt-6">
                      <h2 className="mb-3 font-poppins text-xl font-medium text-white sm:mb-4 sm:text-2xl">
                        CubePlus Web
                      </h2>
                      <p className="mb-6 max-w-md font-inter text-sm font-medium leading-relaxed text-white/75">
                        {activeProduct.description}
                      </p>
                    </div>

                    {/* Desktop Screenshot */}
                    <OptimizedImage
                      src="/cubeplus-web.png"
                      alt="CubePlus Web Platform"
                      className="absolute right-0 bottom-0 md:-bottom-10 w-full h-auto object-cover"
                      eager
                    />
                  </div>
                </Link>
              )}

              {activeProduct.type === 'api' && (
                <Link href={activeProduct.link} target="_blank" className="block cursor-pointer">
                  <div
                    className="group relative min-h-[450px] overflow-hidden rounded-2xl p-6 shadow-2xl sm:min-h-[500px] sm:p-8"
                    style={{
                      background: `linear-gradient(241.49deg, rgba(5, 53, 54, 0.77) 34.08%, #031B1B 105.55%),
      linear-gradient(184.24deg, #053536 7.9%, #000000 137.88%)`,
                    }}
                  >
                    <OptimizedImage
                      src="/gridLines.webp"
                      alt=""
                      className="absolute left-0 top-0 h-full w-full object-cover opacity-30"
                    />
                    <div className="absolute right-0 top-0 z-20 h-full w-1/12 bg-[#38B990]/52 blur-[100px]"></div>

                    {/* Circular Button - Top Right */}
                    <div className="absolute top-4 right-4 z-20 opacity-0 transition-opacity duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100">
                      <button className={`flex h-10 w-10 items-center justify-center shadow-[0px_4px_12px_0px_#00924E66] border border-[#A5D6C6C4] rounded-full bg-white ${BUTTON_INTERACTION_CLASS}`}>
                        <ArrowUpRight className="h-5 w-5 text-[#176355]" />
                      </button>
                    </div>

                    <div className="relative z-10 flex h-full flex-col justify-between pt-4">
                      <div>
                        <h2 className="mb-3 font-poppins text-lg font-medium text-white sm:mb-4 sm:text-xl">
                          API
                        </h2>
                        <p className="mb-6 max-w-[220px] font-inter text-sm font-medium leading-relaxed text-white/75">
                          {activeProduct.description}
                        </p>
                      </div>
                    </div>

                    <OptimizedImage
                      src="/api-2.png"
                      alt="API Code"
                      className="absolute right-0 md:-bottom-16 bottom-0 w-full h-auto object-cover"
                    />
                  </div>
                </Link>
              )}

              {activeProduct.type === 'mutual-funds' && (
                <Link href={activeProduct.link} target="_blank" className="block cursor-pointer">
                  <div className="group relative min-h-[450px] overflow-hidden rounded-2xl bg-[#E5EEDA57] p-6 shadow-2xl sm:min-h-[500px] sm:p-8">
                    {/* Gradient Effects - Bottom Left and Right */}
                    <div className="absolute top-[40%] left-1/2 -translate-x-1/2 h-[100%] w-[100%] bg-[#38B99066] rounded-full blur-2xl">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[60%] w-[60%] bg-[#F5FFE8] rounded-full blur-2xl"></div>
                    </div>

                    <OptimizedImage
                      src="/widgets.png"
                      alt="Widgets"
                      className="absolute left-0 top-20 h-full w-full object-contain"
                    />

                    {/* Circular Button - Top Right */}
                    <div className="absolute top-4 right-4 z-20 opacity-0 transition-opacity duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100">
                      <button className={`flex h-10 w-10 items-center justify-center shadow-[0px_4px_12px_0px_#00924E66] border border-[#38B99066] rounded-full bg-[#0F4038] ${BUTTON_INTERACTION_CLASS}`}>
                        <ArrowUpRight className="h-5 w-5 text-white" />
                      </button>
                    </div>

                    <div className="relative z-10 flex h-full flex-col justify-between pt-4">
                      <div>
                        <h2 className="mb-3 font-poppins text-lg font-medium text-gray-900 sm:mb-4 sm:text-xl">
                          Mutual Funds
                        </h2>
                        <p className="mb-6 max-w-[240px] font-inter text-sm font-medium leading-relaxed text-gray-600">
                          {activeProduct.description}
                        </p>
                      </div>
                    </div>

                    {/* Image */}
                    <OptimizedImage
                      src="/listings/mutual-funds.png"
                      alt="Mutual Funds"
                      className="absolute right-0 md:-bottom-16 bottom-0 w-[75%] h-auto object-cover"
                    />
                  </div>
                </Link>
              )}

              {activeProduct.type === 'hive' && (
                <Link href={activeProduct.link} target="_blank" className="block cursor-pointer">
                  <div
                    className="group relative min-h-[450px] overflow-hidden rounded-2xl p-6 shadow-2xl sm:min-h-[500px] sm:p-8"
                    style={{
                      background: `linear-gradient(241.49deg, rgba(5, 53, 54, 0.77) 34.08%, #031B1B 105.55%),
      linear-gradient(184.24deg, #053536 7.9%, #000000 137.88%)`,
                    }}
                  >
                    <OptimizedImage
                      src="/gridLines.webp"
                      alt=""
                      className="absolute left-0 top-0 h-full w-full object-cover opacity-30"
                    />
                    <div className="absolute right-0 top-0 z-20 h-full w-1/12 bg-[#38B990] blur-[100px]"></div>

                    {/* Circular Button - Top Right */}
                    <div className="absolute top-4 right-4 z-20 opacity-0 transition-opacity duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100">
                      <button className={`flex h-10 w-10 items-center justify-center shadow-[0px_4px_12px_0px_#00924E66] border border-[#A5D6C6C4]  rounded-full bg-white ${BUTTON_INTERACTION_CLASS}`}>
                        <ArrowUpRight className="h-5 w-5 text-[#176355]" />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-start pb-32 pt-4 sm:pb-36 sm:pt-6">
                      <h2 className="font-poppins text-xl font-medium tracking-tight text-white sm:text-2xl">
                        Hive
                      </h2>
                      <p className="mt-3 max-w-[280px] font-inter text-sm font-medium leading-relaxed text-white/80 sm:text-base">
                        {activeProduct.description}
                      </p>
                    </div>

                    {/* Fixed Bottom Image */}
                    <OptimizedImage
                      src="/listings/hive.webp"
                      alt="Hive Platform"
                      className="absolute right-0 bottom-0 w-full h-auto object-cover"
                    />
                  </div>
                </Link>
              )}

              {activeProduct.type === 'nxtoption' && (
                <Link href={activeProduct.link} target="_blank" className="block cursor-pointer">
                  <div className="group relative min-h-[450px] overflow-hidden rounded-2xl bg-[#E5EEDA57] p-6 shadow-2xl sm:min-h-[500px] sm:p-10">
                    {/* Gradient Effects - Bottom Left and Right */}
                    <div className="absolute top-[40%] left-1/2 -translate-x-1/2 h-[100%] w-[100%] bg-[#38B99066] rounded-full blur-2xl">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[60%] w-[60%] bg-[#F5FFE8] rounded-full blur-2xl"></div>
                    </div>

                    <OptimizedImage
                      src="/widgets.png"
                      alt="Widgets"
                      className="absolute left-0 top-20 h-full w-full object-contain"
                    />

                    {/* Circular Button - Top Right */}
                    <div className="absolute top-4 right-4 z-20 opacity-0 transition-opacity duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100">
                      <button className={`flex h-10 w-10 items-center justify-center shadow-[0px_4px_12px_0px_#00924E66] border border-[#38B99066] rounded-full bg-[#0F4038] ${BUTTON_INTERACTION_CLASS}`}>
                        <ArrowUpRight className="h-5 w-5 text-white" />
                      </button>
                    </div>

                    <div className="relative z-10 flex h-full flex-col pt-4 sm:pt-6">
                      <div className="flex-1">
                        <h2 className="mb-3 font-poppins text-xl font-medium text-gray-900 sm:mb-4 sm:text-2xl">
                          NxtOption
                        </h2>
                        <p className="mb-6 max-w-[280px] font-inter text-sm font-medium leading-relaxed text-gray-600">
                          {activeProduct.description}
                        </p>
                      </div>
                    </div>

                    <OptimizedImage
                      src="/listings/nxtoption.png"
                      alt="NxtOption Platform"
                      className="absolute right-0 md:-bottom-20 bottom-0 w-full h-auto object-contain"
                    />
                  </div>
                </Link>
              )}

              {activeProduct.type === 'ekyc' && (
                <Link href={activeProduct.link} target="_blank" className="block cursor-pointer">
                  <div
                    className="group relative min-h-[450px] overflow-hidden rounded-2xl p-6 shadow-2xl sm:min-h-[500px] sm:p-8"
                    style={{
                      background: `linear-gradient(241.49deg, rgba(5, 53, 54, 0.77) 34.08%, #031B1B 105.55%),
      linear-gradient(184.24deg, #053536 7.9%, #000000 137.88%)`,
                    }}
                  >
                    <OptimizedImage
                      src="/gridLines.webp"
                      alt=""
                      className="absolute left-0 top-0 h-full w-full object-cover opacity-30"
                    />
                    <div className="absolute right-0 top-0 z-20 h-full w-1/12 bg-[#38B990] blur-[100px]"></div>

                    {/* Circular Button - Top Right */}
                    <div className="absolute top-4 right-4 z-20 opacity-0 transition-opacity duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100">
                      <button className={`flex h-10 w-10 items-center justify-center shadow-[0px_4px_12px_0px_#00924E66] border border-[#A5D6C6C4] rounded-full bg-white ${BUTTON_INTERACTION_CLASS}`}>
                        <ArrowUpRight className="h-5 w-5 text-[#176355]" />
                      </button>
                    </div>

                    <div className="relative z-10 pt-4 sm:pt-6">
                      <h2 className="mb-3 font-poppins text-xl font-medium text-white sm:text-2xl">
                        EKYC2.0
                      </h2>
                      <p className="mb-5 max-w-xs font-inter text-sm font-medium leading-relaxed text-white/70">
                        {activeProduct.description}
                      </p>
                    </div>

                    {/* Phone Mockup */}
                    <OptimizedImage
                      src="/ekyc.png"
                      alt="EKYC 2.0 Platform"
                      className="absolute right-0 md:-bottom-10 bottom-0 w-full h-auto object-cover"
                    />
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Desktop Grid View */}
        <div className="max-lg:hidden max-w-[90rem] mx-auto flex flex-col gap-6">
          {/* First Row - CubePlus Mobile & CubePlus Web */}
          <motion.div
            variants={rowContainer}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="grid grid-cols-1 gap-6 lg:grid-cols-12"
            style={REVEAL_STYLE}
          >
            {/* CubePlus Mobile - Smaller Card */}
            <Link href="https://cubeplus.tradejini.com/" target="_blank" className="block cursor-pointer lg:col-span-5">
              <motion.div
                variants={cardVariants}
                className={`group relative min-h-[450px] overflow-hidden rounded-2xl bg-[#E5EEDA57] p-2 sm:p-2 lg:min-h-[380px] ${CARD_INTERACTION_CLASS}`}
                style={REVEAL_STYLE}
              >
                {/* Gradient Effects - Bottom Left and Right */}
                <div className="absolute top-[50%] left-1/2 -translate-x-1/2 h-[100%] w-[100%] bg-[#38B99066] rounded-full blur-2xl">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[60%] w-[60%] bg-[#F5FFE8] rounded-full blur-2xl"></div>
                </div>

                <OptimizedImage
                  src="/widgets.png"
                  alt="Widgets"
                  className="absolute left-0 top-20 h-full w-full object-contain"
                />

                {/* Circular Button - Top Right */}
                <div className="absolute top-4 right-4 z-20 opacity-0 transition-opacity duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100">
                  <button className={`flex h-10 w-10 items-center justify-center shadow-[0px_4px_12px_0px_#00924E66] border border-[#38B99066] rounded-full bg-[#0F4038] ${BUTTON_INTERACTION_CLASS}`}>
                    <ArrowUpRight className="h-5 w-5 text-white" />
                  </button>
                </div>

                <motion.div
                  variants={contentContainerVariants}
                  className="relative px-4 z-10 flex flex-col items-start pt-4 text-left sm:pt-6"
                  style={REVEAL_STYLE}
                >
                  <motion.h2 variants={headingVariants} className="mb-3 font-poppins text-xl font-medium text-gray-900 sm:text-2xl">
                    CubePlus Mobile
                  </motion.h2>
                  <motion.p variants={textVariants} className="mb-3 max-w-sm font-inter text-sm font-medium leading-relaxed text-gray-600">
                    Trade on the go with lightning speed. CubePlus Mobile is
                    designed for both beginners and professionals
                  </motion.p>
                </motion.div>

                {/* Mobile Device Mockup */}
                <motion.div
                  variants={mobileDeviceVariants}
                  className="absolute top-36 bottom-0 left-1/2 w-[300px] h-auto transform-gpu will-change-transform"
                  style={REVEAL_STYLE}
                >
                  <OptimizedImage
                    src="/listings/cubeplus-iphone.webp"
                    alt="CubePlus iPhone"
                    className="h-full w-full object-contain drop-shadow-2xl"
                  />
                </motion.div>
              </motion.div>
            </Link>

            {/* CubePlus Web - Larger Card */}
            <Link href="https://cubeplus.tradejini.com/" target="_blank" className="block cursor-pointer lg:col-span-7">
              <motion.div
                variants={cardVariants}
                className={`group relative min-h-[450px] overflow-hidden rounded-2xl p-2 lg:min-h-[380px] ${CARD_INTERACTION_CLASS}`}
                style={{
                  ...REVEAL_STYLE,
                  background: `linear-gradient(241.49deg, rgba(5, 53, 54, 0.77) 34.08%, #031B1B 105.55%),
      linear-gradient(184.24deg, #053536 7.9%, #000000 137.88%)`,
                }}
              >
                <OptimizedImage
                  src="/gridLines.webp"
                  alt=""
                  className="absolute left-0 top-0 h-full w-full object-cover opacity-30"
                />
                <div className="absolute right-0 top-0 z-20 h-full w-1/12 bg-[#38B990] blur-[100px]"></div>

                {/* Circular Button - Top Right */}
                <div className="absolute top-4 right-4 z-20 opacity-0 transition-opacity duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100">
                  <button className={`flex h-10 w-10 items-center justify-center shadow-[0px_4px_12px_0px_#00924E66] border border-[#A5D6C6C4] rounded-full bg-white ${BUTTON_INTERACTION_CLASS}`}>
                    <ArrowUpRight className="h-5 w-5 text-[#176355]" />
                  </button>
                </div>

                <motion.div
                  variants={contentContainerVariants}
                  className="relative z-10 px-4 sm:pt-6"
                  style={REVEAL_STYLE}
                >
                  <motion.h2 variants={headingVariants} className="mb-3 font-poppins text-xl font-medium text-white sm:text-2xl">
                    CubePlus Web
                  </motion.h2>
                  <motion.p variants={textVariants} className="mb-3 max-w-lg font-inter text-sm font-medium leading-relaxed text-white/75">
                    A powerful browser-based trading platform with zero
                    installations required. Perfect for traders who want
                    accessibility with performance.
                  </motion.p>
                </motion.div>

                {/* Desktop Screenshot */}
                <motion.img
                  variants={imageVariants}
                  src="/cubeplus-web.png"
                  alt="CubePlus Web Platform"
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  className="absolute right-0 bottom-0 w-[65%] h-auto object-contain transform-gpu will-change-transform"
                  style={REVEAL_STYLE}
                />
              </motion.div>
            </Link>
          </motion.div>

          {/* Second Row - API, Mutual Funds, Hive */}
          <motion.div
            variants={rowContainer}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            style={REVEAL_STYLE}
          >
            {/* API Card */}
            <Link href="https://api.tradejini.com/api-doc/#overview" target="_blank" className="contents cursor-pointer">
              <motion.div variants={cardVariants} className={`group relative min-h-[350px] overflow-hidden rounded-2xl lg:min-h-[320px] ${CARD_INTERACTION_CLASS}`}
                style={{
                  ...REVEAL_STYLE,
                  background: `linear-gradient(241.49deg, rgba(5, 53, 54, 0.77) 34.08%, #031B1B 105.55%),
    linear-gradient(184.24deg, #053536 7.9%, #000000 137.88%)`,
                }}
              >
                <OptimizedImage
                  src="/gridLines.webp"
                  alt=""
                  className="absolute left-0 top-0 h-full w-full object-cover opacity-30"
                />
                <div className="absolute right-0 top-0 z-20 h-full w-1/12 bg-[#38B990]/52 blur-[100px]"></div>

                {/* Circular Button - Top Right */}
                <div className="absolute top-4 right-4 z-20 opacity-0 transition-opacity duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100">
                  <button className={`flex h-10 w-10 items-center justify-center shadow-[0px_4px_12px_0px_#00924E66] border border-[#A5D6C6C4] rounded-full bg-white ${BUTTON_INTERACTION_CLASS}`}>
                    <ArrowUpRight className="h-5 w-5 text-[#176355]" />
                  </button>
                </div>

                <motion.div
                  variants={contentContainerVariants}
                  className="relative z-10 flex h-full flex-col justify-between pt-4"
                  style={REVEAL_STYLE}
                >
                  <div className="p-6 sm:p-8">
                    <motion.h2 variants={headingVariants} className="mb-3 font-poppins text-lg font-medium text-white sm:mb-4 sm:text-xl">
                      API
                    </motion.h2>
                    <motion.p variants={textVariants} className="mb-6 max-w-[220px] font-inter text-sm font-medium leading-relaxed text-white/75">
                      Automate your trades with our developer-friendly APIs
                    </motion.p>
                  </div>

                  <motion.img
                    variants={imageVariants}
                    src="/api-2.png"
                    alt="API Code"
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    className="absolute right-0 bottom-0 w-[85%] h-auto object-contain transform-gpu will-change-transform"
                    style={REVEAL_STYLE}
                  />
                </motion.div>
              </motion.div>
            </Link>

            {/* Mutual Funds Card */}
            <Link href="http://cp.tradejini.com/mutual-funds?tab=dashboard" target="_blank" className="contents cursor-pointer">
              <motion.div variants={cardVariants} className={`group relative min-h-[350px] overflow-hidden rounded-2xl bg-[#E5EEDA57] lg:min-h-[320px] ${CARD_INTERACTION_CLASS}`} style={REVEAL_STYLE}>
                {/* Gradient Effects - Bottom Left and Right */}
                <div className="absolute top-[40%] left-1/2 -translate-x-1/2 h-[100%] w-[100%] bg-[#38B99066] rounded-full blur-2xl">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[60%] w-[60%] bg-[#F5FFE8] rounded-full blur-2xl"></div>
                </div>

                <OptimizedImage
                  src="/widgets.png"
                  alt="Widgets"
                  className="absolute left-0 top-20 h-full w-full object-contain"
                />

                {/* Circular Button - Top Right */}
                <div className="absolute top-4 right-4 z-20 opacity-0 transition-opacity duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100">
                  <button className={`flex h-10 w-10 items-center justify-center shadow-[0px_4px_12px_0px_#00924E66] border border-[#38B99066] rounded-full bg-[#0F4038] ${BUTTON_INTERACTION_CLASS}`}>
                    <ArrowUpRight className="h-5 w-5 text-white" />
                  </button>
                </div>

                <motion.div
                  variants={contentContainerVariants}
                  className="relative z-10 flex h-full flex-col justify-between pt-4"
                  style={REVEAL_STYLE}
                >
                  <div className="p-6 sm:p-8">
                    <motion.h2 variants={headingVariants} className="mb-3 font-poppins text-lg font-medium text-gray-900 sm:mb-4 sm:text-xl">
                      Mutual Funds
                    </motion.h2>
                    <motion.p variants={textVariants} className="mb-6 max-w-[240px] font-inter text-sm font-medium leading-relaxed text-gray-600">
                      Invest smarter with zero hassles, track and manage SIPs and
                      lumpsum investments.
                    </motion.p>
                  </div>

                  {/* Image */}
                  <motion.img
                    variants={imageVariants}
                    src="/listings/mutual-funds.png"
                    alt="Mutual Funds"
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    className="absolute top-20 right-0 bottom-0 w-[65%] h-auto object-cover transform-gpu will-change-transform"
                    style={REVEAL_STYLE}
                  />
                </motion.div>
              </motion.div>
            </Link>

            {/* Hive Card */}
            <Link href="https://userguide-bo.tradejini.com/login.html" target="_blank" className="block cursor-pointer">
              <motion.div
                variants={cardVariants}
                className={`group relative min-h-[360px] overflow-hidden rounded-2xl p-6 sm:p-8 lg:min-h-[320px] ${CARD_INTERACTION_CLASS}`}
                style={{
                  ...REVEAL_STYLE,
                  background: `linear-gradient(241.49deg, rgba(5, 53, 54, 0.77) 34.08%, #031B1B 105.55%),
    linear-gradient(184.24deg, #053536 7.9%, #000000 137.88%)`,
                }}
              >
                <OptimizedImage
                  src="/gridLines.webp"
                  alt=""
                  className="absolute left-0 top-0 h-full w-full object-cover opacity-30"
                />
                <div className="absolute right-0 top-0 z-20 h-full w-1/12 bg-[#38B990] blur-[100px]"></div>

                {/* Circular Button - Top Right */}
                <div className="absolute top-4 right-4 z-20 opacity-0 transition-opacity duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100">
                  <button className={`flex h-10 w-10 items-center justify-center shadow-[0px_4px_12px_0px_#00924E66] border border-[#A5D6C6C4] rounded-full bg-white ${BUTTON_INTERACTION_CLASS}`}>
                    <ArrowUpRight className="h-5 w-5 text-[#176355]" />
                  </button>
                </div>

                {/* Content */}
                <motion.div
                  variants={contentContainerVariants}
                  className="relative z-10 flex flex-col items-start pb-32 pt-4 text-left sm:pb-36 sm:pt-6"
                  style={REVEAL_STYLE}
                >
                  <motion.h2 variants={headingVariants} className="font-poppins text-xl font-medium tracking-tight text-white sm:text-2xl">
                    Hive
                  </motion.h2>
                  <motion.p variants={textVariants} className="mt-3 max-w-[280px] font-inter text-sm font-medium leading-relaxed text-white/80 sm:text-base">
                    Institutional-grade analytics for serious traders with real-time
                    signals and strategy insights.
                  </motion.p>
                </motion.div>

                {/* Fixed Bottom Image */}
                <motion.img
                  variants={imageVariants}
                  src="/listings/hive.webp"
                  alt="Hive Platform"
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  className="absolute right-0 bottom-0 w-[95%] h-auto object-cover transform-gpu will-change-transform"
                  style={REVEAL_STYLE}
                />
              </motion.div>
            </Link>
          </motion.div>

          {/* Third Row - NxtOption & EKYC */}
          <motion.div
            variants={rowContainer}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="grid grid-cols-1 gap-6 lg:grid-cols-12"
            style={REVEAL_STYLE}
          >
            {/* NxtOption Card */}
            <Link href="https://app.nxtoption.com/auth/login" target="_blank" className="block cursor-pointer lg:col-span-7">
              <motion.div variants={cardVariants} className={`group relative min-h-[280px] overflow-hidden rounded-2xl bg-[#E5EEDA57] p-4 sm:p-6 lg:min-h-[320px] ${CARD_INTERACTION_CLASS}`} style={REVEAL_STYLE}>
                {/* Gradient Effects - Bottom Left and Right */}
                <div className="absolute top-[40%] left-1/2 -translate-x-1/2 h-[100%] w-[100%] bg-[#38B99066] rounded-full blur-2xl">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[60%] w-[60%] bg-[#F5FFE8] rounded-full blur-2xl"></div>
                </div>

                <motion.img
                  variants={imageVariants}
                  src="/widget-2.png"
                  alt="Widgets"
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  className="absolute top-10 left-0 bottom-0 w-[100%] h-auto object-contain transform-gpu will-change-transform"
                  style={REVEAL_STYLE}
                />

                {/* Circular Button - Top Right */}
                <div className="absolute top-4 right-4 z-20 opacity-0 transition-opacity duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100">
                  <button className={`flex h-10 w-10 items-center justify-center shadow-[0px_4px_12px_0px_#00924E66] border border-[#38B99066] rounded-full bg-[#0F4038] ${BUTTON_INTERACTION_CLASS}`}>
                    <ArrowUpRight className="h-5 w-5 text-white" />
                  </button>
                </div>

                <motion.div
                  variants={contentContainerVariants}
                  className="relative z-10 flex h-full flex-col pt-2 sm:pt-3"
                  style={REVEAL_STYLE}
                >
                  <div className="flex-1">
                    <motion.h2 variants={headingVariants} className="mb-2 font-poppins text-xl font-medium text-gray-900 sm:mb-3 sm:text-2xl">
                      NxtOption
                    </motion.h2>
                    <motion.p variants={textVariants} className="mb-4 max-w-[280px] font-inter text-sm font-medium leading-relaxed text-gray-600">
                      Your dedicated options trading platform, built for precision
                      and speed, tailored for professional options traders
                    </motion.p>
                  </div>

                  <motion.img
                    variants={imageVariants}
                    src="/listings/nxtoption.png"
                    alt="NxtOption Platform"
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    className="absolute top-10 right-0 bottom-0 w-[60%] h-auto object-contain transform-gpu will-change-transform"
                    style={REVEAL_STYLE}
                  />
                </motion.div>
              </motion.div>
            </Link>

            {/* EKYC Card */}
            <Link href="https://ekyc.tradejini.com/#/onboarding" target="_blank" className="contents cursor-pointer">
              <motion.div
                variants={cardVariants}
                className={`group relative min-h-[200px] overflow-hidden rounded-2xl p-4 sm:p-6 lg:col-span-5 lg:min-h-[190px] ${CARD_INTERACTION_CLASS}`}
                style={{
                  ...REVEAL_STYLE,
                  background: `linear-gradient(241.49deg, rgba(5, 53, 54, 0.77) 34.08%, #031B1B 105.55%),
    linear-gradient(184.24deg, #053536 7.9%, #000000 137.88%)`,
                }}
              >
                <OptimizedImage
                  src="/gridLines.webp"
                  alt=""
                  className="absolute left-0 top-0 h-full w-full object-cover opacity-30"
                />
                <div className="absolute right-0 top-0 z-20 h-full w-1/12 bg-[#38B990] blur-[100px]"></div>

                {/* Circular Button - Top Right */}
                <div className="absolute top-4 right-4 z-20 opacity-0 transition-opacity duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100">
                  <button className={`flex h-10 w-10 items-center justify-center shadow-[0px_4px_12px_0px_#00924E66] border border-[#A5D6C6C4] rounded-full bg-white ${BUTTON_INTERACTION_CLASS}`}>
                    <ArrowUpRight className="h-5 w-5 text-[#176355]" />
                  </button>
                </div>

                <motion.div
                  variants={contentContainerVariants}
                  className="relative z-10 pt-2 sm:pt-3"
                  style={REVEAL_STYLE}
                >
                  <motion.h2 variants={headingVariants} className="mb-2 font-poppins text-xl font-medium text-white sm:text-2xl">
                    EKYC2.0
                  </motion.h2>
                  <motion.p variants={textVariants} className="mb-3 max-w-xs font-inter text-sm font-medium leading-relaxed text-white/70">
                    Open your account in less than 5 minutes with our proprietary
                    EKYC solution
                  </motion.p>
                </motion.div>

                {/* Phone Mockup */}
                <motion.img
                  variants={imageVariants}
                  src="/ekyc.png"
                  alt="EKYC 2.0 Platform"
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  className="absolute right-0 bottom-0 w-[70%] h-auto object-contain transform-gpu will-change-transform"
                  style={REVEAL_STYLE}
                />
              </motion.div>
            </Link>
          </motion.div>
        </div>
        {/* End Desktop Grid View */}
      </div>
    </div>
  );
}
