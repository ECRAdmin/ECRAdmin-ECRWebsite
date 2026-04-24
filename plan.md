# PRD + Implementation Tracker لموقع Eagle Car Rental

## Summary
- الهدف: موقع عام ثنائي اللغة `AR/EN` لشركة **Eagle Car Rental / النسر لتأجير السيارات** في الإمارات، يركز على **التحويل عبر واتساب + نموذج طلب منظم** وليس الحجز والدفع المباشر في النسخة الأولى.
- التموضع المستخرج من الملفات: **هوية فاخرة بصريًا وميسّرة سعريًا**. الشعار والمواد الحالية تؤكد مزيجًا من `الثقة + الأمان + الهيبة + سهولة الوصول`. الأسطول الظاهر يتمركز حول السيارات الاقتصادية والمتوسطة: سيدان، هاتشباك، كروس أوفر، وسيارات عائلية، مع أسعار عامة تبدأ تقريبًا من `AED 50–100/day`.
- طبيعة العمل المؤسسية: النشاط ليس “عرض سيارات فقط”، بل **خدمة تنقل موثوقة** تصلح للأفراد، السياح، العائلات، والعملاء المؤسسيين وبرامج المزايا/الشراكات المحلية.
- أفضل 5 مواقع مرجعية للبنشمارك: `SelfDrive`, `OneClickDrive`, `Thrifty UAE`, `Budget UAE`, `Hertz UAE`.
- المنافسون الذين يجب اعتبارهم في الخطة: `SelfDrive`, `Shift`, `eZhire`, `Renty`, `OneClickDrive`, `Thrifty`, `Hertz`, `Budget`, `Europcar`, `Dollar`.
- الفجوة السوقية المقترحة: بناء موقع **أكثر أناقة وثقة وأخف ازدحامًا** من السوق، مع **SEO قوي**, **GEO/AI readiness**, و**طبقة MCP عامة وآمنة** دون كشف أي معلومات تشغيلية داخلية.

## PRD
- `الجمهور المستهدف:` سكان الإمارات، السياح، رجال الأعمال، العملاء الباحثون عن إيجار يومي/شهري، والشركات الباحثة عن أسطول أو تعاقد.
- `وعد المنتج:` “استئجار سهل، موثوق، وأنيق” مع تجربة أقرب إلى Apple في الإحساس الحركي، لكن مهيأة للتحويل التجاري السريع.
- `نطاق النسخة الأولى:` موقع تسويقي/تحويلي متكامل، كتالوج أسطول عام، صفحات مدن وخدمات، عروض، FAQ، محتوى SEO، تكامل واتساب ونموذج طلب، CMS، وتحليلات. لا تشمل النسخة الأولى توافرًا حيًا أو دفعًا أو حسابات عملاء.
- `الهوية البصرية:` أسود مطفي + جرافيت + ذهبي دافئ + أبيض عاجي، مع مزج بصري بين `shield / eagle / road / metal / smoke`. اللغة التصميمية تكون قوية، هادئة، ومؤسسية. يوصى بخط عرض إنجليزي مثل `Syne` مع عربي حديث مثل `Alexandria`.
- `الحركة:` Hero سينمائي، sticky sections، parallax خفيف، reveals تدريجية للأسطول، transitions مقصودة لا مبالغ فيها، ودعم كامل لـ `prefers-reduced-motion`. التنفيذ يفضل `CSS/WAAPI + GSAP ScrollTrigger` للمشاهد الرئيسية فقط.
- `هيكل الصفحات:` الصفحة الرئيسية، الأسطول، صفحة تفاصيل مركبة، الإيجار اليومي، الإيجار الشهري، التوصيل/الاستلام، الشركات والشراكات، العروض، المدن/المناطق، من نحن، FAQ، تواصل، المدونة/الأدلة، الشروط، الخصوصية.
- `قواعد النشر العام:` ينشر فقط ما يصلح للعامة: الأسطول العام، صور، أسعار “تبدأ من”، الشروط الأساسية، الوثائق المطلوبة، FAQ، مواقع الخدمة، وسائل التواصل. لا ينشر: التوافر الداخلي، أسعار العقود الخاصة، سياسات الودائع الداخلية، لوحات التشغيل، بيانات العملاء، ملفات العقود، أو مستندات KYC.
- `منطق الأسعار:` إظهار `Starting from AED X/day` و`Starting from AED Y/month` عند توفرها، مع تنبيه واضح أن السعر النهائي يتأكد بعد الطلب حسب المدة والتوفر والموقع.
- `عناصر الثقة:` شارات الخدمة، متطلبات المقيمين/السياح، التأمين الأساسي، التوصيل والاستلام، دعم العملاء، FAQ واضح، شهادات، شراكات مزايا معتمدة فقط بعد موافقة قانونية/تجارية.
- `المحتوى المحلي:` مولد صفحات مدن من الـCMS للمناطق المعتمدة فقط، مع قوالب لخدمات مثل `rent a car in dubai`, `monthly car rental`, `economy car rental`, `SUV rental`, `airport delivery`.
- `التحويل:` CTA ثابت للواتساب، CTA ثانوي للنموذج، أزرار اتصال، نماذج مختصرة في الـHero وPDP والصفحات الخدمية، ورسائل متابعة واضحة بعد الإرسال.

