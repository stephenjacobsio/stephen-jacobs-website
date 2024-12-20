import Link from "next/link";
import { Code, Terminal } from "lucide-react";
import { getFeaturedPosts, getFeaturedProjects } from "@/utils";
import { technologies } from "@/data/technologies";
import Header from "@/components/layout/Header";
import HeroSection from "@/components/sections/Hero";
import BlogCard from "@/components/blog/BlogCard";
import ProjectCard from "@/components/projects/ProjectCard";
import SectionHeader from "@/components/ui/SectionHeader";
import TechGrid from "@/components/technologies/TechGrid";
import clsx from "clsx";

export default async function Home() {
  const [featuredPosts, featuredProjects] = await Promise.all([
    getFeaturedPosts(2),
    getFeaturedProjects(2),
  ]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <Header />

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <HeroSection
          title="Welcome to Stephen Jacobs' Portfolio"
          subtitle="Full-stack developer passionate about building elegant solutions."
          technologies={technologies}
          featuredPosts={featuredPosts}
          featuredProjects={featuredProjects}
        />
      </main>
    </div>
  );
}
