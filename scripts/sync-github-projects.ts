/**
 * Sync GitHub Projects
 *
 * Fetches public repositories from GitHub and updates projects.json
 * with any new repos not already in the list.
 *
 * Usage: npx tsx scripts/sync-github-projects.ts
 */

import fs from 'fs';
import path from 'path';

const GITHUB_USERNAME = 'FardinIqbal';
const PROJECTS_FILE = path.join(process.cwd(), 'content', 'projects.json');

interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  topics: string[];
  stargazers_count: number;
  fork: boolean;
  archived: boolean;
  created_at: string;
  updated_at: string;
  pushed_at: string;
}

interface Project {
  id: string;
  title: string;
  category: string;
  featured: boolean;
  description: string;
  narrative?: string;
  tech: string[];
  github: string | null;
  live: string | null;
  image: string;
}

interface ProjectsData {
  _schema: string;
  _categories: Record<string, { title: string; description: string; gradient: string }>;
  projects: Project[];
}

// Map languages to categories
function inferCategory(repo: GitHubRepo): string {
  const lang = repo.language?.toLowerCase() || '';
  const topics = repo.topics.map(t => t.toLowerCase());
  const name = repo.name.toLowerCase();
  const desc = (repo.description || '').toLowerCase();

  // AI-related
  if (topics.includes('ai') || topics.includes('llm') || topics.includes('claude') ||
      name.includes('ai') || desc.includes('ai ') || desc.includes('machine learning')) {
    return 'ai';
  }

  // ML/Data
  if (lang === 'jupyter notebook' || topics.includes('machine-learning') ||
      topics.includes('data-science') || topics.includes('ml') ||
      name.includes('predict') || name.includes('analysis')) {
    return 'ml';
  }

  // Systems
  if (lang === 'c' || lang === 'c++' || lang === 'rust' || lang === 'assembly' ||
      topics.includes('systems-programming') || topics.includes('low-level') ||
      name.includes('memory') || name.includes('allocator') || name.includes('server')) {
    return 'systems';
  }

  // Web
  if (['javascript', 'typescript', 'ruby', 'python'].includes(lang) &&
      (topics.includes('web') || topics.includes('fullstack') || topics.includes('react') ||
       topics.includes('nextjs') || topics.includes('rails') || name.includes('app'))) {
    return 'web';
  }

  // Default to tools
  return 'tools';
}

// Generate readable title from repo name
function formatTitle(name: string): string {
  return name
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase())
    .replace(/Api/g, 'API')
    .replace(/Ai/g, 'AI')
    .replace(/Ml/g, 'ML');
}

// Infer tech stack from repo
function inferTech(repo: GitHubRepo): string[] {
  const tech: string[] = [];

  if (repo.language) {
    tech.push(repo.language);
  }

  // Add common tech from topics
  const techTopics = ['react', 'nextjs', 'typescript', 'tailwind', 'postgresql',
                      'mongodb', 'redis', 'docker', 'aws', 'vercel'];
  for (const topic of repo.topics) {
    if (techTopics.includes(topic.toLowerCase())) {
      tech.push(topic.charAt(0).toUpperCase() + topic.slice(1));
    }
  }

  return [...new Set(tech)].slice(0, 6);
}

async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  const response = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
    {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Portfolio-Sync-Script',
        ...(process.env.GITHUB_TOKEN ? { 'Authorization': `token ${process.env.GITHUB_TOKEN}` } : {})
      }
    }
  );

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

async function main() {
  console.log('Fetching GitHub repositories...');

  // Load existing projects
  const projectsData: ProjectsData = JSON.parse(fs.readFileSync(PROJECTS_FILE, 'utf-8'));
  const existingIds = new Set(projectsData.projects.map(p => p.id));
  const existingGithubUrls = new Set(
    projectsData.projects.filter(p => p.github).map(p => p.github!.toLowerCase())
  );

  // Fetch repos from GitHub
  const repos = await fetchGitHubRepos();
  console.log(`Found ${repos.length} repositories on GitHub`);

  // Filter and process new repos
  const newProjects: Project[] = [];

  for (const repo of repos) {
    // Skip forks, archived, and already-tracked repos
    if (repo.fork || repo.archived) continue;
    if (existingGithubUrls.has(repo.html_url.toLowerCase())) continue;

    // Skip repos without descriptions (likely incomplete)
    if (!repo.description) continue;

    // Generate ID from repo name
    const id = repo.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    if (existingIds.has(id)) continue;

    console.log(`  New repo found: ${repo.name}`);

    newProjects.push({
      id,
      title: formatTitle(repo.name),
      category: inferCategory(repo),
      featured: false, // New repos start as non-featured
      description: repo.description,
      tech: inferTech(repo),
      github: repo.html_url,
      live: null,
      image: `/images/projects/${id}.png`
    });
  }

  if (newProjects.length === 0) {
    console.log('No new projects to add.');
    return;
  }

  // Add new projects to the list
  projectsData.projects.push(...newProjects);

  // Write updated projects file
  fs.writeFileSync(PROJECTS_FILE, JSON.stringify(projectsData, null, 2));

  console.log(`\nAdded ${newProjects.length} new project(s):`);
  newProjects.forEach(p => console.log(`  - ${p.title} (${p.category})`));
  console.log('\nprojects.json updated successfully!');
}

main().catch(console.error);
