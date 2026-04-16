"use client";

import { HeightReporter } from "@/components/layout/metrics/height-reporter";
import { useLayoutMetrics } from "@/components/layout/metrics/layout-metrics-provider";
import { Footer } from "@/components/footer";

export function MeasuredFooter() {
  const { setFooterHeight } = useLayoutMetrics();

  return (
    <HeightReporter onHeightChange={setFooterHeight}>
      <Footer />
    </HeightReporter>
  );
}
