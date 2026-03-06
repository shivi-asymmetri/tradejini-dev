"use client";

import { BlogType, TransformedBlogType } from "@/types/BlogType";
import { createContext, useContext, useEffect, useState } from "react";
import {
  transformBlogsForDisplay,
  transformBlogForDisplay,
} from "@/utils/blogUtils";

interface Category {
  id: string;
  name: string;
  slug: string;
  count: number;
  image_url: string | null;
}

interface BlogContextType {
  regularBlogs: BlogType[];
  categories: Category[];
  tags: any[];
  loading: boolean;
  error: string | null;
  searchBlogs: (
    query: string,
    signal?: AbortSignal,
  ) => Promise<TransformedBlogType[]>;
}

export const BlogContext = createContext<BlogContextType | null>(null);

export function BlogsProvider({ children }: { children: React.ReactNode }) {
  const [regularBlogs, setRegularBlogs] = useState<BlogType[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        console.log("Fetching data...");

        const blogsResponse = await fetch("/api/blogs");
        if (!blogsResponse.ok) {
          throw new Error("Failed to fetch blogs");
        }
        const blogsData = await blogsResponse.json();
        console.log("Blogs fetched:", blogsData.length);

        const originalBlogs = blogsData;

        setRegularBlogs(originalBlogs);

        const categoriesResponse = await fetch("/api/categories");
        if (!categoriesResponse.ok) {
          throw new Error("Failed to fetch categories");
        }
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);

        const tagsResponse = await fetch("/api/tags");
        if (!tagsResponse.ok) {
          throw new Error("Failed to fetch tags");
        }
        const tagsData = await tagsResponse.json();
        setTags(tagsData);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const searchBlogs = async (query: string, signal?: AbortSignal) => {
    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(query)}`,
        {
          signal,
        },
      );
      const data = await response.json();
      return data.results;
    } catch (error: unknown) {
      if (error instanceof Error && error.name === "AbortError") {
        return [];
      }
      throw error;
    }
  };

  const fetchTagData = async (tagName: string) => {
    try {
      const response = await fetch(`/api/tags/${encodeURIComponent(tagName)}`);
      if (!response.ok) {
        throw new Error("Failed to fetch tag data");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching tag data:", error);
      return null;
    }
  };

  return (
    <BlogContext.Provider
      value={{ regularBlogs, categories, tags, loading, error, searchBlogs }}
    >
      {children}
    </BlogContext.Provider>
  );
}

export default function useBlogs() {
  const context = useContext(BlogContext);
  if (!context) {
    console.warn("useBlogs must be used within a BlogProvider");
    return { regularBlogs: [], categories: [], loading: false };
  }
  return context;
}

