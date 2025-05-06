import React, { Suspense } from "react";
import Link from "next/link";
import { Code, Terminal, Github, Linkedin, Mail, ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";
import type { Project, BlogPost, Technology } from "@/types";
import TerminalWindow from "@/components/ui/TerminalWindow";
import SectionHeader from "@/components/ui/SectionHeader";
import { Skeleton } from "@/components/ui/Skeleton";

// Dynamically import heavy components
const BlogCard = dynamic(() => import("@/components/blog/BlogCard"), {
  loading: () => <Skeleton className="h-64 w-full rounded-lg" />,
  ssr: true
});

const ProjectCard = dynamic(() => import("@/components/projects/ProjectCard"), {
  loading: () => <Skeleton className="h-64 w-full rounded-lg" />,
  ssr: true
});

const TechGrid = dynamic(() => import("@/components/technologies/TechGrid"), {
  loading: () => <Skeleton className="h-32 w-full rounded-lg" />,
  ssr: true
});

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
    <section className="max-w-5xl mx-auto">
      <TerminalWindow path="~/stephen/intro.sh">
        <div className="space-y-10">
          {/* Welcome Message */}
          <div className="flex items-center space-x-2 font-mono text-sm text-green-500">
            <span className="animate-pulse">▋</span> Welcome to stephenjacobs.io <span className="text-gray-500">(v1.0.0)</span>
          </div>

          {/* Introduction */}
          <div className="space-y-3">
            <h1 className="text-5xl font-mono font-bold text-gradient gradient-cyan-blue pb-1">Stephen Jacobs</h1>
            <p className="text-xl font-mono text-gray-700 dark:text-gray-300 leading-relaxed">
              Full-stack developer passionate about building elegant solutions
            </p>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap gap-4">
            {socialLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-cyan-100 dark:hover:bg-cyan-900/30 transition-all duration-300 border border-gray-200 dark:border-gray-700"
              >
                <link.icon size={16} className="text-cyan-600 dark:text-cyan-400" />
                <span className="text-sm">{link.label}</span>
              </Link>
            ))}
          </div>

          {/* Quick Links */}
          <div className="space-y-5">
            <SectionHeader title="Quick Links" icon={Code} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex justify-between items-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-cyan-500 dark:hover:border-cyan-500 transition-all duration-300
                    bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 shadow-subtle hover:shadow-md"
                >
                  <span className="font-medium">{link.label}</span>
                  <ArrowRight size={16} className="text-cyan-500" />
                </Link>
              ))}
            </div>
          </div>

          {/* Featured Technologies */}
          <section className="pt-2">
            <SectionHeader
              title="Technologies"
              icon={Code}
              action={{ label: "View all experience", href: "/about" }}
            />
            <Suspense fallback={<Skeleton className="h-32 w-full rounded-lg" />}>
              <TechGrid
                technologies={technologies}
              />
            </Suspense>
          </section>

          {/* Featured Projects */}
          <section className="pt-2">
            <SectionHeader
              title="Featured Projects"
              icon={Terminal}
              action={{ label: "View all projects", href: "/projects" }}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredProjects.map((project) => (
                <Suspense key={project.id} fallback={<Skeleton className="h-64 w-full rounded-lg" />}>
                  <ProjectCard project={project} />
                </Suspense>
              ))}
            </div>
          </section>

          {/* Latest Blog Posts */}
          <section className="pt-2">
            <SectionHeader
              title="Latest Posts"
              icon={Terminal}
              action={{ label: "View all posts", href: "/blog" }}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredPosts.map((post) => (
                <Suspense key={post.id} fallback={<Skeleton className="h-64 w-full rounded-lg" />}>
                  <BlogCard post={post} />
                </Suspense>
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