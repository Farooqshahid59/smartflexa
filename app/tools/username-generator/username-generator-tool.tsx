"use client";

import { Check, Copy, RefreshCw } from "lucide-react";
import { useCallback, useId, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  generateUsernameBatch,
  type UsernameCategory,
  type UsernameLength,
} from "@/lib/username-generate";

export type UsernameGeneratorToolProps = {
  defaultCategory?: UsernameCategory;
};

const CATEGORIES: { value: UsernameCategory; label: string }[] = [
  { value: "cool", label: "Cool" },
  { value: "gaming", label: "Gaming" },
  { value: "instagram", label: "Instagram" },
  { value: "professional", label: "Professional" },
];

const LENGTHS: { value: UsernameLength; label: string }[] = [
  { value: "short", label: "Short" },
  { value: "medium", label: "Medium" },
  { value: "long", label: "Long" },
];

const COUNTS = [10, 12, 15, 18, 20] as const;

export function UsernameGeneratorTool({
  defaultCategory = "cool",
}: UsernameGeneratorToolProps) {
  const baseId = useId();
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState<UsernameCategory>(defaultCategory);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [lengthPref, setLengthPref] = useState<UsernameLength>("medium");
  const [count, setCount] = useState<(typeof COUNTS)[number]>(15);
  const [names, setNames] = useState<string[]>(() =>
    generateUsernameBatch({
      keyword: "",
      category: defaultCategory,
      includeNumbers: true,
      includeSymbols: false,
      length: "medium",
      count: 15,
    }),
  );
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">("idle");

  const runGenerate = useCallback(() => {
    setNames(
      generateUsernameBatch({
        keyword,
        category,
        includeNumbers,
        includeSymbols,
        length: lengthPref,
        count,
      }),
    );
    setCopyStatus("idle");
  }, [keyword, category, includeNumbers, includeSymbols, lengthPref, count]);

  const handleCopyAll = async () => {
    try {
      await navigator.clipboard.writeText(names.join("\n"));
      setCopyStatus("copied");
      window.setTimeout(() => setCopyStatus("idle"), 2000);
    } catch {
      setCopyStatus("error");
      window.setTimeout(() => setCopyStatus("idle"), 2500);
    }
  };

  const uniqueCount = useMemo(() => new Set(names).size, [names]);

  const inputClass =
    "mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50";
  const labelClass = "text-xs font-medium text-foreground";

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,340px)_1fr] lg:items-start">
      <div className="space-y-6">
        <section className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-semibold tracking-tight text-foreground">Options</h2>
          <div className="mt-4 space-y-4">
            <div>
              <label htmlFor={`${baseId}-kw`} className={labelClass}>
                Keyword / name <span className="font-normal text-muted-foreground">(optional)</span>
              </label>
              <input
                id={`${baseId}-kw`}
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className={inputClass}
                placeholder="e.g. alex, nova, team7"
                maxLength={24}
                autoComplete="off"
              />
            </div>
            <div>
              <label htmlFor={`${baseId}-cat`} className={labelClass}>
                Category
              </label>
              <select
                id={`${baseId}-cat`}
                value={category}
                onChange={(e) => setCategory(e.target.value as UsernameCategory)}
                className={inputClass}
              >
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor={`${baseId}-len`} className={labelClass}>
                Length
              </label>
              <select
                id={`${baseId}-len`}
                value={lengthPref}
                onChange={(e) => setLengthPref(e.target.value as UsernameLength)}
                className={inputClass}
              >
                {LENGTHS.map((l) => (
                  <option key={l.value} value={l.value}>
                    {l.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor={`${baseId}-cnt`} className={labelClass}>
                How many usernames
              </label>
              <select
                id={`${baseId}-cnt`}
                value={count}
                onChange={(e) => setCount(Number(e.target.value) as (typeof COUNTS)[number])}
                className={inputClass}
              >
                {COUNTS.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
            <label className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground">
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
                className="size-4 rounded border-input"
              />
              Include numbers
            </label>
            <label className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground">
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
                className="size-4 rounded border-input"
              />
              Include symbols (. and _)
            </label>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <Button type="button" onClick={runGenerate}>
              <RefreshCw className="size-4" aria-hidden />
              Regenerate
            </Button>
            <Button type="button" variant="outline" onClick={handleCopyAll} disabled={names.length === 0}>
              {copyStatus === "copied" ? (
                <>
                  <Check className="size-4 text-emerald-600" aria-hidden />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="size-4" aria-hidden />
                  Copy all
                </>
              )}
            </Button>
          </div>
          {copyStatus === "error" ? (
            <p className="mt-2 text-xs text-destructive" role="status">
              Copy failed — select text manually.
            </p>
          ) : null}
        </section>
      </div>

      <section className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold tracking-tight text-foreground">Results</h2>
          <p className="text-xs text-muted-foreground">
            {names.length} generated · {uniqueCount} unique in this batch
          </p>
        </div>
        <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {names.map((name, index) => (
            <li
              key={`${index}-${name}`}
              className="rounded-md border border-border bg-muted/20 px-3 py-2.5 font-mono text-sm text-foreground"
            >
              {name}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
