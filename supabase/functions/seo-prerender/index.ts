const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const SITE_URL = "https://fom.xyz";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og/default.jpg`;
const HOMEPAGE_OG_IMAGE = `${SITE_URL}/images/og-homepage.png`;
const SITE_TITLE = "Future of Marketing Podcast | How AI Is Changing Marketing";
const SITE_DESCRIPTION =
  "How AI is reshaping marketing, from the leaders living it. Hosted by Graphite Growth, XYZ Venture Capital, and Upside.";

// Known crawler user-agents
const CRAWLER_REGEX =
  /googlebot|bingbot|yandex|baiduspider|twitterbot|facebookexternalhit|linkedinbot|slackbot|discordbot|whatsapp|telegrambot|applebot|pinterestbot|redditbot|embedly|showyoubot|outbrain|quora link preview|rogerbot|vkshare/i;

function isCrawler(ua: string): boolean {
  return CRAWLER_REGEX.test(ua);
}

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const url = new URL(req.url);
  const userAgent = req.headers.get("user-agent") || "";

  // Get the path from query param or X-Original-Path header
  const path = url.searchParams.get("path") || req.headers.get("x-original-path") || "/";

  // If not a crawler, redirect to the SPA
  if (!isCrawler(userAgent)) {
    return new Response(null, {
      status: 302,
      headers: { ...corsHeaders, Location: `${SITE_URL}${path}` },
    });
  }

  // Determine which page to render meta tags for
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

    try {
      const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
      const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY")!;
      const supabase = createClient(supabaseUrl, supabaseKey);

      const { data: episode } = await supabase
        .from("live_episodes")
        .select("*")
        .eq("slug", slug)
        .single();

      if (episode) {
        const guestName = episode.guest_name || "";
        const guestTitle = episode.guest_title || "";
        const guestCompany = episode.guest_company || "";

        title = guestName
          ? `${guestName} (${guestCompany}) on the Future of Marketing`
          : episode.title;
        description =
          episode.description ||
          `Join us for a conversation with ${guestName}, ${guestTitle} at ${guestCompany}.`;
        ogImage = episode.og_image_url || DEFAULT_OG_IMAGE;

        // Build JSON-LD for the episode
        const episodeJsonLd = {
          "@context": "https://schema.org",
          "@type": "PodcastEpisode",
          name: title,
          description,
          url: canonicalUrl,
          ...(episode.youtube_url && { video: { "@type": "VideoObject", embedUrl: episode.youtube_url } }),
          partOfSeries: {
            "@type": "PodcastSeries",
            name: "Future of Marketing Podcast",
            url: SITE_URL,
          },
        };
        jsonLd = `<script type="application/ld+json">${JSON.stringify(episodeJsonLd)}</script>`;
      } else {
        // Try the staging episodes table as fallback
        const { data: stagingEp } = await supabase
          .from("episodes")
          .select("*")
          .eq("slug", slug)
          .eq("published", true)
          .single();

        if (stagingEp) {
          const guestName = stagingEp.guest_name || "";
          const guestTitle = stagingEp.guest_title || "";
          const guestCompany = stagingEp.guest_company || "";

          title = guestName
            ? `${guestName} (${guestCompany}) on the Future of Marketing`
            : stagingEp.title;
          description =
            stagingEp.description ||
            `Join us for a conversation with ${guestName}, ${guestTitle} at ${guestCompany}.`;
          ogImage = stagingEp.og_image_url || DEFAULT_OG_IMAGE;
        }
      }
    } catch (e) {
      console.error("Error fetching episode:", e);
    }
  } else if (path === "/privacy") {
    title = "Privacy Policy | Future of Marketing";
    description = "Privacy policy for the Future of Marketing podcast website.";
    canonicalUrl = `${SITE_URL}/privacy`;
  }

  // Build the HTML response with meta tags
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <link rel="canonical" href="${canonicalUrl}" />

  <!-- Open Graph -->
  <meta property="og:title" content="${escapeHtml(title)}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:image" content="${escapeHtml(ogImage)}" />
  <meta property="og:url" content="${canonicalUrl}" />
  <meta property="og:type" content="${ogType}" />
  <meta property="og:site_name" content="Future of Marketing" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(title)}" />
  <meta name="twitter:description" content="${escapeHtml(description)}" />
  <meta name="twitter:image" content="${escapeHtml(ogImage)}" />

  ${jsonLd}

  <!-- Redirect non-crawlers to the SPA -->
  <meta http-equiv="refresh" content="0;url=${canonicalUrl}" />
</head>
<body>
  <h1>${escapeHtml(title)}</h1>
  <p>${escapeHtml(description)}</p>
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

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
