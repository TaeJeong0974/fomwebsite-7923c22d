import { podcastEpisodes } from "@/lib/podcastData";
import { SITE_URL } from "@/lib/seoConstants";

function esc(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function GET() {
  const eps = podcastEpisodes
    .filter(
      (e) =>
        !e.comingSoon && e.publishedDate && e.publishedDate !== "Coming Soon"
    )
    .sort(
      (a, b) =>
        new Date(b.publishedDate).getTime() -
        new Date(a.publishedDate).getTime()
    );

  const items = eps
    .map((e) => {
      const firstP =
        (e.fullDescription || "")
          .split(/\n\n/)[0]
          ?.trim()
          .replace(/\n/g, " ") ?? "";
      const desc = firstP || e.overview || "";
      return `    <item>
      <title>${esc(`${e.name}: ${e.overview}`)}</title>
      <link>${SITE_URL}/podcast/${e.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/podcast/${e.slug}</guid>
      <pubDate>${new Date(e.publishedDate).toUTCString()}</pubDate>
      <description>${esc(desc)}</description>${e.duration ? `\n      <itunes:duration>${e.duration.replace(" min", ":00")}</itunes:duration>` : ""}
      <itunes:author>Future of Marketing</itunes:author>
    </item>`;
    })
    .join("\n\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">
  <channel>
    <title>Future of Marketing</title>
    <link>${SITE_URL}</link>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <description>Future of Marketing explores how B2B marketing teams are actually using AI at work. Each episode features honest conversations with CMOs, growth leaders, and operators about real workflows, real decisions, and the trade-offs involved in AI adoption across GTM, content, SEO, analytics, and revenue teams.</description>
    <language>en</language>
    <copyright>© ${new Date().getFullYear()} Future of Marketing. All rights reserved.</copyright>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <itunes:author>XYZ Venture Capital, Upside, Graphite Growth</itunes:author>
    <itunes:category text="Business">
      <itunes:category text="Marketing" />
    </itunes:category>
    <itunes:explicit>false</itunes:explicit>
    <itunes:image href="${SITE_URL}/images/og-homepage.jpg" />
    <image>
      <url>${SITE_URL}/images/og-homepage.jpg</url>
      <title>Future of Marketing</title>
      <link>${SITE_URL}</link>
    </image>

${items}

  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=300, must-revalidate",
    },
  });
}
