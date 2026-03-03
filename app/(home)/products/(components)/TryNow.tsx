"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useAnimation, useInView } from "framer-motion";
import Link from "next/link";
import { useScrollDirection } from "../(hook)/scroll";

const productData = [
  {
    id: "cubeplus_mobile",
    title: "CubePlus Mobile",
    image: "/products1/5.webp",
    logo: "/products1/cubepluslogo.webp",
    bgDesktop: "linear-gradient(90deg, #1E8C51 0%, #000000 100%)",
    bgMobile: "linear-gradient(360deg, #000000 0%, #1E8C51 100%)",
    link: "https://play.google.com/store/apps/details?id=com.nxtrad.cubeplus&hl=en_US&pli=1",
    text: `Take your trading on the go with CubePlus Mobile. Manage your trades, analyze positions, and execute orders from anywhere with a simple, intuitive mobile interface.`,
    buttonText: "Try Now",
  },
  {
    id: "nxtoption",
    title: "NXTOPTION",
    image: "/products1/6.webp",
    logo: "/products1/NXToption.webp",
    bgDesktop: "linear-gradient(90deg, #040404 0%, #2AB3F4 100%)",
    bgMobile: "linear-gradient(360deg, #040404 0%, #2AB3F4 100%)",
    link: "https://app.nxtoption.com/auth/login",
    text: (
      <>
        Options trading demands speed and clarity. Nxtoption, powered by{" "}
        <Link
          href="https://www.iouring.com/"
          target="_blank"
          className="underline"
        >
          IOURING
        </Link>
        , delivers both with an interface built for fast execution and advanced
        strategies, giving option traders the edge they need.
      </>
    ),
    buttonText: "Try Now",
  },
  {
    id: "mutual_funds",
    title: "Mutual Funds",
    image: "/products1/7.webp",
    logo: "/products1/Trade.webp",
    bgDesktop: "linear-gradient(90deg, #2AB3F4 0%, #040404 100%)",
    bgMobile: "linear-gradient(360deg, #2AB3F4 0%, #040404 100%)",
    link: "https://mf.tradejini.com/login?",
    text: `Investing shouldn't be complicated. Mutual Fund Jini makes it easy to discover, invest, and manage your mutual funds—all in one place. Whether you're planning for tomorrow or securing your future, Mutual Fund Jini helps you grow wealth with confidence.`,
    buttonText: "Try Now",
  },
  {
    id: "api",
    title: "APIs",
    image: "/products1/8.webp",
    logo: "/products1/Trade.webp",
    bgDesktop: "linear-gradient(90deg, #000000 0%, #1E8C51 100%)",
    bgMobile: "linear-gradient(360deg, #000000 0%, #1E8C51 100%)",
    link: "https://api.tradejini.com/api-doc/#get-/api-gw/oauth/authorize",
    text: `Take control of your trading like never before. With the Tradejini API, developers and traders can build custom strategies, automate executions, and access real-time market data seamlessly. Create the trading tools you've always wanted—on your terms.`,
    buttonText: "Try Now",
  },
  {
    id: "sparc",
    title: "SPARC",
    image: "/products1/9.webp",
    logo: "/products1/sparc.webp",
    bgDesktop: "linear-gradient(90deg, #040404 0%, #2AB3F4 100%)",
    bgMobile: "linear-gradient(360deg, #040404 0%, #2AB3F4 100%)",
    link: "https://userguide-bo.tradejini.com/login.html",
    text: `Behind every trade is a story of numbers and performance. Sparc is your window to it all—detailed reports, P&L insights, fund statements, and more. Manage your trading back office with precision and ease, so you always know where you stand.`,
    buttonText: "Try Now",
  },
];

