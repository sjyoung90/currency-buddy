@AGENTS.md

# Currency Buddy

실시간 환율을 표시하는 귀여운 캐릭터 위젯 웹앱. 사용자가 원하는 통화의 환율을 화면 위 드래그 가능한 캐릭터로 볼 수 있음.

> ⚠️ **Next.js 16 프로젝트.** `AGENTS.md`가 지시하듯 코드 수정 전에 `node_modules/next/dist/docs/`의 관련 문서를 먼저 읽을 것. 특히 async params/searchParams, `middleware → proxy` 리네임, Turbopack 기본화, `next lint` 제거 등 변경사항 주의.

## Stack

- **Framework**: Next.js 16 (App Router, TypeScript, Turbopack default)
- **UI**: React 19.2, Tailwind CSS v4
- **Client state**: Zustand (with `persist` middleware for character position)
- **Server state**: TanStack Query v5
- **Auth**: NextAuth.js v5 (beta) — Google OAuth, JWT sessions
- **DB**: Neon Postgres via `@neondatabase/serverless` + Drizzle ORM
- **FX data**: Frankfurter (default, no API key). ExchangeRate-API is the paid-tier upgrade path.
- **Deploy**: Vercel

## Folder structure (features-based)

```
src/
  app/                    # Next.js routes only — thin, delegates to features/
    api/
      auth/[...nextauth]/ # NextAuth handler
      rates/              # FX proxy route
    providers.tsx         # QueryClient + SessionProvider
    layout.tsx
    page.tsx
  features/
    auth/
      server/             # server-only (auth config, session helpers)
      client/             # client components (sign-in button, etc.)
    exchange-rate/
      server/             # fetchRates() — hits Frankfurter server-side
      hooks/              # useRates() — TanStack Query wrapper
      client/             # rate display components
    character/
      store/              # Zustand store (position, persist)
      components/         # Character render + drag handling
  shared/
    lib/                  # generic utilities
    ui/                   # generic UI primitives
    config/               # constants (currency list, etc.)
  db/
    schema.ts             # Drizzle schema
    index.ts              # db client
```

**Rule of thumb:** anything domain-specific lives under `features/<domain>/`. `shared/` is for things reused across ≥2 features. `app/` files should be thin route wrappers.

## Conventions

- Server-only code imports `"server-only"` at the top. Never import `features/*/server/*` from client components.
- Use TanStack Query for anything that talks to the server. Use Zustand only for pure client UI state.
- Feature imports: `@/features/<name>/...`, shared: `@/shared/...`, db: `@/db`.
- API routes in `app/api/` are thin — they parse the request, call a `features/*/server/` function, and return the response.

## Environment

See `.env.example`. Copy to `.env.local` for local dev.

- `DATABASE_URL` — Neon connection string (via Vercel Storage tab)
- `AUTH_SECRET` — `openssl rand -base64 32`
- `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` — Google OAuth credentials

## Commands

```
pnpm dev              # local dev
pnpm build            # production build
pnpm lint             # ESLint
pnpm drizzle-kit push # push schema to DB (after DATABASE_URL is set)
```

## Current status

- ✅ Scaffolding, TanStack Query, Zustand, NextAuth skeleton
- ✅ FX proxy route (`/api/rates`) — hits Frankfurter server-side
- ✅ Draggable Character component with persisted position
- ⬜ Neon DB provisioned — needs `DATABASE_URL`
- ⬜ NextAuth Google OAuth credentials — needs Google Cloud Console setup
- ⬜ Drizzle adapter wired to NextAuth (currently JWT-only) — swap in once DB is live
- ⬜ Sign-in / sign-out UI
- ⬜ Currency picker UI
- ⬜ Rate alert feature (Pro tier)

## Monetization plan (v1)

- Free: 1x/day rate refresh (matches Frankfurter's cadence), limited to 3 favorite currencies
- Pro: minute-level refresh (requires paid FX API), unlimited currencies, alert rules, character skins
- Affiliate: money-transfer service (Wise, TravelWallet) referral links
