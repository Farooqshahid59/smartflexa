import jsPDF from "jspdf";

export type UkInvoicePdfLine = {
  name: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
};

export type UkInvoicePdfPayload = {
  businessName: string;
  vatRegistrationNumber: string;
  companyRegistrationNumber: string;
  businessWebsite: string;
  clientName: string;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  lines: UkInvoicePdfLine[];
  subtotal: number;
  vatEnabled: boolean;
  vatPercent: number;
  vatAmount: number;
  grandTotal: number;
  amountDue: number;
  logoDataUrl: string | null;
  bankName: string;
  accountName: string;
  sortCode: string;
  accountNumber: string;
  iban: string;
  paymentReference: string;
};

function money(n: number): string {
  return n.toLocaleString("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function safeFileSegment(s: string): string {
  return s.replace(/[^\w.-]+/g, "_").slice(0, 80) || "invoice";
}

function formatSortCode(code: string): string {
  const digits = code.replace(/\D/g, "");
  if (digits.length !== 6) return code;
  return `${digits.slice(0, 2)}-${digits.slice(2, 4)}-${digits.slice(4, 6)}`;
}

/** Converts SVG or other image data URLs to PNG for jsPDF compatibility. */
async function logoForPdf(dataUrl: string | null): Promise<string | null> {
  if (!dataUrl) return null;
  if (dataUrl.startsWith("data:image/png") || dataUrl.startsWith("data:image/jpeg")) {
    return dataUrl;
  }
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth || img.width;
        canvas.height = img.naturalHeight || img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(null);
          return;
        }
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL("image/png"));
      } catch {
        resolve(null);
      }
    };
    img.onerror = () => resolve(null);
    img.src = dataUrl;
  });
}

function getImageFormat(dataUrl: string): "PNG" | "JPEG" {
  return dataUrl.startsWith("data:image/jpeg") ? "JPEG" : "PNG";
}

/** Builds and downloads a UK-format PDF invoice in the browser. */
export async function downloadUkInvoicePdf(payload: UkInvoicePdfPayload): Promise<void> {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 48;
  const contentW = pageW - margin * 2;
  let y = margin;

  const ensureSpace = (needed: number) => {
    if (y + needed > pageH - margin) {
      doc.addPage();
      y = margin;
    }
  };

  const logoUrl = await logoForPdf(payload.logoDataUrl);
  if (logoUrl) {
    try {
      const format = getImageFormat(logoUrl);
      const maxW = 120;
      const maxH = 48;
      doc.addImage(logoUrl, format, margin, y, maxW, maxH, undefined, "FAST");
      y += maxH + 12;
    } catch {
      // Skip logo if rendering fails
    }
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("INVOICE", margin, y);
  y += 36;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(80, 80, 80);
  doc.text(`Invoice # ${payload.invoiceNumber}`, margin, y);
  y += 14;
  doc.text(`Invoice date: ${payload.invoiceDate}`, margin, y);
  doc.text(`Due date: ${payload.dueDate}`, margin + 200, y);
  y += 28;
  doc.setTextColor(0, 0, 0);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("From", margin, y);
  doc.text("Bill to", margin + contentW / 2, y);
  y += 16;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

  const fromParts: string[] = [payload.businessName || "—"];
  if (payload.vatRegistrationNumber.trim()) {
    fromParts.push(`VAT Reg: ${payload.vatRegistrationNumber.trim()}`);
  }
  if (payload.companyRegistrationNumber.trim()) {
    fromParts.push(`Company No: ${payload.companyRegistrationNumber.trim()}`);
  }
  if (payload.businessWebsite.trim()) {
    fromParts.push(payload.businessWebsite.trim());
  }

  const fromLines = doc.splitTextToSize(fromParts.join("\n"), contentW / 2 - 8);
  const toLines = doc.splitTextToSize(payload.clientName || "—", contentW / 2 - 8);
  let yFrom = y;
  let yTo = y;
  for (const line of fromLines) {
    doc.text(line, margin, yFrom);
    yFrom += 12;
  }
  for (const line of toLines) {
    doc.text(line, margin + contentW / 2, yTo);
    yTo += 12;
  }
  y = Math.max(yFrom, yTo) + 24;

  ensureSpace(60);
  doc.setDrawColor(220);
  doc.line(margin, y, pageW - margin, y);
  y += 18;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("Item", margin, y);
  doc.text("Qty", margin + contentW * 0.52, y, { align: "right" });
  doc.text("Unit price", margin + contentW * 0.72, y, { align: "right" });
  doc.text("Amount", margin + contentW, y, { align: "right" });
  y += 10;
  doc.setLineWidth(0.5);
  doc.line(margin, y, pageW - margin, y);
  y += 16;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  for (const row of payload.lines) {
    const nameLines = doc.splitTextToSize(row.name || "—", contentW * 0.48);
    const rowH = Math.max(nameLines.length * 12, 14) + 8;
    ensureSpace(rowH);
    doc.text(nameLines, margin, y);
    const qtyY = y;
    doc.text(String(row.quantity), margin + contentW * 0.52, qtyY, { align: "right" });
    doc.text(money(row.unitPrice), margin + contentW * 0.72, qtyY, { align: "right" });
    doc.text(money(row.lineTotal), margin + contentW, qtyY, { align: "right" });
    y += nameLines.length * 12 + 6;
  }

  y += 8;
  ensureSpace(120);
  doc.line(margin, y, pageW - margin, y);
  y += 20;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const labelX = margin + contentW - 180;
  const valX = margin + contentW;

  doc.text("Subtotal", labelX, y, { align: "right" });
  doc.text(money(payload.subtotal), valX, y, { align: "right" });
  y += 16;

  if (payload.vatEnabled && payload.vatPercent > 0) {
    doc.text(`VAT (${payload.vatPercent}%)`, labelX, y, { align: "right" });
    doc.text(money(payload.vatAmount), valX, y, { align: "right" });
    y += 16;
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("Grand total", labelX, y, { align: "right" });
  doc.text(money(payload.grandTotal), valX, y, { align: "right" });
  y += 18;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Amount due", labelX, y, { align: "right" });
  doc.text(money(payload.amountDue), valX, y, { align: "right" });
  y += 28;

  const paymentLines: string[] = [];
  if (payload.bankName.trim()) paymentLines.push(`Bank: ${payload.bankName.trim()}`);
  if (payload.accountName.trim()) paymentLines.push(`Account name: ${payload.accountName.trim()}`);
  if (payload.sortCode.trim()) paymentLines.push(`Sort code: ${formatSortCode(payload.sortCode)}`);
  if (payload.accountNumber.trim()) paymentLines.push(`Account no: ${payload.accountNumber.trim()}`);
  if (payload.iban.trim()) paymentLines.push(`IBAN: ${payload.iban.trim()}`);
  if (payload.paymentReference.trim()) {
    paymentLines.push(`Payment reference: ${payload.paymentReference.trim()}`);
  }

  if (paymentLines.length > 0) {
    ensureSpace(paymentLines.length * 14 + 30);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("Payment details", margin, y);
    y += 16;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    for (const line of paymentLines) {
      doc.text(line, margin, y);
      y += 12;
    }
    y += 12;
  }

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(120, 120, 120);
  doc.text(
    "Generated with SmartFlexa — for business use only. Not tax or legal advice.",
    margin,
    pageH - 36,
  );
  doc.setTextColor(0, 0, 0);

  doc.save(`invoice-${safeFileSegment(payload.invoiceNumber)}.pdf`);
}

export function formatUkMoney(n: number): string {
  return money(n);
}

export function formatUkSortCode(code: string): string {
  return formatSortCode(code);
}
