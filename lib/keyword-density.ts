/** Common English stop words for optional filtering (lowercase). */
const STOP_LIST = [
  "a",
  "about",
  "after",
  "all",
  "also",
  "am",
  "an",
  "and",
  "any",
  "are",
  "as",
  "at",
  "be",
  "because",
  "been",
  "before",
  "being",
  "between",
  "both",
  "but",
  "by",
  "can",
  "could",
  "did",
  "do",
  "does",
  "doing",
  "done",
  "down",
  "each",
  "few",
  "for",
  "from",
  "further",
  "had",
  "has",
  "have",
  "having",
  "he",
  "her",
  "here",
  "hers",
  "herself",
  "him",
  "himself",
  "his",
  "how",
  "i",
  "if",
  "in",
  "into",
  "is",
  "it",
  "its",
  "itself",
  "just",
  "like",
  "me",
  "more",
  "most",
  "my",
  "myself",
  "no",
  "nor",
  "not",
  "now",
  "of",
  "off",
  "on",
  "once",
  "only",
  "or",
  "other",
  "our",
  "ours",
  "ourselves",
  "out",
  "over",
  "own",
  "same",
  "she",
  "should",
  "so",
  "some",
  "such",
  "than",
  "that",
  "the",
  "their",
  "theirs",
  "them",
  "themselves",
  "then",
  "there",
  "these",
  "they",
  "this",
  "those",
  "through",
  "to",
  "too",
  "under",
  "until",
  "up",
  "very",
  "was",
  "we",
  "were",
  "what",
  "when",
  "where",
  "which",
  "while",
  "who",
  "whom",
  "why",
  "will",
  "with",
  "would",
  "you",
  "your",
  "yours",
  "yourself",
  "yourselves",
];

export const STOP_WORDS = new Set(STOP_LIST);

/** Extract lowercase alphanumeric tokens (ASCII letters + digits). */
export function tokenize(text: string): string[] {
  const m = text.toLowerCase().match(/[a-z0-9]+/g);
  return m ?? [];
}

export type KeywordRow = {
  word: string;
  count: number;
  /** Percent of all tokens in the document. */
  density: number;
};

export type KeywordDensityResult = {
  totalWords: number;
  /** Distinct token count (full corpus, before stop-word table filter). */
  uniqueWords: number;
  rows: KeywordRow[];
};

export function analyzeKeywordDensity(
  text: string,
  opts: { filterStopWords: boolean },
): KeywordDensityResult {
  const tokens = tokenize(text);
  const totalWords = tokens.length;
  if (totalWords === 0) {
    return { totalWords: 0, uniqueWords: 0, rows: [] };
  }

  const freq = new Map<string, number>();
  for (const t of tokens) {
    freq.set(t, (freq.get(t) ?? 0) + 1);
  }

  const uniqueWords = freq.size;

  let rows: KeywordRow[] = Array.from(freq.entries()).map(([word, count]) => ({
    word,
    count,
    density: (count / totalWords) * 100,
  }));

  if (opts.filterStopWords) {
    rows = rows.filter((r) => !STOP_WORDS.has(r.word));
  }

  return { totalWords, uniqueWords, rows };
}

export function sortRowsByCount(rows: KeywordRow[], direction: "asc" | "desc"): KeywordRow[] {
  const mult = direction === "desc" ? -1 : 1;
  return [...rows].sort((a, b) => {
    if (a.count !== b.count) return (a.count - b.count) * mult;
    return a.word.localeCompare(b.word);
  });
}

/** Words to highlight in preview (top N by count among given rows). */
export function topKeywordsForHighlight(rows: KeywordRow[], limit = 25): Set<string> {
  const sorted = [...rows].sort((a, b) => b.count - a.count || a.word.localeCompare(b.word));
  return new Set(sorted.slice(0, limit).map((r) => r.word));
}
