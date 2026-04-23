import type { LocalizedText, Locale } from "@/lib/locale";
import { localize } from "@/lib/locale";
import { buildWhatsAppUrl } from "@/lib/utils";

export type VehicleCategory =
  | "economy"
  | "sedan"
  | "crossover"
  | "family"
  | "executive";

export interface Vehicle {
  slug: string;
  image: string;
  name: LocalizedText;
  category: VehicleCategory;
  badge: LocalizedText;
  excerpt: LocalizedText;
  headline: LocalizedText;
  dailyFrom: number;
  monthlyFrom: number;
  seats: number;
  bags: number;
  transmission: LocalizedText;
  fuel: LocalizedText;
  useCases: LocalizedText[];
  highlights: LocalizedText[];
  seoDescription: LocalizedText;
}

export interface ServicePage {
  slug: string;
  name: LocalizedText;
  summary: LocalizedText;
  headline: LocalizedText;
  body: LocalizedText[];
  bullets: LocalizedText[];
}

export interface CityPage {
  slug: string;
  name: LocalizedText;
  summary: LocalizedText;
  headline: LocalizedText;
  seoDescription: LocalizedText;
  neighborhoods: LocalizedText[];
  benefits: LocalizedText[];
}

export interface Offer {
  slug: string;
  name: LocalizedText;
  summary: LocalizedText;
  vehicleSlugs: string[];
  priceFrom: number;
}

export interface GuidePage {
  slug: string;
  title: LocalizedText;
  excerpt: LocalizedText;
  body: LocalizedText[];
}

export interface FaqItem {
  id: string;
  question: LocalizedText;
  answer: LocalizedText;
}

export interface Testimonial {
  id: string;
  author: LocalizedText;
  role: LocalizedText;
  quote: LocalizedText;
}

export const siteConfig = {
  siteUrl: "https://www.eaglecarrental.ae",
  company: {
    name: {
      ar: "النسر لتأجير السيارات",
      en: "Eagle Car Rental",
    },
    tagline: {
      ar: "تأجير سيارات أنيق، سريع، وموثوق في الإمارات.",
      en: "Elegant, reliable car rental across the UAE.",
    },
    description: {
      ar: "منصة تسويقية وتحويلية لعرض أسطول Eagle Car Rental وخدمات الإيجار اليومي والشهري والتوصيل والاستلام داخل الإمارات.",
      en: "A bilingual lead-first platform for Eagle Car Rental, built to showcase the fleet, drive WhatsApp inquiries, and scale public content across the UAE.",
    },
    phone: "+971557021991",
    phoneDisplay: "055-702-1991",
    whatsapp: "+971557021991",
    email: "eagle.cars@outlook.com",
    address: {
      ar: "الإمارات العربية المتحدة",
      en: "United Arab Emirates",
    },
  },
  socialProof: [
    {
      label: {
        ar: "رد سريع",
        en: "Fast response",
      },
      value: {
        ar: "خلال دقائق",
        en: "Within minutes",
      },
    },
    {
      label: {
        ar: "إيجار يومي",
        en: "Daily rental",
      },
      value: {
        ar: "يبدأ من 50 درهم",
        en: "From AED 50",
      },
    },
    {
      label: {
        ar: "تسليم واستلام",
        en: "Delivery & pickup",
      },
      value: {
        ar: "مدن مختارة في الإمارات",
        en: "Selected UAE cities",
      },
    },
    {
      label: {
        ar: "عملاء شركات",
        en: "Corporate ready",
      },
      value: {
        ar: "عقود مرنة حسب الطلب",
        en: "Flexible contracts on request",
      },
    },
  ],
  metrics: [
    {
      value: "15+",
      label: {
        ar: "سيارات جاهزة للعرض",
        en: "Public-ready vehicles",
      },
    },
    {
      value: "24/7",
      label: {
        ar: "استقبال استفسارات واتساب",
        en: "WhatsApp inquiry coverage",
      },
    },
    {
      value: "AR / EN",
      label: {
        ar: "تجربة ثنائية اللغة",
        en: "Bilingual journey",
      },
    },
  ],
  requirements: {
    resident: {
      title: {
        ar: "للمقيمين",
        en: "For UAE residents",
      },
      items: [
        {
          ar: "رخصة قيادة إماراتية سارية.",
          en: "Valid UAE driving licence.",
        },
        {
          ar: "هوية إماراتية أو إثبات إقامة ساري.",
          en: "Emirates ID or valid residence proof.",
        },
        {
          ar: "بطاقة دفع أو آلية ضمان بحسب نوع الطلب.",
          en: "Payment card or approved security arrangement depending on the request.",
        },
      ],
    },
    tourist: {
      title: {
        ar: "للسياح والزوار",
        en: "For tourists and visitors",
      },
      items: [
        {
          ar: "جواز سفر وتأشيرة أو ختم دخول ساري.",
          en: "Passport and valid visa or entry stamp.",
        },
        {
          ar: "رخصة قيادة من الدولة المؤهلة أو رخصة دولية عند الحاجة.",
          en: "Home-country licence from an eligible country or an international permit when required.",
        },
        {
          ar: "وسيلة تواصل فعالة لتأكيد التوصيل والاستلام.",
          en: "An active contact method for delivery and pickup coordination.",
        },
      ],
    },
  },
  serviceAreas: [
    { ar: "دبي", en: "Dubai" },
    { ar: "الشارقة", en: "Sharjah" },
    { ar: "أبوظبي", en: "Abu Dhabi" },
    { ar: "عجمان", en: "Ajman" },
  ],
};

