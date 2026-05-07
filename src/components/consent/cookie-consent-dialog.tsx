"use client";

import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Muted, P } from "@/components/ui/typography";
import type { ConsentPreferences } from "@/lib/consent";
import { routes } from "@/lib/routes";
import { useConsent } from "@/providers/consent-provider";

export function CookieConsentDialog() {
  const { consent, preferences, isOpen, openSettings, closeSettings } =
    useConsent();

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (open) {
          openSettings();
        } else {
          closeSettings();
        }
      }}
    >
      <CookieConsentDialogBody
        key={consent?.savedAt ?? (isOpen ? "open" : "closed")}
        initialPreferences={preferences}
      />
    </Dialog>
  );
}

function CookieConsentDialogBody({
  initialPreferences,
}: {
  initialPreferences: ConsentPreferences;
}) {
  const { acceptAll, rejectAll, saveConsent } = useConsent();
  const [external, setExternal] = useState(initialPreferences.external);

  return (
    <DialogContent className="sm:max-w-lg">
      <DialogHeader>
        <DialogTitle>Cookie-Einstellungen</DialogTitle>
        <DialogDescription>
          Passe hier an, ob externe Dienste geladen werden dürfen.
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-3">
        <div className="flex items-center justify-between gap-4 rounded-lg border p-4">
          <div>
            <P>Notwendig</P>
            <Muted>
              Erforderlich für Grundfunktionen und zum Speichern deiner Auswahl.
            </Muted>
          </div>
          <Switch checked disabled />
        </div>

        <div className="flex items-center justify-between gap-4 rounded-lg border p-4">
          <div>
            <P>Externe Dienste</P>
            <Muted>
              Lädt externe Inhalte wie die Terminbuchung über Cal.com.
            </Muted>
          </div>
          <Switch checked={external} onCheckedChange={setExternal} />
        </div>
      </div>

      <Muted>
        Weitere Informationen stehen in der{" "}
        <Link
          href={routes.datenschutz}
          className="underline underline-offset-4"
        >
          Datenschutzerklärung
        </Link>
        .
      </Muted>

      <div className="grid gap-2 sm:grid-cols-3">
        <Button type="button" variant="outline" onClick={rejectAll}>
          Ablehnen
        </Button>

        <Button
          type="button"
          variant="secondary"
          onClick={() => saveConsent({ necessary: true, external })}
        >
          Auswahl speichern
        </Button>

        <Button type="button" onClick={acceptAll}>
          Alle akzeptieren
        </Button>
      </div>
    </DialogContent>
  );
}
