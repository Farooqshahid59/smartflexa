"use client";

import { ChangeEvent, useId, useMemo, useState } from "react";
import { ClipboardCopy, Eraser, FileUp } from "lucide-react";

import { type DiffOptions, diffLines, formatDiffPlain } from "@/lib/text-diff";

const SAMPLE_ORIGINAL = `SmartFlexa
Free online tools
JSON formatter`;

const SAMPLE_MODIFIED = `SmartFlexa
Free online developer tools
JSON formatter & minifier`;

function readTextFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result ?? ""));
    r.onerror = () => reject(new Error("Could not read file."));
    r.readAsText(file);
  });
}

function cellClass(side: "left" | "right", type: string): string {
  const base = "align-top whitespace-pre-wrap break-all px-3 py-2 font-mono text-sm";
  if (type === "equal") {
    return `${base} bg-muted/25 text-foreground`;
  }
  if (type === "delete") {
    return side === "left"
      ? `${base} border-l-4 border-red-500 bg-red-100 text-red-950 dark:bg-red-950/40 dark:text-red-50`
      : `${base} text-muted-foreground`;
  }
  if (type === "insert") {
    return side === "right"
      ? `${base} border-l-4 border-emerald-500 bg-emerald-100 text-emerald-950 dark:bg-emerald-950/40 dark:text-emerald-50`
      : `${base} text-muted-foreground`;
  }
  /* change */
  return side === "left"
    ? `${base} border-l-4 border-amber-500 bg-amber-100 text-amber-950 dark:bg-amber-950/40 dark:text-amber-50`
    : `${base} border-l-4 border-amber-500 bg-amber-100 text-amber-950 dark:bg-amber-950/40 dark:text-amber-50`;
}

export function TextDiffCheckerTool() {
  const origId = useId();
  const modId = useId();
  const origFileId = useId();
  const modFileId = useId();
  const ignoreCaseId = useId();
  const ignoreWsId = useId();

  const [original, setOriginal] = useState(SAMPLE_ORIGINAL);
  const [modified, setModified] = useState(SAMPLE_MODIFIED);
  const [ignoreCase, setIgnoreCase] = useState(false);
  const [ignoreWhitespace, setIgnoreWhitespace] = useState(false);
  const [copyHint, setCopyHint] = useState<string | null>(null);
  const [fileKey, setFileKey] = useState(0);

  const opts: DiffOptions = useMemo(
    () => ({ ignoreCase, ignoreWhitespace }),
    [ignoreCase, ignoreWhitespace],
  );

  const { rows, truncated, message } = useMemo(
    () => diffLines(original, modified, opts),
    [original, modified, opts],
  );

  const handleOriginalFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    e.target.value = "";
    if (!f) return;
    try {
      setOriginal(await readTextFile(f));
    } catch {
      setCopyHint("Could not read file.");
      window.setTimeout(() => setCopyHint(null), 2500);
    }
  };

  const handleModifiedFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    e.target.value = "";
    if (!f) return;
    try {
      setModified(await readTextFile(f));
    } catch {
      setCopyHint("Could not read file.");
      window.setTimeout(() => setCopyHint(null), 2500);
    }
  };

  const clearAll = () => {
    setOriginal("");
    setModified("");
    setIgnoreCase(false);
    setIgnoreWhitespace(false);
    setFileKey((k) => k + 1);
    setCopyHint(null);
  };

  const copyResult = async () => {
    const text = formatDiffPlain(rows);
    try {
      await navigator.clipboard.writeText(text);
      setCopyHint("Copied unified diff text.");
      window.setTimeout(() => setCopyHint(null), 2200);
    } catch {
      setCopyHint("Clipboard blocked.");
      window.setTimeout(() => setCopyHint(null), 2500);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={clearAll}
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted"
        >
          <Eraser className="h-4 w-4" aria-hidden />
          Clear
        </button>
        <button
          type="button"
          onClick={() => void copyResult()}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          <ClipboardCopy className="h-4 w-4" aria-hidden />
          Copy result
        </button>
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm hover:bg-muted">
          <input
            id={ignoreCaseId}
            type="checkbox"
            checked={ignoreCase}
            onChange={(e) => setIgnoreCase(e.target.checked)}
            className="rounded border-input"
          />
          <span>Ignore case</span>
        </label>
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm hover:bg-muted">
          <input
            id={ignoreWsId}
            type="checkbox"
            checked={ignoreWhitespace}
            onChange={(e) => setIgnoreWhitespace(e.target.checked)}
            className="rounded border-input"
          />
          <span>Ignore whitespace</span>
        </label>
      </div>

      {truncated && message && (
        <p className="text-sm font-medium text-amber-700 dark:text-amber-400" role="alert">
          {message}
        </p>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label htmlFor={origId} className="text-sm font-semibold text-foreground">
              Original text
            </label>
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              <FileUp className="h-3.5 w-3.5" aria-hidden />
              <input
                key={`o-${fileKey}`}
                id={origFileId}
                type="file"
                accept=".txt,text/plain"
                className="max-w-[180px] text-xs file:mr-2 file:rounded file:border-0 file:bg-muted file:px-2 file:py-1 file:text-xs file:font-medium"
                onChange={(e) => void handleOriginalFile(e)}
              />
            </span>
          </div>
          <textarea
            id={origId}
            value={original}
            onChange={(e) => setOriginal(e.target.value)}
            spellCheck={false}
            className="min-h-[220px] w-full resize-y rounded-lg border border-input bg-background px-3 py-2 font-mono text-sm text-foreground outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="Paste original text…"
          />
        </div>
        <div className="space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label htmlFor={modId} className="text-sm font-semibold text-foreground">
              Modified text
            </label>
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              <FileUp className="h-3.5 w-3.5" aria-hidden />
              <input
                key={`m-${fileKey}`}
                id={modFileId}
                type="file"
                accept=".txt,text/plain"
                className="max-w-[180px] text-xs file:mr-2 file:rounded file:border-0 file:bg-muted file:px-2 file:py-1 file:text-xs file:font-medium"
                onChange={(e) => void handleModifiedFile(e)}
              />
            </span>
          </div>
          <textarea
            id={modId}
            value={modified}
            onChange={(e) => setModified(e.target.value)}
            spellCheck={false}
            className="min-h-[220px] w-full resize-y rounded-lg border border-input bg-background px-3 py-2 font-mono text-sm text-foreground outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="Paste modified text…"
          />
        </div>
      </div>

      <div>
        <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            Side-by-side comparison
          </h2>
          <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-6 rounded bg-red-500" aria-hidden />
              Removed
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-6 rounded bg-emerald-500" aria-hidden />
              Added
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-6 rounded bg-amber-500" aria-hidden />
              Changed
            </span>
          </div>
        </div>
        {copyHint && (
          <p className="mb-2 text-sm text-emerald-600 dark:text-emerald-400" role="status">
            {copyHint}
          </p>
        )}
        <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
          <table className="w-full min-w-[560px] border-collapse text-left">
            <thead>
              <tr className="border-b border-border bg-muted/40 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                <th className="w-12 px-2 py-2">#</th>
                <th className="px-2 py-2">Original</th>
                <th className="px-2 py-2">Modified</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="border-b border-border/80 last:border-0">
                  <td className="align-top px-2 py-2 text-xs text-muted-foreground">{i + 1}</td>
                  <td className={cellClass("left", row.type)}>
                    {row.left === "" ? "—" : row.left}
                  </td>
                  <td className={cellClass("right", row.type)}>
                    {row.right === "" ? "—" : row.right}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
