"use client";

import { useState, useTransition } from "react";
import type { Locale } from "@/lib/locale";
import { formatCurrency } from "@/lib/locale";
import { event } from "@/components/common/analytics";

interface BookingFormProps {
  locale: Locale;
  vehicleId: string;
  vehicleName: string;
  dailyPrice: number;
}

const labels = {
  ar: {
    title: "حجز المركبة",
    name: "الاسم الكامل",
    email: "البريد الإلكتروني",
    phone: "رقم الجوال",
    startDate: "تاريخ الاستلام",
    endDate: "تاريخ التسليم",
    submit: "تأكيد الحجز والدفع",
    processing: "جارٍ المعالجة...",
    success: "تم استلام طلب الحجز بنجاح! سنقوم بالتواصل معك لتأكيد الدفع.",
    total: "الإجمالي التقريبي",
    days: "أيام",
  },
  en: {
    title: "Book this vehicle",
    name: "Full Name",
    email: "Email Address",
    phone: "Mobile Number",
    startDate: "Pickup Date",
    endDate: "Return Date",
    submit: "Confirm Booking & Pay",
    processing: "Processing...",
    success: "Booking request received! We will contact you to confirm payment.",
    total: "Estimated Total",
    days: "days",
  },
} as const;

export function BookingForm({
  locale,
  vehicleId,
  vehicleName,
  dailyPrice,
}: BookingFormProps) {
  const t = labels[locale];
  const [isPending, startTransition] = useTransition();
  const [state, setState] = useState<{ success?: boolean; message?: string }>({});
  
  const [dates, setDates] = useState({ start: "", end: "" });

  const calculateTotal = () => {
    if (!dates.start || !dates.end) return 0;
    const start = new Date(dates.start);
    const end = new Date(dates.end);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
    return diffDays * dailyPrice;
  };

  const total = calculateTotal();

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const payload = {
        customerName: formData.get("name"),
        customerEmail: formData.get("email"),
        customerPhone: formData.get("phone"),
        startDate: formData.get("startDate"),
        endDate: formData.get("endDate"),
        vehicleId,
        totalAmount: total,
      };

      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (!response.ok) {
        setState({ success: false, message: result.error || "Booking failed." });
        return;
      }

      event({
        action: "booking_submit_success",
        category: "booking",
        label: vehicleName,
      });

      setState({ success: true, message: t.success });
    });
  }

  if (state.success) {
    return (
      <div className="gold-ring glass-panel rounded-[2rem] p-8 text-center">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-green-500/10 p-3 text-green-500">
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <h3 className="text-2xl font-semibold text-white mb-2">{t.success}</h3>
        <p className="text-[var(--text-muted)] mb-6">
          {locale === 'ar' ? `لقد اخترت: ${vehicleName}` : `You selected: ${vehicleName}`}
        </p>
        <button 
          onClick={() => setState({})}
          className="rounded-full border border-white/10 px-6 py-2 text-sm font-semibold text-white hover:bg-white/5 transition"
        >
          {locale === 'ar' ? 'حجز آخر' : 'Book another'}
        </button>
      </div>
    );
  }

  return (
    <form action={handleSubmit} className="gold-ring glass-panel rounded-[2rem] p-6 sm:p-7">
      <h3 className="mb-6 font-display text-2xl font-semibold text-white">{t.title}</h3>
      
      <div className="grid gap-4">
        <Field label={t.name} name="name" required />
        <Field label={t.email} name="email" type="email" required />
        <Field label={t.phone} name="phone" required />
        
        <div className="grid gap-4 sm:grid-cols-2">
          <Field 
            label={t.startDate} 
            name="startDate" 
            type="date" 
            required 
            defaultValue={new Date().toISOString().split("T")[0]}
            onChange={(e) => setDates(d => ({ ...d, start: e.target.value }))}
          />
          <Field 
            label={t.endDate} 
            name="endDate" 
            type="date" 
            required 
            defaultValue={new Date(Date.now() + 86400000).toISOString().split("T")[0]}
            onChange={(e) => setDates(d => ({ ...d, end: e.target.value }))}
          />
        </div>

        {total > 0 && (
          <div className="mt-4 rounded-2xl bg-white/5 p-4 border border-white/10">
            <p className="text-sm text-[var(--text-muted)]">{t.total}</p>
            <p className="text-2xl font-display text-[var(--accent)]">
              {formatCurrency(locale, total)}
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="mt-4 w-full rounded-full bg-[var(--accent)] py-4 text-lg font-semibold text-black transition hover:bg-[var(--accent-bright)] disabled:opacity-50"
        >
          {isPending ? t.processing : t.submit}
        </button>
      </div>

      {state.message && !state.success && (
        <p className="mt-4 text-sm text-red-400">{state.message}</p>
      )}
    </form>
  );
}

function Field({ 
  label, 
  name, 
  type = "text", 
  required, 
  defaultValue,
  onChange 
}: { 
  label: string; 
  name: string; 
  type?: string; 
  required?: boolean;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-[var(--text-muted)]">{label}</span>
      <input
        type={type}
        name={name}
        required={required}
        defaultValue={defaultValue}
        onChange={onChange}
        className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-[var(--text-subtle)]"
      />
    </label>
  );
}
