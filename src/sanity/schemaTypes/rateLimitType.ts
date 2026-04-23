import { defineField, defineType } from "sanity";

export const rateLimitType = defineType({
  name: "rateLimit",
  title: "Rate Limit",
  type: "document",
  fields: [
    defineField({
      name: "ip",
      type: "string",
    }),
    defineField({
      name: "count",
      type: "number",
    }),
    defineField({
      name: "resetAt",
      type: "datetime",
    }),
  ],
});
