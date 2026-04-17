# Workspace — نشمي سوق (Nashmi Souq) Gaming Suite

## Overview

Full-stack pnpm workspace monorepo. Gaming brand with Arabic RTL e-commerce store + admin dashboard, backed by a real Express + PostgreSQL API.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM (`lib/db`)
- **Auth**: JWT (`jsonwebtoken`) + `bcryptjs`
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **Build**: esbuild (ESM bundle for API server)

## Seed & Database

- **Seed script**: `artifacts/api-server/src/seed.ts`
  - Run: `/home/runner/workspace/scripts/node_modules/.bin/tsx artifacts/api-server/src/seed.ts`
  - Creates admin user (`admin@nashmi.com` / `admin123`) + 12 demo products
- **Push schema**: `pnpm --filter @workspace/db run push`

## DB Schema (`lib/db/src/schema/`)

- `users` — id, name, email, password (hashed), role (admin/user), createdAt
- `products` — id, name, description, price, imageUrl, stock, category, badge, rating, reviews, createdAt
- `orders` — id, userId, total, status, customerName, createdAt
- `order_items` — id, orderId, productId, quantity, price

## API Endpoints (`/api`)

- `POST /api/auth/register` — register user, returns JWT
- `POST /api/auth/login` — login, returns JWT
- `GET  /api/auth/me` — get current user (auth required)
- `GET  /api/products` — list all products (public)
- `GET  /api/products/:id` — single product (public)
- `POST /api/products` — create product (admin only)
- `PUT  /api/products/:id` — update product (admin only)
- `DELETE /api/products/:id` — delete product (admin only)
- `POST /api/orders` — create order (auth required)
- `GET  /api/orders/my` — user's orders (auth required)
- `GET  /api/orders` — all orders (admin only)
- `PUT  /api/orders/:id/status` — update order status (admin only)
- `GET  /api/dashboard` — stats: users, orders, revenue, products (admin only)

## Auth Notes

- JWT stored in `localStorage` as `nashmi_token` (store) / `nashmi_admin_token` (admin)
- Admin role: email contains "admin" or equals "admin@nashmi.com"
- Store `UserContext` auto-restores session from token on mount

## Artifacts

### نشمي سوق Gaming Store (`artifacts/nashmi-store`)
- **Type**: React + Vite — connected to real API
- **Path**: `/`
- **Stack**: React, TypeScript, Tailwind CSS, Wouter, Framer Motion
- **Key files**:
  - `src/lib/api.ts` — all API calls + types
  - `src/context/UserContext.tsx` — real auth (JWT)
  - `src/context/CartContext.tsx` — cart state
  - `src/hooks/useProducts.ts` — fetches products from API + polls every 10s
  - `src/components/CartDrawer.tsx` — submits real orders to API
  - `src/pages/` — Home, Products, Login, Register, etc.
- **Logo**: `public/logo-nashmi.png`

### نشمي سوق Admin Dashboard (`artifacts/nashmi-admin`)
- **Type**: React + Vite — connected to real API
- **Path**: `/admin/`
- **Stack**: React, TypeScript, Tailwind CSS, Wouter, Recharts
- **Auth**: `AdminLoginGate` wraps app — shows login modal if no token
- **Key files**:
  - `src/lib/api.ts` — admin API calls + types
  - `src/context/AdminAuthContext.tsx` — admin auth state
  - `src/components/AdminLoginGate.tsx` — login gate component
  - `src/pages/Dashboard.tsx` — real stats from `/api/dashboard` (polls every 10s)
  - `src/pages/Products.tsx` — CRUD via API
  - `src/components/AddProductModal.tsx` — image upload + API save

### API Server (`artifacts/api-server`)
- **Type**: Express API
- **Path**: `/api`
- **Port**: 8080
- **Key files**:
  - `src/routes/auth.ts`, `products.ts`, `orders.ts`, `dashboard.ts`
  - `src/middlewares/auth.ts` — JWT middleware + requireAdmin
  - `src/lib/jwt.ts` — sign/verify tokens
  - `src/seed.ts` — seed script

## Key Commands

- `pnpm --filter @workspace/db run push` — push DB schema changes
- `pnpm --filter @workspace/api-server run dev` — run API server
- Seed: `/home/runner/workspace/scripts/node_modules/.bin/tsx artifacts/api-server/src/seed.ts`

## Conventions

- **Currency**: دينار اردني / JOD — `price.toLocaleString("en")`
- **Logo**: `${import.meta.env.BASE_URL}logo-nashmi.png`
- **API base URL**: `/api` (path-based routing via Replit proxy)
- **react-icons**: use `SiX` not `SiTwitter` (v5 rename)
- **CSS HSL**: space-separated, no `hsl()` wrapper
- **Admin login**: `admin@nashmi.com` / `admin123`
