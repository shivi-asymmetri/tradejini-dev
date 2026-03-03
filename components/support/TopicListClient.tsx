"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Loading } from "@/components/ui/loading";

// Define types based on usage, should match what SectionPage provides
type Topic = {
  id: string;
  title: string;
  slug?: string;
};

type Collection = {
  id: string;
  slug: string;
  title: string;
  topics: Topic[];
};

interface TopicListClientProps {
  collection: Collection | null; // Initial collection data from server
  sectionSlug: string;
}

export default function TopicListClient({
  collection: initialCollection,
  sectionSlug,
}: TopicListClientProps) {
  const [collection, setCollection] = useState<Collection | null>(
    initialCollection,
  );
  const [loading, setLoading] = useState(!initialCollection); // Only true if initialCollection is null
  const router = useRouter();

  // Handle hash-based navigation for scrolling if collection is present
  useEffect(() => {
    if (collection) {
      // No loading state check, rely on collection presence
      if (window.location.hash === "#content") {
        const contentSection =
          window.document.getElementById("section-content");

        if (contentSection) {
          const yOffset = -250; // As per original code
          const y =
            contentSection.getBoundingClientRect().top +
            window.pageYOffset +
            yOffset;
          window.scrollTo({ top: y, behavior: "instant" });
          history.replaceState(null, "", window.location.pathname);
        }
      }
    }
  }, [collection]); // Rerun if collection changes (e.g. client-side update, though not implemented here)

  const handleTopicClick = (
    e: React.MouseEvent,
    topicSlug: string,
    topicId: string,
  ) => {
    e.preventDefault();
    const targetUrl = `/support/knowledge-base/${sectionSlug}/${topicSlug || topicId}#content`;
    router.push(targetUrl);
  };

  // This useEffect is for refetching if sectionSlug changes client-side, or if initial fetch failed.
  // For pure SSR with initial data, this might be simplified or removed if no client-side refetch is needed.
  useEffect(() => {
    if (!initialCollection && sectionSlug) {
      // Only fetch if no initial data was provided
      async function fetchData() {
        setLoading(true);
        try {
          const response = await fetch(
            `/api/knowledge-base?section=${sectionSlug}`,
          );
          if (!response.ok) {
            throw new Error("Failed to fetch section data client-side");
          }
          const data = await response.json();
          if (data && data.length > 0) {
            setCollection(data[0]);
          } else {
            setCollection(null); // No data found
          }
        } catch (error) {
          console.error(error);
          setCollection(null); // Error state
        } finally {
          setLoading(false);
        }
      }
      fetchData();
    }
  }, [sectionSlug, initialCollection]); // Depend on sectionSlug and initialCollection

  if (loading) {
    return <Loading fullPage={true} />;
  }

  return (
    <div className="p-3 sm:p-4">
      {collection ? (
        <div className="space-y-4 sm:space-y-6">
          <h1 className="border-b-2 text-lg font-semibold capitalize sm:text-xl">
            {collection.title}
          </h1>
          <div id="section-content" className="flex flex-col gap-2 sm:gap-3">
            {collection.topics?.map((topic) => (
              <Button
                key={topic.id}
                className="w-full justify-start py-2 text-left text-sm font-semibold text-[#005b6c] sm:py-2.5 sm:text-base"
                variant="link"
                onClick={(e) => handleTopicClick(e, topic.slug || "", topic.id)}
              >
                {topic.title}
              </Button>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-sm sm:text-base">
          No data found for this section.
        </div>
      )}
    </div>
  );
}
