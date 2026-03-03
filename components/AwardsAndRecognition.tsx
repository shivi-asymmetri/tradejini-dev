"use client";

import Marquee from "react-fast-marquee";
import Image from "next/image";

export default function AwardsAndRecognition() {
  const images = ["/award1.webp", "/award2.webp", "/award3.webp"];

  return (
    <section id="Awards">
      <div className="mt-10 px-0 font-satoshi md:mt-20 md:px-10 lg:px-20 xl:px-32">
        <h3 className="text-center text-xl font-bold md:text-3xl">
          Awards and Recognition
        </h3>

        {/* Mobile View: Marquee slider */}
        <div className="mt-8 md:hidden">
          <Marquee gradient={false} speed={60} pauseOnHover={true}>
            {images.map((img, index) => (
              <div
                key={index}
                className="flex items-center justify-center px-4"
              >
                <Image
                  src={img}
                  alt={`Award ${index + 1}`}
                  width={224}
                  height={254}
                  className="h-auto w-56 rounded-lg border border-gray-200 shadow-sm"
                />
              </div>
            ))}
          </Marquee>
        </div>

        {/* Desktop View: Grid */}
        <div className="mt-10 hidden flex-row justify-center gap-x-4 md:flex">
          {images.map((img, index) => (
            <div
              key={index}
              className="grid place-items-center rounded-3xl px-3 md:w-1/3 md:px-6 md:py-6"
            >
              <Image
                src={img}
                alt={`Award ${index + 1}`}
                width={320}
                height={363}
                className="h-auto w-80"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
