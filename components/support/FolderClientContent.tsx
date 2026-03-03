"use client";

import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useRouter } from "next/navigation"; // Changed from next/navigation
import { useEffect, useState } from "react";
import { Loading } from "@/components/ui/loading"; // In case of client-side loading needs

// --- Types (should match those in the server page component) ---
type Question = {
  id: string;
  title: string;
  slug?: string;
};

type Category = {
  id: string;
  title: string;
  slug?: string;
  questions: Question[];
};

type Topic = {
  id: string;
  title: string;
  slug?: string;
  icon_url?: string;
  categories: Category[];
};

type Collection = {
  id: string;
  slug: string;
  title: string;
  icon_url?: string;
  topics: Topic[];
};
// --- End Types ---

interface FolderClientContentProps {
  initialCollection: Collection | null;
  initialAllTopics: Topic[];
  initialAllCollections: Collection[]; // For context, if needed for UI elements like breadcrumbs or sidebars
  initialTopicSlugToIdMap: Record<string, string>;
  initialCurrentTopic: Topic | undefined;
  sectionSlug: string;
  folderSlug: string;
}

export default function FolderClientContent({
  initialCollection,
  initialAllTopics,
  initialAllCollections,
  initialTopicSlugToIdMap,
  initialCurrentTopic,
  sectionSlug,
  folderSlug,
}: FolderClientContentProps) {
  const router = useRouter();
  const [accordionValue, setAccordionValue] = useState<string[]>([]);

  // The currentTopic is derived from props, no need for separate state if it doesn't change client-side
  const currentTopic = initialCurrentTopic;

  // Handle hash-based navigation and accordion state
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (
        hash &&
        currentTopic?.categories?.find(
          (cat) =>
            cat.id === hash ||
            cat.slug === hash ||
            cat.title.toLowerCase().replace(/\s+/g, "-") === hash,
        )
      ) {
        setAccordionValue([hash]);
        // Scroll after a delay for accordion to open
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: "auto", block: "start" });
          }
        }, 100);
      }
    };

    handleHashChange(); // Initial check
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [currentTopic]); // Rerun if currentTopic changes

  // Effect to set initial accordion state based on URL hash if present on load
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (
      hash &&
      currentTopic?.categories?.find(
        (cat) =>
          cat.id === hash ||
          cat.slug === hash ||
          cat.title.toLowerCase().replace(/\s+/g, "-") === hash,
      )
    ) {
      setAccordionValue([hash]);
    }
  }, [
    currentTopic,
    typeof window !== "undefined" ? window.location.pathname : "",
    typeof window !== "undefined" ? window.location.hash : "",
  ]);

  if (!currentTopic) {
    // This case should ideally be handled by the server component's loading/error states
    // but as a fallback:
    return (
      <div className="p-4 text-center">
        Loading topic details or topic not found client-side... <br />
        Section: {sectionSlug}, Topic: {folderSlug}
      </div>
    );
  }

  // Active collection for breadcrumbs or other UI elements if needed
  const activeCollection = initialAllCollections.find(
    (col) => col.slug === sectionSlug,
  );

  return (
    <div className="px-10 sm:px-8">
      {/* Topic icon bar (Example - adapt from original if needed) */}
      {/* {initialAllTopics.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-3">
          {initialAllTopics.map((topic) => (
            <button
              key={topic.id}
              className={`flex flex-col items-center rounded-lg border px-3 py-2 transition-colors ${
                topic.id === currentTopic?.id
                  ? "border-[#0F7271] bg-[#e6f4f4]"
                  : "border-gray-200 bg-white hover:bg-gray-100"
              }`}
              onClick={() => router.push(`/support/knowledge-base/${sectionSlug}/${topic.slug || topic.id}`)}
            >
              {topic.icon_url && (
                <img
                  src={topic.icon_url}
                  alt={topic.title}
                  className="mb-1 h-8 w-8 object-contain"
                />
              )}
              <span className="whitespace-nowrap text-xs font-medium text-gray-800">
                {topic.title}
              </span>
            </button>
          ))}
        </div>
      )} */}

      <div id="topic-content">
        <Accordion
          type="multiple"
          className="w-full max-w-none"
          value={accordionValue}
          onValueChange={(value) => {
            setAccordionValue(value);
            if (value.length > 0) {
              const categoryId = value[value.length - 1]; // Get the latest opened item
              const category = currentTopic?.categories?.find(
                (cat) => cat.id === categoryId,
              );
              if (category) {
                const hashValue =
                  category.slug ||
                  category.title.toLowerCase().replace(/\s+/g, "-");
                // Update URL hash without full navigation if only accordion state changes
                // router.push(`${window.location.pathname}#${hashValue}`, { scroll: false }); // Next.js 13+ style
                window.location.hash = hashValue; // Simpler, might cause full scroll if not handled carefully
              }
            } else {
              // router.push(window.location.pathname, { scroll: false });
              window.history.replaceState(null, "", window.location.pathname); // Remove hash
            }
          }}
        >
          {currentTopic.categories?.map((category, idx) => {
            const categoryHtmlId =
              category.slug ||
              category.title.toLowerCase().replace(/\s+/g, "-");
            return (
              <AccordionItem
                value={category.id} // Use category.id for value, as it's unique and used in onValueChange
                key={category.id}
                id={categoryHtmlId} // Use slug or title for the HTML id attribute for scrolling
                className={`scroll-mt-24 border-b border-gray-200 ${idx === currentTopic.categories.length - 1 ? "border-b-0" : ""}`}
              >
                <AccordionTrigger className="text-lg font-semibold">
                  {category.title}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-2">
                    {category.questions && category.questions.length > 0 ? (
                      category.questions.map((question) => (
                        <Button
                          key={question.id}
                          variant="link"
                          className="justify-start text-left text-base text-[#005b6c] hover:text-[#174047] hover:underline"
                          onClick={() =>
                            router.push(
                              `/support/knowledge-base/${sectionSlug}/${folderSlug}/${categoryHtmlId}/${question.slug || question.title.toLowerCase().replace(/\s+/g, "-")}`,
                            )
                          }
                        >
                          {question.title}
                        </Button>
                      ))
                    ) : (
                      <div className="text-gray-500">
                        No questions available.
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
}
