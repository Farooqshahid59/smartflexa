/** Normalize a path rule: trim, ensure leading slash, drop empty. */
export function normalizeRobotsPath(path: string): string | null {
  const t = path.trim();
  if (!t) return null;
  if (t.startsWith("/")) return t;
  return `/${t}`;
}

export type RobotsTxtInput = {
  userAgent: string;
  allowPaths: string[];
  disallowPaths: string[];
  crawlDelay: string;
  sitemapLines: string[];
};

export function buildRobotsTxt(input: RobotsTxtInput): string {
  const ua = input.userAgent.trim() || "*";
  const lines: string[] = [];

  lines.push(`User-agent: ${ua}`);

  const allows = input.allowPaths.map(normalizeRobotsPath).filter(Boolean) as string[];
  const disallows = input.disallowPaths.map(normalizeRobotsPath).filter(Boolean) as string[];

  for (const p of allows) {
    lines.push(`Allow: ${p}`);
  }
  for (const p of disallows) {
    lines.push(`Disallow: ${p}`);
  }

  const cd = parseFloat((input.crawlDelay ?? "").replace(/,/g, "."));
  if (Number.isFinite(cd) && cd > 0) {
    lines.push(`Crawl-delay: ${Math.max(1, Math.round(cd))}`);
  }

  const sitemaps = input.sitemapLines
    .flatMap((line) => line.split("\n"))
    .map((s) => s.trim())
    .filter(Boolean);

  if (sitemaps.length > 0) {
    lines.push("");
    for (const url of sitemaps) {
      lines.push(`Sitemap: ${url}`);
    }
  }

  return `${lines.join("\n")}\n`;
}

export const presetAllowAll: Pick<RobotsTxtInput, "allowPaths" | "disallowPaths"> = {
  allowPaths: ["/"],
  disallowPaths: [],
};

export const presetBlockAll: Pick<RobotsTxtInput, "allowPaths" | "disallowPaths"> = {
  allowPaths: [],
  disallowPaths: ["/"],
};

export const presetBlockFolders: Pick<RobotsTxtInput, "allowPaths" | "disallowPaths"> = {
  allowPaths: [],
  disallowPaths: ["/wp-admin/", "/wp-includes/", "/cgi-bin/", "/private/", "/tmp/"],
};
