"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useScrollDirection } from "../(hook)/scroll";

// Reusable animated card component


function FadeInCard({
  background,
  image,
  title,
  content,
  link,
  wd,
  ht,
}: {
  background: string;
  image: string;
  title: string;
  content: string;
  link: string;
  wd: number;
  ht: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.3, once: true }); // Run only once when in view
  const controls = useAnimation();
  const scrollDirection = useScrollDirection();
  const [hasAnimated, setHasAnimated] = useState(false); // Track if animation has run

  useEffect(() => {
    if (isInView && !hasAnimated) {
      // Trigger animation on initial load or when scrolling up
      if (scrollDirection === "down" || scrollDirection === null) {
        controls.start({
          opacity: 1,
          y: 0,
          transition: { duration: 0.8, ease: "easeOut" },
        });
        setHasAnimated(true); // Mark animation as complete
      }
    }
  }, [isInView, controls, scrollDirection, hasAnimated]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }} // Always start from bottom
      animate={controls}
      className="relative flex flex-col justify-between rounded-3xl px-4 md:px-8 pb-0 pt-8 text-center text-white shadow-md font-inter"
      style={{ background }}
    >
      {/* Text content */}
      <div className="mb-4">
        <h4 className="mb-2 text-lg md:text-2xl font-bold">Trade anytime, anywhere</h4>
        <p className="mb-1 text-sm md:text-base">
          with <span className="font-semibold text-lg md:text-2xl">{title}</span>
        </p>
        <p className="text-sm md:text-base text-white">
          {content}
        </p>
        <Link href={link} target="_blank">
          <button className="m-auto mt-4 w-fit text-sm rounded-full bg-white px-5 py-2 font-semibold text-black">
            Try Now
          </button>
        </Link>
      </div>

      {/* Image fixed at bottom */}
      <div className="mt-auto">
        <Image
          src={image}
          alt={title}
          width={wd}
          height={ht}
          className="mx-auto object-contain"
          loading="lazy"
        />
      </div>
    </motion.div>
  );
}

export function EcoSystem() {
  return (
    <>
      <div className="px-5 md:mt-14 md:px-10 lg:px-20 xl:px-32 hidden md:block">
        <div className="grid grid-cols-1 gap-6 font-inter md:grid-cols-2">
          <FadeInCard
            background="#0A5D6E"
            image="/products1/2.webp"
            title="CubePlus Mobile"
            content= "Your trades, your control, on the go."
            wd={300}
            ht={300}
            link="https://play.google.com/store/apps/details?id=com.nxtrad.cubeplus&hl=en_US&pli=1"
          />
          <FadeInCard
            background="#00B668"
            image="/products1/3.webp"
            title="CubePlus Web"
            content= "With Advanced tools and smarter insights"
            wd={520}
            ht={300}
            link="https://cp.tradejini.com/dashboard"
          />
        </div>
      </div>

      <div className="px-5 md:mt-14 md:px-10 lg:px-20 xl:px-32 md:hidden">
        <div className="grid grid-cols-1 gap-6 font-inter md:grid-cols-2">
          <FadeInCard
            background="#0A5D6E"
            image="/products1/2.webp"
            title="CubePlus Mobile"
            content= "Your trades, your control, on the go."
            wd={220}
            ht={200}
            link="https://play.google.com/store/apps/details?id=com.nxtrad.cubeplus&hl=en_US&pli=1"
          />
          <FadeInCard
            background="#00B668"
            image="/products1/3.webp"
            title="CubePlus Web"
            content= "With Advanced tools and smarter insights"
            wd={520}
            ht={300}
            link="https://cp.tradejini.com/dashboard"
          />
        </div>
      </div>
    </>
  );
}