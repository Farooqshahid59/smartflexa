/** Escape text for use inside HTML attribute values (double-quoted). */
export function escapeHtmlAttribute(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** Escape for <title> text nodes (avoid accidental tag break). */
export function escapeTitleText(value: string): string {
  return value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export type RobotsIndex = "index" | "noindex";
export type RobotsFollow = "follow" | "nofollow";

export type MetaTagGeneratorState = {
  pageTitle: string;
  metaDescription: string;
  keywords: string;
  author: string;
  viewport: string;
  robotsIndex: RobotsIndex;
  robotsFollow: RobotsFollow;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
};

const DEFAULT_VIEWPORT = "width=device-width, initial-scale=1";

export const defaultMetaTagGeneratorState: MetaTagGeneratorState = {
  pageTitle: "My Page Title | Example Site",
  metaDescription:
    "A concise summary of this page for search results—aim for roughly 150–160 characters so it displays fully in Google.",
  keywords: "",
  author: "",
  viewport: DEFAULT_VIEWPORT,
  robotsIndex: "index",
  robotsFollow: "follow",
  ogTitle: "My Page Title | Example Site",
  ogDescription:
    "Social preview text when this link is shared—can match or extend your meta description.",
  ogImage: "https://example.com/og-image.jpg",
  twitterTitle: "My Page Title | Example Site",
  twitterDescription: "Twitter card description for this URL.",
  twitterImage: "https://example.com/twitter-image.jpg",
};

export function buildMetaTagsHtml(s: MetaTagGeneratorState): string {
  const lines: string[] = [];
  const esc = escapeHtmlAttribute;
  const escTitle = escapeTitleText;

  lines.push("<!-- Primary SEO -->");
  lines.push(`<title>${escTitle(s.pageTitle)}</title>`);
  lines.push(`<meta name="description" content="${esc(s.metaDescription)}" />`);

  if (s.keywords.trim()) {
    lines.push(`<meta name="keywords" content="${esc(s.keywords.trim())}" />`);
  }
  if (s.author.trim()) {
    lines.push(`<meta name="author" content="${esc(s.author.trim())}" />`);
  }

  const viewport = s.viewport.trim() || DEFAULT_VIEWPORT;
  lines.push(`<meta name="viewport" content="${esc(viewport)}" />`);

  const robots = `${s.robotsIndex}, ${s.robotsFollow}`;
  lines.push(`<meta name="robots" content="${esc(robots)}" />`);

  lines.push("");
  lines.push("<!-- Open Graph -->");
  lines.push(`<meta property="og:type" content="website" />`);
  lines.push(`<meta property="og:title" content="${esc(s.ogTitle)}" />`);
  lines.push(`<meta property="og:description" content="${esc(s.ogDescription)}" />`);
  if (s.ogImage.trim()) {
    lines.push(`<meta property="og:image" content="${esc(s.ogImage.trim())}" />`);
  }

  lines.push("");
  lines.push("<!-- Twitter Card -->");
  const hasTwitterImage = s.twitterImage.trim().length > 0;
  lines.push(
    `<meta name="twitter:card" content="${hasTwitterImage ? "summary_large_image" : "summary"}" />`,
  );
  lines.push(`<meta name="twitter:title" content="${esc(s.twitterTitle)}" />`);
  lines.push(`<meta name="twitter:description" content="${esc(s.twitterDescription)}" />`);
  if (s.twitterImage.trim()) {
    lines.push(`<meta name="twitter:image" content="${esc(s.twitterImage.trim())}" />`);
  }

  return lines.join("\n");
}
