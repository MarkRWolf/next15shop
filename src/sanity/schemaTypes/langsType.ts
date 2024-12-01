import { EarthGlobeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const langsType = defineType({
  name: "langs",
  title: "Languages",
  type: "document",
  icon: EarthGlobeIcon,
  fields: [
    defineField({
      name: "name",
      title: "Language Name",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "Name of the language (e.g., 'Danish', 'English').",
    }),
  ],
  preview: {
    select: {
      title: "name",
    },
  },
});
