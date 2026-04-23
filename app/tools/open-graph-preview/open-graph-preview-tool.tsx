"use client";

import { useCallback, useId, useMemo, useState } from "react";
import { ClipboardCopy, Loader2, RefreshCw } from "lucide-react";

import {
  buildOgMetaSnippet,
  normalizeUrl,
  parseOgFromHtml,
  safeHostname,
} from "@/lib/og-preview-utils";

const DEFAULT_URL = "https://www.smartflexa.com";
const DEFAULT_TITLE = "SmartFlexa — Free Online Tools";
const DEFAULT_DESC =
  "Format JSON, compress images, generate meta tags, and more. Fast utilities that run in your browser.";
const DEFAULT_IMAGE =
  "https://placehold.co/1200x630/e2e8f0/334155?text=Open+Graph+Preview";

function OgImageBlock({ src, alt }: { src: string; alt: string }) {
  const [broken, setBroken] = useState(false);
  if (!src.trim() || broken) {
    return (
      <div
        className="flex aspect-[1200/630] w-full items-center justify-center bg-muted text-center text-sm text-muted-foreground"
        aria-hidden={!src.trim()}
      >
        {src.trim() ? "Image failed to load" : "No image URL — add og:image for a rich preview"}
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element -- user-supplied preview URL
    <img
      src={src}
      alt={alt}
      className="aspect-[1200/630] w-full object-cover"
      onError={() => setBroken(true)}
    />
  );
}

export function OpenGraphPreviewTool() {
  const urlId = useId();
  const titleId = useId();
  const descId = useId();
  const imageId = useId();

  const [pageUrl, setPageUrl] = useState(DEFAULT_URL);
  const [title, setTitle] = useState(DEFAULT_TITLE);
  const [description, setDescription] = useState(DEFAULT_DESC);
  const [imageUrl, setImageUrl] = useState(DEFAULT_IMAGE);
  const [fetching, setFetching] = useState(false);
  const [fetchMessage, setFetchMessage] = useState<string | null>(null);
  const [copyState, setCopyState] = useState<string | null>(null);

  const domain = useMemo(() => safeHostname(pageUrl), [pageUrl]);

  const applyFetchResult = useCallback((html: string, resolvedUrl: string) => {
    const parsed = parseOgFromHtml(html, resolvedUrl);
    setTitle(parsed.title?.trim() || "Page title");
    setDescription(
      parsed.description?.trim() ||
        "Add a meta description so previews and snippets stay compelling.",
    );
    setImageUrl(parsed.image?.trim() || "");
    setPageUrl(parsed.canonicalUrl?.trim() || resolvedUrl);
  }, []);

  const handleFetch = async () => {
    const target = normalizeUrl(pageUrl);
    if (!target) {
      setFetchMessage("Enter a URL to fetch.");
      return;
    }
    setFetching(true);
    setFetchMessage(null);
    try {
      const res = await fetch(target, {
        method: "GET",
        mode: "cors",
        credentials: "omit",
        headers: { Accept: "text/html,application/xhtml+xml" },
      });
      if (!res.ok) {
        setFetchMessage(`Request failed (${res.status}). Try pasting meta values manually.`);
        return;
      }
      const html = await res.text();
      applyFetchResult(html, target);
      setFetchMessage("Loaded tags from URL (best effort).");
    } catch {
      setFetchMessage(
        "Could not fetch (often blocked by CORS). Edit fields manually or paste from View Source.",
      );
    } finally {
      setFetching(false);
    }
  };

  const copyMeta = async () => {
    const text = buildOgMetaSnippet({
      url: pageUrl,
      title,
      description,
      imageUrl,
    });
    try {
      await navigator.clipboard.writeText(text);
      setCopyState("Meta tags copied.");
      window.setTimeout(() => setCopyState(null), 2200);
    } catch {
      setCopyState("Clipboard blocked — select and copy manually.");
      window.setTimeout(() => setCopyState(null), 3200);
    }
  };

  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
      <div className="space-y-6 rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">Page &amp; tags</h2>

        <div className="space-y-2">
          <label htmlFor={urlId} className="text-sm font-medium text-foreground">
            URL
          </label>
          <input
            id={urlId}
            type="url"
            value={pageUrl}
            onChange={(e) => setPageUrl(e.target.value)}
            placeholder="https://example.com/page"
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
            autoComplete="url"
          />
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => void handleFetch()}
              disabled={fetching}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
            >
              {fetching ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              ) : (
                <RefreshCw className="h-4 w-4" aria-hidden />
              )}
              Fetch from URL
            </button>
            <button
              type="button"
              onClick={() => void copyMeta()}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted"
            >
              <ClipboardCopy className="h-4 w-4" aria-hidden />
              Copy meta tags
            </button>
          </div>
          <p className="text-xs leading-relaxed text-muted-foreground">
            Fetch only works when the target allows browser CORS (many production sites do not).
            You can always paste values from your HTML or CMS.
          </p>
          {fetchMessage && (
            <p className="text-sm text-muted-foreground" role="status">
              {fetchMessage}
            </p>
          )}
          {copyState && (
            <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400" role="status">
              {copyState}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor={titleId} className="text-sm font-medium text-foreground">
            Title
          </label>
          <input
            id={titleId}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor={descId} className="text-sm font-medium text-foreground">
            Description
          </label>
          <textarea
            id={descId}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full resize-y rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor={imageId} className="text-sm font-medium text-foreground">
            Image URL (og:image)
          </label>
          <input
            id={imageId}
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://example.com/og.jpg"
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
      </div>

      <div className="space-y-8">
        <div>
          <h2 className="mb-3 text-lg font-semibold tracking-tight text-foreground">
            Facebook-style share card
          </h2>
          <div className="rounded-xl border border-[#dddfe2] bg-[#f0f2f5] p-3 shadow-inner dark:border-border dark:bg-muted/40">
            <div className="overflow-hidden rounded-lg border border-[#dddfe2] bg-white shadow-sm dark:border-border dark:bg-card">
              <OgImageBlock
                key={imageUrl.trim()}
                src={imageUrl.trim()}
                alt={title ? `${title} preview` : "Link preview image"}
              />
              <div className="space-y-1.5 p-3">
                <p className="text-xs uppercase tracking-wide text-[#606770] dark:text-muted-foreground">
                  {domain}
                </p>
                <p className="line-clamp-2 text-[15px] font-semibold leading-snug text-[#1c1e21] dark:text-foreground">
                  {title || "Title"}
                </p>
                <p className="line-clamp-3 text-sm leading-relaxed text-[#606770] dark:text-muted-foreground">
                  {description || "Description"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="mb-3 text-lg font-semibold tracking-tight text-foreground">
            X (Twitter) summary card
          </h2>
          <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
            <OgImageBlock
              key={`tw-${imageUrl.trim()}`}
              src={imageUrl.trim()}
              alt={title ? `${title} preview` : "Link preview image"}
            />
            <div className="border-t border-border p-3">
              <p className="text-[13px] text-muted-foreground">{domain}</p>
              <p className="mt-0.5 line-clamp-2 text-[15px] font-semibold leading-snug text-foreground">
                {title || "Title"}
              </p>
              <p className="mt-1 line-clamp-3 text-[15px] leading-relaxed text-muted-foreground">
                {description || "Description"}
              </p>
            </div>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Previews are approximations; platforms apply their own cropping, caching, and dark
            mode.
          </p>
        </div>
      </div>
    </div>
  );
}
