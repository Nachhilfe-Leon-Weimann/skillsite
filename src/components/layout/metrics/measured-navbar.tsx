"use client";

import { HeightReporter } from "@/components/layout/metrics/height-reporter";
import { useLayoutMetrics } from "@/components/layout/metrics/layout-metrics-provider";
import { Navbar } from "@/components/navigation/navbar";

export function MeasuredNavbar() {
  const { setNavHeight } = useLayoutMetrics();

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b">
      <HeightReporter onHeightChange={setNavHeight}>
        <Navbar />
      </HeightReporter>
    </header>
  );
}
