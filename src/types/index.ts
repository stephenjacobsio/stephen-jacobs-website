export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  category: string;
  featured?: boolean;
  githubUrl?: string;
  demoUrl?: string;
  imageUrl?: string;
  relatedProjects?: string[];
  lastUpdated?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content?: string;
  tags: string[];
  category: string;
  featured?: boolean;
  slug: string;
  readTime?: string;
  imageUrl?: string;
  lastUpdated?: string;
}

export interface Technology {
  name: string;
  category: string;
  relatedProjects?: string[];
  featured?: boolean;
  lastUsed?: string;
  icon?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  label: string;
  icon: string;
  visible?: boolean;
}

export interface NavigationItem {
  label: string;
  path: string;
  icon?: string;
  requiresAuth?: boolean;
}

export interface WorkExperience {
  title: string;
  company: string;
  period: string;
  description: string[];
  location?: string;
  remote?: boolean;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  credentialId?: string;
  expires?: string;
}

export interface Education {
  degree: string;
  school: string;
  period: string;
  location?: string;
  honors?: string[];
}