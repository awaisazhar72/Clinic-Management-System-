# SehatOS — Clinic Management Platform

Frontend scaffold for **SehatOS**, a clinic management SaaS (appointments, patients,
doctors, prescriptions, billing, reports) — built to your spec.

## Stack

- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 + shadcn/ui (New York style) + Radix UI + Lucide icons
- Zustand (state) · TanStack Query (server state) · TanStack Table
- React Hook Form + Zod (forms/validation)
- Framer Motion · Recharts · Sonner (toasts) · React Dropzone · React Day Picker
- Axios (API client)

## What's built (Phase 1–4)

- Phase 1 — Next.js 15 init, Tailwind v4, shadcn config, fonts, design-system
  tokens (`globals.css`), full folder structure.
- Phase 2/3 groundwork — `lib/axios.ts`, `lib/utils.ts`, all `services/*.ts`,
  all `store/*.ts` (Zustand), `types/*`, `schemas/auth.schema.ts`,
  `context/app-providers.tsx` (TanStack Query provider), core shadcn primitives
  (Button, Input, Label, Card, Checkbox, Separator, Sonner, InputOTP).
- Phase 4 — Auth UI, fully wired with React Hook Form + Zod + toasts:
  - `/login`
  - `/register`
  - `/forgot-password`
  - `/otp`
  - `/reset-password`

  All share a `layouts/auth-layout.tsx` split-screen shell (form left, animated
  clinic "pulse line" brand panel right).

Dashboard, Patients, Doctors, Appointments, Billing, Reports, and Settings routes
exist as empty folders under `app/(dashboard)/` ready for the next phases.

## Running locally

```bash
npm install
npm run dev
```

### Note on fonts

This scaffold was built in a sandboxed environment without access to
`fonts.googleapis.com`, so `next/font/google` for Inter was swapped for a
system-font fallback stack (`--font-sans` in `globals.css`). On your machine,
you have two options:

1. Use Google Fonts (simplest, matches original spec exactly) — in
   `src/app/layout.tsx`, re-add:
   ```ts
   import { Inter } from "next/font/google";
   const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
   ```
   and add `${inter.variable}` back to the `<html>` className.

2. Self-host Inter (no external requests at build time):
   ```bash
   npm install @fontsource/inter
   ```
   then `import "@fontsource/inter/400.css";` (and other weights) in `layout.tsx`.

## Auth flow wiring

Auth pages currently simulate API calls (`setTimeout`) so the UI/UX is fully
testable without a backend. Each page has a `// TODO` marking exactly where to
swap in the real call from `services/auth.service.ts` (already written against
`/auth/login`, `/auth/register`, `/auth/forgot-password`, `/auth/verify-otp`,
`/auth/reset-password`). Set `NEXT_PUBLIC_API_URL` in `.env.local` to point at
your backend.

## Design tokens

| Token       | Value      |
|-------------|------------|
| Primary     | `#2563EB`  |
| Success     | `#22C55E`  |
| Danger      | `#EF4444`  |
| Warning     | `#F59E0B`  |
| Background  | `#F8FAFC`  |
| Radius      | `12px`     |
| Font        | Inter      |

Dark mode variants are already defined in `globals.css` under `.dark`.

## Next steps (Phase 5+)

- Dashboard layout (Sidebar + Navbar + protected route group)
- Stat cards, charts (Recharts), calendar, recent appointments widget
- Patients / Doctors / Appointments / Billing / Reports modules
- Responsive polish + dark mode toggle wiring (`store/themeStore.ts` is ready)
