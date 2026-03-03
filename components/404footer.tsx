"use client";

import React from "react";
import Link from "next/link";

export default function CustomFooter() {
  const links = [
    // { text: "Stocks", href: "/stocks" },
    // { text: "Options", href: "/options" },
    // { text: "Futures", href: "/futures" },
    // { text: "Commodity", href: "/commodity" },
    // { text: "ETFs", href: "/etfs" },
    // { text: "Mutual Funds", href: "/mutual-funds" },
    { text: "IPO", href: "/ipo" },
    // { text: "NFO", href: "/nfo" },
    { text: "Calculators", href: "/calculators" },
    { text: "Blogs", href: "/blogs" },
    { text: "Finance KickStart", href: "/finance-kickstarter" },
    { text: "Margin Pledge", href: "/non-cash-stocks" },
    { text: "FAQ", href: "/support/knowledge-base#content" },
  ];

  return (
    <footer className="w-full bg-[#0C4E5B] px-10 py-6 text-center font-satoshi text-sm text-white md:px-0 md:text-base">
      <div className="mb-3">
        <span className="font-medium text-white">
          Access all major segments in one place.
        </span>
      </div>

      {/* Responsive Links */}
      <div className="mx-auto flex max-w-xl flex-wrap items-center justify-center gap-x-2 gap-y-2 font-medium text-white">
        {links.map((link, idx) => (
          <React.Fragment key={link.text}>
            <Link
              href={link.href}
              className="whitespace-nowrap hover:underline"
            >
              {link.text}
            </Link>
            {idx !== links.length - 1 && (
              <span className="inline text-gray-400">|</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </footer>
  );
}
