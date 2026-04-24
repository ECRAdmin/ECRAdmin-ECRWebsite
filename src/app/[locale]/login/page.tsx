import { type Locale, isLocale } from "@/lib/locale";
import { notFound } from "next/navigation";
import LoginForm from "@/components/site/login-form";

export default async function LoginPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return <LoginForm locale={locale as Locale} />;
}
