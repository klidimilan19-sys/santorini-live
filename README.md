# Santorini Live

A mobile-first local marketplace and guide built with Next.js 15, TypeScript, Tailwind CSS and the App Router.

## Getting started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Integrations

Copy `.env.example` to `.env.local` when connecting providers. Integration contracts and environment configuration live in `lib/integrations.ts`.

- Stripe: listing payments and featured placements
- Google Maps: restaurant coordinates, directions and place details
- Weather API: temperature, wind and UV index
- Transport feeds: ferry, airport, cruise arrival and traffic status
- Tourism directory: restaurant and rental operator listings

Mock content is centralized in `data/mock-data.ts`.

## Automated data

- `GET /api/weather` uses Open-Meteo and caches responses for 30 minutes.
- `GET /api/restaurants` exposes API-ready restaurant records with Google Place IDs, reviews and `lastUpdated`.
- `GET /api/live-updates` returns operational updates plus approved news.
- `GET/POST /api/admin/news` lists posts and creates generated summaries as drafts.
- `PATCH /api/admin/news/:id/approve` is the only route that publishes a draft.

The news repository is intentionally isolated in `lib/news-repository.ts`. It uses an in-memory development store today and can be replaced with Postgres, Supabase or another durable database without changing the API or dashboard components.

`lib/google-places.ts` contains the normalized restaurant rating/review contract and a provider adapter stub for Google Places.

## Marketplace

Marketplace mock listings and promotion flags live in `data/mock-data.ts`. The posting form supports independent featured (€2), urgent (€3), and homepage (€5) options but does not publish data or process payment yet.

## Accounts and submissions

Public users and businesses do not create accounts. They submit requests at `/submit-request`, choose a package from `/advertise`, and continue through a Stripe-shaped mock checkout. Paid requests become `Paid / Pending Admin Review`.

Only administrators can log in at `/admin/login`. The mock credentials are `admin@santorinilive.com` / `admin123`. Admin routes and APIs are protected by an HTTP-only session cookie and middleware.

Replace `lib/request-repository.ts` and `lib/content-repository.ts` with database adapters when adding durable storage. Stripe environment placeholders are documented in `.env.example`.
