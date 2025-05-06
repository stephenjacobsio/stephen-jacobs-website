"use client";

import React, { useState, createContext, useContext } from "react";
import { motion } from "framer-motion";

interface TabsContextType {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

function useTabs() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs components must be used within a TabsProvider");
  }
  return context;
}

interface TabsProps {
  defaultTab: string;
  children: React.ReactNode;
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({ 
  defaultTab, 
  children, 
  className = "" 
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
};

interface TabListProps {
  children: React.ReactNode;
  className?: string;
}

const TabList: React.FC<TabListProps> = ({ 
  children, 
  className = "" 
}) => {
  return (
    <div className={`flex border-b border-gray-200 dark:border-gray-700 ${className}`}>
      {children}
    </div>
  );
};

interface TabProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

const Tab: React.FC<TabProps> = ({ 
  id, 
  children, 
  className = "" 
}) => {
  const { activeTab, setActiveTab } = useTabs();
  const isActive = activeTab === id;

  return (
    <button
      className={`relative px-4 py-2 text-sm font-medium transition-colors ${
        isActive
          ? "text-cyan-600 dark:text-cyan-400"
          : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
      } ${className}`}
      onClick={() => setActiveTab(id)}
      role="tab"
      aria-selected={isActive}
      aria-controls={`panel-${id}`}
    >
      {children}
      {isActive && (
        <motion.div
          layoutId="tab-indicator"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-600 dark:bg-cyan-400"
          initial={false}
        />
      )}
    </button>
  );
};

interface TabPanelProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

const TabPanel: React.FC<TabPanelProps> = ({ 
  id, 
  children, 
  className = "" 
}) => {
  const { activeTab } = useTabs();
  const isActive = activeTab === id;

  if (!isActive) return null;

  return (
    <div
      role="tabpanel"
      id={`panel-${id}`}
      aria-labelledby={id}
      className={`py-4 ${className}`}
    >
      {children}
    </div>
  );
};

export { Tabs, TabList, Tab, TabPanel };
