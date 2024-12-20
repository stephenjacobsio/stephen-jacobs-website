import React from "react";
import { Terminal } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import BlogCard from "@/components/blog/BlogCard";
import type { BlogPost } from "@/types";

interface RecentPostsProps {
  posts: BlogPost[];
}

const RecentPosts: React.FC<RecentPostsProps> = ({ posts }) => {
  return (
    <section className="space-y-6">
      {/* Section Header */}
      <SectionHeader
        title="Recent Posts"
        icon={Terminal}
        action={{
          label: "View all posts",
          href: "/blog",
        }}
      />

      {/* Posts List */}
      {posts.length > 0 ? (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li
              key={post.id}
              className="group flex justify-between items-center border-b border-gray-200 dark:border-gray-700 
                         py-3 transition-all hover:bg-gray-100 dark:hover:bg-gray-800/50 rounded-lg px-4"
            >
              <div className="flex-1">
                <h3 className="text-lg font-mono text-gray-800 dark:text-gray-100 group-hover:text-cyan-400 transition-colors">
                  {post.title}
                </h3>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                <span className="mr-2">⏳</span>
                {post.date}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center py-8">
          <p className="font-mono text-gray-700 dark:text-gray-400">
            No posts available yet
          </p>
        </div>
      )}
    </section>
  );
};

export default RecentPosts;