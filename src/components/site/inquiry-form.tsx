"use client";

import { useMemo, useState, useTransition } from "react";
import type { Locale } from "@/lib/locale";
import { buildInquiryMessage, siteConfig, vehicles } from "@/lib/site-data";
import { event } from "@/components/common/analytics";

interface InquiryFormProps {
  locale: Locale;
  compact?: boolean;
  defaultVehicle?: string;
}

type InquiryState = {
  success?: boolean;
  message?: string;
  whatsappUrl?: string;
};

const labels = {
  ar: {
    title: "ابدأ الطلب الآن",
    submit: "إرسال الطلب",
    sending: "جارٍ الإرسال...",
    success: "تم إرسال الطلب بنجاح. يمكنك المتابعة عبر واتساب مباشرة.",
    name: "الاسم",
    email: "البريد الإلكتروني",
    mobile: "رقم الجوال",
    whatsapp: "رقم واتساب",
    residencyType: "نوع العميل",
    pickupCity: "مدينة الاستلام",
    rentalTerm: "مدة الإيجار",
    preferredCar: "السيارة المفضلة",
    budgetBand: "نطاق الميزانية",
    preferredDate: "التاريخ المفضل",
    notes: "ملاحظات إضافية",
    consent: "أوافق على مشاركة بياناتي لغرض معالجة الطلب.",
    resident: "مقيم",
    tourist: "زائر / سائح",
    daily: "يومي",
    weekly: "أسبوعي",
    monthly: "شهري",
    custom: "مخصص",
    cityPlaceholder: "مثال: دبي",
    budgetPlaceholder: "مثال: 50 - 100 درهم",
    notesPlaceholder: "أخبرنا بمدة الإيجار، موقعك، أو أي طلب خاص.",
    continueWhatsapp: "المتابعة عبر واتساب",
  },
  en: {
    title: "Start your inquiry",
    submit: "Send inquiry",
    sending: "Sending...",
    success: "Inquiry sent successfully. You can continue directly on WhatsApp.",
    name: "Name",
    email: "Email",
    mobile: "Mobile",
    whatsapp: "WhatsApp number",
    residencyType: "Customer type",
    pickupCity: "Pickup city",
    rentalTerm: "Rental term",
    preferredCar: "Preferred car",
    budgetBand: "Budget band",
    preferredDate: "Preferred date",
    notes: "Additional notes",
    consent: "I agree to share my details for inquiry processing.",
    resident: "Resident",
    tourist: "Tourist / Visitor",
    daily: "Daily",
    weekly: "Weekly",
    monthly: "Monthly",
    custom: "Custom",
    cityPlaceholder: "Example: Dubai",
    budgetPlaceholder: "Example: AED 50 - 100",
    notesPlaceholder: "Tell us about your rental term, location, or any special request.",
    continueWhatsapp: "Continue on WhatsApp",
  },
} as const;

