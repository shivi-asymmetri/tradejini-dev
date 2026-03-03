"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { slugify } from "@/utils/helpers";

interface SearchResultHandlerProps {
  searchResult?: any;
  onNavigationComplete?: () => void;
}

function createSlug(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/&/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/\-+$/g, "");
}

export const SearchResultHandler = ({
  searchResult,
  onNavigationComplete,
}: SearchResultHandlerProps) => {
  const router = useRouter();

  useEffect(() => {
    if (!searchResult) return;

    if (
      searchResult.category?.id &&
      searchResult.topic?.id &&
      searchResult.article?.slug
    ) {
      const section = searchResult.article.slug;

      const folder =
        searchResult.topic.slug ||
        (searchResult.topic.title
          ? createSlug(searchResult.topic.title)
          : searchResult.topic.id);

      const document =
        searchResult.category.slug ||
        (searchResult.category.title
          ? createSlug(searchResult.category.title)
          : searchResult.category.id);

      const questionId =
        searchResult.slug ||
        (searchResult.question
          ? createSlug(searchResult.question)
          : searchResult.id);

      const fullPath = `/support/knowledge-base/${section}/${folder}/${document}/${questionId}`;

      router.push(fullPath);
      if (onNavigationComplete) onNavigationComplete();
    } else if (searchResult.article?.slug) {
      router.push(`/support/knowledge-base/${searchResult.article.slug}`);
      if (onNavigationComplete) onNavigationComplete();
    } else if (searchResult.pathname) {
      router.push(`/support/knowledge-base/${searchResult.pathname}`);
      if (onNavigationComplete) onNavigationComplete();
    }
  }, [searchResult, router, onNavigationComplete]);

  return null;
};

/**
 * Utility function to navigate to a search result
 */
export const navigateToSearchResult = (router: any, hit: any) => {
  if (!hit) return;

  if (hit.category?.id && hit.topic?.id && hit.article?.slug) {
    const section = hit.article.slug;

    // Use slugs for topic and category if available, otherwise create from title
    const folder =
      hit.topic.slug ||
      (hit.topic.title ? createSlug(hit.topic.title) : hit.topic.id);

    const document =
      hit.category.slug ||
      (hit.category.title ? createSlug(hit.category.title) : hit.category.id);

    const questionId =
      hit.slug || (hit.question ? createSlug(hit.question) : hit.id);

    const fullPath = `/support/knowledge-base/${section}/${folder}/${document}/${questionId}`;

    router.push(fullPath);
    return true;
  } else if (hit.article?.slug) {
    router.push(`/support/knowledge-base/${hit.article.slug}`);
    return true;
  } else if (hit.pathname) {
    router.push(`/support/knowledge-base/${hit.pathname}`);
    return true;
  }

  return false;
};
