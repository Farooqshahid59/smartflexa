"use client";

import { ImagePlus, Plus, Printer, Trash2, FileDown, X } from "lucide-react";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { downloadUkInvoicePdf, formatUkMoney, formatUkSortCode } from "@/lib/uk-invoice-pdf";
import {
  loadUkInvoiceSettings,
  saveUkInvoiceSettings,
  type VatRatePreset,
} from "@/lib/uk-invoice-storage";

type LineItem = {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
};

const LOGO_ACCEPT = ".png,.jpg,.jpeg,.svg,image/png,image/jpeg,image/svg+xml";
const MAX_LOGO_BYTES = 2 * 1024 * 1024;

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

function resolveVatPercent(preset: VatRatePreset, customStr: string): number {
  if (preset === "0") return 0;
  if (preset === "5") return 5;
  if (preset === "20") return 20;
  const raw = parseFloat(customStr.replace(/,/g, "."));
  return Number.isFinite(raw) && raw >= 0 ? Math.min(raw, 100) : 0;
}

const inputClass =
  "mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50";

const labelClass = "text-xs font-medium text-foreground";

export function UkInvoiceGeneratorTool() {
  const baseId = useId();
  const logoInputRef = useRef<HTMLInputElement>(null);
  const [hydrated, setHydrated] = useState(false);

  const [businessName, setBusinessName] = useState("");
  const [vatRegistrationNumber, setVatRegistrationNumber] = useState("");
  const [companyRegistrationNumber, setCompanyRegistrationNumber] = useState("");
  const [businessWebsite, setBusinessWebsite] = useState("");
  const [logoDataUrl, setLogoDataUrl] = useState<string | null>(null);
  const [logoError, setLogoError] = useState("");

  const [clientName, setClientName] = useState("");
  const [autoInvoiceNo, setAutoInvoiceNo] = useState(true);
  const [invoiceNumber, setInvoiceNumber] = useState(() => generateInvoiceNumber());
  const [invoiceDate, setInvoiceDate] = useState(todayIso);
  const [dueDate, setDueDate] = useState(defaultDueIso);

  const [vatEnabled, setVatEnabled] = useState(true);
  const [vatRatePreset, setVatRatePreset] = useState<VatRatePreset>("20");
  const [vatCustomRateStr, setVatCustomRateStr] = useState("");

  const [bankName, setBankName] = useState("");
  const [accountName, setAccountName] = useState("");
  const [sortCode, setSortCode] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [iban, setIban] = useState("");
  const [paymentReference, setPaymentReference] = useState("");

  const [items, setItems] = useState<LineItem[]>([emptyLine(), emptyLine()]);

  useEffect(() => {
    const saved = loadUkInvoiceSettings();
    setBusinessName(saved.businessName);
    setVatRegistrationNumber(saved.vatRegistrationNumber);
    setCompanyRegistrationNumber(saved.companyRegistrationNumber);
    setBusinessWebsite(saved.businessWebsite);
    setLogoDataUrl(saved.logoDataUrl);
    setVatEnabled(saved.vatEnabled);
    setVatRatePreset(saved.vatRatePreset);
    setVatCustomRateStr(saved.vatCustomRateStr);
    setBankName(saved.bankName);
    setAccountName(saved.accountName);
    setSortCode(saved.sortCode);
    setAccountNumber(saved.accountNumber);
    setIban(saved.iban);
    setPaymentReference(saved.paymentReference);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveUkInvoiceSettings({
      businessName,
      vatRegistrationNumber,
      companyRegistrationNumber,
      businessWebsite,
      vatEnabled,
      vatRatePreset,
      vatCustomRateStr,
      logoDataUrl,
      bankName,
      accountName,
      sortCode,
      accountNumber,
      iban,
      paymentReference,
    });
  }, [
    hydrated,
    businessName,
    vatRegistrationNumber,
    companyRegistrationNumber,
    businessWebsite,
    vatEnabled,
    vatRatePreset,
    vatCustomRateStr,
    logoDataUrl,
    bankName,
    accountName,
    sortCode,
    accountNumber,
    iban,
    paymentReference,
  ]);

  const setAutoNumber = useCallback((on: boolean) => {
    setAutoInvoiceNo(on);
    if (on) setInvoiceNumber(generateInvoiceNumber());
  }, []);

  const refreshInvoiceNumber = useCallback(() => {
    if (autoInvoiceNo) setInvoiceNumber(generateInvoiceNumber());
  }, [autoInvoiceNo]);

  const { linesComputed, subtotal, vatPercent, vatAmount, grandTotal, amountDue } = useMemo(() => {
    const linesComputed = items.map((row) => {
      const qty = Number.isFinite(row.quantity) && row.quantity >= 0 ? row.quantity : 0;
      const price = Number.isFinite(row.unitPrice) && row.unitPrice >= 0 ? row.unitPrice : 0;
      const lineTotal = Math.round(qty * price * 100) / 100;
      return { ...row, qty, price, lineTotal };
    });
    const subtotal =
      Math.round(linesComputed.reduce((s, r) => s + r.lineTotal, 0) * 100) / 100;
    const vatPercent = vatEnabled ? resolveVatPercent(vatRatePreset, vatCustomRateStr) : 0;
    const vatAmount = Math.round(subtotal * (vatPercent / 100) * 100) / 100;
    const grandTotal = Math.round((subtotal + vatAmount) * 100) / 100;
    const amountDue = grandTotal;
    return { linesComputed, subtotal, vatPercent, vatAmount, grandTotal, amountDue };
  }, [items, vatEnabled, vatRatePreset, vatCustomRateStr]);

  const updateItem = (id: string, patch: Partial<LineItem>) => {
    setItems((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  };

  const addRow = () => {
    setItems((prev) => (prev.length >= 25 ? prev : [...prev, emptyLine()]));
  };

  const removeRow = (id: string) => {
    setItems((prev) => (prev.length <= 1 ? prev : prev.filter((r) => r.id !== id)));
  };

  const handleLogoUpload = (file: File | undefined) => {
    setLogoError("");
    if (!file) return;
    const validTypes = ["image/png", "image/jpeg", "image/jpg", "image/svg+xml"];
    if (!validTypes.includes(file.type) && !file.name.match(/\.(png|jpe?g|svg)$/i)) {
      setLogoError("Please upload a PNG, JPG, JPEG, or SVG file.");
      return;
    }
    if (file.size > MAX_LOGO_BYTES) {
      setLogoError("Logo must be 2 MB or smaller.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setLogoDataUrl(reader.result);
      }
    };
    reader.onerror = () => setLogoError("Could not read the file. Please try again.");
    reader.readAsDataURL(file);
  };

  const removeLogo = () => {
    setLogoDataUrl(null);
    setLogoError("");
    if (logoInputRef.current) logoInputRef.current.value = "";
  };

  const handlePrint = () => {
    window.print();
  };

  const handlePdf = async () => {
    await downloadUkInvoicePdf({
      businessName,
      vatRegistrationNumber,
      companyRegistrationNumber,
      businessWebsite,
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
      vatEnabled,
      vatPercent,
      vatAmount,
      grandTotal,
      amountDue,
      logoDataUrl,
      bankName,
      accountName,
      sortCode,
      accountNumber,
      iban,
      paymentReference,
    });
  };

  const hasPaymentDetails =
    bankName.trim() ||
    accountName.trim() ||
    sortCode.trim() ||
    accountNumber.trim() ||
    iban.trim() ||
    paymentReference.trim();

  const showVatBreakdown = vatEnabled && vatPercent > 0;

  return (
    <div className="space-y-8">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="print:hidden space-y-6">
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6">
            <h2 className="text-lg font-semibold tracking-tight text-foreground">
              Business details
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Saved automatically in your browser for next time.
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor={`${baseId}-business`} className={labelClass}>
                  Your name / business name
                </label>
                <input
                  id={`${baseId}-business`}
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className={inputClass}
                  placeholder="Acme Ltd"
                  autoComplete="organization"
                />
              </div>
              <div>
                <label htmlFor={`${baseId}-vat-reg`} className={labelClass}>
                  VAT registration number
                </label>
                <input
                  id={`${baseId}-vat-reg`}
                  type="text"
                  value={vatRegistrationNumber}
                  onChange={(e) => setVatRegistrationNumber(e.target.value)}
                  className={inputClass}
                  placeholder="GB 123 4567 89"
                />
              </div>
              <div>
                <label htmlFor={`${baseId}-company-reg`} className={labelClass}>
                  Company registration number
                </label>
                <input
                  id={`${baseId}-company-reg`}
                  type="text"
                  value={companyRegistrationNumber}
                  onChange={(e) => setCompanyRegistrationNumber(e.target.value)}
                  className={inputClass}
                  placeholder="12345678"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor={`${baseId}-website`} className={labelClass}>
                  Business website
                </label>
                <input
                  id={`${baseId}-website`}
                  type="url"
                  value={businessWebsite}
                  onChange={(e) => setBusinessWebsite(e.target.value)}
                  className={inputClass}
                  placeholder="https://example.co.uk"
                />
              </div>
              <div className="sm:col-span-2">
                <span className={labelClass}>Company logo</span>
                <div className="mt-1.5 flex flex-wrap items-center gap-3">
                  {logoDataUrl ? (
                    <div className="relative rounded-md border border-border bg-background p-2">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={logoDataUrl}
                        alt="Company logo preview"
                        className="max-h-12 max-w-[160px] object-contain"
                      />
                    </div>
                  ) : null}
                  <input
                    ref={logoInputRef}
                    type="file"
                    accept={LOGO_ACCEPT}
                    className="sr-only"
                    id={`${baseId}-logo`}
                    onChange={(e) => handleLogoUpload(e.target.files?.[0])}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => logoInputRef.current?.click()}
                  >
                    <ImagePlus className="size-4" aria-hidden />
                    {logoDataUrl ? "Replace logo" : "Upload logo"}
                  </Button>
                  {logoDataUrl ? (
                    <Button type="button" variant="ghost" size="sm" onClick={removeLogo}>
                      <X className="size-4" aria-hidden />
                      Remove
                    </Button>
                  ) : null}
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  PNG, JPG, JPEG, or SVG — max 2 MB.
                </p>
                {logoError ? (
                  <p className="mt-1 text-xs text-destructive">{logoError}</p>
                ) : null}
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6">
            <h2 className="text-lg font-semibold tracking-tight text-foreground">
              Invoice details
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor={`${baseId}-client`} className={labelClass}>
                  Client name
                </label>
                <input
                  id={`${baseId}-client`}
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className={inputClass}
                  placeholder="Client or company"
                  autoComplete="off"
                />
              </div>
              <div className="sm:col-span-2 flex flex-col gap-3 sm:flex-row sm:items-end">
                <div className="min-w-0 flex-1">
                  <label htmlFor={`${baseId}-invno`} className={labelClass}>
                    Invoice number
                  </label>
                  <input
                    id={`${baseId}-invno`}
                    type="text"
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                    disabled={autoInvoiceNo}
                    className={`${inputClass} disabled:cursor-not-allowed disabled:opacity-60`}
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
                <label htmlFor={`${baseId}-date`} className={labelClass}>
                  Invoice date
                </label>
                <input
                  id={`${baseId}-date`}
                  type="date"
                  value={invoiceDate}
                  onChange={(e) => setInvoiceDate(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor={`${baseId}-due`} className={labelClass}>
                  Due date
                </label>
                <input
                  id={`${baseId}-due`}
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className={inputClass}
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
              Enter item name, quantity, and unit price in GBP (£). Totals update as you type.
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
                      Unit price (£)
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

            <div className="mt-5 space-y-4 border-t border-border pt-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-foreground">VAT</h3>
                <label className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground">
                  <input
                    type="checkbox"
                    checked={vatEnabled}
                    onChange={(e) => setVatEnabled(e.target.checked)}
                    className="size-4 rounded border-input"
                  />
                  VAT enabled
                </label>
              </div>
              {vatEnabled ? (
                <div className="flex flex-wrap gap-2">
                  {(["0", "5", "20", "custom"] as const).map((rate) => (
                    <button
                      key={rate}
                      type="button"
                      onClick={() => setVatRatePreset(rate)}
                      className={`rounded-md border px-3 py-1.5 text-sm font-medium transition-colors ${
                        vatRatePreset === rate
                          ? "border-primary bg-primary/10 text-foreground"
                          : "border-border bg-background text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {rate === "custom" ? "Custom" : `${rate}%`}
                    </button>
                  ))}
                </div>
              ) : null}
              {vatEnabled && vatRatePreset === "custom" ? (
                <div className="max-w-xs">
                  <label htmlFor={`${baseId}-vat-custom`} className={labelClass}>
                    Custom VAT rate (%)
                  </label>
                  <input
                    id={`${baseId}-vat-custom`}
                    type="number"
                    inputMode="decimal"
                    min={0}
                    max={100}
                    step="0.01"
                    value={vatCustomRateStr}
                    onChange={(e) => setVatCustomRateStr(e.target.value)}
                    placeholder="e.g. 12.5"
                    className={inputClass}
                  />
                </div>
              ) : null}
            </div>

            <dl className="mt-6 space-y-2 border-t border-border pt-4 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd className="font-medium tabular-nums text-foreground">
                  {formatUkMoney(subtotal)}
                </dd>
              </div>
              {showVatBreakdown ? (
                <>
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">VAT rate</dt>
                    <dd className="font-medium tabular-nums text-foreground">{vatPercent}%</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">VAT amount</dt>
                    <dd className="font-medium tabular-nums text-foreground">
                      {formatUkMoney(vatAmount)}
                    </dd>
                  </div>
                </>
              ) : null}
              <div className="flex justify-between gap-4">
                <dt className="font-semibold text-foreground">Grand total</dt>
                <dd className="font-bold tabular-nums text-foreground">
                  {formatUkMoney(grandTotal)}
                </dd>
              </div>
              <div className="flex justify-between gap-4 text-base">
                <dt className="font-semibold text-foreground">Amount due</dt>
                <dd className="font-bold tabular-nums text-foreground">
                  {formatUkMoney(amountDue)}
                </dd>
              </div>
            </dl>
          </div>

          <div className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6">
            <h2 className="text-lg font-semibold tracking-tight text-foreground">
              Payment details
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Optional — shown on the invoice when completed. Saved automatically.
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor={`${baseId}-bank`} className={labelClass}>
                  Bank name
                </label>
                <input
                  id={`${baseId}-bank`}
                  type="text"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className={inputClass}
                  placeholder="Barclays"
                />
              </div>
              <div>
                <label htmlFor={`${baseId}-account-name`} className={labelClass}>
                  Account name
                </label>
                <input
                  id={`${baseId}-account-name`}
                  type="text"
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                  className={inputClass}
                  placeholder="Acme Ltd"
                />
              </div>
              <div>
                <label htmlFor={`${baseId}-sort-code`} className={labelClass}>
                  Sort code
                </label>
                <input
                  id={`${baseId}-sort-code`}
                  type="text"
                  value={sortCode}
                  onChange={(e) => setSortCode(e.target.value)}
                  className={inputClass}
                  placeholder="12-34-56"
                />
              </div>
              <div>
                <label htmlFor={`${baseId}-account-number`} className={labelClass}>
                  Account number
                </label>
                <input
                  id={`${baseId}-account-number`}
                  type="text"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  className={inputClass}
                  placeholder="12345678"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor={`${baseId}-iban`} className={labelClass}>
                  IBAN
                </label>
                <input
                  id={`${baseId}-iban`}
                  type="text"
                  value={iban}
                  onChange={(e) => setIban(e.target.value)}
                  className={inputClass}
                  placeholder="GB29 NWBK 6016 1331 9268 19"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor={`${baseId}-payment-ref`} className={labelClass}>
                  Payment reference
                </label>
                <input
                  id={`${baseId}-payment-ref`}
                  type="text"
                  value={paymentReference}
                  onChange={(e) => setPaymentReference(e.target.value)}
                  className={inputClass}
                  placeholder={invoiceNumber || "Invoice number"}
                />
              </div>
            </div>
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
            {logoDataUrl ? (
              <div className="mb-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={logoDataUrl}
                  alt=""
                  className="max-h-14 max-w-[180px] object-contain"
                />
              </div>
            ) : null}
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border pb-6">
              <div>
                <p className="text-2xl font-bold tracking-tight">INVOICE</p>
                <p className="mt-2 text-sm text-muted-foreground">#{invoiceNumber || "—"}</p>
              </div>
              <div className="text-right text-sm">
                <p>
                  <span className="text-muted-foreground">Invoice date </span>
                  <span className="font-medium">{invoiceDate || "—"}</span>
                </p>
                <p className="mt-1">
                  <span className="text-muted-foreground">Due date </span>
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
                {vatRegistrationNumber.trim() ? (
                  <p className="mt-1 text-sm text-muted-foreground">
                    VAT Reg: {vatRegistrationNumber.trim()}
                  </p>
                ) : null}
                {companyRegistrationNumber.trim() ? (
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    Company No: {companyRegistrationNumber.trim()}
                  </p>
                ) : null}
                {businessWebsite.trim() ? (
                  <p className="mt-0.5 text-sm text-muted-foreground">{businessWebsite.trim()}</p>
                ) : null}
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
                    <th className="py-2 px-2 text-right">Unit price</th>
                    <th className="py-2 pl-2 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {linesComputed.map((row) => (
                    <tr key={row.id} className="border-b border-border/80">
                      <td className="py-2.5 pr-2 font-medium">{row.name || "—"}</td>
                      <td className="py-2.5 px-2 text-right tabular-nums">{row.qty}</td>
                      <td className="py-2.5 px-2 text-right tabular-nums">
                        {formatUkMoney(row.price)}
                      </td>
                      <td className="py-2.5 pl-2 text-right tabular-nums font-medium">
                        {formatUkMoney(row.lineTotal)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 ml-auto max-w-[240px] space-y-2 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="tabular-nums font-medium">{formatUkMoney(subtotal)}</span>
              </div>
              {showVatBreakdown ? (
                <>
                  <div className="flex justify-between gap-4">
                    <span className="text-muted-foreground">VAT rate</span>
                    <span className="tabular-nums font-medium">{vatPercent}%</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-muted-foreground">VAT amount</span>
                    <span className="tabular-nums font-medium">{formatUkMoney(vatAmount)}</span>
                  </div>
                </>
              ) : null}
              <div className="flex justify-between gap-4 border-t border-border pt-2 font-semibold">
                <span>Grand total</span>
                <span className="tabular-nums">{formatUkMoney(grandTotal)}</span>
              </div>
              <div className="flex justify-between gap-4 text-base font-bold">
                <span>Amount due</span>
                <span className="tabular-nums">{formatUkMoney(amountDue)}</span>
              </div>
            </div>
            {hasPaymentDetails ? (
              <div className="mt-8 border-t border-border pt-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Payment details
                </p>
                <dl className="mt-2 space-y-1 text-sm">
                  {bankName.trim() ? (
                    <div className="flex gap-2">
                      <dt className="text-muted-foreground">Bank:</dt>
                      <dd className="font-medium">{bankName.trim()}</dd>
                    </div>
                  ) : null}
                  {accountName.trim() ? (
                    <div className="flex gap-2">
                      <dt className="text-muted-foreground">Account name:</dt>
                      <dd className="font-medium">{accountName.trim()}</dd>
                    </div>
                  ) : null}
                  {sortCode.trim() ? (
                    <div className="flex gap-2">
                      <dt className="text-muted-foreground">Sort code:</dt>
                      <dd className="font-medium tabular-nums">
                        {formatUkSortCode(sortCode)}
                      </dd>
                    </div>
                  ) : null}
                  {accountNumber.trim() ? (
                    <div className="flex gap-2">
                      <dt className="text-muted-foreground">Account no:</dt>
                      <dd className="font-medium tabular-nums">{accountNumber.trim()}</dd>
                    </div>
                  ) : null}
                  {iban.trim() ? (
                    <div className="flex gap-2">
                      <dt className="text-muted-foreground">IBAN:</dt>
                      <dd className="font-medium tabular-nums">{iban.trim()}</dd>
                    </div>
                  ) : null}
                  {paymentReference.trim() ? (
                    <div className="flex gap-2">
                      <dt className="text-muted-foreground">Payment reference:</dt>
                      <dd className="font-medium">{paymentReference.trim()}</dd>
                    </div>
                  ) : null}
                </dl>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
