"use client";

import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";
import React from "react";

interface Collection {
  id: string;
  slug: string;
  title: string;
  topics?: Topic[];
}

interface Topic {
  id: string;
  title: string;
  slug?: string;
  categories?: Category[];
}

interface Category {
  id: string;
  title: string;
  slug?: string;
}

interface FolderSidebarProps {
  initialCollections: Collection[];
  currentSection: string;
}

export default function FolderSidebar({
  initialCollections,
  currentSection,
}: FolderSidebarProps) {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const isAdmin = pathname.includes("/admin/");

  const [collections, setCollections] =
    useState<Collection[]>(initialCollections);
  const [currentCollection, setCurrentCollection] = useState<Collection | null>(
    null,
  );
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeTopic, setActiveTopic] = useState<string | null>(null);
  const [expandedMobileTopic, setExpandedMobileTopic] = useState<string | null>(
    null,
  );
  const [expandedTopicId, setExpandedTopicId] = useState<string | null>(null);
  const [loadingCategoriesForTopicId, setLoadingCategoriesForTopicId] =
    useState<string | null>(null);

  // Add this inside the FolderSidebar component
  const categoryRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // Initialize current collection from server data
  useEffect(() => {
    if (currentSection && initialCollections.length > 0) {
      const foundCollection = initialCollections.find(
        (col) => col.slug === currentSection,
      );
      setCurrentCollection(foundCollection || null);
    }
  }, [currentSection, initialCollections]);

  useEffect(() => {
    const currentTopicSlugOrId = params.folder as string;
    const currentCategorySlugOrId = params.category as string;
    const currentDocumentSlugOrId = params.document as string;

    if (currentTopicSlugOrId) {
      setActiveTopic(currentTopicSlugOrId);
      setExpandedMobileTopic(currentTopicSlugOrId);
    } else {
      setActiveTopic(null);
      setExpandedMobileTopic(null);
    }

    // Set active category based on URL params
    // Check both params.category (for question pages) and params.document (for category pages)
    if (currentCategorySlugOrId) {
      // We're on a question page like /[section]/[folder]/[document]/[category]
      setActiveCategory(currentCategorySlugOrId);
    } else if (currentDocumentSlugOrId) {
      // We're on a category page like /[section]/[folder]/[document]
      setActiveCategory(currentDocumentSlugOrId);
    } else {
      setActiveCategory(null);
    }
  }, [params.folder, params.category, params.document]);

  // Only fetch additional data (like categories) when needed
  const fetchAndUpdateCategories = async (
    topicId: string,
    sectionSlug: string,
  ) => {
    if (!sectionSlug) {
      console.error("Section slug is required to fetch categories.");
      return;
    }
    setLoadingCategoriesForTopicId(topicId);
    try {
      console.log(
        `Fetching categories for topic ${topicId} in section ${sectionSlug}`,
      );
      const resp = await fetch(
        `/api/knowledge-base?section=${sectionSlug}&topicId=${topicId}&includeCategories=true&sortBy=title&sortOrder=asc`,
      );
      if (resp.ok) {
        const fetchedCollections: Collection[] = await resp.json();
        const relevantCollectionFromResponse = fetchedCollections.find(
          (c) => c.slug === sectionSlug,
        );
        if (
          relevantCollectionFromResponse &&
          relevantCollectionFromResponse.topics
        ) {
          const updatedTopicData = relevantCollectionFromResponse.topics.find(
            (t) => t.id === topicId,
          );
          if (updatedTopicData && updatedTopicData.categories !== undefined) {
            setCollections((prevCollections) =>
              prevCollections.map((collection) =>
                collection.slug === sectionSlug
                  ? {
                      ...collection,
                      topics: collection.topics?.map((topic) =>
                        topic.id === topicId
                          ? {
                              ...topic,
                              categories: updatedTopicData.categories,
                            }
                          : topic,
                      ),
                    }
                  : collection,
              ),
            );
          } else {
            setCollections((prevCollections) =>
              prevCollections.map((collection) =>
                collection.slug === sectionSlug
                  ? {
                      ...collection,
                      topics: collection.topics?.map((topic) =>
                        topic.id === topicId
                          ? { ...topic, categories: [] }
                          : topic,
                      ),
                    }
                  : collection,
              ),
            );
          }
        }
      } else {
        console.error(
          `API error fetching categories for topic ${topicId}: ${resp.status}`,
        );
        setCollections((prevCollections) =>
          prevCollections.map((collection) =>
            collection.slug === sectionSlug
              ? {
                  ...collection,
                  topics: collection.topics?.map((topic) =>
                    topic.id === topicId ? { ...topic, categories: [] } : topic,
                  ),
                }
              : collection,
          ),
        );
      }
    } catch (e) {
      console.error("Error fetching categories for topic:", topicId, e);
    } finally {
      setLoadingCategoriesForTopicId(null);
    }
  };

  useEffect(() => {
    if (currentSection && collections.length > 0) {
      const foundCollection = collections.find(
        (col) => col.slug === currentSection,
      );
      setCurrentCollection(foundCollection || null);
    } else {
      setCurrentCollection(null);
    }
  }, [collections, currentSection]);

  useEffect(() => {
    if (
      !currentCollection ||
      !currentCollection.topics ||
      currentCollection.topics.length === 0
    ) {
      setExpandedTopicId(null);
      return;
    }

    let targetTopicToExpand: Topic | null = null;
    if (activeTopic) {
      targetTopicToExpand =
        currentCollection.topics.find(
          (t) => (t.slug || t.id) === activeTopic,
        ) || currentCollection.topics[0];
    } else {
      targetTopicToExpand = currentCollection.topics[0];
    }

    if (targetTopicToExpand) {
      setExpandedTopicId(targetTopicToExpand.id);

      if (
        targetTopicToExpand.categories === undefined &&
        currentCollection.slug
      ) {
        fetchAndUpdateCategories(
          targetTopicToExpand.id,
          currentCollection.slug,
        );
      }
    } else {
      setExpandedTopicId(null);
    }
  }, [currentCollection, activeTopic]);

  // Updated handleCategoryClick to properly navigate to category pages
  const handleCategoryClick = (
    collectionSlug: string,
    topic: Topic,
    category: Category,
  ) => {
    // Clear previous active category and set the new one
    setActiveCategory(category.id);

    // Create the proper category slug for navigation
    const categorySlug =
      category.slug || category.title.toLowerCase().replace(/\s+/g, "-");
    const topicSlug = topic.slug || topic.id;

    // Check current path structure to determine behavior
    const pathParts = pathname.split("/").filter(Boolean);
    const isKnowledgeBasePage =
      pathParts[0] === "support" && pathParts[1] === "knowledge-base";

    if (!isKnowledgeBasePage) {
      // Not on knowledge base, navigate normally
      router.push(
        `/support/knowledge-base/${collectionSlug}/${topicSlug}/${categorySlug}`,
        { scroll: false },
      );
      return;
    }

    // Determine page type based on URL structure
    const isDocumentPage = pathParts.length === 5;
    const isQuestionPage = pathParts.length === 6;

    // Create the event detail object with more reliable identifiers
    const eventDetail = {
      categoryId: category.id,
      categorySlug: category.slug,
      categoryTitle: category.title,
      categoryHash: categorySlug,
      topicId: topic.id,
      topicSlug: topic.slug,
      // Add timestamp for debugging
      timestamp: Date.now(),
    };

    // Always clear all stored scroll positions for clean slate
    sessionStorage.removeItem("docScrollPosition");
    sessionStorage.removeItem("topicPosition");
    sessionStorage.removeItem("mobileScrollPosition");
    sessionStorage.removeItem("categoryEventDetail");

    if (isDocumentPage) {
      // We're on the document page - dispatch event for scrolling
      // Add a small delay to ensure DOM is ready
      setTimeout(() => {
        const event = new CustomEvent("categorySelected", {
          detail: eventDetail,
        });
        window.dispatchEvent(event);
      }, 50);
    } else {
      // We're on topic page or question page - navigate to category page
      // Store the event detail for immediate scroll after navigation
      sessionStorage.setItem(
        "categoryEventDetail",
        JSON.stringify(eventDetail),
      );

      // Mark that this navigation is from sidebar category click
      sessionStorage.setItem("fromSidebarCategoryClick", "true");

      // Force immediate navigation without delay to reduce timing issues
      router.push(
        `/support/knowledge-base/${collectionSlug}/${topicSlug}/${categorySlug}`,
        { scroll: false },
      );
    }
  };

  // Since we have initial data, no loading state needed
  if (!currentCollection && collections.length > 0) {
    const firstCollection = collections[0];
    return (
      <div
        className={`h-full w-[26rem] max-w-[26rem] overflow-y-auto rounded-sm border-r-2 border-zinc-100 p-6 max-lg:border-none max-md:p-0 ${params?.folder && "max-lg:hidden"}`}
      >
        <div className="relative space-y-6">
          <p className="mb-4 text-sm text-gray-600">
            No collection found for this section. You can select from available
            collections:
          </p>
          <Select
            value={firstCollection.slug}
            onValueChange={(value) => {
              router.push(`/support/knowledge-base/${value}`, {
                scroll: false,
              });
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Collection" />
            </SelectTrigger>
            <SelectContent>
              {collections.map((collection) => (
                <SelectItem key={collection.slug} value={collection.slug}>
                  {collection.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    );
  }

  if (!currentCollection) {
    return (
      <div
        className={`h-full w-[26rem] max-w-[26rem] overflow-y-auto rounded-sm border-r-2 border-zinc-100 p-6 max-lg:border-none max-md:p-0 ${params?.folder && "max-lg:hidden"}`}
      >
        <div className="relative space-y-6">
          <p className="text-sm text-gray-600">No collections available.</p>
        </div>
      </div>
    );
  }

  // Render topics as buttons, expand to show categories when clicked
  return (
    <div className="h-full w-full overflow-y-auto overflow-x-hidden border-r border-zinc-100 bg-white">
      <div id="sidebar-content" className="w-full">
        {currentCollection.topics?.map((topic, idx) => {
          const isExpanded =
            expandedTopicId === topic.id || expandedTopicId === topic.slug;
          const isActive =
            params?.folder === topic.id || params?.folder === topic.slug;
          return (
            <React.Fragment key={topic.id}>
              {isExpanded ? (
                <>
                  <div
                    className="flex items-stretch bg-[#ecf3f2]"
                    style={{ minHeight: 44 }}
                  >
                    <div className="w-2 flex-shrink-0 bg-[#178086]" />
                    <div className="min-w-0 flex-1 whitespace-normal break-words py-3 pl-6 pr-2 font-['Inter'] text-[16px] font-[500] leading-[100%] tracking-[0%] text-[#000000CC]">
                      {topic.title}
                    </div>
                  </div>
                  {/* Spacer div for clear separation */}
                  <div className="h-6 bg-white"></div>
                </>
              ) : (
                <div className="px-2 py-6">
                  <button
                    className="w-full min-w-0 rounded px-6 py-1 text-left transition-colors hover:bg-gray-100"
                    onClick={async () => {
                      const newExpandedTopicId = topic.id;
                      setExpandedTopicId(newExpandedTopicId);

                      if (
                        topic.categories === undefined &&
                        currentCollection?.slug
                      ) {
                        await fetchAndUpdateCategories(
                          topic.id,
                          currentCollection.slug,
                        );
                      }

                      const updatedCollections = collections;
                      const updatedCurrentCollection = updatedCollections.find(
                        (c) => c.id === currentCollection?.id,
                      );
                      const topicForNav =
                        updatedCurrentCollection?.topics?.find(
                          (t) => t.id === newExpandedTopicId,
                        );

                      // Clear any stored scroll position from question navigation to avoid conflicts
                      sessionStorage.removeItem("docScrollPosition");
                      
                      // Store topic position for scrolling
                      const topicPosition = {
                        topicId: topic.id,
                        topicSlug: topic.slug,
                        topicTitle: topic.title,
                      };
                      sessionStorage.setItem(
                        "topicPosition",
                        JSON.stringify(topicPosition),
                      );

                      let firstCategory: Category | null = null;
                      if (
                        topicForNav?.categories &&
                        topicForNav.categories.length > 0
                      ) {
                        firstCategory = topicForNav.categories[0];
                      }

                      if (firstCategory) {
                        router.push(
                          `/support/knowledge-base/${currentCollection?.slug}/${topicForNav?.slug || newExpandedTopicId}/${firstCategory.slug || firstCategory.title.toLowerCase().replace(/\s+/g, "-")}`,
                          { scroll: false },
                        );
                      } else if (topicForNav) {
                        router.push(
                          `/support/knowledge-base/${currentCollection?.slug}/${topicForNav?.slug || newExpandedTopicId}`,
                          { scroll: false },
                        );
                      }
                    }}
                    style={{
                      outline: "none",
                      border: "none",
                      background: "none",
                    }}
                  >
                    <span className="block w-full min-w-0 whitespace-normal break-words align-middle font-['Inter'] text-[16px] font-[500] leading-snug tracking-[0%] text-gray-800">
                      {topic.title}
                    </span>
                  </button>
                </div>
              )}
              {isExpanded && (
                <div className="ml-12 mr-2 mt-0 flex flex-col gap-4 pb-6">
                  {loadingCategoriesForTopicId === topic.id ? (
                    <div className="px-2 py-1 text-sm text-gray-500">
                      Loading categories...
                    </div>
                  ) : topic.categories && topic.categories.length > 0 ? (
                    topic.categories.map((category) => (
                      <button
                        key={category.id}
                        ref={(el) => {
                          categoryRefs.current[category.id] = el;
                        }}
                        onClick={() => {
                          handleCategoryClick(
                            currentCollection.slug,
                            topic,
                            category,
                          );
                        }}
                        className={`w-full min-w-0 whitespace-normal break-words rounded px-4 py-1 text-left align-middle font-['Inter'] text-[14px] font-[400] leading-[100%] tracking-[0%] transition-colors ${
                          params.category === category.id ||
                          params.category === category.slug ||
                          params.document === category.id ||
                          params.document === category.slug
                            ? "bg-transparent text-[#128789]"
                            : "text-[#000000E5] hover:text-[#128789]"
                        }`}
                        style={{
                          background: "none",
                          border: "none",
                          outline: "none",
                        }}
                      >
                        {category.title}
                      </button>
                    ))
                  ) : topic.categories && topic.categories.length === 0 ? (
                    <div className="px-2 py-1 text-sm text-gray-500">
                      No categories available.
                    </div>
                  ) : null}
                </div>
              )}
              {/* Divider between topics, except after last */}
              {idx !== (currentCollection.topics?.length || 0) - 1 && (
                <div className="border-b border-gray-200" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
