import { format, parseISO } from "date-fns";
import type { BlogPost, Project, Technology } from "@/types";
import { posts } from "@/data/blog-posts";
import { projects } from "@/data/projects";
import { technologies } from "@/data/technologies";

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
export const getBlogPosts = (): BlogPost[] => sortByDate(posts || []);

/**
 * Retrieves featured blog posts.
 * @param limit - Optional limit on the number of posts.
 * @returns A filtered list of featured blog posts.
 */
export const getFeaturedPosts = (limit?: number): BlogPost[] =>
  filterAndLimit(posts || [], (post) => !!post.featured, limit);

/**
 * Finds a blog post by its slug.
 * @param slug - The slug to search for.
 * @returns The matching blog post, or undefined.
 */
export const getPostBySlug = (slug: string): BlogPost | undefined =>
  posts?.find((post) => post.slug === slug);

/**
 * Groups blog posts by year and month.
 * @param posts - The array of blog posts to group.
 * @returns A nested object grouping posts by year and month.
 */
export const groupPostsByDate = (
  posts: BlogPost[] = []
): Record<number, Record<string, BlogPost[]>> =>
  posts.reduce((acc, post) => {
    const { year, month } = (() => {
      const date = parseISO(post.date);
      return { year: date.getFullYear(), month: format(date, "MMMM") };
    })();

    acc[year] = acc[year] || {};
    acc[year][month] = acc[year][month] || [];
    acc[year][month].push(post);

    return acc;
  }, {} as Record<number, Record<string, BlogPost[]>>);

/* --------------------------------------
   Project Utilities
---------------------------------------- */

/**
 * Retrieves featured projects.
 * @param limit - Optional limit on the number of projects.
 * @returns A filtered list of featured projects.
 */
export const getFeaturedProjects = (limit?: number): Project[] =>
  filterAndLimit(projects || [], (project) => !!project.featured, limit);

/**
 * Filters projects by category.
 * @param projects - The list of projects to filter.
 * @param category - The category to filter by. Use 'All' for no filtering.
 * @returns A list of projects matching the category.
 */
export const filterProjectsByCategory = (
  projects: Project[] = [],
  category: string
): Project[] =>
  category === "All" ? projects : projects.filter((p) => p.category === category);

/**
 * Filters projects by a specific technology.
 * @param projects - The list of projects.
 * @param tech - The technology to filter by.
 * @returns A list of projects using the specified technology.
 */
export const filterProjectsByTech = (
  projects: Project[] = [],
  tech: string
): Project[] =>
  projects.filter((project) =>
    project.technologies.some((t) => t.toLowerCase() === tech.toLowerCase())
  );

/**
 * Finds related projects based on shared technologies.
 * @param currentProject - The project to compare against.
 * @param allProjects - All available projects.
 * @param limit - Optional limit on the number of related projects.
 * @returns A list of related projects.
 */
export const getRelatedProjects = (
  currentProject: Project,
  allProjects: Project[] = [],
  limit = 2
): Project[] =>
  filterAndLimit(
    allProjects
      .filter((project) => project.id !== currentProject.id)
      .map((project) => ({
        project,
        commonTech: project.technologies.filter((tech) =>
          currentProject.technologies.includes(tech)
        ).length,
      }))
      .sort((a, b) => b.commonTech - a.commonTech)
      .map(({ project }) => project),
    () => true,
    limit
  );

/**
 * Finds a project by its ID.
 * @param id - The project ID to search for.
 * @returns The matching project, or undefined.
 */
export const getProjectById = (id: string): Project | undefined =>
  projects?.find((project) => project.id === id);

/* --------------------------------------
   Technology Utilities
---------------------------------------- */

/**
 * Retrieves the list of available technologies.
 * @returns A promise resolving to an array of technologies.
 */
export const getTechnologies = async (): Promise<Technology[]> =>
  technologies || [];

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