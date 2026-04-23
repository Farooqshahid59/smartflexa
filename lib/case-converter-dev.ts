export type DevCaseConverterOptions = {
  trimSpaces: boolean;
  removeSpecialChars: boolean;
};

/** Normalize raw input according to toggles (before word splitting). */
export function preprocessInput(raw: string, opts: DevCaseConverterOptions): string {
  let s = raw;
  if (opts.trimSpaces) {
    s = s.replace(/\s+/g, " ").trim();
  }
  if (opts.removeSpecialChars) {
    s = s.replace(/[^a-zA-Z0-9]+/g, " ");
    if (opts.trimSpaces) {
      s = s.replace(/\s+/g, " ").trim();
    } else {
      s = s.trim();
    }
  }
  return s;
}

/**
 * Split into lowercase word tokens (handles camelCase / PascalCase boundaries,
 * spaces, hyphens, underscores).
 */
export function splitToWords(preprocessed: string): string[] {
  const s = preprocessed.trim();
  if (!s) return [];

  const withCamelBreaks = s
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2");

  return withCamelBreaks
    .split(/[\s\-_./:[\]{}]+/)
    .map((w) => w.replace(/[^a-zA-Z0-9]/g, "").toLowerCase())
    .filter((w) => w.length > 0);
}

function capWord(w: string): string {
  if (!w) return "";
  return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
}

export type DevCaseOutputs = {
  camelCase: string;
  snake_case: string;
  kebabCase: string;
  PascalCase: string;
  UPPER_CASE: string;
  lower_case: string;
};

export function convertToAllCases(
  raw: string,
  opts: DevCaseConverterOptions,
): DevCaseOutputs {
  const pre = preprocessInput(raw, opts);
  const words = splitToWords(pre);

  if (words.length === 0) {
    return {
      camelCase: "",
      snake_case: "",
      kebabCase: "",
      PascalCase: "",
      UPPER_CASE: "",
      lower_case: "",
    };
  }

  const camelCase =
    words[0]! +
    words
      .slice(1)
      .map((w) => capWord(w))
      .join("");

  const PascalCase = words.map((w) => capWord(w)).join("");
  const snake_case = words.join("_");
  const kebabCase = words.join("-");
  const UPPER_CASE = words.join("_").toUpperCase();
  const lower_case = words.join("");

  return {
    camelCase,
    snake_case,
    kebabCase,
    PascalCase,
    UPPER_CASE,
    lower_case,
  };
}