export const vehicles: Vehicle[] = [
  {
    slug: "toyota-corolla-70",
    image: "/fleet/7188.png",
    name: { ar: "تويوتا كورولا", en: "Toyota Corolla" },
    category: "sedan",
    badge: { ar: "خيار يومي متوازن", en: "Balanced daily driver" },
    excerpt: {
      ar: "سيدان عملية واقتصادية تناسب التنقلات اليومية في المدينة.",
      en: "A practical sedan for city travel, errands, and everyday comfort.",
    },
    headline: {
      ar: "كورولا أنيقة للاستخدام اليومي بثقة وهدوء.",
      en: "A composed everyday sedan with efficient comfort.",
    },
    dailyFrom: 70,
    monthlyFrom: 1650,
    seats: 5,
    bags: 3,
    transmission: { ar: "أوتوماتيك", en: "Automatic" },
    fuel: { ar: "اقتصادي", en: "Fuel efficient" },
    useCases: [
      { ar: "التنقل داخل دبي والشارقة", en: "Dubai and Sharjah city driving" },
      { ar: "العمل والتنقل اليومي", en: "Commuting and business visits" },
      { ar: "إيجار أسبوعي أو شهري خفيف", en: "Short weekly or monthly use" },
    ],
    highlights: [
      { ar: "قيادة ناعمة", en: "Smooth drive" },
      { ar: "مساحة مريحة", en: "Comfortable cabin" },
      { ar: "استهلاك اقتصادي", en: "Low running cost" },
    ],
    seoDescription: {
      ar: "استئجار تويوتا كورولا في الإمارات بأسعار تبدأ من 70 درهم يوميًا مع طلب سريع عبر واتساب.",
      en: "Rent a Toyota Corolla in the UAE with daily pricing from AED 70 and quick WhatsApp inquiry support.",
    },
  },
  {
    slug: "kia-sportage-red",
    image: "/fleet/9874.png",
    name: { ar: "كيا سبورتاج", en: "Kia Sportage" },
    category: "crossover",
    badge: { ar: "SUV مميز", en: "Premium SUV feel" },
    excerpt: {
      ar: "مناسبة للعملاء الباحثين عن حضور أقوى ومساحة أعلى.",
      en: "An elevated crossover for customers who want presence and extra room.",
    },
    headline: {
      ar: "كروس أوفر عملي بمظهر قوي وإحساس مؤسسي.",
      en: "A strong crossover presence with everyday practicality.",
    },
    dailyFrom: 100,
    monthlyFrom: 2600,
    seats: 5,
    bags: 4,
    transmission: { ar: "أوتوماتيك", en: "Automatic" },
    fuel: { ar: "بنزين", en: "Petrol" },
    useCases: [
      { ar: "السفر بين المدن", en: "Inter-city trips" },
      { ar: "العائلات الصغيرة", en: "Small families" },
      { ar: "طلبات الشركات التنفيذية", en: "Executive corporate requests" },
    ],
    highlights: [
      { ar: "ارتفاع مريح", en: "Higher driving position" },
      { ar: "مساحة أكبر", en: "More cabin space" },
      { ar: "مظهر لافت", en: "Distinct visual presence" },
    ],
    seoDescription: {
      ar: "تأجير كيا سبورتاج في الإمارات بأسعار تبدأ من 100 درهم يوميًا مع خدمة استفسار فورية.",
      en: "Rent a Kia Sportage in the UAE from AED 100 per day with fast lead-first inquiry handling.",
    },
  },
  {
    slug: "nissan-sunny-silver",
    image: "/fleet/12556.png",
    name: { ar: "نيسان صني", en: "Nissan Sunny" },
    category: "economy",
    badge: { ar: "الأفضل للميزانية", en: "Best for budget" },
    excerpt: {
      ar: "السيارة الاقتصادية الأساسية للطلبات السريعة واليومية.",
      en: "A dependable economy pick for short daily requests and budget-conscious renters.",
    },
    headline: {
      ar: "خيار اقتصادي واضح وسهل للحجز والاستفسار.",
      en: "A clear, affordable rental option for everyday city mobility.",
    },
    dailyFrom: 50,
    monthlyFrom: 1250,
    seats: 5,
    bags: 3,
    transmission: { ar: "أوتوماتيك", en: "Automatic" },
    fuel: { ar: "اقتصادي جدًا", en: "Very fuel efficient" },
    useCases: [
      { ar: "الطلبات اليومية", en: "Daily errands" },
      { ar: "العمل داخل المدينة", en: "City commuting" },
      { ar: "إيجار شهري اقتصادي", en: "Budget monthly rental" },
    ],
    highlights: [
      { ar: "قيمة ممتازة", en: "Excellent value" },
      { ar: "مصاريف أقل", en: "Lower running costs" },
      { ar: "مناسبة للطلاب والموظفين", en: "Great for workers and students" },
    ],
    seoDescription: {
      ar: "استئجار نيسان صني في الإمارات بأسعار تبدأ من 50 درهم يوميًا مع إجراءات بسيطة وواضحة.",
      en: "Rent a Nissan Sunny in the UAE from AED 50 per day with a simple and clear inquiry flow.",
    },
  },
  {
    slug: "kia-sonet-charcoal",
    image: "/fleet/14897.png",
    name: { ar: "كيا سونيت", en: "Kia Sonet" },
    category: "crossover",
    badge: { ar: "مظهر عصري", en: "Modern crossover" },
    excerpt: {
      ar: "كروس أوفر مدمج يجمع بين الشكل العصري والسهولة اليومية.",
      en: "A compact crossover blending style, efficiency, and easy maneuverability.",
    },
    headline: {
      ar: "اختيار ذكي للعميل الذي يريد مرونة المدينة بمظهر أقوى.",
      en: "A smart city crossover with a bolder premium tone.",
    },
    dailyFrom: 100,
    monthlyFrom: 2400,
    seats: 5,
    bags: 3,
    transmission: { ar: "أوتوماتيك", en: "Automatic" },
    fuel: { ar: "اقتصادي", en: "Efficient" },
    useCases: [
      { ar: "الإيجار اليومي الراقي", en: "Polished daily rental" },
      { ar: "زيارات الأعمال", en: "Business appointments" },
      { ar: "عائلات صغيرة", en: "Small family travel" },
    ],
    highlights: [
      { ar: "تصميم حديث", en: "Modern design" },
      { ar: "مناسب للمدينة", en: "City friendly" },
      { ar: "فئة مرغوبة", en: "Popular category" },
    ],
    seoDescription: {
      ar: "تأجير كيا سونيت في الإمارات مع أسعار تبدأ من 100 درهم يوميًا وخدمة واتساب سريعة.",
      en: "Rent a Kia Sonet across the UAE with starting prices from AED 100 and fast WhatsApp support.",
    },
  },
  {
    slug: "toyota-corolla-white",
    image: "/fleet/22383.png",
    name: { ar: "تويوتا كورولا البيضاء", en: "Toyota Corolla White" },
    category: "sedan",
    badge: { ar: "سيدان اقتصادية أنيقة", en: "Stylish economy sedan" },
    excerpt: {
      ar: "بديل اقتصادي ومرن للمشاوير اليومية والطلبات قصيرة المدة.",
      en: "A refined economy sedan for short-term city needs and everyday use.",
    },
    headline: {
      ar: "سيدان عملية بسعر واضح وواجهة ثقة.",
      en: "A practical sedan with clear pricing and a trustworthy profile.",
    },
    dailyFrom: 60,
    monthlyFrom: 1450,
    seats: 5,
    bags: 3,
    transmission: { ar: "أوتوماتيك", en: "Automatic" },
    fuel: { ar: "اقتصادي", en: "Fuel efficient" },
    useCases: [
      { ar: "إيجار أسبوعي سريع", en: "Quick weekly rental" },
      { ar: "تنقلات العمل", en: "Business commuting" },
      { ar: "الاستخدام العائلي الخفيف", en: "Light family use" },
    ],
    highlights: [
      { ar: "طلب سهل", en: "Easy inquiry" },
      { ar: "شكل نظيف", en: "Clean visual profile" },
      { ar: "اعتمادية عالية", en: "High reliability" },
    ],
    seoDescription: {
      ar: "إيجار تويوتا كورولا في الإمارات بسعر يبدأ من 60 درهم يوميًا مع تسليم حسب الطلب.",
      en: "Book a Toyota Corolla inquiry in the UAE from AED 60 per day with flexible delivery support.",
    },
  },
  {
    slug: "kia-carens-silver",
    image: "/fleet/25698.png",
    name: { ar: "كيا كارينز", en: "Kia Carens" },
    category: "family",
    badge: { ar: "عائلية مرنة", en: "Flexible family mover" },
    excerpt: {
      ar: "مناسبة للمشاوير العائلية، المطار، والتنقل المريح بعدد ركاب أكبر.",
      en: "A flexible family vehicle suited to airport transfers and larger passenger groups.",
    },
    headline: {
      ar: "خيار عملي للعائلات والتنقلات متعددة الركاب.",
      en: "A practical choice for families and multi-passenger journeys.",
    },
    dailyFrom: 100,
    monthlyFrom: 2500,
    seats: 7,
    bags: 4,
    transmission: { ar: "أوتوماتيك", en: "Automatic" },
    fuel: { ar: "بنزين", en: "Petrol" },
    useCases: [
      { ar: "العائلات", en: "Family trips" },
      { ar: "توصيل واستلام المطار", en: "Airport delivery and pickup" },
      { ar: "زيارات الأعمال الجماعية", en: "Group business travel" },
    ],
    highlights: [
      { ar: "عدد ركاب أكبر", en: "More passenger capacity" },
      { ar: "مرونة أعلى", en: "More flexibility" },
      { ar: "راحة عائلية", en: "Family comfort" },
    ],
    seoDescription: {
      ar: "استئجار كيا كارينز في الإمارات للعائلات والسفر الداخلي بأسعار تبدأ من 100 درهم.",
      en: "Rent a Kia Carens in the UAE for family travel and airport service from AED 100.",
    },
  },
  {
    slug: "kia-sonet-blue",
    image: "/fleet/32145.png",
    name: { ar: "كيا سونيت الزرقاء", en: "Kia Sonet Blue" },
    category: "crossover",
    badge: { ar: "أكثر لفتًا", en: "More expressive" },
    excerpt: {
      ar: "نسخة بصرية جريئة من سونيت للعملاء الباحثين عن حضور مختلف.",
      en: "A bolder Sonet option for customers who want a more expressive look.",
    },
    headline: {
      ar: "كروس أوفر مدمج بمظهر شبابي وتحويل سريع.",
      en: "A youthful compact crossover with premium visual energy.",
    },
    dailyFrom: 100,
    monthlyFrom: 2400,
    seats: 5,
    bags: 3,
    transmission: { ar: "أوتوماتيك", en: "Automatic" },
    fuel: { ar: "اقتصادي", en: "Efficient" },
    useCases: [
      { ar: "العملاء الشباب", en: "Young professionals" },
      { ar: "استخدام المدينة", en: "Urban mobility" },
      { ar: "زيارات قصيرة", en: "Short multi-stop days" },
    ],
    highlights: [
      { ar: "لون مميز", en: "Distinct colorway" },
      { ar: "حجم عملي", en: "Practical size" },
      { ar: "فئة مرتفعة الطلب", en: "High-demand category" },
    ],
    seoDescription: {
      ar: "تأجير كيا سونيت في الإمارات مع أسعار تبدأ من 100 درهم يوميًا وخدمة استفسار فورية.",
      en: "Explore Kia Sonet rental in the UAE from AED 100 daily with fast WhatsApp conversion.",
    },
  },
  {
    slug: "toyota-yaris-sedan",
    image: "/fleet/32148.png",
    name: { ar: "تويوتا يارس", en: "Toyota Yaris" },
    category: "economy",
    badge: { ar: "اقتصادية ذكية", en: "Smart economy sedan" },
    excerpt: {
      ar: "خيار شائع للتنقل اليومي مع كلفة واضحة وسهولة استخدام.",
      en: "A popular low-cost option for daily mobility with predictable pricing.",
    },
    headline: {
      ar: "حل اقتصادي يركز على البساطة والكفاءة.",
      en: "An efficient solution built around simplicity and savings.",
    },
    dailyFrom: 60,
    monthlyFrom: 1400,
    seats: 5,
    bags: 2,
    transmission: { ar: "أوتوماتيك", en: "Automatic" },
    fuel: { ar: "اقتصادي", en: "Fuel efficient" },
    useCases: [
      { ar: "العمل اليومي", en: "Daily work travel" },
      { ar: "الإيجار الأسبوعي", en: "Weekly rental" },
      { ar: "الطلبات السريعة", en: "Quick turnaround requests" },
    ],
    highlights: [
      { ar: "سعر منافس", en: "Competitive price" },
      { ar: "استهلاك منخفض", en: "Low fuel usage" },
      { ar: "اعتمادية يابانية", en: "Japanese reliability" },
    ],
    seoDescription: {
      ar: "إيجار تويوتا يارس في الإمارات بأسعار تبدأ من 60 درهم يوميًا للعمل والتنقل اليومي.",
      en: "Rent a Toyota Yaris in the UAE from AED 60 per day for commuting and city trips.",
    },
  },
  {
    slug: "nissan-altima-silver",
    image: "/fleet/56834.png",
    name: { ar: "نيسان ألتيما", en: "Nissan Altima" },
    category: "executive",
    badge: { ar: "تنفيذي يومي", en: "Executive daily sedan" },
    excerpt: {
      ar: "سيارة أكثر هدوءًا وفخامة للعميل الفردي أو التنفيذي.",
      en: "A more refined sedan for business use, airport runs, and executive comfort.",
    },
    headline: {
      ar: "مستوى أعلى من الراحة للحجوزات العملية الراقية.",
      en: "Elevated comfort for polished, business-ready mobility.",
    },
    dailyFrom: 90,
    monthlyFrom: 2200,
    seats: 5,
    bags: 3,
    transmission: { ar: "أوتوماتيك", en: "Automatic" },
    fuel: { ar: "اقتصادي نسبيًا", en: "Balanced efficiency" },
    useCases: [
      { ar: "المطار والاجتماعات", en: "Airport and meetings" },
      { ar: "إيجار تنفيذي", en: "Executive rental" },
      { ar: "القيادة المريحة لمسافات أطول", en: "Longer comfortable drives" },
    ],
    highlights: [
      { ar: "مقصورة أهدأ", en: "Quieter cabin" },
      { ar: "هيئة تنفيذية", en: "Executive look" },
      { ar: "راحة أعلى", en: "Enhanced comfort" },
    ],
    seoDescription: {
      ar: "تأجير نيسان ألتيما في الإمارات بأسعار تبدأ من 90 درهم يوميًا للطلبات التنفيذية والراقية.",
      en: "Rent a Nissan Altima in the UAE from AED 90 daily for executive and premium requests.",
    },
  },
  {
    slug: "nissan-altima-black",
    image: "/fleet/58634...png",
    name: { ar: "نيسان ألتيما السوداء", en: "Nissan Altima Black" },
    category: "executive",
    badge: { ar: "مظهر رسمي", en: "Formal presence" },
    excerpt: {
      ar: "نسخة سوداء أنيقة مناسبة للزيارات والاجتماعات والتنقلات الهادئة.",
      en: "A darker executive profile for meetings, events, and composed city travel.",
    },
    headline: {
      ar: "اختيار تنفيذي أكثر رسمية وأناقة.",
      en: "A more formal executive choice with premium appeal.",
    },
    dailyFrom: 90,
    monthlyFrom: 2200,
    seats: 5,
    bags: 3,
    transmission: { ar: "أوتوماتيك", en: "Automatic" },
    fuel: { ar: "اقتصادي نسبيًا", en: "Balanced efficiency" },
    useCases: [
      { ar: "الاجتماعات", en: "Meetings and visits" },
      { ar: "خدمة VIP الخفيفة", en: "Light VIP use" },
      { ar: "التنقل الراقي", en: "Premium city mobility" },
    ],
    highlights: [
      { ar: "مظهر رسمي", en: "Formal appearance" },
      { ar: "راحة تنفيذية", en: "Executive comfort" },
      { ar: "طلب مناسب للشركات", en: "Corporate-friendly option" },
    ],
    seoDescription: {
      ar: "إيجار نيسان ألتيما السوداء في الإمارات بسعر يبدأ من 90 درهم يوميًا.",
      en: "Rent a black Nissan Altima in the UAE from AED 90 per day for premium executive use.",
    },
  },
  {
    slug: "kia-carens-blue",
    image: "/fleet/67207.png",
    name: { ar: "كيا كارينز الزرقاء", en: "Kia Carens Blue" },
    category: "family",
    badge: { ar: "عائلية راقية", en: "Refined family rental" },
    excerpt: {
      ar: "حل عائلي مريح مناسب للمشاوير الأطول والتوصيل من وإلى المطار.",
      en: "A refined people mover for family plans, airport runs, and longer city coverage.",
    },
    headline: {
      ar: "راحة أكبر للعائلات والتنقلات متعددة الوجهات.",
      en: "Comfort and flexibility for larger travel plans.",
    },
    dailyFrom: 100,
    monthlyFrom: 2500,
    seats: 7,
    bags: 4,
    transmission: { ar: "أوتوماتيك", en: "Automatic" },
    fuel: { ar: "بنزين", en: "Petrol" },
    useCases: [
      { ar: "استقبال المطار", en: "Airport arrivals" },
      { ar: "مشاوير العائلة", en: "Family errands" },
      { ar: "طلبات الشركات الصغيرة", en: "Small team transport" },
    ],
    highlights: [
      { ar: "عدد مقاعد أكبر", en: "Higher seating capacity" },
      { ar: "مناسب للحقائب", en: "Better luggage handling" },
      { ar: "فئة متعددة الاستخدام", en: "Versatile category" },
    ],
    seoDescription: {
      ar: "استئجار كيا كارينز في الإمارات للعائلات وخدمة المطار بأسعار تبدأ من 100 درهم.",
      en: "Rent a Kia Carens in the UAE for family and airport mobility from AED 100.",
    },
  },
  {
    slug: "kia-pegas-blue",
    image: "/fleet/71085...png",
    name: { ar: "كيا بيجاس", en: "Kia Pegas" },
    category: "sedan",
    badge: { ar: "قيمة يومية", en: "Daily value" },
    excerpt: {
      ar: "سيدان عملية تناسب الاستخدام اليومي بسعر متوسط وواضح.",
      en: "A value-focused sedan for practical day-to-day rental needs.",
    },
    headline: {
      ar: "حل مرن بين الفئة الاقتصادية والفئة المتوسطة.",
      en: "A well-priced bridge between economy and comfort.",
    },
    dailyFrom: 70,
    monthlyFrom: 1600,
    seats: 5,
    bags: 3,
    transmission: { ar: "أوتوماتيك", en: "Automatic" },
    fuel: { ar: "اقتصادي", en: "Fuel efficient" },
    useCases: [
      { ar: "العمل والتنقل", en: "Work and commuting" },
      { ar: "الطلبات اليومية", en: "Daily demand" },
      { ar: "العملاء الباحثون عن توازن السعر", en: "Price-balanced requests" },
    ],
    highlights: [
      { ar: "قيمة جيدة", en: "Good value" },
      { ar: "قيادة مريحة", en: "Comfortable ride" },
      { ar: "فئة مطلوبة", en: "High utility segment" },
    ],
    seoDescription: {
      ar: "إيجار كيا بيجاس في الإمارات بأسعار تبدأ من 70 درهم يوميًا مع استجابة سريعة.",
      en: "Rent a Kia Pegas in the UAE from AED 70 per day with fast WhatsApp inquiry support.",
    },
  },
  {
    slug: "kia-sonet-white",
    image: "/fleet/71286.png",
    name: { ar: "كيا سونيت البيضاء", en: "Kia Sonet White" },
    category: "crossover",
    badge: { ar: "كروس أوفر نظيف", en: "Clean crossover look" },
    excerpt: {
      ar: "لمن يريد إحساس SUV مدمج مع مظهر نظيف وواجهة عرض قوية.",
      en: "A compact SUV-like option with a clean premium tone and practical size.",
    },
    headline: {
      ar: "كروس أوفر أنيق مناسب للعامة والإعلانات في آن واحد.",
      en: "A crossover that feels both public-friendly and campaign-ready.",
    },
    dailyFrom: 100,
    monthlyFrom: 2400,
    seats: 5,
    bags: 3,
    transmission: { ar: "أوتوماتيك", en: "Automatic" },
    fuel: { ar: "اقتصادي", en: "Efficient" },
    useCases: [
      { ar: "المدينة", en: "City use" },
      { ar: "المشاوير الراقية", en: "Polished day trips" },
      { ar: "العملاء السياح", en: "Tourist requests" },
    ],
    highlights: [
      { ar: "مظهر جذاب", en: "Strong visual appeal" },
      { ar: "ثقة أعلى", en: "Premium perception" },
      { ar: "حجم مناسب", en: "Balanced size" },
    ],
    seoDescription: {
      ar: "استئجار كيا سونيت في الإمارات بأسعار تبدأ من 100 درهم يوميًا داخل موقع ثنائي اللغة.",
      en: "Rent a Kia Sonet in the UAE from AED 100 a day through a bilingual lead-first experience.",
    },
  },
  {
    slug: "toyota-yaris-hatch",
    image: "/fleet/71921.png",
    name: { ar: "تويوتا يارس هاتشباك", en: "Toyota Yaris Hatchback" },
    category: "economy",
    badge: { ar: "مدمجة مرنة", en: "Compact and agile" },
    excerpt: {
      ar: "خيار صغير وعملي للمشاوير السريعة والقيادة داخل المدينة.",
      en: "A nimble compact option for quick city trips and everyday errands.",
    },
    headline: {
      ar: "حل صغير وذكي للميزانية والتنقل المرن.",
      en: "A compact budget choice for easy urban mobility.",
    },
    dailyFrom: 50,
    monthlyFrom: 1300,
    seats: 5,
    bags: 2,
    transmission: { ar: "أوتوماتيك", en: "Automatic" },
    fuel: { ar: "اقتصادي جدًا", en: "Highly efficient" },
    useCases: [
      { ar: "وسط المدينة", en: "Downtown driving" },
      { ar: "الطلبات الفردية", en: "Solo renters" },
      { ar: "المدد القصيرة", en: "Short-term rental" },
    ],
    highlights: [
      { ar: "سهلة الركن", en: "Easy to park" },
      { ar: "كلفة أقل", en: "Lower cost" },
      { ar: "سريعة الطلب", en: "Fast to request" },
    ],
    seoDescription: {
      ar: "تأجير تويوتا يارس هاتشباك في الإمارات بأسعار تبدأ من 50 درهم يوميًا.",
      en: "Rent a Toyota Yaris hatchback in the UAE from AED 50 per day for flexible city use.",
    },
  },
  {
    slug: "kia-picanto-white",
    image: "/fleet/81096.png",
    name: { ar: "كيا بيكانتو", en: "Kia Picanto" },
    category: "economy",
    badge: { ar: "أصغر خيار", en: "Ultra-compact choice" },
    excerpt: {
      ar: "مثالية للمدينة والميزانية والتنقل السريع داخل المناطق الحيوية.",
      en: "Ideal for city lanes, quick errands, and an ultra-efficient budget profile.",
    },
    headline: {
      ar: "سيارة مدينة صغيرة بخط سير واضح وسريع.",
      en: "A pure city car with minimal cost and maximum convenience.",
    },
    dailyFrom: 60,
    monthlyFrom: 1350,
    seats: 4,
    bags: 2,
    transmission: { ar: "أوتوماتيك", en: "Automatic" },
    fuel: { ar: "اقتصادي جدًا", en: "Very efficient" },
    useCases: [
      { ar: "المدينة الداخلية", en: "Inner-city travel" },
      { ar: "العمل القصير", en: "Short errands" },
      { ar: "العملاء الباحثون عن أقل كلفة", en: "Lowest-cost requests" },
    ],
    highlights: [
      { ar: "حجم صغير", en: "Small footprint" },
      { ar: "سهل في الزحام", en: "Traffic friendly" },
      { ar: "اقتصادي للغاية", en: "Highly affordable" },
    ],
    seoDescription: {
      ar: "استئجار كيا بيكانتو في الإمارات بسعر يبدأ من 60 درهم يوميًا للتنقل داخل المدينة.",
      en: "Rent a Kia Picanto in the UAE from AED 60 daily for compact city-friendly mobility.",
    },
  },
];

