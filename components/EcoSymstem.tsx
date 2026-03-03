"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const EcoSystem = memo(function EcoSystem() {
  return (
    <div className="px-5 md:px-10 lg:px-20 xl:px-32">
      {/* Desktop view */}
      <div className="hidden flex-col text-2xl md:block">
        <h4 className="pt-5 font-poppins text-xl font-semibold text-black/50 md:hidden md:text-2xl">
          The Tradejini Ecosystem gives you an edge with platforms like CubePlus
          Web, CubePlus Mobile, and Nxtoption - Powered by Iouring —built to
          make trading simple and efficient.
        </h4>

        <motion.div
          className="relative mt-5 flex flex-col md:flex-row"
          initial={false}
        >
          <div
            data-scroll-section
            className="relative z-20 px-[10%] py-5 md:mt-20 md:w-1/2 md:py-20"
          >
            <Image
              priority
              loading="eager"
              width={300}
              height={300}
              src="/placeholder.svg"
              alt=""
              className="z-20 h-full w-full translate-x-0 translate-y-2 scale-[1.3] object-contain"
            />
            <motion.div
              className="absolute left-[35%] top-1/3 z-20 w-1/4 translate-x-4"
              initial={false}
            >
              <motion.img
                src="order.svg"
                data-scroll
                data-scroll-speed="0.3"
                data-scroll-class="fadeIn"
                alt=""
                className="w-full animate-float-fast"
                loading="lazy"
              />
            </motion.div>
          </div>

          <div className="left-0 top-1/2 z-10 grid h-1/2 w-full place-items-center rounded-2xl bg-[#F3F3F7] px-10 py-20 md:absolute md:pl-[50%]">
            <div className="w-full">
              <Image
                src="/cubeplus2.png"
                alt=""
                width={400}
                height={100}
                loading="lazy"
              />
              <h4 className="mt-10 font-poppins text-xl font-semibold text-black md:text-2xl">
                Trade like
                <br /> never before.
              </h4>
            </div>
          </div>
          <div className="hidden flex-col md:flex md:w-1/2">
            <div className="grid h-[10px] place-items-center px-[10%] pb-10">
              <div className="">
                <div className="font-satoshi text-2xl font-black md:pt-12 md:text-4xl">
                  <h3 className="pb-6 text-black">
                    Meet the Ecosystem
                    <br />
                    That Puts
                    <span className="text-[#0A5D6E]"> Traders First</span>
                  </h3>
                </div>
                <h4 className="font-poppins text-xl font-semibold text-black/50 md:text-2xl">
                  The Tradejini Ecosystem gives you an edge with platforms like
                  CubePlus Web, CubePlus Mobile, and Nxtoption - Powered by
                  Iouring —built to make trading simple and efficient.
                </h4>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Mobile view */}
      <div className="flex flex-col pt-12 text-2xl md:hidden">
        <div className="text-center font-satoshi text-2xl font-black md:pt-12 md:text-4xl">
          <h3 className="text-black">
            Meet the Ecosystem
            <br />
            That Puts
            <span className="text-[#0A5D6E]"> Traders First</span>
          </h3>
        </div>

        <h4 className="pt-5 text-center font-poppins text-xl font-semibold text-black/50 md:hidden md:text-2xl">
          The Tradejini Ecosystem gives you an edge with platforms like CubePlus
          Web, CubePlus Mobile, and Nxtoption - Powered by Iouring —built to
          make trading simple and efficient.
        </h4>
        <br />

        <motion.div
          className="relative mt-5 flex flex-col py-5 md:mt-20 md:flex-row md:py-20"
          initial={false}
        >
          <div data-scroll-section className="relative z-20 px-[10%] md:w-1/2">
            {/* Mobile optimized image */}
            <Image
              src="/placeholder.svg"
              alt=""
              width={400}
              height={400}
              className="z-20 h-auto w-full translate-x-[-22%] translate-y-4 scale-[1.4] object-contain"
              loading="lazy"
            />
            <Image
              src="order.svg"
              width={200}
              height={200}
              data-scroll
              data-scroll-speed="0.3"
              data-scroll-class="fadeIn"
              alt=""
              className="absolute left-[52%] top-1/2 z-20 w-1/2 translate-x-4"
              loading="lazy"
            />
          </div>

          <div className="left-0 top-1/2 z-20 grid h-1/2 w-full place-items-center rounded-2xl bg-[#F3F3F7] px-10 py-20 md:absolute md:pl-[50%]">
            <div className="w-full">
              <Image
                src="/cubeplus2.png"
                alt=""
                width={400}
                height={100}
                loading="lazy"
              />
              <h4 className="mt-10 font-poppins text-xl font-semibold text-black md:text-2xl">
                Trade like
                <br /> never before.
              </h4>
            </div>
          </div>
          <div className="hidden flex-col md:flex md:w-1/2">
            <div className="grid h-1/2 place-items-center px-[10%] py-10">
              <div className="">
                <h4 className="font-poppins text-xl font-semibold text-black/50 md:text-2xl">
                  The Tradejini Ecosystem gives you an edge with platforms like
                  CubePlus Web, CubePlus Mobile, and Nxtoption - Powered by
                  Iouring —built to make trading simple and efficient.
                </h4>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
});

export default EcoSystem;
