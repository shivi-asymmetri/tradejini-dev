"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import useAuth from "@/context/AuthContext";
import {
  LogOut,
  FileText,
  LayoutDashboard,
  BookOpen,
  Briefcase,
  Menu,
  LogIn,
  Users,
  Code,
  ReceiptIndianRupee,
  Images,
  ChartCandlestick,
  BarChart3,
  Clapperboard,
} from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function AdminSidebar() {
  const path = usePathname();
  const router = useRouter();
  const { user, hasAccess, loading } = useAuth()!;

  const handleLogout = async () => {
    await signOut(auth);
    window.location.reload();
  };

  const isActive = (route: string, exact: boolean = false) => {
    if (exact) {
      return path === route;
    }
    // Use startsWith for broader matching of module paths
    return path?.startsWith(route);
  };

  const menuItems = [
    {
      module: "blogs",
      icon: FileText,
      label: "Blogs",
      href: "/admin/dashboard/blogs",
      color: "text-themeGreen",
    },
    {
      module: "knowledge-base",
      icon: BookOpen,
      label: "Knowledge Base",
      href: "/admin/dashboard/faq",
      color: "text-purple-500",
    },
    {
      module: "careers",
      icon: Briefcase,
      label: "Careers",
      href: "/admin/dashboard/careers",
      color: "text-blue-500",
    },
    {
      module: "decoders",
      icon: Code,
      label: "Decoder Stories",
      href: "/admin/dashboard/decoder",
      color: "text-cyan-600",
    },
    {
      module: "galleries",
      icon: Images,
      label: "Gallery",
      href: "/admin/dashboard/gallery",
      color: "text-fuchsia-600",
    },
    {
      module: "Chart-speaks",
      icon: ChartCandlestick,
      label: "Chart Speaks",
      href: "/admin/dashboard/chart-speaks",
      color: "text-slate-500",
    },
    {
      module: "kickstarter",
      icon: ReceiptIndianRupee,
      label: "Finance kickstarters",
      href: "/admin/dashboard/kickstarter",
      color: "text-green-500",
    },
    {
      module: "user-management",
      icon: Users,
      label: "User Management",
      href: "/admin/dashboard/users",
      color: "text-red-500",
    },
    {
      module: "ipo",
      icon: BarChart3,
      label: "IPOs",
      href: "/admin/dashboard/ipo",
      color: "text-orange-500",
    },

     {
      module: "media",
      icon: Clapperboard,
      label: "Media Articles",
      href: "/admin/dashboard/media",
      color: "text-yellow-500",
    },
  
  ];

  const filteredMenuItems = menuItems.filter((item) => hasAccess(item.module));

  return (
    <Sidebar
      className="fixed left-0 top-0 h-screen w-60 border-r bg-white shadow-md transition-all duration-300"
      collapsible="icon"
    >
      <SidebarHeader className="flex h-16 items-center border-b px-4">
        <Link
          href={"/"}
          className="flex w-full items-center justify-center overflow-hidden transition-transform hover:scale-105"
        >
          <Image
            src={"/logo_long.svg"}
            width={120}
            height={30}
            alt="Tradejini logo"
            className="h-8 w-auto max-w-full object-contain"
            priority
          />
        </Link>
        <SidebarTrigger className="absolute right-2 rounded-md p-1 hover:bg-zinc-100">
          <Menu className="h-5 w-5 text-zinc-600" />
        </SidebarTrigger>
      </SidebarHeader>

      <SidebarContent className="py-4">
        {/* Dashboard Link */}
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/admin/dashboard" className="w-full">
              <SidebarMenuButton
                className={
                  isActive("/admin/dashboard", true)
                    ? "bg-indigo-600 text-white hover:bg-indigo-700"
                    : "hover:bg-zinc-100"
                }
                tooltip="Dashboard"
              >
                <LayoutDashboard
                  className={`h-4 w-4 flex-shrink-0 text-indigo-500`}
                  style={{
                    color: isActive("/admin/dashboard", true) ? "white" : "",
                  }}
                />
                <span className="text-sm">Dashboard</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>

        <SidebarGroup>
          <SidebarGroupLabel className="mb-2 text-sm font-medium uppercase text-zinc-500">
            Modules
          </SidebarGroupLabel>
          <SidebarMenu>
            {filteredMenuItems.map((item) => (
              <SidebarMenuItem key={item.module}>
                <Link href={item.href} className="w-full">
                  <SidebarMenuButton
                    className={
                      isActive(item.href)
                        ? "bg-themeGreen text-white hover:bg-themeGreen/90"
                        : "hover:bg-zinc-100"
                    }
                    tooltip={item.label}
                  >
                    <item.icon
                      className={`h-4 w-4 flex-shrink-0 ${item.color}`}
                      style={{ color: isActive(item.href) ? "white" : "" }}
                    />
                    <span className="text-sm">{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        {user?.role && (
          <SidebarGroup>
            <SidebarGroupLabel className="mb-2 text-xs font-medium uppercase text-zinc-500">
              Role: {user.role}
            </SidebarGroupLabel>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="mt-auto border-t">
        {user ? (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 rounded-lg bg-zinc-50 p-2">
              <Avatar className="h-8 w-8 border-2 border-themeGreen">
                <AvatarFallback className="bg-themeGreen text-xs text-white">
                  {user.name?.charAt(0).toUpperCase() ||
                    user.email?.charAt(0).toUpperCase() ||
                    "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col overflow-hidden">
                <span className="truncate text-xs font-medium">
                  {user.email || user.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {user.name}
                </span>
              </div>
            </div>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="destructive"
                    className="w-full py-1 text-xs font-medium transition-colors"
                    onClick={handleLogout}
                    size="sm"
                  >
                    <LogOut className="h-3 w-3 flex-shrink-0" />
                    <span className="truncate">Logout</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Sign out from your account</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        ) : (
          <Button
            className="w-full bg-themeGreen py-1 text-xs font-medium transition-colors hover:bg-themeGreen/90"
            onClick={() => router.push("/admin/auth")}
            size="sm"
          >
            <LogIn className="mr-1 h-3 w-3 flex-shrink-0" />
            <span className="truncate">Login</span>
          </Button>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
