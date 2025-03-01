import { fetchApi } from "./apiClient";
import type { BlogPost } from "@/types";
import { format, parseISO } from "date-fns";

/**
 * Fetches all blog posts and sorts them by date in descending order.
 */
export const getBlogPosts = async (): Promise<BlogPost[]> => {
  const posts = await fetchApi<BlogPost[]>('/blog-posts');
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

/**
 * Fetches featured blog posts with an optional limit.
 */
export const getFeaturedPosts = async (limit?: number): Promise<BlogPost[]> => {
  const posts = await fetchApi<BlogPost[]>('/blog-posts');
  const featured = posts.filter(post => post.featured);
  return limit ? featured.slice(0, limit) : featured;
};

/**
 * Finds a blog post by its slug.
 */
export const getPostBySlug = async (slug: string): Promise<BlogPost | undefined> => {
  const posts = await fetchApi<BlogPost[]>('/blog-posts');
  return posts.find(post => post.slug === slug);
};

/**
 * Groups blog posts by year and month.
 */
export const groupPostsByDate = async (): Promise<Record<number, Record<string, BlogPost[]>>> => {
  const posts = await fetchApi<BlogPost[]>('/blog-posts');
  return posts.reduce((acc, post) => {
    const date = parseISO(post.date);
    const year = date.getFullYear();
    const month = format(date, "MMMM");

    acc[year] = acc[year] || {};
    acc[year][month] = acc[year][month] || [];
    acc[year][month].push(post);

    return acc;
  }, {} as Record<number, Record<string, BlogPost[]>>);
};