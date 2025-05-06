import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  minimal?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, minimal = false }) => {
  const { title, description, longDescription, technologies, imageUrl, githubUrl, demoUrl } = project;

  return (
    <Card className={`h-full flex flex-col ${minimal ? "h-auto" : ""}`}>
      {imageUrl && (
        <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading={minimal ? "lazy" : "eager"}
            priority={!minimal}
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}
      
      <CardHeader>
        <CardTitle className="font-mono text-lg font-semibold text-gray-900 group-hover:text-cyan-600 dark:text-gray-100 dark:group-hover:text-cyan-400 transition-all">
          {title}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
          {minimal ? description : longDescription || description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech) => (
            <Badge key={tech} variant="secondary">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
        {githubUrl && (
          <Button 
            href={githubUrl}
            variant="outline"
            size="sm"
            leftIconName="Github"
            isExternal
          >
            Code
          </Button>
        )}
        
        {demoUrl && (
          <Button 
            href={demoUrl}
            variant="primary"
            size="sm"
            leftIconName="ExternalLink"
            isExternal
          >
            Live Demo
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;