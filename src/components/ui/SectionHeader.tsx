import React from "react";
import Link from "next/link";
import { LucideIcon, ArrowRight } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  icon?: LucideIcon;
  action?: {
    label: string;
    href: string;
  };
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, icon: Icon, action }) => {
  return (
    <div className="flex items-center justify-between mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
      {/* Title with Icon */}
      <div className="flex items-center space-x-2">
        {Icon && (
          <div className="p-1.5 rounded-md bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400">
            <Icon size={18} aria-hidden="true" />
          </div>
        )}
        <h2 className="font-mono text-base font-semibold text-gray-800 dark:text-gray-200">
          {title}
        </h2>
      </div>

      {/* Action Link */}
      {action && (
        <Link
          href={action.href}
          className="flex items-center space-x-1 text-sm transition-all duration-300 font-mono 
            text-gray-600 hover:text-cyan-600 focus:text-cyan-600 
            dark:text-gray-400 dark:hover:text-cyan-400 dark:focus:text-cyan-400
            group"
          aria-label={`Navigate to ${action.label}`}
        >
          <span>{action.label}</span>
          <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      )}
    </div>
  );
};

export default SectionHeader;