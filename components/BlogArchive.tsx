import { Search, ArrowUpDown, ChevronDown, X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import AllBlogsSection from "./AllBlogsSection";

interface Category {
  id: string;
  name: string;
  slug: string;
  count: number;
  image_url: string | null;
}

interface BlogArchiveProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  loading: boolean;
  onSearch: (query: string, sortBy?: string) => void;
  onCategoryClick: (slug: string) => void;
  allBlogs?: any[];
  currentCategory?: string;
}

export default function BlogArchive({
  isOpen,
  onClose,
  categories,
  loading,
  onSearch,
  onCategoryClick,
  allBlogs,
  currentCategory,
}: BlogArchiveProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Relevance");
  const [showMobileSortDialog, setShowMobileSortDialog] = useState(false);
  const sortOptions = [
    { label: "Relevance", value: "relevance" },
    { label: "Newest", value: "newest" },
    { label: "Oldest", value: "oldest" },
    { label: "A-Z", value: "a-z" },
  ];

  // Initialize search field from URL or snapshot once when opening
  const hydratedOnceRef = useRef(false);
  const lastAppliedQRef = useRef<string | null>(null);
  const lastAppliedSortRef = useRef<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    if (hydratedOnceRef.current) return;
    hydratedOnceRef.current = true;
    // Ensure archive param reflects open state for correct back/restore
    try {
      const params = new URLSearchParams(searchParams.toString());
      if (params.get('archive') !== 'true') {
        params.set('archive', 'true');
        const nextUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
        router.replace(nextUrl);
      }
    } catch {}
    const qParam = searchParams.get("q") || "";
    const sortParam = searchParams.get("sortBy") || "relevance";
    if (qParam) {
      setSearchQuery(qParam);
      lastAppliedQRef.current = qParam;
      lastAppliedSortRef.current = sortParam;
      onSearch(qParam, sortParam);
      return;
    }
    try {
      const raw = sessionStorage.getItem("blogs:lastSearch");
      if (raw) {
        const snap = JSON.parse(raw);
        if (snap?.query) {
          setSearchQuery(snap.query);
          lastAppliedQRef.current = snap.query;
          lastAppliedSortRef.current = snap.sortBy || "relevance";
          onSearch(snap.query, snap.sortBy || "relevance");
          return;
        }
      }
    } catch {}
  }, [isOpen, onSearch, searchParams]);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    const sortValue = sortOptions.find((o) => o.label === selectedSort)?.value || "relevance";
    try {
      const params = new URLSearchParams(searchParams.toString());
      params.set('q', value);
      params.set('sortBy', sortValue);
      params.set('archive', 'true');
      const nextUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
      router.replace(nextUrl);
    } catch {}
    onSearch(value, sortValue);
  };

  const handleSortSelect = (option: { label: string; value: string }) => {
    setSelectedSort(option.label);
    const sortValue = option.value;
    onSearch(searchQuery, sortValue);
    setSortDropdownOpen(false);
  };

  const clearUrlSearchParams = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("q");
    params.delete("sortBy");
    params.delete("archive");
    const nextUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    router.replace(nextUrl);
  };

  const handleClose = () => {
    clearUrlSearchParams();
    onClose();
  };

  return (
    <>
      {/* Desktop archive */}
      <div
        data-archive="true"
        className="relative hidden md:block w-full transition-all duration-300 ease-in-out"
        style={{ background: "linear-gradient(135deg, #228698 0%, #0B2C32 100%)" }}
      >
        <div className="absolute right-2 top-2 z-10">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="rounded-full text-white/70 hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" style={{ color: "#FFFFFF" }} />
          </Button>
        </div>

        <div className="px-4 py-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-4">
              <div className="mx-auto flex max-w-4xl items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                  <Input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search by category / topic"
                    value={searchQuery}
                    className="w-full rounded-sm border-0 bg-white pl-12 pr-4 text-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-white/20"
                    style={{ height: "48px" }}
                    onChange={(e) => handleSearchChange(e.target.value)}
                  />
                </div>

                {searchQuery && (
                  <div className="relative">
                    <Button
                      variant="ghost"
                      className="text-white hover:text-white hover:bg-white/10 rounded-sm flex-shrink-0 border border-white/30 px-4 flex items-center justify-between w-[140px]"
                      style={{ height: "48px", color: "#FFFFFF" }}
                      onClick={() => setSortDropdownOpen((v) => !v)}
                    >
                      <div className="flex items-center" style={{ color: "#FFFFFF" }}>
                        <ArrowUpDown className="h-4 w-4 mr-2" style={{ color: "#FFFFFF" }} />
                        <span style={{ color: "#FFFFFF" }}>{selectedSort}</span>
                      </div>
                      <ChevronDown className={`h-4 w-4 ml-1 transition-transform duration-200 ${sortDropdownOpen ? "rotate-180" : ""}`} style={{ color: "#FFFFFF" }} />
                    </Button>

                    {sortDropdownOpen && (
                      <div className="absolute top-full left-0 mt-1 bg-white rounded-sm shadow-lg border border-gray-200 w-[140px] z-50">
                        {sortOptions.map((option, index) => (
                          <div
                            key={option.value}
                            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors cursor-pointer ${selectedSort === option.label ? "bg-gray-100 font-medium" : ""} ${index === 0 ? "rounded-t-sm" : ""} ${index === sortOptions.length - 1 ? "rounded-b-sm" : ""}`}
                            onMouseDown={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleSortSelect(option);
                            }}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleSortSelect(option);
                            }}
                          >
                            {option.label}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              {loading ? (
                <div className="flex flex-wrap justify-center gap-2 px-4">
                  {Array.from({ length: 10 }).map((_, index) => (
                    <div key={index} className="animate-pulse rounded-sm bg-white/20" style={{ height: "40px", width: "120px" }} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap justify-center gap-2 px-4">
                  {/* All button */}
                  <Link href="/blogs" passHref>
                    <button
                      className={`flex items-center gap-2 rounded-sm border border-white/30 px-3 py-2 text-left transition-all duration-200 hover:scale-105 hover:border-white/50 ${pathname === "/blogs" ? "border-white/60" : ""}`}
                      style={{ backgroundColor: "#FFFFFF30", height: "40px" }}
                      onClick={(e) => {
                        e.preventDefault();
                        onSearch("");
                        onCategoryClick("");
                        clearUrlSearchParams();
                        onClose();
                        window.location.href = "/blogs";
                      }}
                    >
                      <span className="overflow-hidden text-ellipsis whitespace-nowrap text-sm font-medium" style={{ color: "#FFFFFF" }}>
                        All
                      </span>
                    </button>
                  </Link>

                  {categories.map((category) => (
                    <Link href={`/blogs/category/${category.slug}?archive=true`} key={category.id} passHref>
                      <button
                        className={`flex items-center gap-2 rounded-sm border border-white/30 px-3 py-2 text-left transition-all duration-200 hover:scale-105 hover:border-white/50 ${pathname === `/blogs/category/${category.slug}` ? "border-white/60" : ""}`}
                        style={{ backgroundColor: "#FFFFFF30", height: "40px" }}
                        onClick={() => onCategoryClick(category.slug)}
                      >
                        {category.image_url && (
                          <img
                            src={category.image_url}
                            alt={`${category.name} icon`}
                            className="h-5 w-5 flex-shrink-0 object-contain"
                            style={{ filter: "brightness(0) saturate(100%) invert(100%)" }}
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).style.display = "none";
                            }}
                          />
                        )}
                        <span className="overflow-hidden text-ellipsis whitespace-nowrap text-sm font-medium" style={{ color: "#FFFFFF" }}>
                          {category.name}
                        </span>
                      </button>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      <div data-archive="true" className="relative block bg-white md:hidden fixed inset-0 z-50 overflow-y-auto">
        <div className="px-4 py-3 h-full">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-lg font-poppins font-medium text-[#000000CC]">{searchQuery ? "Search Results" : "What you're looking for?"}</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="rounded-full text-gray-600 hover:bg-gray-100"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>

          <div className="mb-3 relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
              <Input
                ref={searchInputRef}
                type="text"
                placeholder="Search by category / topic"
                value={searchQuery}
                className="w-full rounded-sm border-0 bg-[#EFEFEFB2] pl-12 pr-10 text-base focus:outline-none focus:ring-0 focus:border-0"
                style={{ height: "48px", boxShadow: "none" }}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
              {searchQuery && (
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-200 focus:outline-none"
                  onClick={() => handleSearchChange("")}
                  tabIndex={0}
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4 text-gray-500" />
                </button>
              )}
            </div>
          </div>

          {/* Mobile category pills when not searching (below the search input) */}
          {!searchQuery && (
            <div className="mb-3">
              <div className="flex flex-wrap gap-2">
                <Link href="/blogs" passHref>
                  <button
                    className={`flex items-center gap-2 rounded-sm border px-4 py-2 text-left transition-all duration-200 hover:bg-gray-50 ${
                      pathname === "/blogs" ? "border-emerald-500 bg-emerald-50" : "border-gray-300 bg-white"
                    }`}
                    onClick={() => {
                      onCategoryClick("");
                      onClose();
                    }}
                  >
                    <span className="text-sm font-medium text-gray-900">All</span>
                  </button>
                </Link>

                {categories.map((category) => (
                  <Link href={`/blogs/category/${category.slug}`} key={category.id} passHref>
                    <button
                      className={`flex items-center gap-2 rounded-sm border px-4 py-2 text-left transition-all duration-200 hover:bg-gray-50 ${
                        pathname === `/blogs/category/${category.slug}`
                          ? "border-emerald-500 bg-emerald-50"
                          : "border-gray-300 bg-white"
                      }`}
                      onClick={() => {
                        onCategoryClick(category.slug);
                        onClose();
                      }}
                    >
                      {category.image_url && (
                        <img
                          src={category.image_url}
                          alt={`${category.name} icon`}
                          className="h-5 w-5 object-contain"
                          style={{
                            filter:
                              "brightness(0) saturate(100%) invert(25%) sepia(26%) saturate(1776%) hue-rotate(146deg) brightness(97%) contrast(97%)",
                          }}
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).style.display = "none";
                          }}
                        />
                      )}
                      <span className="text-sm font-medium text-gray-900">{category.name}</span>
                    </button>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {searchQuery && (
            <div className="flex items-center justify-between mb-2 gap-x-2">
              <div className="font-poppins text-base text-[#000000CC] flex items-center flex-nowrap gap-x-1">
                <span>Results for</span>
                <span className="font-medium text-[#000000E5]">{searchQuery}</span>
              </div>
              <div className="relative">
                <Button
                  variant="outline"
                  className="flex items-center gap-2 rounded-sm border border-gray-300 px-3 py-2 text-sm"
                  style={{ height: "36px" }}
                  onClick={() => setShowMobileSortDialog(true)}
                >
                  <ArrowUpDown className="h-4 w-4" />
                  <span>{selectedSort}</span>
                </Button>
              </div>
            </div>
          )}

          {/* Mobile sort dialog */}
          {showMobileSortDialog && (
            <div className="fixed inset-0 z-[60] bg-black/50 flex items-end">
              <div className="bg-white w-full rounded-t-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Sort by</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowMobileSortDialog(false)}
                    className="rounded-full text-gray-600 hover:bg-gray-100"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <div className="space-y-2">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                        selectedSort === option.label
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-white text-gray-900 border border-gray-200 hover:bg-gray-50"
                      }`}
                      onClick={() => {
                        setShowMobileSortDialog(false);
                        handleSortSelect(option);
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{option.label}</span>
                        {selectedSort === option.label && (
                          <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {searchQuery && !currentCategory && (
            <div className="mt-1">
              <AllBlogsSection
                visibleBlogs={Array.isArray(allBlogs) ? allBlogs : []}
                handleBlogClick={() => {}}
                loadMoreBlogs={() => {}}
                hasMore={false}
                loadingMore={false}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}


