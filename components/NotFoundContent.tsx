"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function NotFoundContent() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0A0B16] px-4 text-center text-white">
      <Image
        src="/404_error_image.svg"
        alt="Page Not Found"
        width={400}
        height={300}
      />
      <button
        onClick={() => router.back()}
        className="mt-6 rounded bg-gradient-to-r from-gradientFrom to-gradientTo px-4 py-2 text-white hover:opacity-90"
      >
        Go Back
      </button>
    </div>
  );
}
