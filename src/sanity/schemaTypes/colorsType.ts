import { ColorWheelIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const colorsType = defineType({
  name: "colors",
  title: "Colors",
  type: "document",
  icon: ColorWheelIcon,
  fields: [
    defineField({
      name: "title",
      title: "Color Scheme Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "hexes",
      title: "Hex Codes",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required().min(5),
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
  },
});
