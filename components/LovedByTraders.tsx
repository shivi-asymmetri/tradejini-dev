"use client";
import Marquee from "react-fast-marquee";
import { useEffect, useState } from "react";

// Preload image to improve performance
const PROFILE_IMG =
  "https://firebasestorage.googleapis.com/v0/b/tradejini-42641.firebasestorage.app/o/Profile%2F001-profile.webp?alt=media&token=e687e457-483a-4535-b5c9-90129687f6b7";

const SOURCE_ICONS: Record<string, string> = {
  google:
    "https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA",
  x: "https://cdn-icons-png.flaticon.com/512/5968/5968958.png",
  playstore: "https://cdn-icons-png.flaticon.com/512/888/888857.png",
  appstore: "https://cdn-icons-png.flaticon.com/512/831/831276.png",
};

const Card = ({
  name,
  profile,
  rating,
  review,
  source,
}: {
  name: string;
  profile: string;
  rating: number;
  review: string;
  source: string;
}) => {
  const icon =
    SOURCE_ICONS[source?.toLowerCase() || ""] || SOURCE_ICONS["google"];

  return (
    <div className="mx-4 flex h-[28vh] max-h-[240px] items-start space-x-4 overflow-hidden rounded-lg border p-4 shadow-md max-md:h-[26vh] max-md:max-h-[210px] max-md:w-[92vw] md:w-[20vw]">
      <div className="flex-grow">
        <div className="flex h-[30px] items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-12">
              <img
                width={40}
                height={40}
                loading="lazy"
                className="aspect-square h-10 w-10 rounded-full object-cover"
                src={PROFILE_IMG}
                alt={`${name}'s profile`}
              />
            </div>
            <h3 className="text-lg font-semibold">{name}</h3>
          </div>
          <div className="h-8 w-8">
            <img
              width={32}
              height={32}
              loading="lazy"
              className="h-8 w-8 object-contain"
              src={icon}
              alt={`${source} icon`}
            />
          </div>
        </div>
        <div
          className="my-2 text-yellow-500"
          aria-label={`${rating} out of 5 stars`}
        >
          {"★".repeat(5)}
        </div>
        <p className="md:line-clamp-7 line-clamp-6 overflow-ellipsis text-sm text-gray-700">
          {review}
        </p>
      </div>
    </div>
  );
};

export default function LovedByTraders() {
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const reviewsData = await import("@/testimonials.json");
        setReviews(Array.from(reviewsData));
      } catch (error) {
        console.error("Failed to load reviews:", error);
        setReviews([]);
      }
    };

    loadReviews();
  }, []);

  return (
    <section id="testimonials">
      <div className="mb-10 px-5 md:mt-5 md:px-10 lg:px-20 xl:px-32">
        <h3 className="pb-3 text-center font-satoshi text-xl font-bold md:mt-10 md:text-3xl">
          Loved by traders <span className="text-[#005B6C]">across India!</span>
        </h3>
        <div className="mt-5 h-full space-y-4">
          <Marquee
            gradient={false}
            pauseOnClick
            pauseOnHover={false}
            direction="right"
          >
            {reviews.slice(0, 18).map((review, i) => (
              <div key={i} className="flex h-full">
                <Card {...review} />
              </div>
            ))}
          </Marquee>

          <Marquee
            gradient={false}
            pauseOnClick
            pauseOnHover={false}
            direction="left"
          >
            {reviews.slice(18).map((review, i) => (
              <div key={i}>
                <Card {...review} />
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
