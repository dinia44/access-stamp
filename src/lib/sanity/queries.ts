export const ADVICE_ARTICLES_QUERY = `*[_type == "adviceArticle" && defined(slug.current)] | order(updated desc) {
  "slug": slug.current,
  title,
  categorySlug,
  updated,
  tags,
  excerpt,
  readTimeMinutes,
  seoTitle,
  metaDescription,
  heroImage,
  sections
}`;

export const ADVICE_ARTICLE_BY_SLUG_QUERY = `*[_type == "adviceArticle" && slug.current == $slug][0] {
  "slug": slug.current,
  title,
  categorySlug,
  updated,
  tags,
  excerpt,
  readTimeMinutes,
  seoTitle,
  metaDescription,
  heroImage,
  sections
}`;

export const BLOG_POSTS_QUERY = `*[_type == "blogPost" && defined(slug.current)] | order(_createdAt desc) {
  "slug": slug.current,
  title,
  date,
  excerpt,
  readTime,
  sections
}`;

export const BLOG_POST_BY_SLUG_QUERY = `*[_type == "blogPost" && slug.current == $slug][0] {
  "slug": slug.current,
  title,
  date,
  excerpt,
  readTime,
  sections
}`;
