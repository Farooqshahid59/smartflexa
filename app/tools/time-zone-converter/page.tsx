"use client";

import { ChangeEvent, useCallback, useEffect, useId, useMemo, useState } from "react";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

const FALLBACK_TIME_ZONES = [
  "UTC",
  "Africa/Cairo",
  "Africa/Johannesburg",
  "America/Anchorage",
  "America/Bogota",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "America/Mexico_City",
  "America/New_York",
  "America/Sao_Paulo",
  "America/Toronto",
  "America/Vancouver",
  "Asia/Bangkok",
  "Asia/Dubai",
  "Asia/Hong_Kong",
  "Asia/Jakarta",
  "Asia/Kolkata",
  "Asia/Seoul",
  "Asia/Shanghai",
  "Asia/Singapore",
  "Asia/Tokyo",
  "Australia/Melbourne",
  "Australia/Perth",
  "Australia/Sydney",
  "Europe/Amsterdam",
  "Europe/Berlin",
  "Europe/Istanbul",
  "Europe/London",
  "Europe/Madrid",
  "Europe/Moscow",
  "Europe/Paris",
  "Europe/Rome",
  "Europe/Warsaw",
  "Pacific/Auckland",
  "Pacific/Fiji",
  "Pacific/Honolulu",
] as const;

function getAllTimeZones(): string[] {
  try {
    const intl = Intl as unknown as {
      supportedValuesOf?: (key: string) => string[];
    };
    if (typeof intl.supportedValuesOf === "function") {
      return [...intl.supportedValuesOf("timeZone")].sort((a, b) =>
        a.localeCompare(b),
      );
    }
  } catch {
    /* ignore */
  }
  return [...FALLBACK_TIME_ZONES];
}

function formatDateTimeInZone(date: Date, timeZone: string): string {
  return new Intl.DateTimeFormat(undefined, {
    timeZone,
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  }).format(date);
}

function wallClockInZoneToUtc(
  y: number,
  mo: number,
  d: number,
  h: number,
  mi: number,
  timeZone: string,
): Date | null {
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  });
  const read = (ms: number) => {
    const o: Record<string, number> = {};
    for (const p of fmt.formatToParts(new Date(ms))) {
      if (p.type !== "literal") {
        o[p.type] = Number(p.value);
      }
    }
    return {
      y: o.year,
      mo: o.month,
      d: o.day,
      h: o.hour,
      mi: o.minute,
    };
  };
  const want = { y, mo, d, h, mi };
  const same = (
    a: typeof want,
    b: typeof want,
  ) =>
    a.y === b.y &&
    a.mo === b.mo &&
    a.d === b.d &&
    a.h === b.h &&
    a.mi === b.mi;

  const anchor = Date.UTC(y, mo - 1, d, h, mi);
  for (let delta = -48 * 3600000; delta <= 48 * 3600000; delta += 60000) {
    const t = anchor + delta;
    if (same(read(t), want)) {
      return new Date(t);
    }
  }
  return null;
}

function datetimeLocalValueForNowInZone(timeZone: string, now: Date): string {
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });
  const o: Record<string, string> = {};
  for (const p of fmt.formatToParts(now)) {
    if (p.type !== "literal") {
      o[p.type] = p.value;
    }
  }
  return `${o.year}-${o.month}-${o.day}T${o.hour}:${o.minute}`;
}

function parseDatetimeLocal(s: string): {
  y: number;
  mo: number;
  d: number;
  h: number;
  mi: number;
} | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(s.trim());
  if (!m) return null;
  const y = Number(m[1]);
  const mo = Number(m[2]);
  const d = Number(m[3]);
  const h = Number(m[4]);
  const mi = Number(m[5]);
  if (
    [y, mo, d, h, mi].some((n) => !Number.isInteger(n)) ||
    mo < 1 ||
    mo > 12 ||
    d < 1 ||
    d > 31 ||
    h > 23 ||
    mi > 59
  ) {
    return null;
  }
  return { y, mo, d, h, mi };
}

