"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { debounce } from "lodash";
import { Hit } from "@/components/Hit";
import { Search as SearchIcon, X, Loader2 } from "lucide-react";
import Link from "next/link";

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

function SearchComponent() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [showHits, setShowHits] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedArticle, setSelectedArticle] = useState<string[]>([]);
  const [mobileSearchActive, setMobileSearchActive] = useState(false);

  const debouncedSearch = useMemo(
    () =>
      debounce(async (searchQuery: string) => {
        if (!searchQuery.trim()) {
          setResults([]);
          setIsLoading(false);
          return;
        }
        try {
          const response = await fetch(
            `/api/knowledge-search?query=${encodeURIComponent(searchQuery)}`,
            {
              signal: AbortSignal.timeout(10000),
            },
          );

          if (!response.ok) {
            throw new Error(`Search failed with status: ${response.status}`);
          }

          const data = await response.json();
          const hits = Array.isArray(data.hits) ? data.hits : [];
          setResults(hits);
          setError(null);
        } catch (error) {
          setResults([]);
          setError(
            error instanceof Error
              ? `Search failed: ${error.message}`
              : "Failed to search. Please try again.",
          );
        } finally {
          setIsLoading(false);
        }
      }, 500),
    [],
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setQuery(value);
    if (value.trim()) {
      setShowHits(true);
      setIsLoading(true);
      debouncedSearch(value);
    } else {
      setResults([]);
      setIsLoading(false);
      setSelectedArticle([]);
    }
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
    setShowHits(true);
    if (window.innerWidth < 640) setMobileSearchActive(true);
  };

  const closeMobileSearch = () => {
    setShowHits(false);
    setIsInputFocused(false);
    setMobileSearchActive(false);
    // Blur the input to close mobile keyboard
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  // Handle mobile back button and escape key
  useEffect(() => {
    if (!mobileSearchActive) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMobileSearch();
      }
    };

    const handlePopState = (event: PopStateEvent) => {
      event.preventDefault();
      closeMobileSearch();
      // Push current state back to prevent actual navigation
      window.history.pushState(null, "", window.location.href);
    };

    // Add a history entry when mobile search opens
    window.history.pushState(null, "", window.location.href);

    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("popstate", handlePopState);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [mobileSearchActive]);

  // Handle clicks outside search area
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as HTMLElement;

      // For mobile, keep existing behavior
      if (mobileSearchActive) {
        if (target.closest("a") && target.closest("a")?.href) {
          closeMobileSearch();
        }
        return;
      }

      // For desktop: close search box when clicking outside
      if (
        isInputFocused &&
        searchContainerRef.current &&
        !searchContainerRef.current.contains(target)
      ) {
        setShowHits(false);
        setIsInputFocused(false);
      }
    };

    // Use capture phase to ensure we catch the event before other handlers
    document.addEventListener("mousedown", handleClickOutside, true);
    document.addEventListener("touchstart", handleClickOutside, true);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside, true);
      document.removeEventListener("touchstart", handleClickOutside, true);
    };
  }, [mobileSearchActive, isInputFocused]);

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setIsLoading(false);
    setShowHits(false);
    setIsInputFocused(false);
    setMobileSearchActive(false);
    setSelectedArticle([]);
    // Blur the input to close mobile keyboard
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  // Extract unique article titles from results
  const uniqueArticles = Array.from(
    new Map(
      results
        .filter((hit) => hit.article && hit.article.title)
        .map((hit) => [hit.article.title, hit.article]),
    ).values(),
  );

  // Prevent background scroll when mobile search is active
  useEffect(() => {
    if (mobileSearchActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileSearchActive]);

  return (
    <>
      <style jsx>{`
        .desktop-filter-scroll {
          /* Hide scrollbar on mobile */
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        
        .desktop-filter-scroll::-webkit-scrollbar {
          display: none;
        }
        
        /* Show scrollbar on desktop */
        @media (min-width: 640px) {
          .desktop-filter-scroll {
            scrollbar-width: thin;
            scrollbar-color: #CBD5E0 #F7FAFC;
          }
          
          .desktop-filter-scroll::-webkit-scrollbar {
            display: block;
            height: 6px;
          }
          
          .desktop-filter-scroll::-webkit-scrollbar-track {
            background: #F7FAFC;
            border-radius: 3px;
          }
          
          .desktop-filter-scroll::-webkit-scrollbar-thumb {
            background: #CBD5E0;
            border-radius: 3px;
          }
          
          .desktop-filter-scroll::-webkit-scrollbar-thumb:hover {
            background: #A0AEC0;
          }
        }
      `}</style>
      {/* Mobile overlay for search */}
      {mobileSearchActive && (
        <div
          className="mobile-search-overlay fixed inset-0 z-[9999] bg-white sm:hidden"
          onClick={(e) => {
            const target = e.target as HTMLElement;
            // Close if clicking on the overlay background or empty areas
            if (
              e.target === e.currentTarget ||
              target.closest(".mobile-search-content") === null
            ) {
              closeMobileSearch();
            }
          }}
        >
          {/* Close button */}
          <button
            onClick={closeMobileSearch}
            className="absolute right-4 top-4 z-10 rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-200"
            aria-label="Close search"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Search content container */}
          <div className="mobile-search-content h-full w-full p-14 px-3">
            {/* Search bar */}
            <div
              className="flex w-full items-center rounded-[5px] border-b border-gray-200 px-4 py-3"
              style={{ background: "#EFEFEFB2" }}
            >
              <SearchIcon className="mr-3 h-5 w-5 text-gray-400" />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={handleChange}
                onFocus={handleInputFocus}
                placeholder='Eg: "Open a new account"'
                className="flex-grow bg-transparent px-2 text-base text-gray-700 placeholder-gray-500 outline-none"
                autoFocus
              />
              {(query || isInputFocused) && (
                <button
                  className="ml-2 text-gray-400 hover:text-gray-600"
                  onClick={clearSearch}
                  aria-label="Clear search"
                >
                  <X className="h-6 w-6" />
                </button>
              )}
            </div>

            {/* Results dropdown */}
            <div
              className="w-full"
              style={{
                height: query.trim() ? "calc(100dvh - 56px)" : undefined,
                overflowY: "auto",
                paddingBottom: "80px",
                pointerEvents: "auto",
              }}
            >
              {query.trim() ? (
                <>
                  {query.trim() && uniqueArticles.length > 0 && (
                    <div
                      className="hide-scrollbar mt-2 flex w-full space-x-3 overflow-x-auto border-b border-gray-200 bg-[#F6F8F7] px-4 py-2 sm:mt-0 sm:py-4"
                      style={{ WebkitOverflowScrolling: "touch" }}
                    >
                      <button
                        className={`whitespace-nowrap rounded border px-4 py-2 text-sm font-medium transition-colors duration-150 ${
                          selectedArticle.length === 0
                            ? "border-[#128789] bg-[#128789] text-[#FFFFFF]"
                            : "border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
                        }`}
                        onClick={() => setSelectedArticle([])}
                      >
                        All
                      </button>
                      {uniqueArticles.map((article) => (
                        <button
                          key={article.id}
                          className={`whitespace-nowrap rounded border px-4 py-2 text-sm font-medium transition-colors duration-150 ${
                            selectedArticle.includes(article.title)
                              ? "border-[#128789] bg-[#128789] text-[#FFFFFF]"
                              : "border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
                          }`}
                          onClick={() => {
                            setSelectedArticle((prev) =>
                              prev.includes(article.title)
                                ? prev.filter(
                                    (title) => title !== article.title,
                                  )
                                : [...prev, article.title],
                            );
                          }}
                        >
                          {article.title}
                        </button>
                      ))}
                    </div>
                  )}
                  {isLoading && (
                    <div className="flex items-center justify-center p-8">
                      <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
                      <span className="ml-2 text-sm text-gray-500">
                        Loading...
                      </span>
                    </div>
                  )}
                  {error && (
                    <div className="p-4 text-red-500">Error: {error}</div>
                  )}
                  {!isLoading && !error && results.length > 0 && (
                    <div className="hits-container px-0 py-1">
                      <ol className="hits-list divide-y divide-gray-200 bg-white">
                        {results
                          .filter((hit) =>
                            selectedArticle.length === 0
                              ? true
                              : hit.article &&
                                selectedArticle.includes(hit.article.title),
                          )
                          .map((hit) => (
                            <li
                              key={hit.objectID}
                              className="hit-item bg-white py-2"
                            >
                              <Hit
                                hit={hit}
                                onResultClick={closeMobileSearch}
                              />
                            </li>
                          ))}
                      </ol>
                    </div>
                  )}
                  {!isLoading &&
                    !error &&
                    results.length === 0 &&
                    query.trim() && (
                      <div className="p-4 text-center text-sm text-gray-500">
                        No results found for &quot;{query}&quot;.
                      </div>
                    )}
                </>
              ) : (
                <div className="p-4 text-center text-sm text-gray-500">
                  Start typing to search...
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main content, hidden on mobile when search is active */}
      <div
        className={`bg-gradient-to-r from-[#228698] to-[#0B2C32] pb-9 pt-8 text-white sm:pb-12 sm:pt-12 ${
          mobileSearchActive ? "hidden sm:block" : ""
        }`}
      >
        <div className="container mx-auto flex flex-col items-center px-4 text-center">
          {/* Mobile heading */}
          <h1
            className="mx-auto mb-2 max-w-full px-2 text-center text-[24px] font-[500] leading-[32px] sm:hidden"
            style={{
              fontFamily: "Poppins, sans-serif",
              letterSpacing: "0%",
            }}
          >
            How Can We Help You?
          </h1>
          {/* Desktop heading */}
          <h1
            className="mx-auto hidden max-w-[327px] text-center text-[28px] font-[500] leading-[32px] sm:mb-2 sm:block sm:max-w-[790px] sm:text-[44px] sm:leading-[72px]"
            style={{
              fontFamily: "Poppins, sans-serif",
              letterSpacing: "0%",
            }}
          >
            How Can We Help Today?
          </h1>
          {/* Mobile message */}
          <p
            className="mx-auto mb-4 max-w-full px-1 text-center text-[16px] font-[500] leading-[22px] sm:hidden"
            style={{
              fontFamily: "Inter, sans-serif",
              letterSpacing: "1%",
              color: "#FCFCFCB2",
            }}
          >
            Search for answers or explore topics below
          </p>
          {/* Desktop message */}
          <p
            className="mx-auto mb-4 hidden max-w-[327px] text-center text-[16px] font-[500] leading-[22px] sm:mb-10 sm:block sm:max-w-[717px] sm:text-[21px] sm:leading-[22px]"
            style={{
              fontFamily: "Inter, sans-serif",
              letterSpacing: "1%",
              color: "#FCFCFCB2",
            }}
          >
            Search our knowledge base or explore help topics by category.
          </p>

          <div
            ref={searchContainerRef}
            className="relative mx-auto mt-2 w-full max-w-[962px] sm:mt-2"
          >
            {/* Mobile search bar: always show icon on left */}
            <div className="relative flex h-[44px] items-center rounded-[5px] border border-gray-300 bg-white shadow-sm sm:h-[66px]">
              <div className="flex items-center pl-3 pr-2">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={handleChange}
                onFocus={handleInputFocus}
                placeholder='Eg: "Open a new account"'
                className="h-full flex-grow bg-transparent py-2 pl-1 text-base text-gray-700 placeholder-gray-500 outline-none focus:ring-0 sm:text-sm"
              />
              {(query || isInputFocused) && (
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-gray-400 hover:text-gray-600"
                  onClick={clearSearch}
                  aria-label="Clear search"
                >
                  <X className="h-6 w-6" />
                </button>
              )}
            </div>
            {/* Unified box for article filter bar and search results */}
            {isInputFocused && showHits && !mobileSearchActive && (
              <div className="absolute z-20 mt-1 w-full rounded-md border border-gray-200 bg-white p-0 text-left shadow-xl">
                {/* Only show filter bar and results if there is a query */}
                {query.trim() ? (
                  <>
                    {/* Article filter bar */}
                    {query.trim() && uniqueArticles.length > 0 && (
                      <div
                        className="desktop-filter-scroll mt-2 flex w-full space-x-3 overflow-x-auto border-b border-gray-200 bg-[#F6F8F7] px-4 py-2 sm:mt-0 sm:py-4"
                        style={{ 
                          WebkitOverflowScrolling: "touch",
                          scrollbarWidth: "thin",
                          scrollbarColor: "#CBD5E0 #F7FAFC"
                        }}
                      >
                        <button
                          className={`whitespace-nowrap rounded border px-4 py-2 text-sm font-medium transition-colors duration-150 ${
                            selectedArticle.length === 0
                              ? "border-[#128789] bg-[#128789] text-[#FFFFFF]"
                              : "border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
                          }`}
                          onClick={() => setSelectedArticle([])}
                        >
                          All
                        </button>
                        {uniqueArticles.map((article) => (
                          <button
                            key={article.id}
                            className={`whitespace-nowrap rounded border px-4 py-2 text-sm font-medium transition-colors duration-150 ${
                              selectedArticle.includes(article.title)
                                ? "border-[#128789] bg-[#128789] text-[#FFFFFF]"
                                : "border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
                            }`}
                            onClick={() => {
                              setSelectedArticle((prev) =>
                                prev.includes(article.title)
                                  ? prev.filter(
                                      (title) => title !== article.title,
                                    )
                                  : [...prev, article.title],
                              );
                            }}
                          >
                            {article.title}
                          </button>
                        ))}
                      </div>
                    )}
                    {/* Search results */}
                    {isLoading && (
                      <div className="flex items-center justify-center p-8">
                        <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
                        <span className="ml-2 text-sm text-gray-500">
                          Loading...
                        </span>
                      </div>
                    )}
                    {error && (
                      <div className="p-4 text-red-500">Error: {error}</div>
                    )}
                    {!isLoading && !error && results.length > 0 && (
                      <div className="hits-container max-h-80 overflow-y-auto bg-white px-0 py-1">
                        <ol className="hits-list divide-y divide-gray-200 bg-white">
                          {results
                            .filter((hit) =>
                              selectedArticle.length === 0
                                ? true
                                : hit.article &&
                                  selectedArticle.includes(hit.article.title),
                            )
                            .map((hit) => (
                              <li
                                key={hit.objectID}
                                className="hit-item bg-white py-2"
                              >
                                <Hit
                                  hit={hit}
                                  onResultClick={() => {
                                    setShowHits(false);
                                    setIsInputFocused(false);
                                  }}
                                />
                              </li>
                            ))}
                        </ol>
                      </div>
                    )}
                    {!isLoading &&
                      !error &&
                      results.length === 0 &&
                      query.trim() && (
                        <div className="p-4 text-center text-sm text-gray-500">
                          No results found for &quot;{query}&quot;.
                        </div>
                      )}
                  </>
                ) : (
                  // Show only this when query is empty
                  <div className="p-4 text-center text-sm text-gray-500">
                    Start typing to search...
                  </div>
                )}
              </div>
            )}
          </div>
          {/* --- Quick Links Section (UPDATED for Next.js Link) --- */}
          <div className="w-full sm:mx-auto sm:max-w-[962px]">
            <div className="mt-6 flex flex-col items-start justify-start sm:mt-8 sm:flex-row sm:items-center sm:justify-start">
              <span className="mb-2 whitespace-nowrap text-[16px] font-medium text-[#FCFCFCB2] sm:mb-0 sm:mr-4 sm:text-white">
                Quick Links:
              </span>
              <div
                className="hide-scrollbar flex w-full flex-row gap-2 overflow-x-auto sm:flex-wrap sm:justify-start sm:overflow-x-visible"
                style={{ WebkitOverflowScrolling: "touch" }}
              >
                <Link
                  href="https://userguide-cp.tradejini.com/index.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whitespace-nowrap rounded bg-[#D6D6D62B] px-4 py-2 text-sm font-medium text-white transition-colors duration-150 hover:bg-[#D6D6D64D]"
                >
                  CubePlus User Guide
                </Link>
                <Link
                  href="https://userguide-cp.tradejini.com/mutualfunds.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whitespace-nowrap rounded bg-[#D6D6D62B] px-4 py-2 text-sm font-medium text-white transition-colors duration-150 hover:bg-[#D6D6D64D]"
                >
                  Mutual Funds User Guide
                </Link>
                <Link
                  href="https://www.tradejini.com/non-cash-stocks"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whitespace-nowrap rounded bg-[#D6D6D62B] px-4 py-2 text-sm font-medium text-white transition-colors duration-150 hover:bg-[#D6D6D64D]"
                >
                  Intraday Margin List
                </Link>
                <Link
                  href="https://userguide-bo.tradejini.com/home.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whitespace-nowrap rounded bg-[#D6D6D62B] px-4 py-2 text-sm font-medium text-white transition-colors duration-150 hover:bg-[#D6D6D64D]"
                >
                  Backoffice User Guide
                </Link>
                <Link
                  href="https://cubeplus-demo.tradejini.com/app/dashboard"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whitespace-nowrap rounded bg-[#D6D6D62B] px-4 py-2 text-sm font-medium text-white transition-colors duration-150 hover:bg-[#D6D6D64D]"
                >
                  Demo Platform
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchComponent;
