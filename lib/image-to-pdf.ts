import { jsPDF } from "jspdf";

export type ImagePdfPageSize = "a4" | "letter";
export type ImagePdfOrientation = "portrait" | "landscape";

export type BuildImagePdfOptions = {
  pageSize: ImagePdfPageSize;
  orientation: ImagePdfOrientation;
};

const ACCEPT = new Set(["image/jpeg", "image/png", "image/webp"]);

export function isAcceptedImageFile(file: File): boolean {
  if (ACCEPT.has(file.type)) return true;
  const n = file.name.toLowerCase();
  return n.endsWith(".jpg") || n.endsWith(".jpeg") || n.endsWith(".png") || n.endsWith(".webp");
}

function loadImageToCanvas(file: File): Promise<{ canvas: HTMLCanvasElement; usePng: boolean }> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        URL.revokeObjectURL(url);
        reject(new Error("Canvas not available."));
        return;
      }
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);
      const usePng =
        file.type === "image/png" || file.name.toLowerCase().endsWith(".png");
      resolve({ canvas, usePng });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not read image."));
    };
    img.src = url;
  });
}

/**
 * Build a single multi-page PDF from raster images (client-only).
 * Images are centered with margins; PNG pages use PNG embedding, others JPEG at 0.92.
 */
export async function buildPdfFromImages(
  files: File[],
  opts: BuildImagePdfOptions,
): Promise<Blob> {
  if (files.length === 0) {
    throw new Error("Add at least one image.");
  }

  const format = opts.pageSize === "a4" ? "a4" : "letter";
  const orientation = opts.orientation === "landscape" ? "landscape" : "portrait";

  const doc = new jsPDF({
    unit: "mm",
    format,
    orientation,
    compress: false,
  });

  const marginMm = 8;

  for (let i = 0; i < files.length; i++) {
    if (i > 0) {
      doc.addPage(format, orientation);
    }

    const { canvas, usePng } = await loadImageToCanvas(files[i]!);
    const pw = doc.internal.pageSize.getWidth();
    const ph = doc.internal.pageSize.getHeight();
    const iw = canvas.width;
    const ih = canvas.height;
    const aspect = iw / ih;
    const aw = pw - 2 * marginMm;
    const ah = ph - 2 * marginMm;
    let fw = aw;
    let fh = fw / aspect;
    if (fh > ah) {
      fh = ah;
      fw = fh * aspect;
    }
    const x = (pw - fw) / 2;
    const y = (ph - fh) / 2;

    const mime = usePng ? "image/png" : "image/jpeg";
    const quality = usePng ? undefined : 0.92;
    const dataUrl = canvas.toDataURL(mime, quality);
    const fmt = usePng ? "PNG" : "JPEG";
    doc.addImage(dataUrl, fmt, x, y, fw, fh);
  }

  return doc.output("blob");
}
