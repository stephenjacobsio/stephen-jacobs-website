import { fetchApi } from "./apiClient";
import type { WorkExperience } from "@/types";

/**
 * Fetches all work experience entries.
 */
export const getWorkExperience = async (): Promise<WorkExperience[]> => {
  return fetchApi<WorkExperience[]>('/work-experience');
};