import { fetchApi } from "./apiClient";
import type { Technology } from "@/types";

/**
 * Fetches all technologies.
 */
export const getTechnologies = async (): Promise<Technology[]> => {
  return fetchApi<Technology[]>('/technologies');
};