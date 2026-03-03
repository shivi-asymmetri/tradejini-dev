"use client"

import { usePathname } from "next/navigation";
import QRCodeScanner from "../components/QRCode";


export default function QRScannerWrapper() {
  const pathname = usePathname();

  if (pathname?.startsWith("/ipo")) return null;

  return <QRCodeScanner />;
}