export const services: ServicePage[] = [
  {
    slug: "economy-rental",
    name: { ar: "الإيجار الاقتصادي", en: "Economy Rental" },
    summary: {
      ar: "خدمة موجهة للطلبات اليومية والميزانيات الواضحة مع سيارات اقتصادية وعملية.",
      en: "A service for daily renters seeking practical vehicles and clear entry pricing.",
    },
    headline: {
      ar: "أسطول اقتصادي مصمم للتحويل السريع والطلب الواضح.",
      en: "An economy fleet engineered for quick conversion and clear customer intent.",
    },
    body: [
      {
        ar: "نركز على السيارات الاقتصادية الأكثر طلبًا في السوق الإماراتي مثل صني ويارس وبيكانتو، مع إبراز السعر الابتدائي ووضوح خطوات الطلب.",
        en: "We spotlight high-demand UAE economy models like Sunny, Yaris, and Picanto with clear starting prices and a fast inquiry flow.",
      },
      {
        ar: "هذه الصفحة تعمل كوجهة SEO لخدمة الباحثين عن cheap rent a car و economy car rental UAE.",
        en: "This page works as a strong SEO destination for users searching economy car rental and budget mobility intent.",
      },
    ],
    bullets: [
      { ar: "أسعار تبدأ من 50 درهم يوميًا", en: "Starting from AED 50 per day" },
      { ar: "خيارات يومية وشهرية", en: "Daily and monthly options" },
      { ar: "طلب سريع عبر واتساب أو النموذج", en: "Quick WhatsApp or form-based inquiry" },
    ],
  },
  {
    slug: "airport-delivery",
    name: { ar: "التوصيل والاستلام من المطار", en: "Airport Delivery" },
    summary: {
      ar: "تنسيق توصيل واستلام للمطار ومناطق الوصول حسب الطلب وتوفر الخدمة.",
      en: "Airport delivery and pickup coordination based on request details and service availability.",
    },
    headline: {
      ar: "خدمة مصممة للسياح والزوار والتنقلات الحساسة زمنيًا.",
      en: "A service tailored for tourists, visitors, and time-sensitive arrivals.",
    },
    body: [
      {
        ar: "هذه الصفحة تبني الثقة قبل التحويل: ما هي الوثائق المطلوبة، كيف يتم التنسيق، وكيف يصل العميل إلى السيارة بسرعة.",
        en: "This page builds trust before conversion: what documents are needed, how delivery is coordinated, and how quickly the customer can get moving.",
      },
      {
        ar: "يتم ربطها بخيارات عائلية واقتصادية وبصفحات المدن لزيادة قوة المحتوى المحلي.",
        en: "It connects to both family and economy options as well as city pages to strengthen local search coverage.",
      },
    ],
    bullets: [
      { ar: "تنسيق مسبق عبر واتساب", en: "Pre-arrival WhatsApp coordination" },
      { ar: "للزوار والمقيمين", en: "For tourists and residents" },
      { ar: "مناطق خدمة معتمدة فقط", en: "Approved service zones only" },
    ],
  },
  {
    slug: "corporate-rental",
    name: { ar: "حلول الشركات", en: "Corporate Rental" },
    summary: {
      ar: "حلول للشركات والفرق والمشاريع مع عقود مرنة وتواصل مباشر وسريع.",
      en: "Flexible rental solutions for teams, projects, and business accounts.",
    },
    headline: {
      ar: "واجهة مؤسسية واضحة للشركات الباحثة عن سرعة وثقة ومرونة.",
      en: "A credible corporate surface for businesses that need speed, trust, and flexibility.",
    },
    body: [
      {
        ar: "هذه الخدمة لا تعرض تفاصيل الأسعار الخاصة أو الشروط الداخلية، بل تركز على القيمة، سرعة الاستجابة، والقدرة على التخصيص.",
        en: "This service deliberately avoids exposing private rates or internal commercial policies, focusing instead on responsiveness and customization.",
      },
      {
        ar: "الصفحة توجه العميل التجاري إلى نموذج مخصص مع حقول تنظم نوع الاستخدام والمدة والموقع.",
        en: "The page routes business intent into a structured form with fields tailored to usage type, duration, and location.",
      },
    ],
    bullets: [
      { ar: "استجابة مخصصة للشركات", en: "Dedicated response for business accounts" },
      { ar: "مرونة يومية وشهرية", en: "Daily and monthly flexibility" },
      { ar: "طلبات تعاقد عبر نموذج منظم", en: "Structured lead intake for contracts" },
    ],
  },
];

