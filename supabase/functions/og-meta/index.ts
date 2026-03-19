/**
 * OG Meta Pre-renderer
 * Serves HTML with correct <head> meta tags for social crawlers (Twitter, Facebook, LinkedIn, etc.)
 * For regular browsers, redirects to the SPA which handles rendering client-side.
 */

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const SITE_URL = "https://fomwebsite.lovable.app";
const DEFAULT_OG_IMAGE = `${SITE_URL}/images/og-homepage.png`;
const DEFAULT_TITLE = "Future of Marketing Podcast | How AI Is Changing Marketing";
const DEFAULT_DESC =
  "How AI is reshaping marketing, from the leaders living it. Hosted by Graphite Growth, XYZ Venture Capital, and Upside.";

// OG images per episode slug — mirrors episodeImages.ts OG_IMAGES
const OG_IMAGES: Record<string, string> = {
  "the-future-of-marketing": `${SITE_URL}/images/ep0-og.png`,
  "meagen-eisenberg": `${SITE_URL}/images/ep1-og.png`,
  "lena-waters": `${SITE_URL}/images/og-lena-waters.jpg`,
  "dave-steer": `${SITE_URL}/images/og-dave-steer.jpg`,
  "sara-varni": `${SITE_URL}/images/og-sara-varni.jpg`,
  "kate-johnson": `${SITE_URL}/images/og-kate-johnson.jpg`,
  "idan-koren": `${SITE_URL}/images/og-idan-koren.jpg`,
  "lindsey-irvine": `${SITE_URL}/images/og-lindsey-irvine.jpg`,
  "sheila-vashee": `${SITE_URL}/images/og-sheila-vashee.jpg`,
  "ceci-stallsmith": `${SITE_URL}/images/og-ceci-stallsmith.jpg`,
  "katrina-wong": `${SITE_URL}/images/og-katrina-wong.jpg`,
};

const CRAWLER_UA =
  /Twitterbot|facebookexternalhit|LinkedInBot|Slackbot|Discordbot|WhatsApp|TelegramBot|Applebot|Googlebot|bingbot|Pinterestbot/i;

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildMetaHtml(
  title: string,
  description: string,
  ogImage: string,
  canonicalUrl: string,
  type = "article",
): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}" />
  <link rel="canonical" href="${esc(canonicalUrl)}" />

  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(description)}" />
  <meta property="og:image" content="${esc(ogImage)}" />
  <meta property="og:url" content="${esc(canonicalUrl)}" />
  <meta property="og:type" content="${type}" />
  <meta property="og:site_name" content="Future of Marketing" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@futureofmktg" />
  <meta name="twitter:title" content="${esc(title)}" />
  <meta name="twitter:description" content="${esc(description)}" />
  <meta name="twitter:image" content="${esc(ogImage)}" />

  <meta http-equiv="refresh" content="0;url=${esc(canonicalUrl)}" />
</head>
<body>
  <p>Redirecting to <a href="${esc(canonicalUrl)}">${esc(title)}</a></p>
</body>
</html>`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const userAgent = req.headers.get("user-agent") || "";
    const path = url.searchParams.get("path") || "/";

    // Only serve meta HTML to crawlers
    if (!CRAWLER_UA.test(userAgent)) {
      return new Response(null, {
        status: 302,
        headers: { ...corsHeaders, Location: `${SITE_URL}${path}` },
      });
    }

    // Parse route
    const episodeMatch = path.match(/^\/podcast\/([a-z0-9-]+)\/?$/);

    if (episodeMatch) {
      const slug = episodeMatch[1];

      // Query DB for episode metadata
      const { createClient } = await import(
        "https://esm.sh/@supabase/supabase-js@2"
      );
      const supabase = createClient(
        Deno.env.get("SUPABASE_URL")!,
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      );

      const { data: episode } = await supabase
        .from("episodes")
        .select("slug, title, guest_name, guest_title, guest_company, description, og_image_url, published")
        .eq("slug", slug)
        .single();

      if (!episode || !episode.published) {
        // Return 404 meta for unpublished/missing episodes
        return new Response(
          buildMetaHtml(
            "Episode Not Found | Future of Marketing",
            "The episode you're looking for doesn't exist.",
            DEFAULT_OG_IMAGE,
            `${SITE_URL}${path}`,
          ),
          {
            status: 404,
            headers: { ...corsHeaders, "Content-Type": "text/html; charset=utf-8" },
          },
        );
      }

      const guestName = episode.guest_name || episode.title;
      const ogImage = episode.og_image_url || OG_IMAGES[slug] || DEFAULT_OG_IMAGE;
      const title = `${guestName} on ${episode.description} | Future of Marketing`;
      const desc = episode.guest_title && episode.guest_company
        ? `${guestName} (${episode.guest_title}, ${episode.guest_company}) discusses ${episode.description}. Listen now on YouTube, Spotify, and Apple Podcasts.`
        : `${guestName} joins the Future of Marketing podcast. Listen now.`;
      const canonical = `${SITE_URL}/podcast/${slug}`;

      return new Response(buildMetaHtml(title, desc, ogImage, canonical), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "text/html; charset=utf-8" },
      });
    }

    // Homepage
    if (path === "/" || path === "") {
      return new Response(
        buildMetaHtml(DEFAULT_TITLE, DEFAULT_DESC, DEFAULT_OG_IMAGE, SITE_URL, "website"),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "text/html; charset=utf-8" },
        },
      );
    }

    // All other pages — redirect to SPA
    return new Response(null, {
      status: 302,
      headers: { ...corsHeaders, Location: `${SITE_URL}${path}` },
    });
  } catch (error) {
    console.error("og-meta error:", error);
    return new Response(
      buildMetaHtml(DEFAULT_TITLE, DEFAULT_DESC, DEFAULT_OG_IMAGE, SITE_URL, "website"),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "text/html; charset=utf-8" },
      },
    );
  }
});
