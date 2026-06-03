import { defineField, defineType } from "sanity";

const CATEGORIES = [
  { title: "Your Rights", value: "rights" },
  { title: "Education", value: "education" },
  { title: "Transport", value: "transport" },
  { title: "Workplace", value: "workplace" },
  { title: "Care & Support", value: "care" },
  { title: "Equipment", value: "equipment" },
  { title: "Emergency", value: "emergency" },
  { title: "New to Disability", value: "new-to-disability" },
  { title: "Travel", value: "travel" },
  { title: "Cars", value: "cars" },
  { title: "Sport", value: "sport" },
];

export const adviceArticle = defineType({
  name: "adviceArticle",
  title: "Advice article",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "categorySlug",
      title: "Category",
      type: "string",
      options: { list: CATEGORIES },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "updated",
      title: "Last updated",
      type: "date",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({ name: "excerpt", title: "Excerpt", type: "text", rows: 2 }),
    defineField({ name: "readTimeMinutes", title: "Read time (minutes)", type: "number" }),
    defineField({ name: "seoTitle", title: "SEO title", type: "string" }),
    defineField({ name: "metaDescription", title: "Meta description", type: "text", rows: 2 }),
    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "object",
      fields: [
        { name: "src", type: "url", title: "Image URL" },
        { name: "alt", type: "string", title: "Alt text" },
      ],
    }),
    defineField({
      name: "sections",
      title: "Content sections",
      type: "array",
      of: [{ type: "adviceSection" }],
      validation: (r) => r.required().min(1),
    }),
  ],
  preview: {
    select: { title: "title", categorySlug: "categorySlug", updated: "updated" },
    prepare({ title, categorySlug, updated }) {
      return { title, subtitle: [categorySlug, updated].filter(Boolean).join(" · ") };
    },
  },
});
