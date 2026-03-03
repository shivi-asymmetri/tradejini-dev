import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function CategoryBlogCardSkeleton() {
  return (
    <Card className="h-full overflow-hidden rounded-md border">
      <CardHeader className="p-3 sm:p-4">
        <div className="relative aspect-[16/10] w-full animate-pulse rounded-sm bg-gray-200" />
      </CardHeader>
      <CardContent className="space-y-3 p-3 pt-2 sm:p-4">
        <div className="h-5 w-1/3 animate-pulse rounded-md bg-gray-200" />
        <div className="space-y-2">
          <div className="h-4 w-full animate-pulse rounded-md bg-gray-200" />
          <div className="h-4 w-5/6 animate-pulse rounded-md bg-gray-200" />
        </div>
        <div className="flex items-center gap-x-2 pt-1 text-xs sm:gap-x-2 sm:text-sm md:text-base">
          <div className="h-4 w-16 animate-pulse rounded-md bg-gray-200" />
          <div className="h-4 w-24 animate-pulse rounded-md bg-gray-200" />
          <div className="h-4 w-14 animate-pulse rounded-md bg-gray-200" />
        </div>
      </CardContent>
    </Card>
  );
}

export function CategoryBlogCardSkeletons({ count }: { count: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 py-6 sm:grid-cols-2 sm:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <CategoryBlogCardSkeleton key={i} />
      ))}
    </div>
  );
} 