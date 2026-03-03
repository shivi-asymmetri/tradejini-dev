"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

interface Collection {
  id: string;
  slug: string;
  title: string;
  icon_url?: string;
}

interface CategoryInTopic {
  id: string;
  slug?: string;
  title: string; 
}

interface TopicInCollection {
  id: string;
  slug?: string;
  title: string; 
  categories?: CategoryInTopic[];
}

interface CollectionWithTopicsAndCategories extends Collection {
  topics?: TopicInCollection[];
}

interface CategorySelectorProps {
  collections: Collection[];
}

export default function CategorySelector({
  collections,
}: CategorySelectorProps) {
  const params = useParams();
  const router = useRouter();
  const section = params?.section;
  const [isLoading, setIsLoading] = useState(false);

  const handleCollectionClick = async (collection: Collection) => {
    setIsLoading(true);
    const startTime = Date.now();
    const minLoadingTime = 2000; 
    
    try {
      const response = await fetch(
        `/api/knowledge-base?section=${collection.slug}&sortBy=title&sortOrder=asc`,
      );
      if (!response.ok) { 
        router.push(`/support/knowledge-base/${collection.slug}`);
        // Ensure minimum loading time
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, minLoadingTime - elapsedTime);
        setTimeout(() => setIsLoading(false), remainingTime);
        return;
      }
      const data: CollectionWithTopicsAndCategories[] = await response.json();

      if (
        data &&
        data.length > 0 &&
        data[0].topics &&
        data[0].topics.length > 0
      ) {
        const firstTopic = data[0].topics[0];
        const topicIdentifier = firstTopic.slug || firstTopic.id;

        if (firstTopic.categories && firstTopic.categories.length > 0) {
          const firstCategory = firstTopic.categories[0];
          const categoryIdentifier =
            firstCategory.slug ||
            firstCategory.title.toLowerCase().replace(/\s+/g, "-");
          router.push(
            `/support/knowledge-base/${collection.slug}/${topicIdentifier}/${categoryIdentifier}`,
          );
        }
      }
      
      // Ensure minimum loading time before hiding overlay
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadingTime - elapsedTime);
      setTimeout(() => setIsLoading(false), remainingTime);
      
    } catch (e) {
      console.error("Error fetching topics or navigating:", e);
      // Ensure minimum loading time even on error
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadingTime - elapsedTime);
      setTimeout(() => setIsLoading(false), remainingTime);
    }
  };

  return (
    <>
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-80 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-[#128789]"></div>
            <p className="text-sm font-medium text-gray-600">Loading...</p>
          </div>
        </div>
      )}
      
      <div className="mb-8 flex flex-wrap justify-center gap-5">
        {collections.map((col) => (
          <button
            key={col.id}
            onClick={() => handleCollectionClick(col)}
            disabled={isLoading}
            className={`flex items-center gap-2 rounded-[12px] border px-4 py-2 align-middle font-['Inter'] text-[16px] font-[450] leading-[100%] tracking-[0%] transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${col.slug === section ? "border-[#128789] bg-[#128789] text-white" : "border-gray-200 bg-white font-semibold text-[#222] hover:bg-gray-100"}`}
            style={{ textDecoration: "none" }}
          >
            {col.icon_url && (
              <img
                src={col.icon_url}
                alt={col.title}
                className="h-6 w-6 object-contain"
                style={{
                  marginRight: 6,
                  filter:
                    col.slug === section ? "brightness(0) invert(1)" : "none",
                }}
              />
            )}
            <span className="capitalize">{col.title}</span>
          </button>
        ))}
      </div>
    </>
  );
}
