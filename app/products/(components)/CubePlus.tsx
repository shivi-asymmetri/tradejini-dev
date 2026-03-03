"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const CubePlus = memo(function CubePlus() {
  return (
    <div className="px-5 md:px-10 lg:px-20 xl:px-32">
      {/* Desktop view */}
      <div className="hidden flex-col text-2xl md:block">
        <h4 className="pt-5 font-poppins text-xl font-semibold text-black md:hidden md:text-2xl">
          The Tradejini CubePlus gives you an edge with platforms like CubePlus
          Web, CubePlus Mobile, and Nxtoption - Powered by Iouring — built to
          make trading simple and efficient.
        </h4>

        <motion.div
          className="relative mt-5 flex flex-col md:flex-row"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }} 
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
        >
          <motion.div
            className="left-0 top-1/2 z-10 grid h-[40%] w-full place-items-center rounded-3xl px-10 py-5 md:absolute md:mt-[4%] md:pl-[5%]"
            style={{
              background: "linear-gradient(90deg, #004831 0%, #08EFA6 100%)",
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="w-full">
              <Image
                src="products1/cubeplus.webp"
                alt=""
                width={350}
                height={100}
                loading="lazy"
              />
              <h4 className="mt-10 font-satoshi text-xl font-semibold text-white md:text-2xl">
                Trade like never before.
              </h4>
            </div>
          </motion.div>
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
                <h4 className="font-poppins text-xl text-black md:text-2xl">
                  The Tradejini Ecosystem gives you an edge with platforms like
                  CubePlus Web, CubePlus Mobile, and Nxtoption - Powered by
                  Iouring —built to make trading simple and efficient.
                </h4>
              </div>
            </div>
          </div>

          <motion.div
            data-scroll-section
            className="relative z-20 px-[10%] py-5 md:w-1/2"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Image
              priority
              loading="eager"
              width={100}
              height={100}
              src="/products1/1.svg"
              alt=""
              className="z-20 h-[90%] w-full object-contain"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Mobile view */}
      <div className="flex flex-col pt-10 text-2xl md:hidden">
        <div className="text-center font-satoshi text-2xl font-black">
          <h3 className="text-black">
            Meet the Ecosystem
            <br />
            That Puts
            <span className="text-[#0A5D6E]"> Traders First</span>
          </h3>
        </div>

        <h4 className="pt-5 text-center font-poppins text-lg text-black md:hidden">
          The Tradejini Ecosystem gives you an edge with platforms like CubePlus
          Web, CubePlus Mobile, and Nxtoption - Powered by Iouring —built to
          make trading simple and efficient.
        </h4>
        <br />
    

        <motion.div
          className="relative flex flex-col py-10 md:flex-row"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
        >
          {/* Floating image */}
          <div className="relative z-30 mx-auto mb-[-60px] mt-8">
            <Image
              src="/products1/1.svg"
              alt=""
              width={200}
              height={150}
              className="scale-[1.4] object-contain"
              loading="lazy"
            />
          </div>

          {/* Card with centered CubePlus content */}
          <div
            className="relative z-20 mx-auto w-full rounded-2xl px-10 py-16"
            style={{
              background: "linear-gradient(360deg, #004831 0%, #08EFA6 100%)",
            }}
          >
            <div className="mt-20 flex flex-col items-center justify-center text-center">
              <Image
                src="/products1/cubeplus.webp"
                alt="CubePlus"
                width={200}
                height={200}
                loading="lazy"
              />
              <h4 className="mt-5 font-satoshi text-xl font-semibold text-white">
                Trade like never before.
              </h4>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
});

export default CubePlus;
