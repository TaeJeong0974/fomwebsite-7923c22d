

## Fix Meta/OG Issues

### What changes

1. **Privacy page** (`src/pages/Privacy.tsx`) — Add `useDocumentMeta` with a Privacy-specific title, description, and `noindex: true`.

2. **NotFound page** (`src/pages/NotFound.tsx`) — Add `useDocumentMeta` with a 404-specific title/description and `noindex: true`.

3. **Consolidate OG map** (`src/pages/PodcastDetail.tsx`) — Remove the inline `OG_OVERRIDES` object and import `OG_IMAGES` from `@/lib/episodeImages` instead. Update the `ogImage` assignment to read from `OG_IMAGES[episode?.slug]`. The `SITE_URL` prefix is already baked into the values in `episodeImages.ts`, so we'll add it there if missing.

4. **Ensure full URLs** (`src/lib/episodeImages.ts`) — Prefix all `OG_IMAGES` values with `https://fomwebsite.lovable.app` so they work as absolute OG URLs (currently they're root-relative paths like `/images/ep0-og.png`).

### Per-episode OG images remain unchanged
Each episode keeps its own unique OG image — Meagen gets `ep1-og.png`, Lena gets `og-lena-waters.jpg`, etc. The only difference is one map instead of two.

