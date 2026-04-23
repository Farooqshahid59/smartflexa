/** Wrap plain text to fit max width using canvas measureText (word wrap). */
export function wrapTextToLines(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
): string[] {
  const trimmed = text.replace(/\r\n/g, "\n");
  const paragraphs = trimmed.split("\n");
  const lines: string[] = [];

  function pushBrokenWord(word: string): string[] {
    const out: string[] = [];
    let chunk = "";
    for (const ch of word) {
      const t = chunk + ch;
      if (ctx.measureText(t).width > maxWidth && chunk) {
        out.push(chunk);
        chunk = ch;
      } else {
        chunk = t;
      }
    }
    if (chunk) out.push(chunk);
    return out;
  }

  for (const para of paragraphs) {
    if (para.length === 0) {
      lines.push("");
      continue;
    }
    const words = para.split(/\s+/);
    let line = "";
    for (const word of words) {
      const test = line ? `${line} ${word}` : word;
      if (ctx.measureText(test).width <= maxWidth) {
        line = test;
        continue;
      }
      if (line) {
        lines.push(line);
        line = "";
      }
      if (ctx.measureText(word).width <= maxWidth) {
        line = word;
      } else {
        const parts = pushBrokenWord(word);
        for (let i = 0; i < parts.length; i++) {
          const p = parts[i]!;
          if (i === parts.length - 1) {
            line = p;
          } else {
            lines.push(p);
          }
        }
      }
    }
    if (line) lines.push(line);
  }
  return lines;
}

export function drawImageCover(
  ctx: CanvasRenderingContext2D,
  img: CanvasImageSource,
  dx: number,
  dy: number,
  dWidth: number,
  dHeight: number,
) {
  const iw =
    "naturalWidth" in img && img instanceof HTMLImageElement
      ? img.naturalWidth
      : (img as HTMLCanvasElement).width;
  const ih =
    "naturalHeight" in img && img instanceof HTMLImageElement
      ? img.naturalHeight
      : (img as HTMLCanvasElement).height;
  if (!iw || !ih) return;
  const scale = Math.max(dWidth / iw, dHeight / ih);
  const sw = dWidth / scale;
  const sh = dHeight / scale;
  const sx = (iw - sw) / 2;
  const sy = (ih - sh) / 2;
  ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dWidth, dHeight);
}
