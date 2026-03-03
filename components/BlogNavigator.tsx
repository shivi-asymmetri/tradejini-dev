"use client";

import { IDfy } from "@/utils/convertID";
import { Search, ChevronDown, X, ArrowUpDown } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState, useRef, useCallback, useMemo, useLayoutEffect } from "react";
import DEBOUNCE from "@/utils/debounce";
import { Input } from "./ui/input";
import { BlogType } from "@/types/BlogType";
import useBlogs from "@/context/BlogContext";
import Link from "next/link";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import BlogArchive from "./BlogArchive";
interface Category {
  id: string;
  name: string;
  slug: string;
  count: number;
  image_url: string | null;
}

interface BlogContextData {
  regularBlogs: any[];
  categories: Category[];
  searchBlogs: (query: string) => void;
  loading: boolean;
}

interface BlogNavigatorProps {
  allBlogs: BlogType[];
  setBlogs: (blogs: BlogType[]) => void;
  setQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  setIsSearching: (isSearching: boolean) => void;
  currentCategory?: string;
  currentTag?: string;
  currentSort?: string;
  onSortChange?: (sortBy: string) => void;
}

// Constants for better maintainability
const BREAKPOINTS = {
  LARGE: 1400,
  MEDIUM_LARGE: 1200,
  MEDIUM: 1024,
  SMALL_MEDIUM: 768,
} as const;

const PADDING_CONFIG = {
  [BREAKPOINTS.LARGE]: 'px-[100px]',
  [BREAKPOINTS.MEDIUM_LARGE]: 'px-[60px]',
  [BREAKPOINTS.MEDIUM]: 'px-[40px]',
  [BREAKPOINTS.SMALL_MEDIUM]: 'px-[20px]',
  default: 'px-3',
} as const;

type PaddingClass = typeof PADDING_CONFIG[keyof typeof PADDING_CONFIG];

// Hard limit for mobile categories: always show at most 5 categories (plus search, All, and See all)
const MOBILE_CATEGORY_LIMIT = 4;
const DESKTOP_LOADING_SKELETON_COUNT = 4;