export default function TimeZoneConverterPage() {
  const hintId = useId();
  const errorId = useId();
  const resultId = useId();
  const nowSourceId = useId();
  const nowTargetId = useId();

  const zones = useMemo(() => getAllTimeZones(), []);

  const browserTz =
    typeof Intl !== "undefined"
      ? Intl.DateTimeFormat().resolvedOptions().timeZone
      : "UTC";

  const [sourceTz, setSourceTz] = useState(
    () => (zones.includes(browserTz) ? browserTz : "UTC"),
  );
  const [targetTz, setTargetTz] = useState(() =>
    zones.includes("Europe/London") ? "Europe/London" : "UTC",
  );
  const [localDt, setLocalDt] = useState(() =>
    datetimeLocalValueForNowInZone(
      zones.includes(browserTz) ? browserTz : "UTC",
      new Date(),
    ),
  );

  const [converted, setConverted] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setTick(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const now = new Date(tick);
  const nowInSource = formatDateTimeInZone(now, sourceTz);
  const nowInTarget = formatDateTimeInZone(now, targetTz);

  const runConvert = useCallback(() => {
    setError(null);
    setConverted(null);
    const parts = parseDatetimeLocal(localDt);
    if (!parts) {
      setError("Pick a valid date and time.");
      return;
    }
    const instant = wallClockInZoneToUtc(
      parts.y,
      parts.mo,
      parts.d,
      parts.h,
      parts.mi,
      sourceTz,
    );
    if (!instant) {
      setError(
        "That date and time may not exist in the source zone (for example during a daylight-saving “spring forward” gap). Try another time.",
      );
      return;
    }
    setConverted(formatDateTimeInZone(instant, targetTz));
  }, [localDt, sourceTz, targetTz]);

  useEffect(() => {
    runConvert();
  }, [runConvert]);

  const swapZones = () => {
    setSourceTz(targetTz);
    setTargetTz(sourceTz);
  };

  const setNowInSource = () => {
    setLocalDt(datetimeLocalValueForNowInZone(sourceTz, new Date()));
    setError(null);
  };

  const handleReset = () => {
    const src = zones.includes(browserTz) ? browserTz : "UTC";
    const tgt = zones.includes("Europe/London") ? "Europe/London" : "UTC";
    setSourceTz(src);
    setTargetTz(tgt);
    setLocalDt(datetimeLocalValueForNowInZone(src, new Date()));
    setError(null);
    setConverted(null);
  };

  const selectClass =
    "mt-2 h-11 w-full rounded-lg border border-input bg-background px-3 text-base text-foreground focus:outline-none focus:ring-2 focus:ring-ring";

  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.timeZoneConverter)} />
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
        aria-labelledby="tz-conv-heading"
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
                <span className="text-foreground">Time Zone Converter</span>
              </p>
            </nav>

            <h1
              id="tz-conv-heading"
              className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              Time Zone Converter Online Free
            </h1>

            <p
              id={hintId}
              className="mt-2 max-w-2xl text-base text-muted-foreground sm:text-lg"
            >
              Choose source and target IANA time zones, set the date and time as
              it appears in the source zone, and see the equivalent in the target
              zone. Uses your browser’s{" "}
              <code className="rounded bg-muted px-1 font-mono text-sm">
                Intl
              </code>{" "}
              data (including daylight saving rules).
            </p>
          </div>

          <section
            className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-8"
            aria-labelledby="tool-panel-heading"
          >
            <h2 id="tool-panel-heading" className="sr-only">
              Time zone converter
            </h2>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="tz-source" className="text-sm font-medium text-foreground">
                  Source time zone
                </label>
                <select
                  id="tz-source"
                  value={sourceTz}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    setSourceTz(e.target.value)
                  }
                  className={selectClass}
                >
                  {zones.map((z) => (
                    <option key={z} value={z}>
                      {z}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="tz-target" className="text-sm font-medium text-foreground">
                  Target time zone
                </label>
                <select
                  id="tz-target"
                  value={targetTz}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    setTargetTz(e.target.value)
                  }
                  className={selectClass}
                >
                  {zones.map((z) => (
                    <option key={z} value={z}>
                      {z}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="tz-local-dt" className="text-sm font-medium text-foreground">
                Date &amp; time (in source zone)
              </label>
              <input
                id="tz-local-dt"
                type="datetime-local"
                value={localDt}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setLocalDt(e.target.value)
                }
                className="mt-2 h-11 w-full rounded-lg border border-input bg-background px-3 font-mono text-base text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                onClick={() => runConvert()}
                className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Convert
              </button>
              <button
                type="button"
                onClick={swapZones}
                className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                Swap time zones
              </button>
              <button
                type="button"
                onClick={setNowInSource}
                className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                Use now (source)
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                Reset
              </button>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div
                className="rounded-lg border border-border bg-muted/20 p-4 text-sm"
                aria-live="polite"
              >
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Current time — source
                </p>
                <p id={nowSourceId} className="mt-2 text-foreground">
                  {nowInSource}
                </p>
              </div>
              <div
                className="rounded-lg border border-border bg-muted/20 p-4 text-sm"
                aria-live="polite"
              >
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Current time — target
                </p>
                <p id={nowTargetId} className="mt-2 text-foreground">
                  {nowInTarget}
                </p>
              </div>
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

            <div
              id={resultId}
              className="mt-8 rounded-xl border-2 border-primary/30 bg-primary/5 p-5 sm:p-6"
              aria-live="polite"
            >
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Time in target zone
              </p>
              <p className="mt-3 text-lg font-medium leading-relaxed text-foreground sm:text-xl">
                {converted ?? "—"}
              </p>
            </div>
          </section>

          <article className="mt-14 space-y-10" aria-labelledby="tz-seo-heading">
            <h2
              id="tz-seo-heading"
              className="text-2xl font-bold tracking-tight text-foreground"
            >
              What is a Time Zone Converter?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              A time zone converter maps a specific clock time in one region to
              the correct moment in another, using official zone rules (including
              daylight saving). It helps you avoid guessing when colleagues or
              family are available.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              How to Convert Time Zones
            </h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-base leading-relaxed text-muted-foreground">
              <li>Select where the time “lives” (source) and where you want it shown (target).</li>
              <li>
                Enter the date and time as printed on a clock in the source zone.
              </li>
              <li>
                The result updates automatically; tap Convert to re-run, Swap to
                flip zones, or Use now (source) for the current time there.
              </li>
            </ol>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Why Use This Tool?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Scheduling global meetings, travel, and calls is easier when you can
              trust DST-aware conversion. Everything runs locally in your browser
              with no account.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Example
            </h2>
            <div className="mt-3 rounded-lg border border-border bg-muted/20 p-4 text-sm leading-relaxed text-muted-foreground">
              <p>
                Source <span className="font-mono text-foreground">America/New_York</span>, target{" "}
                <span className="font-mono text-foreground">Asia/Tokyo</span>: when it is{" "}
                <span className="font-mono text-foreground">9:00</span> on a given morning in New
                York, Tokyo is many hours ahead on the same instant—pick the date
                in the picker to see the exact converted date and time with zone
                abbreviations.
              </p>
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">FAQ</h2>
            <dl className="mt-4 space-y-6">
              <div>
                <dt className="font-semibold text-foreground">
                  How to convert time between countries?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Pick each country’s time zone (or city zone) in the lists, enter
                  the source local time, and read the target line. Countries with
                  multiple zones may need a specific city entry.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  Does this handle daylight saving?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Yes, when your browser ships up-to-date{" "}
                  <code className="rounded bg-muted px-1 font-mono text-sm">Intl</code>{" "}
                  time zone data. Skipped or repeated local times during DST changes
                  may show an error so you can adjust the time.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Is this tool free?</dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Yes. SmartFlexa’s time zone converter is free with no signup.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  Is my data secure?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Conversions run on your device; your selections are not sent to
                  our servers.
                </dd>
              </div>
            </dl>

            <RelatedTools currentPath="/tools/time-zone-converter" />
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
