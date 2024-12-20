import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  minimal?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, minimal = false }) => {
  return (
    <div
      className={`group rounded-lg p-4 border transition-all duration-200 
        bg-gray-50 border-gray-300 hover:border-cyan-600 
        dark:bg-gray-900/50 dark:border-gray-700 dark:hover:border-cyan-500 
        ${minimal ? "h-auto" : "h-full"}`}
    >
      {/* Header Section */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-mono text-gray-900 group-hover:text-cyan-600 dark:text-gray-100 dark:group-hover:text-cyan-400 transition-colors">
          {project.title}
        </h3>

        <div className="flex items-center space-x-2">
          {project.githubUrl && (
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} on GitHub`}
              className="text-gray-600 hover:text-cyan-600 dark:text-gray-500 dark:hover:text-cyan-400 transition-colors"
            >
              <Github size={16} />
            </Link>
          )}
          {project.demoUrl && (
            <Link
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View demo of ${project.title}`}
              className="text-gray-600 hover:text-cyan-600 dark:text-gray-500 dark:hover:text-cyan-400 transition-colors"
            >
              <ExternalLink size={16} />
            </Link>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-sm mb-4 text-gray-700 dark:text-gray-400">
        {minimal ? project.description : project.longDescription || project.description}
      </p>

      {/* Optional Image */}
      {!minimal && project.imageUrl && (
        <div className="mb-4 rounded-md overflow-hidden">
          <Image
            src={project.imageUrl}
            alt={project.title}
            width={600}
            height={200}
            layout="responsive"
            className="object-cover"
          />
        </div>
      )}

      {/* Technologies */}
      <div className="flex flex-wrap gap-2">
        {project.technologies.map((tech) => (
          <span
            key={tech}
            className="text-xs px-2 py-1 rounded bg-gray-200 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;