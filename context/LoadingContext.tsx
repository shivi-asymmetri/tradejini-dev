"use client";
import Clarity from "@microsoft/clarity";
import { useContext, createContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
const LoadingContext = createContext<{
  loading: number;
  setLoading: React.Dispatch<React.SetStateAction<number>>;
}>({
  loading: 0,
  setLoading: function () {},
});

function LoadingProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Functionality goes here
  const path = usePathname();
  useEffect(() => {
    if (window) {
      if (!path?.includes("blogs")) {
        document.documentElement.classList.remove("dark");
      }
      if (path?.includes("blogs") && !path?.includes("admin")) {
        document.documentElement.classList.add("light");
      }
    }
  }, [path]);

  const [loading, setLoading] = useState(0);

  useEffect(() => {
    if (loading === 1)
      setTimeout(() => {
        setLoading(0);
      }, 200);
  }, [loading]);

  useEffect(() => {
    const projectId = "pd61lkt50l";
    Clarity.init(projectId);
  }, []);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}

export default function useLoading() {
  return useContext(LoadingContext);
}
export { LoadingProvider };
