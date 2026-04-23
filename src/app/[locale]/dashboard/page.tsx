import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { type Locale, isLocale } from "@/lib/locale";
import { sanityClient } from "@/lib/sanity/client";

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) redirect("/en/dashboard");

  const session = await auth();
  if (!session?.user) {
    redirect(`/${locale}/login`);
  }

  const typedLocale = locale as Locale;

  // Fetch bookings for the logged in user
  // For now, we fetch all bookings where email matches (simplified)
  const bookings = sanityClient
    ? await sanityClient.fetch(
        `*[_type == "booking" && customerEmail == $email] | order(startDate desc) {
          _id,
          customerName,
          startDate,
          endDate,
          status,
          totalAmount,
          vehicle->{
            nameAr,
            nameEn,
            image
          }
        }`,
        { email: session.user.email }
      )
    : [];

  const t = {
    ar: {
      title: "لوحة التحكم",
      welcome: "أهلاً بك،",
      noBookings: "ليس لديك أي حجوزات حالياً.",
      status: "الحالة",
      total: "الإجمالي",
      dates: "التواريخ",
    },
    en: {
      title: "Dashboard",
      welcome: "Welcome,",
      noBookings: "You have no bookings yet.",
      status: "Status",
      total: "Total",
      dates: "Dates",
    },
  }[typedLocale];

  return (
    <div className="py-20 shell">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="font-display text-4xl font-semibold text-white mb-2">{t.title}</h1>
          <p className="text-[var(--text-muted)]">{t.welcome} {session.user.name}</p>
        </div>
      </div>

      {bookings.length === 0 ? (
        <div className="gold-ring glass-panel rounded-[2rem] p-12 text-center">
          <p className="text-lg text-[var(--text-muted)]">{t.noBookings}</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {bookings.map((booking: any) => (
            <div key={booking._id} className="gold-ring glass-panel rounded-[2rem] p-6 flex flex-wrap gap-6 items-center">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white">
                  {typedLocale === 'ar' ? booking.vehicle?.nameAr : booking.vehicle?.nameEn}
                </h3>
                <p className="text-sm text-[var(--text-muted)] mt-1">
                  {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  booking.status === 'confirmed' ? 'bg-green-500/20 text-green-400' : 
                  booking.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-white/10 text-white'
                }`}>
                  {booking.status.toUpperCase()}
                </span>
                <p className="text-lg font-display text-white mt-2">
                  AED {booking.totalAmount}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
