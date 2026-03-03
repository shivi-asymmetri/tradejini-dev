import { useState, useEffect } from "react";

export function useScrollDirection(): "up" | "down" {
  const [scrollDir, setScrollDir] = useState<"up" | "down">("down");

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateScrollDir = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) setScrollDir("down");
      else if (currentScrollY < lastScrollY) setScrollDir("up");
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", updateScrollDir);
    return () => window.removeEventListener("scroll", updateScrollDir);
  }, []);

  return scrollDir;
}
