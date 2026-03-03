"use client";

import React, { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";

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
      className={`app-banner ${animateOut ? "animate-out" : "animate-in"}`}
      role="complementary"
      aria-label="App download banner"
    >
      <div className="banner-content">
        <div className="banner-icon-container">
          <div className="banner-icon">
            <img
              src="/logoimg.png"
              alt="Tradejini Logo"
              width="48"
              height="48"
            />
          </div>
        </div>

        <div className="banner-text">
          <h3>Get the Tradejini app</h3>
          <p>Better & faster trading experience</p>
        </div>

        <div className="banner-buttons">
          <button
            onClick={openApp}
            className={`install-btn ${installStatus === "loading" ? "loading" : ""}`}
            disabled={installStatus === "loading"}
            aria-busy={installStatus === "loading"}
          >
            {installStatus === "loading" ? (
              <span className="loading-spinner"></span>
            ) : (
              "Open App"
            )}
          </button>
          <button onClick={dismissBanner} className="stay-btn">
            Stay Here
          </button>
        </div>

        <button
          onClick={dismissBanner}
          className="close-btn"
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
  );
}
