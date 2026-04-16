"use client";

import { createContext, useContext, useMemo, useState } from "react";

type LayoutMetricsContextValue = {
  navHeight: number;
  footerHeight: number;
  setNavHeight: (height: number) => void;
  setFooterHeight: (height: number) => void;
};

const LayoutMetricsContext = createContext<LayoutMetricsContextValue | null>(
  null,
);

export function LayoutMetricsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [navHeight, setNavHeight] = useState(0);
  const [footerHeight, setFooterHeight] = useState(0);

  const value = useMemo(
    () => ({
      navHeight,
      footerHeight,
      setNavHeight,
      setFooterHeight,
    }),
    [navHeight, footerHeight],
  );

  return (
    <LayoutMetricsContext.Provider value={value}>
      {children}
    </LayoutMetricsContext.Provider>
  );
}

export function useLayoutMetrics() {
  const context = useContext(LayoutMetricsContext);
  if (!context) {
    throw new Error(
      "useLayoutMetrics must be used within a LayoutMetricsProvider",
    );
  }
  return context;
}
