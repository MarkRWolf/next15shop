import { EarthGlobeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const textType = defineType({
  name: "texts",
  title: "Texts",
  type: "document",
  icon: EarthGlobeIcon,
  fields: [
    defineField({
      name: "sectionName",
      title: "Section Name",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "Name of the section (e.g., 'footer', 'global')",
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "key",
              title: "Content Key",
              type: "string",
              validation: (Rule) => Rule.required(),
              description: "The name of the content field (e.g., 'privacyPolicy')",
            }),
            defineField({
              name: "localizedText",
              title: "Localized Text",
              type: "object",
              fields: [
                defineField({
                  name: "daDK",
                  title: "Danish (daDK)",
                  type: "text",
                  description: "Text in Danish",
                }),
                defineField({
                  name: "enGB",
                  title: "English (enGB)",
                  type: "text",
                  description: "Text in English",
                }),
              ],
            }),
          ],
        },
      ],
    }),
  ],
});
