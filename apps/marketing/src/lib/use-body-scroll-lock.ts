"use client";

import { useEffect } from "react";

let lockCount = 0;
let previousOverflow: string | undefined;

/** Locks body scrolling while at least one mounted caller requests it. */
export function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;

    const { body } = document;

    if (lockCount === 0) {
      previousOverflow = body.style.overflow;
      body.style.overflow = "hidden";
    }

    lockCount += 1;

    return () => {
      lockCount = Math.max(0, lockCount - 1);

      if (lockCount === 0) {
        body.style.overflow = previousOverflow ?? "";
        previousOverflow = undefined;
      }
    };
  }, [locked]);
}
