"use client";
import React, { useState, useEffect } from "react";
import { ArrowUpIcon } from "lucide-react";
import styles from "./Bottompin.module.css";

interface BottompinProps {
  embedded?: boolean;
}

const Bottompin = ({ embedded = false }: BottompinProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    const isMobile = window.innerWidth <= 768; // Common mobile breakpoint
    const offset = isMobile ? 100 : 200; // Smaller offset for mobile devices

    if (window.pageYOffset > offset) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    if (!embedded) {
      window.addEventListener("scroll", toggleVisibility);
      return () => {
        window.removeEventListener("scroll", toggleVisibility);
      };
    } else {
      // For embedded usage, show after a small delay
      const timer = setTimeout(() => setIsVisible(true), 100);
      return () => clearTimeout(timer);
    }
  }, [embedded]);

  const scrollToTop = () => {
    const currentPosition = window.pageYOffset;
    const targetPosition = 0;
    const distance = targetPosition - currentPosition;
    const duration = 1500;
    let start: number | null = null;

    const animation = (currentTime: number) => {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const progress = Math.min(timeElapsed / duration, 1);
      const easeOutCubic = (x: number): number => {
        return 1 - Math.pow(1 - x, 3);
      };

      window.scrollTo(0, currentPosition + distance * easeOutCubic(progress));

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  if (embedded) {
    return (
      <div className="flex justify-end pb-2">
        <div
          className={`${styles.embeddedButton} ${
            isVisible ? styles.visible : styles.hidden
          }`}
        >
          <div onClick={scrollToTop} className={styles.buttonContainer}>
            <ArrowUpIcon className={styles.arrowIcon} />
            <button className={styles.topButton} aria-label="Scroll to top">
              Top
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${styles.fixedButton} ${
        isVisible ? styles.visible : styles.hidden
      }`}
    >
      <div onClick={scrollToTop} className={styles.buttonContainer}>
        <ArrowUpIcon className={styles.arrowIcon} />
        <button className={styles.topButton} aria-label="Scroll to top">
          Top
        </button>
      </div>
    </div>
  );
};

export default Bottompin;
