"use client";

import { ChangeEvent, useId, useState } from "react";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

type Mode = "percentOf" | "change" | "difference";

function parseNumber(s: string): number | null {
  const t = s.trim();
  if (t === "") return null;
  const n = Number(t);
  if (!Number.isFinite(n)) return null;
  return n;
}

function formatResult(value: number): string {
  if (!Number.isFinite(value)) return "—";
  const rounded = Math.round(value * 1e8) / 1e8;
  const s = rounded.toString();
  if (s.includes("e")) return rounded.toFixed(8).replace(/\.?0+$/, "");
  return s.replace(/(\.\d*?[1-9])0+$/, "$1").replace(/\.$/, "");
}

const MODES: { id: Mode; label: string }[] = [
  { id: "percentOf", label: "% of number" },
  { id: "change", label: "Increase / decrease" },
  { id: "difference", label: "Difference" },
];

export default function PercentageCalculatorPage() {
  const hintId = useId();
  const errorId = useId();
  const resultRegionId = useId();
  const tablistId = useId();

  const [mode, setMode] = useState<Mode>("percentOf");

  const [percentStr, setPercentStr] = useState("15");
  const [ofValueStr, setOfValueStr] = useState("200");

  const [fromStr, setFromStr] = useState("100");
  const [toStr, setToStr] = useState("125");

  const [diffAStr, setDiffAStr] = useState("40");
  const [diffBStr, setDiffBStr] = useState("50");

  const [resultValue, setResultValue] = useState<string | null>(null);
  const [resultDetail, setResultDetail] = useState<string | null>(null);
  const [formula, setFormula] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const resetOutputs = () => {
    setResultValue(null);
    setResultDetail(null);
    setFormula(null);
    setError(null);
  };

  const calculate = () => {
    resetOutputs();

    if (mode === "percentOf") {
      const p = parseNumber(percentStr);
      const y = parseNumber(ofValueStr);
      if (p === null || y === null) {
        setError("Enter valid numbers for percentage and value.");
        return;
      }
      const value = (p / 100) * y;
      setResultValue(formatResult(value));
      setFormula("(X ÷ 100) × Y");
      setResultDetail(
        `${formatResult(p)}% of ${formatResult(y)} = ${formatResult(value)}`,
      );
      return;
    }

    if (mode === "change") {
      const a = parseNumber(fromStr);
      const b = parseNumber(toStr);
      if (a === null || b === null) {
        setError("Enter valid numbers for the original and new values.");
        return;
      }
      if (a === 0 && b === 0) {
        setResultValue("0%");
        setFormula("((B − A) ÷ A) × 100");
        setResultDetail(
          "Both values are 0, so the relative change is defined as 0%.",
        );
        return;
      }
      if (a === 0) {
        setError(
          "Percent change from 0 is undefined (division by zero). Try a non-zero starting value.",
        );
        return;
      }
      const pct = ((b - a) / a) * 100;
      const label =
        pct > 0 ? "increase" : pct < 0 ? "decrease" : "change";
      setResultValue(`${formatResult(pct)}%`);
      setFormula("((B − A) ÷ A) × 100");
      setResultDetail(
        `From ${formatResult(a)} to ${formatResult(b)} is a ${formatResult(Math.abs(pct))}% ${label}.`,
      );
      return;
    }

    const v1 = parseNumber(diffAStr);
    const v2 = parseNumber(diffBStr);
    if (v1 === null || v2 === null) {
      setError("Enter valid numbers for both values.");
      return;
    }
    if (v1 === 0 && v2 === 0) {
      setResultValue("0%");
      setFormula("|V₁ − V₂| ÷ ((|V₁| + |V₂|) ÷ 2) × 100");
      setResultDetail("Both values are 0, so the percentage difference is 0%.");
      return;
    }
    const denom = (Math.abs(v1) + Math.abs(v2)) / 2;
    if (denom === 0) {
      setResultValue("0%");
      setResultDetail("Difference relative to average magnitude is 0.");
      return;
    }
    const diffPct = (Math.abs(v1 - v2) / denom) * 100;
    setResultValue(`${formatResult(diffPct)}%`);
    setFormula("|V₁ − V₂| ÷ ((|V₁| + |V₂|) ÷ 2) × 100");
    setResultDetail(
      `Absolute gap |${formatResult(v1)} − ${formatResult(v2)}| = ${formatResult(Math.abs(v1 - v2))} vs average magnitude ${formatResult(denom)}.`,
    );
  };

  const handleReset = () => {
    setMode("percentOf");
    setPercentStr("15");
    setOfValueStr("200");
    setFromStr("100");
    setToStr("125");
    setDiffAStr("40");
    setDiffBStr("50");
    setResultValue(null);
    setResultDetail(null);
    setFormula(null);
    setError(null);
  };

  const onModeChange = (next: Mode) => {
    setMode(next);
    resetOutputs();
  };

  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.percentageCalculator)} />
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground opacity-0 transition focus:translate-y-0 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
      >
        Skip to main content
      </a>
      <Header />
      <main
        id="main-content"
        className="flex-1 bg-background"
        aria-labelledby="percentage-calc-heading"
      >
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <div className="mb-8 text-center sm:text-left">
            <nav aria-label="Breadcrumb">
              <p className="text-sm font-medium text-muted-foreground">
                <a href="/" className="hover:text-foreground">
                  Home
                </a>
                <span className="mx-2 text-border" aria-hidden>
                  /
                </span>
                <span>Tools</span>
                <span className="mx-2 text-border" aria-hidden>
                  /
                </span>
                <span className="text-foreground">Percentage Calculator</span>
              </p>
            </nav>

            <h1
              id="percentage-calc-heading"
              className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              Percentage Calculator Online Free
            </h1>

            <p
              id={hintId}
              className="mt-2 max-w-2xl text-base text-muted-foreground sm:text-lg"
            >
              Find a percentage of a number, percent change between two values,
              or the percentage difference between two numbers—all in your
              browser.
            </p>
          </div>

          <section
            className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-8"
            aria-labelledby="tool-panel-heading"
          >
            <h2 id="tool-panel-heading" className="sr-only">
              Percentage calculator
            </h2>

            <div
              id={tablistId}
              role="tablist"
              aria-label="Calculation type"
              className="flex flex-wrap gap-2"
            >
              {MODES.map((m) => {
                const selected = mode === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => onModeChange(m.id)}
                    className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors sm:px-4 ${
                      selected
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background text-foreground hover:bg-muted"
                    }`}
                  >
                    {m.label}
                  </button>
                );
              })}
            </div>

            <div className="mt-8 space-y-6" role="tabpanel">
              {mode === "percentOf" && (
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="pct-x"
                      className="text-sm font-medium text-foreground"
                    >
                      Percentage (X)
                    </label>
                    <input
                      id="pct-x"
                      type="text"
                      inputMode="decimal"
                      value={percentStr}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setPercentStr(e.target.value)
                      }
                      className="mt-2 h-11 w-full rounded-lg border border-input bg-background px-4 font-mono text-base text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                    <p className="mt-1 text-xs text-muted-foreground">
                      Example: 15 for 15%
                    </p>
                  </div>
                  <div>
                    <label
                      htmlFor="pct-y"
                      className="text-sm font-medium text-foreground"
                    >
                      Of value (Y)
                    </label>
                    <input
                      id="pct-y"
                      type="text"
                      inputMode="decimal"
                      value={ofValueStr}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setOfValueStr(e.target.value)
                      }
                      className="mt-2 h-11 w-full rounded-lg border border-input bg-background px-4 font-mono text-base text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </div>
              )}

              {mode === "change" && (
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="chg-from"
                      className="text-sm font-medium text-foreground"
                    >
                      Original value (A)
                    </label>
                    <input
                      id="chg-from"
                      type="text"
                      inputMode="decimal"
                      value={fromStr}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setFromStr(e.target.value)
                      }
                      className="mt-2 h-11 w-full rounded-lg border border-input bg-background px-4 font-mono text-base text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="chg-to"
                      className="text-sm font-medium text-foreground"
                    >
                      New value (B)
                    </label>
                    <input
                      id="chg-to"
                      type="text"
                      inputMode="decimal"
                      value={toStr}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setToStr(e.target.value)
                      }
                      className="mt-2 h-11 w-full rounded-lg border border-input bg-background px-4 font-mono text-base text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                    <p className="mt-1 text-xs text-muted-foreground">
                      Negative % means a decrease from A to B.
                    </p>
                  </div>
                </div>
              )}

              {mode === "difference" && (
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="diff-a"
                      className="text-sm font-medium text-foreground"
                    >
                      First value (V₁)
                    </label>
                    <input
                      id="diff-a"
                      type="text"
                      inputMode="decimal"
                      value={diffAStr}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setDiffAStr(e.target.value)
                      }
                      className="mt-2 h-11 w-full rounded-lg border border-input bg-background px-4 font-mono text-base text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="diff-b"
                      className="text-sm font-medium text-foreground"
                    >
                      Second value (V₂)
                    </label>
                    <input
                      id="diff-b"
                      type="text"
                      inputMode="decimal"
                      value={diffBStr}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setDiffBStr(e.target.value)
                      }
                      className="mt-2 h-11 w-full rounded-lg border border-input bg-background px-4 font-mono text-base text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                    <p className="mt-1 text-xs text-muted-foreground">
                      Uses symmetric difference vs average magnitude.
                    </p>
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <button
                  type="button"
                  onClick={calculate}
                  className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Calculate
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                >
                  Reset
                </button>
              </div>

              {error ? (
                <p
                  id={errorId}
                  className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
                  role="alert"
                >
                  {error}
                </p>
              ) : null}

              {resultValue !== null && formula && !error ? (
                <div
                  id={resultRegionId}
                  className="rounded-xl border-2 border-primary/30 bg-primary/5 p-5"
                  aria-live="polite"
                >
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Result
                  </p>
                  <p className="mt-2 font-mono text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    {resultValue}
                  </p>
                  {resultDetail ? (
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {resultDetail}
                    </p>
                  ) : null}
                  <div className="mt-4 rounded-lg border border-border bg-card/80 p-3">
                    <p className="text-xs font-medium text-muted-foreground">
                      Formula used
                    </p>
                    <p className="mt-1 font-mono text-sm text-foreground">
                      {formula}
                    </p>
                  </div>
                </div>
              ) : null}
            </div>
          </section>

          <article
            className="mt-14 space-y-10"
            aria-labelledby="percentage-seo-heading"
          >
            <h2
              id="percentage-seo-heading"
              className="text-2xl font-bold tracking-tight text-foreground"
            >
              What is a Percentage Calculator?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              A percentage calculator helps you turn everyday questions—like
              discounts, growth rates, or how far two numbers are apart—into
              clear numbers. This tool uses standard formulas and explains what
              it computed so you can trust the result.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              How to Calculate Percentages
            </h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-base leading-relaxed text-muted-foreground">
              <li>Pick a mode: percent of a number, change between two values, or difference.</li>
              <li>Enter your values (decimals and negative numbers are allowed where meaningful).</li>
              <li>Tap Calculate to see the answer, a short explanation, and the formula.</li>
              <li>Use Reset to clear results and restore example inputs.</li>
            </ol>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Types of Percentage Calculations
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed text-muted-foreground">
              <li>
                <strong className="font-medium text-foreground">
                  Percentage of a number:
                </strong>{" "}
                answers “What is X% of Y?” using (X ÷ 100) × Y.
              </li>
              <li>
                <strong className="font-medium text-foreground">
                  Increase or decrease:
                </strong>{" "}
                compares an original value A to a new value B with ((B − A) ÷ A) × 100. A 0% starting value is undefined, so the tool will warn you.
              </li>
              <li>
                <strong className="font-medium text-foreground">
                  Percentage difference:
                </strong>{" "}
                measures how far two values are apart relative to their average magnitude: |V₁ − V₂| ÷ ((|V₁| + |V₂|) ÷ 2) × 100.
              </li>
            </ul>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Example
            </h2>
            <div className="mt-3 space-y-3 rounded-lg border border-border bg-muted/20 p-4 text-sm leading-relaxed text-muted-foreground">
              <p>
                <span className="font-medium text-foreground">20% of 150:</span>{" "}
                (20 ÷ 100) × 150 = <span className="font-mono text-foreground">30</span>
              </p>
              <p>
                <span className="font-medium text-foreground">From 80 to 100:</span>{" "}
                ((100 − 80) ÷ 80) × 100 ={" "}
                <span className="font-mono text-foreground">25%</span> increase
              </p>
              <p>
                <span className="font-medium text-foreground">Values 40 and 60:</span>{" "}
                symmetric difference ≈{" "}
                <span className="font-mono text-foreground">40%</span> (gap 20 vs average magnitude 50)
              </p>
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">FAQ</h2>
            <dl className="mt-4 space-y-6">
              <div>
                <dt className="font-semibold text-foreground">
                  How do I calculate percentage?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  For “X% of Y,” multiply Y by X and divide by 100. This tool does
                  that for you and shows the formula.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  How to find percentage increase?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Subtract the old value from the new value, divide by the old
                  value, and multiply by 100. Use the Increase / decrease tab
                  with A as the old value and B as the new value.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Is this tool free?</dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Yes. SmartFlexa’s percentage calculator is free with no signup.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  Is my data secure?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Calculations run in your browser; your numbers are not sent to
                  our servers.
                </dd>
              </div>
            </dl>

            <RelatedTools currentPath="/tools/percentage-calculator" />
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
