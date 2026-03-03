"use client";

import React, { useMemo, useCallback } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import Link from "next/link";
import { useMobileAccordion } from "@/components/support/MobileAccordionContext";
import {
  useMobileNavigation,
  MobileNavigationProvider,
} from "./MobileNavigationContext";
import { usePathname } from "next/navigation";
import MobileLoadingSpinner from "./MobileLoadingSpinner";

interface Category {
  id: string;
  title: string;
  slug?: string;
}

interface Topic {
  id: string;
  title: string;
  slug?: string;
  categories?: Category[];
}

interface Collection {
  id: string;
  slug: string;
  title: string;
  topics?: Topic[];
  icon_url?: string;
}

interface MobileSupportAccordionProps {
  collections?: Collection[];
  onNavigate?: () => void;
  initialExpandedCollection?: string;
  initialExpandedTopic?: string;
  initialExpandedCategory?: string;
  setIsNavigating?: (isNavigating: boolean) => void;
}

const ACCORDION_STATE_KEY = "mobileAccordionOpenItems";
const ACTIVE_CATEGORY_KEY = "mobileActiveCategory";

// Helper functions for localStorage
const saveAccordionState = (items: string[]) => {
  try {
    localStorage.setItem(ACCORDION_STATE_KEY, JSON.stringify(items));
    console.log("Saved accordion state:", items);
  } catch (error) {
    console.error("Error saving accordion state:", error);
  }
};

const loadAccordionState = (): string[] => {
  try {
    const saved = localStorage.getItem(ACCORDION_STATE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      console.log("Loaded accordion state:", parsed);
      return parsed;
    }
  } catch (error) {
    console.error("Error loading accordion state:", error);
  }
  return [];
};

const saveActiveCategory = (categoryId: string | null) => {
  try {
    localStorage.setItem(ACTIVE_CATEGORY_KEY, categoryId || "");
  } catch (error) {
    console.error("Error saving active category:", error);
  }
};

const loadActiveCategory = (): string | null => {
  try {
    const saved = localStorage.getItem(ACTIVE_CATEGORY_KEY);
    return saved || null;
  } catch (error) {
    console.error("Error loading active category:", error);
    return null;
  }
};

const clearLocalStorage = () => {
  try {
    localStorage.removeItem(ACCORDION_STATE_KEY);
    localStorage.removeItem(ACTIVE_CATEGORY_KEY);
  } catch (error) {
    console.error("Error clearing localStorage:", error);
  }
};

export default function MobileSupportAccordion({
  collections = [],
  onNavigate,
  initialExpandedCollection,
  initialExpandedTopic,
  initialExpandedCategory,
  setIsNavigating,
}: MobileSupportAccordionProps) {
  const pathname = usePathname();

  // Clear localStorage if we're on the main support page
  React.useEffect(() => {
    if (pathname === "/support") {
      clearLocalStorage();
    }
  }, [pathname]);

  return (
    <MobileNavigationProvider>
      <MobileSupportAccordionContent
        collections={collections}
        onNavigate={onNavigate}
        initialExpandedCollection={initialExpandedCollection}
        initialExpandedTopic={initialExpandedTopic}
        initialExpandedCategory={initialExpandedCategory}
        setIsNavigating={setIsNavigating}
      />
    </MobileNavigationProvider>
  );
}

