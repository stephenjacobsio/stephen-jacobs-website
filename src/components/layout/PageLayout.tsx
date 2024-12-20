import React from "react";
import Header from "@/components/layout/Header";
import TerminalWindow from "@/components/ui/TerminalWindow";

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  path?: string;
  fullWidth?: boolean;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  title,
  path,
  fullWidth = false,
}) => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-200">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="py-12">
        <div
          className={`mx-auto px-4 ${
            fullWidth ? "max-w-7xl" : "max-w-5xl"
          }`}
        >
          {/* Terminal Window Wrapper */}
          <TerminalWindow title={title} path={path}>
            {children}
          </TerminalWindow>
        </div>
      </main>
    </div>
  );
};

export default PageLayout;