"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface SupportCardLoaderProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function SupportCardLoader({
  href,
  children,
  className = "",
}: SupportCardLoaderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      router.push(href);
    }, 100);
  };

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/80 backdrop-blur-sm">
          <div
            className="flex flex-col items-center justify-center rounded-xl border border-gray-100/50 bg-white px-8 py-6 shadow-lg"
            role="status"
            aria-busy="true"
            style={{ minWidth: 160, minHeight: 160 }}
          >
            {/* Spinner with animated logo inside */}
            <div className="relative mb-5 flex items-center justify-center">
              {/* Main spinner ring */}
              <div className="relative" style={{ height: 56, width: 56 }}>
                <span className="absolute inset-0 rounded-full border-[3px] border-gray-100" />
                <span 
                  className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-[#128789] animate-spin-smooth"
                  style={{ animationDuration: '1.2s' }}
                />
              </div>
              {/* Centered logo */}
              <div className="absolute inset-0 flex items-center justify-center">
                <img 
                  src="/logoimg.png" 
                  alt="Logo" 
                  className="h-7 w-7 object-contain animate-subtle-pulse" 
                />
              </div>
            </div>
            <span className="text-sm font-medium text-gray-600">Almost there...</span>
            {/* Loading dots */}
            <div className="mt-2 flex space-x-1.5">
              <div className="h-1 w-1 animate-loading-dot-1 rounded-full bg-[#128789]/40"></div>
              <div className="h-1 w-1 animate-loading-dot-2 rounded-full bg-[#128789]/40"></div>
              <div className="h-1 w-1 animate-loading-dot-3 rounded-full bg-[#128789]/40"></div>
            </div>
          </div>
        </div>
      )}
      <div
        onClick={handleClick}
        className={`cursor-pointer ${className}`}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleClick(e as any);
          }
        }}
      >
        {children}
      </div>
      {/* Custom animations */}
      <style jsx global>{`
        @keyframes spin-smooth {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes subtle-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(0.95); opacity: 0.9; }
        }
        @keyframes loading-dot {
          0%, 100% { transform: scale(0.7); opacity: 0.4; }
          50% { transform: scale(1); opacity: 0.8; }
        }
        .animate-spin-smooth {
          animation: spin-smooth 1.2s linear infinite;
        }
        .animate-subtle-pulse {
          animation: subtle-pulse 2s ease-in-out infinite;
        }
        .animate-loading-dot-1 {
          animation: loading-dot 1s ease-in-out infinite;
        }
        .animate-loading-dot-2 {
          animation: loading-dot 1s ease-in-out infinite;
          animation-delay: 0.2s;
        }
        .animate-loading-dot-3 {
          animation: loading-dot 1s ease-in-out infinite;
          animation-delay: 0.4s;
        }
      `}</style>
    </>
  );
} 