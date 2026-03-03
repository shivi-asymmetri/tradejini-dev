"use client";

import { createContext, useContext, useState } from "react";

type NotFoundContextType = {
  isNotFound: boolean;
  setNotFound: (value: boolean) => void;
};

const NotFoundContext = createContext<NotFoundContextType | undefined>(
  undefined,
);

export function NotFoundProvider({ children }: { children: React.ReactNode }) {
  const [isNotFound, setIsNotFound] = useState(false);

  return (
    <NotFoundContext.Provider
      value={{ isNotFound, setNotFound: setIsNotFound }}
    >
      {children}
    </NotFoundContext.Provider>
  );
}

export function useNotFound() {
  const context = useContext(NotFoundContext);
  if (!context) {
    throw new Error("useNotFound must be used within a NotFoundProvider");
  }
  return context;
}
