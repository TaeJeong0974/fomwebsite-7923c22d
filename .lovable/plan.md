

## Update Meagen Eisenberg OG Image

### What changes

1. **Copy uploaded image to public** — Copy `user-uploads://Meagen.png` to `public/images/og-meagen-eisenberg.png` (OG images must be absolute URLs served statically, not bundled via src/assets).

2. **Update OG_IMAGES map** (`src/lib/episodeImages.ts`) — Change the `meagen-eisenberg` entry from `ep1-og.png` to `og-meagen-eisenberg.png`.

### Files touched
- `public/images/og-meagen-eisenberg.png` (new)
- `src/lib/episodeImages.ts` (one-line edit)

