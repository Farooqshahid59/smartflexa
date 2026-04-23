/** RGB 0–255 */
export type RGB = { r: number; g: number; b: number };

export type RemoveBgAlgorithm = "border" | "bright" | "pick";

export type RemoveBgParams = {
  algorithm: RemoveBgAlgorithm;
  /** Max Euclidean distance in RGB for border/pick similarity (roughly 0–120 typical). */
  tolerance: number;
  /** For `bright`: luminance 0–255 above which pixels become background. */
  brightCutoff: number;
  pickColor?: RGB | null;
  /** If set, pixels that would be transparent are filled with this color instead. */
  replaceBackground?: RGB | null;
};

function clampByte(n: number): number {
  return Math.max(0, Math.min(255, Math.round(n)));
}

export function colorDistance(a: RGB, b: RGB): number {
  return Math.hypot(a.r - b.r, a.g - b.g, a.b - b.b);
}

export function luminance(r: number, g: number, b: number): number {
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

/** Average RGB of the 1px image border. */
export function averageBorderColor(data: Uint8ClampedArray, w: number, h: number): RGB {
  let sr = 0,
    sg = 0,
    sb = 0;
  let n = 0;
  const add = (x: number, y: number) => {
    const i = (y * w + x) * 4;
    sr += data[i]!;
    sg += data[i + 1]!;
    sb += data[i + 2]!;
    n++;
  };
  for (let x = 0; x < w; x++) {
    add(x, 0);
    if (h > 1) add(x, h - 1);
  }
  for (let y = 0; y < h; y++) {
    add(0, y);
    if (w > 1) add(w - 1, y);
  }
  if (n === 0) return { r: 255, g: 255, b: 255 };
  return { r: Math.round(sr / n), g: Math.round(sg / n), b: Math.round(sb / n) };
}

/**
 * Flood-fill background from edges: pixels connected to border and similar to `ref`
 * within `tolerance` (RGB distance) become background (mask true).
 */
export function floodEdgeBackgroundMask(
  data: Uint8ClampedArray,
  w: number,
  h: number,
  ref: RGB,
  tolerance: number,
): Uint8Array {
  const mask = new Uint8Array(w * h);
  const similar = (x: number, y: number) => {
    const i = (y * w + x) * 4;
    return colorDistance(
      { r: data[i]!, g: data[i + 1]!, b: data[i + 2]! },
      ref,
    ) <= tolerance;
  };

  const q = new Int32Array(w * h);
  let qt = 0;
  let qh = 0;

  const push = (x: number, y: number) => {
    if (x < 0 || x >= w || y < 0 || y >= h) return;
    const id = y * w + x;
    if (mask[id]) return;
    if (!similar(x, y)) return;
    mask[id] = 1;
    q[qh++] = id;
  };

  for (let x = 0; x < w; x++) {
    push(x, 0);
    if (h > 1) push(x, h - 1);
  }
  for (let y = 0; y < h; y++) {
    push(0, y);
    if (w > 1) push(w - 1, y);
  }

  while (qt < qh) {
    const id = q[qt++]!;
    const x = id % w;
    const y = (id / w) | 0;
    push(x + 1, y);
    push(x - 1, y);
    push(x, y + 1);
    push(x, y - 1);
  }

  return mask;
}

/** Per-pixel bright background: high luminance → background. */
export function brightBackgroundMask(
  data: Uint8ClampedArray,
  w: number,
  h: number,
  cutoff: number,
): Uint8Array {
  const mask = new Uint8Array(w * h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      const lum = luminance(data[i]!, data[i + 1]!, data[i + 2]!);
      if (lum >= cutoff) mask[y * w + x] = 1;
    }
  }
  return mask;
}

/** Pick-color similarity (no flood): good for flat studio backdrops not touching edges. */
export function pickColorMask(
  data: Uint8ClampedArray,
  w: number,
  h: number,
  ref: RGB,
  tolerance: number,
): Uint8Array {
  const mask = new Uint8Array(w * h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      const d = colorDistance(
        { r: data[i]!, g: data[i + 1]!, b: data[i + 2]! },
        ref,
      );
      if (d <= tolerance) mask[y * w + x] = 1;
    }
  }
  return mask;
}

function buildMaskForAlgorithm(
  data: Uint8ClampedArray,
  w: number,
  h: number,
  params: RemoveBgParams,
  borderRef: RGB,
): Uint8Array {
  switch (params.algorithm) {
    case "bright":
      return brightBackgroundMask(data, w, h, params.brightCutoff);
    case "pick": {
      const ref = params.pickColor ?? borderRef;
      return pickColorMask(data, w, h, ref, params.tolerance);
    }
    default:
      return floodEdgeBackgroundMask(data, w, h, borderRef, params.tolerance);
  }
}

