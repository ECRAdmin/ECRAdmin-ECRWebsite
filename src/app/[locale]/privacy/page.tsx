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
    path: "/privacy",
    title: locale === "ar" ? "الخصوصية" : "Privacy",
    description:
      locale === "ar"
        ? "سياسة خصوصية عامة توضّح كيف نتعامل مع بيانات الاستفسارات دون نشر أي معلومات تشغيلية خاصة."
        : "A public privacy page explaining how inquiry data is handled without exposing private operational information.",
  });
}

export default async function PrivacyPage({
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
          "نستخدم المعلومات التي يرسلها العميل عبر النماذج أو واتساب فقط لمعالجة طلب الاستئجار والتواصل والمتابعة.",
          "لا ننشر البيانات الشخصية للعامة، ولا نستخدم الموقع لعرض أي بيانات تشغيلية أو ملفات تخص عملاء حاليين أو سابقين.",
          "يتم الاحتفاظ ببيانات الاستفسارات ضمن نطاق تشغيلي محدود وبما يتوافق مع الغرض المباشر من الخدمة.",
        ]
      : [
          "We use inquiry details only to process rental requests, coordinate follow-up, and respond to customer intent.",
          "Personal data is never published publicly, and the website does not expose operational records or customer documents.",
          "Inquiry information is retained in a limited operational scope appropriate to the direct service purpose.",
        ];

  return (
    <>
      <PageHero
        locale={typedLocale}
        kicker={typedLocale === "ar" ? "الخصوصية" : "Privacy"}
        title={
          typedLocale === "ar"
            ? "خصوصية العميل جزء من تصميم المنتج"
            : "Customer privacy is part of the product design"
        }
        body={
          typedLocale === "ar"
            ? "تم تصميم الموقع لعرض ما يصلح للعامة فقط، مع إبقاء المعلومات التشغيلية الحساسة داخل القنوات الخاصة."
            : "The site is deliberately designed to publish only public-ready information while keeping sensitive operational data private."
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
