# Skillsite

Next.js-Anwendung für die Website „Nachhilfe Leon Weimann“ mit Fokus auf Darstellung von Leistungen, Preisen und Terminbuchung.

## Kernfunktion

* statische Inhaltsseiten (Fächer, Preise, Kontakt)
* konfigurationsgetriebene Inhalte (`content`, `lib`)
* externe Terminbuchung über Cal.com

## Architektur

Inhalte liegen zentral in `src/content` und `src/lib`. Komponenten konsumieren ausschließlich diese Datenquellen.

## Tech Stack

* Framework: Next.js (App Router)
* Sprache: TypeScript
* Styling: Tailwind CSS
* UI-System: shadcn/ui
* Icons: Lucide, Simple Icons
* Buchung: `@calcom/embed-react`
* Package Manager: pnpm

## Setup

Voraussetzungen:

* Node.js (empfohlen: LTS)
* pnpm installiert

```zsh
pnpm install
pnpm dev
```

Standard: http://localhost:3000

## Scripts

```zsh
pnpm dev
pnpm build
pnpm start
pnpm lint
```

## Umgebungsvariablen

`.env.local`:

```bash
# Booking
NEXT_PUBLIC_BOOKING_CAL_USERNAME=
NEXT_PUBLIC_BOOKING_EVENT_SLUG_KENNENLERNEN=
NEXT_PUBLIC_BOOKING_EVENT_SLUG_TERMIN=

# Contact
NEXT_PUBLIC_CONTACT_EMAIL=
NEXT_PUBLIC_CONTACT_WHATSAPP=
NEXT_PUBLIC_WHATSAPP_URL=

# Socials
NEXT_PUBLIC_DISCORD_URL=
NEXT_PUBLIC_INSTAGRAM_URL=
NEXT_PUBLIC_YOUTUBE_URL=
NEXT_PUBLIC_TIKTOK_URL=
NEXT_PUBLIC_GITHUB_URL=

# Dev
ALLOWED_DEV_ORIGINS=
```

`ALLOWED_DEV_ORIGINS` wird in `next.config.ts` an `allowedDevOrigins` übergeben.

## Projektstruktur

```text
src/
  app/         Routing (App Router)
  components/  UI und zusammengesetzte Komponenten
  content/     Statische Inhalte (Fächer, Preise, Feedback)
  lib/         Konfiguration (Routen, Navigation, Kontakte)
  hooks/       Client Hooks
  server/      Server Utilities
public/
  subjects/    Bildmaterial
```

## Content

* Fächer: `src/content/subjects.ts`
* Preise: `src/content/pricing*.ts`
* Feedback: `src/content/feedback.ts`
* Kontakte: `src/lib/contact-details.ts`
* Navigation: `src/lib/navigation.ts`, `src/lib/routes.ts`

## UI-Regeln

* UI basiert auf shadcn/ui
* Styling ausschließlich über Tailwind CSS
* keine isolierten CSS-Dateien
* Komposition statt monolithischer Komponenten
* keine `any`-Typen

## Deployment

Noch nicht definiert.

Build:

```zsh
pnpm build
```
