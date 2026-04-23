import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/site/shared-sections";
import { buildMetadata } from "@/lib/seo";
import { isLocale, type Locale } from "@/lib/locale";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  return buildMetadata({
    locale,
    path: "/terms",
    title: locale === "ar" ? "الشروط" : "Terms",
    description:
      locale === "ar"
        ? "شروط عامة توضح أن الأسعار المنشورة تبدأ من فقط وأن التوفر والتأكيد النهائي يتم عبر التواصل المباشر."
        : "General terms clarifying that published prices are starting-from rates and final confirmation happens through direct communication.",
  });
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const typedLocale = locale as Locale;

  const paragraphs =
    typedLocale === "ar"
      ? [
          "الأسعار الظاهرة على الموقع هي أسعار تبدأ من وليست عرضًا نهائيًا ملزمًا.",
          "تأكيد المركبة، المدة، موقع التسليم والاستلام، والمتطلبات النهائية يتم بعد مراجعة الطلب من الفريق.",
          "الموقع مخصص للمعلومات العامة والتحويل الأولي، وليس منصة حجز مباشر أو دفع إلكتروني في النسخة الحالية.",
        ]
      : [
          "Prices shown on the website are starting-from public rates and not final binding offers.",
          "Vehicle confirmation, rental duration, delivery location, and final eligibility are reviewed after inquiry submission.",
          "The current site is built for public information and lead capture, not for direct booking or online payment.",
        ];

  return (
    <>
      <PageHero
        locale={typedLocale}
        kicker={typedLocale === "ar" ? "الشروط" : "Terms"}
        title={
          typedLocale === "ar"
            ? "شروط عامة وواضحة للواجهة العامة"
            : "Clear public-facing terms"
        }
        body={
          typedLocale === "ar"
            ? "هذه الصفحة توضح حدود ما يُنشر على الموقع وما يتم تأكيده لاحقًا عبر التواصل المباشر."
            : "This page explains what is published publicly and what gets confirmed later through direct communication."
        }
      />
      <section className="py-20 sm:py-24">
        <div className="shell max-w-4xl space-y-6">
          {paragraphs.map((paragraph) => (
            <div key={paragraph} className="gold-ring glass-panel rounded-[2rem] p-7">
              <p className="text-lg leading-8 text-[var(--text-muted)]">{paragraph}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
