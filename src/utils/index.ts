import { format, parseISO } from "date-fns";
import type { BlogPost, Project, Technology } from "@/types";
import { 
  getBlogPosts as fetchBlogPosts,
  getFeaturedPosts as fetchFeaturedPosts,
  getPostBySlug as fetchPostBySlug,
  groupPostsByDate as fetchGroupPostsByDate
} from "@/services/blogService";
import {
  getProjects,
  getFeaturedProjects as fetchFeaturedProjects,
  getProjectById as fetchProjectById,
  filterProjectsByCategory as fetchFilterProjectsByCategory,
  filterProjectsByTech as fetchFilterProjectsByTech,
  getRelatedProjects as fetchRelatedProjects
} from "@/services/projectService";
import { getTechnologies as fetchTechnologies } from "@/services/technologyService";

/* --------------------------------------
   Utility Helpers
---------------------------------------- */

/**
 * Sorts a list of blog posts by date in descending order.
 * @param posts - The list of blog posts to sort.
 * @returns A sorted array of blog posts.
 */
const sortByDate = (posts: BlogPost[] = []): BlogPost[] =>
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

/**
 * Filters and limits items based on a predicate.
 * @param items - The list of items.
 * @param predicate - A filter condition.
 * @param limit - Optional limit on the number of results.
 * @returns A filtered and limited array.
 */
const filterAndLimit = <T>(
  items: T[] = [],
  predicate: (item: T) => boolean,
  limit?: number
): T[] => items.filter(predicate).slice(0, limit);

/* --------------------------------------
   Blog Utilities
---------------------------------------- */

/**
 * Retrieves all blog posts sorted by date.
 * @returns A sorted array of blog posts.
 */
export const getBlogPosts = async (): Promise<BlogPost[]> => {
  const posts = await fetchBlogPosts();
  return sortByDate(posts);
};

/**
 * Retrieves featured blog posts.
 * @param limit - Optional limit on the number of posts.
 * @returns A filtered list of featured blog posts.
 */
export const getFeaturedPosts = async (limit?: number): Promise<BlogPost[]> => {
  const posts = await fetchFeaturedPosts(limit);
  return sortByDate(posts);
};

/**
 * Finds a blog post by its slug.
 * @param slug - The slug to search for.
 * @returns The matching blog post, or undefined.
 */
export const getPostBySlug = async (slug: string): Promise<BlogPost | undefined> => {
  return fetchPostBySlug(slug);
};

/**
 * Groups blog posts by year and month.
 * @returns A nested object grouping posts by year and month.
 */
export const groupPostsByDate = async (): Promise<Record<number, Record<string, BlogPost[]>>> => {
  return fetchGroupPostsByDate();
};

/* --------------------------------------
   Project Utilities
---------------------------------------- */

/**
 * Retrieves featured projects.
 * @param limit - Optional limit on the number of projects.
 * @returns A filtered list of featured projects.
 */
export const getFeaturedProjects = async (limit?: number): Promise<Project[]> => {
  return fetchFeaturedProjects(limit);
};

/**
 * Filters projects by category.
 * @param category - The category to filter by. Use 'All' for no filtering.
 * @returns A list of projects matching the category.
 */
export const filterProjectsByCategory = async (
  category: string
): Promise<Project[]> => {
  return fetchFilterProjectsByCategory(category);
};

/**
 * Filters projects by a specific technology.
 * @param tech - The technology to filter by.
 * @returns A list of projects using the specified technology.
 */
export const filterProjectsByTech = async (
  tech: string
): Promise<Project[]> => {
  return fetchFilterProjectsByTech(tech);
};

/**
 * Finds related projects based on shared technologies.
 * @param currentProject - The project to compare against.
 * @param limit - Optional limit on the number of related projects.
 * @returns A list of related projects.
 */
export const getRelatedProjects = async (
  currentProject: Project,
  limit = 2
): Promise<Project[]> => {
  return fetchRelatedProjects(currentProject, limit);
};

/**
 * Finds a project by its ID.
 * @param id - The project ID to search for.
 * @returns The matching project, or undefined.
 */
export const getProjectById = async (id: string): Promise<Project | undefined> => {
  return fetchProjectById(id);
};

/* --------------------------------------
   Technology Utilities
---------------------------------------- */

/**
 * Retrieves the list of available technologies.
 * @returns A promise resolving to an array of technologies.
 */
export const getTechnologies = async (): Promise<Technology[]> => {
  return fetchTechnologies();
};

/* --------------------------------------
   Formatting Utilities
---------------------------------------- */

/**
 * Formats an ISO date string to "MMMM d, yyyy".
 * @param date - The date string to format.
 * @returns A formatted date string.
 */
export const formatDate = (date: string): string =>
  parseISO(date) ? format(parseISO(date), "MMMM d, yyyy") : date;

/**
 * Generates a slug from a title.
 * @param title - The input title.
 * @returns A URL-friendly slug.
 */
export const generateSlug = (title: string): string =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/**
 * Calculates the estimated reading time for text content.
 * @param content - The text content.
 * @returns A string representing the estimated reading time.
 */
export const calculateReadTime = (content: string): string =>
  `${Math.ceil(content.trim().split(/\s+/).length / 200)} min read`;