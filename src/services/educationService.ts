import { fetchApi } from "./apiClient";
import type { Education } from "@/types";

/**
 * Fetches all education entries.
 */
export const getEducation = async (): Promise<Education[]> => {
  return fetchApi<Education[]>('/education');
};