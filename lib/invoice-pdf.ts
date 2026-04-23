import jsPDF from "jspdf";

export type InvoicePdfLine = {
  name: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
};

export type InvoicePdfPayload = {
  businessName: string;
  clientName: string;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  lines: InvoicePdfLine[];
  subtotal: number;
  taxPercent: number;
  taxAmount: number;
  total: number;
};

function money(n: number): string {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function safeFileSegment(s: string): string {
  return s.replace(/[^\w.-]+/g, "_").slice(0, 80) || "invoice";
}

/** Builds and downloads a one-page (or multi-page) PDF invoice in the browser. */
export function downloadInvoicePdf(payload: InvoicePdfPayload): void {
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

  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("INVOICE", margin, y);
  y += 36;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(80, 80, 80);
  doc.text(`Invoice # ${payload.invoiceNumber}`, margin, y);
  y += 14;
  doc.text(`Date: ${payload.invoiceDate}`, margin, y);
  doc.text(`Due: ${payload.dueDate}`, margin + 200, y);
  y += 28;
  doc.setTextColor(0, 0, 0);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("From", margin, y);
  doc.text("Bill to", margin + contentW / 2, y);
  y += 16;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const fromLines = doc.splitTextToSize(payload.businessName || "—", contentW / 2 - 8);
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
  doc.text("Price", margin + contentW * 0.72, y, { align: "right" });
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
  ensureSpace(80);
  doc.line(margin, y, pageW - margin, y);
  y += 20;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const labelX = margin + contentW - 160;
  const valX = margin + contentW;
  doc.text("Subtotal", labelX, y, { align: "right" });
  doc.text(money(payload.subtotal), valX, y, { align: "right" });
  y += 16;
  if (payload.taxPercent > 0) {
    doc.text(`Tax (${payload.taxPercent}%)`, labelX, y, { align: "right" });
    doc.text(money(payload.taxAmount), valX, y, { align: "right" });
    y += 16;
  }
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Total", labelX, y, { align: "right" });
  doc.text(money(payload.total), valX, y, { align: "right" });
  y += 28;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(120, 120, 120);
  doc.text("Generated with SmartFlexa — for business use only. Not tax or legal advice.", margin, pageH - 36);
  doc.setTextColor(0, 0, 0);

  doc.save(`invoice-${safeFileSegment(payload.invoiceNumber)}.pdf`);
}
