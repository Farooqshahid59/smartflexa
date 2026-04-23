"use client";

import { ChangeEvent, useId, useMemo, useState } from "react";
import { FileText, SortAsc, SortDesc } from "lucide-react";

import {
  analyzeKeywordDensity,
  sortRowsByCount,
  topKeywordsForHighlight,
} from "@/lib/keyword-density";

const PREVIEW_MAX = 14_000;

function HighlightedPreview({
  text,
  highlight,
}: {
  text: string;
  highlight: Set<string>;
}) {
  if (!text.trim()) {
    return <p className="text-sm text-muted-foreground">Paste or upload content to see highlights.</p>;
  }

  const slice = text.length > PREVIEW_MAX ? text.slice(0, PREVIEW_MAX) : text;
  const truncated = text.length > PREVIEW_MAX;

  const nodes: React.ReactNode[] = [];
  const re = /\b[a-z0-9]+\b/gi;
  let last = 0;
  let m: RegExpExecArray | null;
  const safe = slice;
  while ((m = re.exec(safe)) !== null) {
    const i = m.index;
    const w = m[0];
    nodes.push(safe.slice(last, i));
    const key = w.toLowerCase();
    if (highlight.has(key)) {
      nodes.push(
        <mark
          key={`${i}-${w}`}
          className="rounded-sm bg-amber-200/50 px-0.5 text-foreground dark:bg-amber-500/25"
        >
          {w}
        </mark>,
      );
    } else {
      nodes.push(w);
    }
    last = i + w.length;
  }
  nodes.push(safe.slice(last));

  return (
    <div>
      <div className="max-h-64 overflow-auto rounded-md border border-border bg-muted/20 p-3 text-sm leading-relaxed text-foreground whitespace-pre-wrap">
        {nodes}
      </div>
      {truncated ? (
        <p className="mt-2 text-xs text-muted-foreground">
          Preview truncated to {PREVIEW_MAX.toLocaleString()} characters for performance. Full text
          is still analyzed.
        </p>
      ) : null}
    </div>
  );
}

export function KeywordDensityCheckerTool() {
  const taId = useId();
  const fileId = useId();
  const stopId = useId();

  const [text, setText] = useState(
    "Search engine optimization helps pages rank for relevant queries. SEO includes technical structure, content quality, and authority signals. Keyword density is one small signal among many.",
  );
  const [filterStopWords, setFilterStopWords] = useState(false);
  const [sortDir, setSortDir] = useState<"desc" | "asc">("desc");
  const [uploadName, setUploadName] = useState<string | null>(null);

  const analyzed = useMemo(
    () => analyzeKeywordDensity(text, { filterStopWords }),
    [text, filterStopWords],
  );

  const sortedRows = useMemo(
    () => sortRowsByCount(analyzed.rows, sortDir),
    [analyzed.rows, sortDir],
  );

  const highlightSet = useMemo(
    () => topKeywordsForHighlight(analyzed.rows, 28),
    [analyzed.rows],
  );

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    e.target.value = "";
    if (!f) return;
    const okType = /^text\//i.test(f.type) || f.type === "application/octet-stream";
    const okName = /\.txt$/i.test(f.name);
    if (!okType && !okName) {
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === "string") {
        setText(result);
        setUploadName(f.name);
      }
    };
    reader.readAsText(f, "UTF-8");
  };

  return (
    <div className="space-y-8">
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6">
        <label htmlFor={taId} className="text-sm font-semibold text-foreground">
          Content
        </label>
        <textarea
          id={taId}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setUploadName(null);
          }}
          rows={10}
          spellCheck={false}
          className="mt-2 w-full resize-y rounded-md border border-input bg-background px-3 py-2 font-mono text-sm leading-relaxed text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          placeholder="Paste page copy, blog draft, or meta descriptions…"
        />

        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <input
              id={fileId}
              type="file"
              accept=".txt,text/plain"
              onChange={handleFile}
              className="sr-only"
            />
            <label
              htmlFor={fileId}
              className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-border bg-muted/30 px-3 py-2 text-xs font-medium text-foreground hover:bg-muted"
            >
              <FileText className="h-4 w-4" aria-hidden />
              Upload .txt file
            </label>
          </div>
          {uploadName ? (
            <span className="text-xs text-muted-foreground">Loaded: {uploadName}</span>
          ) : null}
        </div>

        <div className="mt-4 border-t border-border pt-4">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
            <input
              id={stopId}
              type="checkbox"
              checked={filterStopWords}
              onChange={(e) => setFilterStopWords(e.target.checked)}
              className="rounded border-input"
            />
            Filter stop words (common English function words)
          </label>
        </div>
      </div>

      <div className="grid gap-4 rounded-xl border border-border bg-card p-5 shadow-sm sm:grid-cols-3 sm:p-6">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Total words
          </p>
          <p className="mt-1 text-2xl font-semibold tabular-nums text-foreground">
            {analyzed.totalWords.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Unique words
          </p>
          <p className="mt-1 text-2xl font-semibold tabular-nums text-foreground">
            {analyzed.uniqueWords.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Terms in table
          </p>
          <p className="mt-1 text-2xl font-semibold tabular-nums text-foreground">
            {sortedRows.length.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-semibold text-foreground">Keyword frequency & density</h2>
          <button
            type="button"
            onClick={() => setSortDir((d) => (d === "desc" ? "asc" : "desc"))}
            className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground hover:bg-muted"
          >
            {sortDir === "desc" ? (
              <>
                <SortDesc className="h-4 w-4" aria-hidden />
                Sort: high → low
              </>
            ) : (
              <>
                <SortAsc className="h-4 w-4" aria-hidden />
                Sort: low → high
              </>
            )}
          </button>
        </div>

        <div className="mt-4 overflow-x-auto rounded-md border border-border">
          <table className="w-full min-w-[320px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40 text-left">
                <th className="px-3 py-2 font-semibold text-foreground">Keyword</th>
                <th className="px-3 py-2 font-semibold text-foreground">Count</th>
                <th className="px-3 py-2 font-semibold text-foreground">Density %</th>
              </tr>
            </thead>
            <tbody>
              {sortedRows.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-3 py-6 text-center text-muted-foreground">
                    No tokens found. Add letters or numbers, or turn off stop-word filtering.
                  </td>
                </tr>
              ) : (
                sortedRows.map((row) => (
                  <tr key={row.word} className="border-b border-border/80 hover:bg-muted/20">
                    <td className="px-3 py-2 font-mono text-foreground">{row.word}</td>
                    <td className="px-3 py-2 tabular-nums text-muted-foreground">{row.count}</td>
                    <td className="px-3 py-2 tabular-nums text-foreground">
                      {row.density.toFixed(2)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6">
        <h2 className="text-lg font-semibold text-foreground">Highlight in text</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Up to 28 of the most frequent terms in the current table (after stop-word filter when
          enabled) are highlighted in the preview.
        </p>
        <div className="mt-4">
          <HighlightedPreview text={text} highlight={highlightSet} />
        </div>
      </div>
    </div>
  );
}
