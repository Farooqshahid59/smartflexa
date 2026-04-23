"use client";

import { useEffect, useId, useMemo, useState } from "react";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { FakeAddressInboundLinks } from "@/components/fake-address-inbound-links";
import { RelatedTools } from "@/components/related-tools";
import { SignatureGeneratorInboundLinks } from "@/components/signature-generator-inbound-links";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWER = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()_+-=[]{}|;:,.<>?";

function randomInt(max: number): number {
  if (max <= 0) return 0;
  const buf = new Uint32Array(1);
  crypto.getRandomValues(buf);
  return buf[0] % max;
}

function shuffleInPlace(chars: string[]): void {
  for (let i = chars.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    const t = chars[i];
    chars[i] = chars[j]!;
    chars[j] = t!;
  }
}

function generatePassword(
  length: number,
  opts: {
    upper: boolean;
    lower: boolean;
    numbers: boolean;
    symbols: boolean;
  },
): string {
  const sets: string[] = [];
  if (opts.upper) sets.push(UPPER);
  if (opts.lower) sets.push(LOWER);
  if (opts.numbers) sets.push(NUMBERS);
  if (opts.symbols) sets.push(SYMBOLS);
  if (sets.length === 0 || length < 1) return "";

  const pool = sets.join("");
  const out: string[] = [];
  for (let i = 0; i < sets.length; i++) {
    const s = sets[i]!;
    out.push(s[randomInt(s.length)]!);
  }
  for (let i = sets.length; i < length; i++) {
    out.push(pool[randomInt(pool.length)]!);
  }
  shuffleInPlace(out);
  return out.join("");
}

function strengthLabel(
  password: string,
  typeCount: number,
): "weak" | "medium" | "strong" {
  const len = password.length;
  if (len === 0) return "weak";
  let score = 0;
  score += Math.min(len * 3, 48);
  score += typeCount * 13;
  if (score < 42) return "weak";
  if (score < 72) return "medium";
  return "strong";
}

