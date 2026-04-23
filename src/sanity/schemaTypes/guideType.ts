export const guideType = {
  name: "guide",
  title: "Guides",
  type: "document",
  fields: [
    { name: "titleAr", title: "Title (AR)", type: "string" },
    { name: "titleEn", title: "Title (EN)", type: "string" },
    { name: "slug", title: "Slug", type: "slug", options: { source: "titleEn" } },
    { name: "excerptAr", title: "Excerpt (AR)", type: "text" },
    { name: "excerptEn", title: "Excerpt (EN)", type: "text" },
    { name: "bodyAr", title: "Body (AR)", type: "array", of: [{ type: "block" }] },
    { name: "bodyEn", title: "Body (EN)", type: "array", of: [{ type: "block" }] },
  ],
};
