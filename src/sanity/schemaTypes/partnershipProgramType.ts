export const partnershipProgramType = {
  name: "partnershipProgram",
  title: "Partnership Programs",
  type: "document",
  fields: [
    { name: "titleAr", title: "Title (AR)", type: "string" },
    { name: "titleEn", title: "Title (EN)", type: "string" },
    { name: "slug", title: "Slug", type: "slug", options: { source: "titleEn" } },
    { name: "summaryAr", title: "Summary (AR)", type: "text" },
    { name: "summaryEn", title: "Summary (EN)", type: "text" },
    { name: "logo", title: "Logo", type: "image" },
    {
      name: "benefitsAr",
      title: "Benefits (AR)",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "benefitsEn",
      title: "Benefits (EN)",
      type: "array",
      of: [{ type: "string" }],
    },
  ],
};
