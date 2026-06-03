# Sanity CMS — Advice Hub & Blog

Access Stamp can load **advice articles** and **blog posts** from [Sanity](https://www.sanity.io). When Sanity env vars are not set, the site keeps using the in-repo content in `src/lib/mock-data.ts` and `src/lib/content/blog-fallback.ts` (no behaviour change for local dev).

## 1. Create a Sanity project

1. Sign in at [sanity.io/manage](https://www.sanity.io/manage) and create a project.
2. Note the **Project ID** and create a dataset (e.g. `production`).
3. Create an API token with **Editor** permissions (for seeding and Studio).

## 2. Configure environment variables

Copy `.env.example` to `.env.local` and set:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_editor_token
```

Add the same `NEXT_PUBLIC_*` vars in Vercel for production previews.

## 3. Seed existing content

From the project root:

```bash
npm run seed:cms
```

This uploads all current advice guides and blog posts as Sanity documents.

## 4. Open the Studio

```bash
npm run studio
```

Opens Sanity Studio at `http://localhost:3333` using `sanity.config.ts`. Edit articles there; published documents are fetched on the next site build or request (CDN in production).

## 5. How the site loads content

| Layer | Role |
|-------|------|
| `src/lib/content/advice.ts` | `getAdviceArticles()`, `getAdviceArticleBySlug()` |
| `src/lib/content/blog.ts` | `getBlogPosts()`, `getBlogPostBySlug()` |
| `src/lib/sanity/*` | Client, GROQ queries, Sanity → app mappers |

If Sanity returns no documents, the app **falls back** to in-repo data so deploys never go empty by mistake.

## Document types

- **adviceArticle** — slug, category, tags, sections (h2, p, lists, callouts, links)
- **blogPost** — slug, date, excerpt, sections (heading + body)

Schemas live in `sanity/schemas/`.

## Client components

Toolkit dropdowns still use `ADVICE_ARTICLES_STATIC` (in-repo list). Server-rendered pages and the chat API use the async CMS layer. After publishing in Sanity, redeploy or revalidate so server paths pick up changes.