## Public Interfaces
- `المسارات العامة:` `/`, `/fleet`, `/fleet/[slug]`, `/daily-rental`, `/monthly-rental`, `/services/[slug]`, `/offers`, `/corporate`, `/cities/[slug]`, `/guides/[slug]`, `/faq`, `/about`, `/contact`, `/privacy`, `/terms`, `/robots.txt`, `/sitemap.xml`, `/mcp`.
- `كيانات الـCMS:` vehicles, priceBands, cities, services, offers, faqs, testimonials, branches, partnershipPrograms, blogPosts, seoFields, mediaBlocks, siteSettings.
- `بنية الطلب:` name, mobile, whatsapp, residencyType, pickupCity, rentalTerm, preferredCar, budgetBand, preferredDate, notes, consent.
- `توجيه الطلبات:` كل الطلبات تحفظ في قاعدة submissions خفيفة وتُرسل إشعارات فورية للفريق، مع زر واتساب prefilled حسب السياق.
- `الطبقة العامة للبيانات:` نفس مصدر المحتوى يغذي الموقع وواجهات JSON العامة وMCP لمنع تكرار الحقيقة.
- `MCP العام:` Remote read-only MCP endpoint على `/mcp` باستخدام `Streamable HTTP`. الأدوات/الموارد المسموح بها: `company_info`, `service_areas`, `public_fleet`, `vehicle_details`, `starting_prices`, `rental_requirements`, `faq`, `contact_channels`, `offers`. لا يوجد create-booking ولا live availability ولا بيانات خاصة.
- `أمان MCP:` rate limiting, logging, schema validation, origin checks, وفصل كامل بين namespace عام وnamespace محمي مستقبليًا. أي وظائف حساسة مستقبلية تستخدم OAuth 2.1 ولا تدخل V1.
- `SEO schema:` `Organization`, `LocalBusiness`, `WebSite`, `BreadcrumbList`, `FAQPage`, `Service`, `OfferCatalog`, و`Product/Offer` عند عرض الأسعار العامة، مع إمكانية إضافة automotive schema كمستوى إثراء إضافي.
- `SEO technical defaults:` SSR/SSG hybrid، canonical، hreflang `ar-AE/en-AE`, crawlable anchors، XML sitemaps متعددة، metadata كاملة، OG/Twitter cards، alt text مضبوط.
- `الخصوصية والـAI controls:` استخدام `noindex`, `X-Robots-Tag`, و`data-nosnippet` لأي محتوى أو ملفات لا يجب ظهورها في البحث أو استخدامها كمصدر مباشر في AI results.

