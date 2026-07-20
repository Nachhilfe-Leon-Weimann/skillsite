"use client";

import { useEffect, useRef, useState } from "react";

type Options = {
  /** Fraction of the element visible before it counts as in view. */
  threshold?: number;
  /** Margin around the root; the default starts the reveal slightly early. */
  rootMargin?: string;
};

/**
 * Once-only IntersectionObserver. SSR-safe: starts `false` and only flips after
 * the element scrolls into view on the client. Reduced-motion and no-JS
 * fallbacks are the consumer's job in CSS (force the shown state so the element
 * is never stuck hidden) - this keeps the hook a pure observer with no
 * synchronous effect-body setState.
 */
export function useInView<T extends Element = HTMLDivElement>({
  threshold = 0.2,
  rootMargin = "0px 0px -10% 0px",
}: Options = {}) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          observer.disconnect(); // once-only
        }
      },
      { threshold, rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, inView };
}
