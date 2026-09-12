# Deployment

## Required production configuration

- `NEXT_PUBLIC_SITE_URL`: canonical HTTPS origin.
- `DATABASE_URL`: isolated Postgres connection string.
- `ADMIN_API_TOKEN`: long random secret for the operations export endpoint.

## Database

Run `db/001_subscribers.sql` against the production database. The migration creates `subscribers` and `sponsor_leads`, indexes both timestamp columns, and enables row-level security as defense in depth. Application writes use the server-side `DATABASE_URL`; no database credential is exposed to the browser.

## Vercel

1. Push the repository to GitHub.
2. Import `rrahul0904/builder-signal-ai` as a new Vercel project. Do not reuse an unrelated project.
3. Add the three environment variables above to Production and Preview as appropriate.
4. Deploy.
5. Verify `/api/health`, `/`, `/archive`, `/search`, `/sponsor`, newsletter signup and the sponsor request flow.
6. Verify `/api/admin/export` returns `401` without a token and data with the configured bearer token.

## CI gates

The workflow in `.github/workflows/ci.yml` installs exact pinned package versions, runs TypeScript, ESLint, unit tests and a production build, then launches Chromium for the Playwright user journey.

No secret is committed to the repository.
