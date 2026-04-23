import type { Locale } from "@/lib/locale";
import { localeRegions } from "@/lib/locale";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function siteUrl(path = "") {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.eaglecarrental.ae";
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalized, base).toString();
}

export function formatNumber(locale: Locale, value: number) {
  return new Intl.NumberFormat(localeRegions[locale]).format(value);
}

export function formatDateLabel(locale: Locale, value: string) {
  return new Intl.DateTimeFormat(localeRegions[locale], {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

export function buildWhatsAppUrl(phone: string, text: string) {
  const digits = phone.replace(/[^\d]/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}
