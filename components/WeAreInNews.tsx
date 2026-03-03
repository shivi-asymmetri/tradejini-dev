"use client";
import { memo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import mediaArticles from "@/data/media_articles";
import Link from "next/link";

const NewsSlide = memo(({ item }: { item: any }) => (
  <Link
    href={item["Link of the publication"]}
    target="_blank"
    rel="noopener noreferrer"
    className="block h-full"
  >
    <img
      src={item["Image of the Publication"]}
      alt={item["Publication"]}
      className="mx-auto h-[5vh] object-contain md:h-[10vh]"
      loading="lazy"
    />
    <p className="mt-5 line-clamp-4 h-[5em] overflow-ellipsis text-center leading-normal max-md:text-xs">
      {item["Content Title"]}
    </p>
  </Link>
));

NewsSlide.displayName = "NewsSlide";

const swiperConfig = {
  modules: [Autoplay, Navigation],
  breakpoints: {
    0: {
      slidesPerView: 1,
      spaceBetween: 25,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 50,
    },
  },
  autoplay: { delay: 2000 },
  loop: true,
  speed: 500,
};

export default function WeAreInNews() {
  const newsArticles = mediaArticles.slice(0, 10);

  return (
    <section id="News">
      <div className="px-5 pt-20 md:px-10 lg:px-20 xl:px-32">
        <h3 className="mb-4 text-center font-satoshi text-xl font-bold md:text-3xl">
          We are in{" "}
          <Link
            href="/press-coverage"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#005B6C]"
          >
            the News
          </Link>
        </h3>
        <Swiper {...swiperConfig}>
          {newsArticles.map((item, idx) => (
            <SwiperSlide
              key={idx}
              className="my-4 h-[20vh] rounded-[40px] border border-black/10 px-5 py-10 font-satoshi shadow-lg md:px-10"
            >
              <NewsSlide item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
