"use client";

import { useCallback, useId, useState } from "react";

import {
  type FakeAddress,
  type FakeAddressCountry,
  formatAddressBlock,
  generateFakeAddresses,
} from "@/lib/fake-address-generate";

export type FakeAddressGeneratorToolProps = {
  defaultCountry?: FakeAddressCountry;
};

const COUNTRIES: { value: FakeAddressCountry; label: string }[] = [
  { value: "US", label: "United States" },
  { value: "UK", label: "United Kingdom" },
  { value: "IN", label: "India" },
  { value: "CA", label: "Canada" },
];

function zipLabel(c: FakeAddressCountry): string {
  if (c === "US") return "ZIP code";
  if (c === "UK") return "Postcode";
  if (c === "IN") return "PIN code";
  return "Postal code";
}

function stateLabel(c: FakeAddressCountry): string {
  if (c === "UK") return "County / region";
  if (c === "IN") return "State";
  if (c === "CA") return "Province";
  return "State";
}

export function FakeAddressGeneratorTool({
  defaultCountry = "US",
}: FakeAddressGeneratorToolProps) {
  const countryId = useId();
  const countId = useId();
  const statusId = useId();

  const [country, setCountry] = useState<FakeAddressCountry>(defaultCountry);
  const [count, setCount] = useState(1);
  const [addresses, setAddresses] = useState<FakeAddress[]>(() =>
    generateFakeAddresses(defaultCountry, 1),
  );
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

  const runGenerate = useCallback(() => {
    setAddresses(generateFakeAddresses(country, count));
    setCopyStatus(null);
  }, [country, count]);

  const handleCopyAll = async () => {
    const text = addresses.map(formatAddressBlock).join("\n\n—\n\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus("Copied to clipboard.");
    } catch {
      setCopyStatus("Copy failed — select text manually.");
    }
    window.setTimeout(() => setCopyStatus(null), 2500);
  };

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-8">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor={countryId}
            className="text-xs font-medium text-foreground"
          >
            Country
          </label>
          <select
            id={countryId}
            value={country}
            onChange={(e) => {
              const c = e.target.value as FakeAddressCountry;
              setCountry(c);
              setAddresses(generateFakeAddresses(c, count));
              setCopyStatus(null);
            }}
            className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
          >
            {COUNTRIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={countId} className="text-xs font-medium text-foreground">
            Number of addresses (1–5)
          </label>
          <select
            id={countId}
            value={count}
            onChange={(e) => {
              const n = Number(e.target.value);
              setCount(n);
              setAddresses(generateFakeAddresses(country, n));
              setCopyStatus(null);
            }}
            className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <button
          type="button"
          onClick={runGenerate}
          className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Generate address
        </button>
        <button
          type="button"
          onClick={runGenerate}
          className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-6 text-sm font-medium text-foreground hover:bg-muted"
        >
          Regenerate
        </button>
        <button
          type="button"
          onClick={() => void handleCopyAll()}
          className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-6 text-sm font-medium text-foreground hover:bg-muted"
        >
          Copy to clipboard
        </button>
      </div>

      {copyStatus ? (
        <p id={statusId} className="mt-3 text-sm text-muted-foreground" aria-live="polite">
          {copyStatus}
        </p>
      ) : null}

      <div className="mt-8 space-y-6">
        {addresses.map((a, i) => (
          <div
            key={`${a.fullName}-${a.street}-${i}`}
            className="rounded-lg border border-border bg-muted/15 p-4 sm:p-5"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Address {i + 1}
            </p>
            <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
              <div className="sm:col-span-2">
                <dt className="text-xs font-medium text-muted-foreground">Full name</dt>
                <dd className="mt-0.5 font-medium text-foreground">{a.fullName}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-xs font-medium text-muted-foreground">Street address</dt>
                <dd className="mt-0.5 text-foreground">{a.street}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-muted-foreground">City</dt>
                <dd className="mt-0.5 text-foreground">{a.city}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-muted-foreground">{stateLabel(a.country)}</dt>
                <dd className="mt-0.5 text-foreground">{a.state}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-muted-foreground">{zipLabel(a.country)}</dt>
                <dd className="mt-0.5 font-mono text-foreground">{a.zip}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-muted-foreground">Phone</dt>
                <dd className="mt-0.5 font-mono text-foreground">{a.phone}</dd>
              </div>
            </dl>
          </div>
        ))}
      </div>
    </div>
  );
}
