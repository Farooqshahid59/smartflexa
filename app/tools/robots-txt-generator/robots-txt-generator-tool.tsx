"use client";

import { Check, Copy, Download, Plus, Trash2 } from "lucide-react";
import { useId, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  buildRobotsTxt,
  presetAllowAll,
  presetBlockAll,
  presetBlockFolders,
} from "@/lib/robots-txt-build";

function newRow(): string {
  return "";
}

export function RobotsTxtGeneratorTool() {
  const baseId = useId();
  const [userAgent, setUserAgent] = useState("*");
  const [allowPaths, setAllowPaths] = useState<string[]>(["/"]);
  const [disallowPaths, setDisallowPaths] = useState<string[]>([""]);
  const [crawlDelay, setCrawlDelay] = useState("");
  const [sitemapText, setSitemapText] = useState("https://example.com/sitemap.xml");
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">("idle");

  const output = useMemo(
    () =>
      buildRobotsTxt({
        userAgent,
        allowPaths,
        disallowPaths,
        crawlDelay,
        sitemapLines: sitemapText ? [sitemapText] : [],
      }),
    [userAgent, allowPaths, disallowPaths, crawlDelay, sitemapText],
  );

  const updateAllow = (index: number, value: string) => {
    setAllowPaths((prev) => prev.map((p, i) => (i === index ? value : p)));
  };
  const updateDisallow = (index: number, value: string) => {
    setDisallowPaths((prev) => prev.map((p, i) => (i === index ? value : p)));
  };

  const addAllow = () => setAllowPaths((prev) => [...prev, newRow()]);
  const addDisallow = () => setDisallowPaths((prev) => [...prev, newRow()]);

  const removeAllow = (index: number) => {
    setAllowPaths((prev) => (prev.length <= 1 ? prev : prev.filter((_, i) => i !== index)));
  };
  const removeDisallow = (index: number) => {
    setDisallowPaths((prev) => (prev.length <= 1 ? prev : prev.filter((_, i) => i !== index)));
  };

  const applyPreset = (key: "allow" | "block" | "folders") => {
    if (key === "allow") {
      setAllowPaths([...presetAllowAll.allowPaths]);
      setDisallowPaths([""]);
    } else if (key === "block") {
      setAllowPaths([""]);
      setDisallowPaths([...presetBlockAll.disallowPaths]);
    } else {
      setAllowPaths([""]);
      setDisallowPaths([...presetBlockFolders.disallowPaths]);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopyStatus("copied");
      window.setTimeout(() => setCopyStatus("idle"), 2000);
    } catch {
      setCopyStatus("error");
      window.setTimeout(() => setCopyStatus("idle"), 2500);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "robots.txt";
    a.rel = "noopener";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const inputClass =
    "mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50";
  const labelClass = "text-xs font-medium text-foreground";

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
      <div className="space-y-6">
        <section className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-semibold tracking-tight text-foreground">Rules</h2>
          <div className="mt-4 space-y-4">
            <div>
              <label htmlFor={`${baseId}-ua`} className={labelClass}>
                User-agent
              </label>
              <input
                id={`${baseId}-ua`}
                type="text"
                value={userAgent}
                onChange={(e) => setUserAgent(e.target.value)}
                className={`${inputClass} font-mono`}
                placeholder="*"
                spellCheck={false}
              />
            </div>

            <div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className={labelClass}>Allow paths</span>
                <Button type="button" variant="outline" size="sm" onClick={addAllow}>
                  <Plus className="size-4" aria-hidden />
                  Add
                </Button>
              </div>
              <ul className="mt-2 space-y-2">
                {allowPaths.map((path, i) => (
                  <li key={`a-${i}`} className="flex gap-2">
                    <input
                      aria-label={`Allow path ${i + 1}`}
                      type="text"
                      value={path}
                      onChange={(e) => updateAllow(i, e.target.value)}
                      className={`${inputClass} mt-0 min-w-0 flex-1 font-mono text-xs sm:text-sm`}
                      placeholder="/public/"
                      spellCheck={false}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => removeAllow(i)}
                      disabled={allowPaths.length <= 1}
                      aria-label={`Remove allow path ${i + 1}`}
                    >
                      <Trash2 className="size-4 text-destructive" aria-hidden />
                    </Button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className={labelClass}>Disallow paths</span>
                <Button type="button" variant="outline" size="sm" onClick={addDisallow}>
                  <Plus className="size-4" aria-hidden />
                  Add
                </Button>
              </div>
              <ul className="mt-2 space-y-2">
                {disallowPaths.map((path, i) => (
                  <li key={`d-${i}`} className="flex gap-2">
                    <input
                      aria-label={`Disallow path ${i + 1}`}
                      type="text"
                      value={path}
                      onChange={(e) => updateDisallow(i, e.target.value)}
                      className={`${inputClass} mt-0 min-w-0 flex-1 font-mono text-xs sm:text-sm`}
                      placeholder="/secret/"
                      spellCheck={false}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => removeDisallow(i)}
                      disabled={disallowPaths.length <= 1}
                      aria-label={`Remove disallow path ${i + 1}`}
                    >
                      <Trash2 className="size-4 text-destructive" aria-hidden />
                    </Button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <label htmlFor={`${baseId}-cd`} className={labelClass}>
                Crawl-delay <span className="font-normal text-muted-foreground">(optional)</span>
              </label>
              <input
                id={`${baseId}-cd`}
                type="number"
                inputMode="numeric"
                min={1}
                step={1}
                value={crawlDelay}
                onChange={(e) => setCrawlDelay(e.target.value)}
                className={inputClass}
                placeholder="e.g. 10 (seconds; not used by Googlebot)"
              />
            </div>

            <div>
              <label htmlFor={`${baseId}-sm`} className={labelClass}>
                Sitemap URLs <span className="font-normal text-muted-foreground">(one per line)</span>
              </label>
              <textarea
                id={`${baseId}-sm`}
                value={sitemapText}
                onChange={(e) => setSitemapText(e.target.value)}
                rows={4}
                className={`${inputClass} min-h-[96px] resize-y font-mono text-xs sm:text-sm`}
                placeholder={"https://example.com/sitemap.xml\nhttps://example.com/news-sitemap.xml"}
                spellCheck={false}
              />
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-semibold tracking-tight text-foreground">Presets</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Apply a starting pattern—you can edit paths afterward.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button type="button" variant="secondary" onClick={() => applyPreset("allow")}>
              Allow all
            </Button>
            <Button type="button" variant="secondary" onClick={() => applyPreset("block")}>
              Block all
            </Button>
            <Button type="button" variant="secondary" onClick={() => applyPreset("folders")}>
              Block common folders
            </Button>
          </div>
        </section>
      </div>

      <div className="space-y-4 lg:sticky lg:top-24">
        <section className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-semibold tracking-tight text-foreground">robots.txt</h2>
            <div className="flex flex-wrap gap-2">
              <Button type="button" variant="outline" size="sm" onClick={handleCopy}>
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
              <Button type="button" size="sm" onClick={handleDownload}>
                <Download className="size-4" aria-hidden />
                Download .txt
              </Button>
            </div>
          </div>
          {copyStatus === "error" ? (
            <p className="mt-2 text-xs text-destructive" role="status">
              Copy failed — select the text manually.
            </p>
          ) : null}
          <pre
            className="mt-4 max-h-[min(70vh,480px)] overflow-auto rounded-lg border border-border bg-muted/30 p-4 text-left text-xs leading-relaxed text-foreground sm:text-sm"
            tabIndex={0}
          >
            <code>{output}</code>
          </pre>
        </section>
      </div>
    </div>
  );
}
