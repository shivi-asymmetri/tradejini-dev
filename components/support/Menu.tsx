"use client";

// import useData from "@/context/DataContext";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Cross, MenuIcon, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";

interface Question {
  id: string;
  title: string;
  status: string;
  order: number;
}

interface Document {
  id: string;
  title: string;
  folderId: string;
  order: number;
  questions: Question[];
}

interface Folder {
  id: string;
  title: string;
  sectionId: string;
  order: number;
}

interface Section {
  id: string;
  title: string;
  type: "section";
  order: number;
}

type Collection = Section | Folder | Document;

export default function Menu() {
  // const { root } = useData();
  const params = useParams();
  const [menu, setMenu] = useState(false);
  const path = usePathname();
  const router = useRouter();
  const [root, setRoot] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/knowledge-base");
        const data = await response.json();
        setRoot(data);
      } catch (error) {
        console.error("Error fetching knowledge base data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="px-6 py-4">Loading...</div>;
  }

  return (
    <div className={`px-6`}>
      <div className="space-y-5 bg-white">
        <Accordion className="" type="single" collapsible>
          {(root as unknown as Collection[])
            .filter(
              (section): section is Section =>
                "type" in section && section.type === "section",
            )
            .sort((a, b) => a.order - b.order)
            .map((section, i) => (
              <AccordionItem key={section.id + i} value={section.id + i}>
                <AccordionTrigger className="capitalize">
                  {section.title}
                </AccordionTrigger>
                <AccordionContent>
                  {(root as unknown as Collection[])
                    .filter(
                      (folder): folder is Folder =>
                        "sectionId" in folder &&
                        folder.sectionId === section.id,
                    )
                    .sort((a, b) => a.order - b.order)
                    .map((folder, i) => (
                      <Accordion
                        key={folder.id + i}
                        className="pl-3"
                        type="single"
                        collapsible
                      >
                        <AccordionItem
                          onClick={() =>
                            router.push(
                              `/support/knowledge-base/${section.id}/${folder.id}`,
                            )
                          }
                          key={folder.id + i}
                          value={folder.id + i}
                        >
                          <AccordionTrigger className="capitalize">
                            {folder.title}
                          </AccordionTrigger>
                          <AccordionContent>
                            {(root as unknown as Collection[])
                              .filter(
                                (document): document is Document =>
                                  "folderId" in document &&
                                  document.folderId === folder.id,
                              )
                              .sort((a, b) => a.order - b.order)
                              .map((document) => (
                                <Accordion
                                  key={document.id + i}
                                  className="pl-6"
                                  type="single"
                                  collapsible
                                >
                                  <AccordionItem value={document.id + i}>
                                    <AccordionTrigger>
                                      {document.title}
                                    </AccordionTrigger>
                                    <AccordionContent className="flex flex-col gap-3 pl-2 text-blue-500 underline">
                                      {document.questions
                                        ?.filter(
                                          (question) =>
                                            question.status === "PUBLIC",
                                        )
                                        ?.sort((a, b) => b.order - a.order)
                                        ?.map((question) => (
                                          <Link
                                            key={question.id}
                                            href={`/support/knowledge-base/${section.id}/${folder.id}/${document.id}/${question.id}`}
                                            className="px-0 text-sm"
                                          >
                                            {question.title}
                                          </Link>
                                        ))}
                                    </AccordionContent>
                                  </AccordionItem>
                                </Accordion>
                              ))}
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    ))}
                </AccordionContent>
              </AccordionItem>
            ))}
        </Accordion>
      </div>
    </div>
  );
}
