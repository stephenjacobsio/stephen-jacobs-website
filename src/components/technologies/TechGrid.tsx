"use client";

import React from "react";
import { ChevronRight } from "lucide-react";
import type { Technology } from "@/types";

interface TechGridProps {
  technologies: Technology[];
}

const TechGrid: React.FC<TechGridProps> = ({ technologies }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      {technologies.map((tech) => (
        <button
          key={tech.name}
          className="px-4 py-2 rounded-lg text-left flex items-center justify-between group
            transition-all duration-200 border border-gray-300 hover:border-cyan-500
            bg-gray-100 text-gray-700 hover:text-cyan-400 hover:bg-gray-200
            dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
          aria-label={`Learn more about ${tech.name}`}
        >
          <span className="font-mono">{tech.name}</span>
          <ChevronRight
            size={18}
            className="text-gray-400 dark:text-gray-500 opacity-0 group-hover:opacity-100 
                       transition-opacity duration-200"
          />
        </button>
      ))}
    </div>
  );
};

export default TechGrid;