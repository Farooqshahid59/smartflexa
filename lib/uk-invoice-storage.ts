export const UK_INVOICE_STORAGE_KEY = "smartflexa-uk-invoice-settings";

export type VatRatePreset = "0" | "5" | "20" | "custom";

export type UkInvoicePersistedSettings = {
  businessName: string;
  vatRegistrationNumber: string;
  companyRegistrationNumber: string;
  businessWebsite: string;
  vatEnabled: boolean;
  vatRatePreset: VatRatePreset;
  vatCustomRateStr: string;
  logoDataUrl: string | null;
  bankName: string;
  accountName: string;
  sortCode: string;
  accountNumber: string;
  iban: string;
  paymentReference: string;
};

export const defaultUkInvoiceSettings: UkInvoicePersistedSettings = {
  businessName: "",
  vatRegistrationNumber: "",
  companyRegistrationNumber: "",
  businessWebsite: "",
  vatEnabled: true,
  vatRatePreset: "20",
  vatCustomRateStr: "",
  logoDataUrl: null,
  bankName: "",
  accountName: "",
  sortCode: "",
  accountNumber: "",
  iban: "",
  paymentReference: "",
};

export function loadUkInvoiceSettings(): UkInvoicePersistedSettings {
  if (typeof window === "undefined") return defaultUkInvoiceSettings;
  try {
    const raw = window.localStorage.getItem(UK_INVOICE_STORAGE_KEY);
    if (!raw) return defaultUkInvoiceSettings;
    const parsed = JSON.parse(raw) as Partial<UkInvoicePersistedSettings>;
    return { ...defaultUkInvoiceSettings, ...parsed };
  } catch {
    return defaultUkInvoiceSettings;
  }
}

export function saveUkInvoiceSettings(settings: UkInvoicePersistedSettings): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(UK_INVOICE_STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // Quota exceeded or private browsing — ignore silently
  }
}
