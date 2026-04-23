import type { Locale } from "@/lib/locale";
import { localize } from "@/lib/locale";
import { LocaleLink } from "@/components/common/locale-link";
import { navigation, siteConfig } from "@/lib/site-data";

export function SiteFooter({ locale }: { locale: Locale }) {
  return (
    <footer className="border-t border-white/8 bg-black/40">
      <div className="shell grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-4">
          <span className="section-kicker">
            {locale === "ar" ? "النسر" : "Eagle"}
          </span>
          <h2 className="font-display text-3xl font-semibold text-white">
            {localize(locale, siteConfig.company.name)}
          </h2>
          <p className="max-w-xl text-[var(--text-muted)]">
            {localize(locale, siteConfig.company.description)}
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="font-display text-xl text-white">
            {locale === "ar" ? "التنقل" : "Navigate"}
          </h3>
          <div className="flex flex-col gap-3 text-sm text-[var(--text-muted)]">
            {navigation.footer.map((item) => (
              <LocaleLink key={item.href} locale={locale} href={item.href}>
                {localize(locale, item.label)}
              </LocaleLink>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-display text-xl text-white">
            {locale === "ar" ? "التواصل" : "Contact"}
          </h3>
          <div className="flex flex-col gap-3 text-sm text-[var(--text-muted)]">
            <a href={`tel:${siteConfig.company.phone}`}>{siteConfig.company.phoneDisplay}</a>
            <a href={`mailto:${siteConfig.company.email}`}>{siteConfig.company.email}</a>
            <a href={`https://wa.me/${siteConfig.company.whatsapp.replace(/[^\d]/g, "")}`}>
              WhatsApp
            </a>
            <p>{localize(locale, siteConfig.company.address)}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
