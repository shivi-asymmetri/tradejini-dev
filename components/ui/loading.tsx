import React from "react";

interface LoadingProps {
  size?: "small" | "medium" | "large";
  fullPage?: boolean;
}

export function Loading({ size = "medium", fullPage = false }: LoadingProps) {
  const sizeClasses = {
    small: "h-6 w-6",
    medium: "h-10 w-10",
    large: "h-16 w-16",
  };

  const containerClasses = fullPage
    ? "flex min-h-screen items-center justify-center"
    : "flex items-center justify-center p-8";

  return (
    <div className={containerClasses}>
      <div className="relative">
        {/* Outer spinner */}
        <div
          className={`${sizeClasses[size]} animate-[spin_0.8s_linear_infinite] rounded-full border-4 border-t-4 border-[#16a34a] border-t-transparent`}
        ></div>
        {/* Inner spinner */}
        <div
          className={`border-3 absolute left-1/2 top-1/2 h-2/3 w-2/3 -translate-x-1/2 -translate-y-1/2 animate-[spin_0.6s_linear_infinite_reverse] rounded-full border-[#16a34a] border-b-transparent border-r-transparent`}
        ></div>
      </div>
    </div>
  );
}
