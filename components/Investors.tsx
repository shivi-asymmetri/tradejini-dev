"use client";

import { useState } from "react";
import Image from "next/image";
import { WebEngage } from "@/utils/webengage";

export default function Investors() {
  const data = [
    {
      icon: "seasonality.png",
      title: "Seasonality-Chart",
      desktopTitle: "Seasonality-Chart-D",
      subtext:
        "View seasonal trends of stocks to identify patterns and optimize investing strategies.",
    },
    {
      icon: "10year.png",
      title: "10-Year-Fundamentals",
      desktopTitle: "10-Year-Fundamentals-D",
      subtext:
        "Access a decade of financial performance data for informed investment decisions.",
    },
    {
      icon: "gtt.png",
      title: "GTT-Orders",
      desktopTitle: "GTT-Orders-D",
      subtext:
        "Set advanced orders with triggers for precise control over entries and exits.",
    },
    {
      icon: "alerts.png",
      title: "Alerts",
      desktopTitle: "Alerts-D",
      subtext:
        "Receive instant alerts for technical events like breakouts and moving averages in your watchlist.",
    },
    {
      icon: "moversanalytics.png",
      title: "Scanners",
      desktopTitle: "Scanners-D",
      subtext:
        "Monitor market shifts and analyze trends in real-time to refine strategies.",
    },
    {
      icon: "result.png",
      title: "Result-Calendar",
      desktopTitle: "Result-Calendar-D",
      subtext:
        "Set reminders for earnings updates and corporate actions to stay prepared for investment opportunities.",
    },
    {
      icon: "import.png",
      title: "Detailed-View",
      desktopTitle: "Detailed-View-D",
      subtext:
        "Transaction history provides a clear, detailed record of your trades, keeping you in control of your investments.",
    },
    {
      icon: "heatmap.png",
      title: "Heat-Map",
      desktopTitle: "Heat-Map-D",
      subtext:
        "View stock performance with a color-coded heat map for quick market sentiment insights.",
    },
  ];
  const [selected, setSelected] = useState(0);

  return (
    <section id="Investors">
      <div className="flex flex-col items-center justify-center gap-x-10 gap-y-5 rounded-3xl px-5 md:flex-row md:pl-0 md:pr-20">
        <div className="md:w-1/2">
          <Image
            width={480}
            height={362}
            src={`/investors/${data[selected].desktopTitle}.webp`}
            className="object-contain duration-100 max-xl:hidden max-md:hidden md:ml-[10px] md:h-[80vh] md:translate-x-[10px]"
            alt=""
            sizes="(max-width: 1280px) 0px, 480px"
            quality={80}
            loading="lazy"
          ></Image>
          <Image
            alt=""
            width={1000}
            height={1000}
            src={`/investors/mobile/${data[selected].title}.webp`}
            className="hidden max-md:block md:h-[70vh]"
            sizes="(max-width: 768px) 332px, 0px"
            quality={75}
            loading="lazy"
          ></Image>
        </div>
        <div className="flex flex-col md:w-1/2">
          <h4 className="font-poppins text-xl font-bold max-md:text-center md:text-3xl">
            Investors
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
                className={`duration-250 relative flex flex-col items-center justify-center rounded-lg bg-white px-2 py-3 shadow-md outline-[#4399aa] transition-[box_shadow,transform,color] ease-in-out hover:scale-110 hover:shadow-2xl md:py-4 ${selected === idx && "outline outline-2"}`}
              >
                <Image src={`/${icon}`} alt={title} width={38} height={38} className="h-[3vh] md:h-[4vh]" sizes="(max-width: 768px) 25px, 38px" quality={75}></Image>
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
                  className={`flex flex-col items-center justify-center rounded-lg border-[#A2EAD3] bg-white px-2 py-3 shadow-xl outline-[#4399aa] transition-[box_shadow,scale] duration-500 md:py-4 ${idx === selected && "outline outline-2"}`}
                >
                  <Image src={`/${icon}`} alt={title} width={38} height={38} className="h-[3vh] md:h-[4vh]" sizes="(max-width: 768px) 25px, 38px" quality={75}></Image>
                  <p className="my-3 whitespace-pre-line text-center text-sm font-semibold">
                    {title}
                  </p>
                </button>
              ))}
          </div>

          <button
            onClick={() => {
              WebEngage(
                "start_investing_investors",
                "Home (Investor)",
                "Start Investing",
                "https://cp.tradejini.com/positions",
              );
            }}
            className="mt-8 text-nowrap rounded-2xl bg-[#4399aa] bg-gradient-to-r px-32 py-4 text-center font-bold text-white md:mr-[10%]"
          >
            <a href={"https://cp.tradejini.com/positions"}>Start Investing</a>
          </button>
        </div>
      </div>
    </section>
  );
}
