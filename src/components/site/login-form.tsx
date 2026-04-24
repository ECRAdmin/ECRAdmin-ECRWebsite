"use client";

import { signIn } from "next-auth/react";
import { type Locale } from "@/lib/locale";
import { useState } from "react";

export default function LoginForm({
  locale,
}: {
  locale: Locale;
}) {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");

  const t = {
    ar: {
      title: "تسجيل الدخول",
      description: "قم بتسجيل الدخول للوصول إلى حجوزاتك وإدارة حسابك.",
      google: "الدخول بواسطة جوجل",
      github: "الدخول بواسطة جيت هاب",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      submit: "دخول",
      or: "أو",
      error: "فشل تسجيل الدخول. يرجى التحقق من بياناتك.",
    },
    en: {
      title: "Login",
      description: "Sign in to access your bookings and manage your account.",
      google: "Sign in with Google",
      github: "Sign in with GitHub",
      email: "Email",
      password: "Password",
      submit: "Sign In",
      or: "or",
      error: "Login failed. Please check your credentials.",
    },
  }[locale];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const result = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: true,
      callbackUrl: `/${locale}/dashboard`,
    });

    if (result?.error) {
      setError(t.error);
      setIsPending(false);
    }
  };

  return (
    <div className="py-32 shell flex flex-col items-center justify-center">
      <div className="max-w-md w-full gold-ring glass-panel rounded-[2.5rem] p-10 text-center">
        <h1 className="font-display text-4xl font-semibold text-white mb-4">{t.title}</h1>
        <p className="text-[var(--text-muted)] mb-10">{t.description}</p>
        
        {error && (
          <div className="mb-6 rounded-2xl bg-red-500/10 p-4 text-sm text-red-500 border border-red-500/20">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="grid gap-4 mb-8 text-left"
          dir={locale === "ar" ? "rtl" : "ltr"}
        >
          <div className="space-y-2">
            <label className="text-sm text-[var(--text-muted)] ml-4">{t.email}</label>
            <input
              name="email"
              type="email"
              required
              className="w-full rounded-full border border-white/10 bg-white/5 px-6 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              placeholder="admin@eagle.ae"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-[var(--text-muted)] ml-4">{t.password}</label>
            <input
              name="password"
              type="password"
              required
              className="w-full rounded-full border border-white/10 bg-white/5 px-6 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              placeholder="••••••••"
            />
          </div>
          <button 
            type="submit"
            disabled={isPending}
            className="w-full rounded-full bg-[var(--accent)] py-4 font-semibold text-black hover:bg-[var(--accent-bright)] transition mt-2 disabled:opacity-50"
          >
            {isPending ? "..." : t.submit}
          </button>
        </form>

        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-[#0a0a0a] px-2 text-[var(--text-subtle)]">{t.or}</span>
          </div>
        </div>

        <div className="grid gap-4">
          <button 
            onClick={() => signIn("google", { callbackUrl: `/${locale}/dashboard` })}
            className="w-full rounded-full border border-white/10 py-4 font-semibold text-white hover:bg-white/5 transition"
          >
            {t.google}
          </button>
          <button 
            onClick={() => signIn("github", { callbackUrl: `/${locale}/dashboard` })}
            className="w-full rounded-full border border-white/10 py-4 font-semibold text-white hover:bg-white/5 transition"
          >
            {t.github}
          </button>
        </div>
      </div>
    </div>
  );
}
