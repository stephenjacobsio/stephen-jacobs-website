import React from "react";
import { Terminal } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import ProjectCard from "@/components/projects/ProjectCard";
import type { Project } from "@/types";

interface FeaturedProjectsProps {
  projects: Project[];
}

const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({ projects }) => {
  return (
    <section className="space-y-6">
      {/* Section Header */}
      <SectionHeader
        title="Featured Projects"
        icon={Terminal}
        action={{
          label: "View all projects",
          href: "/projects",
        }}
      />

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.length > 0 ? (
          projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))
        ) : (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            No featured projects available at the moment.
          </p>
        )}
      </div>
    </section>
  );
};

export default FeaturedProjects;