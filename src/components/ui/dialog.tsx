"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import { cn } from "@/lib/utils";
import { useBodyScrollLock } from "@/lib/use-body-scroll-lock";
import { useHydrated } from "@/lib/use-hydrated";

type DialogProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  /** Extra classes for the panel. */
  className?: string;
  labelledBy?: string;
  describedBy?: string;
};

/** Lightweight modal: portal, backdrop, scroll-lock, Escape + click-outside. */
export function Dialog({
  open,
  onClose,
  children,
  className,
  labelledBy,
  describedBy,
}: DialogProps) {
  const mounted = useHydrated();
  const panelRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useBodyScrollLock(open);

  useEffect(() => {
    if (!open) return;

    previousFocus.current = document.activeElement as HTMLElement | null;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);

    const frame = window.requestAnimationFrame(() => panelRef.current?.focus());

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.cancelAnimationFrame(frame);
      previousFocus.current?.focus?.();
    };
  }, [open, onClose]);

  if (!mounted || !open) return null;

  return createPortal(
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      <div
        aria-hidden
        onClick={onClose}
        className="absolute inset-0 bg-black/45 backdrop-blur-sm motion-safe:animate-[fade_0.15s_ease]"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        aria-describedby={describedBy}
        tabIndex={-1}
        className={cn(
          "relative z-10 w-full max-w-lg rounded-3xl border border-line bg-surface p-6 shadow-card outline-none motion-safe:animate-[fade-up_0.2s_ease] sm:p-7",
          className,
        )}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}
