"use client";

import CubePlus from "@/assets/tabsSection/CubePlus";
import CubePlusMobile from "@/assets/tabsSection/CubePlusMobile";
import CubePlusAPI from "@/assets/tabsSection/CubePlusAPI";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

// @ts-expect-error I'm not importing types for this package
import shuffle from "shuffle-array";
import { Dropdown, TriggerWrapper } from "./Dropdown";
import Link from "next/link";
import { Input } from "./ui/input";
import { FaWhatsapp } from "react-icons/fa";
import {
  ArrowLeftIcon,
  ChevronDown,
  ChevronRight,
  Grid,
  Home,
  Layout,
  Search,
  StickyNote,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "./ui/button";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { WebEngage } from "@/utils/webengage";
import useBlogs from "@/context/BlogContext";
import { SC } from "./SkeletonLoader";
import { BlogType, BlogsResponse } from "@/types/BlogType";
import NxtoptionNav from "@/assets/tabsSection/NxtoptionNav";
import Sparc from "@/assets/tabsSection/Sparc";
import CubePlusAPINav from "@/assets/tabsSection/CubePlusAPINav";
import CubePlusNav from "@/assets/tabsSection/CubePlusNav";
import { smoothScrollToTop } from "@/utils/smoothScroll";

interface CategoryType {
  id: string;
  name: string;
  slug: string;
  count: number;
  isActive?: boolean;
}

interface BlogContextData {
  regularBlogs: BlogsResponse;
  categories: CategoryType[];
  tags: Array<{
    id: number;
    tag: string;
    color: string;
  }>;
}

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [desktopHam, setDesktopHam] = useState(false);
  const [isHoverCardOpen, setIsHoverCardOpen] = useState(false);
  const preventReopenRef = useRef(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const router = useRouter();

  // Handle Press Coverage click - navigate to page and scroll to top
  const handlePressCoverageClick = async (e: React.MouseEvent) => {
    e.preventDefault();

    // Close mobile menu if open
    setIsMobileMenuOpen(false);
    // Close desktop menu if open
    setDesktopHam(false);

    // If already on press-coverage page, just scroll to top
    if (path === "/press-coverage") {
      await smoothScrollToTop({ duration: 800 });
      // Trigger a custom event to reset the section in Articles component
      window.dispatchEvent(new CustomEvent("resetToLatestArticles"));
    } else {
      // Navigate to press coverage page
      router.push("/press-coverage");
    }
  };

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const path = usePathname();
  const isProductsPage = path === "/products";

  const [sub, setSub] = useState<keyof typeof options | null>(null);

  useEffect(() => {
    if (!isMobileMenuOpen) setSub(null);
  }, [isMobileMenuOpen]);

  const options = {
    Trader: [
      {
        name: "Futures*",
        link: "#",
      },
      {
        name: "Options*",
        link: "#",
      },
      {
        name: "Commodities*",
        link: "#",
      },
      {
        name: "Algo Traders",
        link: "/api",
      },
    ],
    Investor: [
      { name: "IPO", link: "/ipo" },
      { name: "Mutual Funds*", link: "#" },
      { name: "Bonds*", link: "#" },
      { name: "Stocks*", link: "#" },
    ],
    Learn: [
      {
        name: "Jiniversity",
        link: "/blogs",
        onClick: () => {
          handleWebEngage(
            "jiniversity_menu_section",
            "Blogs",
            "Jiniversity",
            "https://www.tradejini.com/blogs",
          );
        },
      },

      {
        name: "Business Decoder",
        link: "/decoders",
      },
      { name: "Finance Kickstarter", link: "/finance-kickstarter" },
      { name: "Chart Speaks", link: "/chart-speaks" },
    ],
    "Quick Links": [
      { name: "Calculators", link: "/calculators" },
      { name: "Funds", link: "/fundTransfer" },
      { name: "Holiday Calendar", link: "/holiday-page" },
      {
        name: "Community",
        link: "https://t.me/+6Z5zFndHZDExYmY1",
        target: "_blank",
      },
      // { name: "Global Markets", link: "#" },
    ],
    Updates: [
      { name: "About Us", link: "/about-us" },
      { name: "Press Coverage", link: "/press-coverage" },
      { name: "Podcasts", link: "/press-coverage#podcasts" },
      // { name: "Bulletins", link: "#" },
      { name: "Whatsapp", link: "https://wa.me/6363809751" },
    ],
  };

  const desktopMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        desktopMenuRef.current &&
        !desktopMenuRef.current.contains(event.target as Node)
      ) {
        setDesktopHam(false);
      }
    }

    if (desktopHam) {
      document.addEventListener("mousedown", handleClickOutside);
    }
  }, [isMobileMenuOpen, desktopHam]);

  const { regularBlogs, categories } = useBlogs() as unknown as {
    regularBlogs: BlogsResponse | undefined;
    categories: CategoryType[] | undefined;
    tags:
      | Array<{
          id: number;
          tag: string;
          color: string;
        }>
      | undefined;
  };

  const handleWebEngage = (
    eventName: string,
    source: string,
    label: string,
    url: string,
  ) => {
    try {
      WebEngage(eventName, source, label, url);
    } catch (error) {
      console.error("WebEngage error:", error);
    }
  };

  const handleLinkClick = () => {
    setIsHoverCardOpen(false);

    preventReopenRef.current = true;

    setTimeout(() => {
      preventReopenRef.current = false;
    }, 500);
  };

  const handleOpenChange = (open: boolean) => {
    if (open && preventReopenRef.current) {
      return;
    }
    setIsHoverCardOpen(open);
  };

  return (
    <>
      <header className={"navbar-root sticky top-0 z-[999999]"}>
        <div
          className={`relative flex items-center justify-between px-6 py-3 ${isProductsPage ? "bg-black" : "bg-white"}`}
        >
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a
            href="/"
            onClick={(e) => {
              console.log("Logo clicked!");
              setIsMobileMenuOpen(false);
            }}
          >
            <img
              alt="logo"
              className="w-40"
              // width={1000}
              // height={1000}
              src={isProductsPage ? "/logo_white.svg" : "/logo.svg"}
            />
          </a>
          <div
            className={`hidden items-center lg:flex ${isProductsPage ? "text-white" : ""}`}
          >
            <Dropdown>
              <TriggerWrapper>
                <Link
                  href={"/products"}
                  className={isProductsPage ? "text-white" : ""}
                >
                  Products
                </Link>
                <Link
                  href={"/pricing"}
                  className={isProductsPage ? "text-white" : ""}
                >
                  Pricing
                </Link>
                <Link
                  href={"/support"}
                  className={isProductsPage ? "text-white" : ""}
                >
                  Support
                </Link>
              </TriggerWrapper>
            </Dropdown>
            <HoverCard
              openDelay={0}
              closeDelay={200}
              open={isHoverCardOpen}
              onOpenChange={handleOpenChange}
            >
              <HoverCardTrigger asChild>
                <Button
                  variant={"secondary"}
                  className={`group flex items-center bg-transparent ${isProductsPage ? "text-white hover:text-white/80 hover:bg-white/10" : "text-neutral-950 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800"}`}
                  onClick={(e) => {
                    if (preventReopenRef.current) return;
                    setIsHoverCardOpen(!isHoverCardOpen);
                  }}
                >
                  <div>Blogs</div>{" "}
                  <ChevronDown
                    size={12}
                    className={`duration-200 ${isHoverCardOpen ? "rotate-180" : ""}`}
                  ></ChevronDown>
                </Button>
              </HoverCardTrigger>
              <HoverCardContent
                className={`flex min-w-[900px] divide-x-[1px] ${isProductsPage ? "divide-white/20 bg-black border-white/20" : "divide-zinc-200"}`}
                onPointerDownOutside={() => setIsHoverCardOpen(false)}
              >
                <div className="w-2/5 space-y-3 p-5">
                  <div
                    className={`w-full font-poppins text-sm font-semibold opacity-70 ${isProductsPage ? "text-white" : ""}`}
                  >
                    Top Blogs Category
                  </div>
                  <div className="space-y-2">
                    <div className="space-y-2">
                      <Link
                        href={"/blogs#featuredblogs"}
                        className={`group flex h-20 w-full items-center gap-2 rounded-lg p-2 ${isProductsPage ? "hover:bg-white/10 text-white" : "hover:bg-zinc-200"}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLinkClick();
                        }}
                      >
                        <div className="rounded-full bg-themeGreen p-2 text-white">
                          <StickyNote size={20} className=""></StickyNote>
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1">
                            <p>Featured Blogs</p>{" "}
                            <ChevronRight
                              className="duration-300 group-hover:translate-x-3"
                              size={12}
                            ></ChevronRight>
                          </div>
                        </div>
                      </Link>
                      <Link
                        href={"/blogs#recentblogs"}
                        className={`group flex h-20 w-full items-center gap-2 rounded-lg p-2 ${isProductsPage ? "hover:bg-white/10 text-white" : "hover:bg-zinc-200"}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLinkClick();
                        }}
                      >
                        <div className="rounded-full bg-themeGreen p-2 text-white">
                          <StickyNote size={20} className=""></StickyNote>
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1 font-poppins">
                            <p>Recent Blogs</p>{" "}
                            <ChevronRight
                              className="duration-300 group-hover:translate-x-3"
                              size={12}
                            ></ChevronRight>
                          </div>
                        </div>
                      </Link>
                      <Link
                        href={"/blogs#editorspicks"}
                        className={`group flex h-20 w-full items-center gap-2 rounded-lg p-2 ${isProductsPage ? "hover:bg-white/10 text-white" : "hover:bg-zinc-200"}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLinkClick();
                        }}
                      >
                        <div className="rounded-full bg-themeGreen p-2 text-white">
                          <StickyNote size={20} className=""></StickyNote>
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1 font-poppins">
                            <p>Editor&apos;s Picks</p>{" "}
                            <ChevronRight
                              className="duration-300 group-hover:translate-x-3"
                              size={12}
                            ></ChevronRight>
                          </div>
                        </div>
                      </Link>
                      <Link
                        href={"/blogs#allblogs"}
                        className={`group flex h-20 w-full items-center gap-2 rounded-lg p-2 ${isProductsPage ? "hover:bg-white/10 text-white" : "hover:bg-zinc-200"}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLinkClick();
                        }}
                      >
                        <div className="rounded-full bg-themeGreen p-2 text-white">
                          <StickyNote size={20} className=""></StickyNote>
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1 font-poppins">
                            <p>All Blogs</p>{" "}
                            <ChevronRight
                              className="duration-300 group-hover:translate-x-3"
                              size={12}
                            ></ChevronRight>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="w-3/5 p-5">
                  <div
                    className={`w-full font-poppins text-sm font-semibold opacity-70 ${isProductsPage ? "text-white" : ""}`}
                  >
                    Latest from our blogs
                  </div>
                  <div className="flex h-full gap-2">
                    {regularBlogs?.blogs && regularBlogs.blogs.length > 0 ? (
                      regularBlogs.blogs
                        .filter(
                          (blog: BlogType) =>
                            blog.isPublished && blog.publication_iso_date,
                        )
                        .sort((a: BlogType, b: BlogType) => {
                          try {
                            // Ensure we have valid dates before parsing
                            if (
                              !a.publication_iso_date ||
                              !b.publication_iso_date
                            ) {
                              return 0;
                            }

                            // Parse dates directly from the ISO string format
                            const dateA = new Date(a.publication_iso_date);
                            const dateB = new Date(b.publication_iso_date);

                            // Debug log
                            console.log("Sorting dates:", {
                              blogA: a.title,
                              dateA: dateA.toISOString(),
                              blogB: b.title,
                              dateB: dateB.toISOString(),
                            });

                            // Sort in descending order (newest first)
                            return dateB.getTime() - dateA.getTime();
                          } catch (error) {
                            console.error("Error sorting blogs:", error);
                            return 0;
                          }
                        })
                        .slice(0, 2)
                        .map((blog: BlogType, i: number) => (
                          <Link
                            href={"/blogs/" + blog.permalink}
                            key={`navbar-blog-${i}`}
                            className={`h-full w-1/2 space-y-3 rounded-lg ${isProductsPage ? "bg-black" : "bg-white"} p-3 shadow-md`}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleLinkClick();
                            }}
                          >
                            <SC
                              checker={blog.coverImageSrc}
                              className="h-32"
                              skeley="h-32"
                            >
                              <img
                                src={blog.coverImageSrc || "/c.png"}
                                alt={blog.coverImageAlt || "Blog cover image"}
                                className="h-32 w-full rounded-t-lg object-cover"
                              />
                            </SC>
                            <h2
                              className={`line-clamp-2 font-poppins text-base font-medium ${isProductsPage ? "text-white" : ""}`}
                            >
                              {blog.title}
                            </h2>
                            <p
                              className={`font-inter text-sm ${isProductsPage ? "text-white/70" : "text-[#1D1D1D80]"}`}
                            >
                              {blog.readingTime}
                            </p>
                            <p
                              className={`font-inter text-sm ${isProductsPage ? "text-white/70" : "text-[#1D1D1D80]"}`}
                            >
                              {blog.author?.name}
                            </p>
                            <p
                              className={`font-inter text-sm ${isProductsPage ? "text-white/70" : "text-[#1D1D1D80]"}`}
                            >
                              {blog.publicationDate}
                            </p>
                            {blog.category && (
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  handleLinkClick();
                                  router.push(
                                    "/blogs/category/" + blog.category?.slug,
                                  );
                                }}
                                className="mt-2 inline-block rounded bg-[#EDFAF4] px-2 py-1 font-poppins text-base font-normal text-[#0A787A]"
                              >
                                {blog.category.name}
                              </button>
                            )}
                          </Link>
                        ))
                    ) : (
                      <div
                        className={`w-full py-4 text-center ${isProductsPage ? "text-white/70" : "text-gray-500"}`}
                      >
                        Loading blogs...
                      </div>
                    )}
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>

          {/* Hamburger Icon */}
          <button
            className={`lg:hidden ${isProductsPage ? "text-white" : "text-themeGreen"}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Menu */}
          <AnimatePresence mode="wait">
            <motion.div
              initial={{
                height: 0,
              }}
              animate={{
                height: isMobileMenuOpen ? "100vh" : 0,
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute left-0 top-full z-30 h-full w-full overflow-hidden text-end text-sm font-semibold shadow-lg lg:hidden"
            >
              <motion.div
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                  stiffness: 1000,
                }}
                initial={{ x: "100%" }}
                animate={{ x: sub ? 0 : "100%" }}
                className={`absolute left-0 top-0 z-40 h-full w-full overflow-hidden px-5 py-5 font-medium ${isProductsPage ? "bg-black text-white" : "bg-white"}`}
              >
                <button
                  onClick={() => setSub(null)}
                  className="dropdown-heading flex flex-row items-center gap-x-4 pb-2 font-semibold"
                >
                  <ArrowLeftIcon />
                  {sub}
                </button>
                <hr className={isProductsPage ? "border-white/30" : ""} />

                <div className="mt-4 flex flex-col">
                  {sub &&
                    options[sub].map(({ name, link }) => (
                      <Link
                        onClick={(e) => {
                          if (name === "Press Coverage") {
                            handlePressCoverageClick(e);
                          } else {
                            setIsMobileMenuOpen(false);
                            setSub(null);
                          }
                        }}
                        className={`dropdown-heading flex flex-row items-center justify-between border-b py-4 text-start last:border-none ${isProductsPage ? "border-b-white/30" : "border-b-black/30"}`}
                        key={name}
                        href={link}
                      >
                        {name}
                      </Link>
                    ))}
                </div>
              </motion.div>

              <motion.div
                transition={{ duration: 0.3, staggerChildren: 0.2 }}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: isMobileMenuOpen ? 1 : 0,
                }}
                className={`flex h-full w-full flex-col space-y-4 overflow-hidden px-5 py-2 text-start font-satoshi text-sm font-medium lg:hidden ${isProductsPage ? "bg-black text-white" : "bg-white"}`}
              >
                <div
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                  }}
                  className="grid grid-cols-2 gap-4"
                >
                  <Link
                    className="dropdown-heading"
                    target="_blank"
                    href={"https://cp.tradejini.com/Ox1Ux9?"}
                  >
                    Open Account
                  </Link>
                  <Link className="dropdown-heading" href={"/about-us"}>
                    Who we are?
                  </Link>
                  <Link className="dropdown-heading" href={"/products"}>
                    Products
                  </Link>

                  <Link className="dropdown-heading" href="/fundTransfer">
                    Funds
                  </Link>
                  <Link className="dropdown-heading" href={"/pricing"}>
                    Pricing
                  </Link>
                  <Link
                    className="dropdown-heading flex items-center gap-1"
                    href="https://wa.me/6363809751"
                    target="_blank"
                  >
                    <FaWhatsapp className="text-green-500" /> Chat now
                  </Link>

                  <Link href={"/support"}>Support</Link>

                  <Link href="/press-coverage" onClick={handlePressCoverageClick}>
                    Press Coverage{" "}
                  </Link>
                  <Link href="/press-coverage#podcasts">Podcasts</Link>
                  <Link
                    className="dropdown-heading flex items-center gap-1"
                    href="https://t.me/+6Z5zFndHZDExYmY1"
                    target="_blank"
                  >
                    <FaWhatsapp className="text-green-500" /> Community
                  </Link>
                  <Link className="dropdown-heading" href="/calculators">
                    Calculators
                  </Link>
                  <Link className="dropdown-heading" href="/api">
                    Algo Traders
                  </Link>
                  <Link className="dropdown-heading" href="/holiday-page">
                    Holiday Calendar
                  </Link>
                  <Link className="dropdown-heading" href="/chart-speaks">
                    Chart Speaks
                  </Link>
                </div>
                <hr className={isProductsPage ? "border-white/30" : ""} />
                <div
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                  }}
                  className="grid grid-cols-2 place-items-center gap-2 gap-y-3 fill-[#19AC63] text-center"
                >
                  <a
                    target="_blank"
                    href="https://cp.tradejini.com/dashboard"
                    className="flex h-12 w-full flex-row items-center justify-start gap-x-2"
                  >
                    <CubePlusNav />
                    <p className="dropdown-heading">CubePlus</p>
                  </a>
                  <a
                    target="_blank"
                    href="https://userguide-bo.tradejini.com/"
                    className="flex h-12 w-full flex-row items-center justify-start gap-x-2"
                  >
                    <Sparc />
                    <p className="dropdown-heading">Hive</p>
                  </a>
                  <a
                    href="/api"
                    className="flex h-12 w-full flex-row items-center justify-start gap-x-2"
                  >
                    <CubePlusAPINav />
                    <p className="dropdown-heading">CubePlus API</p>
                  </a>
                  <a
                    target="_blank"
                    href="https://app.nxtoption.com/auth/login"
                    className="flex h-12 w-full flex-row items-center justify-start gap-x-2"
                  >
                    <NxtoptionNav />
                    <p className="dropdown-heading">NxtOption</p>
                  </a>
                  <Link
                    href="/blogs"
                    className="flex h-12 w-full flex-row items-center justify-start gap-x-2"
                  >
                    <div className="h-5">
                      <img
                        src="/jiniversity.png"
                        className="h-8 w-auto object-contain"
                        alt="jiniversity"
                      />
                    </div>
                    <p className="dropdown-heading mt-2">Jiniversity</p>
                  </Link>

                  <Link
                    href="/ipo"
                    className="flex h-12 w-full flex-row items-center justify-start gap-x-2"
                  >
                    <div className="h-5">
                      <img
                        src="/navbaricons/ipo.webp"
                        className="h-8 w-auto object-contain"
                        alt="IPO"
                      />
                    </div>
                    <p className="dropdown-heading mt-4">IPO</p>
                  </Link>
                </div>
                <hr className={isProductsPage ? "border-white/30" : ""} />
                <div className="grid grid-cols-2 gap-2 gap-y-3">
                  {Object.keys(options).map((k) => (
                    <button
                      className="dropdown-heading flex flex-row items-center justify-start gap-x-3 py-2.5 text-start"
                      key={k}
                      onClick={() => setSub(k as keyof typeof options)}
                    >
                      {k}
                      <ArrowLeftIcon className="dropdown-heading h-3 rotate-180" />
                    </button>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-6 max-md:hidden">
            <div className="relative hidden">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-themeGreen">
                <Search size={20} />
              </div>
              <Input className="border-themeGreen pl-10" placeholder="Search" />
            </div>
            <div className="flex items-center justify-center gap-6">
              <Link
                target="_blank"
                href="https://cubeplus.tradejini.com/auth/login"
              >
                <button
                  onClick={() =>
                    WebEngage(
                      "login",
                      "Home",
                      "Login",
                      "https://cubeplus.tradejini.com/auth/login",
                    )
                  }
                  className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm ${isProductsPage ? "bg-white text-black hover:bg-gray-200" : "bg-white from-gradientFrom to-gradientTo text-black hover:bg-gradient-to-r hover:text-white"}`}
                >
                  Login
                </button>
              </Link>
              <Link target="_blank" href={"https://cp.tradejini.com/Ox1Ux9"}>
                <Button
                  onClick={() => {
                    handleWebEngage(
                      "open_account",
                      "Home",
                      "Open Account",
                      "https://ekyc.tradejini.com/#/onboarding",
                    );
                  }}
                  className="bg-gradient-to-r from-gradientFrom to-gradientTo"
                >
                  Open Account
                </Button>
              </Link>
            </div>
            <button
              className={`max-lg:hidden ${isProductsPage ? "text-white" : "text-[#26acca]"}`}
              onClick={() => setDesktopHam((x) => !x)}
            >
              {desktopHam ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          <div
            className="absolute left-[29%] top-[120%] w-[70%] overflow-hidden rounded-[40px] text-end text-sm font-semibold shadow-lg max-lg:hidden"
            ref={desktopMenuRef}
          >
            <AnimatePresence mode="wait">
              <motion.div
                initial={{
                  height: 0,
                }}
                animate={{
                  height: desktopHam ? "fit-content" : 0,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <motion.div
                  transition={{ duration: 0.3, staggerChildren: 0.2 }}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: desktopHam ? 1 : 0,
                  }}
                  onClick={() => {
                    setDesktopHam(false);
                  }}
                  className={`flex w-full flex-col space-y-4 overflow-hidden px-8 py-10 text-start font-satoshi font-medium max-lg:hidden ${isProductsPage ? "bg-black text-white" : "bg-white"}`}
                >
                  <div className="grid grid-cols-6 place-items-center gap-3 fill-[#19AC63]">
                    <a
                      target="_blank"
                      href="https://cp.tradejini.com/dashboard"
                      className="flex flex-col items-center gap-y-3"
                    >
                      <CubePlusNav />
                      <p className="dropdown-heading">CubePlus</p>
                    </a>
                    <a
                      target="_blank"
                      href="https://userguide-bo.tradejini.com/"
                      className="flex flex-col items-center gap-y-3"
                    >
                      <Sparc />
                      <p className="dropdown-heading">Hive</p>
                    </a>
                    <a href="/api" className="flex flex-col items-center gap-y-3">
                      <CubePlusAPINav />
                      <p className="dropdown-heading">CubePlus API</p>
                    </a>
                    <a
                      target="_blank"
                      href="https://app.nxtoption.com/auth/login"
                      className="flex flex-col items-center gap-y-3"
                    >
                      <NxtoptionNav />
                      <p className="dropdown-heading">NxtOption</p>
                    </a>
                    <Link
                      onClick={() => {
                        handleWebEngage(
                          "jiniversity_menu_section",
                          "Blogs",
                          "Jiniversity",
                          "https://www.tradejini.com/blogs",
                        );
                      }}
                      href="/blogs"
                      className="flex flex-col items-center gap-y-3"
                    >
                      <div className="h-9">
                        <img
                          src="/jiniversity.png"
                          className="h-full w-auto object-contain"
                          alt="Jiniversity"
                        />
                      </div>
                      <p className="dropdown-heading">Jiniversity</p>
                    </Link>

                    <Link href="/ipo" className="flex flex-col items-center gap-y-3">
                      <div className="h-10">
                        <img
                          src="/navbaricons/ipo.webp"
                          className="h-full w-auto object-contain"
                          alt="IPO"
                        />
                      </div>
                      <p className="dropdown-heading">IPO</p>
                    </Link>
                  </div>

                  <hr className={isProductsPage ? "border-white/30" : ""} />
                  <div className="grid grid-cols-5 place-items-center gap-3 *:h-full">
                    <div className="space-y-4 font-bold">
                      <h4 className="dropdown-heading text-xl font-bold">
                        Trader
                      </h4>
                      <div
                        className={`flex flex-col gap-y-2 ${isProductsPage ? "text-white/70" : "text-black/40"}`}
                      >
                        <Link href="">Futures*</Link>
                        <Link href="">Options*</Link>
                        <Link href="">Commodities*</Link>
                        <Link href="/api">Algo Traders</Link>
                      </div>
                    </div>
                    <div className="space-y-4 font-bold">
                      <h4 className="dropdown-heading text-xl font-bold">
                        Investor
                      </h4>
                      <div
                        className={`flex flex-col gap-y-2 ${isProductsPage ? "text-white/70" : "text-black/40"}`}
                      >
                        <Link href="/ipo">IPO</Link>
                        {/* hehe */}
                        <Link href="">Mutual Funds*</Link>
                        <Link href="">Bonds*</Link>
                        <Link href="">Stocks*</Link>
                      </div>
                    </div>
                    <div className="space-y-4 font-bold">
                      <h4 className="dropdown-heading text-xl font-bold">
                        Learn
                      </h4>
                      <div
                        className={`flex flex-col gap-y-2 ${isProductsPage ? "text-white/70" : "text-black/40"}`}
                      >
                        <Link
                          onClick={() => {
                            handleWebEngage(
                              "jiniversity_menu_section",
                              "Blogs",
                              "Jiniversity",
                              "https://www.tradejini.com/blogs",
                            );
                          }}
                          href="/blogs"
                        >
                          Jiniversity
                        </Link>

                        <Link href="/decoders" target="_blank">
                          Business Decoder
                        </Link>
                        <Link href="/finance-kickstarter" target="_blank">
                          Finance Kickstarter
                        </Link>
                        <Link href="/chart-speaks" target="_blank">
                          Chart Speaks
                        </Link>
                        {/* <Link href="/podcast">Podcast</Link> */}
                      </div>
                    </div>
                    <div className="space-y-4 font-bold">
                      <h4 className="dropdown-heading text-xl font-bold">
                        Quick Links
                      </h4>
                      <div
                        className={`flex flex-col gap-y-2 ${isProductsPage ? "text-white/70" : "text-black/40"}`}
                      >
                        {/* <Link href="/brokerage-calculator">
                            Brokerage Calculator
                          </Link> */}
                        {/* <Link href="/calculator">Margin Calculator</Link> */}
                        <Link href="/calculators">Calculators</Link>
                        <Link href="/fundTransfer">Funds</Link>
                        <Link href="/holiday-page">Holiday Calendar</Link>
                        <Link
                          className="flex items-center gap-1"
                          href="https://whatsapp.com/channel/0029VaylTGWADTOHkEncTU14"
                          target="_blank"
                        >
                          <FaWhatsapp className="text-green-500" /> Community
                        </Link>

                        {/* <Link href="">Global Markets</Link> */}
                      </div>
                    </div>
                    <div className="space-y-4 font-bold">
                      <h4 className="dropdown-heading text-xl font-bold">
                        Updates
                      </h4>
                      <div
                        className={`flex flex-col gap-y-2 ${isProductsPage ? "text-white/70" : "text-black/40"}`}
                      >
                        <Link href="/about-us">Who we are?</Link>
                        <Link
                          href="/press-coverage"
                          onClick={handlePressCoverageClick}
                        >
                          Press Coverage
                        </Link>
                        <Link href="/press-coverage#podcasts">Podcasts</Link>
                        {/* <Link href="">Bulletins</Link> */}

                        <Link
                          className="flex items-center gap-1"
                          href="https://wa.me/6363809751"
                          target="_blank"
                        >
                          <FaWhatsapp className="text-green-500" />
                          Chat now{" "}
                        </Link>
                      </div>
                    </div>
                    <a
                      className="hidden"
                      target="_blank"
                      href={"https://cp.tradejini.com/Ox1Ux9"}
                    >
                      <Button className="bg-gradient-to-r from-gradientFrom to-gradientTo">
                        Open Account
                      </Button>
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </header>
    </>
  );
}

