<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Commands

- `npm run dev` / `npm run build` / `npm run start` — only scripts in `package.json`. No test/typecheck scripts.
- `npm run lint` = `eslint` (flat config `eslint.config.mjs`, `eslint-config-next` core-web-vitals + typescript). No `--fix` wired; run `npx eslint <file>` for single file.
- Typecheck: `npx tsc --noEmit` (`tsconfig.json`: `strict`, path alias `@/*` → `./*`, `noEmit`).
- Stack: Next `16.3.5`, React `19.2.8`, Tailwind v4 (via `@tailwindcss/postcss` in `postcss.config.mjs`, no `tailwind.config`), shadcn `base-nova`.

## Auth — dual guard, keep both

- Cookie: `pos_auth_token` (`httpOnly`, `sameSite: lax`, 8h), set by `loginAction` server action in `app/login/actions.ts` (demo `demo-<username>`, empty username → `/login?error=empty`).
- `proxy.ts` (not `middleware.ts` — Next 16 convention) redirects unauthenticated `/dashboard/:path*` → `/login`, authenticated `/login` → `/dashboard`.
- `app/dashboard/layout.tsx` re-checks cookie server-side and `redirect("/login")`. Keep in sync with `proxy.ts` matcher.

## Architecture

- App Router only. Routes: `/` (`app/page.tsx` placeholder), `/login`, `/dashboard` (+ `products`, `products/[id]`, `live-transactions`, `analytics`). Dashboard composes `DashboardSummary` + `Suspense`/`Skeleton` + `SafeProductList` (`app/dashboard/page.tsx`).
- Client state: Redux Toolkit single-slice `cart` (`store/store.ts` — `incrementCart`/`addMultipleItems`/`resetCart`); `"use client"` boundary is `providers/StoreProvider.tsx`, mounted once in `app/layout.tsx`. Don't call store from RSC.
- External data: fetch `https://dummyjson.com/...` directly in RSC (`components/ProductCatalog.tsx`, `components/SafeProductList.tsx`). Validate with zod schemas in `types/product.ts` via `safeParse`; throw on failure (caught by Suspense/error boundary).
- `next.config.ts` `images.remotePatterns` allows only `cdn.dummyjson.com`, `images.unsplash.com` — new image hosts need entry here.
- shadcn (`components.json`: `rsc: true`, style `base-nova`, lucide icons): UI in `components/ui/`, aliases `@/components`, `@/components/ui`, `@/lib`, `@/hooks`, utils `@/lib/utils`. `lib/utils.ts` is one-line `export { cn } from "cn"` — keep, don't hand-roll `clsx`+`tailwind-merge`.
- Typed layouts: `LayoutProps<"/">` signature in `app/layout.tsx`, `app/dashboard/layout.tsx` — preserve.

## Gotchas

- `.env*` gitignored (no committed env); `next dev` regenerates the `<!-- BEGIN:nextjs-agent-rules -->` block at top of this file — don't delete it.
- No tests, no CI workflows, no `opencode.json` — verify via `build` + `lint` + `tsc --noEmit`.