/**
 * Apply mask to RGBA output. `mask[id] === 1` → transparent or replaced color.
 */
export function applyMaskToRgba(
  source: Uint8ClampedArray,
  w: number,
  h: number,
  mask: Uint8Array,
  replace: RGB | null,
): ImageData {
  const out = new Uint8ClampedArray(w * h * 4);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const id = y * w + x;
      const si = id * 4;
      const oi = si;
      if (mask[id]) {
        if (replace) {
          out[oi] = replace.r;
          out[oi + 1] = replace.g;
          out[oi + 2] = replace.b;
          out[oi + 3] = 255;
        } else {
          out[oi] = 0;
          out[oi + 1] = 0;
          out[oi + 2] = 0;
          out[oi + 3] = 0;
        }
      } else {
        out[oi] = source[si]!;
        out[oi + 1] = source[si + 1]!;
        out[oi + 2] = source[si + 2]!;
        out[oi + 3] = source[si + 3]!;
      }
    }
  }
  return new ImageData(out, w, h);
}

const MAX_PROCESS_SIDE = 900;

/** Downscale dimensions keeping aspect; returns scale factor applied (1 if no scale). */
export function downscaleDimensions(
  w: number,
  h: number,
): { w: number; h: number; scale: number } {
  const m = Math.max(w, h);
  if (m <= MAX_PROCESS_SIDE) return { w, h, scale: 1 };
  const scale = MAX_PROCESS_SIDE / m;
  return {
    w: Math.max(1, Math.round(w * scale)),
    h: Math.max(1, Math.round(h * scale)),
    scale,
  };
}

export function drawImageToCanvas(
  img: CanvasImageSource,
  cw: number,
  ch: number,
): ImageData {
  const canvas = document.createElement("canvas");
  canvas.width = cw;
  canvas.height = ch;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("Canvas not supported.");
  ctx.drawImage(img, 0, 0, cw, ch);
  return ctx.getImageData(0, 0, cw, ch);
}

/**
 * Map mask from small canvas to full size using nearest neighbor.
 */
export function upscaleMaskNearest(
  maskSmall: Uint8Array,
  sw: number,
  sh: number,
  dw: number,
  dh: number,
): Uint8Array {
  const out = new Uint8Array(dw * dh);
  for (let y = 0; y < dh; y++) {
    for (let x = 0; x < dw; x++) {
      const sx = Math.min(sw - 1, Math.floor((x * sw) / dw));
      const sy = Math.min(sh - 1, Math.floor((y * sh) / dh));
      out[y * dw + x] = maskSmall[sy * sw + sx]!;
    }
  }
  return out;
}

/**
 * Full pipeline: downscale for mask → build mask → upscale mask → apply on full-res ImageData.
 */
export function removeBackgroundFromImageData(
  fullData: ImageData,
  params: RemoveBgParams,
): ImageData {
  const W = fullData.width;
  const H = fullData.height;
  const { w: sw, h: sh, scale } = downscaleDimensions(W, H);

  if (scale >= 1) {
    const borderRef = averageBorderColor(fullData.data, W, H);
    const maskFull = buildMaskForAlgorithm(fullData.data, W, H, params, borderRef);
    return applyMaskToRgba(fullData.data, W, H, maskFull, params.replaceBackground ?? null);
  }

  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("Canvas not supported.");
  ctx.putImageData(fullData, 0, 0);
  const tmp = document.createElement("canvas");
  tmp.width = sw;
  tmp.height = sh;
  const tctx = tmp.getContext("2d", { willReadFrequently: true });
  if (!tctx) throw new Error("Canvas not supported.");
  tctx.drawImage(canvas, 0, 0, sw, sh);
  const small = tctx.getImageData(0, 0, sw, sh);
  const borderRef = averageBorderColor(small.data, sw, sh);
  const maskSmall = buildMaskForAlgorithm(small.data, sw, sh, params, borderRef);
  const maskFull = upscaleMaskNearest(maskSmall, sw, sh, W, H);

  return applyMaskToRgba(fullData.data, W, H, maskFull, params.replaceBackground ?? null);
}

export function parseHexColor(hex: string): RGB | null {
  let s = hex.trim();
  if (s.startsWith("#")) s = s.slice(1);
  if (s.length === 3) {
    s = s
      .split("")
      .map((c) => c + c)
      .join("");
  }
  if (!/^[0-9a-fA-F]{6}$/.test(s)) return null;
  return {
    r: parseInt(s.slice(0, 2), 16),
    g: parseInt(s.slice(2, 4), 16),
    b: parseInt(s.slice(4, 6), 16),
  };
}

export function rgbToHex(rgb: RGB): string {
  const h = (n: number) => clampByte(n).toString(16).padStart(2, "0");
  return `#${h(rgb.r)}${h(rgb.g)}${h(rgb.b)}`.toUpperCase();
}