function ProductCard({ item, index }: { item: any; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start({
        x: 0,
        opacity: 1,
        transition: { duration: 0.8, ease: "easeOut" },
      });
    } else {
      controls.start({
        x: index % 2 === 0 ? -100 : 100,
        opacity: 0,
        transition: { duration: 0.5, ease: "easeIn" },
      });
    }
  }, [inView, controls, index]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
      className={`relative flex h-[500px] w-full items-center overflow-hidden rounded-3xl font-inter shadow-lg ${
        index % 2 === 0 ? "flex-row" : "flex-row-reverse"
      }`}
    >
      <div className="relative z-20 h-full w-1/2 px-[10%] py-5">
        <img
          loading="eager"
          src={item.image}
          alt=""
          className="h-[28rem] object-contain"
        />
      </div>
      <div
        className={`absolute z-10 flex h-full w-full items-center rounded-3xl px-10 py-10 ${
          index % 2 === 0
            ? "justify-end pl-[50%] pr-[10%]"
            : "justify-start pl-[10%] pr-[50%]"
        }`}
        style={{ background: item.bgDesktop }}
      >
        <div
          className={`max-w-md text-white ${
            index % 2 === 0 ? "text-right" : "text-left"
          }`}
        >
          <div
            className={`mb-2 flex items-center gap-2 ${
              index % 2 === 0 ? "justify-end" : "justify-start"
            }`}
          >
            <Image
              src={item.logo}
              alt={`${item.title} Logo`}
              width={32}
              height={32}
              className={`object-contain ${
                item.logo.includes("Trade.webp") ? "w-32" : "h-8 w-8"
              }`}
            />
            <h3 className="text-2xl font-semibold">{item.title}</h3>
          </div>
          <p className="text-sm text-white/90 md:text-base">{item.text}</p>
          <Link href={item.link} target="_blank">
            <button className="mt-6 rounded-full bg-white px-6 py-2 text-sm font-semibold text-black shadow md:text-base">
              {item.buttonText}
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

function MobileProductCard({ item }: { item: any }) {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.2 });
  const controls = useAnimation();
  const scrollDirection = useScrollDirection();

  useEffect(() => {
    if (inView) {
      controls.start({
        y: 0,
        opacity: 1,
        transition: { duration: 1.2, ease: "easeOut" },
      });
    } else {
      controls.start({
        y: scrollDirection === "down" ? 60 : -60,
        opacity: 0,
        transition: { duration: 0.6, ease: "easeIn" },
      });
    }
  }, [inView, controls, scrollDirection]);

  return (
    <motion.div
      ref={ref}
      initial={{ y: scrollDirection === "down" ? 60 : -60, opacity: 0 }}
      animate={controls}
      className="flex h-[600px] flex-col items-center rounded-3xl px-5 py-10 font-inter text-white shadow-md"
      style={{ background: item.bgMobile }}
    >
      <Image
        src={item.image}
        alt={`${item.title} Mobile`}
        width={270}
        height={270}
        className="mb-6 object-contain"
        loading="lazy"
      />
      <div className="text-center">
        <div className="mb-2 flex items-center justify-center gap-2">
          <Image
            src={item.logo}
            alt={`${item.title} Logo`}
            width={28}
            height={28}
            className={`object-contain ${
              item.logo.includes("Trade.webp") ? "w-28" : "h-7 w-7"
            }`}
          />
          <h3 className="text-xl font-semibold text-white">{item.title}</h3>
        </div>
        <p className="px-2 text-sm text-white">{item.text}</p>
        <Link href={item.link} target="_blank">
          <button className="mt-4 rounded-full bg-white px-6 py-2 text-sm font-semibold text-black shadow">
            {item.buttonText}
          </button>
        </Link>
      </div>
    </motion.div>
  );
}

export default function TryNow() {
  return (
    <div className="mb-20 space-y-5 px-5 font-inter md:mt-20 md:px-10 lg:px-20 xl:px-32">
      {/* Desktop View */}
      <div className="hidden md:block md:space-y-20">
        {productData.map((item, index) => (
          <ProductCard key={item.id} item={item} index={index} />
        ))}
      </div>

      {/* Mobile View with animation */}
      <div className="space-y-5 md:hidden">
        {productData.map((item) => (
          <MobileProductCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
