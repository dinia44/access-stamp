import { defineField, defineType } from "sanity";

export const adviceSection = defineType({
  name: "adviceSection",
  title: "Section block",
  type: "object",
  fields: [
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Heading (H2)", value: "h2" },
          { title: "Paragraph", value: "p" },
          { title: "Bullet list", value: "ul" },
          { title: "Preformatted", value: "pre" },
          { title: "Links", value: "links" },
          { title: "Callout", value: "callout" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "text", title: "Text", type: "text", rows: 4 }),
    defineField({
      name: "items",
      title: "List items",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "linkItems",
      title: "Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string", title: "Label" },
            { name: "href", type: "url", title: "URL", validation: (r) => r.uri({ allowRelative: true }) },
          ],
        },
      ],
    }),
    defineField({
      name: "tone",
      title: "Callout tone",
      type: "string",
      options: {
        list: [
          { title: "Warning", value: "warning" },
          { title: "Tip", value: "tip" },
          { title: "Contact", value: "contact" },
          { title: "Steps", value: "steps" },
        ],
      },
    }),
    defineField({ name: "title", title: "Callout title", type: "string" }),
    defineField({ name: "body", title: "Callout body", type: "text", rows: 4 }),
  ],
  preview: {
    select: { type: "type", text: "text", title: "title" },
    prepare({ type, text, title }) {
      return { title: `${type ?? "block"}: ${title || text?.slice(0, 40) || "…"}` };
    },
  },
});
