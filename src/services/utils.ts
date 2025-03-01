import { format, parseISO } from "date-fns";

/**
 * Formats an ISO date string to "MMMM d, yyyy".
 */
export const formatDate = (date: string): string =>
  parseISO(date) ? format(parseISO(date), "MMMM d, yyyy") : date;

/**
 * Generates a URL-friendly slug from a title.
 */
export const generateSlug = (title: string): string =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/**
 * Calculates the estimated reading time for a given text.
 */
export const calculateReadTime = (content: string): string =>
  `${Math.ceil(content.trim().split(/\s+/).length / 200)} min read`;