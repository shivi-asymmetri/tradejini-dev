"use client";

import React, { createContext, useContext, useState } from "react";

interface MobileNavigationContextType {
  isNavigating: boolean;
  setIsNavigating: (value: boolean) => void;
}

const MobileNavigationContext = createContext<
  MobileNavigationContextType | undefined
>(undefined);

export function MobileNavigationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isNavigating, setIsNavigating] = useState(false);

  return (
    <MobileNavigationContext.Provider value={{ isNavigating, setIsNavigating }}>
      {children}
    </MobileNavigationContext.Provider>
  );
}

export function useMobileNavigation() {
  const context = useContext(MobileNavigationContext);
  if (context === undefined) {
    throw new Error(
      "useMobileNavigation must be used within a MobileNavigationProvider",
    );
  }
  return context;
}
