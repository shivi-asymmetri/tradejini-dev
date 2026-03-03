"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useAnimation, useInView } from "framer-motion";

export default function CubePlusEcosystem() {
  const refDesktop = useRef(null);
  const refMobile = useRef(null);
  const inViewDesktop = useInView(refDesktop, { amount: 0.2 });
  const inViewMobile = useInView(refMobile, { amount: 0.2 });
  const controlsDesktop = useAnimation();
  const controlsMobile = useAnimation();

  useEffect(() => {
    if (inViewDesktop) {
      controlsDesktop.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" },
      });
    } else {
      controlsDesktop.start({
        opacity: 0,
        y: -60,
        transition: { duration: 0.5 },
      });
    }
  }, [inViewDesktop, controlsDesktop]);

  useEffect(() => {
    if (inViewMobile) {
      controlsMobile.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" },
      });
    } else {
      controlsMobile.start({
        opacity: 0,
        y: -60,
        transition: { duration: 0.5 },
      });
    }
  }, [inViewMobile, controlsMobile]);

  return (
    <section className="mt-20 px-5 text-center font-inter md:px-10 lg:px-20 xl:px-32">
      <h2 className="text-3xl font-bold text-black md:text-4xl">
        Your Complete <span className="text-[#0A5D6E]">Trading Ecosystem</span>
      </h2>
      <p className="mt-2 text-base text-black md:text-lg">
        Trade how you want, where you want – on any device
      </p>

      {/* Desktop View */}
      <div className="hidden font-inter md:block">
        <div className="mt-16 flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="z-10 mb-[-80px]"
          >
            <img
              src="/products1/4.webp"
              alt="CubePlus Web Screens"
              className="mx-auto h-[28rem] object-contain"
              loading="lazy"
            />
          </motion.div>

          <motion.div
            ref={refDesktop}
            animate={controlsDesktop}
            initial={{ opacity: 0, y: -60 }}
            className="z-0 mt-[-90px] h-[500px] w-full rounded-3xl px-6 py-14 text-white shadow-lg md:py-44"
            style={{
              background: "linear-gradient(180deg, #0D7083 0%, #040404 100%)",
            }}
          >
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center gap-2">
                <Image
                  src="/products1/cubepluslogo.webp"
                  alt="CubePlus Logo"
                  width={32}
                  height={32}
                  className="object-contain"
                />
                <h3 className="text-lg font-semibold md:text-2xl">
                  CubePlus Web
                </h3>
              </div>
              <p className="mt-4 max-w-2xl text-sm text-white/90 md:text-base">
                CubePlus Web simplifies market chaos with fast execution, smart
                insights, and reliable tools. It supports multi-leg strategies
                and scalping, empowering you to trade with clarity and
                confidence every time.
              </p>
              <Link href="https://cp.tradejini.com/dashboard" target="_blank">
                <button className="mt-6 rounded-full bg-white px-6 py-2 font-semibold text-black shadow">
                  Try Now
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="mt-16 flex flex-col items-center justify-center font-inter md:hidden">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="z-10 mb-[-40px]"
        >
          <img
            src="/products1/4.webp"
            alt="CubePlus Web Screens"
            className="mx-auto h-[14rem] object-contain"
            loading="lazy"
          />
        </motion.div>

        <motion.div
          ref={refMobile}
          animate={controlsMobile}
          initial={{ opacity: 0, y: -60 }}
          className="z-0 mt-[-70px] h-[350px] w-full rounded-3xl px-6 py-32 text-white shadow-lg"
          style={{
            background: "linear-gradient(360deg, #0D7083 0%, #040404 100%)",
          }}
        >
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center gap-2">
              <Image
                src="/products1/cubepluslogo.webp"
                alt="CubePlus Logo"
                width={28}
                height={28}
                className="object-contain"
              />
              <h3 className="text-lg font-semibold">CubePlus Web</h3>
            </div>
            <p className="mt-4 max-w-2xl text-sm text-white/90">
              CubePlus Web simplifies market chaos with fast execution, smart
              insights, and reliable tools. It supports multi-leg strategies and
              scalping, empowering you to trade with clarity and confidence
              every time.
            </p>
            <Link href="https://cp.tradejini.com/dashboard" target="_blank">
              <button className="mt-6 rounded-full bg-white px-6 py-2 font-semibold text-black shadow">
                Try Now
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