export const cityPages: CityPage[] = [
  {
    slug: "dubai",
    name: { ar: "دبي", en: "Dubai" },
    summary: {
      ar: "محتوى محلي لخدمة الإيجار داخل دبي مع تركيز على التوصيل، المطارات، والمناطق الحيوية.",
      en: "Localized rental content for Dubai, focused on delivery zones, airports, and high-intent districts.",
    },
    headline: {
      ar: "استئجار سيارة في دبي بتجربة أسرع وأكثر أناقة.",
      en: "Rent a car in Dubai with a faster, more refined public journey.",
    },
    seoDescription: {
      ar: "استئجار سيارة في دبي من Eagle Car Rental مع أسعار تبدأ من 50 درهم يوميًا وخدمة استفسار سريعة.",
      en: "Rent a car in Dubai with Eagle Car Rental, starting from AED 50 daily with rapid WhatsApp support.",
    },
    neighborhoods: [
      { ar: "المطار", en: "Airport area" },
      { ar: "مارينا", en: "Dubai Marina" },
      { ar: "داون تاون", en: "Downtown" },
      { ar: "الخليج التجاري", en: "Business Bay" },
    ],
    benefits: [
      { ar: "تغطية محتوى لمحركات البحث المحلية", en: "Local SEO-focused content" },
      { ar: "ربط مباشر بالعروض والأسطول", en: "Direct links to offers and fleet" },
      { ar: "تحويل سريع عبر واتساب", en: "Fast conversion through WhatsApp" },
    ],
  },
  {
    slug: "sharjah",
    name: { ar: "الشارقة", en: "Sharjah" },
    summary: {
      ar: "خدمة مناسبة للعملاء الباحثين عن تنقل يومي وشهري بين الشارقة ودبي.",
      en: "A practical entry point for customers commuting between Sharjah and Dubai.",
    },
    headline: {
      ar: "حلول إيجار واضحة للشارقة والتنقل اليومي بين الإمارات.",
      en: "Clear rental solutions for Sharjah and inter-emirate mobility.",
    },
    seoDescription: {
      ar: "استئجار سيارة في الشارقة من Eagle Car Rental مع خيارات اقتصادية وشهرية.",
      en: "Rent a car in Sharjah with Eagle Car Rental, including economy and monthly options.",
    },
    neighborhoods: [
      { ar: "النهدة", en: "Al Nahda" },
      { ar: "المجاز", en: "Al Majaz" },
      { ar: "الخان", en: "Al Khan" },
      { ar: "الجامعة", en: "University City" },
    ],
    benefits: [
      { ar: "مناسب للمقيمين", en: "Resident-friendly positioning" },
      { ar: "خيارات شهرية اقتصادية", en: "Strong monthly value" },
      { ar: "تجربة ثنائية اللغة", en: "Bilingual experience" },
    ],
  },
  {
    slug: "abu-dhabi",
    name: { ar: "أبوظبي", en: "Abu Dhabi" },
    summary: {
      ar: "صفحة مخصصة للعملاء التنفيذيين والعائلات والطلبات التي تحتاج تنسيقًا أدق.",
      en: "A city page aimed at executive renters, family needs, and more coordinated mobility requests.",
    },
    headline: {
      ar: "إيجار سيارة في أبوظبي بخطاب أكثر ثقة وتنظيمًا.",
      en: "A more structured and premium rental experience for Abu Dhabi.",
    },
    seoDescription: {
      ar: "استئجار سيارة في أبوظبي من Eagle Car Rental مع خيارات اقتصادية وتنفيذية وعائلية.",
      en: "Rent a car in Abu Dhabi with Eagle Car Rental across economy, executive, and family categories.",
    },
    neighborhoods: [
      { ar: "الكورنيش", en: "Corniche" },
      { ar: "جزيرة ياس", en: "Yas Island" },
      { ar: "الخالدية", en: "Khalidiya" },
      { ar: "المطار", en: "Airport district" },
    ],
    benefits: [
      { ar: "ملائم للطلبات التنفيذية", en: "Well suited to executive requests" },
      { ar: "خيارات عائلية ومطار", en: "Family and airport options" },
      { ar: "واجهة ثقة مؤسسية", en: "Corporate-grade trust signals" },
    ],
  },
];

