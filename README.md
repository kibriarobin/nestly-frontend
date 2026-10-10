# 🏠 Nestly — Frontend

Nestly is a housing & roommate management platform where property **owners** list flats/rooms, **tenants** browse and book them, and **admins** moderate the whole marketplace. This repo is the Next.js frontend that talks to the [Nestly backend API](https://nestly-backend.vercel.app).

**Live app:** https://nestly-frontend-qft5.vercel.app

**Backend API:** https://nestly-backend.vercel.app

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) + React 19 |
| Styling | Tailwind CSS v4 + shadcn/ui (Radix primitives) |
| Data fetching | TanStack Query (`useQuery` / `useMutation`) |
| Forms & validation | React Hook Form + Zod |
| Auth | JWT (httpOnly cookies) + Google OAuth |
| State | Zustand (light client state) |
| Charts | Recharts |
| Lint/format | Biome |

The app proxies all `/api/v1/*` requests to the backend via `next.config.ts` rewrites, so backend cookies are set on the frontend's own origin - no CORS gymnastics needed.

---

## Features by Role

### Public (no login required)
- Home page with live property stats and featured listings
- Browse **Properties**, **Flats**, and **Rooms**, each with a detail page
- **About**, **How it works**, **FAQ**, and **Contact** pages
- Register / Login, including **Continue with Google**

### Tenant (`/dashboard`)
- Dashboard overview of bookings/applications
- **Payments** history (`/dashboard/payments`)
- Profile management (`/dashboard/profile`)
- Checkout **Payment success / cancel** pages (`/payment/success`, `/payment/cancel`)

### Owner (`/owner`)
- Dashboard overview
- **My Properties** - create via a multi-step wizard (with photo upload), edit, or remove listings
- **Applications** - review tenant applications for owned properties
- **Earnings** - revenue overview and breakdown
- **Profile** management

### Admin (`/admin`)
- Dashboard overview
- **Manage** - approve/reject/suspend property listings
- **Users** - manage platform users
- **Reports** - platform-wide reporting

---

## Getting Started

### Prerequisites
- Node.js 20+
- pnpm (version pinned via `packageManager` in `package.json`)
- The [Nestly backend](https://github.com/kibriarobin/nestly-backend) running locally or deployed

### Install & run

```bash
pnpm install
pnpm dev
```

The app runs at `http://localhost:3000`.

### Environment Variables

Create a `.env.local` file in the project root:

```bash
# Backend API base URL (used for server-side fetches)
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

> Client-side requests always go through the `/api/v1/*` rewrite in `next.config.ts`, which proxies to the backend URL configured there. Update that destination when pointing at a different backend deployment.

### Other scripts

```bash
pnpm build        # production build
pnpm start        # run the production build
pnpm lint         # check with Biome
pnpm lint:fix     # check + autofix with Biome
pnpm format       # format with Biome
```

---

## Project Structure

```
src/
├── app/
│   ├── (public)/        # Home, properties, flats, rooms, about, contact, faq, how-it-works
│   ├── (auth)/           # Login, register
│   ├── admin/            # Admin dashboard, manage, users, reports
│   ├── owner/            # Owner dashboard, properties, applications, earnings, profile
│   ├── dashboard/        # Tenant dashboard, payments, profile
│   └── payment/          # Payment success / cancel redirect pages
├── components/           # UI components, grouped by feature (auth, owner, admin, shared, ui, layout)
├── api/                  # Typed API call wrappers per resource
├── hooks/                # TanStack Query hooks per resource
├── validation/           # Zod schemas
├── types/                # Shared TypeScript types
└── lib/                  # API client, utilities
```

---

## Related Repository

- Backend (Express + Prisma + PostgreSQL): https://github.com/kibriarobin/nestly-backend