import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from "@/types/languages";
import { TrolleyIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const productType = defineType({
  name: "product",
  title: "Product",
  type: "document",
  icon: TrolleyIcon,
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
        layout: "dropdown",
      },
      initialValue: DEFAULT_LANGUAGE,
    }),
    ...SUPPORTED_LANGUAGES.map((lang) =>
      defineField({
        name: `name_${lang.code}`,
        title: `Name -${lang.label}`,
        type: "string",
        hidden: ({ parent }) => parent?.langSelector !== lang.code,
        validation: (Rule) =>
          lang.code === DEFAULT_LANGUAGE
            ? Rule.required().min(1).error("Default language name is required.")
            : Rule.max(500),
      })
    ),
    ...SUPPORTED_LANGUAGES.map((lang) =>
      defineField({
        name: `description_${lang.code}`,
        title: `Description -${lang.label}`,
        type: "blockContent",
        hidden: ({ parent }) => parent?.langSelector !== lang.code,
        validation: (Rule) =>
          lang.code === DEFAULT_LANGUAGE
            ? Rule.required().min(1).error("Default language description is required.")
            : Rule.max(500),
      })
    ),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: `name_${DEFAULT_LANGUAGE}`,
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "images",
      title: "Product Images",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
        },
      ],
      validation: (Rule) => Rule.min(1).error("At least one image is required."),
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      validation: (Rule) => Rule.required().min(0).error("Price must be at least 0."),
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: "stock",
      title: "Stock",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
  ],
  preview: {
    select: {
      title: `name_${DEFAULT_LANGUAGE}`,
      media: "images.0.asset",
      subtitle: "price",
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || "No name",
        subtitle: `Price: ${subtitle || "N/A"}`,
        media: media,
      };
    },
  },
});
