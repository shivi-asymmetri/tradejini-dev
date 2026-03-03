"use client";

import { Search, X } from "lucide-react";
import { Input } from "./ui/input";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "./ui/button";
import Link from "next/link";
import useBlogs from "@/context/BlogContext";
import { TransformedBlogType } from "@/types/BlogType";

// Add these interfaces at the top of the file
interface Category {
  id: string;
  name: string;
  slug: string;
  count: number;
}

interface BlogContextData {
  regularBlogs: any[];
  categories: Category[];
  searchBlogs: (query: string) => Promise<TransformedBlogType[]>;
}

export default function BlogSearchbar() {
  const [expanded, setExpanded] = useState(false);
  const [popular, setPopular] = useState(false);
  const { categories = [], searchBlogs, regularBlogs = [] } = 
    (useBlogs() || {}) as BlogContextData;
  const [searchON, setSearchON] = useState(false);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<TransformedBlogType[]>([]);
  const [loading, setLoading] = useState(false);
  const [defaultResults, setDefaultResults] = useState<TransformedBlogType[]>([]);

  useEffect(() => {
    async function loadDefaultResults() {
      try {
        const results = await searchBlogs("");
        setDefaultResults(results?.slice(0, 5) || []);
      } catch (error) {
        console.error("Error loading default results:", error);
      }
    }

    loadDefaultResults();
  }, [searchBlogs]);

  const getDebounceTime = (query: string) => {
    if (!query) return 0;
    if (query.length < 3) return 100;
    return 300;
  };

  useEffect(() => {
    if (!query.trim()) {
      setSearchResults(defaultResults);
      setLoading(false);
      return;
    }

    const debounceTime = getDebounceTime(query);
    const delayDebounceFn = setTimeout(async () => {
      setLoading(true);
      try {
        if (query.length >= 2) {
          const results = await searchBlogs(query);
          setSearchResults(results || []);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.error("Search error:", error);
        setSearchResults(defaultResults);
      } finally {
        setLoading(false);
      }
    }, debounceTime);

    return () => clearTimeout(delayDebounceFn);
  }, [query, searchBlogs, defaultResults]);

  // Add minimum query length check
  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    if (newQuery.length < 2) {
      setSearchResults(defaultResults);
    }
  };

  // Clear search and reset to default results
  const clearSearch = () => {
    setQuery("");
    setSearchResults(defaultResults);
  };

  return (
    <div className="w-full dark:bg-black">
      <div className="relative">
        <Search
          className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500"
          size={20}
        />
        <Input
          onFocus={() => {
            setExpanded(true);
          }}
          className={`transition-all duration-150 ${expanded ? "w-32" : "w-32"} rounded-2xl bg-zinc-100 dark:bg-zinc-800 max-lg:w-full`}
          placeholder="Explore"
        />
      </div>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{
              x: "100%",
            }}
            animate={{
              x: 0,
            }}
            exit={{
              x: "100%",
            }}
            transition={{
              bounce: false,
            }}
            className="fixed right-0 top-0 z-[999999999] h-screen w-1/4 space-y-8 overflow-y-scroll bg-white p-6 shadow-xl dark:bg-zinc-900 dark:text-white max-lg:w-screen"
          >
            <div className="flex w-full justify-end">
              <Button
                variant={"destructive"}
                onClick={() => {
                  setExpanded(false);
                }}
              >
                <X />
              </Button>
            </div>
            <div>
              <Input
                onFocus={() => {
                  setSearchON(true);
                }}
                value={query}
                onChange={handleQueryChange}
                className="w-full rounded-2xl bg-zinc-100 p-4 px-8 dark:bg-zinc-800"
                placeholder="Search Blogs & Topics (min. 2 characters)"
              />
              {query && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-20 top-16"
                  onClick={clearSearch}
                >
                  <X size={16} />
                </Button>
              )}
            </div>
            {searchON ? (
              <div className="flex flex-col space-y-6">
                <div className="flex flex-col justify-between">
                  <div>
                    {query ? `Results for "${query}"` : "Recent blogs"}
                    {loading && " (Loading...)"}
                  </div>
                  <div className="flex flex-col space-y-3">
                    {searchResults.length > 0 ? (
                      searchResults.map((blog, ix) => (
                        <Link
                          key={blog.id + ix}
                          href={"/blogs/" + blog?.metadata.permalink}
                          onClick={() => {
                            setExpanded(false);
                          }}
                          className="w-full rounded-md p-1 px-6 hover:bg-gray-100 dark:hover:bg-zinc-800"
                        >
                          <Button
                            variant={"link"}
                            className="text-wrap text-start"
                          >
                            {blog.content.title}
                          </Button>
                        </Link>
                      ))
                    ) : (
                      <div className="text-center text-gray-500">
                        {loading ? "Searching..." : "No results found"}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                {popular ? (
                  <div className="flex flex-col space-y-6">
                    <div className="flex items-center justify-between">
                      <p>Popular Searches</p>
                      <Button
                        onClick={() => {
                          setTimeout(() => {
                            setPopular(false);
                            setSearchON(false);
                          }, 0);
                        }}
                      >
                        <X />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-6">
                    {categories.map((category) => (
                      <Link
                        onClick={() => {
                          setExpanded(false);
                        }}
                        href={`/blogs/category/${category.slug}`}
                        className="text-xl italic underline"
                        key={category.id}
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
