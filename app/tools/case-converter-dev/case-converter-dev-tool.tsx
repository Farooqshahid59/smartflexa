"use client";

import { useId, useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";

import {
  type DevCaseConverterOptions,
  type DevCaseOutputs,
  convertToAllCases,
} from "@/lib/case-converter-dev";

const OUTPUTS: { key: keyof DevCaseOutputs; label: string; hint?: string }[] = [
  { key: "camelCase", label: "camelCase" },
  { key: "snake_case", label: "snake_case" },
  { key: "kebabCase", label: "kebab-case" },
  { key: "PascalCase", label: "PascalCase" },
  { key: "UPPER_CASE", label: "UPPER_CASE" },
  { key: "lower_case", label: "lower_case", hint: "flat: lowercase, no separators" },
];

export function CaseConverterDevTool() {
  const taId = useId();
  const trimId = useId();
  const specId = useId();

  const [input, setInput] = useState("user profile URL");
  const [trimSpaces, setTrimSpaces] = useState(true);
  const [removeSpecialChars, setRemoveSpecialChars] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const opts: DevCaseConverterOptions = useMemo(
    () => ({ trimSpaces, removeSpecialChars }),
    [trimSpaces, removeSpecialChars],
  );

  const out = useMemo(() => convertToAllCases(input, opts), [input, opts]);

  const copy = async (key: string, value: string) => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(key);
      window.setTimeout(() => setCopiedKey(null), 1600);
    } catch {
      setCopiedKey(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6">
        <label htmlFor={taId} className="text-sm font-semibold text-foreground">
          Input
        </label>
        <textarea
          id={taId}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={5}
          spellCheck={false}
          className="mt-2 w-full resize-y rounded-md border border-input bg-background px-3 py-2 font-mono text-sm leading-relaxed text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          placeholder="Paste identifiers, titles, or API field names…"
        />

        <div className="mt-4 flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:flex-wrap sm:items-center">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
            <input
              id={trimId}
              type="checkbox"
              checked={trimSpaces}
              onChange={(e) => setTrimSpaces(e.target.checked)}
              className="rounded border-input"
            />
            Trim spaces
          </label>
          <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
            <input
              id={specId}
              type="checkbox"
              checked={removeSpecialChars}
              onChange={(e) => setRemoveSpecialChars(e.target.checked)}
              className="rounded border-input"
            />
            Remove special characters
          </label>
        </div>
      </div>

      <div>
        <h2 className="text-sm font-semibold text-foreground">Outputs</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Live updates. Words are split on spaces, hyphens, underscores, and camelCase boundaries.
        </p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {OUTPUTS.map(({ key, label, hint }) => {
            const value = out[key];
            const has = value.length > 0;
            return (
              <li
                key={key}
                className="flex flex-col rounded-lg border border-border bg-muted/10 p-4"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="min-w-0 font-mono text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    <span className="block truncate">{label}</span>
                    {hint ? (
                      <span className="mt-0.5 block font-sans text-[10px] font-normal normal-case tracking-normal text-muted-foreground">
                        {hint}
                      </span>
                    ) : null}
                  </span>
                  <button
                    type="button"
                    disabled={!has}
                    onClick={() => void copy(key, value)}
                    className="inline-flex shrink-0 items-center gap-1 rounded-md border border-border bg-background px-2 py-1 text-xs font-medium text-foreground hover:bg-muted disabled:pointer-events-none disabled:opacity-40"
                  >
                    {copiedKey === key ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-green-600" aria-hidden />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" aria-hidden />
                        Copy
                      </>
                    )}
                  </button>
                </div>
                <p
                  className="mt-2 min-h-[2.5rem] break-all font-mono text-sm leading-relaxed text-foreground"
                  aria-live="polite"
                >
                  {has ? value : <span className="text-muted-foreground">—</span>}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
