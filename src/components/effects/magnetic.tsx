"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type MagneticProps = React.ComponentProps<"div"> & {
  intensity?: number;
  lift?: boolean;
};

export function Magnetic({
  className,
  children,
  intensity = 2,
  lift = false,
  onMouseMove,
  onMouseLeave,
  ...props
}: MagneticProps) {
  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = e.currentTarget;

    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      onMouseMove?.(e);
      return;
    }

    const rect = el.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const offsetX = (x / rect.width - 0.5) * 2 * intensity;
    const offsetY = (y / rect.height - 0.5) * 2 * intensity;

    const translateY = lift ? offsetY - 2 : offsetY;

    el.style.transform = `translate3d(${offsetX}px, ${translateY}px, 0)`;

    onMouseMove?.(e);
  }

  function handleMouseLeave(e: React.MouseEvent<HTMLDivElement>) {
    e.currentTarget.style.transform = "translate3d(0px, 0px, 0px)";

    onMouseLeave?.(e);
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "will-change-transform transition-transform duration-200 ease-out",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
