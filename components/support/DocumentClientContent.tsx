"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useIsMobile } from "@/hooks/useIsMobile";
import MobileNavigationSpinner from "./MobileNavigationSpinner";
import { useMobileNavigation } from "./MobileNavigationContext";
import {
  Collection,
  Topic,
  Category,
  Question,
} from "@/types/KnowledgeBaseType";

interface DocumentClientContentProps {
  initialCollection: Collection | null;
  initialCurrentTopic: Topic | undefined;
  initialAllCollections: Collection[];
  sectionSlug: string;
  folderSlug: string;
  documentSlug: string;
}

export default function DocumentClientContent({
  initialCollection,
  initialCurrentTopic,
  initialAllCollections,
  sectionSlug,
  folderSlug,
  documentSlug,
}: DocumentClientContentProps) {
  const router = useRouter();
  const isMobile = useIsMobile();
  const { isNavigating, setIsNavigating } = useMobileNavigation();
  const [accordionValue, setAccordionValue] = useState<string[]>([]);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [contentLoaded, setContentLoaded] = useState(false);

  // Pre-calculate the current topic and categories on mount
  const { currentTopic, categoriesToShow, mobileFocusedCategoryTitle } =
    useMemo(() => {
      const topic = initialCurrentTopic;
      let categories = topic?.categories || [];
      let focusedTitle: string | null = null;

      if (isMobile) {
        const selectedCategory = categories.find(
          (cat) =>
            cat.slug === documentSlug ||
            cat.title.toLowerCase().replace(/\s+/g, "-") === documentSlug,
        );
        if (selectedCategory) {
          categories = [selectedCategory];
          focusedTitle = selectedCategory.title;
        } else {
          categories = [];
        }
      }

      return {
        currentTopic: topic,
        categoriesToShow: categories,
        mobileFocusedCategoryTitle: focusedTitle,
      };
    }, [initialCurrentTopic, isMobile, documentSlug]);

  useEffect(() => {
    // Add loading class to body
    document.body.classList.add("loading-content");

    // For mobile, always start at the top on initial load
    if (isMobile) {
      window.scrollTo(0, 0);
      // Clear any stored scroll positions for mobile
      sessionStorage.removeItem("docScrollPosition");
      sessionStorage.removeItem("mobileScrollPosition");
      sessionStorage.removeItem("topicPosition");
    }

    // Check if coming from sidebar category click first and clear conflicting scroll data
    const isFromSidebarClick = sessionStorage.getItem("fromSidebarCategoryClick");
    if (isFromSidebarClick) {
      sessionStorage.removeItem("docScrollPosition");
      sessionStorage.removeItem("fromSidebarCategoryClick");
    }

    const storedScroll = sessionStorage.getItem("docScrollPosition");
    const storedCategoryEvent = sessionStorage.getItem("categoryEventDetail");
    const storedTopicPosition = sessionStorage.getItem("topicPosition");

    // Function to handle content ready state
    const handleContentReady = () => {
      // Small delay to ensure smooth transition
      setTimeout(() => {
        // For mobile, always start at top unless explicitly returning from a question
        if (isMobile) {
          const isReturningFromQuestion = sessionStorage.getItem(
            "returningFromQuestion",
          );
          if (!isReturningFromQuestion) {
            window.scrollTo(0, 0);
            sessionStorage.removeItem("returningFromQuestion");
          }
        }

        // Prioritize category selection over stored scroll position
        if (storedCategoryEvent) {
          try {
            const eventDetail = JSON.parse(storedCategoryEvent);

            // Ensure all categories are expanded first for desktop
            if (!isMobile && currentTopic?.categories) {
              const allCategoryIds = currentTopic.categories.map(
                (cat) => cat.id,
              );
              setAccordionValue(allCategoryIds);
            }

            // Wait for DOM to be ready, then scroll to the target category
            setTimeout(() => {
              // Find the target element using the category hash (slug)
              const element = document.getElementById(eventDetail.categoryHash);

              if (element && !isMobile) {
                const elementTop =
                  element.getBoundingClientRect().top + window.pageYOffset;
                // Check if returning from question page - if so, use larger offset
                const wasFromQuestion = sessionStorage.getItem("docScrollPosition") !== null;
                const offsetPosition = Math.max(0, elementTop - (wasFromQuestion ? 120 : 80));

                window.scrollTo({
                  top: offsetPosition,
                  behavior: "auto",
                });
              }

              sessionStorage.removeItem("categoryEventDetail");
            }, 300); // Give enough time for accordion to expand
          } catch (e) {
            console.error("Error parsing stored category event:", e);
            sessionStorage.removeItem("categoryEventDetail");
          }
                } else if (storedScroll && !isMobile) {
          // Normal scroll restoration when returning from question - add delay for consistency
          setTimeout(() => {
            const scrollPosition = parseInt(storedScroll);
            const maxScroll =
              document.documentElement.scrollHeight - window.innerHeight;
            const targetPosition = Math.min(scrollPosition, maxScroll);

            if (
              targetPosition > 0 &&
              document.documentElement.scrollHeight > window.innerHeight
            ) {
              window.scrollTo({
                top: targetPosition,
                behavior: "auto",
              });
            }
          }, 200); // Delay to ensure content is fully loaded and rendered

          // Clean up stored scroll position
          sessionStorage.removeItem("docScrollPosition");
        } else if (storedTopicPosition && !isMobile) {
          // Only restore topic position for desktop
          // Handle topic position last
          try {
            const topicData = JSON.parse(storedTopicPosition);
            // Set all categories to be expanded
            if (currentTopic?.categories) {
              const allCategoryIds = currentTopic.categories.map(
                (cat) => cat.id,
              );
              setAccordionValue(allCategoryIds);
            }
            // Scroll to top of content with smooth behavior
            const topicContent = document.getElementById("topic-content");
            if (topicContent) {
              const offset = -50;
              const elementPosition = topicContent.getBoundingClientRect().top;
              const offsetPosition =
                elementPosition + window.pageYOffset + offset;

              window.scrollTo({
                top: offsetPosition,
                behavior: "auto",
              });
            }
          } catch (e) {
            console.error("Error parsing stored topic position:", e);
          }
          sessionStorage.removeItem("topicPosition");
        }

        // Update states after scroll is complete
        requestAnimationFrame(() => {
          setIsReady(true);
          setContentLoaded(true);
          setIsInitialLoad(false);
          setIsNavigating(false);
          document.body.classList.remove("loading-content");
        });
      }, 50);
    };

    // Wait for content to be ready
    const timer = setTimeout(handleContentReady, 100);

    return () => {
      clearTimeout(timer);
      document.body.classList.remove("loading-content");
    };
  }, [initialCurrentTopic, isMobile, currentTopic?.categories]);

  // Add a separate effect to handle mobile scroll preservation
  useEffect(() => {
    if (isMobile) {
      const handleScroll = () => {
        const currentScroll = window.scrollY;
        if (currentScroll > 0) {
          sessionStorage.setItem(
            "mobileScrollPosition",
            currentScroll.toString(),
          );
        }
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [isMobile]);

  // Add effect to restore mobile scroll position only when returning from a question
  useEffect(() => {
    if (isMobile && !isInitialLoad) {
      const storedMobileScroll = sessionStorage.getItem("mobileScrollPosition");
      const isReturningFromQuestion = sessionStorage.getItem(
        "returningFromQuestion",
      );

      if (storedMobileScroll && isReturningFromQuestion) {
        // Add delay for mobile scroll restoration consistency
        setTimeout(() => {
          const scrollPosition = parseInt(storedMobileScroll);
          window.scrollTo({
            top: Math.max(0, scrollPosition - 80),
            behavior: "auto",
          });
          sessionStorage.removeItem("mobileScrollPosition");
          sessionStorage.removeItem("returningFromQuestion");
        }, 150);
      } else {
        // For direct page visits on mobile, scroll to breadcrumbs with proper offset
        setTimeout(() => {
          const breadcrumbElement = document.getElementById("mobile-breadcrumb");
          if (breadcrumbElement) {
            const elementTop = breadcrumbElement.getBoundingClientRect().top + window.pageYOffset;
            // Use same offset as category selection for consistency
            const offsetPosition = Math.max(0, elementTop - 80);
            
            window.scrollTo({
              top: offsetPosition,
              behavior: "auto",
            });
          }
        }, 200);
      }
    }
  }, [isMobile, isInitialLoad]);

  // Store scroll position before navigating to a question
  const handleQuestionClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isMobile) {
      // For mobile, store the current scroll position and mark as returning from question
      const currentScroll = window.scrollY;
      if (currentScroll > 0) {
        sessionStorage.setItem(
          "mobileScrollPosition",
          currentScroll.toString(),
        );
        sessionStorage.setItem("returningFromQuestion", "true");
      }
      // Don't set isNavigating for mobile question clicks to avoid loading spinner
    } else {
      // For desktop, store scroll position for normal question navigationx
      requestAnimationFrame(() => {
        const currentScroll = window.scrollY;
        const maxScroll =
          document.documentElement.scrollHeight - window.innerHeight;
        const scrollPosition = Math.min(currentScroll, maxScroll);

        if (scrollPosition > 0) {
          sessionStorage.setItem(
            "docScrollPosition",
            scrollPosition.toString(),
          );
        }
      });
    }
  };

  // Pre-calculate accordion state
  const initialAccordionState = useMemo(() => {
    if (currentTopic?.categories) {
      if (!isMobile) {
        return currentTopic.categories.map((cat) => cat.id);
      } else {
        const selectedCategory = currentTopic.categories.find(
          (cat) =>
            cat.slug === documentSlug ||
            cat.title.toLowerCase().replace(/\s+/g, "-") === documentSlug,
        );
        return selectedCategory ? [selectedCategory.id] : [];
      }
    }
    return [];
  }, [currentTopic?.categories, isMobile, documentSlug]);

  useEffect(() => {
    setAccordionValue(initialAccordionState);
  }, [initialAccordionState]);

  // Add event listener for category selection with improved reliability
  useEffect(() => {
    const handleCategorySelected = (event: Event) => {
      const customEvent = event as CustomEvent<{
        categoryId: string;
        categorySlug?: string;
        categoryTitle: string;
        categoryHash: string;
        topicId: string;
        topicSlug?: string;
      }>;

      const { categoryId, categoryHash } = customEvent.detail;

      if (currentTopic?.categories) {
        const targetCategory = currentTopic.categories.find(
          (cat) => cat.id === categoryId,
        );
        if (targetCategory) {
          if (!isMobile) {
            const allCategoryIds = currentTopic.categories.map((cat) => cat.id);
            setAccordionValue(allCategoryIds);
          } else {
           
            window.scrollTo(0, 0);
            return; // Exit early for mobile
          }
        }
      }

      // Simple scroll for same-page category selection
      if (!isMobile && !isScrolling) {
        setIsScrolling(true);

        const element = document.getElementById(categoryHash);
        if (element) {
          const elementTop =
            element.getBoundingClientRect().top + window.pageYOffset;
          // Use normal offset for same-page category navigation
          const offsetPosition = Math.max(0, elementTop - 80);

          window.scrollTo({
            top: offsetPosition,
            behavior: "auto",
          });
        }

        setIsScrolling(false);
      }
    };

    window.addEventListener("categorySelected", handleCategorySelected);
    return () => {
      window.removeEventListener("categorySelected", handleCategorySelected);
    };
  }, [currentTopic?.categories, isMobile, isScrolling]);

  // Memoize mobile view content
  const mobileContent = useMemo(() => {
    if (categoriesToShow.length !== 1) {
      return (
        <div className="mt-6 px-4 text-gray-500">
          Select a category to view questions, or no category found for &quot;
          {documentSlug}&quot;.
        </div>
      );
    }

    return (
      <div className="px-0">
        <div
          className="mb-4 pl-4 text-[20px] font-medium leading-[1.2] tracking-normal"
          style={{ fontFamily: "Inter" }}
        >
          {mobileFocusedCategoryTitle || categoriesToShow[0].title}
        </div>
        <div className="flex flex-col gap-y-1 bg-white">
          {categoriesToShow[0].questions?.length > 0 ? (
            categoriesToShow[0].questions.map((question, idx, arr) => (
              <React.Fragment key={question.id}>
                <Link
                  href={`/support/knowledge-base/${sectionSlug}/${folderSlug}/${categoriesToShow[0].slug || categoriesToShow[0].title.toLowerCase().replace(/\s+/g, "-")}/${question.slug || question.title.toLowerCase().replace(/\s+/g, "-")}`}
                  onClick={handleQuestionClick}
                  className="w-full justify-start whitespace-normal break-words rounded-none bg-white py-3 pl-4 pr-4 text-left align-middle text-base font-medium leading-[1.4] tracking-normal text-[#128789] focus:outline-none active:text-[#174047]"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  <span className="flex">
                    <span className="mr-1 min-w-[1.5em]">{idx + 1}.</span>
                    <span className="flex-1">{question.title}</span>
                  </span>
                </Link>
                {idx !== arr.length - 1 && (
                  <div className="mx-4 border-b border-[#DDDDDD]" />
                )}
              </React.Fragment>
            ))
          ) : (
            <div className="px-4 text-gray-500">
              No questions available in this category.
            </div>
          )}
        </div>
      </div>
    );
  }, [
    categoriesToShow,
    mobileFocusedCategoryTitle,
    sectionSlug,
    folderSlug,
    documentSlug,
  ]);

  // Memoize desktop view content
  const desktopContent = useMemo(
    () => (
      <Accordion
        type="multiple"
        className="w-full max-w-none"
        value={accordionValue}
        onValueChange={setAccordionValue}
      >
        {currentTopic?.categories?.map((category) => (
          <AccordionItem
            value={category.id}
            key={category.id}
            id={
              category.slug || category.title.toLowerCase().replace(/\s+/g, "-")
            }
            className="category-scroll-container border-none"
          >
            <AccordionTrigger className="text-lg hover:no-underline md:align-middle md:font-['Inter'] md:text-[18px] md:font-[500] md:leading-[1.4] md:tracking-[0%] [&[data-state=open]>div]:border-none">
              {category.title}
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col">
                {category.questions?.length > 0 ? (
                  category.questions.map((question, qIdx) => (
                    <div key={question.id} className="md:pt-2">
                      <Link
                        href={`/support/knowledge-base/${sectionSlug}/${folderSlug}/${category.slug || category.title.toLowerCase().replace(/\s+/g, "-")}/${question.slug || question.title.toLowerCase().replace(/\s+/g, "-")}`}
                        onClick={handleQuestionClick}
                        className="block justify-start whitespace-normal break-words text-left text-base leading-[1.4] text-[#005b6c] hover:text-[#174047] active:text-[#174047] md:align-middle md:font-['Inter'] md:text-[16px] md:font-[500] md:leading-[1.4] md:tracking-[0%] md:text-[#128789]"
                      >
                        <span className="flex">
                          <span className="flex-1">{question.title}</span>
                        </span>
                      </Link>
                      {qIdx !== category.questions.length - 1 && (
                        <div className="my-4 border-b border-gray-200" />
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500">
                    No questions available in this category.
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    ),
    [currentTopic?.categories, accordionValue, sectionSlug, folderSlug],
  );

  if (!currentTopic) {
    return (
      <div className="p-4 text-center">
        Topic content not available (client-side). Please ensure data is passed
        correctly.
      </div>
    );
  }

  return (
    <>
      <style jsx global>{`
        body {
          overflow-x: hidden;
        }
        body.loading-content {
          overflow: hidden;
          height: 100vh;
          position: fixed;
          width: 100%;
        }
        body.loading-content footer {
          opacity: 0;
          visibility: hidden;
          transition:
            opacity 0.2s ease-out,
            visibility 0.2s ease-out;
        }
        @media (min-width: 768px) {
          body.loading-content {
            overflow: auto;
            position: static;
          }
          body.loading-content footer {
            opacity: 1;
            visibility: visible;
          }
        }
        #topic-content {
          min-height: calc(100vh - 200px);
          position: relative;
          z-index: 1;
          opacity: 1;
          transition: opacity 0.2s ease-out;
        }
        .category-scroll-container {
          scroll-margin-top: 100px;
          scroll-behavior: auto;
        }
        .content-transition {
          opacity: 0;
          transform: translateY(10px);
          transition:
            opacity 0.2s ease-out,
            transform 0.2s ease-out;
        }
        .content-transition.visible {
          opacity: 1;
          transform: translateY(0);
        }
        @media (max-width: 767px) {
          #topic-content {
            min-height: auto;
            // padding: 0;
            margin-top: 0;
            transform: none !important;
          }
          .flex-1.flex-col.pl-0.sm\:px-8 {
            min-height: auto;
            padding: 0;
            margin-top: 0;
            transform: none !important;
          }
          .content-transition {
            min-height: auto;
            height: auto;
            margin-top: 0;
            padding-top: 0;
            transform: none !important;
          }
          div[style*="minHeight: 100vh"] {
            min-height: auto !important;
            height: auto !important;
            margin-top: 0 !important;
            padding-top: 0 !important;
            transform: none !important;
          }
          body.loading-content {
            position: relative;
            overflow: auto;
            height: auto;
          }
          .category-scroll-container {
            scroll-margin-top: 0;
          }
        }
      `}</style>
      <div
        style={{
          position: "relative",
          backgroundColor: "white",
          zIndex: 1,
          opacity: isMobile ? (isReady ? 1 : 0) : 1,
          transition: "opacity 0.2s ease-out",
          minHeight: isMobile ? "auto" : "100vh",
          willChange: "opacity, transform",
        }}
        className={`content-transition ${isReady ? "visible" : ""}`}
      >
        {/* Single Mobile Navigation Spinner - only show for non-question navigation */}
        {isMobile && isNavigating && !isInitialLoad && (
          <MobileNavigationSpinner isVisible={true} />
        )}

        <div
          className="flex flex-1 flex-col pl-0 sm:px-8"
          style={{
            backgroundColor: "white",
            minHeight: isMobile ? "auto" : "100vh",
            willChange: "transform",
          }}
        >
          <div
            id="topic-content"
            className="flex flex-1 flex-col py-4 sm:py-8"
            style={{
              willChange: "transform",
            }}
          >
            {isMobile ? mobileContent : desktopContent}
          </div>
        </div>
      </div>
    </>
  );
}
