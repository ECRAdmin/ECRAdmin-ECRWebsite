import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InquiryForm } from "@/components/site/inquiry-form";
import { PageHero } from "@/components/site/shared-sections";
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
    path: "/corporate",
    title: locale === "ar" ? "حلول الشركات" : "Corporate Rental",
    description:
      locale === "ar"
        ? "صفحة مخصصة لطلبات الشركات والتعاقدات المرنة وأساطيل المشاريع داخل الإمارات."
        : "A dedicated page for business rental requests, flexible contracts, and project fleet coordination in the UAE.",
  });
}

export default async function CorporatePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const typedLocale = locale as Locale;

  const benefits =
    typedLocale === "ar"
      ? [
          "مسار تواصل مخصص للشركات والفرق.",
          "مرونة يومية وشهرية حسب طبيعة الاستخدام.",
          "عدم نشر الأسعار الخاصة أو الشروط التجارية الحساسة.",
        ]
      : [
          "A dedicated path for businesses and teams.",
          "Daily and monthly flexibility based on operational needs.",
          "No exposure of private rates or sensitive commercial terms.",
        ];

  return (
    <>
      <PageHero
        locale={typedLocale}
        kicker={typedLocale === "ar" ? "الشركات" : "Corporate"}
        title={
          typedLocale === "ar"
            ? "واجهة تجارية للشركات لا تكشف معلوماتك الخاصة"
            : "A business-facing rental surface without exposing private commercial data"
        }
        body={
          typedLocale === "ar"
            ? "هذه الصفحة تبني الثقة وتجمع الطلبات المنظمة للعقود، المشاريع، والفرق المتحركة داخل الإمارات."
            : "This page is built to earn trust and collect structured business leads for contracts, projects, and mobile teams across the UAE."
        }
      />
      <section className="py-20 sm:py-24">
        <div className="shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="gold-ring glass-panel rounded-[2rem] p-7">
            <span className="section-kicker">
              {typedLocale === "ar" ? "مزايا" : "Benefits"}
            </span>
            <ul className="mt-6 space-y-4 text-sm leading-7 text-[var(--text-muted)]">
              {benefits.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-[var(--accent)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <InquiryForm locale={typedLocale} />
        </div>
      </section>
    </>
  );
}
