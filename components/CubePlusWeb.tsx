"use client";
import { WebEngage } from "@/utils/webengage";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useRef, useState } from "react";

export default function CubePlusWeb() {
  const data = [
    {
      title: "CubePlus Web",
      text: `
Markets may be chaos, but your trading shouldn't be. CubePlus Web is built to simplify the noise, giving you fast execution, smarter insights, and tools that actually work. Whether it's multi-leg strategies or scalping precision, we're here to help you trade with clarity and confidence.`,
      link: "https://cp.tradejini.com/dashboard",
      image: "/cpw.webp",
      page: "Product Page",
      action: "Know More",
      id: "cubeplus_web_product_page",
      webLink: "https://cp.tradejini.com/dashboard",
    },
    {
      title: "CubePlus Mobile",
      text: `The market doesn't stop when you're on the go, and neither should you. CubePlus Mobile brings real-time trading, advanced charts, and intuitive controls to your fingertips. Whether you're executing trades or monitoring positions, the power of CubePlus is always with you.  
`,
      mobileLink: "https://cp.tradejini.com/Ox1Ux9?",
      link: "https://play.google.com/store/apps/details?id=com.nxtrad.cubeplus&hl=en_US&pli=1",
      image: "/cpm.webp",
      page: "Product Page",
      action: "Know More",
      id: "cubeplus_mobile_product_page",
    },
    {
      title: "CubePlus APIs",
      text: `
Take control of your trading like never before. With the Tradejini API, developers and traders can build custom strategies, automate executions, and access real-time market data seamlessly. Create the trading tools you've always wanted—on your terms.
`,
      link: "https://api.tradejini.com/api-doc/#get-/api-gw/oauth/authorize",
      image: "/cpapi.webp",
      page: "Product Page",
      action: "Know More",
      id: "cubeplus_api_product_page",
    },
    {
      title: "NxtOption",
      text: `
Options trading demands speed and clarity. Nxtoption, powered by <a href="https://www.iouring.com/" target="_blank" class="text-themeDarkBlue underline">IOURING</a>, delivers both with an interface built for fast execution and advanced strategies, giving option traders the edge they need.
`,
      link: "https://app.nxtoption.com/auth/login",
      image: "/nxto.webp",
      page: "Product Page",
      action: "Know More",
      id: "nxtoption_product_page",
    },
    {
      title: "Mutual Fund JINI",
      text: `Investing shouldn't be complicated. Mutual Fund Jini makes it easy to discover, invest, and manage your mutual funds—all in one place. Whether you're planning for tomorrow or securing your future, Mutual Fund Jini helps you grow wealth with confidence.
`,
      link: "https://mf.tradejini.com/login?",
      image: "/mf.webp",
      page: "Product Page",
      action: "Know More",
      id: "mutual_fund_jini_product_page",
    },
    {
      title: "Sparc",
      text: `
Behind every trade is a story of numbers and performance. Sparc is your window to it all—detailed reports, P&L insights, fund statements, and more. Manage your trading back office with precision and ease, so you always know where you stand.
`,
      link: "https://i.tradejini.com/cc/",
      image: "/sparc.webp",
      page: "Product Page",
      action: "Know More",
      id: "sparc_product_page",
    },
  ];

  return (
    <div className="mt-40 w-full px-5 md:px-10 lg:px-20 xl:px-32">
      <div className="space-y-16">
        {data.map((item, idx) => (
          <motion.div
            initial={{
              y: "10%",
              opacity: 0,
            }}
            whileInView={{
              y: "0",
              opacity: 1,
            }}
            transition={{
              duration: 1.2,
            }}
            key={idx}
            className="hidden w-full items-center gap-x-[5%] rounded-3xl border-2 border-zinc-200 bg-zinc-100/50 p-8 text-xl even:flex-row-reverse md:flex md:flex-row"
          >
            <div className="w-1/2 md:w-[45%]">
              <div key={idx} className="flex flex-col gap-4">
                <div className="font-inter font-bold text-[#0A5D6E] md:text-3xl">
                  {item.title}
                </div>
                <div className="mt-5 whitespace-pre-wrap font-inter text-xs text-[#6B6B6B] md:text-base">
                  <span dangerouslySetInnerHTML={{ __html: item.text }} />
                </div>
                <button
                  onClick={() => {
                    WebEngage(item.id, item.page, item.action, item.link);
                  }}
                >
                  <div className="text-md mt-5 flex flex-row flex-wrap gap-4">
                    {item.link ? (
                      <a
                        target="_blank"
                        href={item.link}
                        className="text-nowrap rounded-xl border-2 border-themeDarkBlue bg-white px-6 py-3 font-satoshi font-medium text-themeDarkBlue duration-200 hover:border-themeGreen hover:bg-themeGreen hover:text-white md:px-12 md:py-4"
                      >
                        Try Now
                      </a>
                    ) : (
                      <>
                        {item.webLink && (
                          <a
                            target="_blank"
                            href={item.webLink}
                            className="text-nowrap rounded-xl border-2 border-themeDarkBlue bg-white px-6 py-3 font-satoshi font-medium text-themeDarkBlue duration-200 hover:border-themeGreen hover:bg-themeGreen hover:text-white md:px-12 md:py-4"
                          >
                            Try Now
                          </a>
                        )}
                        {item.mobileLink && (
                          <a
                            target="_blank"
                            href={item.mobileLink}
                            className="text-nowrap rounded-xl border-2 border-themeDarkBlue bg-white px-6 py-3 font-satoshi font-medium text-themeDarkBlue duration-200 hover:border-themeGreen hover:bg-themeGreen hover:text-white md:hidden md:px-12 md:py-4"
                          >
                            Try Now
                          </a>
                        )}
                      </>
                    )}
                    <div className="hidden text-nowrap rounded-xl border-2 border-themeDarkBlue bg-white px-6 py-3 font-satoshi font-medium text-themeDarkBlue duration-200 hover:border-themeGreen hover:bg-themeGreen hover:text-white md:px-12 md:py-4">
                      View all
                    </div>
                  </div>
                </button>
              </div>
            </div>
            <div className="md:w-1/2">
              <img src={item.image} className="h-96" alt="" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mobile View */}
      <div className="space-y-10 md:hidden">
        {data.map((item, idx) => (
          <motion.div
            initial={{
              y: "10%",
              opacity: 0,
            }}
            whileInView={{
              y: "0",
              opacity: 1,
            }}
            transition={{
              duration: 1.2,
            }}
            key={idx}
            className="flex flex-col gap-4 rounded-3xl border-2 border-zinc-200 bg-zinc-100/50 p-8"
          >
            <div className="">
              <img src={item.image} alt="" />
            </div>
            <div className="text-center font-inter text-2xl font-bold text-[#0A5D6E]">
              {item.title}
            </div>
            <div className="mt-0 whitespace-pre-wrap text-justify font-inter text-sm text-[#6B6B6B]">
              {item.text}
            </div>
            <div className="flex flex-row items-center justify-center gap-4 text-xs">
              {item.link ? (
                <a
                  target="_blank"
                  href={item.link}
                  className="text-nowrap rounded-xl border-2 border-themeDarkBlue bg-white px-6 py-3 font-satoshi font-medium text-themeDarkBlue duration-200 hover:border-themeGreen hover:bg-themeGreen hover:text-white md:px-12 md:py-4"
                >
                  Know More
                </a>
              ) : (
                <>
                  {item.webLink && !item.mobileLink && (
                    <a
                      target="_blank"
                      href={item.webLink}
                      className="text-nowrap rounded-xl border-2 border-themeDarkBlue bg-white px-6 py-3 font-satoshi font-medium text-themeDarkBlue duration-200 hover:border-themeGreen hover:bg-themeGreen hover:text-white md:px-12 md:py-4"
                    >
                      Know More
                    </a>
                  )}

                  {item.mobileLink && (
                    <a
                      target="_blank"
                      href={item.mobileLink}
                      className="text-nowrap rounded-xl border-2 border-themeDarkBlue bg-white px-6 py-3 font-satoshi font-medium text-themeDarkBlue duration-200 hover:border-themeGreen hover:bg-themeGreen hover:text-white md:hidden md:px-12 md:py-4"
                    >
                      Know More
                    </a>
                  )}
                </>
              )}

              <button className="hidden text-nowrap rounded-full border-2 border-[#0A5D6E] px-6 py-3 font-satoshi font-medium md:px-16 md:py-4">
                View all
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
