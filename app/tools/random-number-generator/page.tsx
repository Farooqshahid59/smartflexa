"use client";

import { ChangeEvent, useId, useState } from "react";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

function randomIntInclusive(min: number, max: number): number {
  const lo = Math.ceil(min);
  const hi = Math.floor(max);
  if (hi < lo) return NaN;
  const range = hi - lo + 1;
  const buf = new Uint32Array(1);
  crypto.getRandomValues(buf);
  return lo + (buf[0]! % range);
}

function parseIntSafe(s: string): number | null {
  const t = s.trim();
  if (t === "") return null;
  const n = Number(t);
  if (!Number.isFinite(n)) return null;
  return Math.trunc(n);
}

export default function RandomNumberGeneratorPage() {
  const hintId = useId();
  const resultHintId = useId();
  const errorId = useId();
  const copyStatusId = useId();

  const [minStr, setMinStr] = useState("1");
  const [maxStr, setMaxStr] = useState("100");
  const [countStr, setCountStr] = useState("1");

  const [result, setResult] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

  const generate = () => {
    setCopyStatus(null);
    setError(null);

    const min = parseIntSafe(minStr);
    const max = parseIntSafe(maxStr);
    const countRaw = countStr.trim() === "" ? 1 : parseIntSafe(countStr);

    if (min === null || max === null) {
      setResult("");
      setError("Enter valid numbers for minimum and maximum.");
      return;
    }
    if (countRaw === null || countRaw < 1) {
      setResult("");
      setError("Count must be at least 1.");
      return;
    }
    if (countRaw > 1000) {
      setResult("");
      setError("Count cannot exceed 1000.");
      return;
    }
    if (min > max) {
      setResult("");
      setError("Minimum must be less than or equal to maximum.");
      return;
    }

    const nums: number[] = [];
    for (let i = 0; i < countRaw; i++) {
      const n = randomIntInclusive(min, max);
      if (Number.isNaN(n)) {
        setResult("");
        setError("Invalid range.");
        return;
      }
      nums.push(n);
    }

    setResult(nums.join("\n"));
  };

  const handleCopy = async () => {
    setError(null);
    if (!result.trim()) return;
    try {
      await navigator.clipboard.writeText(result);
      setCopyStatus("Copied to clipboard.");
    } catch {
      setCopyStatus(null);
      setError("Copy failed. Try selecting the text manually.");
    }
  };

  const handleReset = () => {
    setMinStr("1");
    setMaxStr("100");
    setCountStr("1");
    setResult("");
    setError(null);
    setCopyStatus(null);
  };

  const minOk = parseIntSafe(minStr);
  const maxOk = parseIntSafe(maxStr);
  const countGate =
    countStr.trim() === ""
      ? 1
      : (() => {
          const c = parseIntSafe(countStr);
          if (c === null || c < 1 || c > 1000) return null;
          return c;
        })();

  const canGenerate =
    minOk !== null &&
    maxOk !== null &&
    minOk <= maxOk &&
    countGate !== null;

  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.randomNumberGenerator)} />
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
        aria-labelledby="rng-heading"
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
                <span className="text-foreground">Random Number Generator</span>
              </p>
            </nav>

            <h1
              id="rng-heading"
              className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              Random Number Generator Online Free
            </h1>

            <p
              id={hintId}
              className="mt-2 max-w-2xl text-base text-muted-foreground sm:text-lg"
            >
              Pick a range and generate one or many random integers. Everything
              runs locally in your browser.
            </p>
          </div>

          <section
            className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-8"
            aria-labelledby="rng-heading"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="rng-min"
                  className="text-sm font-medium text-foreground"
                >
                  Minimum
                </label>
                <input
                  id="rng-min"
                  type="text"
                  inputMode="numeric"
                  value={minStr}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setMinStr(e.target.value)
                  }
                  aria-describedby={hintId}
                  className="mt-2 h-11 w-full rounded-lg border border-input bg-background px-4 font-mono text-base text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label
                  htmlFor="rng-max"
                  className="text-sm font-medium text-foreground"
                >
                  Maximum
                </label>
                <input
                  id="rng-max"
                  type="text"
                  inputMode="numeric"
                  value={maxStr}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setMaxStr(e.target.value)
                  }
                  className="mt-2 h-11 w-full rounded-lg border border-input bg-background px-4 font-mono text-base text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            <div className="mt-4">
              <label
                htmlFor="rng-count"
                className="text-sm font-medium text-foreground"
              >
                How many numbers?{" "}
                <span className="font-normal text-muted-foreground">
                  (optional, default 1)
                </span>
              </label>
              <input
                id="rng-count"
                type="text"
                inputMode="numeric"
                value={countStr}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setCountStr(e.target.value)
                }
                placeholder="1"
                className="mt-2 h-11 w-full max-w-xs rounded-lg border border-input bg-background px-4 font-mono text-base text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                onClick={generate}
                disabled={!canGenerate}
                className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Generate
              </button>
              <button
                type="button"
                onClick={() => void handleCopy()}
                disabled={!result.trim()}
                className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
              >
                Copy result
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                Reset
              </button>
            </div>

            {copyStatus ? (
              <p
                id={copyStatusId}
                className="mt-4 text-sm text-foreground"
                role="status"
              >
                {copyStatus}
              </p>
            ) : null}

            {error ? (
              <p
                id={errorId}
                className="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
                role="alert"
              >
                {error}
              </p>
            ) : null}

            <div className="mt-8">
              <p className="text-sm font-medium text-foreground">Result</p>
              <div
                className="mt-2 min-h-[120px] rounded-lg border-2 border-primary/30 bg-primary/5 px-4 py-4 font-mono text-lg font-semibold tracking-tight text-foreground sm:text-xl"
                aria-live="polite"
                aria-describedby={resultHintId}
              >
                {result ? (
                  <pre className="whitespace-pre-wrap break-words font-mono">
                    {result}
                  </pre>
                ) : (
                  <span className="text-muted-foreground">
                    Generated numbers appear here.
                  </span>
                )}
              </div>
              <p id={resultHintId} className="mt-2 text-xs text-muted-foreground">
                Integers are chosen uniformly from the inclusive range using
                secure random values.
              </p>
            </div>
          </section>

          <article className="mt-14 space-y-10" aria-labelledby="rng-seo-heading">
            <h2
              id="rng-seo-heading"
              className="text-2xl font-bold tracking-tight text-foreground"
            >
              What is a Random Number Generator?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              A random number generator picks values unpredictably within
              limits you set. This tool produces integers between a minimum and
              maximum, including both endpoints.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              How to Generate Random Numbers
            </h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-base leading-relaxed text-muted-foreground">
              <li>Enter the smallest and largest values you want.</li>
              <li>
                Optionally set how many numbers to draw (leave blank or 1 for a
                single value).
              </li>
              <li>Click Generate, then copy or reset if you want new defaults.</li>
            </ol>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Use Cases
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed text-muted-foreground">
              <li>Games: dice rolls, picks, or shuffled order.</li>
              <li>Testing: sample data and edge-case values.</li>
              <li>Lotteries and raffles: fair draws in a numeric range.</li>
            </ul>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Example
            </h2>
            <div className="mt-3 rounded-lg border border-border bg-muted/20 p-4 font-mono text-sm text-muted-foreground">
              <p className="text-foreground">Range 1–6, count 3 →</p>
              <p className="mt-2">4</p>
              <p>2</p>
              <p>6</p>
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">FAQ</h2>
            <dl className="mt-4 space-y-6">
              <div>
                <dt className="font-semibold text-foreground">
                  How does random number generation work?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Your browser uses cryptographically strong random bytes to pick
                  integers within your range, so results are not predictable from
                  a simple pattern.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  Can I generate multiple numbers?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Yes. Set “How many numbers?” to draw several values in one go
                  (up to 1000 per click).
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  Is this tool free?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Yes. SmartFlexa offers this generator at no cost with no signup
                  required.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  Is my data secure?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Numbers are created in your browser. Nothing is sent to our
                  servers to perform the random draw.
                </dd>
              </div>
            </dl>

            <RelatedTools currentPath="/tools/random-number-generator" />
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
