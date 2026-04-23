import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero, TestimonialRail, TrustStrip } from "@/components/site/shared-sections";
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
    path: "/about",
    title: locale === "ar" ? "من نحن" : "About",
    description:
      locale === "ar"
        ? "تعرف على Eagle Car Rental ونهجها في تقديم تجربة تأجير سيارات أنيقة وواضحة داخل الإمارات."
        : "Learn about Eagle Car Rental and its approach to elegant, clear car rental experiences across the UAE.",
  });
}

export default async function AboutPage({
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
        kicker={typedLocale === "ar" ? "من نحن" : "About"}
        title={
          typedLocale === "ar"
            ? "علامة تأجير سيارات بهيئة مؤسسية أقرب للفخامة"
            : "A car rental brand with a more premium, corporate public presence"
        }
        body={
          typedLocale === "ar"
            ? "نحوّل المواد الدعائية الحالية إلى منصة رقمية تبني الثقة، تسهل التحويل، وتحافظ على خصوصية المعلومات التشغيلية."
            : "We transform the current campaign language into a digital platform that builds trust, improves conversion, and protects operational privacy."
        }
      />
      <TrustStrip locale={typedLocale} />
      <TestimonialRail locale={typedLocale} />
    </>
  );
}
