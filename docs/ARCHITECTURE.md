# Architecture

## Product model

BuilderSignal separates the editorial system into three durable primitives: `topics`, `articles`, and `tools`. The initial implementation keeps editorial data in version-controlled TypeScript so changes are reviewable and deploy atomically with the site.

## Runtime

- Next.js App Router
- React Server Components for content pages
- Client component only where interactivity is required (search, mobile nav, subscription form)
- `POST /api/subscribe` for newsletter enrollment
- `GET /api/health` for deployment probes
- `GET /rss.xml`, `/sitemap.xml`, `/robots.txt` for discovery

## Persistence

Development uses `.data/subscribers.json`. Production switches automatically to Postgres when `DATABASE_URL` is present. This avoids a fake success path: a local signup is actually persisted and can be verified.

## Editorial pipeline extension

The content model is ready for an automated research pipeline: discovery → source verification → deduplication → relevance scoring → technical extraction → evidence ledger → editor review → publication.
