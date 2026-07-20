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

## Deployment

Ein Release wird manuell angestoßen und läuft dann vollautomatisch durch:

```bash
gh workflow run release.yml -f bump=patch     # patch | minor | major
gh workflow run release.yml -f version=1.4.0  # alternativ: explizite Version
```

Der `release.yml`-Workflow erledigt nacheinander:

1. **release** - `package.json` bumpen, committen, Tag `vX.Y.Z` setzen und nach `main` pushen
2. **build** - Image bauen und nach GHCR pushen (`linux/amd64`, Tags `:vX.Y.Z`, `:sha-...`, `:latest`)
3. **github-release** - GitHub Release mit automatischen Notes erstellen
4. **deploy** - Dokploy-Webhook auslösen -> zieht das neue Image und startet neu

Die Version ist für alle Apps einheitlich und lebt in der Root-`package.json`.
Auf jedem Pull Request (und Push auf `main`) läuft `ci.yml` mit `pnpm lint` + `pnpm build`.

### Lokal als Container testen

Das Dockerfile baut standardmäßig die Marketing-App; andere Apps über
`--build-arg APP=<name>`.

```bash
docker build -t skillsite:local .
docker run --rm --env-file apps/marketing/.env -p 3000:3000 skillsite:local
```
