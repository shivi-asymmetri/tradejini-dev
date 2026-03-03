"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, memo } from "react";

const TryNow = memo(function TryNow() {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const isMobile = /Android|iPhone/i.test(navigator.userAgent);
    setMobile(isMobile);
  }, []);

  const mobileLink =
    "https://play.google.com/store/apps/details?id=com.nxtrad.cubeplus&hl=en_US&pli=1";
  const desktopLink =
    "https://cubeplus-demo.tradejini.com/app/dashboard?_gl=1*5q26hi*_ga*NzM1NTA3NzQuMTcyOTgzNTcwOQ..*_ga_PYZ3N13XX4*MTczNTg5OTEwNi4yNy4xLjE3MzU4OTkxMDYuMC4wLjA";

  return (
    <div className="w-full px-5 md:px-10 lg:px-20 xl:px-32">
      <br />
      <Link href={mobile ? mobileLink : desktopLink} target="_blank">
        <Image
          src="/trynow.svg"
          alt="Try Now"
          width={1200}
          height={400}
          className="h-auto w-full object-contain max-md:hidden"
          loading="lazy"
        />
      </Link>

      <div className="flex flex-col gap-5 md:hidden">
        {[1, 2, 3, 4].map((num) => (
          <Link key={num} href={mobileLink} target="_blank">
            <Image
              src={`/trynow${num}.png`}
              alt={`Try Now ${num}`}
              width={400}
              height={200}
              loading="lazy"
            />
          </Link>
        ))}
      </div>
    </div>
  );
});

export default TryNow;
