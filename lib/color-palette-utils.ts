/** RGB triplet (0–255). Used by the color palette generator (client-only). */
export type RGB = { r: number; g: number; b: number };

export function clampByte(n: number): number {
  return Math.max(0, Math.min(255, Math.round(n)));
}

export function rgbToHex(rgb: RGB): string {
  const h = (v: number) => clampByte(v).toString(16).padStart(2, "0");
  return `#${h(rgb.r)}${h(rgb.g)}${h(rgb.b)}`.toUpperCase();
}

export function rgbToCssRgb(rgb: RGB): string {
  return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
}

export function colorDistance(a: RGB, b: RGB): number {
  return Math.hypot(a.r - b.r, a.g - b.g, a.b - b.b);
}

/** HSL inputs: h 0–360, s and l 0–1. */
export function hslToRgb(h: number, s: number, l: number): RGB {
  const hh = (((h % 360) + 360) % 360) / 360;
  const ss = Math.max(0, Math.min(1, s));
  const ll = Math.max(0, Math.min(1, l));
  if (ss === 0) {
    const v = clampByte(ll * 255);
    return { r: v, g: v, b: v };
  }
  const hue2rgb = (p: number, q: number, t: number) => {
    let tt = t;
    if (tt < 0) tt += 1;
    if (tt > 1) tt -= 1;
    if (tt < 1 / 6) return p + (q - p) * 6 * tt;
    if (tt < 1 / 2) return q;
    if (tt < 2 / 3) return p + (q - p) * (2 / 3 - tt) * 6;
    return p;
  };
  const q = ll < 0.5 ? ll * (1 + ss) : ll + ss - ll * ss;
  const p = 2 * ll - q;
  return {
    r: clampByte(hue2rgb(p, q, hh + 1 / 3) * 255),
    g: clampByte(hue2rgb(p, q, hh) * 255),
    b: clampByte(hue2rgb(p, q, hh - 1 / 3) * 255),
  };
}

export function rgbToHsl(rgb: RGB): { h: number; s: number; l: number } {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      default:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }
  return { h: h * 360, s, l };
}

function randomInRange(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

/** One random saturated color, optionally avoiding existing swatches. */
export function generateRandomSwatch(avoid: RGB[] = [], minDist = 28): RGB {
  for (let attempt = 0; attempt < 48; attempt++) {
    const h = Math.random() * 360;
    const s = randomInRange(0.42, 0.92);
    const ll = randomInRange(0.32, 0.68);
    const c = hslToRgb(h, s, ll);
    if (avoid.every((a) => colorDistance(a, c) >= minDist)) return c;
  }
  return hslToRgb(Math.random() * 360, 0.65, 0.5);
}

const GOLDEN_ANGLE = 137.508;

/** Five coordinated random colors (harmonic hue spread). */
export function generateRandomPalette5(): RGB[] {
  const baseHue = Math.random() * 360;
  const out: RGB[] = [];
  for (let i = 0; i < 5; i++) {
    const h = (baseHue + i * GOLDEN_ANGLE + randomInRange(-14, 14)) % 360;
    const s = randomInRange(0.48, 0.88);
    const l = randomInRange(0.34, 0.62);
    out.push(hslToRgb(h, s, l));
  }
  return out;
}

function loadImageFromUrl(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Could not load image."));
    img.src = url;
  });
}

