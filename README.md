# Skillsite

Website von Nachhilfe Leon Weimann mit den Kernfunktionen

- Marketing und Information
- Terminbuchung (via Cal.com)
- Kundenportal

## Entwicklung

Gebaut mit [Next.js](https://nextjs.org) 16, React 19 und Tailwind CSS 4.

```bash
pnpm install
pnpm dev
```

## Skripte

| Befehl       | Zweck                       |
| ------------ | --------------------------- |
| `pnpm dev`   | Dev-Server starten          |
| `pnpm build` | Produktions-Build erstellen |
| `pnpm start` | Build lokal ausführen       |
| `pnpm lint`  | ESLint laufen lassen        |

## Konfiguration

Umgebungsvariablen in `.env` (siehe `.env.example` für die benötigten Keys).
Nur für die Entwicklung nötige Konfiguration wird unter `.env.local.example` dokumentiert.

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

Auf jedem Pull Request (und Push auf `main`) läuft `ci.yml` mit `pnpm lint` + `pnpm build`.

### Lokal als Container testen

```bash
docker build -t skillsite:local .
docker run --rm --env-file .env -p 3000:3000 skillsite:local
```
