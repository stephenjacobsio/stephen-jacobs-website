import React from "react";
import Link from "next/link";
import { Calendar, Tag } from "lucide-react";
import type { BlogPost } from "@/types";

interface FeaturedPostsProps {
  posts: BlogPost[];
}

const FeaturedPosts: React.FC<FeaturedPostsProps> = ({ posts }) => {
  return (
    <section className="space-y-6">
      {/* Section Header */}
      <h2 className="text-lg font-mono text-gray-700 dark:text-gray-300">
        <span className="text-cyan-400">~</span> Featured Posts
      </h2>

      {/* Posts List */}
      {posts.length > 0 ? (
        <div className="space-y-4">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="block p-4 rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50
                        hover:border-cyan-500/50 transition-all duration-200 group"
            >
              <div className="space-y-2">
                {/* Post Title */}
                <h3
                  className="text-lg font-mono text-gray-800 dark:text-gray-100 
                             group-hover:text-cyan-400 transition-colors"
                >
                  {post.title}
                </h3>

                {/* Post Date */}
                <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                  <Calendar
                    size={14}
                    className="inline-block mr-2 text-gray-400 dark:text-gray-500"
                  />
                  {post.date}
                </div>

                {/* Post Description */}
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {post.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {post.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center px-2 py-1 text-xs rounded-lg bg-gray-100 text-gray-600
                                 dark:bg-gray-700 dark:text-gray-300"
                    >
                      <Tag size={12} className="mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400 font-mono">
          No featured posts available yet.
        </p>
      )}
    </section>
  );
};

export default FeaturedPosts;