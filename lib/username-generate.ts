export type UsernameCategory = "cool" | "gaming" | "instagram" | "professional";
export type UsernameLength = "short" | "medium" | "long";

export type UsernameGenOptions = {
  keyword: string;
  category: UsernameCategory;
  includeNumbers: boolean;
  includeSymbols: boolean;
  length: UsernameLength;
  count: number;
};

function randU32(): number {
  const buf = new Uint32Array(1);
  crypto.getRandomValues(buf);
  return buf[0]!;
}

function pick<T>(arr: readonly T[]): T {
  return arr[randU32() % arr.length]!;
}

function lenRange(length: UsernameLength): { min: number; max: number } {
  if (length === "short") return { min: 6, max: 12 };
  if (length === "long") return { min: 16, max: 28 };
  return { min: 10, max: 20 };
}

function sanitizeKeyword(raw: string): string {
  const s = raw
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .slice(0, 12);
  return s;
}

const COOL_ADJ = [
  "silent",
  "neon",
  "velvet",
  "frost",
  "urban",
  "cosmic",
  "rapid",
  "shadow",
  "golden",
  "crimson",
  "azure",
  "midnight",
  "electric",
  "lunar",
  "nova",
] as const;

const COOL_NOUN = [
  "pulse",
  "orbit",
  "vibe",
  "wave",
  "drift",
  "flux",
  "beam",
  "echo",
  "rift",
  "spark",
  "nexus",
  "cipher",
  "pixel",
  "storm",
  "blaze",
] as const;

const GAMING_PREFIX = [
  "x",
  "pro",
  "dark",
  "void",
  "cyber",
  "neo",
  "shadow",
  "toxic",
  "sniper",
  "frag",
  "headshot",
  "nexus",
  "pixel",
  "rage",
  "stealth",
] as const;

const GAMING_SUFFIX = [
  "slayer",
  "hunter",
  "reaper",
  "wolf",
  "fox",
  "blade",
  "strike",
  "zero",
  "prime",
  "elite",
  "clutch",
  "carry",
  "buff",
  "nerf",
  "gg",
] as const;

const IG_ADJ = [
  "soft",
  "cozy",
  "pastel",
  "golden",
  "little",
  "tiny",
  "sweet",
  "lazy",
  "cloud",
  "peachy",
  "honey",
  "lavender",
  "minty",
  "sunny",
  "dreamy",
] as const;

const IG_NOUN = [
  "bloom",
  "daisy",
  "moon",
  "skies",
  "latte",
  "journal",
  "vibes",
  "days",
  "hours",
  "notes",
  "pixels",
  "roses",
  "waves",
  "fields",
  "studio",
] as const;

const PRO_ADJ = [
  "global",
  "prime",
  "summit",
  "vertex",
  "clear",
  "bright",
  "north",
  "signal",
  "ledger",
  "metric",
  "vector",
  "catalyst",
  "insight",
  "pillar",
  "anchor",
] as const;

const PRO_NOUN = [
  "analytics",
  "reports",
  "consult",
  "advisory",
  "solutions",
  "systems",
  "network",
  "capital",
  "partners",
  "studio",
  "works",
  "group",
  "labs",
  "cloud",
  "data",
] as const;

const SYMBOLS = [".", "_"] as const;

function randomDigits(len: 1 | 2 | 3 | 4): string {
  let s = "";
  for (let i = 0; i < len; i++) s += String(randU32() % 10);
  return s;
}

function maybeSymbol(include: boolean): string {
  if (!include) return "";
  return pick([...SYMBOLS]);
}

function buildCool(opts: UsernameGenOptions, kw: string): string {
  const a = pick([...COOL_ADJ]);
  const n = pick([...COOL_NOUN]);
  const sym = maybeSymbol(opts.includeSymbols);
  let core = `${a}${sym}${n}`;
  if (kw) {
    const k = kw.slice(0, 8);
    if (randU32() % 2 === 0) core = `${k}${sym}${a}${n}`;
    else core = `${a}${n}${sym}${k}`;
  }
  if (opts.includeNumbers) core += randomDigits(randU32() % 2 === 0 ? 2 : 3);
  return core.toLowerCase().replace(/[^a-z0-9._]/g, "").slice(0, 30);
}

function buildGaming(opts: UsernameGenOptions, kw: string): string {
  const p = pick([...GAMING_PREFIX]);
  const s = pick([...GAMING_SUFFIX]);
  const sym = opts.includeSymbols && randU32() % 2 === 0 ? "_" : "";
  let core = `${p}${sym}${s}`;
  if (kw) core = `${p}${kw.slice(0, 6)}${s}`;
  if (opts.includeNumbers) core += randomDigits(2);
  if (randU32() % 3 === 0) core = `${core}${pick(["x", "z", "v"])}`;
  return core.toLowerCase().replace(/[^a-z0-9._]/g, "").slice(0, 30);
}

function buildInstagram(opts: UsernameGenOptions, kw: string): string {
  const a = pick([...IG_ADJ]);
  const n = pick([...IG_NOUN]);
  const sep = opts.includeSymbols ? (randU32() % 2 === 0 ? "." : "_") : "";
  let core = `${a}${sep}${n}`;
  if (kw) {
    const k = kw.slice(0, 10);
    core = randU32() % 2 === 0 ? `${k}${sep}${n}` : `${a}${sep}${k}`;
  }
  if (opts.includeNumbers) core += randomDigits(2);
  return core.toLowerCase().replace(/[^a-z0-9._]/g, "").slice(0, 30);
}

function buildProfessional(opts: UsernameGenOptions, kw: string): string {
  const a = pick([...PRO_ADJ]);
  const n = pick([...PRO_NOUN]);
  const sep = opts.includeSymbols ? "_" : "";
  let core = `${a}${sep}${n}`;
  if (kw) core = `${kw.slice(0, 10)}${sep}${pick([...PRO_NOUN])}`;
  if (opts.includeNumbers && randU32() % 2 === 0) core += randomDigits(2);
  return core.toLowerCase().replace(/[^a-z0-9._]/g, "").slice(0, 30);
}

function buildOne(opts: UsernameGenOptions, kw: string): string {
  switch (opts.category) {
    case "gaming":
      return buildGaming(opts, kw);
    case "instagram":
      return buildInstagram(opts, kw);
    case "professional":
      return buildProfessional(opts, kw);
    default:
      return buildCool(opts, kw);
  }
}

function padToLength(base: string, opts: UsernameGenOptions, kw: string): string {
  let s = base;
  const { min, max } = lenRange(opts.length);
  let guard = 0;
  while (s.length < min && guard++ < 20) {
    s += pick([...COOL_NOUN]).slice(0, 4);
    if (opts.includeNumbers) s += randomDigits(1);
  }
  guard = 0;
  while (s.length > max && guard++ < 30) {
    s = s.slice(0, Math.max(min, s.length - 2));
  }
  if (s.length < 3) {
    s = (kw || "user") + randomDigits(4);
  }
  return s.slice(0, 30);
}

export function generateUsernameBatch(opts: UsernameGenOptions): string[] {
  const kw = sanitizeKeyword(opts.keyword);
  const count = Math.min(20, Math.max(10, Math.floor(opts.count)));
  const out = new Set<string>();
  let attempts = 0;
  const maxAttempts = count * 200;

  while (out.size < count && attempts < maxAttempts) {
    attempts++;
    let u = buildOne(opts, kw);
    u = padToLength(u, opts, kw);
    if (u.length >= 3) out.add(u);
  }

  return [...out].slice(0, count);
}