export default function PasswordGeneratorPage() {
  const hintId = useId();
  const strengthId = useId();
  const copyStatusId = useId();
  const errorId = useId();

  const [length, setLength] = useState(16);
  const [upper, setUpper] = useState(true);
  const [lower, setLower] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);

  const [password, setPassword] = useState("");
  const [copyStatus, setCopyStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const typeCount = [upper, lower, numbers, symbols].filter(Boolean).length;
  const canGenerate = typeCount > 0 && length >= 6 && length <= 32;

  const strength = useMemo(
    () => strengthLabel(password, typeCount),
    [password, typeCount],
  );

  const strengthPercent =
    strength === "weak" ? 33 : strength === "medium" ? 66 : 100;

  const runGenerate = () => {
    setCopyStatus(null);
    setError(null);
    if (!canGenerate) {
      setPassword("");
      return;
    }
    setPassword(
      generatePassword(length, {
        upper,
        lower,
        numbers,
        symbols,
      }),
    );
  };

  useEffect(() => {
    setCopyStatus(null);
    if (typeCount === 0 || length < 6 || length > 32) {
      setPassword("");
      return;
    }
    setPassword(
      generatePassword(length, {
        upper,
        lower,
        numbers,
        symbols,
      }),
    );
  }, [length, upper, lower, numbers, symbols, typeCount]);

  const handleCopy = async () => {
    setError(null);
    if (!password) return;
    try {
      await navigator.clipboard.writeText(password);
      setCopyStatus("Copied!");
    } catch {
      setCopyStatus(null);
      setError("Could not copy. Try selecting the password manually.");
    }
  };

  const setLengthClamped = (n: number) => {
    const v = Math.min(32, Math.max(6, Math.round(n)));
    setLength(v);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.passwordGenerator)} />
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
        aria-labelledby="password-gen-heading"
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
                <span className="text-foreground">Password Generator</span>
              </p>
            </nav>
            <h1
              id="password-gen-heading"
              className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              Strong Password Generator Online Free
            </h1>
            <p
              id={hintId}
              className="mt-2 max-w-2xl text-base text-muted-foreground sm:text-lg"
            >
              Create random passwords with adjustable length and character sets.
              Nothing is sent to a server—generation stays in your browser.
            </p>
          </div>

          <section
            className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-8"
            aria-labelledby="password-gen-heading"
          >
            <div className="space-y-4">
              <div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <label
                    htmlFor="pwd-length"
                    className="text-sm font-medium text-foreground"
                  >
                    Password length ({length})
                  </label>
                  <input
                    id="pwd-length-num"
                    type="number"
                    min={6}
                    max={32}
                    value={length}
                    onChange={(e) => setLengthClamped(Number(e.target.value))}
                    className="h-10 w-24 rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    aria-describedby={hintId}
                  />
                </div>
                <input
                  id="pwd-length"
                  type="range"
                  min={6}
                  max={32}
                  value={length}
                  onChange={(e) => setLengthClamped(Number(e.target.value))}
                  className="mt-3 h-2 w-full cursor-pointer accent-primary"
                />
              </div>

              <fieldset>
                <legend className="text-sm font-medium text-foreground">
                  Character sets
                </legend>
                <ul className="mt-3 space-y-3" role="list">
                  <li className="flex items-center gap-3">
                    <input
                      id="opt-upper"
                      type="checkbox"
                      checked={upper}
                      onChange={(e) => setUpper(e.target.checked)}
                      className="h-4 w-4 rounded border-border text-primary focus:ring-ring"
                    />
                    <label htmlFor="opt-upper" className="text-sm text-foreground">
                      Uppercase letters (A–Z)
                    </label>
                  </li>
                  <li className="flex items-center gap-3">
                    <input
                      id="opt-lower"
                      type="checkbox"
                      checked={lower}
                      onChange={(e) => setLower(e.target.checked)}
                      className="h-4 w-4 rounded border-border text-primary focus:ring-ring"
                    />
                    <label htmlFor="opt-lower" className="text-sm text-foreground">
                      Lowercase letters (a–z)
                    </label>
                  </li>
                  <li className="flex items-center gap-3">
                    <input
                      id="opt-num"
                      type="checkbox"
                      checked={numbers}
                      onChange={(e) => setNumbers(e.target.checked)}
                      className="h-4 w-4 rounded border-border text-primary focus:ring-ring"
                    />
                    <label htmlFor="opt-num" className="text-sm text-foreground">
                      Numbers (0–9)
                    </label>
                  </li>
                  <li className="flex items-center gap-3">
                    <input
                      id="opt-sym"
                      type="checkbox"
                      checked={symbols}
                      onChange={(e) => setSymbols(e.target.checked)}
                      className="h-4 w-4 rounded border-border text-primary focus:ring-ring"
                    />
                    <label htmlFor="opt-sym" className="text-sm text-foreground">
                      Symbols (!@#$…)
                    </label>
                  </li>
                </ul>
                {typeCount === 0 ? (
                  <p className="mt-3 text-sm text-destructive" role="alert">
                    Select at least one character set to generate a password.
                  </p>
                ) : null}
              </fieldset>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                onClick={runGenerate}
                disabled={!canGenerate}
                className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Generate
              </button>
              <button
                type="button"
                onClick={() => void handleCopy()}
                disabled={!password}
                className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
              >
                Copy password
              </button>
            </div>

            {copyStatus ? (
              <p
                id={copyStatusId}
                className="mt-3 text-sm font-medium text-foreground"
                role="status"
              >
                {copyStatus}
              </p>
            ) : null}
            {error ? (
              <p
                id={errorId}
                className="mt-3 text-sm text-destructive"
                role="alert"
              >
                {error}
              </p>
            ) : null}

            <div className="mt-8">
              <label
                htmlFor="pwd-output"
                className="text-sm font-medium text-foreground"
              >
                Generated password
              </label>
              <input
                id="pwd-output"
                type="text"
                readOnly
                value={password}
                autoComplete="off"
                spellCheck={false}
                className="mt-2 h-12 w-full rounded-lg border border-input bg-muted/20 px-4 font-mono text-base text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div
              className="mt-6 rounded-lg border border-border bg-muted/30 p-4"
              aria-labelledby={strengthId}
            >
              <p id={strengthId} className="text-sm font-medium text-foreground">
                Strength:{" "}
                <span
                  className={
                    strength === "weak"
                      ? "text-destructive"
                      : strength === "medium"
                        ? "text-amber-600 dark:text-amber-500"
                        : "text-emerald-600 dark:text-emerald-500"
                  }
                >
                  {strength === "weak"
                    ? "Weak"
                    : strength === "medium"
                      ? "Medium"
                      : "Strong"}
                </span>
              </p>
              <div
                className="mt-3 h-2 w-full overflow-hidden rounded-full bg-muted"
                role="progressbar"
                aria-valuenow={strengthPercent}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`Password strength ${strength}`}
              >
                <div
                  style={{ width: `${strengthPercent}%` }}
                  className={
                    strength === "weak"
                      ? "h-full bg-destructive transition-all"
                      : strength === "medium"
                        ? "h-full bg-amber-500 transition-all"
                        : "h-full bg-emerald-500 transition-all"
                  }
                />
              </div>
            </div>
          </section>

          <article className="mt-14 space-y-10" aria-labelledby="pwd-seo-heading">
            <h2
              id="pwd-seo-heading"
              className="text-2xl font-bold tracking-tight text-foreground"
            >
              What is a Password Generator?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              A password generator creates random strings that are hard to guess.
              You choose length and which kinds of characters to include, then
              copy the result into your password manager or account form.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              How to Generate Strong Passwords
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed text-muted-foreground">
              <li>Use at least 12–16 characters for important accounts.</li>
              <li>Mix uppercase, lowercase, numbers, and symbols.</li>
              <li>Avoid personal words, dates, or keyboard patterns.</li>
              <li>Store passwords in a reputable password manager.</li>
            </ul>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Why Strong Passwords Matter
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Weak or reused passwords are a common way accounts get taken over.
              Long, random passwords reduce the risk of brute-force and guessing
              attacks.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Example
            </h2>
            <div className="mt-3 rounded-lg border border-border bg-muted/20 p-4 text-sm">
              <p className="font-medium text-foreground">Weak</p>
              <p className="mt-2 font-mono text-muted-foreground">password1</p>
              <p className="mt-4 font-medium text-foreground">Strong</p>
              <p className="mt-2 font-mono text-muted-foreground">
                K9#mP2$vLxQ8@nR4!
              </p>
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">FAQ</h2>
            <dl className="mt-4 space-y-6">
              <div>
                <dt className="font-semibold text-foreground">
                  What makes a password strong?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Length, randomness, and variety of character types. This tool
                  scores strength from length and how many kinds of characters you
                  include.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Is this tool safe?</dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Passwords are built locally in your browser using secure random
                  values. They are not transmitted to SmartFlexa when you generate
                  or copy them.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  Is this tool free?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Yes. The password generator is free to use with no signup
                  required.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  Do you store passwords?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  No. We do not save generated passwords on our servers. Clear your
                  clipboard after pasting if you share your device.
                </dd>
              </div>
            </dl>

            <SignatureGeneratorInboundLinks />
            <FakeAddressInboundLinks />
            <RelatedTools
              currentPath="/tools/password-generator"
              heading="More tools"
            />
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
