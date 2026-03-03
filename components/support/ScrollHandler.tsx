"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { smoothScrollTo } from "@/utils/smoothScroll";

export default function ScrollHandler() {
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check if coming from support page and scroll to breadcrumb on desktop
    const fromSupport = searchParams.get("from") === "support";

    if (fromSupport) {
      const isDesktop = window.innerWidth >= 768;

      if (isDesktop) {
        // First scroll to top, then scroll to target element
        window.scrollTo({ top: 0, behavior: "auto" });

        setTimeout(() => {
          const breadcrumbElement =
            document.getElementById("desktop-breadcrumb");
          if (breadcrumbElement) {
            const elementTop =
              breadcrumbElement.getBoundingClientRect().top +
              window.pageYOffset;
            const targetPosition = Math.max(0, elementTop - 50);

            smoothScrollTo(targetPosition, {
              duration: 800, // Longer duration for better visual effect
              offset: 0, // Already calculated in targetPosition
            });
          }
        }, 300); // Longer delay to ensure user sees the scroll from top
      } else {
        // Mobile scroll logic
        window.scrollTo({ top: 0, behavior: "auto" });

        setTimeout(() => {
          const breadcrumbElement =
            document.getElementById("mobile-breadcrumb");
          if (breadcrumbElement) {
            const elementTop =
              breadcrumbElement.getBoundingClientRect().top +
              window.pageYOffset;
            const targetPosition = Math.max(0, elementTop - 80);

            smoothScrollTo(targetPosition, {
              duration: 800,
              offset: 0,
            });
          }
        }, 300);
      }
    }
  }, [searchParams]);

  return null;
}
