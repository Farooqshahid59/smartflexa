/** Normalize user URL input to an absolute URL string for fetch/display. */
export function normalizeUrl(input: string): string {
  const t = input.trim();
  if (!t) return "";
  if (!/^https?:\/\//i.test(t)) return `https://${t}`;
  return t;
}

export function safeHostname(urlInput: string): string {
  try {
    const u = new URL(normalizeUrl(urlInput));
    return u.hostname.replace(/^www\./i, "") || "yoursite.com";
  } catch {
    return "yoursite.com";
  }
}

export function resolveAgainstBase(baseUrl: string, href: string): string {
  const base = normalizeUrl(baseUrl);
  if (!href.trim()) return "";
  try {
    return new URL(href.trim(), base || undefined).href;
  } catch {
    return href.trim();
  }
}

export type ParsedOgFields = {
  title: string;
  description: string;
  image: string;
  canonicalUrl: string;
};

function metaContent(doc: Document, property?: string, name?: string): string {
  for (const el of doc.querySelectorAll("meta")) {
    const content = el.getAttribute("content")?.trim();
    if (!content) continue;
    if (property && el.getAttribute("property") === property) return content;
    if (name && el.getAttribute("name") === name) return content;
  }
  return "";
}

/**
 * Parse Open Graph / Twitter / basic meta from HTML (browser only).
 */
export function parseOgFromHtml(html: string, pageUrl: string): ParsedOgFields {
  const doc = new DOMParser().parseFromString(html, "text/html");
  const base = normalizeUrl(pageUrl) || "https://example.com/";

  const ogTitle = metaContent(doc, "og:title");
  const twTitle = metaContent(doc, undefined, "twitter:title");
  const titleEl = doc.querySelector("title")?.textContent?.trim() ?? "";

  const ogDesc = metaContent(doc, "og:description");
  const twDesc = metaContent(doc, undefined, "twitter:description");
  const metaDesc = metaContent(doc, undefined, "description");

  let image =
    metaContent(doc, "og:image") ||
    metaContent(doc, "og:image:url") ||
    metaContent(doc, undefined, "twitter:image") ||
    metaContent(doc, undefined, "twitter:image:src");

  if (image) image = resolveAgainstBase(base, image);

  const ogUrl = metaContent(doc, "og:url");

  return {
    title: ogTitle || twTitle || titleEl || "Page title",
    description:
      ogDesc || twDesc || metaDesc || "Add a meta description so previews and snippets stay compelling.",
    image,
    canonicalUrl: ogUrl ? resolveAgainstBase(base, ogUrl) : base,
  };
}

export function buildOgMetaSnippet(input: {
  url: string;
  title: string;
  description: string;
  imageUrl: string;
}): string {
  const pageUrl = normalizeUrl(input.url) || "https://www.example.com/page";
  const esc = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

  const lines = [
    `<!-- Open Graph -->`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:url" content="${esc(pageUrl)}" />`,
    `<meta property="og:title" content="${esc(input.title)}" />`,
    `<meta property="og:description" content="${esc(input.description)}" />`,
  ];
  if (input.imageUrl.trim()) {
    lines.push(`<meta property="og:image" content="${esc(input.imageUrl.trim())}" />`);
  }
  lines.push(
    ``,
    `<!-- Twitter -->`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(input.title)}" />`,
    `<meta name="twitter:description" content="${esc(input.description)}" />`,
  );
  if (input.imageUrl.trim()) {
    lines.push(`<meta name="twitter:image" content="${esc(input.imageUrl.trim())}" />`);
  }
  return lines.join("\n");
}
