## Goal

1. Add **Wendy Werve** (Chief Marketing Officer, Comply) as a new upcoming guest, inserted right after Idan Koren in the data array.
2. Use the existing default placeholder image for her card (no new asset).
3. Mark her as the newest upcoming episode in the Podcast section.
4. Give her a working detail page at `/podcast/wendy-werve`.
5. Hide the inline Subscribe card from the Podcast module (grid view).

---

## Changes

### 1. `src/lib/podcastData.ts` — insert Wendy after Idan
Place a new episode object immediately after the Idan Koren entry (currently followed by Ceci Stallsmith at line ~440 and Katrina Wong at the end). Minimal upcoming-style data, mirroring Katrina's shape so it slots into the Upcoming filter:

```ts
{
  id: 11,
  slug: "wendy-werve",
  name: "Wendy Werve",
  title: "Chief Marketing Officer",
  company: "Comply",
  companyDomain: "comply.com",
  overview: "",
  bio: "",
  fullDescription: "",
  topics: [],
  chapters: [],
  youtubeUrl: "",
  spotifyUrl: "",
  duration: "",
  publishedDate: "Coming Soon",
  comingSoon: true,
}
```

No entry added to `EPISODE_IMAGES` so `getEpisodeImage()` falls back to the rotating host placeholder (same behavior Katrina has today).

### 2. `src/pages/PodcastDetail.tsx` — render detail page for upcoming guests
Currently any `comingSoon: true` episode returns `<NotFound />`. Update so upcoming episodes render the already-imported `<ComingSoonEpisode>`:

- Replace `if (!episode || episode.comingSoon) return <NotFound />;`
- With:
  - `if (!episode) return <NotFound />;`
  - `if (episode.comingSoon) return <ComingSoonEpisode episode={episode} />;`

`ComingSoonEpisode` already handles missing fields gracefully (falls back to "A Conversation with {name}", generic description, hides pull quote / bio when empty). This makes `/podcast/wendy-werve` (and `/podcast/katrina-wong`) reachable.

### 3. `src/components/podcast/PodcastGridView.tsx` — hide Subscribe card
Remove the two `<SubscribeCard />` motion blocks (the always-on desktop one and the mobile "show all" one) and drop the unused `SubscribeCard` import. List view doesn't include it, so nothing to change there.

---

## Notes
- Wendy will appear in the grid/list under the "Upcoming" theme pill, alongside Katrina, with the rotating placeholder image.
- Clicking her card opens the Subscribe drawer (existing upcoming-card behavior); the new detail page is reachable via direct URL `/podcast/wendy-werve` and from related-episode lists.
- When her real photo, bio, topics, and pull quote come in, drop them into the same object and add her image to `EPISODE_IMAGES`.
