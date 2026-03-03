"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { useMobileAccordion } from "@/components/support/MobileAccordionContext";

interface BreadcrumbsProps {
  section?: string;
  folderParam?: string;
  documentParam?: string;
  questionId?: string;
  // SSR data props to eliminate client-side fetching (optional for backward compatibility)
  collectionTitle?: string;
  topicTitle?: string;
  categoryTitle?: string;
}

// Aggressive in-memory cache with longer duration
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes instead of 5

// Pre-populate cache with common section titles to avoid fetching
const COMMON_SECTIONS: Record<string, string> = {
  "trading-markets": "Trading & Markets",
  api: "API",
  "account-opening": "Account Opening",
  funds: "Funds",
  charges: "Charges",
  support: "Support",
};

function slugToTitle(slug: string): string {
  if (!slug) return "";

  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Helper function to get immediate fallback titles from URL structure
function getImmediateFallbacks(
  section: string,
  folderParam: string,
  documentParam: string,
) {
  return {
    collectionFallback: COMMON_SECTIONS[section] || slugToTitle(section),
    topicFallback: folderParam ? slugToTitle(folderParam) : "",
    categoryFallback: documentParam ? slugToTitle(documentParam) : "",
  };
}

async function fetchCollectionData(section: string) {
  const cacheKey = `collection-${section}`;
  const now = Date.now();

  // Check cache first
  const cached = cache.get(cacheKey);
  if (cached && now - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    const response = await fetch(
      `/api/knowledge-base?section=${section}&_t=${now}`,
      {
        signal: controller.signal,
        headers: {
          "Cache-Control": "max-age=1800", // 30 minutes browser cache
        },
      },
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error(`Failed to fetch data: ${response.status}`);
      return null;
    }

    const data = await response.json();
    const result = data && data.length > 0 ? data[0] : null;

    // Cache the result with extended duration
    cache.set(cacheKey, { data: result, timestamp: now });

    return result;
  } catch (error) {
    console.error("Error fetching collection data:", error);
    return null;
  }
}

export default function Breadcrumbs({
  section: propSection,
  folderParam: propFolderParam,
  documentParam: propDocumentParam,
  questionId: propQuestionId,
  collectionTitle: ssrCollectionTitle,
  topicTitle: ssrTopicTitle,
  categoryTitle: ssrCategoryTitle,
}: BreadcrumbsProps) {
  const params = useParams();
  const mobileAccordion = useMobileAccordion();

  // Use props if provided, otherwise fall back to useParams
  const section = propSection || (params?.section as string);
  const folderParam = propFolderParam || (params?.folder as string);
  const documentParam = propDocumentParam || (params?.document as string);

  // State for client-side fetching (fallback when SSR props not provided)
  const [collection, setCollection] = useState<any>(null);
  const [clientTopicTitle, setClientTopicTitle] = useState<string>("");
  const [clientCategoryTitle, setClientCategoryTitle] = useState<string>("");
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Determine if we should use SSR data
  const useSSRData = ssrCollectionTitle || ssrTopicTitle || ssrCategoryTitle;

  // Get immediate fallback titles from URL structure
  const { collectionFallback, topicFallback, categoryFallback } =
    getImmediateFallbacks(
      section || "",
      folderParam || "",
      documentParam || "",
    );

  // Fast fetch with minimal re-renders
  useEffect(() => {
    if (!section || useSSRData) {
      setIsLoaded(true);
      return;
    }

    // Check cache immediately
    const cached = cache.get(`collection-${section}`);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      setCollection(cached.data);

      if (cached.data) {
        // Process data immediately from cache
        let topic = null;
        if (folderParam && cached.data.topics) {
          topic = cached.data.topics.find(
            (t: any) => t.id === folderParam || t.slug === folderParam,
          );
          setClientTopicTitle(topic ? topic.title : "");
        }

        if (topic && documentParam && topic.categories) {
          const category = topic.categories.find(
            (c: any) => c.id === documentParam || c.slug === documentParam,
          );
          setClientCategoryTitle(category ? category.title : "");
        }
      }
      setIsLoaded(true);
      return;
    }

    // Fetch data in background without blocking render
    fetchCollectionData(section).then((collectionData) => {
      if (collectionData) {
        setCollection(collectionData);

        let topic = null;
        if (folderParam && collectionData.topics) {
          topic = collectionData.topics.find(
            (t: any) => t.id === folderParam || t.slug === folderParam,
          );
          setClientTopicTitle(topic ? topic.title : "");
        }

        if (topic && documentParam && topic.categories) {
          const category = topic.categories.find(
            (c: any) => c.id === documentParam || c.slug === documentParam,
          );
          setClientCategoryTitle(category ? category.title : "");
        }
      }
      setIsLoaded(true);
    });
  }, [section, folderParam, documentParam, useSSRData]);

  // Use SSR data if available, then API data, then fallback to URL-based titles
  const collectionTitle: string =
    ssrCollectionTitle || collection?.title || collectionFallback;
  const topicTitle: string = ssrTopicTitle || clientTopicTitle || topicFallback;
  const categoryTitle: string =
    ssrCategoryTitle || clientCategoryTitle || categoryFallback;

  // Memoize the breadcrumb items
  const breadcrumbItems = useMemo(() => {
    const items = [];

    if (collectionTitle) {
      items.push({
        type: "collection",
        title: collectionTitle,
        href: `/support/knowledge-base/${section}`,
      });
    }

    if (topicTitle) {
      items.push({
        type: "topic",
        title: topicTitle,
        href: `/support/knowledge-base/${section}/${folderParam}`,
      });
    }

    if (categoryTitle) {
      items.push({
        type: "category",
        title: categoryTitle,
        href: `/support/knowledge-base/${section}/${folderParam}/${documentParam}`,
      });
    }

    return items;
  }, [
    collectionTitle,
    topicTitle,
    categoryTitle,
    section,
    folderParam,
    documentParam,
  ]);

  // Always render breadcrumbs to prevent layout shift
  return (
    <div
      id="mobile-breadcrumb"
      className="mb-2 mt-5 flex flex-wrap items-center gap-x-1 gap-y-[4px] pl-4 text-[14px] font-medium leading-[1.2] tracking-normal md:gap-x-0 md:gap-y-0 md:font-['Inter'] md:text-[18px] md:font-[400] md:leading-[100%] md:tracking-[0%]"
      style={{ fontFamily: "Inter", color: "#128789" }}
    >
      <Link
        href="/support"
        className="break-words active:underline md:text-[#128789]"
        style={{ color: "#128789" }}
      >
        Home
      </Link>

      {breadcrumbItems.map((item, index) => {
        const isLastItem = index === breadcrumbItems.length - 1;
        const linkHref = isLastItem ? item.href : "/support";
        const shouldUseAccordionOnMobile = !isLastItem;

        return (
          <div key={`${item.type}-${index}`} className="flex items-center">
            <span className="text-black">&nbsp;/&nbsp;</span>
            {/* Mobile version */}
            {shouldUseAccordionOnMobile ? (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  if (mobileAccordion?.openAccordion) {
                    let expandedCollection: string | undefined;
                    let expandedTopic: string | undefined;
                    let expandedCategory: string | undefined;

                    if (index === 0) {
                      expandedCollection = section;
                    } else if (index === 1) {
                      expandedCollection = section;
                      expandedTopic = folderParam;
                    } else if (index === 2) {
                      expandedCollection = section;
                      expandedTopic = folderParam;
                      expandedCategory = documentParam;
                    }

                    mobileAccordion.openAccordion(
                      expandedCollection,
                      expandedTopic,
                      expandedCategory,
                    );
                  } else {
                    window.location.href = "/support";
                  }
                }}
                className="break-words text-left capitalize active:underline md:hidden"
                style={{ color: "#128789" }}
              >
                {item.title}
              </button>
            ) : (
              <Link
                href={isLastItem ? item.href : "/support"}
                className="break-words capitalize active:underline md:hidden"
                style={{ color: "#128789" }}
              >
                {item.title}
              </Link>
            )}
            {/* Desktop version */}
            {isLastItem ? (
              <Link
                href={linkHref}
                className="hidden break-words capitalize active:underline md:block md:text-[#128789]"
                style={{ color: "#128789" }}
              >
                {item.title}
              </Link>
            ) : (
              <span className="hidden break-words capitalize md:block md:cursor-default md:text-[#128789]">
                {item.title}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
