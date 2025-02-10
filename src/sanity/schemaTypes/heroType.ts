import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from "@/types/languages";
import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const heroType = defineType({
  name: "hero",
  title: "Hero",
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
    ...SUPPORTED_LANGUAGES.map((lang) =>
      defineField({
        name: `btnText_${lang.code}`,
        title: `Button Content -${lang.label}`,
        type: "string",
        hidden: ({ parent }) => parent?.langSelector !== lang.code,
        validation: (Rule) =>
          lang.code === DEFAULT_LANGUAGE
            ? Rule.required().min(1).error("Default language button content is required.")
            : Rule.max(200),
      })
    ),
    defineField({
      name: "image",
      title: "Product Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required().error("Image is required."),
    }),
    defineField({
      name: "btnLink",
      title: "Button Link",
      type: "string",
      validation: (Rule) => Rule.required().error("Link is required."),
    }),
    defineField({
      name: "isActive",
      title: "Is Active",
      type: "boolean",
      description: "Toggle on/off",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: `title_${DEFAULT_LANGUAGE}`,
      isActive: "isActive",
      media: "image.asset",
    },
    prepare(select) {
      const { title, isActive } = select;
      const status = isActive ? "Active" : "Inactive";
      return {
        title,
        subtitle: `${status}`,
        media: select.media,
      };
    },
  },
});
