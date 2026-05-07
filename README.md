# Future of Marketing — fom.xyz

Marketing site and podcast hub for **Graphite Growth**, home of the *Future of Marketing with AI* podcast.

Live: https://fom.xyz

## Tech stack

- **Framework**: Vite 5 + React 18 + TypeScript 5
- **Styling**: Tailwind CSS v3, custom Liquid Glass design system, ITC Avant Garde Gothic Pro
- **Routing**: React Router v6
- **Animation**: Framer Motion
- **SEO**: react-helmet-async, JSON-LD structured data, RSS + sitemap generated at build time via custom Vite plugins (`scripts/vite-plugin-rss.ts`, `scripts/vite-plugin-sitemap.ts`)
- **Backend**: Lovable Cloud (Supabase) — only used by the email subscribe form (`subscribers` table)
- **Image pipeline**: `vite-imagetools` + `vite-plugin-image-optimizer` (sharp)
- **Hosting**: Lovable today; migrating to Vercel (frontend) + Lovable Cloud (backend, unchanged)

## Project structure

```
src/
  components/     UI components (hero, podcast cards, navigation, etc.)
  contexts/       React contexts (Subscribe drawer, etc.)
  hooks/          Custom hooks
  integrations/
    supabase/     Auto-generated client + types — DO NOT EDIT MANUALLY
  lib/
    podcastData.ts   Single source of truth for all episode content (static)
  pages/          Route-level pages
  assets/         Static images imported by components
public/           Static files served as-is (favicons, OG images, robots.txt)
scripts/          Build-time RSS + sitemap generators
supabase/         Database migrations + config
```

Episode content is **fully static** — edit `src/lib/podcastData.ts` to add/update episodes. There is no CMS.

## Local development

Requirements: Node.js 18+ and [bun](https://bun.sh) (or npm).

```sh
bun install
bun run dev      # http://localhost:8080
bun run build    # production build to dist/
bun run preview  # preview the built site
bun run lint
```

## Environment variables

The Supabase client is loaded from these `VITE_*` env vars (auto-injected in Lovable; must be set manually elsewhere):

| Variable | Purpose |
|---|---|
| `VITE_SUPABASE_URL` | Backend project URL |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Public/anon key (safe in client) |
| `VITE_SUPABASE_PROJECT_ID` | Backend project ID |

For Vercel: add all three under Project Settings → Environment Variables before the first deploy.

## Deployment

- **Today**: deployed via Lovable to `fomwebsite.lovable.app`, fronted by Hado SEO at `fom.xyz`.
- **Migrating to**: GitHub → Vercel for the frontend. Backend (Supabase via Lovable Cloud) stays where it is.
- SPA fallback + asset cache headers will be configured in `vercel.json`.

## SEO

- Per-page titles ≤60 chars, meta descriptions ≤160 chars
- Single H1 per page, semantic HTML, alt text on all images
- JSON-LD: `WebSite` + `PodcastSeries`
- OG images are PNG with cache-busting version query
- Sitemap at `/sitemap.xml`, RSS at `/rss.xml` (both generated at build)
- Canonical tag on every page; trailing slash only on the homepage

## License

All rights reserved © Graphite Growth.
