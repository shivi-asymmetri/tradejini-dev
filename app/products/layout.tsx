import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Innovative Trading Solutions – Explore Tradejini Product Suite",
  description:
    "CubePlus Web or Mobile for trading, NxtOption for options, Mutual Fund Jini for investments, and Sparc to analyze performance - everything tailored to your needs.",
};
export default function ProductsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
