/**
 * Content Loader Utilities
 *
 * This module loads content from JSON files in the /content directory.
 * Optimized for easy updates - just edit the JSON files and rebuild.
 *
 * USAGE FOR CLAUDE:
 * - Profile info: Read/edit content/profile.json
 * - Work experience: Read/edit content/experience.json
 * - Projects: Read/edit content/projects.json
 * - Books: Read/edit content/books.json
 * - Movies/Shows: Read/edit content/media.json
 * - Courses: Read/edit content/courses.json
 * - Skills: Read/edit content/skills.json
 */

import fs from 'fs';
import path from 'path';

const contentDir = path.join(process.cwd(), 'content');

// ============================================
// Type Definitions
// ============================================

export interface Profile {
  name: string;
  tagline: string;
  bio: string[];
  location: string;
  email: string;
  education: {
    school: string;
    degree: string;
    major: string;
    graduationDate: string;
    gpa?: string;
  };
  social: {
    github: string;
    linkedin: string;
    twitter?: string;
  };
  resumeUrl: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  period: string;
  type: 'full-time' | 'part-time' | 'internship' | 'contract' | 'fellowship';
  description: string;
  highlights: string[];
  tech: string[];
}

export interface Project {
  id: string;
  title: string;
  category: 'systems' | 'ml' | 'web' | 'tools';
  featured: boolean;
  description: string;
  narrative?: string;
  tech: string[];
  github: string | null;
  live: string | null;
  image: string;
}

export interface ProjectCategory {
  title: string;
  description: string;
  gradient: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  status: 'reading' | 'completed' | 'want-to-read';
  rating: number | null;
  thoughts: string;
}

export interface Media {
  id: string;
  title: string;
  type: 'movie' | 'show' | 'documentary' | 'anime';
  status: 'watching' | 'completed' | 'want-to-watch';
  rating: number | null;
  year: string;
  thoughts: string;
}

export interface Course {
  id: string;
  title: string;
  platform: string;
  instructor: string | null;
  status: 'in-progress' | 'completed' | 'want-to-take';
  topics: string[];
  link: string;
  thoughts: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

// ============================================
// Content Loaders
// ============================================

function loadJson<T>(filename: string): T {
  const filePath = path.join(contentDir, filename);
  const content = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(content);
}

export function getProfile(): Profile {
  const data = loadJson<{ profile: Profile }>('profile.json');
  return data.profile;
}

export function getExperience(): Experience[] {
  const data = loadJson<{ experience: Experience[] }>('experience.json');
  return data.experience;
}

export function getProjects(): Project[] {
  const data = loadJson<{ projects: Project[] }>('projects.json');
  return data.projects;
}

export function getProjectCategories(): Record<string, ProjectCategory> {
  const data = loadJson<{ _categories: Record<string, ProjectCategory> }>('projects.json');
  return data._categories;
}

export function getFeaturedProjects(): Project[] {
  return getProjects().filter(p => p.featured);
}

export function getProjectsByCategory(category: string): Project[] {
  return getProjects().filter(p => p.category === category);
}

export function getBooks(): Book[] {
  const data = loadJson<{ books: Book[] }>('books.json');
  return data.books;
}

export function getCurrentlyReading(): Book[] {
  return getBooks().filter(b => b.status === 'reading');
}

export function getCompletedBooks(): Book[] {
  return getBooks().filter(b => b.status === 'completed');
}

export function getMedia(): Media[] {
  const data = loadJson<{ media: Media[] }>('media.json');
  return data.media;
}

export function getCurrentlyWatching(): Media[] {
  return getMedia().filter(m => m.status === 'watching');
}

export function getCompletedMedia(): Media[] {
  return getMedia().filter(m => m.status === 'completed');
}

export function getCourses(): Course[] {
  const data = loadJson<{ courses: Course[] }>('courses.json');
  return data.courses;
}

export function getCurrentCourses(): Course[] {
  return getCourses().filter(c => c.status === 'in-progress');
}

export function getCompletedCourses(): Course[] {
  return getCourses().filter(c => c.status === 'completed');
}

export function getSkillCategories(): SkillCategory[] {
  const data = loadJson<{ categories: SkillCategory[] }>('skills.json');
  return data.categories;
}

// ============================================
// Aggregated Data Helpers
// ============================================

export function getAllContent() {
  return {
    profile: getProfile(),
    experience: getExperience(),
    projects: getProjects(),
    projectCategories: getProjectCategories(),
    books: getBooks(),
    media: getMedia(),
    courses: getCourses(),
    skills: getSkillCategories(),
  };
}

export function getNowPageContent() {
  return {
    currentlyReading: getCurrentlyReading(),
    completedBooks: getCompletedBooks().slice(0, 5),
    currentlyWatching: getCurrentlyWatching(),
    completedMedia: getCompletedMedia().slice(0, 5),
    currentCourses: getCurrentCourses(),
    completedCourses: getCompletedCourses().slice(0, 3),
  };
}