export const offers: Offer[] = [
  {
    slug: "budget-city-selection",
    name: { ar: "باقة المدينة الاقتصادية", en: "Budget City Selection" },
    summary: {
      ar: "مجموعة سيارات اقتصادية مختارة لطلبات المدينة اليومية والشهرية.",
      en: "A curated economy selection for city use and monthly affordability.",
    },
    vehicleSlugs: ["nissan-sunny-silver", "toyota-yaris-hatch", "kia-picanto-white"],
    priceFrom: 50,
  },
  {
    slug: "smart-suv-lineup",
    name: { ar: "فئة SUV الذكية", en: "Smart SUV Lineup" },
    summary: {
      ar: "كروس أوفر مدمجة تجمع بين الشكل والسعر والتوافر العام.",
      en: "Compact crossovers balancing presence, practicality, and public-friendly pricing.",
    },
    vehicleSlugs: ["kia-sonet-charcoal", "kia-sonet-blue", "kia-sonet-white"],
    priceFrom: 100,
  },
  {
    slug: "family-airport-mobility",
    name: { ar: "حلول العائلة والمطار", en: "Family & Airport Mobility" },
    summary: {
      ar: "خيارات مرنة للعائلات وخدمة التوصيل والاستلام عند الحاجة.",
      en: "Flexible options for family plans and airport-focused mobility requests.",
    },
    vehicleSlugs: ["kia-carens-silver", "kia-carens-blue"],
    priceFrom: 100,
  },
];

