"use client";
import { useState } from "react";
import Image from "next/image";
import { WebEngage } from "@/utils/webengage";

export default function OptionTraders() {
  const data = [
    {
      icon: "optionterminal.png",
      title: "Option-Terminal",
      desktopTitle: "Option-Terminal-D",
      mobileTitle: "Option Chain",
      subtext:
        "Real-time options data with Greeks and volatility metrics for precise analysis.",
    },
    {
      icon: "basketmode.png",
      title: "Basket-Mode",
      desktopTitle: "Basket-Mode-D",
      subtext:
        "Basket Mode lets you add items and execute in one go! It is simple and effortless!",
    },
    {
      icon: "orderrouting.png",
      title: "Order-Routing",
      desktopTitle: "Order-Routing-D",
      subtext:
        "Order routing prioritizes buy orders before sell orders to optimize margin usage and minimize trading costs",
    },

    {
      icon: "auto.png",
      title: "Auto-Order-Slicing",
      desktopTitle: "Auto-Order-Slicing-D",
      subtext:
        "Break down large orders into smaller slices for efficient execution and reduced slippage.",
    },
    {
      icon: "bulkmodify.png",
      title: "Bulk-Modify",
      desktopTitle: "Bulk-Modify-D",
      subtext:
        "Modify multiple orders or positions simultaneously for streamlined trade management.",
    },
    {
      icon: "invert.png",
      title: "Invert-Position",
      desktopTitle: "Invert-Position-D",
      subtext:
        "Reverse trades instantly with a single click to respond quickly to market changes.",
    },
    {
      icon: "multiple.png",
      title: "Trade-Any-Strike",
      desktopTitle: "Trade-Any-Strike-D",
      subtext:
        "Flexibility to trade any option strike price, allowing for diverse strategies.",
    },
    {
      icon: "tradechart.png",
      title: "Verified-P&L",
      desktopTitle: "Verified-P&L-D",
      subtext:
        "Share your daily trading performance with verified P&L updates, adding credibility and transparency.",
    },
  ];
  const [selected, setSelected] = useState(0);
  return (
    <section id="OptionTraders">
      <div className="flex flex-col items-center justify-between gap-x-10 gap-y-5 rounded-xl max-md:px-5 md:flex-row md:pr-20">
        <div className="grid w-full place-items-center md:w-1/2">
          <Image
            loading="lazy"
            width={480}
            height={362}
            src={`/optionTraders/${data[selected].desktopTitle}.webp`}
            className="object-contain duration-100 max-md:hidden md:ml-[10px] md:translate-x-[10px]"
            alt=""
            sizes="(max-width: 768px) 0px, 480px"
            quality={80}
          ></Image>
          <Image
            width={1000}
            height={1000}
            src={`/optionTraders/mobile/${data[selected].title}.webp`}
            className="object-contain md:hidden"
            alt=""
            sizes="(max-width: 768px) 332px, 0px"
            quality={75}
            loading="lazy"
          ></Image>
        </div>
        <div className="flex flex-col md:w-1/2">
          <h4 className="font-poppins text-xl font-bold max-md:text-center md:text-3xl">
            Option Traders
          </h4>
          <div className="mt-3 flex flex-row items-center gap-x-4 text-base max-md:justify-center md:mt-7 md:text-xl">
            {/* <img src={data[selected].icon} alt="" className="h-[1em]" /> */}
            {/* <div className="font-poppins">{data[selected].title}</div> */}
          </div>
          <div className="my-3 h-[3em] font-poppins max-md:text-center max-md:text-sm md:my-6 md:pr-[20%]">
            {data[selected].subtext}
          </div>
          <div className="mt-5 grid grid-cols-2 gap-4 max-md:hidden md:grid-cols-4">
            {data.map(({ icon, title, mobileTitle }, idx) => (
              <button
                onClick={() => setSelected(idx)}
                key={idx}
                className={`duration-250 relative flex flex-col items-center justify-center rounded-lg bg-white py-3 shadow-md outline-[#4399aa] transition-[box_shadow,transform,color] ease-in-out hover:scale-110 hover:shadow-2xl md:py-4 ${selected === idx && "outline outline-2"}`}
              >
                <Image src={`/${icon}`} alt="" width={38} height={38} className="h-[3vh] md:h-[4vh]" sizes="(max-width: 768px) 25px, 38px" quality={75}></Image>
                <p
                  className={`my-3 whitespace-pre-line text-center text-sm duration-100`}
                >
                  {title}
                </p>
              </button>
            ))}
          </div>
          <div className="mt-5 grid grid-cols-2 gap-4 md:hidden md:grid-cols-4 md:gap-8">
            {data
              .filter((_, idx) => idx < 4)
              .map(({ icon, title, mobileTitle }, idx) => (
                <button
                  onClick={() => setSelected(idx)}
                  key={idx}
                  className={`flex flex-col items-center justify-center rounded-lg border-[#A2EAD3] bg-white py-3 shadow-xl outline-[#4399aa] transition-[box_shadow,scale] duration-500 md:py-4 ${idx === selected && "outline outline-2"}`}
                >
                  <Image src={`/${icon}`} alt="" width={38} height={38} className="h-[3vh] md:h-[4vh]" sizes="(max-width: 768px) 25px, 38px" quality={75}></Image>
                  <p className="my-3 hidden whitespace-pre-line text-center text-sm font-semibold md:block">
                    {title}
                  </p>
                  <p className="my-3 block whitespace-pre-line text-center text-sm font-semibold md:hidden">
                    {mobileTitle ?? title}
                  </p>
                </button>
              ))}
          </div>

          <button
            onClick={() => {
              WebEngage(
                "start_trading_option_traders",
                "Home (options)",
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
