import { Metadata } from "next";
import { Terminal } from "lucide-react";
import BlogLayout from "@/components/blog/BlogLayout";
import BlogCard from "@/components/blog/BlogCard";
import SectionHeader from "@/components/ui/SectionHeader";
import { getBlogPosts } from "@/utils"; // Utility to fetch blog posts
import type { BlogPost } from "@/types";

// SEO Metadata
export const metadata: Metadata = {
  title: "Blog | Stephen Jacobs",
  description:
    "Explore blog posts covering cloud architecture, frontend development, and modern technologies.",
};

/**
 * Fetch posts at build time or request time (for SSR).
 */
async function fetchData(): Promise<{
  posts: BlogPost[];
  featuredPosts: BlogPost[];
  categories: string[];
  tags: string[];
}> {
  const posts = await getBlogPosts(); // Replace with an actual data fetching method
  const featuredPosts = posts.filter((post) => post.featured);
  const categories = Array.from(new Set(posts.map((post) => post.category)));
  const tags = Array.from(new Set(posts.flatMap((post) => post.tags)));

  return { posts, featuredPosts, categories, tags };
}

export default async function BlogListPage() {
  const { posts, featuredPosts, categories, tags } = await fetchData();

  return (
    <BlogLayout
      categories={categories}
      tags={tags}
      recentPosts={posts.slice(0, 5)}
    >
      <div className="space-y-8">
        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section>
            <SectionHeader title="Featured Posts" icon={Terminal} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        )}

        {/* All Posts */}
        <section>
          <SectionHeader title="All Posts" icon={Terminal} />
          <div className="space-y-6">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      </div>
    </BlogLayout>
  );
}