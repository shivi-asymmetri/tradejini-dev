"use client";

import { useRouter } from "next/navigation";
import { slugify } from "@/utils/helpers";
import { Clock } from "lucide-react";

const CustomHighlight = ({ value }: { value: string }) => {
  return <span dangerouslySetInnerHTML={{ __html: value }} />;
};

interface HitProps {
  hit: any;
  onResultClick?: () => void;
}

export const Hit = ({ hit, onResultClick }: HitProps) => {
  const router = useRouter();

  function createSlug(text: string): string {
    return slugify(text);
  }

  const handleClick = () => {
    if (onResultClick) {
      onResultClick();
    }

    let targetPath = "";

    if (hit?.category?.id && hit?.topic?.id && hit?.article?.slug) {
      const section = hit.article.slug;

      const folder =
        hit.topic.slug ||
        (hit.topic.title ? createSlug(hit.topic.title) : hit.topic.id);

      const document =
        hit.category.slug ||
        (hit.category.title ? createSlug(hit.category.title) : hit.category.id);

      const questionId =
        hit.slug || (hit.question ? createSlug(hit.question) : hit.id);

      targetPath = `/support/knowledge-base/${section}/${folder}/${document}/${questionId}`;
    } else if (hit?.article?.slug) {
      targetPath = `/support/knowledge-base/${hit.article.slug}`;
    } else if (hit?.pathname) {
      targetPath = `/support/knowledge-base/${hit.pathname}`;
    } else {
      console.error("Insufficient data to navigate:", hit);
      return;
    }

    router.push(targetPath);

    const scrollToContent = () => {
      const resultSection = document.getElementById("search-results-section");

      if (resultSection) {
        const rect = resultSection.getBoundingClientRect();
        const startPosition = window.scrollY;

        const targetPosition = startPosition + rect.top - 250;
        const distance = targetPosition - startPosition;

        let start: number | null = null;
        const duration = 800;

        const step = (timestamp: number) => {
          if (!start) start = timestamp;
          const progress = timestamp - start;
          const percent = Math.min(progress / duration, 1);

          const easeInOutCubic =
            percent < 0.5
              ? 4 * percent * percent * percent
              : 1 - Math.pow(-2 * percent + 2, 3) / 2;

          window.scrollTo({
            top: startPosition + distance * easeInOutCubic,
            behavior: "auto",
          });

          if (progress < duration) {
            window.requestAnimationFrame(step);
          }
        };

        window.requestAnimationFrame(step);
      } else {
        const startPosition = window.scrollY;
        const targetPosition = window.innerHeight * 0.1;
        const distance = targetPosition - startPosition;

        let start: number | null = null;
        const duration = 800;

        const step = (timestamp: number) => {
          if (!start) start = timestamp;
          const progress = timestamp - start;
          const percent = Math.min(progress / duration, 1);

          const easeInOutCubic =
            percent < 0.5
              ? 4 * percent * percent * percent
              : 1 - Math.pow(-2 * percent + 2, 3) / 2;

          window.scrollTo({
            top: startPosition + distance * easeInOutCubic,
            behavior: "auto",
          });

          if (progress < duration) {
            window.requestAnimationFrame(step);
          }
        };

        window.requestAnimationFrame(step);
      }
    };

    setTimeout(() => {
      let scrollCheckCount = 0;
      const maxRetries = 10;
      const initialRetryDelay = 500;

      const checkContentAndScroll = () => {
        const resultSection = document.getElementById("search-results-section");
        if (resultSection && resultSection.offsetHeight > 20) {
          setTimeout(scrollToContent, 100);
        } else {
          if (scrollCheckCount < maxRetries) {
            scrollCheckCount++;
            const delay =
              initialRetryDelay * Math.min(2, 1 + scrollCheckCount / 3);
            setTimeout(checkContentAndScroll, delay);
          }
        }
      };

      checkContentAndScroll();
    }, 1500);
  };

  return (
    <button
      onClick={handleClick}
      className="flex w-full cursor-pointer items-start space-x-3 bg-white p-4 text-left hover:bg-gray-50"
    >
      <Clock className="mt-1 h-5 w-5 flex-shrink-0 text-gray-400" />
      <div className="flex flex-grow flex-col space-y-2">
        <div
          className="hit-question"
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 500,
            fontSize: "18px",
            lineHeight: "140%",
            letterSpacing: "0%",
            color: "#000000E8",
          }}
        >
          {hit._highlightResult && hit._highlightResult.question ? (
            <CustomHighlight value={hit._highlightResult.question.value} />
          ) : (
            hit.question || hit.title
          )}
        </div>
        {(hit.topic || hit.article) && (
          <div
            style={{
              fontFamily: "Arial, sans-serif",
              fontWeight: 400,
              fontSize: "16px",
              lineHeight: "100%",
              letterSpacing: "1%",
              color: "#4F5665",
            }}
            className="mt-2 flex gap-2"
          >
            {hit.topic && <span>{hit.topic.title}</span>}
            {hit.topic && hit.article && <span>•</span>}
            {hit.article && <span>{hit.article.title}</span>}
          </div>
        )}
      </div>
    </button>
  );
};
