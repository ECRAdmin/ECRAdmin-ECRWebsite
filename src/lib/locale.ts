export const locales = ["ar", "en"] as const;

export type Locale = (typeof locales)[number];

export type LocalizedText = Record<Locale, string>;

export const localeLabels: Record<Locale, string> = {
  ar: "العربية",
  en: "English",
};

export const localeDirections: Record<Locale, "rtl" | "ltr"> = {
  ar: "rtl",
  en: "ltr",
};

export const localeRegions: Record<Locale, string> = {
  ar: "ar-AE",
  en: "en-AE",
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function localize(locale: Locale, value: LocalizedText): string {
  return value[locale];
}

export function toLocalizedPath(locale: Locale, path = ""): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${normalized}`.replace(/\/+$/, "");
}

export function oppositeLocale(locale: Locale): Locale {
  return locale === "ar" ? "en" : "ar";
}

export function formatCurrency(locale: Locale, value: number): string {
  return new Intl.NumberFormat(localeRegions[locale], {
    style: "currency",
    currency: "AED",
    maximumFractionDigits: 0,
  }).format(value);
}
