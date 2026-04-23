import Image from "next/image";
import type { Locale } from "@/lib/locale";
import { localize, localeLabels, oppositeLocale } from "@/lib/locale";
import { navigation, siteConfig } from "@/lib/site-data";
import { LocaleLink } from "@/components/common/locale-link";

export function SiteHeader({ locale }: { locale: Locale }) {
  const alternateLocale = oppositeLocale(locale);

  return (
    <header className="sticky top-0 z-50 border-b border-white/6 bg-[rgba(9,9,10,0.82)] backdrop-blur-xl">
      <div className="shell flex items-center justify-between gap-4 py-4">
        <LocaleLink locale={locale} href="" className="flex items-center gap-3">
          <div className="gold-ring relative flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--border-soft)] bg-white/[0.03]">
            <Image
              src="/brand/eagle-logo.png"
              alt={siteConfig.company.name.en}
              width={30}
              height={32}
              className="h-8 w-auto object-contain"
              priority
            />
          </div>
          <div className="hidden min-w-0 sm:block">
            <p className="font-display text-sm font-semibold tracking-[0.28em] text-[var(--accent-bright)] uppercase">
              Eagle
            </p>
            <p className="truncate text-sm text-[var(--text-muted)]">
              {localize(locale, siteConfig.company.name)}
            </p>
          </div>
        </LocaleLink>

        <nav className="hidden items-center gap-7 lg:flex">
          {navigation.primary.map((item) => (
            <LocaleLink
              key={item.href}
              locale={locale}
              href={item.href}
              className="text-sm font-medium text-[var(--text-muted)] transition hover:text-white"
            >
              {localize(locale, item.label)}
            </LocaleLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LocaleLink
            locale={alternateLocale}
            href=""
            className="rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-[var(--text-muted)] transition hover:border-[var(--border-strong)] hover:text-white"
          >
            {localeLabels[alternateLocale]}
          </LocaleLink>
          <a
            href={`tel:${siteConfig.company.phone}`}
            className="hidden rounded-full bg-[var(--accent)] px-5 py-2 text-sm font-semibold text-black transition hover:bg-[var(--accent-bright)] sm:inline-flex"
          >
            {locale === "ar" ? "اتصل الآن" : "Call now"}
          </a>
        </div>
      </div>
    </header>
  );
}
