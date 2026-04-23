import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FleetExplorer } from "@/components/site/fleet-explorer";
import { InquiryForm } from "@/components/site/inquiry-form";
import { PageHero } from "@/components/site/shared-sections";
import { isLocale, type Locale } from "@/lib/locale";
import { buildMetadata } from "@/lib/seo";
import { vehicles } from "@/lib/site-data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  return buildMetadata({
    locale,
    path: "/fleet",
    title: locale === "ar" ? "الأسطول" : "Fleet",
    description:
      locale === "ar"
        ? "استعرض أسطول Eagle Car Rental من السيارات الاقتصادية والمتوسطة والعائلية مع أسعار تبدأ من واضحة."
        : "Browse Eagle Car Rental's public-ready fleet across economy, sedan, crossover, and family segments.",
  });
}

export default async function FleetPage({
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
        kicker={typedLocale === "ar" ? "الأسطول" : "Fleet"}
        title={
          typedLocale === "ar"
            ? "سيارات مختارة لإيجار يومي وشهري في الإمارات"
            : "Selected rental cars for daily and monthly mobility across the UAE"
        }
        body={
          typedLocale === "ar"
            ? "نعرض فقط ما يحتاجه العميل العام: الفئة، السعر الابتدائي، وأسلوب الاستخدام المناسب، ثم نوجّه كل طلب إلى قنوات التحويل المناسبة."
            : "We surface only what public customers need: category, starting price, and best-fit usage, then route every serious request into the right conversion flow."
        }
      />
      <section className="py-16 sm:py-20">
        <div className="shell">
          <FleetExplorer locale={typedLocale} vehicles={vehicles} />
        </div>
      </section>
      <section className="border-t border-white/6 py-20 sm:py-24">
        <div className="shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-5">
            <span className="section-kicker">
              {typedLocale === "ar" ? "استفسار منظم" : "Structured lead capture"}
            </span>
            <h2 className="font-display text-4xl font-semibold text-white">
              {typedLocale === "ar"
                ? "لم نجد السيارة المناسبة؟ أخبرنا بالميزانية والمدة."
                : "Need something specific? Tell us the budget and rental term."}
            </h2>
            <p className="text-lg leading-8 text-[var(--text-muted)]">
              {typedLocale === "ar"
                ? "هذا النموذج يساعد فريق Eagle Car Rental على فرز الطلبات بسرعة دون الحاجة لنشر التوافر أو الأسعار الخاصة للعامة."
                : "This form helps the Eagle Car Rental team sort requests quickly without exposing live availability or private pricing to the public."}
            </p>
          </div>
          <InquiryForm locale={typedLocale} />
        </div>
      </section>
    </>
  );
}
