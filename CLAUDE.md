# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server (Next.js on port 3000)
npm run build        # Production build
npm run lint         # ESLint
npm run type-check   # TypeScript check (no emit)
npm run type-check:watch  # TypeScript watch mode
```

There are no automated tests in this project.

## Architecture

This is a **Next.js 14 App Router** frontend for Liga CUBB (a basketball league in Argentina). It is a read-only display app — all data comes from a REST API at `api.ligacubb.com.ar` (or `localhost:8081` in dev, configured in `src/environment/environment.ts`).

### Data flow

```
API → Repository (class + React Query hooks) → Component
```

- **`src/repositories/`** — One file per domain (`CampeonatoRepository`, `CategoriaRepository`, `EquipoRepository`, etc.). Each file exports a class that wraps `httpClient` (axios), and named hooks like `useCampeonatoQuery(id)` that wrap `useQuery`/`useSuspenseQuery` from React Query.
- **`src/app/models/`** — TypeScript interfaces + mapper functions that transform raw API responses into typed models.
- **`src/app/utils/httpClient.ts`** — Single axios instance with the base URL.

### Route structure

- `/` → `HomeContent` — landing page with carousels and news
- `/novedades` → news/novedades list
- `/campeonatos/[idCampeonato]` → `CopaPageBase` — a **Copa** (cup tournament)
- `/campeonatos/[idCampeonato]/categorias/[idCategoria]` → `CategoriaPageBase` — a **Liga** category

### Tournament types

There are two tournament types (discriminated by `CampeonatoTypeEnum`):
- **`Liga` (`"league"`)** — has `categories[]`, each category has phases. Rendered via `CategoriaPageBase`.
- **`Copa` (`"cup"`)** — has `phases[]` directly. Rendered via `CopaPageBase`.

### Phase types (within a tournament or category)

Phases are fetched from the API and identified by a `type` string:
- `"general"` — regular season (standings + fixture)
- `"playoff"` — bracket/playoff tree
- `"group"` / `"intergroup"` — group stage (zonas)
- `"relegated"` — cuadrangular de descenso

### Tab system in `CategoriaPageBase`

Tabs are driven by a numeric `TabsEnum`. Static tabs (0–4) map to standard sections. Dynamic tabs start at offset values:
- `GRUPOS_BASE = 100` — group standings, one tab per group phase
- `FIXTURE_ZONAS_BASE = 200` — fixture for those same group phases

The active tab is synced to the URL via `?tab=<number>`.

### White-label configuration

All tenant-specific values live in **`src/config/tenant.ts`**. Every value reads from a `NEXT_PUBLIC_*` env var with a CUBB default. Copy `.env.example` to `.env.local` to override for a new tenant.

Key variables:
- `NEXT_PUBLIC_PRIMARY_COLOR` — hex color applied globally via the `--color-primary` CSS variable and a MUI ThemeProvider
- `NEXT_PUBLIC_BRAND_NAME`, `NEXT_PUBLIC_BRAND_SUBTITLE` — shown in NavBar alt text, Footer, metadata
- `NEXT_PUBLIC_LOGO_PATH` — path inside `/public` or an absolute URL
- `NEXT_PUBLIC_API_URL` — backend base URL (overrides the dev/prod auto-switch in `environment.ts`)
- `NEXT_PUBLIC_HOME_SLIDES` — JSON array of `HomeSlide` objects to replace the carousel entries

The `--color-primary` CSS variable is injected on `<html>` in `MainLayout`. All components use `var(--color-primary)` in inline styles or `style={{ backgroundColor: "var(--color-primary)" }}` — never hardcoded hex values. CSS modules (loading spinners) also use `var(--color-primary)`.

### Global providers (applied in `layoutWrapper.tsx`)

`ReactQueryProvider` → `MuiThemeProvider` → `SidebarProvider` → `MainLayout` (NavBar + Footer + CustomDrawer)

The `layoutWrapper.tsx` is a `"use client"` component that gates rendering until mounted (avoids SSR hydration mismatches for MUI).

### UI stack

- **MUI** (`@mui/material`) for interactive components
- **Tailwind CSS** for layout and utility classes — both are used together throughout
- **Framer Motion** for animations
- **Embla Carousel** for carousels on the home page
- **Iconify** (`src/app/components/iconify/`) — thin wrapper around `@iconify/react`
