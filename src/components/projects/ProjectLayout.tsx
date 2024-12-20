import React from "react";
import Link from "next/link";
import { FileText } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import type { Project, Technology } from "@/types";

interface ProjectsLayoutProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  categories?: string[];
  technologies?: Technology[];
  featuredProjects?: Project[];
}

const ProjectsLayout: React.FC<ProjectsLayoutProps> = ({
  children,
  sidebar,
  categories,
  technologies,
  featuredProjects,
}) => {
  /**
   * Renders the default sidebar, including categories, technologies, and featured projects.
   */
  const renderDefaultSidebar = () => (
    <div className="space-y-6">
      {/* Categories */}
      {categories && categories.length > 0 && (
        <div className="rounded-lg border p-4 bg-gray-50 border-gray-200 dark:bg-gray-900/50 dark:border-gray-700">
          <h2 className="text-lg font-mono mb-4 text-gray-900 dark:text-gray-200">Categories</h2>
          <div className="space-y-2">
            {categories.map((category) => (
              <Link
                key={category}
                href={`/projects/category/${category.toLowerCase()}`}
                className="block px-2 py-1 rounded transition-colors text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-cyan-400 dark:hover:bg-gray-800"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Technologies */}
      {technologies && technologies.length > 0 && (
        <div className="rounded-lg border p-4 bg-gray-50 border-gray-200 dark:bg-gray-900/50 dark:border-gray-700">
          <h2 className="text-lg font-mono mb-4 text-gray-900 dark:text-gray-200">Technologies</h2>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <Link
                key={tech.name}
                href={`/projects/technology/${tech.name.toLowerCase()}`}
                className="inline-flex items-center px-3 py-1 rounded-lg text-sm transition-colors bg-gray-100 text-gray-600 hover:text-gray-900 dark:bg-gray-800 dark:text-gray-400 dark:hover:text-cyan-400"
              >
                <FileText size={12} className="mr-1" />
                {tech.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Featured Projects */}
      {featuredProjects && featuredProjects.length > 0 && (
        <div className="rounded-lg border p-4 bg-gray-50 border-gray-200 dark:bg-gray-900/50 dark:border-gray-700">
          <h2 className="text-lg font-mono mb-4 text-gray-900 dark:text-gray-200">Featured Projects</h2>
          <div className="space-y-4">
            {featuredProjects.map((project) => (
              <Link key={project.id} href={`/projects/${project.id}`} className="block group">
                <h3 className="text-sm font-mono mb-1 text-gray-700 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-cyan-400">
                  {project.title}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-500">{project.description}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <PageLayout title="Projects" path="~/stephen/projects">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3">{children}</div>

        {/* Sidebar */}
        <aside className="lg:col-span-1">{sidebar || renderDefaultSidebar()}</aside>
      </div>
    </PageLayout>
  );
};

export default ProjectsLayout;