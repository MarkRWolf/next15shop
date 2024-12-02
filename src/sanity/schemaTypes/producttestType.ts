import { TrolleyIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { DEFAULT_LANGUAGE } from "@/types/languages";

export const producttestType = defineType({
  name: "producttest",
  title: "ProductTEST",
  type: "document",
  icon: TrolleyIcon,
  fields: [
    defineField({
      name: "name",
      title: "Product Name",
      description: `${DEFAULT_LANGUAGE} should always be first!!`,
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
              name: "value",
              title: "Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              lang: "lang.name",
              value: "value",
            },
            prepare(select) {
              return {
                title: select.lang || "No lang selected",
                subtitle: select.value || "No name",
              };
            },
          },
        },
      ],
      validation: (Rule) =>
        Rule.custom((names) => {
          if (!names || names.length === 0) {
            return true;
          }

          const langIds = names.map((item) => item.lang?._ref);
          const uniqueLangIds = new Set(langIds);

          if (langIds.length !== uniqueLangIds.size) {
            return "double language detected";
          }

          return true;
        }),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      description: `${DEFAULT_LANGUAGE} should always be first!! ^`,
      type: "slug",
      options: {
        source: "name.0.value",
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
            prepare(select) {
              return {
                title: select.lang || "No language selected",
                subtitle: select.description || "No description",
              };
            },
          },
        },
      ],
      validation: (Rule) =>
        Rule.custom((descriptions) => {
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
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      description: "First category is considered primary",
      readOnly: true,
    }),
    defineField({
      name: "stock",
      title: "Stock",
      type: "number",
      validation: (Rule) => Rule.min(0),
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "images.0.asset",
      subtitle: "price",
    },
    prepare(select) {
      const firstName = Array.isArray(select.title) && select.title[0]?.value;
      return {
        title: firstName || "No name",
        subtitle: `DKK: ${select.subtitle}`,
        media: select.media,
      };
    },
  },
});
