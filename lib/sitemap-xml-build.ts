export type SitemapChangefreq = "daily" | "weekly" | "monthly";

export function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** Normalize site base to origin (no trailing slash). Returns null if invalid. */
export function normalizeWebsiteBase(input: string): string | null {
  const t = input.trim();
  if (!t) return null;
  try {
    const u = new URL(t.includes("://") ? t : `https://${t}`);
    if (u.protocol !== "http:" && u.protocol !== "https:") return null;
    return `${u.protocol}//${u.host}`;
  } catch {
    return null;
  }
}

/** Resolve one user entry to absolute URL. */
export function resolveSitemapUrl(base: string | null, raw: string): string | null {
  const t = raw.trim();
  if (!t) return null;
  try {
    if (/^https?:\/\//i.test(t)) {
      const u = new URL(t);
      if (u.protocol !== "http:" && u.protocol !== "https:") return null;
      u.hash = "";
      return u.href;
    }
    if (!base) return null;
    const path = t.startsWith("/") ? t : `/${t}`;
    const u = new URL(path, `${base}/`);
    u.hash = "";
    return u.href;
  } catch {
    return null;
  }
}

export function parseBulkUrls(text: string): string[] {
  const parts = text
    .split(/[\n,;]+/)
    .map((s) => s.trim())
    .filter(Boolean);
  return parts;
}

export type BuildSitemapInput = {
  urls: string[];
  changefreq: SitemapChangefreq;
  priority: number;
  lastmod?: string;
};

export function buildSitemapXml(input: BuildSitemapInput): string {
  const pr = Math.min(1, Math.max(0, input.priority));
  const prStr = (Math.round(pr * 10) / 10).toFixed(1);

  const lines: string[] = [];
  lines.push(`<?xml version="1.0" encoding="UTF-8"?>`);
  lines.push(
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
  );

  const seen = new Set<string>();
  for (const loc of input.urls) {
    const trimmed = loc.trim();
    if (!trimmed || seen.has(trimmed)) continue;
    seen.add(trimmed);
    lines.push(`  <url>`);
    lines.push(`    <loc>${escapeXml(trimmed)}</loc>`);
    const lm = input.lastmod?.trim();
    if (lm) {
      lines.push(`    <lastmod>${escapeXml(lm)}</lastmod>`);
    }
    lines.push(`    <changefreq>${escapeXml(input.changefreq)}</changefreq>`);
    lines.push(`    <priority>${escapeXml(prStr)}</priority>`);
    lines.push(`  </url>`);
  }

  lines.push(`</urlset>`);
  lines.push("");
  return lines.join("\n");
}
