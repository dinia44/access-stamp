import { defineField, defineType } from "sanity";

export const blogSection = defineType({
  name: "blogSection",
  title: "Section",
  type: "object",
  fields: [
    defineField({ name: "heading", title: "Heading (optional)", type: "string" }),
    defineField({ name: "body", title: "Body", type: "text", rows: 5, validation: (r) => r.required() }),
  ],
  preview: {
    select: { heading: "heading", body: "body" },
    prepare({ heading, body }) {
      return { title: heading || body?.slice(0, 50) || "Section" };
    },
  },
});

export const blogPost = defineType({
  name: "blogPost",
  title: "Blog post",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: "date", title: "Display date", type: "string", description: 'e.g. "March 2026"' }),
    defineField({ name: "excerpt", title: "Excerpt", type: "text", rows: 2, validation: (r) => r.required() }),
    defineField({ name: "readTime", title: "Read time label", type: "string", initialValue: "5 min read" }),
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      of: [{ type: "blogSection" }],
      validation: (r) => r.required().min(1),
    }),
  ],
  preview: {
    select: { title: "title", date: "date" },
    prepare({ title, date }) {
      return { title, subtitle: date };
    },
  },
});
