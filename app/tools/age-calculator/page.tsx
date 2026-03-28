"use client";

import { ChangeEvent, useId, useState } from "react";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

type YMD = { y: number; m: number; d: number };

type AgeResult = {
  years: number;
  months: number;
  days: number;
  totalDays: number;
};

function todayISO(): string {
  const n = new Date();
  const y = n.getFullYear();
  const mo = String(n.getMonth() + 1).padStart(2, "0");
  const d = String(n.getDate()).padStart(2, "0");
  return `${y}-${mo}-${d}`;
}

function parseISODateOnly(s: string): YMD | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s.trim());
  if (!m) return null;
  const y = Number(m[1]);
  const mo = Number(m[2]);
  const d = Number(m[3]);
  if (!Number.isInteger(y) || !Number.isInteger(mo) || !Number.isInteger(d)) return null;
  if (mo < 1 || mo > 12 || d < 1 || d > 31) return null;
  const dt = new Date(y, mo - 1, d);
  if (dt.getFullYear() !== y || dt.getMonth() !== mo - 1 || dt.getDate() !== d) return null;
  return { y, m: mo - 1, d };
}

function compareYMD(a: YMD, b: YMD): number {
  if (a.y !== b.y) return a.y - b.y;
  if (a.m !== b.m) return a.m - b.m;
  return a.d - b.d;
}

function totalDaysBetween(birth: YMD, ref: YMD): number {
  const t0 = Date.UTC(birth.y, birth.m, birth.d);
  const t1 = Date.UTC(ref.y, ref.m, ref.d);
  return Math.floor((t1 - t0) / 86400000);
}

function ageFromYMD(birth: YMD, ref: YMD): { years: number; months: number; days: number } {
  let years = ref.y - birth.y;
  let months = ref.m - birth.m;
  let days = ref.d - birth.d;
  if (days < 0) {
    months--;
    days += new Date(ref.y, ref.m, 0).getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }
  return { years, months, days };
}

function computeAge(dobStr: string, refStr: string): { ok: true; data: AgeResult } | { ok: false; error: string } {
  const birth = parseISODateOnly(dobStr);
  const ref = parseISODateOnly(refStr);
  if (!birth) return { ok: false, error: "Enter a valid date of birth (calendar date)." };
  if (!ref) return { ok: false, error: "Enter a valid “as of” date." };
  if (compareYMD(birth, ref) > 0) {
    return {
      ok: false,
      error: "Date of birth cannot be after the comparison date.",
    };
  }
  const { years, months, days } = ageFromYMD(birth, ref);
  const totalDays = totalDaysBetween(birth, ref);
  return { ok: true, data: { years, months, days, totalDays } };
}