export const guides: GuidePage[] = [
  {
    slug: "rent-a-car-dubai-guide",
    title: {
      ar: "دليل استئجار سيارة في دبي",
      en: "Rent a Car in Dubai Guide",
    },
    excerpt: {
      ar: "ما الذي يجب أن يعرفه العميل قبل استئجار سيارة داخل دبي؟",
      en: "What should customers know before renting a car in Dubai?",
    },
    body: [
      {
        ar: "أهم ما يبحث عنه العميل هو الوضوح: السعر الابتدائي، الوثائق المطلوبة، مناطق الخدمة، وكيفية التواصل السريع.",
        en: "Customers usually care first about clarity: starting price, required documents, service areas, and a fast way to reach the team.",
      },
      {
        ar: "الصفحة يجب أن تربط بين الكلمات المحلية، الأسطول، ونموذج الاستفسار بدون إغراق بصري أو معلومات تشغيلية حساسة.",
        en: "The guide should connect local search intent to the fleet and inquiry journey without exposing sensitive operational detail.",
      },
    ],
  },
  {
    slug: "monthly-car-rental-uae",
    title: {
      ar: "متى يكون الإيجار الشهري أفضل من اليومي؟",
      en: "When Is Monthly Rental Better Than Daily?",
    },
    excerpt: {
      ar: "شرح مبسط لمزايا الإيجار الشهري للفرد والشركة.",
      en: "A practical explanation of monthly rental benefits for individuals and businesses.",
    },
    body: [
      {
        ar: "الإيجار الشهري يناسب المقيمين، فرق المشاريع، والعملاء الباحثين عن تكلفة أقل على المدى المتوسط.",
        en: "Monthly rental works well for residents, project teams, and customers seeking stronger medium-term value.",
      },
      {
        ar: "يجب أن تعرض الصفحة فئات السعر العامة فقط مع دعوة واضحة للتواصل حسب نوع الطلب.",
        en: "The page should only show public pricing bands and a clear call to request a tailored quote.",
      },
    ],
  },
  {
    slug: "tourist-rental-documents",
    title: {
      ar: "وثائق السائح لاستئجار سيارة في الإمارات",
      en: "Tourist Documents for Car Rental in the UAE",
    },
    excerpt: {
      ar: "نظرة سريعة على الوثائق التي يحتاجها الزائر قبل التواصل.",
      en: "A quick overview of the documents visitors should prepare before contacting the team.",
    },
    body: [
      {
        ar: "وجود هذه الصفحة يختصر الكثير من الاستفسارات المتكررة ويعزز ثقة الزوار من محركات البحث والنتائج الذكية.",
        en: "This guide reduces repetitive questions and strengthens trust from both search engines and AI-powered results.",
      },
      {
        ar: "يجب أن يبقى المحتوى توجيهيًا وواضحًا دون نشر أي سياسات داخلية غير مخصصة للعامة.",
        en: "The content should stay helpful and clear without exposing any internal or non-public policy details.",
      },
    ],
  },
];

