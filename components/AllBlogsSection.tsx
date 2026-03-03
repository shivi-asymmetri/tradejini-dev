import Link from "next/link";
import { User } from "lucide-react";
import { BlogType } from "@/types/BlogType";
import { formatPublicationDate } from "@/utils/dateUtils";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { AllBlogItemSkeleton } from "@/components/AllBlogsSectionSkeleton";

export default function AllBlogsSection({
  visibleBlogs,
  handleBlogClick,
  loadMoreBlogs,
  hasMore,
  loadingMore,
  startingIndex = 0,
  hideBanner = false,
  hideTitle = false,
}: {
  visibleBlogs: BlogType[];
  handleBlogClick: (blogId: string, permalink: string) => void;
  loadMoreBlogs: () => void;
  hasMore: boolean;
  loadingMore: boolean;
  startingIndex?: number;
  hideBanner?: boolean;
  hideTitle?: boolean;
}) {
  const blogsToShow = visibleBlogs.slice(startingIndex);
  const whatsappChannelUrl =
    "https://whatsapp.com/channel/0029VaylTGWADTOHkEncTU14";

  if (blogsToShow.length === 0 && !hasMore) {
    return null;
  }

  return (
    <section className="pb-8 md:py-12">
      <div className="max-w-9xl px-4 sm:px-6 md:px-[100px]">
        <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-3 lg:gap-x-12">
          <div className="lg:col-span-2">
            {!hideTitle && (
              <h2 className="mb-4 font-poppins text-2xl font-medium tracking-tight text-[#000000D9] md:text-3xl">
                All Blogs
              </h2>
            )}

            {/* Desktop (md+) version: unchanged */}
            <div className="divide-y divide-gray-200 max-md:hidden">
              {blogsToShow.map((blog, index) => (
                <div key={index}>
                  {/* <a
                    key={`all-${blog.id}-${blog.permalink}-${index}`}
                    href={`/blogs/${blog.permalink}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleBlogClick(blog.id, blog.permalink)}
                    className="group cursor-pointer transition-colors hover:bg-gray-50/50 max-md:hidden"
                  > */}
                  <div
                    key={`all-${blog.id}-${blog.permalink}-${index}`}
                    onClick={() => handleBlogClick(blog.id, blog.permalink)}
                    className="group cursor-pointer transition-colors hover:bg-gray-50/50 max-md:hidden"
                  >
                    <div className="flex w-full flex-col items-start justify-between gap-4 py-4 sm:flex-row sm:items-start sm:gap-x-6 md:py-6">
                      <div className="order-2 flex-1 space-y-3 sm:order-1 md:pt-4">
                        <div className="mb-1">
                          <span className="mb-1 inline-block w-fit rounded bg-[#EDFAF4] px-3 py-1 text-sm font-normal text-[#0A787A] md:text-base">
                            {blog.category?.name}
                          </span>
                        </div>
                        <h3 className="line-clamp-2 font-poppins text-lg font-medium text-gray-900 transition-colors group-hover:text-emerald-600 md:text-xl">
                          {blog.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 text-base text-[#1D1D1D80]">
                          <div className="flex items-center gap-x-2">
                            {blog.author?.image ? (
                              <img
                                src={blog.author.image}
                                alt={blog.author.name || ""}
                                className="h-5 w-5 rounded-full object-fill"
                              />
                            ) : (
                              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-200">
                                <User size={12} />
                              </div>
                            )}
                            <span className="text-gray-500">
                              {blog.author?.name}
                            </span>
                          </div>
                          <span className="text-gray-500">•</span>
                          <span className="text-gray-500">
                            {formatPublicationDate(
                              blog.publicationDate,
                              blog.publication_iso_date,
                            )}
                          </span>
                          <span className="text-gray-500">•</span>
                          <span className="text-gray-500">
                            {blog.readingTime}
                          </span>
                        </div>
                      </div>
                      <div className="order-1 w-full flex-shrink-0 sm:order-2 sm:w-1/3">
                        <div className="relative aspect-[16/10] overflow-hidden rounded-md">
                          <Image
                            src={blog.coverImageSrc}
                            alt={blog.coverImageAlt}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            loading={index < 2 ? "eager" : "lazy"}
                            style={{
                              objectPosition: "center 25%",
                            }}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* </a> */}
                  <div className="hidden py-2 max-md:block">
                    {/* <a
                      key={blog.id}
                      href={`/blogs/${blog.permalink}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => handleBlogClick(blog.id, blog.permalink)}
                      className="group -mx-2 flex w-full cursor-pointer items-start gap-4 rounded-lg p-2 transition-colors hover:bg-gray-50/50"
                    > */}
                    <div
                      key={blog.id}
                      onClick={() => handleBlogClick(blog.id, blog.permalink)}
                      className="group -mx-2 flex w-full cursor-pointer items-start gap-4 rounded-lg p-2 transition-colors hover:bg-gray-50/50"
                    >
                      <div className="h-28 w-28 flex-shrink-0">
                        <div className="relative h-full w-full overflow-hidden rounded-md">
                          <Image
                            src={blog.coverImageSrc}
                            alt={blog.coverImageAlt}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            loading={index < 3 ? "eager" : "lazy"}
                            style={{
                              objectPosition: "center 25%",
                            }}
                            sizes="(max-width: 768px) 100vw, 150px"
                          />
                        </div>
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col justify-start gap-2">
                        <div className="flex items-center gap-2">
                          <span className="inline-block w-fit rounded-sm bg-[#EDFAF4] px-2 py-0.5 text-xs font-medium text-emerald-700">
                            {blog.category?.name}
                          </span>
                          <span className="flex space-x-1 text-xs text-gray-500">
                            {formatPublicationDate(
                              blog.publicationDate,
                              blog.publication_iso_date,
                            )
                              .split(" ")
                              .map((x) => (
                                <p key={x}>{x}</p>
                              ))}
                          </span>
                        </div>
                        <h3 className="line-clamp-2 font-poppins text-sm font-medium leading-tight text-gray-900 group-hover:text-emerald-600">
                          {blog.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-x-1 text-xs text-gray-500">
                          <div className="flex items-center gap-x-1">
                            {blog.author?.image ? (
                              <img
                                src={blog.author.image}
                                alt={blog.author.name || ""}
                                className="h-4 w-4 rounded-full object-fill"
                              />
                            ) : (
                              <div className="flex h-4 w-4 items-center justify-center rounded-full bg-gray-200">
                                <User size={8} />
                              </div>
                            )}
                            <span>{blog.author?.name}</span>
                          </div>
                          <span>•</span>
                          <span>{blog.readingTime}</span>
                        </div>
                      </div>
                    </div>
                    {/* </a> */}
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile (max-md) version: new card layout */}
            <div className="space-y-4 md:hidden">
              {blogsToShow.map((blog, index) => (
                <div key={blog.id}>
                  {/* <a
                    href={`/blogs/${blog.permalink}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleBlogClick(blog.id, blog.permalink)}
                    className="cursor-pointer overflow-hidden rounded-md border border-[#D9D9D999] bg-white shadow-sm transition hover:shadow-md"
                    style={{ minHeight: 180 }}
                  > */}
                  <div
                    onClick={() => handleBlogClick(blog.id, blog.permalink)}
                    className="cursor-pointer overflow-hidden rounded-md border border-[#D9D9D999] bg-white shadow-sm transition hover:shadow-md"
                    style={{ minHeight: 180 }}
                  >
                    <div className="relative aspect-[16/9] w-full p-2">
                      <Image
                        src={blog.coverImageSrc}
                        alt={blog.coverImageAlt || blog.title}
                        fill
                        className="rounded-t-xl object-cover object-center"
                        loading={index < 2 ? "eager" : "lazy"}
                        priority={index < 2}
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="flex flex-col gap-2 px-2 pb-2 pt-2">
                      {blog.category?.name && (
                        <span className="mb-1 inline-block w-fit rounded bg-[#EDFAF4] px-3 py-1 text-xs font-medium text-[#0A787A]">
                          {blog.category.name}
                        </span>
                      )}
                      <h3
                        className="line-clamp-2 font-poppins text-base font-medium leading-snug"
                        style={{ color: "#000000E5" }}
                      >
                        {blog.title}
                      </h3>

                      <div
                        className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs"
                        style={{ color: "#1D1D1D80" }}
                      >
                        {blog.author?.name && <span>{blog.author.name}</span>}
                        {blog.author?.name && <span>|</span>}
                        <span>
                          {formatPublicationDate(
                            blog.publicationDate,
                            blog.publication_iso_date,
                          )}
                        </span>
                        <span>|</span>
                        <span>{blog.readingTime}</span>
                      </div>
                    </div>
                  </div>
                  {/* </a> */}

                  {index === 2 && !hideBanner && (
                    <div className="mb-5 mt-5 flex justify-center">
                      <a
                        href={whatsappChannelUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-full w-full max-w-[420px] items-center justify-center overflow-hidden rounded-sm bg-white"
                      >
                        <Image
                          src="/whatsapp_banner_mobile.png"
                          alt="Join WhatsApp Community"
                          width={420}
                          height={350}
                          className="h-auto w-full object-cover object-center"
                          loading="lazy"
                        />
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {hasMore && !loadingMore && (
              <div className="flex justify-center pt-6 md:pt-8">
                <button
                  onClick={loadMoreBlogs}
                  className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 sm:px-6 sm:text-base"
                >
                  Load more
                </button>
              </div>
            )}

            {loadingMore && (
              <div className="pt-6 md:pt-8">
                {Array.from({ length: 3 }).map((_, index) => (
                  <AllBlogItemSkeleton key={`loading-skeleton-${index}`} />
                ))}
              </div>
            )}
          </div>

          {/* Desktop WhatsApp Banner */}
          <div className="hidden lg:col-span-1 lg:block">
            <div className="sticky top-12">
              <a
                href={whatsappChannelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="h-[670px] cursor-pointer overflow-hidden rounded-lg p-6"
              >
                <Image
                  src="/whatsapp_banner_desktop.png"
                  alt="Join WhatsApp Community"
                  width={440}
                  height={550}
                  className="h-auto w-full object-contain"
                  loading="lazy"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
