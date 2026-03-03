"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type Star = {
  id: number;
  x: number;
  y: number;
  delay: number;
  size: number;
};

export default function Custom404() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const generatedStars = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      size: Math.random() * 4 + 2,
    }));
    setStars(generatedStars);
  }, []);

  return (
    <div
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6"
      style={{ backgroundColor: "#0A0B16" }}
    >
      {/* Background stars */}
      <div className="absolute inset-0 z-0">
        {stars.map((star) => (
          <motion.span
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: 0.9,
            }}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              repeatType: "reverse",
              delay: star.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Main Content - Shifted Right on Desktop */}
      <div className="z-10 mx-auto flex max-w-7xl justify-center items-center">
        <div className="grid w-full grid-cols-1 items-center gap-2 md:grid-cols-2">
          {/* Left Column - Image */}
          <div className="flex">
            <Image
              src="/404_error_image.svg"
              alt="404 Illustration"
              width={600}
              height={600}
              className="mx-auto rounded-lg shadow-lg"
            />
          </div>

          {/* Right Column - Text */}
          <div className="flex flex-col items-center text-center font-satoshi text-white">
            {/* Mobile-only text */}
            <div className="mb-6 mt-6 md:hidden">
              <div className="text-5xl font-extrabold leading-snug">OOPS!</div>
              <div className="text-2xl font-semibold leading-tight tracking-wide">
                PAGE NOT FOUND
              </div>
            </div>

            {/* Desktop-only text */}
            <div className="hidden md:mb-6 md:block">
              <div className="text-7xl font-extrabold leading-snug">OOPS!</div>
              <div className="text-2xl font-semibold leading-tight tracking-wide">
                PAGE NOT FOUND
              </div>
            </div>

            <h1 className="mb-4 text-xl font-medium md:text-xl">
              This page is taking a break.
            </h1>

            <Link href="/">
              <span className="specialBg inline-block rounded-full px-6 py-3 font-semibold text-white transition">
                Go Home
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
