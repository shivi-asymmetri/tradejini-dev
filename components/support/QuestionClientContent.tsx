"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { smoothScrollTo } from "@/utils/smoothScroll";
import { Question } from "@/types/KnowledgeBaseType";
import MobileNavigationSpinner from "./MobileNavigationSpinner";
import { useMobileNavigation } from "./MobileNavigationContext";
import { useIsMobile } from "@/hooks/useIsMobile";
import MarkdownContent from "../../app/support/knowledge-base/MarkdownContent";
import fallbackQuestions from "@/data/fallbackQuestions.json";

// --- Types (should match server component) ---
type QuestionDetail = {
  id: string;
  title: string;
  content: string;
  slug: string;
  status: string;
  order: number;
  pathname: string;
  created_at: string;
  modified_at: string;
};

interface QuestionClientContentProps {
  initialCurrentQuestion: Question;
  initialRelatedQuestions: Question[];
  paramsForPathContext: {
    section: string;
    folder: string;
    document: string;
    category: string; // This is the current question's slug/ID
  };
  breadcrumbPath: string; // Path to go back to, e.g. /support/kb/section/folder/document
}

export default function QuestionClientContent({
  initialCurrentQuestion,
  initialRelatedQuestions,
  paramsForPathContext,
  breadcrumbPath,
}: QuestionClientContentProps) {
  const router = useRouter();
  const { isNavigating, setIsNavigating } = useMobileNavigation();
  const [currentQuestion, setCurrentQuestion] = useState<Question>(
    initialCurrentQuestion,
  );
  const [relatedQuestions, setRelatedQuestions] = useState<Question[]>(
    initialRelatedQuestions,
  );
  const [loading, setLoading] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [contentLoaded, setContentLoaded] = useState(false);

  // Add mobile detection helper
  const isMobile = () => {
    if (typeof window === "undefined") return false;
    return window.innerWidth <= 768; // Tailwind's md breakpoint
  };

  // Helper function to check if device is small mobile
  const isSmallMobile = () => {
    if (typeof window === "undefined") return false;
    return window.innerHeight < 800 && window.innerWidth < 400;
  };

  // Helper function to calculate optimal scroll offset
  const getScrollOffset = () => {
    if (typeof window === "undefined") return -100;

    // Try to detect actual header/navigation height
    const header =
      document.querySelector("header") || document.querySelector("nav");
    const headerHeight = header ? header.offsetHeight : 0;

    // Add some padding for better positioning
    const basePadding = isMobile() ? 20 : 30;
    let calculatedOffset = -(headerHeight + basePadding);

    // Add extra offset for small mobile devices
    if (isSmallMobile()) {
      calculatedOffset -= 180; // Increased to 180px additional offset for small mobile devices
    }

    // Fallback to default values if calculation seems off
    const fallbackOffset = isSmallMobile()
      ? -300 // Further increased fallback for small mobile
      : isMobile()
        ? -100 // Regular mobile fallback (unchanged)
        : -120; // Desktop fallback (unchanged)

    // Use calculated offset if it's reasonable, otherwise use fallback
    return calculatedOffset < -350 || calculatedOffset > -50
      ? fallbackOffset
      : calculatedOffset;
  };

  useEffect(() => {
    setCurrentQuestion(initialCurrentQuestion);
    setRelatedQuestions(initialRelatedQuestions);

    // Add loading class to body
    document.body.classList.add("loading-content");

    // Function to handle content ready state
    const handleContentReady = () => {
      // Small delay to ensure smooth transition
      setTimeout(() => {
        // Update all states together to prevent flickering
        requestAnimationFrame(() => {
          setIsReady(true);
          setContentLoaded(true);
          setIsInitialLoad(false);
          setIsNavigating(false);
          setLoading(false);
          // Remove loading class from body
          document.body.classList.remove("loading-content");
        });
      }, 100);
    };

    // Wait for content to be ready
    const timer = setTimeout(handleContentReady, 500);

    return () => {
      clearTimeout(timer);
      document.body.classList.remove("loading-content");
    };
  }, [initialCurrentQuestion, initialRelatedQuestions, setIsNavigating]);

  const handleRelatedQuestionClick = (question: QuestionDetail) => {
    // Only set loading and navigating for desktop
    if (!isMobile()) {
      setLoading(true);
      setIsNavigating(true);
    }

    // Prefer pathname if available, otherwise construct
    const targetUrl = question.pathname
      ? `/support/knowledge-base${question.pathname}`
      : `/support/knowledge-base/${paramsForPathContext.section}/${paramsForPathContext.folder}/${paramsForPathContext.document}/${question.slug || question.id}`;

    // Store topic position for proper scrolling
    const topicPosition = {
      topicId: paramsForPathContext.folder,
      topicSlug: paramsForPathContext.folder,
      topicTitle: currentQuestion.title.split(" - ")[0], // Extract topic title from question title
    };
    sessionStorage.setItem("topicPosition", JSON.stringify(topicPosition));

    // Store current scroll position before navigation
    const currentScroll = window.scrollY;
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPosition = Math.min(currentScroll, maxScroll);
    if (scrollPosition > 0) {
      sessionStorage.setItem("docScrollPosition", scrollPosition.toString());
    }

    router.push(targetUrl);
  };

  useEffect(() => {
    if (currentQuestion && !isScrolling) {
      // Add a delay to ensure DOM is fully rendered
      setTimeout(() => {
        const titleElement = window.document.getElementById("question-title");
        if (titleElement) {
          setIsScrolling(true);

          // Simplified and more reliable scroll calculation
          const elementTop =
            titleElement.getBoundingClientRect().top + window.pageYOffset;

          // Simple, consistent offset based on device type
          const offset = isMobile() ? -110 : -140; // Both mobile and desktop: 10px more down
          const targetPosition = Math.max(0, elementTop + offset);

          smoothScrollTo(targetPosition, {
            duration: 800,
            offset: 0, // Already calculated in targetPosition
          });

          setIsScrolling(false);
        }
      }, 100); // Small delay to ensure DOM is ready
    }
  }, [currentQuestion, isScrolling]);

  // Handle clicks on links within the dynamically inserted markdown content
  useEffect(() => {
    if (!currentQuestion) return;

    const handleMarkdownLinkClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const link = target.closest("a[href^='/support/knowledge-base/']"); // Target specific internal links

      if (link) {
        const href = link.getAttribute("href");
        if (href) {
          event.preventDefault(); // Prevent default browser navigation
          setLoading(true);
          router.push(href); // Use Next.js router for SPA navigation
          // Server component for the new route will fetch data.
        }
      }
    };

    const contentElement = window.document.getElementById(
      "question-content-section",
    );
    if (contentElement) {
      contentElement.addEventListener("click", handleMarkdownLinkClick);
    }

    return () => {
      if (contentElement) {
        contentElement.removeEventListener("click", handleMarkdownLinkClick);
      }
    };
  }, [currentQuestion, router, paramsForPathContext]); // Add router and params to deps

  // Add event listener for category selection
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

      // Instant scroll to the category content for consistent behavior
      const element = document.getElementById(categoryHash);
      if (element && !isScrolling) {
        setIsScrolling(true);

        const elementTop =
          element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementTop + getScrollOffset();

        window.scrollTo({
          top: offsetPosition,
          behavior: "auto", // Instant scroll for reliability
        });

        setIsScrolling(false);
      }
    };

    window.addEventListener("categorySelected", handleCategorySelected);

    return () => {
      window.removeEventListener("categorySelected", handleCategorySelected);
    };
  }, [isScrolling]);

  if (loading && !currentQuestion) {
    // Show loading if navigating client-side to a new question
    return <div className="p-4 text-center">Loading question...</div>; // Replace with actual Loading component if desired
  }

  if (!currentQuestion) {
    // This should ideally not be hit if server component handles errors properly
    return (
      <div className="p-4 text-center text-red-500">
        Question details not available.
      </div>
    );
  }

  return (
    <>
      <style jsx global>{`
        body.loading-content {
          overflow: hidden;
        }
        body.loading-content footer {
          display: none !important;
        }
        @media (min-width: 768px) {
          body.loading-content {
            overflow: auto;
          }
          body.loading-content footer {
            display: block !important;
          }
        }
      `}</style>
      <div className="flex flex-1 flex-col px-4 max-md:-mt-4 sm:px-12 md:px-10 md:pt-10">
        {/* Mobile Navigation Spinner - only show for desktop or non-question navigation */}
        <MobileNavigationSpinner
          isVisible={
            isMobile() &&
            (isNavigating || isInitialLoad || loading) &&
            !isInitialLoad
          }
        />

        {/* Canonical link is handled by generateMetadata in the server component */}
        <div className="space-y-5">
          <div className="mb-5 flex justify-between md:mb-3">
            <Link
              href={breadcrumbPath}
              className="hidden items-center gap-2 align-middle font-inter text-[14px] font-medium leading-[100%] tracking-normal text-[#128789] no-underline hover:no-underline focus:no-underline sm:flex"
            >
              <span className="relative -top-0.5 align-middle text-lg">
                {"<"}
              </span>
              Back
            </Link>
            {/* Placeholder for potential future nav buttons */}
            <div className="flex gap-4"></div>
          </div>
        </div>

        {/* Mobile-only spacer */}
        <div className="block h-2 sm:hidden"></div>

        <h1
          id="question-title"
          className="border-zinc-300 align-middle font-inter text-[28px] font-medium leading-[1.4] tracking-normal text-black max-sm:align-middle max-sm:text-[20px] max-sm:font-semibold max-sm:leading-[1.3] max-sm:tracking-normal max-sm:text-black/90 sm:text-[22px]"
          style={{
            fontFamily: "Inter",
            color: "#000000",
            fontWeight: 500,
            letterSpacing: "0%",
            verticalAlign: "middle",
            margin: 0,
            padding: 0,
          }}
        >
          {currentQuestion.title
            ? currentQuestion.title.charAt(0).toUpperCase() +
              currentQuestion.title.slice(1)
            : ""}
        </h1>

        <div className="mt-3 flex-1 space-y-5">
          <div id="question-content-section" className="flex-1">
            <MarkdownContent content={currentQuestion.content} />
          </div>

          {(() => {
            // Use related questions if available, otherwise use fallback questions
            const questionsToShow =
              relatedQuestions && relatedQuestions.length > 0
                ? relatedQuestions
                : fallbackQuestions;
            const sectionTitle =
              relatedQuestions && relatedQuestions.length > 0
                ? "Related Queries"
                : "Related Queries";

            return (
              <div
                className="pb-3 pt-1 text-left md:px-0 md:pb-6 md:pt-2"
                style={{ paddingLeft: 0 }}
              >
                <div
                  className="mb-4 align-middle font-inter text-base font-medium leading-[1.4] tracking-normal max-sm:align-middle max-sm:text-[17px] max-sm:font-medium max-sm:leading-[100%] max-sm:tracking-normal max-sm:text-black/90 sm:text-[18px]"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {sectionTitle}
                </div>
                <div className="flex w-full flex-col gap-2">
                  {questionsToShow.map((question, i) => (
                    <div
                      key={question.id + i}
                      className={
                        i !== questionsToShow.length - 1
                          ? "border-b border-[#DDDDDD] pb-2"
                          : ""
                      }
                    >
                      <Button
                        variant="link"
                        className="h-auto w-full justify-start whitespace-normal px-0 py-1.5 text-left align-middle font-inter text-[16px] font-medium leading-[1.4] tracking-normal text-[#128789] hover:no-underline active:text-[#174047] max-sm:align-middle max-sm:text-[15px] max-sm:font-medium max-sm:leading-[1.4] max-sm:tracking-normal max-sm:text-[#128789]"
                        style={{
                          fontFamily: "Inter, sans-serif",
                        }}
                        onClick={() => handleRelatedQuestionClick(question)}
                      >
                        <span className="flex">
                          <span className="mr-1 min-w-[1.5em]">{i + 1}.</span>
                          <span className="flex-1">{question.title}</span>
                        </span>
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </>
  );
}
