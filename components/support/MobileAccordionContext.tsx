"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface MobileAccordionContextType {
  isOpen: boolean;
  expandedCollection?: string;
  expandedTopic?: string;
  expandedCategory?: string;
  openAccordion: (
    collection?: string,
    topic?: string,
    category?: string,
  ) => void;
  closeAccordion: () => void;
}

const MobileAccordionContext = createContext<
  MobileAccordionContextType | undefined
>(undefined);

export const useMobileAccordion = () => {
  const context = useContext(MobileAccordionContext);
  return context || null;
};

interface MobileAccordionProviderProps {
  children: ReactNode;
}

export const MobileAccordionProvider: React.FC<
  MobileAccordionProviderProps
> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedCollection, setExpandedCollection] = useState<
    string | undefined
  >();
  const [expandedTopic, setExpandedTopic] = useState<string | undefined>();
  const [expandedCategory, setExpandedCategory] = useState<
    string | undefined
  >();

  const openAccordion = (
    collection?: string,
    topic?: string,
    category?: string,
  ) => {
    console.log("MobileAccordionContext - Opening accordion with:", {
      collection,
      topic,
      category,
    });

    // Set the expansion parameters
    setExpandedCollection(collection);
    setExpandedTopic(topic);
    setExpandedCategory(category);

    // Open the accordion
    setIsOpen(true);
  };

  const closeAccordion = () => {
    console.log("MobileAccordionContext - Closing accordion");
    setIsOpen(false);
    setExpandedCollection(undefined);
    setExpandedTopic(undefined);
    setExpandedCategory(undefined);
  };

  const value: MobileAccordionContextType = {
    isOpen,
    expandedCollection,
    expandedTopic,
    expandedCategory,
    openAccordion,
    closeAccordion,
  };

  return (
    <MobileAccordionContext.Provider value={value}>
      {children}
    </MobileAccordionContext.Provider>
  );
};
