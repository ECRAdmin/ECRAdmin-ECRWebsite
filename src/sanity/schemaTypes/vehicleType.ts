export const vehicleType = {
  name: "vehicle",
  title: "Vehicles",
  type: "document",
  fields: [
    { name: "nameAr", title: "Name (AR)", type: "string" },
    { name: "nameEn", title: "Name (EN)", type: "string" },
    { name: "slug", title: "Slug", type: "slug", options: { source: "nameEn" } },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: ["economy", "sedan", "crossover", "family", "executive"],
      },
    },
    { name: "dailyFrom", title: "Daily From", type: "number" },
    { name: "monthlyFrom", title: "Monthly From", type: "number" },
    { name: "image", title: "Image", type: "image" },
    { name: "summaryAr", title: "Summary (AR)", type: "text" },
    { name: "summaryEn", title: "Summary (EN)", type: "text" },
  ],
};
