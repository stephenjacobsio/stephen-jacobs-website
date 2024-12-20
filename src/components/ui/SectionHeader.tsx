import React from "react";
import Link from "next/link";
import { LucideIcon } from "lucide-react";

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
    <div className="flex items-center justify-between mb-6">
      {/* Title with Icon */}
      <div className="flex items-center text-cyan-400 font-mono text-sm">
        {Icon && <Icon size={16} className="mr-2" aria-hidden="true" />}
        <span>{title}</span>
      </div>

      {/* Action Link */}
      {action && (
        <Link
          href={action.href}
          className="text-sm transition-colors duration-200 font-mono 
            text-gray-600 hover:text-gray-900 focus:text-gray-900 
            dark:text-gray-400 dark:hover:text-cyan-400 dark:focus:text-cyan-400"
          aria-label={`Navigate to ${action.label}`}
        >
          {action.label} →
        </Link>
      )}
    </div>
  );
};

export default SectionHeader;