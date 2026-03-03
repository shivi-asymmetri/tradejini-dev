"use client";

import CubePlus from "@/assets/tabsSection/CubePlus";
import { useEffect, useRef, useState } from "react";
import { motion, LayoutGroup, AnimatePresence, useInView } from "framer-motion";
import CubePlusMobile from "@/assets/tabsSection/CubePlusMobile";
import CubePlusAPI from "@/assets/tabsSection/CubePlusAPI";
import Nxtoption from "@/assets/tabsSection/Nxtoption";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { ArrowLeft } from "lucide-react";
import { WebEngage } from "@/utils/webengage";
import Sparc from "@/assets/tabsSection/Sparc";
import Image from "next/image";


export default function TabsSection() {
  const states = [
    {
      icon: CubePlus,
      colors: '#19ac63',
      title: "CubePlus",
      text: "Our all-in-one trading platform designed for seamless multi-leg option strategies, stock trading, and more. With advanced charting, real-time data, and smart order execution, CubePlus Web is perfect for both beginner and seasoned traders.",
      button1: "Try CubePlus Now",
      button1Action:
        "https://cubeplus-demo.tradejini.com/app/portfolio/holdings",
      img: "/Scalper-Mode.webp",
      page: "Home (second fold)",
      button: "Try CubePlus Now",
      destination: "https://cubeplus-demo.tradejini.com/app/portfolio/holdings",
      name: "cubeplus_demo",
    },
    {
      icon: CubePlus,
      colors: '#19ac63',
      title: "CubePlus Mobile",
      text: "Take your trading on the go with CubePlus Mobile. Manage your trades, analyze positions, and execute orders from anywhere with a simple, intuitive mobile interface.",
      button1: "Download the App",
      button1Mobile: "https://cp.tradejini.com/Ox1Ux9?",
      button1Web:
        "https://play.google.com/store/apps/details?id=com.nxtrad.cubeplus&hl=en_US&pli=1",
      img: "/cubeplus.webp",
      page: "Home (second fold)",
      button: "Download the App",
      destination:
        "https://play.google.com/store/apps/details?id=com.nxtrad.cubeplus&hl=en_US&pli=1",
      name: "cubeplus_mobile_download",
    },
    {
      icon: CubePlusAPI,
      colors: '#19ac63',
      title: "CubePlus API",
      text: "Trading app specially built for India's F&O traders, packed with Advanced Option Chain, Auto Slicing , Screeners, & much more! This app for F&O trading will allow you to build and execute strategies on the go with just a few taps.",
      button1: "Start Building",
      button1Action: "https://api.tradejini.com/developer-portal/main",
      button2: "Learn More",
      button2Action: "/api",
      img: "/api.webp",

      page: "Home (second fold)",
      button: "Start Building",
      destination: "https://api.tradejini.com/developer-portal/main",
      name: "cubeplus_api",
      page2: "Home (second fold)",
      buttonB: "Learn More",
      destination2: "https://www.tradejini.com/api",
      name2: "cubeplus_api_learn_more",
    },
    {
      icon: Nxtoption,
      colors: '#2face6',
      title: "NxtOption",
      text: "A dedicated options trading platform powered by Iouring for creating strategies, analyzing positions, and managing trades efficiently. NxtOption provides in-depth analytics, including open interest, FII/DII data, and other essential tools for serious options traders.",
      button1: "Discover NxtOption",
      button1Action: "https://app.nxtoption.com/auth/login",
      img: "/nxt.webp",
      page: "Home (second fold)",
      button: "Discover NxtOption",
      destination: "https://app.nxtoption.com/auth/login",
      name: "discover_nxtoption",
    },
  ];
  const [selected, setSelected] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <div
      // initial={{ opacity: 0 }}
      // animate={{
      //   opacity: isInView ? 1 : 0,
      // }}
      // transition={{ duration: 0.8, ease: "easeInOut" }}
      ref={ref}
      className="relative z-20 -mt-10 rounded-t-3xl bg-white px-5 pt-5 md:px-10 md:pt-20 lg:px-20 xl:px-32"
    >
      <LayoutGroup>
        <div className="relative hidden w-full flex-col border-b border-b-gray-300 md:flex md:flex-row">
          {states.map(({ icon: Icon, colors, title, img }, idx) => (
            <div
              key={title}
              className={`relative flex cursor-pointer flex-row items-center justify-center gap-x-2 px-10 pb-4 md:w-1/4 ${
                selected === idx
                  ? "text-[#000000]"
                  : "text-[#5F5F5F]/80"
              }`}
              onClick={() => setSelected(idx)}
            >
               <Icon color={selected === idx ? colors : "#5F5F5F"} />
              <h4 className="font-bold">{title}</h4>
              {selected === idx && (
                <motion.div
                  layoutId="underline"
                  className="absolute h-full w-1.5 bg-[#19AC63] max-md:left-0 max-md:top-0 max-md:rounded-l-full md:bottom-0 md:right-0 md:h-1.5 md:w-full md:rounded-t-full"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </div>
          ))}
        </div>
      </LayoutGroup>
      <div className="mt-5 hidden items-center gap-x-[10%] gap-y-10 md:mt-20 md:flex md:flex-row">
        <AnimatePresence mode="wait">
          <motion.div
            initial="hidden"
            key={selected}
            animate="visible"
            exit="exit"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
              exit: { opacity: 0 },
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="relative z-[9999999] md:w-1/2"
          >
            {/* <div className="absolute left-0 top-0 h-full w-full rounded-2xl bg-grid-white/10"></div> */}

            <div
              className={`${selected & 1 ? "blue-ani" : "green-ani"} rounded-2xl ${selected === 1 ? "px-10 pt-10" : "rounded-xl px-0 pb-0 pl-4 pr-4 pt-4"} flex justify-center overflow-hidden`}
              // className={`${selected & 1 ? "bg-opacity-50 bg-gradient-to-br from-[#164DA0] to-[#0D222B]" : "bg-gradient-to-br from-[#13A466] to-[#05643B]"} rounded-2xl px-10 pt-10`}
            >
              <motion.div>
                <Image
                 className={`z-[999999999] rounded-xl max-md:h-[35vh] md:h-[45vh] ${selected === 1 ? "translate-y-0" : "translate-y-12"}`}
                 src={states[selected]?.img}
                 alt=""
                 width={454}
                 height={423}
                 sizes="(max-width: 768px) 332px, 454px"
                 quality={75}
                 loading="lazy"
                 
                />
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
              exit: { opacity: 0 },
            }}
            className="z-[999999] md:w-1/2"
            transition={{ duration: 0.2, ease: "easeInOut", delay: 0.1 }}
          >
            <h3 className="text-xl font-bold md:text-3xl">
              {states[selected].title}
            </h3>
            <p className="mt-5 text-sm text-black/60 md:text-lg">
              {states[selected].text}
            </p>
            <button
              onClick={() => {
                WebEngage(
                  states[selected].name,
                  states[selected].page,
                  states[selected].button,
                  states[selected].destination,
                );
                if (states[selected].button2) {
                  WebEngage(
                    states[selected].name2,
                    states[selected].page2,
                    states[selected].buttonB,
                    states[selected].destination2,
                  );
                }
              }}
              className="w-full"
            >
              <div className="mt-10 flex flex-row gap-x-10 pr-[10%]">
                {states[selected].button1Action ? (
                  <a
                    target="_blank"
                    href={states[selected].button1Action}
                    className={`grid w-full place-items-center rounded-lg bg-gradient-to-r md:w-1/2 ${!(selected & 1) ? "from-[#13A466] to-[#05643B]" : "from-[#164DA0] to-[#0D222B]"} py-3 font-bold text-white`}
                  >
                    {states[selected].button1}
                  </a>
                ) : (
                  <>
                    {states[selected].button1Web && (
                      <a
                        target="_blank"
                        href={states[selected].button1Web}
                        className={`grid w-full place-items-center rounded-lg bg-gradient-to-r md:w-1/2 ${!(selected & 1) ? "from-[#13A466] to-[#05643B]" : "from-[#164DA0] to-[#0D222B]"} py-3 font-bold text-white max-md:hidden`}
                      >
                        {states[selected].button1}
                      </a>
                    )}
                    {states[selected].button1Mobile && (
                      <a
                        target="_blank"
                        href={states[selected].button1Mobile}
                        className={`grid w-full place-items-center rounded-lg bg-gradient-to-r md:w-1/2 ${!(selected & 1) ? "from-[#13A466] to-[#05643B]" : "from-[#164DA0] to-[#0D222B]"} py-3 font-bold text-white md:hidden`}
                      >
                        {states[selected].button1}
                      </a>
                    )}
                  </>
                )}
                {states[selected].button2 && (
                  <a
                    href={states[selected].button2Action}
                    className={`hidden w-1/2 place-items-center rounded-lg py-3 font-bold text-[#1A3725] md:grid ${!(selected & 1) ? "bg-[#D4FEF1]" : "specialBg text-white"}`}
                  >
                    {states[selected].button2}
                  </a>
                )}
              </div>
            </button>
          </motion.div>
        </AnimatePresence>
      </div>
      {/* <AnimatedGridBackgroundSection selected={selected}>
        </AnimatedGridBackgroundSection> */}
      <div className="mt-10 md:invisible md:hidden">
        <Swiper
          spaceBetween={50}
          modules={[Pagination, EffectFade, Autoplay]}
          speed={500}
          effect={"fade"}
          pagination={{
            clickable: true,
            el: ".swiper-pagination",
            type: "bullets",
          }}
          fadeEffect={{ crossFade: true }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          // autoplay={{ delay: 2500 }}
          className="relative"
          loop={true}
          onRealIndexChange={(swiper) => {
            if (window.innerWidth <= 768) {
              setSelected((o) => {
                if (o >= states.length) return 0;
                else return Math.min(swiper.realIndex, states.length);
              });
            }
          }}
        >
          {states.map(
            (
              {
                icon: Icon,
                colors,
                title,
                img,
                button1,
                text,
                button2,
                button1Web,
                button1Mobile,
                button2Action,
                button1Action,
              },
              idx,
            ) => (
              <SwiperSlide key={title}>
                <div className="bg-white">
                  <div className="h-[25vh] text-center">
                    <h3 className="text-center text-xl font-bold md:text-3xl">
                      {title}
                    </h3>

                    <p className="mt-5 text-sm text-black/60 md:text-lg">
                      {text}
                    </p>
                  </div>
                  <div
                    className={`${idx & 1 ? "blue-ani" : "green-ani"} flex justify-center overflow-hidden rounded-2xl px-5`}
                  >
                    <motion.div>
                      <Image
                        className={`z-[999999999] rounded-xl max-md:h-[35vh] md:h-[45vh] ${idx === 1 ? "translate-y-0" : "translate-y-12"}`}
                        src={img}
                        alt=""
                        width={332}
                        height={288}
sizes="(max-width: 768px) 48px, 52px"
                        quality={75}
                        loading="lazy"
                      />
                    </motion.div>
                  </div>
                  <div className="mt-5 flex flex-row gap-x-3 md:pr-[10%]">
                    {button1Action ? (
                      <a
                        href={button1Action}
                        className={`grid w-full place-items-center rounded-lg bg-gradient-to-r md:w-1/2 ${!(idx & 1) ? "from-[#13A466] to-[#05643B]" : "from-[#164DA0] to-[#0D222B]"} py-3 font-bold text-white`}
                      >
                        {button1}
                      </a>
                    ) : (
                      <>
                        {button1Web && (
                          <a
                            href={button1Web}
                            className={`grid w-full place-items-center rounded-lg bg-gradient-to-r md:w-1/2 ${!(idx & 1) ? "from-[#13A466] to-[#05643B]" : "from-[#164DA0] to-[#0D222B]"} py-3 font-bold text-white max-md:hidden`}
                          >
                            {button1}
                          </a>
                        )}
                        {button1Mobile && (
                          <a
                            href={button1Mobile}
                            className={`grid w-full place-items-center rounded-lg bg-gradient-to-r md:w-1/2 ${!(idx & 1) ? "from-[#13A466] to-[#05643B]" : "from-[#164DA0] to-[#0D222B]"} py-3 font-bold text-white md:hidden`}
                          >
                            {button1}
                          </a>
                        )}
                      </>
                    )}
                    {button2 && (
                      <a
                        href={button2Action}
                        className={`hidden w-1/2 place-items-center rounded-lg py-3 font-bold text-[#1A3725] md:grid ${!(idx & 1) ? "bg-[#D4FEF1]" : "specialBg text-white"}`}
                      >
                        {button2}
                      </a>
                    )}
                  </div>

                  <div className="mt-5 flex w-full flex-row items-center justify-center gap-x-3">
                    <button
                      disabled={selected === 0}
                      className={`prev hidden rounded-full bg-[#005b6c]/70 p-3 text-white disabled:bg-[#005b6c]/30 disabled:text-white/50`}
                    >
                      <ArrowLeft className="h-3 w-3" />
                    </button>
                    <div
                      className={`flex flex-row items-center justify-center gap-x-4  text-[#000000]`}
                    >
                      <Icon color={selected === idx ? states[idx].colors : "#5F5F5F"} />
                      <h3 className="text-xl font-bold">{title}</h3>
                    </div>
                    <button
                      disabled={selected === 3}
                      className={`next hidden rounded-full bg-[#005b6c]/70 p-3 text-white disabled:bg-[#005b6c]/30 disabled:text-white/50`}
                    >
                      <ArrowLeft className="h-3 w-3 rotate-180" />
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ),
          )}
        </Swiper>
        <div className="grid w-full place-items-center py-5">
          <div className="swiper-pagination z-20 w-auto space-x-3 bg-white px-10"></div>
          <style jsx>
            {`
              .swiper-pagination {
                left: 50%;
                transform: translateX(-50%);
              }
            `}
          </style>
          <style jsx global>
            {`
              .swiper-pagination-bullet-active {
                background: #19ac63;
              }
            `}
          </style>
        </div>
      </div>
    </div>
  );
}