export function extractDominantFromImageData(
  imageData: ImageData,
  k: number,
  quantStep: number,
): RGB[] {
  const { width, height, data } = imageData;
  type Bucket = { r: number; g: number; b: number; n: number };
  const map = new Map<string, Bucket>();

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const a = data[i + 3] ?? 255;
      if (a < 12) continue;
      const qr = Math.round((data[i] ?? 0) / quantStep) * quantStep;
      const qg = Math.round((data[i + 1] ?? 0) / quantStep) * quantStep;
      const qb = Math.round((data[i + 2] ?? 0) / quantStep) * quantStep;
      const key = `${qr},${qg},${qb}`;
      const prev = map.get(key);
      if (prev) {
        prev.n += 1;
      } else {
        map.set(key, { r: qr, g: qg, b: qb, n: 1 });
      }
    }
  }

  const buckets = [...map.values()].sort((a, b) => b.n - a.n);
  const picked: RGB[] = [];
  let minSep = 38;

  const tryPick = () => {
    picked.length = 0;
    for (const b of buckets) {
      if (picked.length >= k) break;
      const c: RGB = {
        r: clampByte(b.r),
        g: clampByte(b.g),
        b: clampByte(b.b),
      };
      if (picked.every((p) => colorDistance(p, c) >= minSep)) {
        picked.push(c);
      }
    }
  };

  tryPick();
  while (picked.length < k && minSep > 12) {
    minSep -= 6;
    tryPick();
  }

  while (picked.length < k && buckets.length > picked.length) {
    for (const b of buckets) {
      if (picked.length >= k) break;
      const c: RGB = {
        r: clampByte(b.r),
        g: clampByte(b.g),
        b: clampByte(b.b),
      };
      if (!picked.some((p) => colorDistance(p, c) < 1)) picked.push(c);
    }
    break;
  }

  while (picked.length < k) {
    const seed = picked[0] ?? { r: 128, g: 128, b: 128 };
    const { h, s, l } = rgbToHsl(seed);
    const nl = Math.min(0.92, l + 0.08 * (picked.length + 1));
    picked.push(hslToRgb(h, Math.max(0.15, s * 0.9), nl));
  }

  return picked.slice(0, k);
}

/** Downsample image and extract `count` dominant colors (client-only). */
export async function extractDominantFromFile(
  file: File,
  count: number,
  variant: number,
): Promise<RGB[]> {
  const quantStep = [18, 22, 26, 30][variant % 4];
  const maxSide = 180;
  const url = URL.createObjectURL(file);
  try {
    const img = await loadImageFromUrl(url);
    const scale = Math.min(1, maxSide / Math.max(img.width, img.height));
    const w = Math.max(1, Math.round(img.width * scale));
    const h = Math.max(1, Math.round(img.height * scale));
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return generateRandomPalette5().slice(0, count);
    ctx.drawImage(img, 0, 0, w, h);
    const imageData = ctx.getImageData(0, 0, w, h);
    return extractDominantFromImageData(imageData, count, quantStep);
  } finally {
    URL.revokeObjectURL(url);
  }
}

export function mergeDominantWithLocks(
  prev: RGB[],
  locked: boolean[],
  dominant: RGB[],
): RGB[] {
  const n = prev.length;
  const lockedColors = prev.filter((_, i) => locked[i]);
  const pool = dominant.filter((c) =>
    lockedColors.every((L) => colorDistance(L, c) >= 34),
  );
  const out: RGB[] = [];
  let pi = 0;
  for (let i = 0; i < n; i++) {
    if (locked[i]) {
      out.push({ ...prev[i]! });
      continue;
    }
    while (pi < pool.length) {
      const cand = pool[pi++]!;
      if (
        out.some((o, j) => j < i && colorDistance(o, cand) < 22) ||
        lockedColors.some((L) => colorDistance(L, cand) < 34)
      ) {
        continue;
      }
      out.push(cand);
      break;
    }
    if (out.length === i) {
      const fallback =
        dominant.find((c) => lockedColors.every((L) => colorDistance(L, c) >= 24)) ??
        generateRandomSwatch(lockedColors, 24);
      out.push(fallback);
    }
  }
  return out;
}

export function relativeLuminance(rgb: RGB): number {
  const lin = (c: number) => {
    const x = c / 255;
    return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
  };
  return (
    0.2126 * lin(rgb.r) + 0.7152 * lin(rgb.g) + 0.0722 * lin(rgb.b)
  );
}
