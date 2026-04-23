"use client";

import { Check, Copy, Download, Plus, Trash2 } from "lucide-react";
import { useId, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  buildSitemapXml,
  normalizeWebsiteBase,
  parseBulkUrls,
  resolveSitemapUrl,
  type SitemapChangefreq,
} from "@/lib/sitemap-xml-build";

const CHANGEFREQ_OPTIONS: { value: SitemapChangefreq; label: string }[] = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
];

export function SitemapGeneratorTool() {
  const baseId = useId();
  const [websiteUrl, setWebsiteUrl] = useState("https://example.com");
  const [urlRows, setUrlRows] = useState<string[]>(["/", "/about", "/contact"]);
  const [bulkText, setBulkText] = useState("");
  const [changefreq, setChangefreq] = useState<SitemapChangefreq>("weekly");
  const [priority, setPriority] = useState(0.8);
  const [lastmod, setLastmod] = useState("");
  const [validateUrls, setValidateUrls] = useState(true);
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">("idle");
  const [bulkMessage, setBulkMessage] = useState<string | null>(null);

  const base = useMemo(() => normalizeWebsiteBase(websiteUrl), [websiteUrl]);

  const { resolved, invalid } = useMemo(() => {
    const ok: string[] = [];
    const bad: string[] = [];
    for (const row of urlRows) {
      const r = resolveSitemapUrl(base, row);
      if (r) ok.push(r);
      else if (row.trim()) bad.push(row.trim());
    }
    const deduped = [...new Set(ok)];
    return { resolved: deduped, invalid: bad };
  }, [base, urlRows]);

  const xml = useMemo(
    () =>
      buildSitemapXml({
        urls: resolved.length ? resolved : [],
        changefreq,
        priority,
        lastmod: lastmod || undefined,
      }),
    [resolved, changefreq, priority, lastmod],
  );

  const updateRow = (index: number, value: string) => {
    setUrlRows((prev) => prev.map((r, i) => (i === index ? value : r)));
  };

  const addRow = () => setUrlRows((prev) => [...prev, ""]);
  const removeRow = (index: number) => {
    setUrlRows((prev) => (prev.length <= 1 ? prev : prev.filter((_, i) => i !== index)));
  };

  const addHomepageRow = () => {
    if (!base) return;
    const home = `${base}/`;
    setUrlRows((prev) => {
      const resolvedHome = resolveSitemapUrl(base, home);
      if (prev.some((r) => resolveSitemapUrl(base, r) === resolvedHome)) return prev;
      return [home, ...prev];
    });
  };

  const mergeBulk = () => {
    const parts = parseBulkUrls(bulkText);
    if (parts.length === 0) {
      setBulkMessage("Paste one or more URLs (lines or commas).");
      window.setTimeout(() => setBulkMessage(null), 3000);
      return;
    }
    let added = 0;
    const next = [...urlRows];
    for (const p of parts) {
      if (validateUrls) {
        const r = resolveSitemapUrl(base, p);
        if (!r) continue;
        if (!next.some((row) => resolveSitemapUrl(base, row) === r)) {
          next.push(p);
          added++;
        }
      } else {
        const r = resolveSitemapUrl(base, p);
        if (r && next.some((row) => resolveSitemapUrl(base, row) === r)) continue;
        next.push(p);
        added++;
      }
    }
    setUrlRows(next);
    setBulkMessage(`Added ${added} URL(s). Skipped invalid or duplicate entries.`);
    window.setTimeout(() => setBulkMessage(null), 4000);
    setBulkText("");
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(xml);
      setCopyStatus("copied");
      window.setTimeout(() => setCopyStatus("idle"), 2000);
    } catch {
      setCopyStatus("error");
      window.setTimeout(() => setCopyStatus("idle"), 2500);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([xml], { type: "application/xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sitemap.xml";
    a.rel = "noopener";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const inputClass =
    "mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50";
  const labelClass = "text-xs font-medium text-foreground";

  const emptyOutput = resolved.length === 0;

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
      <div className="space-y-6">
        <section className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-semibold tracking-tight text-foreground">Site & defaults</h2>
          <div className="mt-4 space-y-4">
            <div>
              <label htmlFor={`${baseId}-site`} className={labelClass}>
                Website URL
              </label>
              <input
                id={`${baseId}-site`}
                type="url"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                className={`${inputClass} font-mono text-xs sm:text-sm`}
                placeholder="https://example.com"
                spellCheck={false}
              />
              {!base && websiteUrl.trim() ? (
                <p className="mt-1 text-xs text-destructive">Enter a valid http(s) URL.</p>
              ) : (
                <p className="mt-1 text-xs text-muted-foreground">
                  Used to resolve relative paths like <code className="rounded bg-muted px-1">/blog</code>.
                </p>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor={`${baseId}-cf`} className={labelClass}>
                  Change frequency
                </label>
                <select
                  id={`${baseId}-cf`}
                  value={changefreq}
                  onChange={(e) => setChangefreq(e.target.value as SitemapChangefreq)}
                  className={inputClass}
                >
                  {CHANGEFREQ_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor={`${baseId}-pr`} className={labelClass}>
                  Priority (0.0–1.0)
                </label>
                <input
                  id={`${baseId}-pr`}
                  type="number"
                  inputMode="decimal"
                  min={0}
                  max={1}
                  step={0.1}
                  value={priority}
                  onChange={(e) => setPriority(parseFloat(e.target.value) || 0)}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label htmlFor={`${baseId}-lm`} className={labelClass}>
                Last modified <span className="font-normal text-muted-foreground">(optional)</span>
              </label>
              <input
                id={`${baseId}-lm`}
                type="date"
                value={lastmod}
                onChange={(e) => setLastmod(e.target.value)}
                className={inputClass}
              />
            </div>

            <label className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground">
              <input
                type="checkbox"
                checked={validateUrls}
                onChange={(e) => setValidateUrls(e.target.checked)}
                className="size-4 rounded border-input"
              />
              Validate URL format (skip invalid relative paths without a base)
            </label>
          </div>
        </section>

        <section className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-lg font-semibold tracking-tight text-foreground">URLs</h2>
            <div className="flex flex-wrap gap-2">
              <Button type="button" variant="outline" size="sm" onClick={addHomepageRow} disabled={!base}>
                Add homepage
              </Button>
              <Button type="button" variant="outline" size="sm" onClick={addRow}>
                <Plus className="size-4" aria-hidden />
                Add row
              </Button>
            </div>
          </div>
          <ul className="mt-4 space-y-2">
            {urlRows.map((row, i) => (
              <li key={`u-${i}`} className="flex gap-2">
                <input
                  aria-label={`URL ${i + 1}`}
                  type="text"
                  value={row}
                  onChange={(e) => updateRow(i, e.target.value)}
                  className={`${inputClass} mt-0 min-w-0 flex-1 font-mono text-xs sm:text-sm`}
                  placeholder="https://… or /path"
                  spellCheck={false}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => removeRow(i)}
                  disabled={urlRows.length <= 1}
                  aria-label={`Remove URL ${i + 1}`}
                >
                  <Trash2 className="size-4 text-destructive" aria-hidden />
                </Button>
              </li>
            ))}
          </ul>
          {validateUrls && invalid.length > 0 ? (
            <p className="mt-3 text-xs text-amber-700 dark:text-amber-400">
              Could not resolve {invalid.length} row(s) — fix the website URL or use absolute https
              links.
            </p>
          ) : null}
        </section>

        <section className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-semibold tracking-tight text-foreground">Bulk URLs</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Paste multiple URLs or paths—one per line, or separated by commas.
          </p>
          <textarea
            id={`${baseId}-bulk`}
            value={bulkText}
            onChange={(e) => setBulkText(e.target.value)}
            rows={5}
            className={`${inputClass} mt-3 min-h-[120px] resize-y font-mono text-xs`}
            placeholder={"https://example.com/pricing\n/blog/post-1"}
            spellCheck={false}
          />
          <Button type="button" className="mt-3" variant="secondary" onClick={mergeBulk}>
            Merge into list
          </Button>
          {bulkMessage ? (
            <p className="mt-2 text-xs text-muted-foreground" role="status">
              {bulkMessage}
            </p>
          ) : null}
        </section>
      </div>

      <div className="space-y-4 lg:sticky lg:top-24">
        <section className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-semibold tracking-tight text-foreground">sitemap.xml</h2>
            <div className="flex flex-wrap gap-2">
              <Button type="button" variant="outline" size="sm" onClick={handleCopy} disabled={emptyOutput}>
                {copyStatus === "copied" ? (
                  <>
                    <Check className="size-4 text-emerald-600" aria-hidden />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="size-4" aria-hidden />
                    Copy
                  </>
                )}
              </Button>
              <Button type="button" size="sm" onClick={handleDownload} disabled={emptyOutput}>
                <Download className="size-4" aria-hidden />
                Download
              </Button>
            </div>
          </div>
          {copyStatus === "error" ? (
            <p className="mt-2 text-xs text-destructive" role="status">
              Copy failed — select the XML manually.
            </p>
          ) : null}
          {emptyOutput ? (
            <p className="mt-4 text-sm text-muted-foreground">
              Add at least one resolvable URL to generate XML.
            </p>
          ) : (
            <pre
              className="mt-4 max-h-[min(70vh,520px)] overflow-auto rounded-lg border border-border bg-muted/30 p-4 text-left text-xs leading-relaxed text-foreground sm:text-sm"
              tabIndex={0}
            >
              <code>{xml}</code>
            </pre>
          )}
        </section>
      </div>
    </div>
  );
}
