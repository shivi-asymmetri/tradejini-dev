"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MoonIcon, SunIcon } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { useState } from "react";
export function ThemeSwitcher() {
  const [sun, setSun] = useState(false);

  return (
    <div className="mr-0">
      <Toggle
        onClick={(e) => {
          setSun((x) => !x);
          document.documentElement.classList.toggle("dark");
        }}
      >
        {sun ? <SunIcon /> : <MoonIcon></MoonIcon>}
      </Toggle>
    </div>
  );
}

