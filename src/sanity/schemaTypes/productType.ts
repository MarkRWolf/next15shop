import { DEFAULT_LANGUAGE } from "@/types/languages";
import { EditIcon, TrolleyIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const productType = defineType({
  name: "product",
  title: "Product",
  type: "document",
  icon: TrolleyIcon,
  fields: [
    defineField({
      name: "names",
      title: "Product Names",
      description: `${DEFAULT_LANGUAGE} should always be first!!`,
      type: "array",
      of: [
        {
          type: "object",
          icon: EditIcon,
          fields: [
            defineField({
              name: "lang",
              title: "Language",
              type: "reference",
              to: [{ type: "langs" }],
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "language",
              title: "Language",
              type: "string",
              description: "Ignore field",
              readOnly: true,
              hidden: true,
            }),
            defineField({
              name: "value",
              title: "Name",
              type: "string",
              validation: (Rule) => Rule.min(1),
            }),
          ],
          preview: {
            select: {
              lang: "lang.name",
              value: "value",
            },
            prepare({ lang, value }) {
              return {
                title: lang || "No lang selected",
                subtitle: value || "No name",
                media: EditIcon,
              };
            },
          },
        },
      ],
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .custom((names) => {
            if (!names || names.length < 1) {
              return "At least one name is required.";
            }

            const langIds = names.map((item) => item.lang?._ref).filter(Boolean);
            const uniqueLangIds = new Set(langIds);
            if (langIds.length !== uniqueLangIds.size) {
              return "Duplicate language detected. Each language must be unique.";
            }

            return true;
          }),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      description: `should always be first!! ^`,
      type: "slug",
      options: {
        source: "names.0.value",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "images",
      title: "Product Images",
      description: "First image is considered primary",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
        },
      ],
      validation: (Rule) => Rule.min(1).error("At least one image is required"),
    }),
    defineField({
      name: "descriptions",
      title: "Descriptions",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "lang",
              title: "Language",
              type: "reference",
              to: [{ type: "langs" }],
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "language",
              title: "Language",
              type: "string",
              description: "Ignore field",
              readOnly: true,
              hidden: true,
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "blockContent",
              validation: (Rule) => Rule.max(500),
            }),
          ],
          preview: {
            select: {
              lang: "lang.name",
              description: "description.0.children.0.text",
            },
            prepare({ lang, description }) {
              return {
                title: lang || "No language selected",
                subtitle: description || "No description",
              };
            },
          },
        },
      ],
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .custom((descriptions) => {
            if (!descriptions || descriptions.length === 0) {
              return true;
            }

            const langIds = descriptions.map((item) => item.lang?._ref);
            const uniqueLangIds = new Set(langIds);

            if (langIds.length !== uniqueLangIds.size) {
              return "Double languages detected";
            }

            return true;
          }),
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "categories",
      title: "Categories",
      description: "First category is considered primary",
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
      title: "names.0.value",
      media: "images.0.asset",
      subtitle: "price",
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || "No name",
        subtitle: `DKK: ${subtitle}`,
        media: media,
      };
    },
  },
});
