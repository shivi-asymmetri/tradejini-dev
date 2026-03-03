"use client";

import { useCallback, useState } from "react";
import FOForm from "./FOForm";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import {
  FuturesAPIResponse,
  NSEAPIResponse,
} from "../app/(home)/calculators/margin-calculator/(types)/APIResponseTypes";
import { CurrencyDataType } from "../app/(home)/calculators/margin-calculator/(types)/CurrencyData";
import { CommodityDataType } from "../app/(home)/calculators/margin-calculator/(types)/CommodityData";
import { EquityFutureData } from "../app/(home)/calculators/margin-calculator/(types)/EquityFutureData";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MarginTypes } from "../app/(home)/calculators/margin-calculator/(types)/MarginTypes";
import EquityFuturesTable from "./EquityFuturesTable";
import CommodityTable from "./CommodityTable";
import CurrencyTable from "./CurrencyTable";
import { EquityData } from "../app/(home)/calculators/margin-calculator/(types)/EquityData";
import EquityTable from "./EquityTable";

export default function CalculatorViews({
  data,
}: {
  data:
    | NSEAPIResponse
    | FuturesAPIResponse
    | undefined
    | CurrencyDataType[]
    | CommodityDataType[]
    | EquityData[]
    | EquityFutureData[];
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams?.toString());
      params?.set(name, value);
      return params?.toString();
    },
    [searchParams],
  );

  const animationVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const tabs = [
    { text: "F&O", link: "fno" },
    { text: "Equity Futures", link: "ef" },
    { text: "Commodity", link: "comm" },
    { text: "Currency", link: "curr" },
    { text: "Equity", link: "eq" },
  ];

  const type: MarginTypes = (searchParams?.get("type") || "fno") as MarginTypes;
  return (
    <div className="flex flex-col gap-0">
      <div className="px-4 md:hidden">
        <select
          value={type}
          className="w-full bg-transparent px-5 py-2 text-center font-satoshi font-bold text-[#005B6C] shadow-md"
          onChange={(e) => {
            router.push(
              pathname +
                "?" +
                createQueryString("type", e.target.value as MarginTypes),
            );
          }}
        >
          {tabs.map((tab) => (
            <option className="text-[#005b6C]" key={tab.text} value={tab.link}>
              {tab.text}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-center gap-8 max-md:hidden max-md:w-screen max-md:flex-nowrap max-md:justify-start max-md:overflow-x-auto md:items-center">
        <LayoutGroup>
          <div id="topbar" className="relative flex flex-row justify-center">
            {tabs.map((tab) => (
              <div
                key={tab.text}
                className={`relative flex w-fit cursor-pointer flex-row items-center gap-x-5 px-10 pb-4 ${
                  type === tab.link ? "text-[#1b1b1b]" : "text-[#595959]"
                }`}
                onClick={() => {
                  router.push(
                    pathname +
                      "?" +
                      createQueryString("type", tab.link as MarginTypes),
                  );
                }}
              >
                <h4 className="text-nowrap text-xl font-bold md:text-2xl">
                  {tab.text}
                </h4>
                {type === tab.link && (
                  <motion.div
                    layoutId="underline"
                    className="absolute bottom-0 right-0 h-1.5 w-full bg-[#005B6C] md:rounded-full"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </div>
            ))}
          </div>
        </LayoutGroup>
      </div>
      <div>
        <AnimatePresence mode="wait">
          {type === "fno" && (
            <motion.div
              key="fno"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={animationVariants}
              transition={{ duration: 0.1, ease: "easeInOut" }}
            >
              <FOForm symbols={data as NSEAPIResponse | FuturesAPIResponse} />
            </motion.div>
          )}
          {type === "ef" && (
            <motion.div
              key="ef"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={animationVariants}
              transition={{ duration: 0.1, ease: "easeInOut" }}
            >
              <EquityFuturesTable data={data as EquityFutureData[]} />
            </motion.div>
          )}
          {type === "comm" && (
            <motion.div
              key="comm"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={animationVariants}
              transition={{ duration: 0.1, ease: "easeInOut" }}
            >
              <CommodityTable data={data as CommodityDataType[]} />
            </motion.div>
          )}
          {type === "curr" && (
            <motion.div
              key="curr"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={animationVariants}
              transition={{ duration: 0.1, ease: "easeInOut" }}
            >
              <CurrencyTable data={data as CurrencyDataType[]} />
            </motion.div>
          )}
          {type === "eq" && (
            <motion.div
              key="eq"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={animationVariants}
              transition={{ duration: 0.1, ease: "easeInOut" }}
            >
              <EquityTable data={data as EquityData[]} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <style jsx global>
        {`
          #ori-chatbot-root {
            display: none;
          }
        `}
      </style>
    </div>
  );
}
