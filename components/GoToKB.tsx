"use client";

import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import SectionNavbar from "./support/SectionNavbar";

export function GoTo() {
  const path = usePathname();
  return (
    <div>
      {path?.includes("faq") ? (
        <a href={"/support/knowledge-base"}>
          <Button className="bg-themeDarkBlue p-6">Knowledge Base</Button>
        </a>
      ) : (
        // <SectionNavbar />
        <div></div>
      )}
    </div>
  );
}

export function Right() {
  const path = usePathname();
  return (
    <div>
      {path?.includes("faq") ? (
        <div className="max-md:hidden">
          <img src="/faqq.svg" alt="" />
        </div>
      ) : (
        // <SectionNavbar />
        <SectionNavbar></SectionNavbar>
      )}
    </div>
  );
}
