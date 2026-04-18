"use client";

import { CSSProperties, ComponentProps } from "react";

import { useLayoutMetrics } from "@/components/layout/metrics/layout-metrics-provider";
import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";

type SectionProps = ComponentProps<"section"> & {
  variant?: "auto" | "content";
  gradient?: "top" | "bottom" | "filled" | "none";
  offsetFooter?: boolean;
  containerClassName?: ComponentProps<typeof Container>["className"];
};

function getSectionMinHeight({
  variant,
  navHeight,
  footerHeight,
  offsetFooter,
}: {
  variant: SectionProps["variant"];
  navHeight: number;
  footerHeight: number;
  offsetFooter: boolean;
}) {
  if (variant !== "auto") return undefined;

  const footerOffset = offsetFooter ? ` - ${footerHeight}px` : "";
  return `calc(100dvh - ${navHeight}px${footerOffset})`;
}

function getGradientStyle(
  gradient: SectionProps["gradient"],
): CSSProperties | undefined {
  if (gradient === "none") return undefined;

  const linearGradient = `
      linear-gradient(
        120deg,
        var(--gradient-from) 0%,
        var(--gradient-to) 100%
      )
    `;

  if (gradient === "filled") return { background: linearGradient };

  const radialGradient =
    gradient === "top"
      ? `
        radial-gradient(
          150% 65% at 50% 0%,
          oklch(from var(--background) l c h / 0) 20%,
          oklch(from var(--background) l c h / 0.6) 55%,
          oklch(from var(--background) l c h / 1) 85%
        )
      `
      : `
          radial-gradient(
          150% 65% at 50% 100%,
          oklch(from var(--background) l c h / 0) 20%,
          oklch(from var(--background) l c h / 0.6) 55%,
          oklch(from var(--background) l c h / 1) 85%
        )
      `;

  return {
    background: `${radialGradient}, ${linearGradient}`,
  };
}

export function Section({
  className,
  children,
  style,
  variant = "auto",
  gradient = "none",
  offsetFooter = false,
  containerClassName,
  ...props
}: SectionProps) {
  const { navHeight, footerHeight } = useLayoutMetrics();

  const minHeight = getSectionMinHeight({
    variant,
    navHeight,
    footerHeight,
    offsetFooter,
  });

  const gradientStyle = getGradientStyle(gradient);

  const sectionStyle: CSSProperties = {
    ...style,
    ...gradientStyle,
    ...(minHeight ? { minHeight } : {}),
  };

  return (
    <section
      className={cn("flex w-full", className)}
      style={sectionStyle}
      {...props}
    >
      <Container
        className={cn(
          "flex w-full flex-1 flex-col justify-center my-12",
          containerClassName,
        )}
      >
        {children}
      </Container>
    </section>
  );
}
