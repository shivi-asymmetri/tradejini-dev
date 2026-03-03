"use client";
import { WebEngage } from "@/utils/webengage";

export default function VideoSection() {
  return (
    <>
      <div className="mt-10 px-0 font-satoshi md:mt-20 md:px-10 lg:px-20 xl:px-32">
        <h3 className="text-center text-xl font-bold md:text-3xl">
          Discover Learn Engage
        </h3>
      </div>

      <div className="my-10 grid grid-cols-1 gap-6 px-5 md:grid-cols-3 md:px-32">
        <div className="overflow-hidden rounded-[30px] hover:bg-[rgb(243,235,254)]">
          <a
            href="/about-us-gallery"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              WebEngage(
                "webinars",
                "Home",
                "Play Video",
                "/about-us-gallery",
              )
            }
          >
            <img
              src="m-event.webp"
              srcSet="m-event-mobile.webp 400w, m-event.webp 800w"
              sizes="(max-width: 768px) 400px, 800px"
              alt="Webinar"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </a>
        </div>

        <div className="overflow-hidden rounded-[30px] hover:bg-[rgb(243,232,224)]">
          <a
            href="https://userguide-cp.tradejini.com/index.html"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              WebEngage(
                "product_guide",
                "Home",
                "Product Guide",
                "https://userguide-cp.tradejini.com/index.html",
              )
            }
          >
            <img
              src="m-books.webp"
              srcSet="m-books-mobile.webp 400w, m-books.webp 800w"
              sizes="(max-width: 768px) 400px, 800px"
              alt="Product Guide"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </a>
        </div>

        <div className="overflow-hidden rounded-[30px] hover:bg-[rgb(225,245,234)]">
          <a
            href="https://www.youtube.com/playlist?list=PLc5V-uHHLlNzWQL4W0Zmvt1_0rIytiYKp"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              WebEngage(
                "quick_videos",
                "Home",
                "Quick Videos",
                "https://www.youtube.com/watch?v=I8Z-1Zz-fkA",
              )
            }
          >
            <img
              src="m-video.webp"
              srcSet="m-video-mobile.webp 400w, m-video.webp 800w"
              sizes="(max-width: 768px) 400px, 800px"
              alt="Quick Videos"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </a>
        </div>
      </div>
    </>
  );
}
