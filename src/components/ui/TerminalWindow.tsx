import React from "react";

interface TerminalWindowProps {
  children: React.ReactNode;
  title?: string;
  path?: string;
  className?: string;
}

const TerminalWindow: React.FC<TerminalWindowProps> = ({
  children,
  title = "stephenjacobs.io",
  path = "~/stephen",
  className = "",
}) => {
  return (
    <div
      className={`rounded-lg border shadow-xl overflow-hidden transition-colors duration-200 
        bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700 ${className}`}
    >
      {/* Terminal header */}
      <div
        className={`flex items-center justify-between p-4 border-b 
          bg-gray-100 border-gray-200 dark:bg-gray-900 dark:border-gray-700`}
      >
        {/* Traffic light buttons and path */}
        <div className="flex items-center space-x-3">
          {/* Traffic light buttons */}
          <div className="flex space-x-2" aria-hidden="true">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          {/* Current path */}
          <div
            className="font-mono text-sm pl-3 border-l text-gray-600 border-gray-300 dark:text-gray-400 dark:border-gray-700"
            aria-label="Terminal path"
          >
            {path}
          </div>
        </div>

        {/* Terminal title */}
        {title && (
          <div
            className="font-mono text-sm text-gray-600 dark:text-gray-400"
            aria-label="Terminal title"
          >
            {title}
          </div>
        )}
      </div>

      {/* Content area */}
      <div className="p-6">{children}</div>
    </div>
  );
};

export default TerminalWindow;