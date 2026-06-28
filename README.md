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
