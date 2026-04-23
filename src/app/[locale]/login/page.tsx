import { signIn } from "@/auth";
import { type Locale, isLocale } from "@/lib/locale";
import { redirect } from "next/navigation";

export default async function LoginPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) redirect("/en/login");

  const typedLocale = locale as Locale;

  const t = {
    ar: {
      title: "تسجيل الدخول",
      description: "قم بتسجيل الدخول للوصول إلى حجوزاتك وإدارة حسابك.",
      google: "الدخول بواسطة جوجل",
      github: "الدخول بواسطة جيت هاب",
    },
    en: {
      title: "Login",
      description: "Sign in to access your bookings and manage your account.",
      google: "Sign in with Google",
      github: "Sign in with GitHub",
    },
  }[typedLocale];

  return (
    <div className="py-32 shell flex flex-col items-center justify-center">
      <div className="max-w-md w-full gold-ring glass-panel rounded-[2.5rem] p-10 text-center">
        <h1 className="font-display text-4xl font-semibold text-white mb-4">{t.title}</h1>
        <p className="text-[var(--text-muted)] mb-10">{t.description}</p>
        
        <div className="grid gap-4">
          <form
            action={async () => {
              "use server";
              await signIn("google", { redirectTo: `/${locale}/dashboard` });
            }}
          >
            <button className="w-full rounded-full border border-white/10 py-4 font-semibold text-white hover:bg-white/5 transition">
              {t.google}
            </button>
          </form>
          
          <form
            action={async () => {
              "use server";
              await signIn("github", { redirectTo: `/${locale}/dashboard` });
            }}
          >
            <button className="w-full rounded-full border border-white/10 py-4 font-semibold text-white hover:bg-white/5 transition">
              {t.github}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
