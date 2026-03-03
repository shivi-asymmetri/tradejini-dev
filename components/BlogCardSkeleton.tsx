import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface BlogCardSkeletonProps {
  count?: number;
}

const BlogCardSkeleton = () => {
  return (
    <Card
      className="h-full overflow-hidden rounded border border-gray-200"
      style={{
        boxShadow: "0 4px 6px -1px #0000000A, 0 2px 4px -1px #0000000A",
      }}
    >
      <CardHeader className="p-3 sm:p-4">
        <Skeleton className="aspect-video h-40 w-full rounded sm:h-48 md:h-56" />
      </CardHeader>
      <CardContent className="p-3 pt-2 sm:p-4">
        <Skeleton className="mb-2 h-5 w-24 rounded sm:mb-3 sm:h-6 sm:w-28" />
        
        <div className="space-y-2">
          <Skeleton className="h-5 w-full sm:h-6" />
          <Skeleton className="h-5 w-4/5 sm:h-6" />
        </div>
        
        <div className="mt-2 flex items-center gap-x-1 sm:gap-x-2">
          <Skeleton className="h-3 w-16 sm:h-4 sm:w-20" />
          <span className="text-gray-300">|</span>
          <Skeleton className="h-3 w-20 sm:h-4 sm:w-24" />
          <span className="text-gray-300">|</span>
          <Skeleton className="h-3 w-12 sm:h-4 sm:w-16" />
        </div>
      </CardContent>
    </Card>
  );
};

const BlogCardSkeletons = ({ count = 6 }: BlogCardSkeletonProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <BlogCardSkeleton key={`blog-skeleton-${index}`} />
      ))}
    </div>
  );
};

export { BlogCardSkeleton, BlogCardSkeletons }; 