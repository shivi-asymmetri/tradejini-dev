"use client";

import {
  useContext,
  createContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
const BlogLoadingContext = createContext<{
  isLoading: number;
  setIsLoading: React.Dispatch<React.SetStateAction<number>>;
} | null>(null);

function BlogLoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(0);

  // Functionality goes here

  return (
    <BlogLoadingContext.Provider
      value={{
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </BlogLoadingContext.Provider>
  );
}

export default function useBlogLoading() {
  return useContext(BlogLoadingContext);
}
export { BlogLoadingProvider };
