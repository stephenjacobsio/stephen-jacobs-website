import React from "react";
import Link from "next/link";
import {Calendar} from "lucide-react";
import type {BlogPost} from "@/types";

interface BlogCardProps {
  post: BlogPost;
  minimal?: boolean;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, minimal = false }) => {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="block group rounded-lg p-4 border transition-all duration-200 bg-gray-50 border-gray-300 hover:border-cyan-600 dark:bg-gray-900/50 dark:border-gray-700 dark:hover:border-cyan-500"
      aria-label={`Read post: ${post.title}`}
    >
      {/* Post Title */}
      <h3 className="font-mono transition-colors mb-2 text-gray-900 group-hover:text-cyan-600 dark:text-gray-100 dark:group-hover:text-cyan-400">
        {post.title}
      </h3>

      {/* Metadata */}
      <div className="flex items-center gap-4 mb-2 text-sm text-gray-500 dark:text-gray-400">
        <span className="flex items-center">
          <Calendar size={14} className="mr-1" />
          {post.date}
        </span>
        {post.readTime && (
          <>
            <span className="text-gray-500 dark:text-gray-400">•</span>
            <span>{post.readTime}</span>
          </>
        )}
      </div>

      {/* Excerpt */}
      {!minimal && (
        <p className="mb-4 text-sm text-gray-700 dark:text-gray-400">
          {post.excerpt}
        </p>
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-1 rounded bg-gray-200 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
};

export default BlogCard;