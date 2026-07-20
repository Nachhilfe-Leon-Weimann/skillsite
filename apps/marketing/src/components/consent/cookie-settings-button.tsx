"use client";

import { cn } from "@skillsite/ui/utils";
import { useConsent } from "@/providers/consent-provider";

type CookieSettingsButtonProps = {
  className?: string;
  children?: React.ReactNode;
};

/** Opens the cookie settings dialog. Styling is left to the caller. */
export function CookieSettingsButton({
  className,
  children,
}: CookieSettingsButtonProps) {
  const { openSettings } = useConsent();

  return (
    <button
      type="button"
      aria-haspopup="dialog"
      onClick={openSettings}
      className={cn("cursor-pointer", className)}
    >
      {children ?? "Cookie-Einstellungen"}
    </button>
  );
}
