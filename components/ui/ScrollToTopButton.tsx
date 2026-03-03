"use client";

import React from 'react';

export default function ScrollToTopButton() {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="inline-flex items-center gap-1 rounded border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
      aria-label="Scroll to top"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M6 11.5C2.96244 11.5 0.5 9.03756 0.5 6C0.5 2.96244 2.96244 0.5 6 0.5C9.03756 0.5 11.5 2.96244 11.5 6C11.5 9.03756 9.03756 11.5 6 11.5ZM6 1.5C3.51472 1.5 1.5 3.51472 1.5 6C1.5 8.48528 3.51472 10.5 6 10.5C8.48528 10.5 10.5 8.48528 10.5 6C10.5 3.51472 8.48528 1.5 6 1.5ZM5.625 4.04062V8.625H6.375V4.04062L7.94625 5.61187L8.48813 5.06L6 2.5L3.51187 5.06L4.05375 5.61187L5.625 4.04062Z"
          fill="#4B5563"
        />
      </svg>
      Top
    </button>
  );
} 