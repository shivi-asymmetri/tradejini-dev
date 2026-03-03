"use client";

import { useState } from "react";
import Image from "next/image";
import qrCodeImage from "../public/qrcode.png";
import { motion } from "framer-motion";

export default function QRCodeScanner() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed bottom-24 right-[1.5%] z-[99999] hidden lg:block">
      <div
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative h-10 w-10">
          {/* Scanner Image */}
          <Image
            src="/qr-code.png"
            alt="Scanner"
            width={40}
            height={40}
            className="absolute h-full w-full"
          />

          {/* Animated Rounded Square */}
          {/* <motion.svg
            className="absolute h-full w-full"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
          >
            <motion.rect
              x="2"
              y="2"
              width="96"
              height="96"
              rx="16" // Rounded corners
              ry="16"
              stroke="green"
              strokeWidth="4"
              fill="none"
              strokeDasharray="400"
              strokeDashoffset="0"
              animate={{
                strokeDashoffset: [400, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: 2,
                ease: "linear",
                repeat: Infinity,
              }}
            />
          </motion.svg> */}

          {/* Animated Line */}
          <motion.div
            className="absolute left-1/5 top-0 h-[4px] w-[100%] -translate-x-1/2 transform bg-[#268896] opacity-60"
            animate={{
              y: [0, 35], // Move the line vertically
            }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </div>
        {isHovered && (
          <div className="absolute bottom-0 right-0 flex w-48 flex-col items-center rounded-xl border-2 bg-white p-4 shadow-lg">
            <div className="mb-2 text-center text-sm font-semibold text-black">
              Trade with Tradejini! <br /> Scan to download app
            </div>
            <Image
              src={qrCodeImage}
              alt="Scanner"
              width={150}
              height={150}
              className=""
            />
            <div className="text-center text-sm text-black">
              Open Your
              <br /> Free Demat Account <br /> In Minutes! <br />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
