"use client";

import React from "react";
import { ChevronRight } from "lucide-react";
import type { Technology } from "@/types";

interface TechGridProps {
  technologies: Technology[];
}

const TechGrid: React.FC<TechGridProps> = ({ technologies }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {technologies.map((tech) => (
        <button
          key={tech.name}
          className="px-4 py-3 rounded-lg text-left flex items-center justify-between group
            transition-all duration-300 border border-gray-200 hover:border-cyan-500
            bg-white text-gray-700 hover:text-cyan-600 shadow-subtle hover:shadow-md
            dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:text-cyan-400"
          aria-label={`Learn more about ${tech.name}`}
        >
          <span className="font-mono font-medium">{tech.name}</span>
          <ChevronRight
            size={16}
            className="text-cyan-500 dark:text-cyan-400 opacity-0 group-hover:opacity-100 
                       transform translate-x-0 group-hover:translate-x-1
                       transition-all duration-300"
          />
        </button>
      ))}
    </div>
  );
};

export default TechGrid;