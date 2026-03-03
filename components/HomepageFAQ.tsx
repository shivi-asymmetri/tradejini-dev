"use client";

import { Fragment, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import FadeInWrapper from "./FadeInWrapper";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function HomepageFAQ() {
  const faqs = [
    {
      title: "What sets Tradejini apart from other trading platforms?",
      text: (
        <>
          Tradejini stands out for being faster, cheaper, and better. It offers
          a seamless trading experience with competitive brokerage fees,
          intuitive tools, stable & scalable APIs, and a strong focus on
          transparency, making it an ideal platform for both traders and
          investors.
        </>
      ),
    },
    {
      title: "Is Tradejini safe for trading?",
      text: (
        <>
          Yes, Tradejini is a decade-old SEBI-registered entity with membership
          of all three exchanges, NSE, BSE, and MCX. Tradejini is also a trusted
          Depository Participant (DP) and a self-clearing entity. We ensure
          transparency, secure infrastructure, and data safety, trusted by
          thousands of traders and investors.
        </>
      ),
    },
    {
      title: "What are the brokerage charges on Tradejini?",
      text: (
        <>
          Tradejini offers competitive and transparent brokerage charges, with a
          flat fee structure for equity, commodity, and options trading.
          <br />
          ₹20 for Equity, F&O
          <br />
          ₹0 for API access
          <br />
          ₹0 Commissions on Mutual Funds, IPOs.
          <br />
          For details, refer to{" "}
          <Link href="/pricing" className="underline">
            our pricing page
          </Link>
          .
        </>
      ),
    },
    {
      title: "How can I open an account with Tradejini?",
      text: (
        <>
          You can open an account by visiting the{" "}
          <Link
            href="https://cp.tradejini.com/Ox1Ux9"
            target="_blank"
            className="underline"
          >
            EKYC portal
          </Link>{" "}
          or downloading the CubePlus app. Complete the online registration,
          upload the required documents, and verify your details to get started.
        </>
      ),
    },
    {
      title: "What tools and features make Tradejini unique?",
      text: (
        <>
          Tradejini offers unique state-of-the-art features such as a dedicated
          options trading platform, premium TradingView integration, custom
          trading modes for scalpers, option buyers, and investors, exclusive
          API support to enhance your automated trading experience, and much
          more.
        </>
      ),
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {

    setOpenIndex((prev) => (prev === index ? null : index));
  };

  // const [openId, setOpenId] = useState<number | null>(null);

  // const toggleItem = (id: number) => {
  //   setOpenId((prev) => (prev === id ? null : id));
  // };

  return (
    <FadeInWrapper>
      <div className="relative overflow-hidden rounded-t-[40px] bg-teal-gradient bg-center px-5 py-20 md:px-10 lg:px-20 xl:px-32">
        <div className="pointer-events-none absolute -bottom-[30%] left-1/2 flex -translate-x-1/2 items-center justify-center text-[30em] font-semibold text-white/10 md:-bottom-[35%]">
          ?
        </div>

        <div className="flex w-full flex-col items-center justify-center gap-x-5 gap-y-5 text-center md:flex-row">
          <img src="/faq.svg" alt="" className="w-auto max-md:h-1/2" />
          <h4 className="font-satoshi text-2xl font-bold text-white md:text-4xl">
            Frequently Asked Questions
          </h4>
        </div>

        {/* <div className="mt-10 flex flex-col px-4 font-inter md:divide-y-reverse md:px-20">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex.includes(idx);
            return (
              <div
                key={idx}
                className={`w-full px-5 ${
                  isOpen
                    ? "rounded-md border border-white px-5 py-5"
                    : "border-b border-white/40 px-5 py-5"
                }`}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="flex w-full items-center justify-between text-left"
                >
                  <h3
                    className={`text-sm transition-colors md:text-base ${
                      isOpen ? "font-bold text-white" : "font-medium text-white"
                    }`}
                  >
                    {faq.title}
                  </h3>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 ${
                      isOpen ? "-rotate-180 text-white" : "text-white"
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={isOpen ? { opacity: 0, scale: 0.98 } : false}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{
                        opacity: { duration: 0.1, ease: "easeOut" },
                        scale: { duration: 0.1, ease: "easeOut" },
                      }}
                      className="w-full overflow-hidden"
                    >
                      <div className="mt-4 text-xs leading-relaxed text-white md:text-sm">
                        {faq.text}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div> */}

        <div className="mt-10 flex flex-col px-4 font-inter md:divide-y-reverse md:px-20">
          {faqs.map((faq, idx) => {
            // const isOpen = openIds.includes(idx);
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="w-full">
                <button
                  onClick={() => toggle(idx)}
                  className={`flex w-full flex-col items-start justify-between text-left transition-all duration-300 ${
                    isOpen
                      ? "border-b border-white/40 px-5 py-5"
                      : "border-b border-white/40 px-5 py-5"
                  }`}
                >
                  <div className="flex w-full items-center justify-between gap-2">
                    <h3
                      className={`text-sm md:text-base ${
                        isOpen
                          ? "font-medium text-white"
                          : "font-medium text-white"
                      }`}
                    >
                      {faq.title}
                    </h3>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 align-middle transition-transform duration-300 ${
                        isOpen ? "-rotate-180 text-white" : "text-gray-400"
                      }`}
                    />
                  </div>
                  <div
                    className="grid w-full transition-[grid-template-rows] duration-700 ease-in-out"
                    style={{
                      gridTemplateRows: isOpen ? "1fr" : "0fr",
                    }}
                  >
                    <div className="overflow-hidden">
                      <div
                        className={`pt-4 font-inter text-xs leading-relaxed text-white transition-opacity duration-300 ease-in-out md:text-sm ${
                          isOpen ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        {faq.text}
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </FadeInWrapper>
  );
}
