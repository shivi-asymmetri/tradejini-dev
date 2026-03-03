"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const TilesComponent: React.FC<{
  className?: string;
  rows?: number;
  cols?: number;
  selected?: number;
}> = ({ selected, className, rows: r, cols: c }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  const rows = new Array(r || 100).fill(1);
  const cols = new Array(c || 10).fill(1);

  return (
    <div
      className={cn(
        "relative z-0 flex h-full w-full justify-center",
        className,
      )}
    >
      {rows.map((_, i) => (
        <motion.div
          key={`row` + i}
          className={`relative h-9 w-9 border-l border-neutral-200 dark:border-neutral-900 sm:h-12 md:w-12`}
        >
          {cols.map((_, j) => {
            const isBg = Math.floor(Math.random() * 3 + 0);
            return (
              <motion.div
                whileHover={{
                  backgroundColor:
                    (selected || 0) % 2 === 0 ? "#19ac6350" : "#2081a040",
                  transition: { duration: 0 },
                  // animation: `random s infinite`,
                }}
                animate={{
                  transition: { duration: 2 },
                }}
                key={`col` + j}
                className={`relative h-9 w-9 border-r border-t border-neutral-200 dark:border-neutral-900 sm:h-12 md:w-12 ${isBg === 1 && "randomly"}`}
              />
            );
          })}
        </motion.div>
      ))}
    </div>
  );
};

export const GridBG = React.memo(TilesComponent);
