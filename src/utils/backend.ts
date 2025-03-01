import { format, parseISO } from "date-fns";
import type { BlogPost, Project, Technology } from "@/types";

/** Base URL for API requests */
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

/**
 * Generic function to fetch data from the API with error handling.
 * 
 * @template T - The expected response type.
 * @param endpoint - The API endpoint to fetch data from.
 * @returns A promise resolving to the data of type `T`.
 * @throws Will throw an error if the API response is not ok.
 */
async function fetchApi<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);
  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }
  return response.json();
}

/** ----------------------------- Blog API Calls ----------------------------- */

/**
 * Fetches all blog posts and sorts them by date in descending order.
 * 
 * @returns A promise resolving to an array of `BlogPost`.
 */
export const getBlogPosts = async (): Promise<BlogPost[]> => {
  const posts = await fetchApi<BlogPost[]>('/blog-posts');
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

/**
 * Fetches featured blog posts with an optional limit.
 * 
 * @param limit - Maximum number of featured posts to fetch.
 * @returns A promise resolving to an array of featured `BlogPost`.
 */
export const getFeaturedPosts = async (limit?: number): Promise<BlogPost[]> => {
  const posts = await fetchApi<BlogPost[]>('/blog-posts');
  const featured = posts.filter(post => post.featured);
  return limit ? featured.slice(0, limit) : featured;
};

/**
 * Finds a blog post by its slug.
 * 
 * @param slug - The unique identifier for the blog post.
 * @returns A promise resolving to the matching `BlogPost` or `undefined` if not found.
 */
export const getPostBySlug = async (slug: string): Promise<BlogPost | undefined> => {
  const posts = await fetchApi<BlogPost[]>('/blog-posts');
  return posts.find(post => post.slug === slug);
};

/**
 * Groups blog posts by year and month.
 * 
 * @returns A promise resolving to an object with blog posts grouped by year and month.
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

/** ----------------------------- Project API Calls ----------------------------- */

/**
 * Fetches all projects.
 * 
 * @returns A promise resolving to an array of `Project`.
 */
export const getProjects = async (): Promise<Project[]> => {
  return fetchApi<Project[]>('/projects');
};

/**
 * Fetches featured projects with an optional limit.
 * 
 * @param limit - Maximum number of featured projects to fetch.
 * @returns A promise resolving to an array of featured `Project`.
 */
export const getFeaturedProjects = async (limit?: number): Promise<Project[]> => {
  const projects = await fetchApi<Project[]>('/projects');
  const featured = projects.filter(project => project.featured);
  return limit ? featured.slice(0, limit) : featured;
};

/**
 * Filters projects by category.
 * 
 * @param category - The category to filter projects by.
 * @returns A promise resolving to an array of filtered `Project`.
 */
export const filterProjectsByCategory = async (category: string): Promise<Project[]> => {
  const projects = await fetchApi<Project[]>('/projects');
  return category === "All" ? projects : projects.filter(p => p.category === category);
};

/**
 * Filters projects by a specific technology.
 * 
 * @param tech - The technology to filter projects by.
 * @returns A promise resolving to an array of filtered `Project`.
 */
export const filterProjectsByTech = async (tech: string): Promise<Project[]> => {
  const projects = await fetchApi<Project[]>('/projects');
  return projects.filter(project =>
    project.technologies.some(t => t.toLowerCase() === tech.toLowerCase())
  );
};

/**
 * Finds a project by its unique ID.
 * 
 * @param id - The unique identifier for the project.
 * @returns A promise resolving to the matching `Project` or `undefined` if not found.
 */
export const getProjectById = async (id: string): Promise<Project | undefined> => {
  const projects = await fetchApi<Project[]>('/projects');
  return projects.find(project => project.id === id);
};

/**
 * Finds related projects based on shared technologies.
 * 
 * @param currentProject - The current project to find related projects for.
 * @param limit - The maximum number of related projects to fetch.
 * @returns A promise resolving to an array of related `Project`.
 */
export const getRelatedProjects = async (
  currentProject: Project,
  limit = 2
): Promise<Project[]> => {
  const allProjects = await fetchApi<Project[]>('/projects');
  return allProjects
    .filter(project => project.id !== currentProject.id)
    .map(project => ({
      project,
      commonTech: project.technologies.filter(tech => 
        currentProject.technologies.includes(tech)
      ).length,
    }))
    .sort((a, b) => b.commonTech - a.commonTech)
    .map(({ project }) => project)
    .slice(0, limit);
};

/** ----------------------------- Technology API Calls ----------------------------- */

/**
 * Fetches all technologies.
 * 
 * @returns A promise resolving to an array of `Technology`.
 */
export const getTechnologies = async (): Promise<Technology[]> => {
  return fetchApi<Technology[]>('/technologies');
};

/** ----------------------------- Formatting Utilities ----------------------------- */

/**
 * Formats an ISO date string to "MMMM d, yyyy".
 * 
 * @param date - The ISO date string to format.
 * @returns A formatted date string.
 */
export const formatDate = (date: string): string =>
  parseISO(date) ? format(parseISO(date), "MMMM d, yyyy") : date;

/**
 * Generates a URL-friendly slug from a title.
 * 
 * @param title - The title to generate a slug for.
 * @returns A slug string.
 */
export const generateSlug = (title: string): string =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/**
 * Calculates the estimated reading time for a given text.
 * 
 * @param content - The text content to estimate reading time for.
 * @returns A string representing the estimated reading time in minutes.
 */
export const calculateReadTime = (content: string): string =>
  `${Math.ceil(content.trim().split(/\s+/).length / 200)} min read`;