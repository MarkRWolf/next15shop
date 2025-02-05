import { EarthGlobeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { SUPPORTED_LANGUAGES } from "@/types/languages";
export const langType = defineType({
  name: "language",
  title: "Language",
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
              validation: (Rule) => Rule.required(),
              fields: [
                ...SUPPORTED_LANGUAGES.map((lang) =>
                  defineField({
                    name: lang.code,
                    title: `${lang.label} (${lang.code})`,
                    type: "string",
                    description: `Text in ${lang.label}`,
                  })
                ),
              ],
            }),
          ],
        },
      ],
    }),
  ],
});
