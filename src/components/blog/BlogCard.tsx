import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/utils";
import type {BlogPost} from "@/types";

interface BlogCardProps {
  post: BlogPost & { readingTime?: string; coverImage?: string };
  minimal?: boolean;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, minimal = false }) => {
  const { slug, title, date, excerpt, readingTime, tags, coverImage } = post;

  return (
    <Link href={`/blog/${slug}`} className="block group">
      <Card className="h-full transition-all duration-300 hover:border-cyan-500">
        {coverImage && (
          <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
            <Image
              src={coverImage}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        
        <CardHeader>
          <CardTitle className="transition-colors group-hover:text-cyan-600 dark:group-hover:text-cyan-400">
            {title}
          </CardTitle>
          <CardDescription className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <span className="flex items-center">
              <Calendar size={14} className="mr-1" />
              {formatDate(date)}
            </span>
            {readingTime && (
              <span className="flex items-center">
                <Clock size={14} className="mr-1" />
                {readingTime}
              </span>
            )}
          </CardDescription>
        </CardHeader>
        
        {!minimal && (
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300 line-clamp-3">
              {excerpt}
            </p>
          </CardContent>
        )}
        
        <CardFooter className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge 
              key={tag} 
              variant="primary" 
              className="text-xs"
              onClick={(e) => {
                e.preventDefault();
                // Handle tag click if needed
              }}
            >
              {tag}
            </Badge>
          ))}
        </CardFooter>
      </Card>
    </Link>
  );
};

export default BlogCard;