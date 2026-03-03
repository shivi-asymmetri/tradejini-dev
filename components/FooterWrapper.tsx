"use client";

import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { useNotFound } from "@/context/NotFoundContext";

const Footer = dynamic(() => import("@/components/Footer"), {
  loading: () => null,
});

export default function FooterWrapper() {
  const pathname = usePathname();
  const { isNotFound } = useNotFound();

  const isDecodersRoute = pathname?.startsWith("/decoders");

  if (isDecodersRoute || isNotFound) {
    return null;
  }

  return <Footer />;
}
