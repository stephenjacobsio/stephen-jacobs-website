import { fetchApi } from "./apiClient";
import type { Project } from "@/types";

/**
 * Fetches all projects.
 */
export const getProjects = async (): Promise<Project[]> => {
  return fetchApi<Project[]>('/projects');
};

/**
 * Fetches featured projects with an optional limit.
 */
export const getFeaturedProjects = async (limit?: number): Promise<Project[]> => {
  const projects = await fetchApi<Project[]>('/projects');
  const featured = projects.filter(project => project.featured);
  return limit ? featured.slice(0, limit) : featured;
};

/**
 * Filters projects by category.
 */
export const filterProjectsByCategory = async (category: string): Promise<Project[]> => {
  const projects = await fetchApi<Project[]>('/projects');
  return category === "All" ? projects : projects.filter(p => p.category === category);
};

/**
 * Filters projects by a specific technology.
 */
export const filterProjectsByTech = async (tech: string): Promise<Project[]> => {
  const projects = await fetchApi<Project[]>('/projects');
  return projects.filter(project =>
    project.technologies.some(t => t.toLowerCase() === tech.toLowerCase())
  );
};

/**
 * Finds a project by its unique ID.
 */
export const getProjectById = async (id: string): Promise<Project | undefined> => {
  const projects = await fetchApi<Project[]>('/projects');
  return projects.find(project => project.id === id);
};

/**
 * Finds related projects based on shared technologies.
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