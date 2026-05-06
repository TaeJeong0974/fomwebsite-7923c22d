## Update Subscribe destination URL

Change the Subscribe redirect from Apple Podcasts to the Substack subscribe link, opening in a new window/tab.

### Change

In `src/contexts/SubscribeContext.tsx`, update `openSubscribe` so `window.open` uses:

`https://thefutureofmarketing.substack.com/subscribe?utm_source=menu&simple=true&next=https%3A%2F%2Fthefutureofmarketing.substack.com%2Fp%2Fthe-death-of-the-funnel-and-the-rise%3Fr%3D7vwnnd%26utm_campaign%3Dpost%26utm_medium%3Dweb%26triedRedirect%3Dtrue`

Keep target `_blank` with `noopener,noreferrer` so it opens in a new tab/window. Single-file change — every Subscribe entry point (nav, Stay Connected, sidebar card, upcoming card, mobile drawer triggers) routes through this context method.