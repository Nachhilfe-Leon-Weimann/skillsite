"use client";

import { useCallback, useState } from "react";
import { Cookie } from "lucide-react";

import { Button } from "@skillsite/ui/button";
import { CookieSettingsButton } from "@/components/consent/cookie-settings-button";
import { cn } from "@skillsite/ui/utils";
import { useConsent } from "@/providers/consent-provider";

const EXIT_MS = 220;

export function CookieConsentBanner() {
  const { isLoaded, hasDecision, isOpen, acceptAll, rejectAll } = useConsent();
  const [dismissing, setDismissing] = useState(false);

  const visible = isLoaded && !hasDecision && !isOpen && !dismissing;

  const dismiss = useCallback((save: () => void) => {
    setDismissing(true);
    save();
    window.setTimeout(() => setDismissing(false), EXIT_MS);
  }, []);

  if (!isLoaded || (hasDecision && !dismissing)) return null;

  return (
    <div
      role={visible ? "dialog" : undefined}
      aria-label={visible ? "Cookie-Hinweis" : undefined}
      aria-live="polite"
      className={cn(
        "fixed bottom-[calc(1.5rem+env(safe-area-inset-bottom))] left-6 z-50 w-[calc(100%-3rem)] max-w-2xl rounded-2xl border border-line bg-surface p-5 shadow-card transition-[opacity,transform] duration-quick ease-flow motion-reduce:transition-none",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      <div className="flex items-start gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-surface-2 text-coral">
          <Cookie className="size-5" aria-hidden="true" />
        </span>
        <p className="text-[0.95rem] text-ink-soft">
          Diese Website speichert deine Cookie-Auswahl lokal. Optionale externe
          Inhalte laden wir erst nach deiner Zustimmung.
        </p>
      </div>
      <div className="mt-4 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
        <CookieSettingsButton className="text-[0.92rem] font-semibold text-ink-soft underline-offset-4 hover:text-ink hover:underline" />
        <div className="grid grid-cols-2 gap-2.5 sm:flex">
          <Button
            variant="outline"
            size="sm"
            disabled={dismissing}
            onClick={() => dismiss(rejectAll)}
          >
            Ablehnen
          </Button>
          <Button
            variant="primary"
            size="sm"
            disabled={dismissing}
            onClick={() => dismiss(acceptAll)}
          >
            Alle annehmen
          </Button>
        </div>
      </div>
    </div>
  );
}
