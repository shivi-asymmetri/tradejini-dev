"use client";

import useBlogLoading from "@/context/BlogLoadingContext";

export default function BlogLoader() {
  const { isLoading, setIsLoading } = useBlogLoading()!;
  return (
    <div className="relative z-[9999999999999999] h-[8px] w-full">
      <div
        className={`fixed h-[8px] w-full bg-gradient-to-r from-themeGreen to-themeBlue transition-all duration-300 ease-in-out ${
          isLoading === 0
            ? "translate-x-[-100%]"
            : isLoading === 0.5
              ? "translate-x-[-50%]"
              : isLoading === 1
                ? "translate-x-0 opacity-0"
                : "translate-x-0"
        }`}
      />
    </div>
  );
}
