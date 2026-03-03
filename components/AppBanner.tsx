"use client";

import React, { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import styles from "./AppBanner.module.css";
type InstallStatus = "none" | "loading" | "installed";

export default function AppBanner() {
  const [visible, setVisible] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);
  const [installStatus, setInstallStatus] = useState<InstallStatus>("none");
  const [hasShown, setHasShown] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const dynamicAppLink = "https://cp.tradejini.com/Ox1Ux9";

  const iosAppStoreLink =
    "https://apps.apple.com/ng/app/tradejini-cubeplus-fno-stocks/id6445836933";
  const androidAppStoreLink =
    "https://play.google.com/store/apps/details?id=com.nxtrad.cubeplus";

  const getPlatformInfo = () => {
    if (typeof navigator === "undefined") {
      return { isMobile: false };
    }

    const ua =
      navigator.userAgent || navigator.vendor || (window as any).opera || "";
    const isMobile =
      /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua) &&
      !/iPad|Tablet/i.test(ua);
    return { isMobile };
  };

  const openApp = () => {
    setInstallStatus("loading");

    const { isMobile } = getPlatformInfo();

    try {
      if (isMobile) {
        window.open(dynamicAppLink, "_blank");
        setInstallStatus("none");
      }
    } catch (err) {
      console.error("App opening error:", err);
      if (typeof window !== "undefined") {
        window.location.href = isMobile ? iosAppStoreLink : androidAppStoreLink;
      }
      setInstallStatus("none");
    }
  };

  const dismissBanner = () => {
    setAnimateOut(true);
    setTimeout(() => {
      setVisible(false);
    }, 500);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleEscKey = (event: KeyboardEvent) => {
      if (visible && event.key === "Escape") {
        dismissBanner();
      }
    };

    document.addEventListener("keydown", handleEscKey);
    return () => document.removeEventListener("keydown", handleEscKey);
  }, [visible]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const { isMobile } = getPlatformInfo();

    if (isMobile && installStatus !== "installed" && !hasShown) {
      setTimeout(() => {
        setVisible(true);
        setHasShown(true);
      }, 2000);
    }
  }, [pathname, installStatus, hasShown]);

  if (!visible) return null;

  return (
    <div
      ref={bannerRef}
      className={`${styles["app-banner"]} ${animateOut ? `${styles["animate-out"]}` : `${styles["animate-in"]}`}`}
      role="complementary"
      aria-label="App download banner"
    >
      <div className="banner-content fixed bottom-0 left-0 right-0 z-50 rounded-t-2xl border-t border-gray-200 bg-white pb-2 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] before:absolute before:inset-0">
        <div className="banner-icon-container relative">
          <div className="banner-icon absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
            <img
              src="/logoimg.png"
              alt="Tradejini Logo"
              width="48"
              height="48"
              className="rounded-lg object-contain"
            />
          </div>
          <div className="absolute left-1/2 top-0 z-[-10] h-[40px] w-[80px] -translate-x-1/2 transform rounded-b-lg bg-[#82d1b6] opacity-70 blur-sm"></div>
        </div>

        <div className="flex flex-col items-center justify-center gap-2 text-black">
          <div
            className={`${styles["banner-text"]} relative flex flex-col items-center pt-10`}
          >
            <h3 className="text-2xl font-bold text-black">
              Get the Tradejini app
            </h3>
            <p className="text-black opacity-100">
              Better & faster trading experience
            </p>
          </div>

          <div className="banner-buttons mt-1 flex gap-4">
            <button
              onClick={openApp}
              className={`${styles["install-btn"]} px-10 ${installStatus === "loading" ? "loading" : ""}`}
              disabled={installStatus === "loading"}
              aria-busy={installStatus === "loading"}
            >
              {installStatus === "loading" ? (
                <span className={`${styles["loading-spinner"]}`}></span>
              ) : (
                "Open App"
              )}
            </button>
            <button
              onClick={dismissBanner}
              className={`ml-2 bg-white font-medium opacity-80`}
            >
              Stay Here
            </button>
          </div>

          <button
            onClick={dismissBanner}
            className={`${styles["close-btn"]} mr-6 mt-6`}
            aria-label="Close app banner"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
