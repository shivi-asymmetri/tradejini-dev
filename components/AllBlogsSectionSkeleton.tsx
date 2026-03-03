import { Skeleton } from "@/components/ui/skeleton";

interface AllBlogsSectionSkeletonProps {
  count?: number;
}

const AllBlogItemSkeleton = () => {
  return (
    <div className="divide-y divide-gray-200">
      {/* Desktop Layout Skeleton */}
      <div className="group cursor-pointer transition-colors hover:bg-gray-50/50 max-md:hidden">
        <div className="flex w-full flex-col items-start justify-between gap-4 py-6 sm:flex-row sm:items-start sm:gap-x-6 md:py-8">
          <div className="order-2 flex-1 space-y-3 sm:order-1">
            <div className="mb-1">
              {/* Category tag skeleton */}
              <Skeleton className="h-6 w-24 rounded" />
            </div>
            {/* Title skeleton - 2 lines */}
            <div className="space-y-2">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-4/5" />
            </div>
            {/* Author/date/reading time skeleton */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-x-2">
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-4 w-20" />
              </div>
              <span className="text-gray-300">•</span>
              <Skeleton className="h-4 w-24" />
              <span className="text-gray-300">•</span>
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
          <div className="order-1 w-full flex-shrink-0 sm:order-2 sm:w-1/3">
            {/* Image skeleton */}
            <Skeleton className="h-48 w-full rounded-md sm:h-28" />
          </div>
        </div>
      </div>

      {/* Mobile Layout Skeleton - Card Design */}
      <div className="md:hidden">
        <div className="bg-white rounded-md border border-[#D9D9D999] shadow-sm overflow-hidden" style={{ minHeight: 180 }}>
          {/* Image skeleton with aspect ratio */}
          <div className="relative w-full aspect-[16/9] p-2">
            <Skeleton className="block w-full h-full rounded-t-xl rounded-sm" />
          </div>
          {/* Content skeleton */}
          <div className="pt-2 pb-2 px-2 flex flex-col gap-2">
            {/* Category tag skeleton */}
            <Skeleton className="h-5 w-20 rounded mb-1" />
            {/* Title skeleton - 2 lines */}
            <div className="space-y-1">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            {/* Author/date/reading time skeleton */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1">
              <Skeleton className="h-3 w-16" />
              <span className="text-gray-300">|</span>
              <Skeleton className="h-3 w-20" />
              <span className="text-gray-300">|</span>
              <Skeleton className="h-3 w-12" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AllBlogsSectionSkeleton = ({ count = 5 }: AllBlogsSectionSkeletonProps) => {
  return (
    <section className="pb-8 md:py-12">
      <div className="max-w-9xl px-4 sm:px-6 md:px-[100px]">
        <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-3 lg:gap-x-12">
          <div className="lg:col-span-2">
            {/* Title skeleton */}
            <Skeleton className="mb-4 h-8 w-32 md:h-9 md:w-40" />

            {/* Desktop skeleton */}
            <div className="divide-y divide-gray-200 max-md:hidden">
              {Array.from({ length: count }).map((_, index) => (
                <AllBlogItemSkeleton key={`all-blogs-skeleton-${index}`} />
              ))}
            </div>

            {/* Mobile skeleton - Card layout */}
            <div className="space-y-4 md:hidden">
              {Array.from({ length: count }).map((_, index) => (
                <div key={`mobile-blogs-skeleton-${index}`}>
                  <div className="bg-white rounded-md border border-[#D9D9D999] shadow-sm overflow-hidden" style={{ minHeight: 180 }}>
                    {/* Image skeleton with aspect ratio */}
                    <div className="relative w-full aspect-[16/9] p-2">
                      <Skeleton className="block w-full h-full rounded-t-xl rounded-sm" />
                    </div>
                    <div className="pt-2 pb-2 px-2 flex flex-col gap-2">
                      `<Skeleton className="h-5 w-20 rounded mb-1" />
                      <div className="space-y-1">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                      </div>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1">
                        <Skeleton className="h-3 w-16" />
                        <span className="text-gray-300">|</span>
                        <Skeleton className="h-3 w-20" />
                        <span className="text-gray-300">|</span>
                        <Skeleton className="h-3 w-12" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar skeleton for desktop */}
          <div className="hidden lg:col-span-1 lg:block">
            <div className="sticky top-12">
              <Skeleton className="h-[670px] w-full rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { AllBlogItemSkeleton, AllBlogsSectionSkeleton }; 