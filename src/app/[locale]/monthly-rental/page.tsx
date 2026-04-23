import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InquiryForm } from "@/components/site/inquiry-form";
import { PageHero, RequirementBlocks, TrustStrip } from "@/components/site/shared-sections";
import { isLocale, type Locale } from "@/lib/locale";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  return buildMetadata({
    locale,
    path: "/monthly-rental",
    title: locale === "ar" ? "إيجار شهري" : "Monthly Rental",
    description:
      locale === "ar"
        ? "حلول إيجار شهري مرنة للأفراد والشركات داخل الإمارات مع فئات سعر عامة وطلب مخصص."
        : "Flexible monthly car rental solutions for individuals and businesses across the UAE with public pricing bands and tailored inquiries.",
  });
}

export default async function MonthlyRentalPage({
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
        kicker={typedLocale === "ar" ? "إيجار شهري" : "Monthly Rental"}
        title={
          typedLocale === "ar"
            ? "قيمة أفضل للمدة الأطول"
            : "Better value for longer rental periods"
        }
        body={
          typedLocale === "ar"
            ? "مناسبة للمقيمين، المشاريع، والفرق التي تحتاج سيارة موثوقة بسعر أوضح على مدى أطول."
            : "Ideal for residents, projects, and teams that need dependable mobility with stronger medium-term value."
        }
      />
      <TrustStrip locale={typedLocale} />
      <RequirementBlocks locale={typedLocale} />
      <section className="py-20 sm:py-24">
        <div className="shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-5">
            <span className="section-kicker">{typedLocale === "ar" ? "طلب شهري" : "Monthly lead"}</span>
            <h2 className="font-display text-4xl font-semibold text-white">
              {typedLocale === "ar"
                ? "أرسل نوع الاستخدام والمدة لنقترح الفئة الأنسب."
                : "Share the duration and use case and we will recommend the best-fit category."}
            </h2>
          </div>
          <InquiryForm locale={typedLocale} />
        </div>
      </section>
    </>
  );
}
