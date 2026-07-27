# DUHNAR — Locked Versions (Phase 1)

Selection principle: **stable, production-proven, ecosystem-compatible** —
NOT newest-for-its-own-sake. Versions are chosen as a mutually-tested set
anchored on the Next.js 15.5 Maintenance LTS line. Do not bump a MAJOR
without a documented reason, compatibility re-verification, and approval.

Security note: patch versions are kept current within each locked line.
Next.js is pinned to the latest **patched** 15.5 release (see below).

| Package               | Version   | Reason |
|-----------------------|-----------|--------|
| Node.js               | 24 LTS    | Current Active LTS (Krypton, EOL Apr 2028). Node 20 reached EOL 2026-04-30 — not suitable for a new commercial project. Compatible with Next 15.5, React 19.1, pnpm 10, Tailwind 4, ESLint 9, and the planned Prisma 6 / Supabase stack. engines: `>=24.0.0 <25`. |
| pnpm                  | 10.33.4   | Maintained pnpm 10 line (supported until Apr 30 2027); runs on Node 24. Pinned exactly and consistently across packageManager + Corepack + this file. |
| Next.js               | 15.5.21   | Latest PATCHED 15.5 Maintenance LTS (July 2026 security release: fixes 4 High + 5 Medium CVEs, incl. Server Actions DoS and rewrites/redirects SSRF). Well beyond the 15.5.7 security floor. Avoids Next 16's simultaneous breaking changes. Supported to Oct 2026. |
| eslint-config-next    | 15.5.21   | Must track the exact Next.js version. |
| React / React-DOM     | 19.1.8    | Latest 19.1 patch — the React line Next 15.5 targets. (Next bundles its own patched React internally; these packages provide the app-facing types/runtime.) |
| TypeScript            | ^5.5      | Matches Next 15.5 / React 19 types. |
| Tailwind CSS          | ^4.3      | Mature GA v4; logical properties ideal for RTL. Newest here IS the stable choice. |
| @tailwindcss/postcss  | ^4.3      | Tailwind v4 PostCSS integration. |
| Zod                   | ^3.23     | Stable line; env + all future schemas. |
| ESLint                | ^9        | Flat config; run via `eslint . --max-warnings=0` (NOT the deprecated `next lint`). |
| Prettier              | ^3.3      | + prettier-plugin-tailwindcss for class sorting. |

## Version consistency: pnpm
- packageManager: `pnpm@10.33.4`
- Corepack:      `corepack prepare pnpm@10.33.4 --activate`
- This file:     `10.33.4`
All three must always match. Do NOT use `pnpm@latest`.

## pnpm line rationale
pnpm 9.x reached end-of-life on 2026-04-30, so a new long-term commercial
project should not start on it. We pin the maintained **pnpm 10** line
(supported until 2027-04-30). We pin pnpm 10 (10.33.4), a specific verified
stable patch on the maintained v10 line. pnpm 11 (Node 22+ only) would also
run on our Node 24 baseline, but v10 is the more conservative maintained
choice and avoids v11's larger changes (SQLite store, pure-ESM) this early.

## Deferred (installed in later phases) — decided now
| Package                                | Version | Phase | Reason |
|----------------------------------------|---------|-------|--------|
| prisma / @prisma/client                | 6.x     | 4     | Deep, battle-tested Supabase+Vercel pooling; deliberately NOT Prisma 7 (Rust-free rewrite, too new for a commercial data layer). |
| @supabase/supabase-js + @supabase/ssr  | 2.x     | 5     | Current stable Supabase JS v2 with modern SSR helper. |
| cloudinary                             | latest stable | 6 | Media. |

## Deliberately NOT chosen (and why)
- Next.js 16.x — stable but three foundational changes at once; revisit after ecosystem matures (later hardening phase).
- Prisma 7.x — major architectural rewrite; revisit after longer Supabase production track record.
- Node 22 — supported (Maintenance LTS to Apr 2027), but 24 is the current Active LTS and the better default for a new project.
- Node 20 — EOL 2026-04-30; not used.
- pnpm 11 — maintained and Node-24-compatible, but introduces larger changes (SQLite store, pure ESM) we don't need yet; pnpm 10 is the conservative pick.

Last verified: Phase 1 final adjustment pass (Node 24 LTS / Next 15.5.21 / React 19.1.8 /
pnpm 10.33.4 confirmed against official metadata; env validation runs via a single
server-only import in next.config.ts).
