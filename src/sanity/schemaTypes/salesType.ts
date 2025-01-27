import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from "@/types/languages";
import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const salesType = defineType({
  name: "sale",
  title: "Sale",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "langSelector",
      title: "Language Selector",
      type: "string",
      options: {
        list: SUPPORTED_LANGUAGES.map((lang) => ({
          title: lang.label,
          value: lang.code,
        })),
        layout: "radio",
      },
      initialValue: DEFAULT_LANGUAGE,
    }),
    ...SUPPORTED_LANGUAGES.map((lang) =>
      defineField({
        name: `title_${lang.code}`,
        title: `Title -${lang.label}`,
        type: "string",
        hidden: ({ parent }) => parent?.langSelector !== lang.code,
        validation: (Rule) =>
          lang.code === DEFAULT_LANGUAGE
            ? Rule.required().min(1).error("Default language title is required.")
            : Rule.max(500),
      })
    ),
    ...SUPPORTED_LANGUAGES.map((lang) =>
      defineField({
        name: `description_${lang.code}`,
        title: `Description -${lang.label}`,
        type: "text",
        hidden: ({ parent }) => parent?.langSelector !== lang.code,
        validation: (Rule) =>
          lang.code === DEFAULT_LANGUAGE
            ? Rule.required().min(1).error("Default language description is required.")
            : Rule.max(200),
      })
    ),
    defineField({
      name: "discountAmount",
      title: "Discount Amount",
      type: "number",
      description: "Amount in percentage or fixed value",
    }),
    defineField({
      name: "couponCode",
      title: "Coupon Code",
      type: "string",
    }),
    defineField({
      name: "startDate",
      title: "Start Date",
      type: "datetime",
    }),
    defineField({
      name: "endDate",
      title: "End Date",
      type: "datetime",
    }),
    defineField({
      name: "isActive",
      title: "Is Active",
      type: "boolean",
      description: "Toggle on/off",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: `title_${DEFAULT_LANGUAGE}`,
      discountAmount: "discountAmount",
      couponCode: "couponCode",
      isActive: "isActive",
    },
    prepare(select) {
      const { title, discountAmount, couponCode, isActive } = select;
      const status = isActive ? "Active" : "Inactive";
      return {
        title,
        subtitle: `${discountAmount}% off - ${couponCode} - ${status}`,
      };
    },
  },
});
