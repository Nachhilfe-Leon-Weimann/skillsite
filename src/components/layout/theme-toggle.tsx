"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

import { cn } from "@/lib/utils";
import { useHydrated } from "@/lib/use-hydrated";

/** Segmented light/dark switch. Styled for the navy footer. */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useHydrated();

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <div
      role="group"
      aria-label="Farbschema wählen"
      className={cn(
        "inline-flex rounded-full border border-white/15 bg-white/[0.07] p-1",
        className,
      )}
    >
      <button
        type="button"
        aria-pressed={mounted ? !isDark : undefined}
        onClick={() => setTheme("light")}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[0.85rem] font-semibold transition-colors",
          !isDark
            ? "bg-white text-navy"
            : "text-on-navy-soft hover:text-white",
        )}
      >
        <Sun className="size-4" aria-hidden />
        Hell
      </button>
      <button
        type="button"
        aria-pressed={mounted ? isDark : undefined}
        onClick={() => setTheme("dark")}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[0.85rem] font-semibold transition-colors",
          isDark ? "bg-white/20 text-white" : "text-on-navy-soft hover:text-white",
        )}
      >
        <Moon className="size-4" aria-hidden />
        Dunkel
      </button>
    </div>
  );
}
