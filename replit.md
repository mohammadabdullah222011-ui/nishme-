# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Artifacts

### نشمي سوق Gaming Store (`artifacts/nashmi-store`)
- **Type**: React + Vite frontend-only app (no backend)
- **Path**: `/` (root)
- **Stack**: React, TypeScript, Tailwind CSS, Wouter, Framer Motion, react-icons
- **Features**:
  - Full Arabic RTL e-commerce gaming store
  - Dark theme (black + red neon glow aesthetic)
  - Pages: Home, Products (grid + filter), Product Detail, Categories, Contact, Login, Register
  - Shopping cart with React Context (add/remove/quantity)
  - Cart slide-out drawer (shadcn Sheet)
  - 14 sample gaming products across 4 categories
  - Responsive (mobile + desktop)
  - Google Fonts: Orbitron (futuristic headings) + Cairo (Arabic)
- **Key files**:
  - `src/data/products.ts` — all mock product data
  - `src/context/CartContext.tsx` — cart state management
  - `src/components/Navbar.tsx` — top navigation with cart icon
  - `src/components/Footer.tsx` — footer with social icons
  - `src/pages/` — all page components
