"use client";

import { useNotFound } from "@/context/NotFoundContext";
import Script from "next/script";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function ClientMain({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isNotFound } = useNotFound();
  const [hydrated, setHydrated] = useState(false);
  const pathname = usePathname();

  const isSupportRoute = pathname?.startsWith("/support");

  const shouldShowScript = hydrated && !isNotFound && !isSupportRoute;

  useEffect(() => {
    setHydrated(true);
  }, []);

  // Hide/show chatbot per route
  useEffect(() => {
    const selectors = [
      "#oriserve-chatbot",
      '[id*="oriserve"]',
      '[class*="oriserve"]',
      '[id*="chatbot"]',
      '[class*="chatbot"]',
      'iframe[src*="oriserve"]',
      'div[style*="position: fixed"][style*="bottom"]',
      'div[style*="z-index: 999"]',
    ];

    selectors.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((element) => {
        if (element && element instanceof HTMLElement) {
          element.style.display = isSupportRoute ? "none" : "";
        }
      });
    });
  }, [pathname, isSupportRoute]);

  const mainClasses = [
    "flex-1 flex-grow",
    !isNotFound ? "pb-60 md:pb-40" : "",
    "page-padding-area",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <main className={mainClasses}>{children}</main>
      {shouldShowScript && (
        <>
          <Script id="block-chunks" strategy="beforeInteractive">
            {`
              // Block chunk loading
              const originalAppendChild = document.head.appendChild;
              document.head.appendChild = function(element) {
                if (element.src && element.src.includes('chunk.css')) {
                  return element;
                }
                return originalAppendChild.call(this, element);
              };
            `}
          </Script>
          <Script
            defer
            src="https://jini.oriserve.com/chatbot/static/js/jiniprod.js"
            strategy="lazyOnload"
          />
        </>
      )}
    </>
  );
}
