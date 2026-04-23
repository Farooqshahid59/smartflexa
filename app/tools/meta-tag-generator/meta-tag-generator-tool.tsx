"use client";

import { Copy, Check } from "lucide-react";
import { useId, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  buildMetaTagsHtml,
  defaultMetaTagGeneratorState,
  type MetaTagGeneratorState,
  type RobotsFollow,
  type RobotsIndex,
} from "@/lib/meta-tag-html";

function snippetTitle(title: string, maxLen = 60): string {
  const t = title.trim();
  if (t.length <= maxLen) return t;
  return `${t.slice(0, maxLen - 1)}…`;
}

function snippetDescription(desc: string, maxLen = 160): string {
  const d = desc.trim().replace(/\s+/g, " ");
  if (d.length <= maxLen) return d;
  return `${d.slice(0, maxLen - 1)}…`;
}

export function MetaTagGeneratorTool() {
  const baseId = useId();
  const [state, setState] = useState<MetaTagGeneratorState>(defaultMetaTagGeneratorState);
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">("idle");

  const html = useMemo(() => buildMetaTagsHtml(state), [state]);

  const patch = (partial: Partial<MetaTagGeneratorState>) => {
    setState((prev) => ({ ...prev, ...partial }));
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(html);
      setCopyStatus("copied");
      window.setTimeout(() => setCopyStatus("idle"), 2000);
    } catch {
      setCopyStatus("error");
      window.setTimeout(() => setCopyStatus("idle"), 2500);
    }
  };

  const inputClass =
    "mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50";

  const labelClass = "text-xs font-medium text-foreground";

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
      <div className="space-y-6">
        <section className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-semibold tracking-tight text-foreground">Page & SEO</h2>
          <div className="mt-4 space-y-4">
            <div>
              <label htmlFor={`${baseId}-title`} className={labelClass}>
                Page title
              </label>
              <input
                id={`${baseId}-title`}
                type="text"
                value={state.pageTitle}
                onChange={(e) => patch({ pageTitle: e.target.value })}
                className={inputClass}
                autoComplete="off"
              />
            </div>
            <div>
              <label htmlFor={`${baseId}-desc`} className={labelClass}>
                Meta description
              </label>
              <textarea
                id={`${baseId}-desc`}
                value={state.metaDescription}
                onChange={(e) => patch({ metaDescription: e.target.value })}
                rows={4}
                className={`${inputClass} min-h-[100px] resize-y`}
              />
            </div>
            <div>
              <label htmlFor={`${baseId}-kw`} className={labelClass}>
                Keywords <span className="font-normal text-muted-foreground">(optional)</span>
              </label>
              <input
                id={`${baseId}-kw`}
                type="text"
                value={state.keywords}
                onChange={(e) => patch({ keywords: e.target.value })}
                className={inputClass}
                placeholder="keyword one, keyword two"
              />
            </div>
            <div>
              <label htmlFor={`${baseId}-author`} className={labelClass}>
                Author
              </label>
              <input
                id={`${baseId}-author`}
                type="text"
                value={state.author}
                onChange={(e) => patch({ author: e.target.value })}
                className={inputClass}
                placeholder="Name or organization"
              />
            </div>
            <div>
              <label htmlFor={`${baseId}-viewport`} className={labelClass}>
                Viewport
              </label>
              <input
                id={`${baseId}-viewport`}
                type="text"
                value={state.viewport}
                onChange={(e) => patch({ viewport: e.target.value })}
                className={`${inputClass} font-mono text-xs sm:text-sm`}
                spellCheck={false}
              />
              <p className="mt-1 text-xs text-muted-foreground">
                Default is responsive: <code className="rounded bg-muted px-1">width=device-width, initial-scale=1</code>
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor={`${baseId}-ri`} className={labelClass}>
                  Robots: index
                </label>
                <select
                  id={`${baseId}-ri`}
                  value={state.robotsIndex}
                  onChange={(e) => patch({ robotsIndex: e.target.value as RobotsIndex })}
                  className={inputClass}
                >
                  <option value="index">index</option>
                  <option value="noindex">noindex</option>
                </select>
              </div>
              <div>
                <label htmlFor={`${baseId}-rf`} className={labelClass}>
                  Robots: follow
                </label>
                <select
                  id={`${baseId}-rf`}
                  value={state.robotsFollow}
                  onChange={(e) => patch({ robotsFollow: e.target.value as RobotsFollow })}
                  className={inputClass}
                >
                  <option value="follow">follow</option>
                  <option value="nofollow">nofollow</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-semibold tracking-tight text-foreground">Open Graph</h2>
          <div className="mt-4 space-y-4">
            <div>
              <label htmlFor={`${baseId}-ogt`} className={labelClass}>
                og:title
              </label>
              <input
                id={`${baseId}-ogt`}
                type="text"
                value={state.ogTitle}
                onChange={(e) => patch({ ogTitle: e.target.value })}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor={`${baseId}-ogd`} className={labelClass}>
                og:description
              </label>
              <textarea
                id={`${baseId}-ogd`}
                value={state.ogDescription}
                onChange={(e) => patch({ ogDescription: e.target.value })}
                rows={3}
                className={`${inputClass} min-h-[80px] resize-y`}
              />
            </div>
            <div>
              <label htmlFor={`${baseId}-ogi`} className={labelClass}>
                og:image <span className="font-normal text-muted-foreground">(URL)</span>
              </label>
              <input
                id={`${baseId}-ogi`}
                type="url"
                value={state.ogImage}
                onChange={(e) => patch({ ogImage: e.target.value })}
                className={`${inputClass} font-mono text-xs sm:text-sm`}
                placeholder="https://"
                spellCheck={false}
              />
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-semibold tracking-tight text-foreground">Twitter Card</h2>
          <div className="mt-4 space-y-4">
            <div>
              <label htmlFor={`${baseId}-tt`} className={labelClass}>
                twitter:title
              </label>
              <input
                id={`${baseId}-tt`}
                type="text"
                value={state.twitterTitle}
                onChange={(e) => patch({ twitterTitle: e.target.value })}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor={`${baseId}-td`} className={labelClass}>
                twitter:description
              </label>
              <textarea
                id={`${baseId}-td`}
                value={state.twitterDescription}
                onChange={(e) => patch({ twitterDescription: e.target.value })}
                rows={3}
                className={`${inputClass} min-h-[80px] resize-y`}
              />
            </div>
            <div>
              <label htmlFor={`${baseId}-ti`} className={labelClass}>
                twitter:image <span className="font-normal text-muted-foreground">(URL)</span>
              </label>
              <input
                id={`${baseId}-ti`}
                type="url"
                value={state.twitterImage}
                onChange={(e) => patch({ twitterImage: e.target.value })}
                className={`${inputClass} font-mono text-xs sm:text-sm`}
                placeholder="https://"
                spellCheck={false}
              />
            </div>
          </div>
        </section>
      </div>

      <div className="space-y-6 lg:sticky lg:top-24">
        <section
          className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6"
          aria-labelledby={`${baseId}-preview-heading`}
        >
          <h2
            id={`${baseId}-preview-heading`}
            className="text-lg font-semibold tracking-tight text-foreground"
          >
            Search preview
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Approximate Google result appearance (title and description lengths vary by device).
          </p>
          <div className="mt-4 rounded-lg border border-border bg-background p-4 shadow-inner">
            <p className="truncate text-sm text-emerald-700 dark:text-emerald-400">
              example.com › page
            </p>
            <p className="mt-1 text-lg font-normal text-blue-700 decoration-blue-700 underline-offset-2 hover:underline dark:text-blue-400">
              {snippetTitle(state.pageTitle) || "Page title"}
            </p>
            <p className="mt-1 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
              {snippetDescription(state.metaDescription) || "Meta description will appear here."}
            </p>
          </div>
        </section>

        <section className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-semibold tracking-tight text-foreground">Generated HTML</h2>
            <Button type="button" variant="outline" size="sm" onClick={handleCopy}>
              {copyStatus === "copied" ? (
                <>
                  <Check className="size-4 text-emerald-600" aria-hidden />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="size-4" aria-hidden />
                  Copy to clipboard
                </>
              )}
            </Button>
          </div>
          {copyStatus === "error" ? (
            <p className="mt-2 text-xs text-destructive" role="status">
              Copy failed — select the code manually.
            </p>
          ) : null}
          <pre
            className="mt-4 max-h-[min(70vh,520px)] overflow-auto rounded-lg border border-border bg-muted/30 p-4 text-left text-xs leading-relaxed text-foreground sm:text-sm"
            tabIndex={0}
          >
            <code>{html}</code>
          </pre>
        </section>
      </div>
    </div>
  );
}
