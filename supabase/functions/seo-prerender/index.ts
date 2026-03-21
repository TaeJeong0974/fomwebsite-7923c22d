const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const SITE_URL = "https://fom.xyz";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og/default.jpg`;
const HOMEPAGE_OG_IMAGE = `${SITE_URL}/images/og-homepage.png`;
const SITE_TITLE =
  "Future of Marketing Podcast | How AI Is Changing Marketing";
const SITE_DESCRIPTION =
  "How AI is reshaping marketing, from the leaders living it. Hosted by Graphite Growth, XYZ Venture Capital, and Upside.";

// Hardcoded episode SEO data — single source of truth for crawlers.
// Keep in sync with podcastData.ts + episodeImages.ts OG_IMAGES.
const EPISODE_SEO: Record<
  string,
  { title: string; description: string; ogImage: string }
> = {
  "the-future-of-marketing": {
    title: "Introducing FOM Podcast",
    description:
      "Meet the hosts of the Future of Marketing podcast — Mada Seghete, Ethan Smith, and Camille Ricketts — as they discuss how AI is reshaping marketing.",
    ogImage: `${SITE_URL}/images/ep0-og.png`,
  },
  "meagen-eisenberg": {
    title: "Meagen Eisenberg (Lacework) | FOM Podcast",
    description:
      "Meagen Eisenberg, CMO at Lacework, shares how AI is transforming B2B marketing, pipeline generation, and the role of the modern CMO.",
    ogImage: `${SITE_URL}/images/og-meagen-eisenberg.png`,
  },
  "lena-waters": {
    title: "Lena Waters (Dropbox) | FOM Podcast",
    description:
      "Lena Waters, VP of Marketing at Dropbox, discusses brand reinvention, AI-powered productivity, and marketing in the age of intelligent tools.",
    ogImage: `${SITE_URL}/images/og-lena-waters.jpg`,
  },
  "dave-steer": {
    title: "Dave Steer (Ridgeline) | FOM Podcast",
    description:
      "Dave Steer, CMO at Ridgeline, talks about marketing in fintech, building trust, and the intersection of AI and financial services.",
    ogImage: `${SITE_URL}/images/og-dave-steer.jpg`,
  },
  "sara-varni": {
    title: "Sara Varni (Attentive) | FOM Podcast",
    description:
      "Sara Varni, CMO at Attentive, explores personalization at scale, AI-driven messaging, and what's next for mobile marketing.",
    ogImage: `${SITE_URL}/images/og-sara-varni.jpg`,
  },
  "kate-johnson": {
    title: "Kate Johnson (Samsara) | FOM Podcast",
    description:
      "Kate Johnson, CMO at Samsara, discusses IoT marketing, operational intelligence, and building a brand in the physical operations space.",
    ogImage: `${SITE_URL}/images/og-kate-johnson.jpg`,
  },
  "sheila-vashee": {
    title: "Sheila Vashee (Figma) | FOM Podcast",
    description:
      "Sheila Vashee, Head of Marketing at Figma, shares how community-led growth, product passion, and AI-driven design are reshaping marketing.",
    ogImage: `${SITE_URL}/images/og-sheila-vashee.jpg`,
  },
  "lindsey-irvine": {
    title: "Lindsey Irvine (Square) | FOM Podcast",
    description:
      "Lindsey Irvine, CMO at Square, discusses fintech brand building, marketing to SMBs, and the future of commerce.",
    ogImage: `${SITE_URL}/images/og-lindsey-irvine.jpg`,
  },
  "idan-koren": {
    title: "Idan Koren (Verkada) | FOM Podcast",
    description:
      "Idan Koren, CMO at Verkada, discusses security technology marketing and AI-driven brand strategy.",
    ogImage: `${SITE_URL}/images/og-idan-koren.jpg`,
  },
  "ceci-stallsmith": {
    title: "Ceci Stallsmith (Lovable) | FOM Podcast",
    description:
      "Ceci Stallsmith, CMO at Lovable, shares insights on developer marketing, product-led growth, and AI-powered tools.",
    ogImage: `${SITE_URL}/images/og-ceci-stallsmith.jpg`,
  },
  "katrina-wong": {
    title: "Katrina Wong (New Relic) | FOM Podcast",
    description:
      "Katrina Wong, CMO at New Relic, discusses observability marketing, developer relations, and data-driven brand building.",
    ogImage: `${SITE_URL}/images/og-katrina-wong.jpg`,
  },
};

const CRAWLER_REGEX =
  /googlebot|bingbot|yandex|baiduspider|twitterbot|facebookexternalhit|linkedinbot|slackbot|discordbot|whatsapp|telegrambot|applebot|pinterestbot|redditbot|embedly|showyoubot|outbrain|quora link preview|rogerbot|vkshare/i;

function isCrawler(ua: string): boolean {
  return CRAWLER_REGEX.test(ua);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const url = new URL(req.url);
  const userAgent = req.headers.get("user-agent") || "";
  const path =
    url.searchParams.get("path") ||
    req.headers.get("x-original-path") ||
    "/";

  // Non-crawlers get redirected to the SPA
  if (!isCrawler(userAgent)) {
    return new Response(null, {
      status: 302,
      headers: { ...corsHeaders, Location: `${SITE_URL}${path}` },
    });
  }

  let title = SITE_TITLE;
  let description = SITE_DESCRIPTION;
  let ogImage = HOMEPAGE_OG_IMAGE;
  let canonicalUrl = SITE_URL;
  let ogType = "website";
  let jsonLd = "";

  const episodeMatch = path.match(/^\/podcast\/([^/?#]+)/);

  if (episodeMatch) {
    const slug = episodeMatch[1];
    canonicalUrl = `${SITE_URL}/podcast/${slug}`;
    ogType = "article";

    const seo = EPISODE_SEO[slug];
    if (seo) {
      title = seo.title;
      description = seo.description;
      ogImage = seo.ogImage;
    }

    jsonLd = `<script type="application/ld+json">${JSON.stringify({
      "@context": "https://schema.org",
      "@type": "PodcastEpisode",
      name: title,
      description,
      url: canonicalUrl,
      image: ogImage,
      partOfSeries: {
        "@type": "PodcastSeries",
        name: "Future of Marketing Podcast",
        url: SITE_URL,
      },
    })}</script>`;
  } else if (path === "/privacy") {
    title = "Privacy Policy | Future of Marketing";
    description =
      "Privacy policy for the Future of Marketing podcast website.";
    canonicalUrl = `${SITE_URL}/privacy`;
  } else {
    // Homepage JSON-LD
    jsonLd = `<script type="application/ld+json">${JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          name: "Future of Marketing",
          url: SITE_URL,
          description: SITE_DESCRIPTION,
          publisher: { "@type": "Organization", name: "Future of Marketing" },
        },
        {
          "@type": "PodcastSeries",
          name: "Future of Marketing Podcast",
          url: SITE_URL,
          description: SITE_DESCRIPTION,
          webFeed: `${SITE_URL}/rss.xml`,
          image: HOMEPAGE_OG_IMAGE,
        },
      ],
    })}</script>`;
  }

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}" />
  <link rel="canonical" href="${canonicalUrl}" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(description)}" />
  <meta property="og:image" content="${esc(ogImage)}" />
  <meta property="og:url" content="${canonicalUrl}" />
  <meta property="og:type" content="${ogType}" />
  <meta property="og:site_name" content="Future of Marketing" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${esc(title)}" />
  <meta name="twitter:description" content="${esc(description)}" />
  <meta name="twitter:image" content="${esc(ogImage)}" />
  ${jsonLd}
  <meta http-equiv="refresh" content="0;url=${canonicalUrl}" />
</head>
<body>
  <h1>${esc(title)}</h1>
  <p>${esc(description)}</p>
  <a href="${canonicalUrl}">Visit ${canonicalUrl}</a>
</body>
</html>`;

  return new Response(html, {
    status: 200,
    headers: {
      ...corsHeaders,
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
});

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
