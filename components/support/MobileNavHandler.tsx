"use client";

import React, { useEffect, useCallback, useMemo, useRef, useState } from "react";
import MobileSupportAccordion from "@/components/support/MobileSupportAccordion";
import { useMobileAccordion } from "@/components/support/MobileAccordionContext";
import MobileNavigationSpinner from "./MobileNavigationSpinner";
import { useRouter, usePathname } from "next/navigation";

// Define the Collection type based on its usage in MobileSupportAccordion and the layout
// You might need to adjust this based on the actual structure of your collections
type Topic = {
  id: string;
  title: string;
  slug?: string;
  categories?: {
    id: string;
    title: string;
    slug?: string;
  }[];
  // Add other topic properties if needed
};

type Collection = {
  id: string;
  title: string;
  slug: string;
  topics?: Topic[];
  icon_url?: string;
};

function findIdentifiers(
    collections: Collection[],
    sectionSlug?: string,
    topicSlug?: string,
    categorySlug?: string
  ) {
    let collectionId: string | undefined;
    let topicId: string | undefined;
    let categoryId: string | undefined;
  
    if (sectionSlug) {
      const collection = collections.find(c => c.slug === sectionSlug);
      if (collection) {
        collectionId = collection.id;
  
        if (topicSlug && collection.topics) {
          const topic = collection.topics.find(t => t.slug === topicSlug);
          if (topic) {
            topicId = topic.id;
  
            if (categorySlug && topic.categories) {
              const category = topic.categories.find(c => c.slug === categorySlug);
              if (category) {
                categoryId = category.id;
              }
            }
          }
        }
      }
    }
  
    return { collectionId, topicId, categoryId };
  }

interface MobileNavHandlerProps {
  collections: Collection[];
}

export default function MobileNavHandler({
  collections,
}: MobileNavHandlerProps) {
  const mobileAccordion = useMobileAccordion();
  const [isNavigating, setIsNavigating] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const navigationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const previousPathnameRef = useRef<string | null>(null);

  useEffect(() => {
    previousPathnameRef.current = pathname;
  }, [pathname]);
  
  // Clear any existing timeout when component unmounts
  useEffect(() => {
    return () => {
      if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current);
      }
    };
  }, []);

  // Listen for route changes and close accordion
  useEffect(() => {
    // If pathname changed, close accordion if it's open
    if (pathname !== previousPathnameRef.current && previousPathnameRef.current !== null) {
      if (mobileAccordion?.isOpen) {
        mobileAccordion.closeAccordion();
        setIsNavigating(false);
      
        // Clear any pending timeouts
        if (navigationTimeoutRef.current) {
          clearTimeout(navigationTimeoutRef.current);
        }
      }
    }
  }, [pathname, mobileAccordion]);

  // Fallback timeout only as last resort
  useEffect(() => {
    if (isNavigating) {
      // Clear any existing timeout
      if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current);
      }
      
      // Set a fallback timeout 
      navigationTimeoutRef.current = setTimeout(() => {
        mobileAccordion?.closeAccordion();
        setIsNavigating(false);
      }, 3000); // Reduced to 3 seconds since we have better route detection
    } else {
      // Clear timeout when not navigating
      if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current);
      }
    }
  }, [isNavigating, mobileAccordion]);

  // Enhanced navigation handler
  const handleNavigation = useCallback(() => {
    // Set loading state immediately
    setIsNavigating(true);
    
    // Close accordion immediately when navigation starts
    mobileAccordion?.closeAccordion();
    
    // Clear any existing timeouts
    if (navigationTimeoutRef.current) {
      clearTimeout(navigationTimeoutRef.current);
    }
  }, [mobileAccordion]);

  // Effect for mobile navigation
  useEffect(() => {
    if (mobileAccordion?.isOpen) {
      document.body.classList.add("mobile-nav-open");
      
      // Only add history state if not already navigating
      if (!isNavigating) {
        window.history.pushState(null, "", window.location.href);
      }

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          event.preventDefault();
          mobileAccordion.closeAccordion();
          setIsNavigating(false);
          if (navigationTimeoutRef.current) {
            clearTimeout(navigationTimeoutRef.current);
          }
        }
      };

      const handlePopState = (event: PopStateEvent) => {
        if (!isNavigating) {
          event.preventDefault();
          mobileAccordion.closeAccordion();
          setIsNavigating(false);
          window.history.pushState(null, "", window.location.href);
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      window.addEventListener("popstate", handlePopState);

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        window.removeEventListener("popstate", handlePopState);
        document.body.classList.remove("mobile-nav-open");
      };
    }
  }, [mobileAccordion, isNavigating]);

  // Memoize mobile navigation content
  const mobileNavContent = useMemo(() => {
    if (!mobileAccordion?.isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 bg-[#F6F8F7] pt-16 transition-opacity duration-200 ease-in-out will-change-transform">
        <div className="sticky top-0 z-20 bg-[#F6F8F7] px-4 py-1">
          <div className="flex items-center">
            <button
              className="text-2xl font-bold text-gray-500 transition-colors duration-200 hover:text-gray-700"
              onClick={() => {
                mobileAccordion.closeAccordion();
                setIsNavigating(false);
                if (navigationTimeoutRef.current) {
                  clearTimeout(navigationTimeoutRef.current);
                }
              }}
              aria-label="Close"
            >
              &times;
            </button>
            <span className="ml-2 text-base font-medium text-gray-800">
              All Categories
            </span>
          </div>
        </div>

        <div className="-mt-px h-full touch-pan-y overflow-y-auto overscroll-contain">
          <MobileSupportAccordion
            collections={collections}
            onNavigate={handleNavigation}
            setIsNavigating={setIsNavigating}
          />
        </div>
      </div>
    );
  }, [mobileAccordion, collections, handleNavigation]);

  if (!mobileAccordion) {
    console.warn("MobileNavHandler: Mobile accordion context not available");
    return null;
  }

  return (
    <div className="md:hidden">
      <MobileNavigationSpinner isVisible={isNavigating} />

      <button
        className="flex w-full items-center gap-2 bg-white px-4 py-2"
        onClick={() => {
            if (mobileAccordion?.openAccordion) {
              const pathSegments = pathname.split('/').filter(Boolean);
      
              if (pathSegments.length >= 3 && pathSegments[0] === 'support' && pathSegments[1] === 'knowledge-base') {
                const sectionSlug = pathSegments[2];
                const topicSlug = pathSegments[3];
                const categorySlug = pathSegments[4];
      
                const { collectionId, topicId, categoryId } = findIdentifiers(
                  collections,
                  sectionSlug,
                  topicSlug,
                  categorySlug
                );
      
                mobileAccordion.openAccordion(
                  collectionId || undefined,
                  topicId || undefined,
                  categoryId || undefined
                );
              } else {
                mobileAccordion.openAccordion();
              }
            }
          }}
      >
        <span className="mr-2 flex flex-col justify-center">
          <span className="mb-1 block h-0.5 w-6 rounded bg-gray-700"></span>
          <span className="mb-1 block h-0.5 w-6 rounded bg-gray-700"></span>
          <span className="block h-0.5 w-6 rounded bg-gray-700"></span>
        </span>
        <span className="text-base font-medium text-gray-800">
          View all categories
        </span>
      </button>
      {mobileNavContent}
    </div>
  );
}
