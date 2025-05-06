"use client";

import React from "react";
import Link from "next/link";
import { Github, Linkedin, Mail, Heart } from "lucide-react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: Github, label: "GitHub", href: "https://github.com/stephenjacobs" },
    { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/stephenjacobs" },
    { icon: Mail, label: "Email", href: "mailto:contact@stephenjacobs.io" },
  ];

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Projects", href: "/projects" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="font-mono text-xl flex items-center space-x-2 group mb-4">
              <span className="text-cyan-500">~</span>
              <span className="text-blue-500">&gt;</span>
              <span className="text-green-500">Stephen</span>
              <span className="text-gray-800 dark:text-gray-200">Jacobs</span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
              Full-stack developer passionate about building elegant solutions with modern technologies.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="p-2 rounded-full text-gray-600 hover:text-cyan-500 dark:text-gray-400 dark:hover:text-cyan-400 transition-colors"
                >
                  <link.icon size={20} />
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-mono text-gray-800 dark:text-gray-200 font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-gray-600 hover:text-cyan-500 dark:text-gray-400 dark:hover:text-cyan-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-mono text-gray-800 dark:text-gray-200 font-semibold mb-4">Contact</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Have a question or want to work together?
            </p>
            <Link 
              href="/contact"
              className="btn-primary inline-block"
            >
              Get in touch
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 dark:border-gray-700 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} Stephen Jacobs. All rights reserved.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm flex items-center">
            Made with <Heart size={14} className="mx-1 text-red-500" /> using Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
