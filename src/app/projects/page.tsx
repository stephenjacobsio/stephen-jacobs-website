import { Metadata } from "next";
import { getFeaturedProjects, getTechnologies } from "@/utils";
import PageLayout from "@/components/layout/PageLayout";
import ProjectCard from "@/components/projects/ProjectCard";
import SectionHeader from "@/components/ui/SectionHeader";
import TechGrid from "@/components/technologies/TechGrid";
import { Code, Terminal, LayoutGrid } from "lucide-react";
import { Project, Technology } from "@/types";

export const metadata: Metadata = {
  title: "Projects | Stephen Jacobs",
  description:
    "A showcase of featured and categorized projects built using modern technologies.",
};

/**
 * Fetches project and technology data asynchronously for SSR.
 */
async function fetchData() {
  const [projects, technologies] = await Promise.all([
    getFeaturedProjects(),
    getTechnologies(),
  ]);
  return { projects, technologies };
}

/**
 * ProjectsPage component for displaying featured projects, technologies, and categories.
 */
export default async function ProjectsPage() {
  const { projects, technologies } = await fetchData();

  // Extract unique categories from the project list
  const categories: string[] = [
    "All",
    ...new Set(projects.map((p) => p.category)),
  ];

  // Filter for featured projects
  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <PageLayout title="Projects" path="~/stephen/projects">
      <div className="space-y-12">
        {/* Categories */}
        <section>
          <SectionHeader title="Project Categories" icon={LayoutGrid} />
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 rounded-lg font-mono text-sm bg-gray-100 text-gray-700 
                           hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 
                           dark:hover:bg-gray-700 transition-colors duration-200"
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Featured Projects */}
        <section>
          <SectionHeader title="Featured Projects" icon={Terminal} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
