# BuilderSignal AI

BuilderSignal is an original AI-builder intelligence product inspired by the distribution mechanics of modern technical newsletters, without copying The Unwind AI branding, trade dress, design assets, or article text.

## What ships

- Editorial homepage with lead signal and daily intelligence stack
- Intelligence archive and eight durable topic hubs
- Long-form technical articles and tutorials
- Scored builder-tools directory with working internal deep links
- Full-text client search
- Newsletter subscription API with local persistence + production Postgres adapter
- Sponsor lead-capture API and operational sponsor form
- Token-protected `/admin` export for subscribers and sponsor leads
- Privacy and terms pages
- RSS feed, sitemap, robots metadata and Open Graph metadata
- Responsive navigation and layouts, 404 and health endpoint
- Type-check/lint/unit/build/Playwright CI definitions
- Docker production image and Postgres migration

## Local development

```bash
npm install
npm run dev
# http://localhost:3000
```

When `DATABASE_URL` is unset, newsletter signups persist to `.data/subscribers.json` and sponsorship requests to `.data/sponsor-leads.json`. `.data/` is gitignored.

## Production database

Run `db/001_subscribers.sql` in an isolated Postgres database, then set:

```bash
DATABASE_URL=postgresql://...
NEXT_PUBLIC_SITE_URL=https://your-domain.com
ADMIN_API_TOKEN=<long-random-secret>
```

`/api/subscribe` and `/api/sponsor-leads` automatically switch to Postgres. `GET /api/admin/export` requires `Authorization: Bearer <ADMIN_API_TOKEN>`.

## Verification

```bash
npm run typecheck
npm run lint
npm test
npm run build
npm run test:e2e
```

GitHub Actions runs the same verification gates on pushes and pull requests. Package versions are pinned in `package.json`; the first successful networked `npm install` will create the lockfile.

## Repository

Canonical source: `rrahul0904/builder-signal-ai`. Pushes to `main` run the full CI verification workflow.