export function InquiryForm({
  locale,
  compact = false,
  defaultVehicle,
}: InquiryFormProps) {
  const t = labels[locale];
  const [state, setState] = useState<InquiryState>({});
  const [isPending, startTransition] = useTransition();

  const defaultWhatsappUrl = useMemo(
    () => buildInquiryMessage(locale, { preferredCar: defaultVehicle }),
    [defaultVehicle, locale],
  );

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const payload = Object.fromEntries(formData.entries());
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (!response.ok) {
        event({
          action: "form_error",
          category: "inquiry",
          label: result.error ?? "unknown",
        });
        setState({
          success: false,
          message: result.error ?? "Unable to submit inquiry.",
        });
        return;
      }

      event({
        action: "form_submit_success",
        category: "inquiry",
        label: defaultVehicle ?? "general",
      });

      setState({
        success: true,
        message: t.success,
        whatsappUrl: result.whatsappUrl ?? defaultWhatsappUrl,
      });
    });
  }

  return (
    <form
      action={handleSubmit}
      aria-label="Inquiry Form"
      className="gold-ring glass-panel rounded-[2rem] p-6 sm:p-7"
    >
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="section-kicker">{siteConfig.company.name.en}</p>
          <h3 className="mt-2 font-display text-2xl font-semibold text-white">
            {t.title}
          </h3>
        </div>
      </div>

      <input type="hidden" name="locale" value={locale} />

      <div className={compact ? "grid gap-4" : "grid gap-4 sm:grid-cols-2"}>
        <Field label={t.name} name="name" required />
        <Field label={t.email} name="email" type="email" required />
        <Field label={t.mobile} name="mobile" required />
        <Field label={t.whatsapp} name="whatsapp" required />
        <SelectField
          label={t.residencyType}
          name="residencyType"
          defaultValue="resident"
          options={[
            { value: "resident", label: t.resident },
            { value: "tourist", label: t.tourist },
          ]}
        />
        <Field
          label={t.pickupCity}
          name="pickupCity"
          placeholder={t.cityPlaceholder}
          required
        />
        <SelectField
          label={t.rentalTerm}
          name="rentalTerm"
          defaultValue="daily"
          options={[
            { value: "daily", label: t.daily },
            { value: "weekly", label: t.weekly },
            { value: "monthly", label: t.monthly },
            { value: "custom", label: t.custom },
          ]}
        />
        <SelectField
          label={t.preferredCar}
          name="preferredCar"
          defaultValue={defaultVehicle ?? vehicles[0]?.name.en ?? ""}
          options={vehicles.map((vehicle) => ({
            value: vehicle.name.en,
            label: locale === "ar" ? vehicle.name.ar : vehicle.name.en,
          }))}
        />
        <Field
          label={t.budgetBand}
          name="budgetBand"
          placeholder={t.budgetPlaceholder}
          required
        />
        <Field
          label={t.preferredDate}
          name="preferredDate"
          type="date"
          defaultValue={new Date().toISOString().split("T")[0]}
          required
        />
        <div className={compact ? "" : "sm:col-span-2"}>
          <label htmlFor="notes" className="mb-2 block text-sm text-[var(--text-muted)]">
            {t.notes}
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={4}
            placeholder={t.notesPlaceholder}
            className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-[var(--text-subtle)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          />
        </div>
      </div>

      <label className="mt-5 flex items-start gap-3 text-sm text-[var(--text-muted)]">
        <input
          type="checkbox"
          name="consent"
          value="true"
          required
          className="mt-1 h-4 w-4 rounded border-white/10 bg-black"
        />
        <span>{t.consent}</span>
      </label>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={isPending}
          onClick={() => {
            if (!isPending) {
              event({
                action: "form_submit_attempt",
                category: "inquiry",
                label: defaultVehicle ?? "general",
              });
            }
          }}
          className="rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[var(--accent-bright)] disabled:opacity-70"
        >
          {isPending ? t.sending : t.submit}
        </button>
        <a
          href={defaultWhatsappUrl}
          onClick={() => event({ action: "click_whatsapp", category: "conversion", label: "form_direct" })}
          className="rounded-full border border-white/12 px-6 py-3 text-sm font-semibold text-white transition hover:border-[var(--border-strong)]"
        >
          WhatsApp
        </a>
      </div>

      {state.message ? (
        <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center">
          <div className="mb-4 flex justify-center">
            <div className={`rounded-full p-2 ${state.success ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
              {state.success ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </div>
          </div>
          <p className="text-white font-medium mb-4">{state.message}</p>
          {state.success && state.whatsappUrl ? (
            <a
              href={state.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => event({ action: "click_whatsapp_after_success", category: "conversion", label: "form_success" })}
              className="inline-flex rounded-full bg-[var(--accent)] px-6 py-2 text-sm font-semibold text-black transition hover:bg-[var(--accent-bright)]"
            >
              {t.continueWhatsapp}
            </a>
          ) : (
            <button 
              onClick={() => setState({})}
              className="text-sm text-[var(--accent)] hover:underline"
            >
              {locale === 'ar' ? 'حاول مرة أخرى' : 'Try again'}
            </button>
          )}
        </div>
      ) : null}
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required = false,
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  defaultValue?: string;
}) {
  return (
    <div className="block">
      <label htmlFor={name} className="mb-2 block text-sm text-[var(--text-muted)]">
        {label} {required && <span aria-hidden="true">*</span>}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        aria-required={required}
        defaultValue={defaultValue}
        className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-[var(--text-subtle)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  options,
  defaultValue,
}: {
  label: string;
  name: string;
  options: Array<{ value: string; label: string }>;
  defaultValue?: string;
}) {
  return (
    <div className="block">
      <label htmlFor={name} className="mb-2 block text-sm text-[var(--text-muted)]">
        {label}
      </label>
      <select
        id={name}
        name={name}
        defaultValue={defaultValue}
        className="w-full appearance-none rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-black text-white">
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
