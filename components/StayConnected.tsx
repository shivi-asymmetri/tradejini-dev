"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
const StayConnectedPage = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeSlideMobile, setActiveSlideMobile] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center" },
    [Autoplay({ delay: 3000, stopOnInteraction: false })],
  );
  const [emblaMobileRef, emblaMobileApi] = useEmblaCarousel(
    { loop: true, align: "center" },
    [Autoplay({ delay: 3000, stopOnInteraction: false })],
  );
  const [testimonialEmblaRef, testimonialEmblaApi] = useEmblaCarousel(
    { loop: true, align: "start", axis: "y" },
    [Autoplay({ delay: 4000, stopOnInteraction: false })],
  );
  const [testimonialMobileEmblaRef, testimonialMobileEmblaApi] = useEmblaCarousel(
    { loop: true, align: "start", axis: "x" },
    [Autoplay({ delay: 4000, stopOnInteraction: false })],
  );

  const testimonials = [
    {
      name: "Prabha Kannan",
      avatar: "/avatars/user1.jpg",
      rating: 5,
      text: "Yes! Today I started my trade journey with Tradejini which is a favorite trading platform, I know already with my family members. Account opening with very much friendly by the support team was done very quickly and now I am ready to trade and invest in our share market in all entities. Thanks to Tradejini team.",
    },
    {
      name: "Gopikrishna korrapati",
      avatar: "/avatars/user2.jpg",
      rating: 5,
      text: "Account opening is very easy and support staff is very helpful on my account opening. when it is comes to app i have gone through demo videos and seems it is going to be nice experience with expolore.",
    },
    {
      name: "venkata ramana",
      avatar: "/avatars/user3.jpg",
      rating: 5,
      text: "I have opened the TradeJini account. Account opening process was simple and easy. The team has extended their good support, good cooperation in opening the account. The process was completed within less time. I thank one and all.",
    },
    {
      name: "Ganesh babu",
      avatar: "/avatars/user4.jpg",
      rating: 5,
      text: "The trading app experience, offering a user-friendly interface for both beginners and experienced traders. The real-time market data and charting tools provide valuable insights for informed decision-making. The customer support team is readily available and provides helpful assistance whenever needed. Overall, the app is a reliable and efficient tool for managing your investments. Thanks to Anitha for her excellent guidance and support throughout the process.",
    },
  ];

  const slides = [
    { image: "/listings/charts_images/Frame_2087327512.webp", link: "https://www.tradejini.com/chart-speaks" },
    { image: "/listings/charts_images/Frame_2087327513.webp", link: "https://www.tradejini.com/decoders" },
    { image: "/listings/charts_images/Frame_2087327514.webp", link: "https://userguide-cp.tradejini.com/index.html" },
    { image: "/listings/charts_images/Frame_2087327515.webp", link: "https://www.youtube.com/playlist?list=PLc5V-uHHLlNxIoiOtXY5NwoIJVdlxy_eh" },
    { image: "/listings/charts_images/Frame_2087327516.webp", link: "https://www.tradejini.com/about-us-gallery" },
  ];

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setActiveSlide(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaMobileApi) return;
    const onSelect = () => setActiveSlideMobile(emblaMobileApi.selectedScrollSnap());
    emblaMobileApi.on("select", onSelect);
    onSelect();
  }, [emblaMobileApi]);

  useEffect(() => {
    if (!testimonialEmblaApi) return;
    const onSelect = () =>
      setActiveTestimonial(testimonialEmblaApi.selectedScrollSnap());
    testimonialEmblaApi.on("select", onSelect);
    onSelect();
  }, [testimonialEmblaApi]);

  useEffect(() => {
    if (!testimonialMobileEmblaApi) return;
    const onSelect = () =>
      setActiveTestimonial(testimonialMobileEmblaApi.selectedScrollSnap());
    testimonialMobileEmblaApi.on("select", onSelect);
    onSelect();
  }, [testimonialMobileEmblaApi]);

  // Animation variants - smooth and slow animations
  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.0, delay: 0.3, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.3,
      },
    },
  };

  const slideInLeftVariants = {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1.0, delay: 0.2, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const slideInRightVariants = {
    hidden: { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1.0, delay: 0.2, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const testimonialCardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  // Mobile slide-up animation variant
  const mobileSlideUpVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        delay: 0.3,
        ease: [0.16, 1, 0.3, 1],
      }
    },
  };

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center bg-[#f5ffe8]/50 px-4 md:px-8 py-14">
      {/* Header */}
      <h1 className="mb-10 max-w-5xl text-center text-2xl font-medium leading-tight md:text-[44px] lg:mb-10">
        <motion.span
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          variants={headerVariants}
          className="hidden lg:inline"
        >
          Stay Connected with the{" "}
          <span className="text-[#0A787A]">Tradejini</span> Edge
        </motion.span>
        <motion.span
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          variants={mobileSlideUpVariants}
          className="lg:hidden"
        >
          Stay Connected with the<br />
          <span className="text-[#0A787A]">Tradejini</span> Edge
        </motion.span>
      </h1>

      {/* Main Content Grid */}
      <div className="flex w-full flex-col items-center justify-center gap-14 lg:flex-row lg:items-center">
        {/* Mobile View - Horizontal Testimonials Carousel */}
        <motion.div
          variants={mobileSlideUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="lg:hidden flex w-full flex-col items-center gap-6"
        >
          <div
            className="w-full overflow-hidden"
            ref={testimonialMobileEmblaRef}
          >
            <div className="flex">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="flex min-w-full flex-[0_0_100%] items-stretch justify-center px-2"
                >
                  <div className="w-full h-full min-h-[280px] rounded-xl border border-black/[0.03] bg-white p-6 flex flex-col">
                    <div className="flex flex-col gap-2 flex-1">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-2">
                          <div className="flex flex-col gap-1">
                            <h3 className="text-sm font-semibold text-[#191D23]">
                              {testimonial.name}
                            </h3>
                            <div className="flex gap-1">
                              {[...Array(5)].map((_, i) => (
                                <svg
                                  key={i}
                                  className="h-4 w-4 text-[#FCD34D]"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                          </div>
                        </div>
                        {/* Google Icon SVG */}
                        <svg
                          className="h-8 w-8 flex-shrink-0"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          />
                          <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          />
                        </svg>
                      </div>
                      <p className="mt-2 text-[13px] leading-[19px] text-[#191D23] flex-1">
                        {testimonial.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Desktop View - Vertical Testimonials Carousel */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-150px" }}
          variants={containerVariants}
          className="hidden lg:flex w-[622px] flex-col items-center gap-6"
        >
          <motion.div
            variants={slideInLeftVariants}
            className="flex w-full flex-col items-center gap-6"
          >
            <div
              className="h-[350px] w-full overflow-hidden sm:h-[520px]"
              ref={testimonialEmblaRef}
            >
              <div className="flex h-full flex-col">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, margin: "-100px" }}
                    variants={testimonialCardVariants}
                    className="flex h-auto min-h-[300px] flex-[0_0_350px] items-start justify-center py-2 sm:flex-[0_0_260px]"
                  >
                    <div className="h-full w-full rounded-xl border border-black/[0.03] bg-white p-6">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-2">
                            <div className="flex flex-col gap-1">
                              <h3 className="text-lg font-semibold text-[#191D23]">
                                {testimonial.name}
                              </h3>
                              <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <svg
                                    key={i}
                                    className="h-6 w-6 text-[#FCD34D]"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                              </div>
                            </div>
                          </div>
                          {/* Google Icon SVG */}
                          <svg
                            className="h-8 w-8 flex-shrink-0"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="#4285F4"
                              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                              fill="#34A853"
                              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                              fill="#FBBC05"
                              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            />
                            <path
                              fill="#EA4335"
                              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                          </svg>
                        </div>
                        <p className="mt-2 text-md tracking-wide leading-normal text-[#191D23]">
                          {testimonial.text}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column - Product Guide Carousel */}
        {/* Mobile View - With Animations */}
        <motion.div
          variants={mobileSlideUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          transition={{ delay: 0.2 }}
          className="lg:hidden flex w-full flex-col items-center gap-8"
        >
          {/* Product Guide Section */}
          <div className="relative flex w-full flex-col overflow-hidden">
            {/* Embla Carousel */}
            <div className="relative flex flex-1 gap-4 items-center justify-center pb-4">
              <div className="w-full overflow-hidden" ref={emblaMobileRef}>
                <div className="flex gap-4">
                  {slides.map((slide, index) => (
                    <div
                      key={index}
                      className="flex flex-[0_0_100%] items-stretch px-2"
                    >
                      <Link
                        href={slide.link}
                        className="flex w-full"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Image
                          src={slide.image}
                          alt={`Slide ${index + 1}`}
                          width={600}
                          height={600}
                          unoptimized={true}
                          className="w-full h-auto object-contain"
                        />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Carousel Dots */}
          <div className="flex items-center gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaMobileApi?.scrollTo(index)}
                className={`h-2.5 w-2.5 rounded-full transition-all ${activeSlideMobile === index ? "bg-black" : "bg-black/20"
                  }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Desktop View - With Animations */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-150px" }}
          variants={containerVariants}
          className="hidden lg:flex w-[580px] flex-col items-center gap-8"
        >
          <motion.div variants={slideInRightVariants} className="flex w-full flex-col items-center gap-8">
            {/* Product Guide Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative flex w-full flex-col overflow-hidden rounded-2xl lg:aspect-square"
            >
              {/* Embla Carousel */}
              <div className="relative flex flex-1 gap-4 items-center justify-center">
                <div className="w-full overflow-hidden" ref={emblaRef}>
                  <div className="flex gap-4">
                    {slides.map((slide, index) => (
                      <div
                        key={index}
                        className="flex flex-[0_0_100%] items-center justify-center px-2"
                      >
                        <Link
                          href={slide.link}
                          className="flex w-full items-center justify-center"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                          >
                            <Image
                              src={slide.image}
                              alt={`Slide ${index + 1}`}
                              width={600}
                              height={600}
                              unoptimized={true}
                              className="w-[95%] max-w-[600px] object-contain transition-all duration-300 sm:w-[90%] lg:w-[85%] lg:max-w-[560px]"
                            />
                          </motion.div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Carousel Dots */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3"
            >
              {slides.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => emblaApi?.scrollTo(index)}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.9 }}
                  className={`h-2.5 w-2.5 rounded-full transition-all ${activeSlide === index ? "bg-black" : "bg-black/20"
                    }`}
                />
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default StayConnectedPage;
