import { notFound } from "next/navigation";
import type { Locale } from "@/lib/locale";
import { isLocale, localeDirections } from "@/lib/locale";
import { FloatingContactBar } from "@/components/layout/floating-contact-bar";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export function generateStaticParams() {
  return [{ locale: "ar" }, { locale: "en" }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const typedLocale = locale as Locale;

  return (
    <div dir={localeDirections[typedLocale]} data-locale={typedLocale}>
      <SiteHeader locale={typedLocale} />
      <main>{children}</main>
      <SiteFooter locale={typedLocale} />
      <FloatingContactBar locale={typedLocale} />
    </div>
  );
}
