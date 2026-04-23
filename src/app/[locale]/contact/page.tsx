import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InquiryForm } from "@/components/site/inquiry-form";
import { PageHero } from "@/components/site/shared-sections";
import { isLocale, type Locale, localize } from "@/lib/locale";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  return buildMetadata({
    locale,
    path: "/contact",
    title: locale === "ar" ? "تواصل" : "Contact",
    description:
      locale === "ar"
        ? "تواصل مع Eagle Car Rental عبر واتساب أو الهاتف أو نموذج الطلب المنظم."
        : "Contact Eagle Car Rental via WhatsApp, phone, or the structured inquiry form.",
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const typedLocale = locale as Locale;

  return (
    <>
      <PageHero
        locale={typedLocale}
        kicker={typedLocale === "ar" ? "تواصل" : "Contact"}
        title={
          typedLocale === "ar"
            ? "ابدأ من القناة الأنسب لك"
            : "Start with the channel that suits you best"
        }
        body={
          typedLocale === "ar"
            ? "واتساب للرد السريع، الهاتف للمحادثات المباشرة، والنموذج لتنظيم الطلبات التي تحتاج تفاصيل أكثر."
            : "Use WhatsApp for fast conversion, the phone for direct conversation, and the form for detailed lead capture."
        }
      />
      <section className="py-20 sm:py-24">
        <div className="shell grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-5">
            <div className="gold-ring glass-panel rounded-[2rem] p-6">
              <p className="section-kicker">{localize(typedLocale, siteConfig.company.name)}</p>
              <div className="mt-6 space-y-4 text-[var(--text-muted)]">
                <a href={`tel:${siteConfig.company.phone}`} className="block">
                  {siteConfig.company.phoneDisplay}
                </a>
                <a href={`mailto:${siteConfig.company.email}`} className="block">
                  {siteConfig.company.email}
                </a>
                <a
                  href={`https://wa.me/${siteConfig.company.whatsapp.replace(/[^\d]/g, "")}`}
                  className="block"
                >
                  WhatsApp
                </a>
                <p>{localize(typedLocale, siteConfig.company.address)}</p>
              </div>
            </div>
          </div>
          <InquiryForm locale={typedLocale} />
        </div>
      </section>
    </>
  );
}
