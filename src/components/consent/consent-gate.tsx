"use client";

import { Button } from "@/components/ui/button";
import { H2, P } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { useConsent } from "@/providers/consent-provider";

type ConsentGateProps = {
  children: React.ReactNode;
  serviceName?: string;
  title?: string;
  description?: string;
  actionLabel?: string;
  className?: string;
};

export function ConsentGate({
  children,
  serviceName = "externer Dienst",
  title,
  description,
  actionLabel,
  className,
}: ConsentGateProps) {
  const { allowExternalServices, isLoaded, openSettings } = useConsent();

  if (allowExternalServices) return <>{children}</>;

  if (!isLoaded) {
    return <div className={cn("min-h-80", className)} aria-hidden="true" />;
  }

  return (
    <div
      className={cn(
        "flex min-h-80 flex-col items-center justify-center gap-3 rounded-xl border bg-card p-6 text-center",
        className,
      )}
    >
      <H2>{title ?? `${serviceName} ist blockiert`}</H2>

      <P>
        {description ??
          `Dieser Inhalt wird über ${serviceName} geladen. Hierfür ist deine Zustimmung zu externen Diensten erforderlich.`}
      </P>

      <Button type="button" className="mt-1" onClick={openSettings}>
        {actionLabel ?? `${serviceName} erlauben`}
      </Button>
    </div>
  );
}
