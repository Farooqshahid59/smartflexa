export type DiffOptions = {
  ignoreCase: boolean;
  ignoreWhitespace: boolean;
};

export type DiffRowType = "equal" | "delete" | "insert" | "change";

export type DiffRow = {
  type: DiffRowType;
  /** Original line (unchanged, removed, or left side of change). */
  left: string;
  /** Modified line (unchanged, added, or right side of change). */
  right: string;
};

const MAX_CELLS = 2_200_000;

function normalizeForCompare(line: string, opts: DiffOptions): string {
  let s = line;
  if (opts.ignoreWhitespace) {
    s = s.replace(/\s+/g, " ").trim();
  }
  if (opts.ignoreCase) {
    s = s.toLowerCase();
  }
  return s;
}

type RawOp =
  | { kind: "eq"; li: number; ri: number }
  | { kind: "del"; li: number }
  | { kind: "ins"; ri: number };

/**
 * Line-based diff with LCS alignment. O(n·m) time and memory; capped for browser safety.
 */
export function diffLines(
  original: string,
  modified: string,
  opts: DiffOptions,
): { rows: DiffRow[]; truncated: boolean; message?: string } {
  const a = original.split(/\r?\n/);
  const b = modified.split(/\r?\n/);
  const n = a.length;
  const m = b.length;
  const cells = (n + 1) * (m + 1);
  if (cells > MAX_CELLS) {
    return {
      rows: [
        {
          type: "equal",
          left: "This comparison is too large for the browser-based diff (line count product exceeds the safe limit).",
          right: "Split your text into smaller sections or compare fewer lines at once.",
        },
      ],
      truncated: true,
      message: "Input too large for a full line diff in this view.",
    };
  }

  const L = new Uint32Array(cells);
  const idx = (i: number, j: number) => i * (m + 1) + j;

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (normalizeForCompare(a[i - 1]!, opts) === normalizeForCompare(b[j - 1]!, opts)) {
        L[idx(i, j)] = L[idx(i - 1, j - 1)] + 1;
      } else {
        L[idx(i, j)] = Math.max(L[idx(i - 1, j)], L[idx(i, j - 1)]);
      }
    }
  }

  const raw: RawOp[] = [];
  let i = n;
  let j = m;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && normalizeForCompare(a[i - 1]!, opts) === normalizeForCompare(b[j - 1]!, opts)) {
      raw.push({ kind: "eq", li: i - 1, ri: j - 1 });
      i--;
      j--;
    } else if (i > 0 && j > 0) {
      if (L[idx(i - 1, j)] >= L[idx(i, j - 1)]) {
        raw.push({ kind: "del", li: i - 1 });
        i--;
      } else {
        raw.push({ kind: "ins", ri: j - 1 });
        j--;
      }
    } else if (i > 0) {
      raw.push({ kind: "del", li: i - 1 });
      i--;
    } else {
      raw.push({ kind: "ins", ri: j - 1 });
      j--;
    }
  }
  raw.reverse();

  const rows: DiffRow[] = [];
  for (let p = 0; p < raw.length; p++) {
    const cur = raw[p]!;
    const next = raw[p + 1];
    if (cur.kind === "del" && next?.kind === "ins") {
      rows.push({
        type: "change",
        left: a[cur.li]!,
        right: b[next.ri]!,
      });
      p++;
    } else if (cur.kind === "eq") {
      rows.push({ type: "equal", left: a[cur.li]!, right: b[cur.ri]! });
    } else if (cur.kind === "del") {
      rows.push({ type: "delete", left: a[cur.li]!, right: "" });
    } else {
      rows.push({ type: "insert", left: "", right: b[cur.ri]! });
    }
  }

  return { rows, truncated: false };
}

export function formatDiffPlain(rows: DiffRow[]): string {
  const lines: string[] = [];
  for (const r of rows) {
    switch (r.type) {
      case "equal":
        lines.push(`  ${r.left}`);
        break;
      case "delete":
        lines.push(`- ${r.left}`);
        break;
      case "insert":
        lines.push(`+ ${r.right}`);
        break;
      case "change":
        lines.push(`- ${r.left}`);
        lines.push(`+ ${r.right}`);
        break;
    }
  }
  return lines.join("\n");
}