## Implementation Tracker
| Phase | Priority | Deliverables |
|---|---|---|
| Research lock | Done | تثبيت التموضع، المنافسين، أفضل 5 مواقع، قرارات النطاق |
| Brand system | P0 | design tokens, typography, grid, motion rules, icon style, image treatment |
| Core experience | P0 | Home, navigation, hero, trust blocks, CTA system, footer, bilingual layout |
| Fleet catalog | P0 | fleet listing, filters, vehicle PDP, price-from badges, inquiry hooks |
| Lead capture | P0 | WhatsApp journeys, inquiry forms, validation, storage, notifications |
| CMS setup | P0 | multilingual schemas, previews, SEO fields, media workflows |
| SEO foundation | P0 | metadata, schema, sitemaps, hreflang, canonical, CWV budget |
| GEO / MCP | P0 | public content API, read-only MCP server, AI-safe exposure rules |
| Content engine | P1 | city pages, service pages, FAQ hub, guides/blog templates |
| Trust & policy | P1 | requirements, insurance basics, privacy, terms, partner-program governance |
| Analytics | P1 | GA4/Search Console/Bing, event taxonomy, lead attribution dashboard |
| Launch hardening | P1 | performance, accessibility, QA, indexation checks, fallback handling |
| Future booking engine | P2 | live availability, payments, deposits, customer dashboard, CRM sync |

## Test Plan
- التحقق من تساوي المحتوى والبنية بين `AR` و`EN` وربط `hreflang/canonical` بشكل صحيح.
- التحقق من أن جميع CTAs تنقل إما إلى واتساب بالسياق الصحيح أو إلى نموذج الطلب الصحيح من كل صفحة.
- التحقق من أن صفحات الأسطول، المدن، الخدمات، FAQ، والمقالات قابلة للأرشفة والزحف بالكامل.
- التحقق من صحة JSON-LD في Rich Results Test وصحة sitemap/robots/Search Console.
- التحقق من أن أي ملفات أو كتل حساسة غير مفهرسة باستخدام `noindex` و`data-nosnippet` و`X-Robots-Tag`.
- التحقق من أن MCP يعيد فقط البيانات العامة المسموح بها، وأنه لا يكشف availability أو rates داخلية أو بيانات تشغيلية.
- التحقق من Core Web Vitals بحد أدنى: `LCP <= 2.5s`, `INP < 200ms`, `CLS < 0.1` على الصفحات الرئيسية.
- التحقق من الأداء على الهاتف أولًا، ومن fallback الكامل عند تعطيل JavaScript أو تقليل الحركة.
- التحقق من الوصولية: contrast، keyboard navigation، aria labels، reduced motion، وترتيب heading hierarchy.
- التحقق من دقة المحتوى القانوني والتشغيلي قبل الإطلاق، خصوصًا الوثائق المطلوبة، مناطق الخدمة، وأي شعارات شراكات.

## Assumptions
- النسخة الأولى `lead-first` وليست booking engine كامل.
- الأسعار العامة ستظهر بصيغة `starting from` فقط.
- السوق المستهدف في V1 هو الإمارات، والموقع ثنائي اللغة `AR/EN`.
- الصفحات الجغرافية تنشر فقط للمناطق التي يعتمدها فريق Eagle داخل الـCMS.
- التنفيذ التقني الافتراضي: `Next.js + TypeScript + Sanity CMS + lightweight submissions backend + Vercel`.
- الشعار واللغة البصرية الحالية هي المصدر الأساسي للاتجاه الإبداعي، لكن سيتم تطويرها من “بوستر إعلاني” إلى “علامة رقمية مؤسسية”.
- أي شعارات لبرامج مزايا أو شركاء لا تنشر إلا بعد موافقة قانونية/تجارية وتوفير أصول معتمدة.
- GEO هنا يعني: `AI discoverability + machine-readable public content + controlled crawl policy + public MCP`, وليس فتح الأنظمة الخاصة أو البيانات التشغيلية للعامة.