function MobileSupportAccordionContent({
  collections = [],
  onNavigate,
  initialExpandedCollection,
  initialExpandedTopic,
  initialExpandedCategory,
  setIsNavigating,
}: MobileSupportAccordionProps) {
  const mobileAccordion = useMobileAccordion();
  const [openItems, setOpenItems] = React.useState<string[]>([]);
  const [isInitialized, setIsInitialized] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [activeCategory, setActiveCategory] = React.useState<string | null>(
    null,
  );

  // Memoize the context expansion calculation
  const calculateContextExpansion = useCallback((): string[] => {
    if (!collections || collections.length === 0) return [];

    const items: string[] = [];
    const contextCollection = mobileAccordion?.expandedCollection;
    const contextTopic = mobileAccordion?.expandedTopic;
    const contextCategory = mobileAccordion?.expandedCategory;

    const collection = contextCollection || initialExpandedCollection;
    const topic = contextTopic || initialExpandedTopic;
    const category = contextCategory || initialExpandedCategory;

    if (category || topic || collection) {
      if (category) {
        for (const coll of collections) {
          if (coll.topics) {
            for (const top of coll.topics) {
              if (top.categories) {
                const foundCategory = top.categories.find(
                  (c) => c.id === category || c.slug === category,
                );
                if (foundCategory) {
                  items.push(coll.id);
                  items.push(top.id);
                  return items;
                }
              }
            }
          }
        }
      }

      if (topic && !category) {
        for (const coll of collections) {
          if (coll.topics) {
            const foundTopic = coll.topics.find(
              (t) => t.id === topic || t.slug === topic,
            );
            if (foundTopic) {
              items.push(coll.id);
              items.push(foundTopic.id);
              return items;
            }
          }
        }
      }

      if (collection && !topic && !category) {
        const foundCollection = collections.find(
          (c) => c.id === collection || c.slug === collection,
        );
        if (foundCollection) {
          items.push(foundCollection.id);
          return items;
        }
      }
    }

    return items;
  }, [
    collections,
    mobileAccordion?.expandedCollection,
    mobileAccordion?.expandedTopic,
    mobileAccordion?.expandedCategory,
    initialExpandedCollection,
    initialExpandedTopic,
    initialExpandedCategory,
  ]);

  // Memoize allIds calculation
  const allIds = useMemo(
    () => [
      ...(collections?.map((collection) => collection.id) || []),
      ...(collections?.flatMap(
        (collection) => collection.topics?.map((topic) => topic.id) || [],
      ) || []),
    ],
    [collections],
  );

  // Memoize expand all state
  const allExpanded = useMemo(
    () => openItems.length === allIds.length && allIds.length > 0,
    [openItems.length, allIds.length],
  );

  const anyOpen = openItems.length > 0;

  // Initialize accordion state with useCallback
  const initializeAccordion = useCallback(() => {
    if (!isInitialized && collections.length > 0) {
      const contextItems = calculateContextExpansion();
      if (contextItems.length > 0) {
        setOpenItems(contextItems);
      } else {
        // Load active category from localStorage
        const savedActiveCategory = loadActiveCategory();
        if (savedActiveCategory) {
          setActiveCategory(savedActiveCategory);
          // Find and open only the relevant collection and topic for the active category
          for (const collection of collections) {
            if (collection.topics) {
              for (const topic of collection.topics) {
                if (
                  topic.categories?.some(
                    (cat) => cat.id === savedActiveCategory,
                  )
                ) {
                  setOpenItems([collection.id, topic.id]);
                  break;
                }
              }
            }
          }
        } else {
          // If no active category, load saved state but ensure it's valid
          const savedItems = loadAccordionState();
          // Filter saved items to ensure they exist in current collections
          const validItems = savedItems.filter(
            (item) =>
              collections.some((c) => c.id === item) ||
              collections.some((c) => c.topics?.some((t) => t.id === item)),
          );
          setOpenItems(validItems);
        }
      }
      setIsInitialized(true);
    }
  }, [isInitialized, collections, calculateContextExpansion]);

  // Optimize handleCategoryClick with useCallback
  const handleCategoryClick = (
    collectionId: string,
    topicId: string,
    categoryId: string,
  ) => {
    setIsLoading(true);
    if (setIsNavigating) {
      setIsNavigating(true);
    }
    setActiveCategory(categoryId);
    saveActiveCategory(categoryId);

    // Only save the current collection and topic IDs
    setOpenItems([collectionId, topicId]);
    saveAccordionState([collectionId, topicId]);

    if (onNavigate) {
      onNavigate();
    }
  };

  // Optimize handleExpandAll with useCallback
  const handleExpandAll = useCallback(() => {
    const newItems = anyOpen ? [] : allIds;
    setOpenItems(newItems);
    saveAccordionState(newItems);
    // Clear active category when expanding/collapsing all
    setActiveCategory(null);
    saveActiveCategory(null);
  }, [anyOpen, allIds]);

  // Optimize handleValueChange with useCallback
  const handleValueChange = useCallback(
    (newOpenItems: string[]) => {
      // If we have an active category, ensure its collection and topic stay open
      if (activeCategory) {
        const requiredItems = new Set<string>();
        let foundActiveCategory = false;

        // First check if the active category is still in the collections
        for (const collection of collections) {
          if (collection.topics) {
            for (const topic of collection.topics) {
              if (topic.categories?.some((cat) => cat.id === activeCategory)) {
                foundActiveCategory = true;
                // Only add to required items if the user hasn't explicitly closed them
                if (newOpenItems.includes(collection.id)) {
                  requiredItems.add(collection.id);
                }
                if (newOpenItems.includes(topic.id)) {
                  requiredItems.add(topic.id);
                }
                break;
              }
            }
          }
        }

        // If active category is not found in collections, clear it
        if (!foundActiveCategory) {
          setActiveCategory(null);
          saveActiveCategory(null);
        }

        // Merge required items with user-selected items
        const finalItems = [...new Set([...newOpenItems, ...requiredItems])];
        setOpenItems(finalItems);
        saveAccordionState(finalItems);
      } else {
        setOpenItems(newOpenItems);
        saveAccordionState(newOpenItems);
      }
    },
    [activeCategory, collections],
  );

  // Use effect for initialization
  React.useEffect(() => {
    initializeAccordion();
  }, [initializeAccordion]);

  // Update when context changes
  React.useEffect(() => {
    if (isInitialized && mobileAccordion?.isOpen) {
      const contextItems = calculateContextExpansion();
      if (contextItems.length > 0) {
        setOpenItems(contextItems);
      }
    }
  }, [
    isInitialized,
    mobileAccordion?.isOpen,
    mobileAccordion?.expandedCollection,
    mobileAccordion?.expandedTopic,
    mobileAccordion?.expandedCategory,
    calculateContextExpansion,
  ]);

  if (!collections || collections.length === 0) {
    return <MobileLoadingSpinner />;
  }

  if (isLoading) {
    return <MobileLoadingSpinner />;
  }

  return (
    <div className="mx-auto w-full max-w-xl bg-white">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-white">
        <div className="flex items-center justify-between px-4 py-3">
          <span
            className="font-inter text-lg font-medium leading-none tracking-normal"
            style={{ color: "#00000099" }}
          >
            Support topics
          </span>
          <button
            className="text-right font-inter text-base font-medium leading-none tracking-normal text-[#161616E5] underline"
            onClick={handleExpandAll}
            type="button"
          >
            {anyOpen ? "Collapse all" : "Expand all"}
          </button>
        </div>
      </div>

      {/* Scrollable Content Area */}
      <div className="mt-1 pb-16">
        <Accordion.Root
          type="multiple"
          value={openItems}
          onValueChange={handleValueChange}
          className="bg-white will-change-transform"
        >
          {collections.map((collection, index) => {
            const isExpanded = openItems.includes(collection.id);

            return (
              <Accordion.Item
                key={collection.id}
                value={collection.id}
                className={`border-b border-gray-200 ${index === collections.length - 1 ? "border-b-0" : ""} ${index === 0 ? "border-t-0" : ""}`}
              >
                <Accordion.Header>
                  <Accordion.Trigger
                    className={`flex w-full items-center justify-between px-4 py-3 align-middle font-inter text-[18px] font-medium leading-snug tracking-normal text-[#222] transition-colors ${isExpanded ? "border-l-4 border-[#178086] bg-[#ecf3f2]" : "border-l-4 border-transparent bg-white"} hover:bg-gray-50 focus:outline-none`}
                  >
                    <span className="flex items-center gap-2">
                      <img
                        src={collection.icon_url || "/icons/default-icon.svg"}
                        alt=""
                        className="h-5 w-5"
                      />
                      {collection.title}
                    </span>
                    <span
                      className={`ml-2 flex items-center transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                    >
                      <svg
                        width="28"
                        height="28"
                        viewBox="0 0 28 28"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8 12L14 18L20 12"
                          stroke="#555"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="animate-accordion-down pb-4 pl-10 pr-2">
                  {collection.topics && collection.topics.length > 0 ? (
                    <ul className="space-y-1">
                      {collection.topics.map((topic) => {
                        const isTopicExpanded = openItems.includes(topic.id);

                        return (
                          <li key={topic.id}>
                            <Accordion.Item
                              value={topic.id}
                              className="border-none"
                            >
                              <Accordion.Header>
                                <Accordion.Trigger
                                  className={`mt-1 block flex w-full items-center justify-between px-2 py-2 align-middle font-inter text-[16px] font-medium leading-normal tracking-normal text-[#000000B2] hover:bg-gray-50 focus:outline-none`}
                                >
                                  <span className="text-left">
                                    {topic.title}
                                  </span>
                                  <span
                                    className={`transition-transform duration-200 ${isTopicExpanded ? "rotate-180" : ""}`}
                                  >
                                    <svg
                                      width="28"
                                      height="28"
                                      viewBox="0 0 28 28"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M8 12L14 18L20 12"
                                        stroke="#555"
                                        strokeWidth="2.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </span>
                                </Accordion.Trigger>
                              </Accordion.Header>
                              <Accordion.Content className="animate-accordion-down pb-3 pl-4">
                                {topic.categories &&
                                topic.categories.length > 0 ? (
                                  <ul className="-ml-3 space-y-2 border-l-2 border-gray-200">
                                    {topic.categories.map((category) => (
                                      <li key={category.id} className="pl-6">
                                        <Link
                                          href={`/support/knowledge-base/${collection.slug}/${topic.slug || topic.id}/${category.slug || category.id}?from=support`}
                                          className={`block py-2 align-middle font-inter text-[16px] font-medium leading-[100%] tracking-[0%] text-[#0F7271] transition-colors duration-200 hover:bg-[#ecf3f2] hover:underline active:text-[#174047] ${
                                            activeCategory === category.id
                                              ? "underline"
                                              : ""
                                          }`}
                                          onClick={() =>
                                            handleCategoryClick(
                                              collection.id,
                                              topic.id,
                                              category.id,
                                            )
                                          }
                                        >
                                          {category.title}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                ) : null}
                              </Accordion.Content>
                            </Accordion.Item>
                          </li>
                        );
                      })}
                    </ul>
                  ) : null}
                </Accordion.Content>
              </Accordion.Item>
            );
          })}
        </Accordion.Root>
      </div>
    </div>
  );
}
