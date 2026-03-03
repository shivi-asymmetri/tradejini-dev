"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import FadeInWrapper from "./FadeInWrapper";
import useBlogs from "@/context/BlogContext";
import { useEffect, useState } from "react";
import { BlogType, BlogsResponse } from "@/types/BlogType";
import Link from "next/link";

export default function ExploreOurLatestBlogs() {
  const { regularBlogs } = useBlogs() as unknown as {
    regularBlogs: BlogsResponse | undefined;
  };

  const sortedBlogs = regularBlogs?.blogs
    ?.filter((blog: BlogType) => blog.isPublished)
    .sort((a: BlogType, b: BlogType) => {
      const dateA = new Date(a.publicationDate.toLowerCase());
      const dateB = new Date(b.publicationDate.toLowerCase());
      return dateB.getTime() - dateA.getTime();
    })
    .slice(0, 10);

  return (
    <FadeInWrapper>
      <div className="px-5 md:px-10 lg:px-20 xl:px-32">
        <h3 className="mb-6 mt-5 py-2 pb-3 text-center font-satoshi text-xl font-bold md:mt-20 md:text-3xl">
          Explore Our{" "}
          <Link
            href="/blogs"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#005B6C]"
          >
            Latest Blogs
          </Link>
        </h3>
        {sortedBlogs && sortedBlogs.length > 0 ? (
          <Swiper
            modules={[Autoplay]}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 25,
              },
              600: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1200: {
                slidesPerView: 3,
                spaceBetween: 50,
              },
            }}
            loop={sortedBlogs.length > 3}
            autoplay={{
              delay: 2500,
              disableOnInteraction: true,
              pauseOnMouseEnter: true,
            }}
            speed={800}
          >
            {sortedBlogs.map((blog: BlogType, idx: number) => (
              <SwiperSlide key={idx} className="my-3 h-[500px]">
                <Link
                  href={`/blogs/${blog.permalink}`}
                  target="_blank"
                  className="grid h-full md:grid-rows-[300px_80px] overflow-hidden rounded-[40px] border border-[#999999]/70 font-satoshi"
                >
                  <div className="overflow-hidden">
                    <img
                      src={blog.coverImageSrc || "/c.png"}
                      alt={blog.coverImageAlt || "Blog cover image"}
                      className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                      loading="lazy"
                      sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="flex items-center border-t border-t-[#999999]/70 px-5 py-3 md:px-10">
                    <h4 className="w-full overflow-hidden text-ellipsis text-center text-sm font-bold leading-snug md:text-lg">
                      {blog.title}
                    </h4>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="py-10 text-center text-gray-500">
            Loading blogs...
          </div>
        )}
      </div>
    </FadeInWrapper>
  );
}
