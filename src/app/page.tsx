import Link from "next/link";
import { Code, Terminal } from "lucide-react";
import { getFeaturedPosts, getFeaturedProjects } from "@/utils";
import { getTechnologies } from "@/services/technologyService";
import Header from "@/components/layout/Header";
import HeroSection from "@/components/sections/Hero";
import PageTransition from "@/components/ui/PageTransition";
import clsx from "clsx";

// Add static generation with revalidation
export const revalidate = 3600; // Revalidate at most once per hour

export default async function Home() {
  const [featuredPosts, featuredProjects, technologies] = await Promise.all([
    getFeaturedPosts(2),
    getFeaturedProjects(2),
    getTechnologies(),
  ]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <Header />

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <PageTransition>
          <HeroSection
            title="Welcome to Stephen Jacobs' Portfolio"
            subtitle="Full-stack developer passionate about building elegant solutions."
            technologies={technologies}
            featuredPosts={featuredPosts}
            featuredProjects={featuredProjects}
          />
        </PageTransition>
      </main>
    </div>
  );
}
