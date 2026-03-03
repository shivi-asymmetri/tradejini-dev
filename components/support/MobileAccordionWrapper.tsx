"use client";

import React, { useEffect } from "react";
import MobileSupportAccordion from "@/components/support/MobileSupportAccordion";
import {
  MobileAccordionProvider,
  useMobileAccordion,
} from "@/components/support/MobileAccordionContext";
import { X } from "lucide-react";

interface Collection {
  id: string;
  slug: string;
  title: string;
  icon_url?: string;
  topics?: {
    id: string;
    title: string;
    slug?: string;
    categories?: {
      id: string;
      title: string;
      slug?: string;
    }[];
  }[];
}

interface MobileAccordionWrapperProps {
  collections: Collection[];
  children: React.ReactNode;
}

function MobileAccordionOverlay({
  collections,
}: {
  collections: Collection[];
}) {
  const mobileAccordion = useMobileAccordion();

  // Handle mobile back button and escape key
  useEffect(() => {
    // Only proceed if we have context and accordion is open
    if (!mobileAccordion?.isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        mobileAccordion.closeAccordion();
      }
    };

    const handlePopState = (event: PopStateEvent) => {
      event.preventDefault();
      mobileAccordion.closeAccordion();
      // Push current state back to prevent actual navigation
      window.history.pushState(null, "", window.location.href);
    };

    // Add a history entry when mobile accordion opens
    window.history.pushState(null, "", window.location.href);

    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("popstate", handlePopState);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [mobileAccordion?.isOpen, mobileAccordion?.closeAccordion]);

  // Handle case where context is not available or accordion is not open
  if (!mobileAccordion?.isOpen) {
    return null;
  }

  const {
    closeAccordion,
    expandedCollection,
    expandedTopic,
    expandedCategory,
  } = mobileAccordion;

  return (
    <div className="fixed inset-0 z-50 bg-white md:hidden">
      {/* Header with close button */}
      <div className="flex items-center justify-between border-b border-gray-200 p-4">
        <h2 className="text-lg font-semibold text-gray-900">Support Topics</h2>
        <button
          onClick={closeAccordion}
          className="rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-200"
          aria-label="Close support topics"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Accordion Content */}
      <div className="flex-1 overflow-y-auto">
        <MobileSupportAccordion
          collections={collections}
          onNavigate={closeAccordion}
          initialExpandedCollection={expandedCollection}
          initialExpandedTopic={expandedTopic}
          initialExpandedCategory={expandedCategory}
        />
      </div>
    </div>
  );
}

export default function MobileAccordionWrapper({
  collections,
  children,
}: MobileAccordionWrapperProps) {
  return (
    <MobileAccordionProvider>
      <MobileAccordionOverlay collections={collections} />
      {children}
    </MobileAccordionProvider>
  );
}
