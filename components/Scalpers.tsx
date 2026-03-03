"use client";

import { useState } from "react";
import Image from "next/image";

const webEngagePromise = () => import("@/utils/webengage").then(m => m.WebEngage);

export default function Scalpers() {
  const data = [
    {
      icon: "singleclick.png",
      title: "Scalper-Mode",
      desktopTitle: "Scalper-Mode-D",
      subtext:
        "High-speed tools for precise and lightning-fast market execution.",
    },
    {
      icon: "singleclickorder.png",
      title: "One-Click-Orders",
      desktopTitle: "One-Click-Orders-D",
      subtext:
        "Execute trades instantly with a single click for enhanced efficiency during volatility.",
    },
    {
      icon: "boco.png",
      title: "Bracket-Orders",
      desktopTitle: "Bracket-orders-D",
      subtext:
        "Bracket and Cover Orders for effective risk management with predefined stop-loss and targets.",
    },
    {
      icon: "filterexit.png",
      title: "Filter-Exit",
      desktopTitle: "Filter-Exit-D",
      subtext:
        "Exit specific strategy legs, like only calls or puts, with precision.",
    },
    {
      icon: "toggle.png",
      title: "Position-Toggle",
      desktopTitle: "Position-Toggle-D",
      subtext: "Quickly adjust positions in scalper mode for dynamic trading.",
    },
    {
      icon: "trade_on_charts.svg",
      title: "Trade-on-Charts",
      desktopTitle: "Trade-on-Charts-D",
      subtext:
        "Seamlessly trade directly from TradingView charts for a professional trading experience.",
    },
    {
      icon: "bulkexit.png",
      title: "Bulk-Exit",
      desktopTitle: "Bulk-Exit-D",
      subtext:
        "The Bulk Exit feature allows you to sell any percentage of multiple positions, like 75% of one stock and 50% of another, all at once at Market Price or LTP",
    },
    {
      icon: "moversanalytics.png",
      title: "Verified-P&L",
      desktopTitle: "Verified-P&L-D",
      subtext:
        "Share your daily trading performance with verified P&L updates, adding credibility and transparency.",
    },
  ];
  const [selected, setSelected] = useState(0);

  return (
    <section id="Scalpers">
      <div className="flex flex-col items-center justify-between gap-x-10 gap-y-5 rounded-3xl px-5 md:flex-row-reverse">
        <div className="grid w-full place-items-center md:w-1/2">
          <Image
            width={500}
            height={295}
            src={`/scalpers/${data[selected].desktopTitle}.webp`}
            alt=""
            className="object-contain max-md:hidden md:ml-[10px] md:h-[80vh] md:translate-x-[10px]"
            sizes="(max-width: 768px) 0px, 500px"
            quality={80}
            loading="lazy"
          ></Image>
          <Image
            width={1000}
            height={1000}
            src={`/scalpers/mobile/${data[selected].title}.webp`}
            className="object-contain md:hidden"
            alt=""
            sizes="(max-width: 768px) 332px, 0px"
            quality={75}
            loading="lazy"
          ></Image>
        </div>
        <div className="flex flex-col max-md:text-center md:w-1/2">
          <h4 className="font-poppins text-xl font-bold md:text-3xl">
            Scalpers
          </h4>
          <div className="mt-3 flex flex-row items-center gap-x-4 text-base max-md:justify-center md:mt-7 md:text-xl">
            {/* <img src={data[selected].icon} alt="" className="h-[1em]" />
            <div className="font-poppins">{data[selected].title}</div> */}
          </div>
          <div className="my-3 h-[3em] font-poppins max-md:text-center max-md:text-sm md:my-6 md:pr-[20%]">
            {data[selected].subtext}
          </div>
          <div className="mt-5 grid grid-cols-2 gap-4 max-md:hidden md:grid-cols-4">
            {data.map(({ icon, title }, idx) => (
              <button
                onClick={() => setSelected(idx)}
                key={idx}
                className={`duration-250 relative flex flex-col items-center justify-center rounded-lg bg-white py-3 shadow-md outline-[#4399aa] transition-[box_shadow,transform,color] ease-in-out hover:scale-110 hover:shadow-2xl md:py-4 ${selected === idx && "outline outline-2"}`}
              >
                <Image src={`/${icon}`} alt="" width={38} height={38} className="h-[3vh] md:h-[4vh]" sizes="(max-width: 768px) 25px, 38px" quality={75}></Image>
                <p className="my-3 whitespace-pre-line text-center text-sm">
                  {title}
                </p>
              </button>
            ))}
          </div>
          <div className="mt-5 grid grid-cols-2 gap-4 md:hidden md:grid-cols-4 md:gap-8">
            {data
              .filter((_, idx) => idx < 4)
              .map(({ icon, title }, idx) => (
                <button
                  onClick={() => setSelected(idx)}
                  key={idx}
                  className={`flex flex-col items-center justify-center rounded-lg border-[#A2EAD3] bg-white py-3 shadow-xl outline-[#4399aa] transition-[box_shadow,scale] duration-500 md:py-4 ${idx === selected && "outline outline-2"}`}
                >
                  <Image src={`/${icon}`} alt="" width={38} height={38} className="h-[3vh] md:h-[4vh]" sizes="(max-width: 768px) 25px, 38px" quality={75}></Image>
                  <p className="my-3 whitespace-pre-line text-center text-sm font-semibold">
                    {title}
                  </p>
                </button>
              ))}
          </div>

          <button
            onClick={async () => {
              const WebEngage = await webEngagePromise();
              WebEngage(
                "start_trading_scalpers",
                "Home (Scalper)",
                "Start Trading",
                "https://cp.tradejini.com/positions",
              );
            }}
            className="mt-8 text-nowrap rounded-2xl bg-[#4399aa] bg-gradient-to-r px-32 py-4 text-center font-bold text-white md:mr-[10%]"
          >
            <a href="https://cp.tradejini.com/positions">Start Trading</a>
          </button>
        </div>
      </div>
    </section>
  );
}
