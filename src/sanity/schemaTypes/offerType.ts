export const offerType = {
  name: "offer",
  title: "Offers",
  type: "document",
  fields: [
    { name: "nameAr", title: "Name (AR)", type: "string" },
    { name: "nameEn", title: "Name (EN)", type: "string" },
    { name: "slug", title: "Slug", type: "slug", options: { source: "nameEn" } },
    { name: "priceFrom", title: "Price From", type: "number" },
    { name: "summaryAr", title: "Summary (AR)", type: "text" },
    { name: "summaryEn", title: "Summary (EN)", type: "text" },
  ],
};
