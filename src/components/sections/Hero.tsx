import React from "react";
import Link from "next/link";
import { Code, Terminal, Github, Linkedin, Mail } from "lucide-react";
import type { Project, BlogPost, Technology } from "@/types";
import TerminalWindow from "@/components/ui/TerminalWindow";
import BlogCard from "@/components/blog/BlogCard";
import SectionHeader from "@/components/ui/SectionHeader";
import ProjectCard from "@/components/projects/ProjectCard";
import TechGrid from "@/components/technologies/TechGrid";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  technologies: Technology[];
  featuredProjects: Project[];
  featuredPosts: BlogPost[];
}

const HeroSection: React.FC<HeroSectionProps> = ({
  technologies,
  featuredProjects,
  featuredPosts,
}) => {
  const socialLinks = [
    { icon: Github, label: "gh/stephen", href: "https://github.com/stephenjacobs" },
    { icon: Linkedin, label: "in/stephen", href: "https://linkedin.com/in/stephenjacobs" },
    { icon: Mail, label: "contact@stephenjacobs.io", href: "mailto:contact@stephenjacobs.io" },
  ];

  const quickLinks = [
    { label: "View Projects", href: "/projects", icon: Terminal },
    { label: "Read Blog", href: "/blog", icon: Terminal },
  ];

  return (
    <section className="max-w-4xl mx-auto">
      <TerminalWindow path="~/stephen/intro.sh">
        <div className="space-y-8">
          {/* Welcome Message */}
          <div className="flex items-center space-x-2 font-mono text-sm text-green-500">
            Welcome to stephenjacobs.io <span className="text-gray-500">(v1.0.0)</span>
          </div>

          {/* Introduction */}
          <div className="space-y-2">
            <h1 className="text-5xl font-mono text-cyan-600 dark:text-cyan-400">Stephen Jacobs</h1>
            <p className="text-xl font-mono text-gray-700 dark:text-gray-300">
              Full-stack developer passionate about building elegant solutions
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <SectionHeader title="Quick Links" icon={Code} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex justify-between items-center p-4 border rounded-lg hover:border-cyan-500 transition-all
                    bg-gray-50 border-gray-300 text-gray-700 hover:text-cyan-600
                    dark:bg-gray-900/50 dark:border-gray-700 dark:text-gray-300 dark:hover:text-cyan-400"
                >
                  <span>{link.label}</span>
                  <link.icon size={16} />
                </Link>
              ))}
            </div>
          </div>

          {/* Featured Technologies */}
          <section>
            <SectionHeader
              title="Technologies"
              icon={Code}
              action={{ label: "View all experience", href: "/about" }}
            />
            <TechGrid
              technologies={technologies}
            />
          </section>

          {/* Featured Projects */}
          <section>
            <SectionHeader
              title="Featured Projects"
              icon={Terminal}
              action={{ label: "View all projects", href: "/projects" }}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </section>

          {/* Latest Blog Posts */}
          <section>
            <SectionHeader
              title="Latest Posts"
              icon={Terminal}
              action={{ label: "View all posts", href: "/blog" }}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </section>

          {/* Social Links */}
          <div className="flex gap-6 border-t pt-6 border-gray-300 dark:border-gray-700">
            {socialLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 text-gray-600 hover:text-cyan-600 transition-colors
                  dark:text-gray-400 dark:hover:text-cyan-400"
              >
                <link.icon size={18} />
                <span>{link.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </TerminalWindow>
    </section>
  );
};

export default HeroSection;