export const faqs: FaqItem[] = [
  {
    id: "faq-1",
    question: {
      ar: "هل يمكنني الطلب مباشرة عبر واتساب؟",
      en: "Can I request a car directly over WhatsApp?",
    },
    answer: {
      ar: "نعم، الموقع مصمم بحيث تكون واتساب هي القناة الأسرع، مع نموذج منظم للحالات التي تحتاج تفاصيل إضافية.",
      en: "Yes. The site is designed around WhatsApp as the fastest conversion channel, with a structured inquiry form for richer requests.",
    },
  },
  {
    id: "faq-2",
    question: {
      ar: "هل الأسعار نهائية؟",
      en: "Are the prices final?",
    },
    answer: {
      ar: "الأسعار المعروضة هي أسعار تبدأ من، ويتم تأكيد السعر النهائي حسب المدة، السيارة، الموقع، وتوفر الخدمة.",
      en: "Displayed prices are starting-from rates. Final pricing is confirmed based on duration, vehicle, location, and service availability.",
    },
  },
  {
    id: "faq-3",
    question: {
      ar: "هل تقدمون الإيجار الشهري؟",
      en: "Do you offer monthly rental?",
    },
    answer: {
      ar: "نعم، لدينا خيارات شهرية للسيارات الاقتصادية والمتوسطة والعائلية حسب نوع الطلب.",
      en: "Yes. We offer monthly options across economy, mid-range, and family categories depending on the request.",
    },
  },
  {
    id: "faq-4",
    question: {
      ar: "هل يوجد توصيل واستلام؟",
      en: "Do you provide delivery and pickup?",
    },
    answer: {
      ar: "نعم، في مناطق خدمة معتمدة ووفق تنسيق مسبق عبر فريق Eagle Car Rental.",
      en: "Yes, in approved service areas and with prior coordination through the Eagle Car Rental team.",
    },
  },
  {
    id: "faq-5",
    question: {
      ar: "هل يمكن للشركات التعاقد معكم؟",
      en: "Can businesses request corporate rental arrangements?",
    },
    answer: {
      ar: "نعم، الموقع يتضمن مسارًا مخصصًا لطلبات الشركات والعقود المرنة دون نشر الأسعار الخاصة للعامة.",
      en: "Yes. The site includes a dedicated corporate pathway without exposing private commercial pricing publicly.",
    },
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "t-1",
    author: { ar: "عميل أعمال", en: "Business customer" },
    role: { ar: "تنقل أسبوعي", en: "Weekly mobility" },
    quote: {
      ar: "الرد كان سريعًا جدًا، والسيارة كانت مناسبة تمامًا لطبيعة المشاوير.",
      en: "The response was fast and the vehicle matched the job perfectly.",
    },
  },
  {
    id: "t-2",
    author: { ar: "عميلة مقيمة", en: "Resident customer" },
    role: { ar: "إيجار شهري", en: "Monthly rental" },
    quote: {
      ar: "أكثر شيء أعجبني هو وضوح المعلومات وسهولة التواصل عبر واتساب.",
      en: "What stood out most was the clarity of the information and the ease of WhatsApp communication.",
    },
  },
  {
    id: "t-3",
    author: { ar: "عميل زائر", en: "Visitor" },
    role: { ar: "استلام من المطار", en: "Airport coordination" },
    quote: {
      ar: "الرحلة كانت أسهل لأن كل التفاصيل الأساسية كانت واضحة من البداية.",
      en: "The trip felt easier because the essential details were clear from the start.",
    },
  },
];

