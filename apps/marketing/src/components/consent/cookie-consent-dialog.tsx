"use client";

import Link from "next/link";
import { useState } from "react";

import { Dialog } from "@skillsite/ui/dialog";
import { Switch } from "@skillsite/ui/switch";
import { Button } from "@skillsite/ui/button";
import type { ConsentPreferences } from "@/lib/consent";
import { routes } from "@/lib/routes";
import { useConsent } from "@/providers/consent-provider";

const TITLE_ID = "cookie-dialog-title";
const DESC_ID = "cookie-dialog-desc";

export function CookieConsentDialog() {
  const { consent, preferences, isOpen, closeSettings } = useConsent();

  return (
    <Dialog
      open={isOpen}
      onClose={closeSettings}
      labelledBy={TITLE_ID}
      describedBy={DESC_ID}
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
    <>
      <h2 id={TITLE_ID} className="font-heading text-xl font-bold text-ink">
        Cookie-Einstellungen
      </h2>
      <p id={DESC_ID} className="mt-1.5 text-sm text-ink-soft">
        Passe hier an, ob externe Dienste geladen werden dürfen.
      </p>

      <div className="mt-5 space-y-3">
        <div className="flex items-center justify-between gap-4 rounded-xl border border-line p-4">
          <div>
            <p className="font-semibold text-ink">Notwendig</p>
            <p className="text-sm text-ink-soft">
              Erforderlich für Grundfunktionen und zum Speichern deiner Auswahl.
            </p>
          </div>
          <Switch checked disabled aria-label="Notwendig (immer aktiv)" />
        </div>

        <div className="flex items-center justify-between gap-4 rounded-xl border border-line p-4">
          <div>
            <p className="font-semibold text-ink">Externe Dienste</p>
            <p className="text-sm text-ink-soft">
              Erlaubt optionale externe Einbettungen (z. B. Videos oder Karten).
            </p>
          </div>
          <Switch
            checked={external}
            onCheckedChange={setExternal}
            aria-label="Externe Dienste"
          />
        </div>
      </div>

      <p className="mt-4 text-sm text-ink-soft">
        Weitere Informationen stehen in der{" "}
        <Link
          href={routes.datenschutz}
          className="font-medium text-coral underline underline-offset-4"
        >
          Datenschutzerklärung
        </Link>
        .
      </p>

      <div className="mt-5 grid gap-2.5 sm:grid-cols-3">
        <Button variant="outline" onClick={rejectAll}>
          Ablehnen
        </Button>
        <Button
          variant="navy"
          onClick={() => saveConsent({ necessary: true, external })}
        >
          Auswahl speichern
        </Button>
        <Button variant="primary" onClick={acceptAll}>
          Alle akzeptieren
        </Button>
      </div>
    </>
  );
}
