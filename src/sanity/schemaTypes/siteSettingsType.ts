export const siteSettingsType = {
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    { name: "companyNameAr", title: "Company Name (AR)", type: "string" },
    { name: "companyNameEn", title: "Company Name (EN)", type: "string" },
    { name: "phone", title: "Phone", type: "string" },
    { name: "whatsapp", title: "WhatsApp", type: "string" },
    { name: "email", title: "Email", type: "string" },
    { name: "seoDescriptionAr", title: "SEO Description (AR)", type: "text" },
    { name: "seoDescriptionEn", title: "SEO Description (EN)", type: "text" },
  ],
};
