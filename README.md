# Fine Bakery & Bistro & Apartments

Web pre pekáreň, bistro a apartmány. Next.js (App Router) + TypeScript + Tailwind
CSS v4, s Neon Postgres cez Prisma a admin panelom pre správu menu.

## Spustenie

```bash
npm install
cp .env.example .env   # doplniť Neon DATABASE_URL
npm run dev
```

Aplikácia beží na http://localhost:3000.

## Stránky

| Route            | Obrazovka z návrhu                        |
| ---------------- | ----------------------------------------- |
| `/`              | Domov                                     |
| `/bakery-bistro` | Bakery & Bistro                           |
| `/menu`          | Menu — záložky Denné menu / Týždenné menu |

## Štruktúra

```
src/
  app/                 stránky (App Router)
  components/
    layout/            hlavička, pätička, info lišta, logo
    menu/              hero, záložky, denné menu, týždenné menu, alergény
    sections/          zdieľané sekcie (Rozdiel v chuti, Fine Club)
    ui/                Button, Container, Photo
  data/                obsah a texty (dočasne, kým nie je pripojená DB)
  lib/                 formátovanie, Prisma klient
  types/               typy menu (zhodné s Prisma modelmi)
prisma/schema.prisma   dátový model
public/images/         fotografie (viď public/images/README.md)
```

## Fotografie

Fotky patria do `public/images/` pod názvami z `public/images/README.md`.
Chýbajúci súbor sa vykreslí ako neutrálny placeholder, takže layout ostáva
neporušený.

## Databáza (Neon + Prisma)

Model pokrýva presne to, čo bude admin editovať:

- `MenuWeek` — týždeň (rok + číslo týždňa), príznak `published`
- `DailyMenu` — deň v týždni v rámci týždňa (voliteľne konkrétny dátum)
- `MenuItem` — polievka, hlavné jedlo č. 1 a 2, dezert, ponuka dňa + alergény a cena
- `WeeklyDish` + `WeeklyDishOption` — týždenné jedlá a chipy „Na výber"
- `Allergen` — legenda alergénov
- `User` — prihlásenie do admin panelu (rola `ADMIN` / `EDITOR`)

Príkazy:

```bash
npm run db:generate   # vygenerovať Prisma klienta
npm run db:push       # nahrať schému do Neonu (bez migrácií)
npm run db:migrate    # vytvoriť a spustiť migráciu
npm run db:studio     # prehliadač dát
```

Kým nie je DB pripojená, stránky čítajú ukážkový obsah z `src/data/menu.ts`,
ktorý má rovnaký tvar ako Prisma modely — výmena za DB dotazy sa nedotkne UI.

## Ďalšie kroky

1. Pripojiť Neon a naplniť DB (seed z `src/data/menu.ts`).
2. Admin panel `/admin` s prihlásením a editáciou menu pre týždeň a jednotlivé dni.
3. Doplniť zvyšné podstránky (O nás, Apartmány, Kontakt, Fine Club, Nápoje, Akcie).
