"use client";

import { useEffect, useRef } from "react";

type HeightReporterProps = {
  onHeightChange: (height: number) => void;
  children: React.ReactNode;
};

export function HeightReporter({
  onHeightChange,
  children,
}: HeightReporterProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const update = () => {
      onHeightChange(element.offsetHeight);
    };

    update();

    const observer = new ResizeObserver(update);
    observer.observe(element);
    window.addEventListener("resize", update);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [onHeightChange]);

  return <div ref={ref}>{children}</div>;
}
