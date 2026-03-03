"use client";

import { useState, useEffect, useRef } from "react";
import { Hit } from "@/components/Hit";
import { Loader2, Search as SearchIcon, X } from "lucide-react";
import { debounce } from "lodash";

interface SearchResult {
  objectID: string;
  id: string;
  slug?: string;
  question: string;
  answer: string;
  topic: {
    id: string;
    title: string;
    slug?: string;
  };
  category: {
    id: string;
    title: string;
    slug?: string;
  };
  article: {
    id: string;
    title: string;
    slug: string;
  };
  _highlightResult: {
    question: {
      value: string;
      matchLevel: string;
    };
  };
}

export const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [showHits, setShowHits] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Track input width to ensure dropdown matches exactly
  const [inputWidth, setInputWidth] = useState<number | null>(null);

  // Update input width on resize
  useEffect(() => {
    const updateWidth = () => {
      if (searchContainerRef.current) {
        setInputWidth(searchContainerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const debouncedSearch = debounce(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `/api/search?query=${encodeURIComponent(searchQuery)}`,
        {
          signal: AbortSignal.timeout(8000), // 8 second timeout
        },
      );
      if (!response.ok) {
        throw new Error("Search failed");
      }
      const data = await response.json();
      setResults(Array.isArray(data.hits) ? data.hits : []);
      setError(null);
    } catch (error) {
      setResults([]);
      setError("Failed to search. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, 300);

  useEffect(() => {
    if (query.trim()) {
      setIsLoading(true);
      debouncedSearch(query);
    } else {
      setResults([]);
    }
  }, [query]);

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    inputRef.current?.focus();
  };

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setShowHits(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={searchContainerRef} className="relative w-full md:w-auto">
      <div className="search-container group rounded-2xl border border-gray-200 bg-white p-1 shadow-sm transition-all duration-300 focus-within:border-blue-400 focus-within:shadow-md hover:shadow-md">
        <div className="relative flex items-center">
          <div className="flex items-center justify-center pl-3 text-gray-400">
            <SearchIcon className="h-5 w-5" />
          </div>
          <input
            ref={inputRef}
            type="search"
            className="w-full rounded-xl bg-transparent p-3 text-gray-700 placeholder-gray-400 outline-none max-md:w-full md:w-96"
            placeholder="Search for anything"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setShowHits(true)}
          />
          <div className="flex h-8 w-20 items-center justify-end pr-2">
            <div className="flex w-8 items-center justify-center">
              {isLoading && (
                <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
              )}
            </div>
            {query && (
              <button
                onClick={clearSearch}
                className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {showHits && (
        <div
          ref={resultsRef}
          className="animate-fadeIn absolute z-[999999] mt-2 rounded-lg border border-gray-200 bg-white shadow-lg"
          style={{
            width: inputWidth ? `${inputWidth}px` : undefined,
            minWidth: "100%",
          }}
        >
          {error ? (
            <div className="p-4 text-red-600">
              <div className="rounded-lg bg-red-50 p-3">{error}</div>
            </div>
          ) : results.length > 0 ? (
            <div className="hits-container">
              <div className="flex items-center justify-between border-b border-gray-100 p-3">
                <div className="text-sm font-medium text-gray-700">
                  Found {results.length} result{results.length > 1 ? "s" : ""}
                </div>
                {results.length > 5 && (
                  <div className="text-xs text-gray-500">
                    Scroll to see more
                  </div>
                )}
              </div>
              <div className="results-scroll-container">
                <ol className="hits-list m-0 list-none p-0">
                  {results.map((hit, index) => (
                    <li
                      key={`${hit.objectID}-${index}`}
                      className="hit-item border-b border-gray-100 last:border-none hover:bg-gray-50"
                    >
                      <Hit
                        hit={hit}
                        onResultClick={() => {
                          setShowHits(false);
                          clearSearch();
                        }}
                      />
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          ) : query && !isLoading ? (
            <div className="flex flex-col items-center justify-center p-6">
              <div className="text-center text-gray-400">
                <div className="mb-2 text-lg font-medium">No results found</div>
                <p className="text-sm">
                  Try different keywords or check for spelling mistakes
                </p>
              </div>
            </div>
          ) : (
            <div className="w-full p-6 text-center text-sm text-gray-500">
              Type to start searching...
            </div>
          )}
        </div>
      )}
      <style jsx>{`
        .results-scroll-container {
          max-height: 350px;
          overflow-y: auto;
          scrollbar-width: thin;
          scrollbar-color: #cbd5e0 #f7fafc;
        }
        .results-scroll-container::-webkit-scrollbar {
          width: 6px;
        }
        .results-scroll-container::-webkit-scrollbar-track {
          background: #f7fafc;
          border-radius: 10px;
        }
        .results-scroll-container::-webkit-scrollbar-thumb {
          background-color: #cbd5e0;
          border-radius: 10px;
          border: 2px solid transparent;
        }
        .results-scroll-container:hover::-webkit-scrollbar-thumb {
          background-color: #a0aec0;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};
