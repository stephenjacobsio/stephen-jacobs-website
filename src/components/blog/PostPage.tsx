import React from "react";
import { Calendar } from "lucide-react";
import type { BlogPost } from "@/types";

interface PostPageProps {
  post: BlogPost;
}

const PostPage: React.FC<PostPageProps> = ({ post }) => {
  return (
    <article className="max-w-4xl mx-auto p-6 rounded-lg border bg-white border-gray-300 text-gray-900 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-mono mb-4">{post.title}</h1>
        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          <span className="flex items-center">
            <Calendar size={16} className="mr-1" />
            {post.date}
          </span>
          {post.readTime && (
            <>
              <span>•</span>
              <span>{post.readTime}</span>
            </>
          )}
        </div>
      </header>

      {/* Content */}
      <div className="prose dark:prose-invert">{post.content}</div>

      {/* Tags */}
      <footer className="mt-8">
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
      </footer>
    </article>
  );
};

export default PostPage;