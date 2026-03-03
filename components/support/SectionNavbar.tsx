"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

interface Section {
  id: string;
  title: string;
  type: "section";
  order: number;
}

interface Collection {
  id: string;
  title: string;
  type?: "section";
  sectionId?: string;
  folderId?: string;
  order: number;
  questions?: any[];
}

export default function SectionNavbar() {
  const params = useParams();
  const [root, setRoot] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/knowledge-base");
        const data = await response.json();
        setRoot(data);
      } catch (error) {
        console.error("Error fetching knowledge base data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="px-6 py-4">Loading...</div>;
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 px-6 max-lg:hidden">
      {" "}
      {(root as unknown as Collection[])
        .filter(
          (section): section is Section =>
            "type" in section && section.type === "section",
        )
        .sort((a, b) => a.order - b.order)
        .map((section) => (
          <Link
            href={"/support/knowledge-base/" + section.id}
            key={section.id}
            className={`rounded-2xl p-3 py-3 text-xs duration-300 ${
              section.id === params?.section
                ? "border-2 bg-themeBlue text-white"
                : "border-2 border-zinc-200 bg-transparent bg-zinc-100 text-zinc-500"
            }`}
          >
            <div className="text-center">{section.title}</div>
          </Link>
        ))}
    </div>
  );
}
