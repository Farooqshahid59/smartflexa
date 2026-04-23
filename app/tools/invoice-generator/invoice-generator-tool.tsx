"use client";

import { Plus, Printer, Trash2, FileDown } from "lucide-react";
import { useCallback, useId, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { downloadInvoicePdf } from "@/lib/invoice-pdf";

type LineItem = {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
};

function newId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `row-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function generateInvoiceNumber(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const rand = String(Math.floor(Math.random() * 9000) + 1000);
  return `INV-${y}${m}${day}-${rand}`;
}

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

function defaultDueIso(): string {
  const d = new Date();
  d.setDate(d.getDate() + 30);
  return d.toISOString().slice(0, 10);
}

function emptyLine(): LineItem {
  return { id: newId(), name: "", quantity: 1, unitPrice: 0 };
}

function formatMoney(n: number): string {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function InvoiceGeneratorTool() {
  const baseId = useId();
  const [businessName, setBusinessName] = useState("");
  const [clientName, setClientName] = useState("");
  const [autoInvoiceNo, setAutoInvoiceNo] = useState(true);
  const [invoiceNumber, setInvoiceNumber] = useState(() => generateInvoiceNumber());
  const [invoiceDate, setInvoiceDate] = useState(todayIso);
  const [dueDate, setDueDate] = useState(defaultDueIso);
  const [taxPercentStr, setTaxPercentStr] = useState("");
  const [items, setItems] = useState<LineItem[]>([emptyLine(), emptyLine()]);

  const setAutoNumber = useCallback((on: boolean) => {
    setAutoInvoiceNo(on);
    if (on) setInvoiceNumber(generateInvoiceNumber());
  }, []);

  const refreshInvoiceNumber = useCallback(() => {
    if (autoInvoiceNo) setInvoiceNumber(generateInvoiceNumber());
  }, [autoInvoiceNo]);

  const { linesComputed, subtotal, taxPercent, taxAmount, total } = useMemo(() => {
    const linesComputed = items.map((row) => {
      const qty = Number.isFinite(row.quantity) && row.quantity >= 0 ? row.quantity : 0;
      const price = Number.isFinite(row.unitPrice) && row.unitPrice >= 0 ? row.unitPrice : 0;
      const lineTotal = Math.round(qty * price * 100) / 100;
      return { ...row, qty, price, lineTotal };
    });
    const subtotal =
      Math.round(linesComputed.reduce((s, r) => s + r.lineTotal, 0) * 100) / 100;
    const rawTax = parseFloat(taxPercentStr.replace(/,/g, "."));
    const taxPercent =
      Number.isFinite(rawTax) && rawTax >= 0 ? Math.min(rawTax, 100) : 0;
    const taxAmount = Math.round((subtotal * (taxPercent / 100)) * 100) / 100;
    const total = Math.round((subtotal + taxAmount) * 100) / 100;
    return { linesComputed, subtotal, taxPercent, taxAmount, total };
  }, [items, taxPercentStr]);

  const updateItem = (id: string, patch: Partial<LineItem>) => {
    setItems((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  };

  const addRow = () => {
    setItems((prev) => (prev.length >= 25 ? prev : [...prev, emptyLine()]));
  };

  const removeRow = (id: string) => {
    setItems((prev) => (prev.length <= 1 ? prev : prev.filter((r) => r.id !== id)));
  };

  const handlePrint = () => {
    window.print();
  };

  const handlePdf = () => {
    downloadInvoicePdf({
      businessName,
      clientName,
      invoiceNumber,
      invoiceDate,
      dueDate,
      lines: linesComputed.map((r) => ({
        name: r.name,
        quantity: r.qty,
        unitPrice: r.price,
        lineTotal: r.lineTotal,
      })),
      subtotal,
      taxPercent,
      taxAmount,
      total,
    });
  };

  return (
    <div className="space-y-8">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="print:hidden space-y-6">
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6">
            <h2 className="text-lg font-semibold tracking-tight text-foreground">
              Invoice details
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label
                  htmlFor={`${baseId}-business`}
                  className="text-xs font-medium text-foreground"
                >
                  Your name / business name
                </label>
                <input
                  id={`${baseId}-business`}
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                  placeholder="Acme Studio LLC"
                  autoComplete="organization"
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor={`${baseId}-client`}
                  className="text-xs font-medium text-foreground"
                >
                  Client name
                </label>
                <input
                  id={`${baseId}-client`}
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                  placeholder="Client or company"
                  autoComplete="off"
                />
              </div>
              <div className="sm:col-span-2 flex flex-col gap-3 sm:flex-row sm:items-end">
                <div className="min-w-0 flex-1">
                  <label
                    htmlFor={`${baseId}-invno`}
                    className="text-xs font-medium text-foreground"
                  >
                    Invoice number
                  </label>
                  <input
                    id={`${baseId}-invno`}
                    type="text"
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                    disabled={autoInvoiceNo}
                    className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-60"
                    placeholder="INV-2026..."
                  />
                </div>
                <label className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground sm:pb-2">
                  <input
                    type="checkbox"
                    checked={autoInvoiceNo}
                    onChange={(e) => setAutoNumber(e.target.checked)}
                    className="size-4 rounded border-input"
                  />
                  Auto-generate
                </label>
                {autoInvoiceNo ? (
                  <Button type="button" variant="outline" size="sm" onClick={refreshInvoiceNumber}>
                    New number
                  </Button>
                ) : null}
              </div>
              <div>
                <label
                  htmlFor={`${baseId}-date`}
                  className="text-xs font-medium text-foreground"
                >
                  Invoice date
                </label>
                <input
                  id={`${baseId}-date`}
                  type="date"
                  value={invoiceDate}
                  onChange={(e) => setInvoiceDate(e.target.value)}
                  className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                />
              </div>
              <div>
                <label
                  htmlFor={`${baseId}-due`}
                  className="text-xs font-medium text-foreground"
                >
                  Due date
                </label>
                <input
                  id={`${baseId}-due`}
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-lg font-semibold tracking-tight text-foreground">Line items</h2>
              <Button type="button" variant="outline" size="sm" onClick={addRow}>
                <Plus className="size-4" aria-hidden />
                Add item
              </Button>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Enter item name, quantity, and unit price. Totals update as you type.
            </p>
            <div className="mt-4 space-y-3">
              {items.map((row, index) => (
                <div
                  key={row.id}
                  className="grid gap-3 rounded-lg border border-border bg-muted/10 p-3 sm:grid-cols-[1fr_5rem_6.5rem_auto] sm:items-end"
                >
                  <div className="min-w-0 sm:col-span-1">
                    <label className="sr-only" htmlFor={`${baseId}-name-${row.id}`}>
                      Item {index + 1} name
                    </label>
                    <input
                      id={`${baseId}-name-${row.id}`}
                      type="text"
                      value={row.name}
                      onChange={(e) => updateItem(row.id, { name: e.target.value })}
                      className="w-full rounded-md border border-input bg-background px-2.5 py-2 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                      placeholder="Description"
                    />
                  </div>
                  <div>
                    <label className="sr-only" htmlFor={`${baseId}-qty-${row.id}`}>
                      Quantity
                    </label>
                    <input
                      id={`${baseId}-qty-${row.id}`}
                      type="number"
                      inputMode="decimal"
                      min={0}
                      step="any"
                      value={row.quantity}
                      onChange={(e) =>
                        updateItem(row.id, {
                          quantity: Math.max(0, parseFloat(e.target.value) || 0),
                        })
                      }
                      className="w-full rounded-md border border-input bg-background px-2 py-2 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                    />
                  </div>
                  <div>
                    <label className="sr-only" htmlFor={`${baseId}-price-${row.id}`}>
                      Unit price
                    </label>
                    <input
                      id={`${baseId}-price-${row.id}`}
                      type="number"
                      inputMode="decimal"
                      min={0}
                      step="0.01"
                      value={row.unitPrice}
                      onChange={(e) =>
                        updateItem(row.id, {
                          unitPrice: Math.max(0, parseFloat(e.target.value) || 0),
                        })
                      }
                      className="w-full rounded-md border border-input bg-background px-2 py-2 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                    />
                  </div>
                  <div className="flex justify-end sm:justify-center">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => removeRow(row.id)}
                      disabled={items.length <= 1}
                      aria-label={`Remove item ${index + 1}`}
                    >
                      <Trash2 className="size-4 text-destructive" aria-hidden />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 max-w-xs">
              <label
                htmlFor={`${baseId}-tax`}
                className="text-xs font-medium text-foreground"
              >
                Tax (optional %)
              </label>
              <input
                id={`${baseId}-tax`}
                type="number"
                inputMode="decimal"
                min={0}
                max={100}
                step="0.01"
                value={taxPercentStr}
                onChange={(e) => setTaxPercentStr(e.target.value)}
                placeholder="0"
                className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
              />
            </div>
            <dl className="mt-6 space-y-2 border-t border-border pt-4 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd className="font-medium tabular-nums text-foreground">{formatMoney(subtotal)}</dd>
              </div>
              {taxPercent > 0 ? (
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Tax ({taxPercent}%)</dt>
                  <dd className="font-medium tabular-nums text-foreground">{formatMoney(taxAmount)}</dd>
                </div>
              ) : null}
              <div className="flex justify-between gap-4 text-base">
                <dt className="font-semibold text-foreground">Total</dt>
                <dd className="font-bold tabular-nums text-foreground">{formatMoney(total)}</dd>
              </div>
            </dl>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={handlePdf}>
              <FileDown className="size-4" aria-hidden />
              Download PDF
            </Button>
            <Button type="button" variant="outline" onClick={handlePrint}>
              <Printer className="size-4" aria-hidden />
              Print
            </Button>
          </div>
        </div>

        <div className="min-w-0">
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground print:hidden">
            Preview
          </p>
          <div
            id="invoice-print-area"
            className="rounded-xl border border-border bg-[oklch(0.99_0_0)] p-6 text-[oklch(0.2_0_0)] shadow-sm ring-1 ring-black/5 dark:bg-card dark:text-card-foreground dark:ring-white/10 sm:p-8"
          >
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border pb-6">
              <div>
                <p className="text-2xl font-bold tracking-tight">INVOICE</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  #{invoiceNumber || "—"}
                </p>
              </div>
              <div className="text-right text-sm">
                <p>
                  <span className="text-muted-foreground">Date </span>
                  <span className="font-medium">{invoiceDate || "—"}</span>
                </p>
                <p className="mt-1">
                  <span className="text-muted-foreground">Due </span>
                  <span className="font-medium">{dueDate || "—"}</span>
                </p>
              </div>
            </div>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  From
                </p>
                <p className="mt-1 whitespace-pre-wrap text-sm font-medium leading-relaxed">
                  {businessName || "Your business name"}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Bill to
                </p>
                <p className="mt-1 whitespace-pre-wrap text-sm font-medium leading-relaxed">
                  {clientName || "Client name"}
                </p>
              </div>
            </div>
            <div className="mt-8 overflow-x-auto">
              <table className="w-full min-w-[280px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    <th className="py-2 pr-2">Item</th>
                    <th className="py-2 px-2 text-right">Qty</th>
                    <th className="py-2 px-2 text-right">Price</th>
                    <th className="py-2 pl-2 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {linesComputed.map((row) => (
                    <tr key={row.id} className="border-b border-border/80">
                      <td className="py-2.5 pr-2 font-medium">{row.name || "—"}</td>
                      <td className="py-2.5 px-2 text-right tabular-nums">{row.qty}</td>
                      <td className="py-2.5 px-2 text-right tabular-nums">
                        {formatMoney(row.price)}
                      </td>
                      <td className="py-2.5 pl-2 text-right tabular-nums font-medium">
                        {formatMoney(row.lineTotal)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 ml-auto max-w-[220px] space-y-2 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="tabular-nums font-medium">{formatMoney(subtotal)}</span>
              </div>
              {taxPercent > 0 ? (
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">Tax ({taxPercent}%)</span>
                  <span className="tabular-nums font-medium">{formatMoney(taxAmount)}</span>
                </div>
              ) : null}
              <div className="flex justify-between gap-4 border-t border-border pt-2 text-base font-bold">
                <span>Total</span>
                <span className="tabular-nums">{formatMoney(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
