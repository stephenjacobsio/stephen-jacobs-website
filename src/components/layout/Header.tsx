"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun, Folder, Mail } from "lucide-react";

const Header: React.FC = () => {
  const pathname = usePathname();
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load theme from localStorage or default to light mode
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    }
  }, []);

  // Toggle theme and update localStorage
  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setIsDarkMode(!isDarkMode);
  };

  const menuItems = [
    { href: "/about", label: "About", icon: Folder },
    { href: "/blog", label: "Blog", icon: Folder },
    { href: "/projects", label: "Projects", icon: Folder },
    { href: "/contact", label: "Contact", icon: Mail },
  ];

  return (
    <header className="w-full bg-gray-900 text-gray-100 border-b border-gray-800 shadow-md sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link href="/" className="font-mono text-lg flex items-center space-x-2 group transition-all duration-300">
          <span className="text-cyan-400">~</span>
          <span className="text-blue-500">&gt;</span>
          <span className="text-green-500 group-hover:text-green-400">Stephen</span>
          <span className="text-gray-100">Jacobs</span>
        </Link>

        <div className="flex items-center space-x-8">
          {menuItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`font-mono flex items-center space-x-2 transition-all duration-300 ${
                pathname === href
                  ? "text-cyan-400"
                  : "text-gray-400 hover:text-cyan-400"
              }`}
              aria-current={pathname === href ? "page" : undefined}
            >
              <Icon size={18} />
              <span>{label}</span>
            </Link>
          ))}

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md transition-all duration-300 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-50"
            aria-label="Toggle Theme"
          >
            {isDarkMode ? (
              <Sun size={20} className="text-yellow-400" />
            ) : (
              <Moon size={20} className="text-gray-100" />
            )}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;