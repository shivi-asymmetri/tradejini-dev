"use client";

import { createContext, useContext, useState } from "react";

const NotFoundContext = createContext({
  isNotFound: false,
  setNotFound: (_: boolean) => {},
});

export function NotFoundProvider({ children }: { children: React.ReactNode }) {
  const [isNotFound, setNotFound] = useState(false);

  return (
    <NotFoundContext.Provider value={{ isNotFound, setNotFound }}>
      {children}
    </NotFoundContext.Provider>
  );
}

export function useNotFound() {
  return useContext(NotFoundContext);
}
