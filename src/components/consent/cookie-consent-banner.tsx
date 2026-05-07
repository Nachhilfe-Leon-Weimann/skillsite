"use client";

import { CookieSettingsButton } from "@/components/consent/cookie-settings-button";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useConsent } from "@/providers/consent-provider";
import { CookieIcon } from "lucide-react";
import { useCallback, useState } from "react";

const BANNER_EXIT_ANIMATION_MS = 220;

export function CookieConsentBanner() {
  const { isLoaded, hasDecision, isOpen, acceptAll, rejectAll } = useConsent();
  const [isDismissing, setIsDismissing] = useState(false);

  const isVisible = isLoaded && !hasDecision && !isOpen && !isDismissing;

  const dismissWithAnimation = useCallback((saveDecision: () => void) => {
    setIsDismissing(true);
    saveDecision();

    window.setTimeout(() => {
      setIsDismissing(false);
    }, BANNER_EXIT_ANIMATION_MS);
  }, []);

  if (!isLoaded || (hasDecision && !isDismissing)) return null;

  return (
    <Card
      size="sm"
      role={isVisible ? "dialog" : undefined}
      aria-hidden={!isVisible}
      aria-label={isVisible ? "Cookie-Hinweis" : undefined}
      aria-live="polite"
      className={cn(
        "fixed bottom-[calc(1.5rem+env(safe-area-inset-bottom))] left-6 z-50 w-[calc(100%-3rem)] max-w-3xl transform-gpu transition-[opacity,transform] duration-200 ease-out motion-reduce:transition-none",
        isVisible
          ? "translate-x-0 opacity-100"
          : "pointer-events-none -translate-x-6 opacity-0",
      )}
    >
      <CardHeader>
        <CardDescription>
          Diese Website speichert deine Auswahl lokal. Externe Dienste wie die
          Terminbuchung laden wir erst nach deiner Zustimmung.
        </CardDescription>
        <CardAction className="ml-4">
          <CookieIcon />
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <CookieSettingsButton variant="outline" />

        <div className="grid grid-cols-2 gap-2 sm:min-w-64">
          <Button
            type="button"
            variant="secondary"
            disabled={isDismissing}
            onClick={() => dismissWithAnimation(rejectAll)}
          >
            Ablehnen
          </Button>
          <Button
            type="button"
            variant="default"
            disabled={isDismissing}
            onClick={() => dismissWithAnimation(acceptAll)}
          >
            Alle annehmen
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
