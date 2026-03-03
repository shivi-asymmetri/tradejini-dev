"use client";

import { ArrowBigLeft, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function RouteButtons() {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center">
      <Button
        className="p-[2px]"
        onClick={() => {
          router.back();
        }}
        variant={"link"}
      >
        <ArrowLeft color="white"></ArrowLeft>
      </Button>
      <Button
        className="p-[2px]"
        onClick={() => {
          router.forward();
        }}
        variant={"link"}
      >
        <ArrowRight color="white"></ArrowRight>
      </Button>
    </div>
  );
}

// Gopal animations lol
