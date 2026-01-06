export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  narrative?: string;
  image: string;
  tech: string[];
  github?: string;
  live?: string;
  caseStudy?: boolean;
  featured: boolean;
  category: "web" | "systems" | "ml" | "mobile" | "game" | "tools";
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  location?: string;
  description: string[];
  tech?: string[];
}

export interface Skill {
  name: string;
  icon?: string;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  image?: string;
  published: boolean;
  readingTime: string;
  content: string;
  externalUrl?: string;
}

export interface NavItem {
  label: string;
  href: string;
}

// Personal interests/now page types
export interface Book {
  title: string;
  author: string;
  status: "reading" | "completed" | "want-to-read";
  rating?: number; // 1-5
  thoughts?: string;
  coverUrl?: string;
  link?: string;
}

export interface Media {
  title: string;
  type: "movie" | "show" | "documentary" | "anime";
  status: "watching" | "completed" | "want-to-watch";
  rating?: number;
  thoughts?: string;
  posterUrl?: string;
  year?: string;
}

export interface Course {
  title: string;
  platform: string;
  instructor?: string;
  status: "in-progress" | "completed" | "want-to-take";
  topics: string[];
  link?: string;
  thoughts?: string;
}
