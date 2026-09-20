# Skillsite

Website von Nachhilfe Leon Weimann mit den Kernfunktionen

- Marketing und Information
- Terminbuchung (via Cal.com)
- Kundenportal

## Struktur

pnpm-Workspace mit [Turborepo](https://turborepo.com):

```
apps/
  marketing/   # nachhilfe.leonweimann.de — Marketing-Site inkl. Terminbuchung
packages/      # geteilte Pakete (folgen mit dem Portal-Ausbau)
```

## Entwicklung

Gebaut mit [Next.js](https://nextjs.org) 16, React 19 und Tailwind CSS 4.

```bash
pnpm install
pnpm dev
```

## Skripte

Alle Befehle laufen im Repo-Root über Turbo (für alle Apps); eine einzelne App
lässt sich per Filter ansteuern, z.B. `pnpm --filter @skillsite/marketing dev`.

| Befehl       | Zweck                       |
| ------------ | --------------------------- |
| `pnpm dev`   | Dev-Server starten          |
| `pnpm build` | Produktions-Build erstellen |
| `pnpm lint`  | ESLint laufen lassen        |
| `pnpm test`  | Tests ausführen             |

## Konfiguration

Umgebungsvariablen in `apps/<application>/.env` (siehe `apps/<application>/.env.example`
für die benötigten Keys). Nur für die Entwicklung nötige Konfiguration wird
unter `apps/<application>/.env.local.example` dokumentiert.

## Betrieb: Buchungs-Logs

Jeder Buchungsversuch, der den Server erreicht, hinterlässt genau eine Zeile im
Container-Log (`[booking] <outcome> {…}`). Die UI meldet nur dann Erfolg, wenn
Cal.com die Buchung bestätigt hat (`created`).

| Outcome        | Level | Bedeutung                                                         |
| -------------- | ----- | ----------------------------------------------------------------- |
| `created`      | info  | Cal.com hat gebucht (`calUid` = Buchung in Cal.com)               |
| `slot_taken`   | info  | Slot war inzwischen vergeben                                      |
| `blocked`      | warn  | Spamschutz hat gestoppt (`signal`) – kann ein echter Kunde sein   |
| `rate_limited` | warn  | IP-Limit erreicht                                                 |
| `rejected`     | warn  | Server-Validierung schlug fehl, obwohl das Formular dasselbe prüft |
| `failed`       | error | Cal.com nicht erreichbar, nicht konfiguriert oder Fehlerantwort   |

```bash
docker logs <container> 2>&1 | grep -F "[booking]" | grep -vE "created|slot_taken"
```

Einziges personenbezogenes Detail ist die maskierte E-Mail (`ma***@example.com`),
damit sich ein fälschlich blockierter Kunde erkennen lässt. Im Browser
gescheiterte Buchungen landen zusätzlich als Umami-Event `booking-failed`.

## Betrieb: Zahlungs-Link auf Rechnungen

Rechnungen aus sevDesk verlinken `/zahlung?re=<Rechnungsnummer>&betrag=<Betrag>`.
Die Route leitet auf den PayPal-Checkout weiter, mit Betrag und Rechnungsnummer
(PayPal-Feld `invoice`) vorbelegt:

```
https://nachhilfe.leonweimann.de/zahlung?re=RE-1840&betrag=90,00%20EUR
```

Der Betrag darf so aussehen, wie sevDesk ihn schreibt (`90,00 EUR`, auch
`1.234,56 EUR` oder ohne Währung); mehrdeutige Zahlen wie `1.234` werden
abgelehnt statt geraten, ebenso Beträge unter 0,01 € und über 5.000 €.
Empfänger, Währung und Positionsname sind Konstanten in
`src/lib/payment/invoice-link.ts` – aus dem Link kommen nur Betrag und
Rechnungsnummer, das Zielkonto kann er nicht verändern. Die Seite ist nicht
indexiert (`robots.txt` und `noindex`), und `sitemap.ts` lässt sie über
`unlistedRoutes` in `src/lib/routes.ts` bewusst aus.

Jeder Aufruf hinterlässt genau eine Zeile im Container-Log
(`[payment] <outcome> {…}`) – mit Rechnungsnummer und Betrag, ohne Namen,
E-Mail oder IP-Adresse.

| Outcome      | Level | Bedeutung                                                            |
| ------------ | ----- | -------------------------------------------------------------------- |
| `redirected` | info  | Weiterleitung zu PayPal (`invoice`, `amount`)                        |
| `rejected`   | warn  | Link unbrauchbar (`reason`: `missing`/`invoice`/`amount`) – Fehlerseite statt Redirect |

```bash
docker logs <container> 2>&1 | grep -F "[payment] rejected"
```

Häufen sich `rejected`-Zeilen, stimmt die Vorlage in sevDesk nicht: die
Rohwerte (`re`, `betrag`) stehen längenbegrenzt in derselben Zeile.

## Deployment

Ein Release wird manuell angestoßen und läuft dann vollautomatisch durch:

```bash
pnpm release patch                            # patch | minor | major
gh workflow run release.yml -f version=1.4.0  # alternativ: explizite Version
```

Der `release.yml`-Workflow erledigt nacheinander:

1. **release** - `package.json` bumpen, committen, Tag `vX.Y.Z` setzen und nach `main` pushen
2. **build** - Image bauen und nach GHCR pushen (`linux/amd64`, Tags `:vX.Y.Z`, `:sha-...`, `:latest`)
3. **github-release** - GitHub Release mit automatischen Notes erstellen
4. **deploy** - Dokploy-Webhook auslösen -> zieht das neue Image und startet neu

Die Version ist für alle Apps einheitlich und lebt in der Root-`package.json`.
Auf jedem Pull Request (und Push auf `main`) läuft `ci.yml` mit `pnpm lint`, `pnpm test` + `pnpm build`.

### Lokal als Container testen

Das Dockerfile baut standardmäßig die Marketing-App; andere Apps über
`--build-arg APP=<name>`.

```bash
docker build -t skillsite:local .
docker run --rm --env-file apps/marketing/.env -p 3000:3000 skillsite:local
```
