import React from "react";
import { ExternalLink, Github } from "lucide-react";
import type { Project } from "@/types";

interface ProjectPageProps {
  project: Project;
}

const ProjectPage: React.FC<ProjectPageProps> = ({ project }) => {
  return (
    <article className="max-w-4xl mx-auto p-6 rounded-lg border bg-gray-50 text-gray-900 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-mono mb-4">{project.title}</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">{project.category}</p>
        <div className="flex items-center gap-4 mt-4">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} on GitHub`}
              className="transition-colors text-gray-600 hover:text-cyan-600 dark:text-gray-500 dark:hover:text-cyan-400"
            >
              <Github size={20} />
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View demo of ${project.title}`}
              className="transition-colors text-gray-600 hover:text-cyan-600 dark:text-gray-500 dark:hover:text-cyan-400"
            >
              <ExternalLink size={20} />
            </a>
          )}
        </div>
      </header>

      {/* Image */}
      {project.imageUrl && (
        <div className="mb-8 rounded-md overflow-hidden">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-64 object-cover"
          />
        </div>
      )}

      {/* Description */}
      <section className="prose dark:prose-invert mb-8">
        {project.longDescription || project.description}
      </section>

      {/* Technologies */}
      <footer>
        <h2 className="text-lg font-mono mb-4">Technologies Used</h2>
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
      </footer>
    </article>
  );
};

export default ProjectPage;