# Human Activity Atlas

Wiki of human hobbies and pursuits — 145 activities, each with tools and a glossary. Built on Next.js 16 (App Router + Cache Components) + Drizzle ORM + Postgres, deployable on Vercel.

## Local development

```bash
# 1. Link this repo to the Vercel project
vercel link --scope bertellis-projects

# 2. Provision Neon Postgres via Vercel Marketplace
vercel integration add neon --scope bertellis-projects

# 3. Pull env vars (including DATABASE_URL) into .env.local
vercel env pull .env.local --yes

# 4. Create schema and seed
npm run db:push
npm run db:seed

# 5. Dev
npm run dev
```

## Scripts

| command             | purpose                            |
| ------------------- | ---------------------------------- |
| `npm run dev`       | Next.js dev server                 |
| `npm run build`     | Production build                   |
| `npm run db:push`   | Apply schema to the database       |
| `npm run db:seed`   | Seed from `src/data/activities.ts` |
| `npm run db:studio` | Browse the DB in Drizzle Studio    |

## Stack

- **Next.js 16** — App Router, Server Components, Cache Components (`use cache`)
- **Drizzle ORM + postgres.js** — typed queries and migrations
- **Postgres** — Neon via Vercel Marketplace (free tier)
- **Tailwind v4** — dark neon aesthetic preserved from the original prototype

## Deployment

Push to the linked Vercel project. After the first deploy, run `db:push` and `db:seed` with `DATABASE_URL` pointing to the production DB.
