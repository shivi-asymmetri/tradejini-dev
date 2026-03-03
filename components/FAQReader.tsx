"use client";

import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

// import "@/app/question.css";

export default function FAQReader({
  content,
  title,
}: {
  content: string;
  title: string;
}) {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <Button
        onClick={() => {
          router.back();
        }}
      >
        <ArrowLeft></ArrowLeft> Back
      </Button>
      <h1 className="border-b-2 border-zinc-200 text-xl font-semibold">
        {title}
      </h1>
      <Markdown rehypePlugins={[rehypeRaw]}>{content}</Markdown>
    </div>
  );
}
