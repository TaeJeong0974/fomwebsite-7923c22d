

# Update Page Titles for All Routes

## Current Titles (some exceed 60 chars)
- **Homepage:** "Future of Marketing Podcast | How AI Is Changing Marketing" (59 chars ✅)
- **Episode pages:** `"{Name} on {Overview} | Future of Marketing"` — easily exceeds 60 chars for longer names/overviews
- **Not Found:** "Page Not Found | Future of Marketing" (36 chars ✅)
- **Privacy:** "Privacy Policy | Future of Marketing" (36 chars ✅)
- **Episode not found fallback:** "Episode Not Found | Future of Marketing" (39 chars ✅)
- **Coming soon:** `"{Name} — Coming Soon | Future of Marketing"` — can exceed 60 chars

## Changes

### 1. Shorten the brand suffix
Use `"| FOM Podcast"` instead of `"| Future of Marketing"` to save ~10 characters across all episode titles.

### 2. Update `src/lib/seoConstants.ts`
- Keep `SITE_TITLE` as-is (59 chars, fine)

### 3. Update `src/lib/episodeUtils.ts` — `buildEpisodeSeo()`
- Published: `"{Name}: {Overview} | FOM Podcast"` — truncate overview if needed to stay under 60 chars
- Coming soon: `"{Name} — Coming Soon | FOM Podcast"`
- Not found: `"Episode Not Found | FOM Podcast"`

### 4. Update `src/pages/NotFound.tsx`
- `"Page Not Found | FOM Podcast"`

### 5. Update `src/pages/Privacy.tsx`
- `"Privacy Policy | FOM Podcast"`

### 6. Update `supabase/functions/seo-prerender/index.ts`
- Match the same shortened title format for crawler-facing HTML

### 7. Update `index.html`
- Update the static `<title>` fallback to match `SITE_TITLE`

## Files to modify
- `src/lib/episodeUtils.ts`
- `src/pages/NotFound.tsx`
- `src/pages/Privacy.tsx`
- `supabase/functions/seo-prerender/index.ts`
- `index.html` (static fallback title)

