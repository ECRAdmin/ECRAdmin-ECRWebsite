import { defineType, defineField } from "sanity";

export const bookingType = defineType({
  name: "booking",
  title: "Bookings",
  type: "document",
  fields: [
    defineField({
      name: "customerName",
      title: "Customer Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "customerEmail",
      title: "Customer Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "customerPhone",
      title: "Customer Phone",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "vehicle",
      title: "Vehicle",
      type: "reference",
      to: [{ type: "vehicle" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "startDate",
      title: "Start Date",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "endDate",
      title: "End Date",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Confirmed", value: "confirmed" },
          { title: "Paid", value: "paid" },
          { title: "Cancelled", value: "cancelled" },
          { title: "Completed", value: "completed" },
        ],
      },
      initialValue: "pending",
    }),
    defineField({
      name: "totalAmount",
      title: "Total Amount",
      type: "number",
    }),
    defineField({
      name: "paymentStatus",
      title: "Payment Status",
      type: "string",
      options: {
        list: [
          { title: "Unpaid", value: "unpaid" },
          { title: "Partial", value: "partial" },
          { title: "Paid", value: "paid" },
          { title: "Refunded", value: "refunded" },
        ],
      },
      initialValue: "unpaid",
    }),
  ],
});