export default function AgeCalculatorPage() {
  const hintId = useId();
  const errorId = useId();
  const resultRegionId = useId();

  const [dobStr, setDobStr] = useState("");
  const [refStr, setRefStr] = useState(todayISO);
  const [result, setResult] = useState<AgeResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculate = () => {
    setError(null);
    setResult(null);
    const out = computeAge(dobStr, refStr);
    if (!out.ok) {
      setError(out.error);
      return;
    }
    setResult(out.data);
  };

  const handleReset = () => {
    setDobStr("");
    setRefStr(todayISO());
    setResult(null);
    setError(null);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.ageCalculator)} />
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
        aria-labelledby="age-calc-heading"
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
                <span className="text-foreground">Age Calculator</span>
              </p>
            </nav>

            <h1
              id="age-calc-heading"
              className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              Age Calculator Online Free
            </h1>

            <p
              id={hintId}
              className="mt-2 max-w-2xl text-base text-muted-foreground sm:text-lg"
            >
              Enter your date of birth and an optional “as of” date (defaults to
              today). Get years, months, days, and total days lived—leap years
              handled by the calendar logic in your browser.
            </p>
          </div>

          <section
            className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-8"
            aria-labelledby="tool-panel-heading"
          >
            <h2 id="tool-panel-heading" className="sr-only">
              Age calculator
            </h2>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="dob"
                  className="text-sm font-medium text-foreground"
                >
                  Date of birth
                </label>
                <input
                  id="dob"
                  type="date"
                  value={dobStr}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setDobStr(e.target.value)
                  }
                  max={refStr || undefined}
                  className="mt-2 h-11 w-full rounded-lg border border-input bg-background px-3 font-mono text-base text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label
                  htmlFor="as-of"
                  className="text-sm font-medium text-foreground"
                >
                  As of (optional)
                </label>
                <input
                  id="as-of"
                  type="date"
                  value={refStr}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setRefStr(e.target.value)
                  }
                  className="mt-2 h-11 w-full rounded-lg border border-input bg-background px-3 font-mono text-base text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  Defaults to today. Change it for age on a specific date.
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
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
                className="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
                role="alert"
              >
                {error}
              </p>
            ) : null}

            {result && !error ? (
              <div
                id={resultRegionId}
                className="mt-8 rounded-xl border-2 border-primary/30 bg-primary/5 p-5 sm:p-6"
                aria-live="polite"
              >
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Your age
                </p>
                <ul className="mt-4 space-y-2 font-mono text-lg text-foreground sm:text-xl">
                  <li>
                    <span className="text-muted-foreground">Years:</span>{" "}
                    <span className="font-bold">{result.years}</span>
                  </li>
                  <li>
                    <span className="text-muted-foreground">Months:</span>{" "}
                    <span className="font-bold">{result.months}</span>
                  </li>
                  <li>
                    <span className="text-muted-foreground">Days:</span>{" "}
                    <span className="font-bold">{result.days}</span>
                  </li>
                </ul>
                <p className="mt-6 border-t border-border pt-4 text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Total days lived:</span>{" "}
                  <span className="font-mono font-semibold text-foreground">
                    {result.totalDays.toLocaleString()}
                  </span>{" "}
                  (whole calendar days between the two dates, UTC—leap years included)
                </p>
              </div>
            ) : null}
          </section>

          <article className="mt-14 space-y-10" aria-labelledby="age-seo-heading">
            <h2
              id="age-seo-heading"
              className="text-2xl font-bold tracking-tight text-foreground"
            >
              What is an Age Calculator?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              An age calculator finds how much time has passed between your date
              of birth and another date—usually today. It breaks the span into
              whole years, months, and days the way people read birthdays on a
              calendar, not just a single total.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              How to Calculate Age
            </h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-base leading-relaxed text-muted-foreground">
              <li>Select your date of birth using the date picker.</li>
              <li>
                Leave “As of” on today, or pick another date (for example, a
                deadline or historical record).
              </li>
              <li>Tap Calculate to see years, months, days, and total days lived.</li>
              <li>Use Reset to clear fields and restore today as the reference date.</li>
            </ol>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Why Use This Tool?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              It uses standard calendar arithmetic, so February, leap years, and
              month lengths are respected. You get both a human-readable
              breakdown and an exact day count for forms, fun facts, or planning.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Example
            </h2>
            <div className="mt-3 rounded-lg border border-border bg-muted/20 p-4 text-sm leading-relaxed text-muted-foreground">
              <p>
                If you were born on{" "}
                <span className="font-mono text-foreground">2000-06-15</span> and
                the comparison date is{" "}
                <span className="font-mono text-foreground">2025-06-15</span>, you
                are exactly{" "}
                <span className="font-medium text-foreground">25 years</span>,{" "}
                <span className="font-medium text-foreground">0 months</span>, and{" "}
                <span className="font-medium text-foreground">0 days</span> old,
                and you have lived{" "}
                <span className="font-mono text-foreground">9,131</span> days
                (including leap years in that range).
              </p>
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">FAQ</h2>
            <dl className="mt-4 space-y-6">
              <div>
                <dt className="font-semibold text-foreground">How is age calculated?</dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  We subtract birth year/month/day from the reference date, then
                  borrow days and months when needed so the remainder is never
                  negative—matching common “calendar age” rules.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  Can I calculate age in days?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Yes. After you calculate, we show total days between the two
                  dates using UTC midnight boundaries so daylight saving does not
                  skew the count.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Is this tool free?</dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Yes. SmartFlexa’s age calculator is free with no signup.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  Is my data secure?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Dates you enter stay in your browser; nothing is sent to our
                  servers for this calculation.
                </dd>
              </div>
            </dl>

            <RelatedTools currentPath="/tools/age-calculator" />
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
