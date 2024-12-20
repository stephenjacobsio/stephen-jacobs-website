import React from "react";
import Link from "next/link";
import { FileText, Tag, Clock } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import type { BlogPost } from "@/types";

interface BlogLayoutProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  categories?: string[];
  tags?: string[];
  recentPosts?: BlogPost[];
}

const BlogLayout: React.FC<BlogLayoutProps> = ({
  children,
  sidebar,
  categories = [],
  tags = [],
  recentPosts = [],
}) => {
  const renderDefaultSidebar = () => (
    <aside className="space-y-8">
      {/* Categories */}
      {categories.length > 0 && (
        <section className="rounded-lg border p-4 bg-gray-50 border-gray-200 dark:bg-gray-800/50 dark:border-gray-700">
          <h2 className="text-lg font-mono mb-4 text-gray-700 dark:text-gray-300">
            Categories
          </h2>
          <ul className="space-y-2">
            {categories.map((category) => (
              <li key={category}>
                <Link
                  href={`/blog/category/${category.toLowerCase()}`}
                  className="block px-2 py-1 rounded transition-all text-gray-600 hover:text-cyan-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-cyan-400 dark:hover:bg-gray-700/50"
                >
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Tags */}
      {tags.length > 0 && (
        <section className="rounded-lg border p-4 bg-gray-50 border-gray-200 dark:bg-gray-800/50 dark:border-gray-700">
          <h2 className="text-lg font-mono mb-4 text-gray-700 dark:text-gray-300">
            Tags
          </h2>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog/tag/${tag.toLowerCase()}`}
                className="flex items-center px-3 py-1 rounded-lg text-sm transition-all bg-gray-100 text-gray-600 hover:bg-cyan-100 hover:text-cyan-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-cyan-400"
              >
                <Tag size={14} className="mr-1 text-gray-500 dark:text-gray-400" />
                {tag}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <section className="rounded-lg border p-4 bg-gray-50 border-gray-200 dark:bg-gray-800/50 dark:border-gray-700">
          <h2 className="text-lg font-mono mb-4 text-gray-700 dark:text-gray-300">
            Recent Posts
          </h2>
          <ul className="space-y-3">
            {recentPosts.map((post) => (
              <li key={post.id}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="flex items-center space-x-2 group transition-colors text-gray-600 hover:text-cyan-600 dark:text-gray-400 dark:hover:text-cyan-400"
                >
                  <FileText
                    size={14}
                    className="group-hover:text-cyan-400 dark:group-hover:text-cyan-400"
                  />
                  <span className="text-sm">{post.title}</span>
                  <span className="text-xs text-gray-500">
                    <Clock
                      size={12}
                      className="inline-block mr-1 dark:text-gray-400"
                    />
                    {post.date}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </aside>
  );

  return (
    <PageLayout title="Blog" path="~/stephen/blog" fullWidth>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3">{children}</div>

        {/* Sidebar */}
        <div className="lg:col-span-1">{sidebar || renderDefaultSidebar()}</div>
      </div>
    </PageLayout>
  );
};

export default BlogLayout;