export default function BlogNavigator({
  allBlogs,
  setBlogs,
  setQuery,
  setSelectedCategory,
  setIsSearching,
  currentCategory,
  currentTag,
  currentSort = 'relevance',
  onSortChange,
}: BlogNavigatorProps) {
  const { categories, loading } = (useBlogs() || {
    categories: [],
    loading: true,
  }) as BlogContextData;
  
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // State management
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);
  const [visibleCategories, setVisibleCategories] = useState<Category[]>([]);
  const [paddingClasses, setPaddingClasses] = useState<PaddingClass>('px-3');
  const [isClient, setIsClient] = useState(false);
  
  // Refs for DOM manipulation
  const containerRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const seeAllRef = useRef<HTMLButtonElement>(null);
  const allButtonRef = useRef<HTMLButtonElement>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  
  // Add state and refs for bulletproof two-row mobile category row
  const mobileCatContainerRef = useRef<HTMLDivElement>(null);
  const [maxMobileCategories, setMaxMobileCategories] = useState(6);
  const [measured, setMeasured] = useState(false);
  const hiddenRowRef = useRef<HTMLDivElement>(null);
  // Track last applied search params to avoid duplicate fetches when URL updates
  const lastQueryRef = useRef<string | null>(null);
  const lastSortRef = useRef<string | null>(null);

  // Real DOM measurement for mobile two-row consistency
  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;
    if (!hiddenRowRef.current) return;
    // Get all children (buttons/links) in the hidden row
    const children = Array.from(hiddenRowRef.current.children);
    // Find the unique row offsets
    const rowOffsets = Array.from(new Set(children.map(el => (el as HTMLElement).offsetTop)));
    // Only show as many categories as fit in two rows
    let lastIndex = 1; // search + all always fit
    if (rowOffsets.length > 1) {
      // Find the last index that is still on the second row
      const secondRowTop = rowOffsets[1];
      for (let i = 2; i < children.length; i++) {
        if ((children[i] as HTMLElement).offsetTop > secondRowTop) {
          break;
        }
        lastIndex = i;
      }
    } else {
      lastIndex = children.length - 1;
    }
    // lastIndex is the last category or 'See all' that fits in two rows
    // We want to show all categories up to lastIndex-1 (since last is 'See all')
    setMaxMobileCategories(Math.max(0, lastIndex - 2));
    setMeasured(true);
    // Re-measure on resize
    const handleResize = () => setMeasured(false);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [categories, measured]);
  
  // Memoized values
  const mobileCategoriesDisplay = useMemo(() => {
    return categories.slice(0, MOBILE_CATEGORY_LIMIT);
  }, [categories]);
  
  // Handle client-side hydration and restore archive visibility from URL
  useEffect(() => {
    setIsClient(true);
    const archiveParam = searchParams.get('archive');
    if (archiveParam === 'true') {
      setIsArchiveOpen(true);
    } else if (archiveParam === 'false') {
      setIsArchiveOpen(false);
    }
  }, [searchParams]);
  
  // Responsive padding calculation
  const getPaddingClasses = useCallback((): PaddingClass => {
    if (typeof window === 'undefined') return 'px-3';
    
    const width = window.innerWidth;
    
    if (width > BREAKPOINTS.LARGE) return 'px-[100px]';
    if (width > BREAKPOINTS.MEDIUM_LARGE) return 'px-[60px]';
    if (width > BREAKPOINTS.MEDIUM) return 'px-[40px]';
    if (width > BREAKPOINTS.SMALL_MEDIUM) return 'px-[20px]';
    
    return 'px-3';
  }, []);
  
  // Calculate available space and determine visible categories
  const calculateVisibleCategories = useCallback(() => {
    if (!isClient || !containerRef.current || !categoriesRef.current || !seeAllRef.current || loading || categories.length === 0) {
      return;
    }

    try {
      const container = containerRef.current;
      const seeAllButton = seeAllRef.current;
      
      // Get actual measurements
      const containerWidth = container.offsetWidth;
      const seeAllWidth = seeAllButton.offsetWidth;
      const searchButtonWidth = 48; // Search button
      const allButtonWidth = allButtonRef.current?.offsetWidth || 48;
      
      // Calculate available width with minimal safety margin
      const totalFixedWidth = searchButtonWidth + 12 + allButtonWidth + 12 + seeAllWidth + 16; // realistic gaps
      const availableWidth = containerWidth - totalFixedWidth - 16; // small safety margin
      
      // Create a temporary container to measure actual button widths
      const measurementContainer = document.createElement('div');
      measurementContainer.style.cssText = `
        position: absolute;
        top: -9999px;
        left: -9999px;
        visibility: hidden;
        display: flex;
        align-items: center;
        gap: 12px;
        font-family: inherit;
        font-size: 14px;
        font-weight: 500;
        white-space: nowrap;
      `;
      document.body.appendChild(measurementContainer);
      
      let usedWidth = 0;
      const visible: Category[] = [];
      const categoryWidths: number[] = [];
      
      // Measure each category button's actual width
      for (const category of categories) {
        const tempButton = document.createElement('button');
        tempButton.style.cssText = `
          display: flex;
          align-items: center;
          gap: 8px;
          border-radius: 2px;
          border: 1px solid #0000001F;
          padding: 6px 12px;
          font-size: 14px;
          font-weight: 500;
          white-space: nowrap;
          background: white;
        `;
        
        if (category.image_url) {
          const icon = document.createElement('span');
          icon.style.cssText = 'width: 16px; height: 16px; display: inline-block;';
          tempButton.appendChild(icon);
        }
        
        // Add text
        const text = document.createElement('span');
        text.textContent = category.name;
        tempButton.appendChild(text);
        
        measurementContainer.appendChild(tempButton);
        const actualWidth = tempButton.offsetWidth;
        categoryWidths.push(actualWidth);
        
        // Check if this category fits
        if (usedWidth + actualWidth + (visible.length > 0 ? 12 : 0) <= availableWidth) {
          visible.push(category);
          usedWidth += actualWidth + (visible.length > 1 ? 12 : 0); // gap except for first
        } else {
          break; // Stop if this category doesn't fit
        }
        
        measurementContainer.removeChild(tempButton);
      }
      
      // Clean up measurement container
      document.body.removeChild(measurementContainer);
      
      console.log('Accurate space calculation:', {
        containerWidth,
        availableWidth,
        usedWidth,
        remainingSpace: availableWidth - usedWidth,
        visibleCount: visible.length,
        totalCategories: categories.length,
        categoryWidths: categoryWidths.slice(0, visible.length),
        fixedElementsWidth: totalFixedWidth
      });
      
      setVisibleCategories(visible);
    } catch (error) {
      console.error('Error calculating visible categories:', error);
      const screenWidth = window.innerWidth;
      let fallbackCount = 2; 
      
      if (screenWidth > 1600) fallbackCount = 6;
      else if (screenWidth > 1400) fallbackCount = 6;
      else if (screenWidth > 1200) fallbackCount = 6;
      else if (screenWidth > 1024) fallbackCount = 4;
      else if (screenWidth > 768) fallbackCount = 3;
      
      setVisibleCategories(categories.slice(0, Math.min(fallbackCount, categories.length)));
    }
  }, [categories, loading, isClient]);

  // Update padding on window resize
  useEffect(() => {
    if (!isClient) return;
    
    const handleResize = DEBOUNCE(() => {
      setPaddingClasses(getPaddingClasses());
      calculateVisibleCategories();
    }, 150);

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [getPaddingClasses, calculateVisibleCategories, isClient]);

  // Setup ResizeObserver for more accurate container size changes
  useEffect(() => {
    if (!isClient || !containerRef.current) return;

    if (resizeObserverRef.current) {
      resizeObserverRef.current.disconnect();
    }

    resizeObserverRef.current = new ResizeObserver(
      DEBOUNCE((entries: ResizeObserverEntry[]) => {
        // Only recalculate if width actually changed significantly
        const entry = entries[0];
        if (entry && entry.contentRect.width > 200) { // sanity check
          calculateVisibleCategories();
        }
      }, 100)
    );

    resizeObserverRef.current.observe(containerRef.current);

    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
    };
  }, [calculateVisibleCategories, isClient]);

  // Recalculate visible categories when categories change
  useEffect(() => {
    if (!loading && isClient && categories.length > 0) {
      // Multiple timing strategies to ensure calculation happens at the right moment
      const runCalculation = () => {
        calculateVisibleCategories();
      };

      // Immediate calculation
      runCalculation();
      
      // Backup calculation after DOM settles
      requestAnimationFrame(() => {
        setTimeout(runCalculation, 50);
      });
      
      // Final backup calculation
      setTimeout(runCalculation, 200);
    }
  }, [categories, loading, calculateVisibleCategories, isClient]);

  // Initialize padding classes
  useEffect(() => {
    if (isClient) {
      setPaddingClasses(getPaddingClasses());
    }
  }, [getPaddingClasses, isClient]);

  // Recalculate visible categories when archive state changes
  useEffect(() => {
    if (isClient && !isArchiveOpen && !loading && categories.length > 0) {
      // Small delay to ensure DOM is ready after archive closes
      setTimeout(() => {
        calculateVisibleCategories();
      }, 100);
    }
  }, [isArchiveOpen, isClient, loading, categories.length, calculateVisibleCategories]);

  // Update URL when archive state changes
  const updateArchiveState = useCallback((open: boolean) => {
    const params = new URLSearchParams(searchParams.toString());
    if (open) {
      params.set('archive', 'true');
    } else {
      params.delete('archive');
    }
    router.replace(`${pathname}?${params.toString()}`);
    setIsArchiveOpen(open);
  }, [pathname, searchParams, router]);

  const handleSearch = useCallback(
    async (searchQuery: string, sortBy: string = currentSort) => {
      setQuery(searchQuery);
      
      try {
        if (searchQuery.trim()) {
          setIsSearching(true);
          // Only clear selected category if we're on the main blogs page
          if (!currentCategory) {
            setSelectedCategory("");
          }

          // Sync search state to URL so it restores on back navigation
          lastQueryRef.current = searchQuery;
          lastSortRef.current = sortBy;
          const currQ = searchParams.get('q') || '';
          const currSort = searchParams.get('sortBy') || '';
          if (currQ !== searchQuery || currSort !== sortBy) {
            const params = new URLSearchParams(searchParams.toString());
            params.set('q', searchQuery);
            params.set('sortBy', sortBy);
            // Keep archive open while the user is searching for better UX
            params.set('archive', 'true');
            const nextUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
            router.replace(nextUrl);
          }

          // Use sessionStorage cache to show instant results if available
          const key = `blogs:search:${searchQuery}|${sortBy}|${currentCategory || ''}`;
          try {
            const cached = sessionStorage.getItem(key);
            if (cached) {
              const parsed = JSON.parse(cached);
              if (Array.isArray(parsed)) {
                setBlogs(parsed);
              }
            }
          } catch {}

          const url = `/api/search?q=${encodeURIComponent(searchQuery)}&sortBy=${sortBy}&limit=50${currentCategory ? `&category=${currentCategory}` : ''}`;
          const response = await fetch(url);
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const data = await response.json();
          if (data.results) {
            setBlogs(data.results);
            try { sessionStorage.setItem(key, JSON.stringify(data.results)); } catch {}
            // Persist a snapshot for robust back-navigation when URL lacks q
            try {
              const snapshot = {
                query: searchQuery,
                sortBy,
                category: currentCategory || '',
                results: data.results,
                ts: Date.now()
              };
              sessionStorage.setItem('blogs:lastSearch', JSON.stringify(snapshot));
            } catch {}
          }
        } else {
          // Clear search params from URL when search query is emptied
          const currQ = searchParams.get('q');
          const currSort = searchParams.get('sortBy');
          if (currQ || currSort) {
            const params = new URLSearchParams(searchParams.toString());
            params.delete('q');
            params.delete('sortBy');
            // Leave archive state unchanged when clearing input manually
            const nextUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
            router.replace(nextUrl);
          }

          const url = `/api/search?sortBy=${sortBy}${currentCategory ? `&category=${currentCategory}` : ''}`;
          const response = await fetch(url);
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const data = await response.json();
          if (data.results) {
            setBlogs(data.results);
          }
          setIsSearching(false);
        }
      } catch (error) {
        console.error("Search error:", error);
        setBlogs([]);
        setIsSearching(false);
      }
    },
    [setQuery, setBlogs, setIsSearching, setSelectedCategory, currentCategory, currentSort, pathname, router, searchParams]
  );

  // Restore search results from URL when navigating back (q/sortBy)
  useEffect(() => {
    if (!isClient) return;
    const qParam = searchParams.get('q');
    const sortParam = searchParams.get('sortBy') || currentSort;

    // Only handle when the URL actually changed values
    const isChanged = lastQueryRef.current !== qParam || lastSortRef.current !== sortParam;
    if (!isChanged) return;

    lastQueryRef.current = qParam;
    lastSortRef.current = sortParam;

    if (qParam) {
      // Try to restore cached results instantly
      try {
        const key = `blogs:search:${qParam}|${sortParam}|${currentCategory || ''}`;
        const cached = sessionStorage.getItem(key);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed)) {
            setBlogs(parsed);
          }
        }
      } catch {}
      // Trigger a search to repopulate results
      handleSearch(qParam, sortParam);
    } else {
      // URL cleared query, reflect that in state without oscillation
      setIsSearching(false);
      setQuery("");
    }
  }, [isClient, searchParams, currentSort, handleSearch, currentCategory, setBlogs, setIsSearching, setQuery]);

  const handleCategoryClick = useCallback(
    (categorySlug: string) => {
      if (pathname === "/blogs" || !pathname.includes("/blogs/category/") || pathname !== `/blogs/category/${categorySlug}`) {
        setSelectedCategory(categorySlug);
        setQuery("");
        setIsSearching(false);
        updateArchiveState(true);
        router.push(`/blogs/category/${categorySlug}`);
      } else {
        updateArchiveState(true);
      }
    },
    [setSelectedCategory, setQuery, setIsSearching, updateArchiveState, pathname, router],
  );

  const handleArchiveClose = useCallback(() => {
    // Close archive and clear search URL params to avoid stale state on back
    const params = new URLSearchParams(searchParams.toString());
    params.delete('q');
    params.delete('sortBy');
    params.delete('archive');
    const nextUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    router.replace(nextUrl);
    setIsArchiveOpen(false);
    setIsSearching(false);
    setQuery("");
    try { sessionStorage.removeItem('blogs:lastSearch'); } catch {}
  }, [pathname, searchParams, router, setIsSearching, setQuery]);

  // Render category button with proper accessibility
  const renderCategoryButton = useCallback((category: Category, isActive: boolean) => (
    <Link
      href={`/blogs/category/${category.slug}`}
      key={category.id}
      passHref
      className="flex-shrink-0"
      aria-label={`View ${category.name} articles`}
    >
      <button
        className={`flex items-center gap-2 rounded-sm border px-3 py-1.5 transition-all duration-200 hover:-translate-y-1 hover:shadow-md focus:outline-none ${
          isActive
            ? "bg-[#FFFFFF30] shadow-sm"
            : "border-white/20 bg-white/10 hover:bg-white/20"
        }`}
        style={isActive ? { background: '#FFFFFF30', boxShadow: 'none', outline: 'none', border: 'none' } : {}}
        aria-pressed={isActive}
      >
        {category.image_url && (
          <img
            src={category.image_url}
            alt=""
            className="h-4 w-4 object-contain"
            style={{
              filter: "brightness(0) saturate(100%) invert(100%)",
            }}
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        )}
        <span className="text-sm font-medium text-white whitespace-nowrap">
          {category.name}
        </span>
      </button>
    </Link>
  ), []);

  // Early return for SSR
  if (!isClient) {
    return (
      <div className="border-b border-gray-200 bg-white py-4 max-md:bg-[#FAFAF5] px-3">
        <div className="mx-auto flex w-full items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-20 animate-pulse rounded-sm bg-gray-200"></div>
            <div className="h-8 w-24 animate-pulse rounded-sm bg-gray-200"></div>
            <div className="h-8 w-20 animate-pulse rounded-sm bg-gray-200"></div>
          </div>
          <div className="h-8 w-32 animate-pulse rounded-sm bg-gray-200"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full" role="navigation" aria-label="Blog categories">
      {!isArchiveOpen && (
        <div 
          className={`border-b border-gray-200 bg-white py-4 max-md:bg-[#FAFAF5] ${paddingClasses}`}
          style={{
            background: 'linear-gradient(85.17deg, #228698 -25.7%, #0B2C32 89.13%)'
          }}
        >
          <div ref={containerRef} className="mx-auto flex w-full items-center justify-between">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsArchiveOpen(true)}
                className="rounded-full hover:bg-white/20 max-md:hidden flex-shrink-0"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                data-archive-trigger
                aria-label="Open search and categories"
              >
                <Search className="h-5 w-5 text-white" />
              </Button>

              <div ref={categoriesRef} className="hidden items-center gap-3 md:flex flex-1 min-w-0">
                {loading ? (
                  <div className="flex items-center gap-3" aria-label="Loading categories">
                    {Array.from({ length: DESKTOP_LOADING_SKELETON_COUNT }).map((_, index) => (
                    <div
                      key={index}
                        className="h-8 w-20 animate-pulse rounded-sm bg-white/20 flex-shrink-0"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    {/* All button */}
                    <Link href="/blogs" passHref className="flex-shrink-0">
                      <button
                        ref={allButtonRef}
                        className={`flex items-center gap-2 rounded-sm border px-3 py-1.5 transition-all duration-200 hover:-translate-y-1 hover:shadow-md focus:outline-none ${
                          pathname === "/blogs"
                            ? "border-white/30 bg-white/20 shadow-sm"
                            : "border-white/20 bg-white/10 hover:bg-white/20"
                        }`}
                        style={{ background: '#FFFFFF30', boxShadow: 'none', outline: 'none', border: '1px solid #FFFFFF30' }}
                        aria-pressed={pathname === "/blogs"}
                        aria-label="View all articles"
                        onClick={(e) => {
                          // Ensure full homepage shows reliably like archive's All behavior
                          e.preventDefault();
                          setSelectedCategory("");
                          setQuery("");
                          setIsSearching(false);
                          // Clear search-related URL params
                          const params = new URLSearchParams(searchParams.toString());
                          params.delete('q');
                          params.delete('sortBy');
                          params.delete('archive');
                          const nextUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
                          router.replace(nextUrl);
                          updateArchiveState(false);
                          // Navigate to /blogs to render full sections
                          router.push('/blogs');
                        }}
                      >
                        <span className="text-sm font-medium text-white whitespace-nowrap">
                          All
                        </span>
                      </button>
                    </Link>

                    {/* Dynamic visible categories */}
                    {visibleCategories.map((category) =>
                      renderCategoryButton(category, pathname === `/blogs/category/${category.slug}`)
                    )}
                  </div>
                )}
              </div>

              {/* Mobile Categories - search icon and categories in same row, see all at end of second row, hard limit for consistency */}
              <div className="md:hidden w-full">
                {/* First line: search bar and All button */}
                <div className="flex items-center w-full mb-1 justify-center">
                  <div className="flex items-center gap-2">
                    <div className="relative w-24">
                      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-white/80 pointer-events-none">
                        <Search className="h-4 w-4" />
                      </span>
                      <input
                        type="text"
                        placeholder="Search"
                        className="rounded-md pl-4 py-1 text-sm bg-[#FFFFFF30] text-white placeholder-white/80 border border-white/20 focus:outline-none focus:ring-0 w-full text-center"
                        readOnly
                        onFocus={() => setIsArchiveOpen(true)}
                        onClick={() => setIsArchiveOpen(true)}
                        style={{ cursor: 'pointer' }}
                      />
                    </div>
                    {/* ALL button for mobile */}
                    <Link href="/blogs" passHref className="flex-shrink-0">
                      <button
                        className={`flex items-center gap-1 whitespace-nowrap rounded-sm border px-2 py-1.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 ${
                        pathname === "/blogs"
                          ? "border-white/30 bg-white/20 shadow-sm"
                          : "border-white/20 bg-white/10 hover:bg-white/20"
                        }`}
                        aria-pressed={pathname === "/blogs"}
                        aria-label="View all articles"
                      >
                        <span className="text-xs font-medium text-white">All</span>
                      </button>
                    </Link>
                  </div>
                </div>
                {/* Second line: Business Decoded, CubePlus Trading, See All */}
                <div className="flex items-center gap-2 w-full justify-center mt-2">
                  {/* Business Decoded and CubePlus Trading by index/name */}
                  {categories
                    .filter(
                      (cat) =>
                        cat.name === "Business Decoded" ||
                        cat.name === "CubePlus Trading"
                    )
                    .map((category) => (
                      <Link
                        href={`/blogs/category/${category.slug}`}
                        key={category.id}
                        passHref
                        className="flex-shrink-0"
                      >
                        <button
                          className={`flex items-center gap-1 whitespace-nowrap rounded-sm border px-2 py-1.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 ${
                            pathname === `/blogs/category/${category.slug}`
                              ? "border-white/30 bg-white/20 shadow-sm"
                              : "border-white/20 bg-white/10 hover:bg-white/20"
                          }`}
                          aria-pressed={pathname === `/blogs/category/${category.slug}`}
                          aria-label={`View ${category.name} articles`}
                        >
                          {category.image_url && (
                            <img
                              src={category.image_url}
                              alt=""
                              className="h-3 w-3 object-contain"
                              style={{
                                filter: "brightness(0) saturate(100%) invert(100%)",
                              }}
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                              }}
                            />
                          )}
                          <span className="text-xs font-medium text-white">
                            {category.name}
                          </span>
                        </button>
                      </Link>
                    ))}
                  {/* See All button */}
                  <Button
                    variant="link"
                    className="flex items-center gap-1 text-xs font-medium text-white no-underline hover:text-white/80 hover:no-underline flex-shrink-0 mt-0"
                    onClick={() => setIsArchiveOpen(true)}
                    data-archive-trigger
                    aria-label="View all categories"
                  >
                    <span>See All</span>
                  </Button>
                </div>
              </div>
            </div>

            <Button
              ref={seeAllRef}
              variant="link"
              className="flex items-center gap-1 text-sm font-medium text-white no-underline hover:text-white/80 hover:no-underline max-md:hidden flex-shrink-0"
              onClick={() => setIsArchiveOpen(true)}
              data-archive-trigger
              aria-label="View all categories"
            >
              <span className="whitespace-nowrap">See all categories</span>
              <span style={{ color: "#FFFFFF" }}>&gt;&gt;</span>
            </Button>
          </div>
        </div>
      )}

      {/* Blog Archive - Desktop and Mobile */}
      {isArchiveOpen && (
          <BlogArchive
            isOpen={isArchiveOpen}
            onClose={handleArchiveClose}
            categories={categories}
            loading={loading}
            onSearch={handleSearch}
            onCategoryClick={handleCategoryClick}
            allBlogs={allBlogs}
            currentCategory={currentCategory}
          />
      )}
    </div>
  );
}
