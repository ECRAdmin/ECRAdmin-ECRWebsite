import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FleetPreview, PageHero } from "@/components/site/shared-sections";
import { InquiryForm } from "@/components/site/inquiry-form";
import { buildMetadata } from "@/lib/seo";
import { isLocale, type Locale } from "@/lib/locale";
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
    path: "/daily-rental",
    title: locale === "ar" ? "إيجار يومي" : "Daily Rental",
    description:
      locale === "ar"
        ? "خيارات إيجار يومي للسيارات الاقتصادية والمتوسطة والعائلية مع أسعار عامة تبدأ من واضحة."
        : "Daily rental options across economy, sedan, crossover, and family categories with clear public starting rates.",
  });
}

export default async function DailyRentalPage({
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
        kicker={typedLocale === "ar" ? "إيجار يومي" : "Daily Rental"}
        title={
          typedLocale === "ar"
            ? "خيارات يومية واضحة للمقيمين والزوار"
            : "Clear daily rental options for residents and visitors"
        }
        body={
          typedLocale === "ar"
            ? "نقدم سيارات مناسبة للمشاوير اليومية، الاجتماعات، أو الزيارات القصيرة داخل الإمارات مع واجهة طلب بسيطة."
            : "We offer fleet options tailored to daily errands, meetings, or short stays across the UAE through a streamlined inquiry journey."
        }
      />
      <FleetPreview locale={typedLocale} vehicles={vehicles.slice(0, 9)} />
      <section className="border-t border-white/6 py-20 sm:py-24">
        <div className="shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-5">
            <span className="section-kicker">{typedLocale === "ar" ? "تحويل" : "Conversion"}</span>
            <h2 className="font-display text-4xl font-semibold text-white">
              {typedLocale === "ar"
                ? "اذكر اليوم والمدينة والميزانية لنرسل لك الخيار الأنسب."
                : "Share the day, city, and budget and we will match the best option."}
            </h2>
          </div>
          <InquiryForm locale={typedLocale} />
        </div>
      </section>
    </>
  );
}