export const navigation = {
  primary: [
    { href: "", label: { ar: "الرئيسية", en: "Home" } },
    { href: "/fleet", label: { ar: "الأسطول", en: "Fleet" } },
    { href: "/daily-rental", label: { ar: "إيجار يومي", en: "Daily" } },
    { href: "/monthly-rental", label: { ar: "إيجار شهري", en: "Monthly" } },
    { href: "/offers", label: { ar: "العروض", en: "Offers" } },
    { href: "/corporate", label: { ar: "الشركات", en: "Corporate" } },
    { href: "/contact", label: { ar: "تواصل", en: "Contact" } },
  ],
  footer: [
    { href: "/about", label: { ar: "من نحن", en: "About" } },
    { href: "/faq", label: { ar: "الأسئلة الشائعة", en: "FAQ" } },
    { href: "/privacy", label: { ar: "الخصوصية", en: "Privacy" } },
    { href: "/terms", label: { ar: "الشروط", en: "Terms" } },
  ],
};

export function getVehicleBySlug(slug: string) {
  return vehicles.find((vehicle) => vehicle.slug === slug);
}

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function getCityBySlug(slug: string) {
  return cityPages.find((city) => city.slug === slug);
}

export function getGuideBySlug(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}

export function buildInquiryMessage(locale: Locale, vehicleName?: string) {
  const intro =
    locale === "ar"
      ? "مرحبًا، أرغب في الاستفسار عن "
      : "Hello, I would like to inquire about ";
  const vehicleLabel =
    vehicleName ??
    (locale === "ar" ? "تأجير سيارة من Eagle Car Rental" : "an Eagle Car Rental vehicle");
  const suffix =
    locale === "ar"
      ? ". أحتاج تفاصيل السعر والتوفر وخيارات التوصيل."
      : ". I need pricing, availability, and delivery details.";

  return buildWhatsAppUrl(siteConfig.company.whatsapp, `${intro}${vehicleLabel}${suffix}`);
}

export function publicVehicleSummary(locale: Locale, vehicle: Vehicle) {
  return {
    slug: vehicle.slug,
    name: localize(locale, vehicle.name),
    category: vehicle.category,
    badge: localize(locale, vehicle.badge),
    excerpt: localize(locale, vehicle.excerpt),
    headline: localize(locale, vehicle.headline),
    image: vehicle.image,
    dailyFrom: vehicle.dailyFrom,
    monthlyFrom: vehicle.monthlyFrom,
    seats: vehicle.seats,
    bags: vehicle.bags,
    transmission: localize(locale, vehicle.transmission),
    fuel: localize(locale, vehicle.fuel),
    useCases: vehicle.useCases.map((item) => localize(locale, item)),
    highlights: vehicle.highlights.map((item) => localize(locale, item)),
  };
}

export function publicFaq(locale: Locale) {
  return faqs.map((item) => ({
    id: item.id,
    question: localize(locale, item.question),
    answer: localize(locale, item.answer),
  }));
}
