"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function KnowledgeBaseButton() {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    // First scroll to the approximate position
    const headerHeight = 200; // Match the scroll-mt-[200px] value
    const yOffset = -headerHeight;
    const y = window.scrollY + yOffset;

    window.scrollTo({
      top: y,
      behavior: "auto",
    });

    // Then navigate to the page
    router.push("/support/knowledge-base/#content", { scroll: false });

    // After navigation, ensure we're at the right position when content loads
    const attemptScroll = () => {
      const contentSection = document.getElementById("content");
      if (contentSection) {
        const y =
          contentSection.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({
          top: y,
          behavior: "auto",
        });
      } else {
        setTimeout(attemptScroll, 100);
      }
    };

    setTimeout(attemptScroll, 500);
  };

  return (
    <Link
      href="/support/knowledge-base/#content"
      className="inline-block scroll-mt-[200px] rounded-md bg-[#006B7D] px-6 py-2.5 text-white transition-colors hover:bg-opacity-90"
      onClick={handleClick}
    >
      Knowledge Base
    </Link>
  );
}
