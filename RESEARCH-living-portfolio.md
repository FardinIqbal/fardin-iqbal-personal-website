# Research: Living Portfolio Website Architecture

## Executive Summary

A "living" portfolio website that self-updates from Notion content is achievable using a combination of Next.js ISR/on-demand revalidation, Notion API webhooks, AI-powered content processing, and generative visual systems. The architecture requires no manual updates while continuously evolving based on what the user writes, thinks, and does.

**Recommended Stack:**
- **Framework:** Next.js 14+ with App Router
- **CMS:** Notion API (official) + react-notion-x for rendering
- **Sync:** Notion webhooks + GitHub Actions cron fallback
- **Database:** Supabase (caching, state, activity logs)
- **AI:** OpenAI GPT-4 for summarization/categorization
- **Visuals:** Three.js + P5.js for generative elements
- **Animations:** Framer Motion (now Motion)
- **Deployment:** Vercel (edge functions, on-demand ISR)

---

## 1. Real-Time Notion Sync

### Three Sync Strategies (Use All Three)

#### Strategy 1: Notion Webhooks (Primary)
Notion now offers native webhooks that send HTTP POST requests when pages/databases change.

```typescript
// /app/api/notion-webhook/route.ts
import { revalidatePath, revalidateTag } from 'next/cache';
import crypto from 'crypto';

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get('x-notion-signature');

  // Validate webhook signature
  const expectedSignature = crypto
    .createHmac('sha256', process.env.NOTION_WEBHOOK_SECRET!)
    .update(body)
    .digest('hex');

  if (signature !== expectedSignature) {
    return Response.json({ error: 'Invalid signature' }, { status: 401 });
  }

  const payload = JSON.parse(body);

  // Revalidate based on what changed
  if (payload.database_id === process.env.NOTION_PROJECTS_DB) {
    revalidateTag('projects');
    revalidatePath('/projects');
  }

  if (payload.database_id === process.env.NOTION_NOTES_DB) {
    revalidateTag('notes');
    revalidatePath('/');
  }

  // Trigger AI processing for new content
  await processNewContent(payload);

  return Response.json({ revalidated: true });
}
```

**Webhook Setup:**
1. Go to Notion Integration settings
2. Enable webhooks for your integration
3. Add your endpoint URL: `https://yoursite.com/api/notion-webhook`
4. Store the shared secret as `NOTION_WEBHOOK_SECRET`

#### Strategy 2: GitHub Actions Cron (Fallback)
Webhooks can fail. Use scheduled rebuilds as a safety net.

```yaml
# .github/workflows/sync-notion.yml
name: Sync Notion Content

on:
  schedule:
    # Run every 15 minutes (offset from hour to avoid GitHub load)
    - cron: '15,45 * * * *'
  workflow_dispatch: # Manual trigger

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Vercel Revalidation
        run: |
          curl -X POST "${{ secrets.REVALIDATE_URL }}?secret=${{ secrets.REVALIDATE_SECRET }}"

      - name: Sync to Supabase Cache
        run: |
          npx ts-node scripts/sync-notion-to-supabase.ts
        env:
          NOTION_TOKEN: ${{ secrets.NOTION_TOKEN }}
          SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
          SUPABASE_KEY: ${{ secrets.SUPABASE_KEY }}
```

#### Strategy 3: Next.js Time-Based ISR (Last Resort)
Set a revalidation period for static pages.

```typescript
// app/projects/page.tsx
export const revalidate = 300; // Revalidate every 5 minutes max

export default async function ProjectsPage() {
  const projects = await getNotionProjects();
  return <ProjectsGrid projects={projects} />;
}
```

### Notion API Delta Sync Pattern

Query only changed content since last sync:

```typescript
// lib/notion-sync.ts
import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_TOKEN });

export async function getChangedPages(databaseId: string, since: Date) {
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      timestamp: 'last_edited_time',
      last_edited_time: {
        after: since.toISOString()
      }
    },
    sorts: [
      { timestamp: 'last_edited_time', direction: 'descending' }
    ]
  });

  return response.results;
}
```

**Important:** Last edited time is rounded to the nearest minute, so sync intervals should be >= 2 minutes.

### Notion API Best Practices

1. **Rate Limits:** 3 requests/second average. Use exponential backoff.
2. **Caching:** Cache responses in Supabase to reduce API calls.
3. **Pagination:** Handle `has_more` and `next_cursor` for large databases.
4. **Block Retrieval:** Use `notion.blocks.children.list()` to get page content.

---

## 2. Dynamic Content Evolution

### Auto-Updating Skills Based on Project Mentions

Use NLP to extract skills from project descriptions and weight them by recency.

```typescript
// lib/skills-extractor.ts
import OpenAI from 'openai';

const openai = new OpenAI();

export async function extractSkillsFromProjects(projects: Project[]) {
  const projectTexts = projects.map(p => ({
    id: p.id,
    text: `${p.title} ${p.description} ${p.tags.join(' ')}`,
    date: p.lastEdited
  }));

  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{
      role: 'system',
      content: `Extract technical skills from project descriptions.
                Return JSON: { skills: [{ name: string, mentions: number, contexts: string[] }] }`
    }, {
      role: 'user',
      content: JSON.stringify(projectTexts)
    }],
    response_format: { type: 'json_object' }
  });

  const extracted = JSON.parse(completion.choices[0].message.content);

  // Weight by recency (more recent = higher weight)
  return weightSkillsByRecency(extracted.skills, projectTexts);
}

function weightSkillsByRecency(skills: Skill[], projects: Project[]) {
  const now = Date.now();
  const ONE_MONTH = 30 * 24 * 60 * 60 * 1000;

  return skills.map(skill => {
    const recentMentions = projects.filter(p =>
      skill.contexts.includes(p.id) &&
      (now - new Date(p.date).getTime()) < ONE_MONTH * 3
    );

    const recencyWeight = recentMentions.length / Math.max(skill.mentions, 1);

    return {
      ...skill,
      weight: skill.mentions * (1 + recencyWeight),
      isHot: recencyWeight > 0.5 // Recently active skill
    };
  }).sort((a, b) => b.weight - a.weight);
}
```

### Currently Reading/Learning Section

Create a Notion database with Status property for auto-population:

```typescript
// lib/notion-reading.ts
export async function getCurrentlyReading() {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_READING_DB!,
    filter: {
      property: 'Status',
      select: { equals: 'Reading' }
    },
    sorts: [
      { property: 'Started', direction: 'descending' }
    ],
    page_size: 5
  });

  return response.results.map(page => ({
    title: page.properties.Name.title[0]?.plain_text,
    author: page.properties.Author.rich_text[0]?.plain_text,
    progress: page.properties.Progress.number,
    cover: page.properties.Cover.files[0]?.file?.url,
    startedAt: page.properties.Started.date?.start
  }));
}
```

### Recent Thoughts/Notes Feature

```typescript
// lib/notion-notes.ts
export async function getRecentThoughts(limit = 10) {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_NOTES_DB!,
    filter: {
      and: [
        { property: 'Public', checkbox: { equals: true } },
        { property: 'Type', select: { equals: 'Thought' } }
      ]
    },
    sorts: [
      { timestamp: 'created_time', direction: 'descending' }
    ],
    page_size: limit
  });

  // Get AI summary for each note
  return Promise.all(response.results.map(async page => {
    const blocks = await notion.blocks.children.list({ block_id: page.id });
    const content = blocksToPlainText(blocks.results);

    return {
      id: page.id,
      content: content.slice(0, 280), // Tweet-length preview
      fullContent: content,
      createdAt: page.created_time,
      tags: await extractTags(content)
    };
  }));
}
```

### "Working On Right Now" Widget

```typescript
// components/CurrentlyWorkingOn.tsx
'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function CurrentlyWorkingOn() {
  const [activity, setActivity] = useState<Activity | null>(null);

  useEffect(() => {
    // Poll for updates every 30 seconds
    const fetchActivity = async () => {
      const res = await fetch('/api/current-activity');
      const data = await res.json();
      setActivity(data);
    };

    fetchActivity();
    const interval = setInterval(fetchActivity, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {activity && (
        <motion.div
          key={activity.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="flex items-center gap-3 p-4 rounded-lg bg-green-50 dark:bg-green-900/20"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
          </span>
          <div>
            <p className="text-sm text-green-600 dark:text-green-400">
              Currently working on
            </p>
            <p className="font-medium">{activity.title}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

---

## 3. Living Visual Design

### Generative Hero with P5.js

Create visuals that respond to content characteristics:

```typescript
// components/GenerativeHero.tsx
'use client';

import { useEffect, useRef } from 'react';
import p5 from 'p5';

interface Props {
  contentMood: 'creative' | 'technical' | 'reflective';
  activityLevel: number; // 0-1, based on recent commits/notes
  dominantTopics: string[];
}

export function GenerativeHero({ contentMood, activityLevel, dominantTopics }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const sketch = (p: p5) => {
      const particles: Particle[] = [];
      const particleCount = Math.floor(50 + activityLevel * 100);

      // Color palette based on content mood
      const palettes = {
        creative: ['#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3'],
        technical: ['#667EEA', '#764BA2', '#66A6FF', '#89F7FE'],
        reflective: ['#A8EDEA', '#FED6E3', '#D299C2', '#FEF9D7']
      };

      const colors = palettes[contentMood];

      p.setup = () => {
        p.createCanvas(containerRef.current!.offsetWidth, 400);
        for (let i = 0; i < particleCount; i++) {
          particles.push(new Particle(p, colors));
        }
      };

      p.draw = () => {
        p.background(0, 0, 0, 20); // Trail effect

        particles.forEach(particle => {
          particle.update(activityLevel);
          particle.display();

          // Connect nearby particles (more connections when active)
          if (activityLevel > 0.5) {
            particles.forEach(other => {
              const d = p.dist(particle.x, particle.y, other.x, other.y);
              if (d < 100) {
                p.stroke(255, 50);
                p.line(particle.x, particle.y, other.x, other.y);
              }
            });
          }
        });
      };
    };

    const p5Instance = new p5(sketch, containerRef.current);
    return () => p5Instance.remove();
  }, [contentMood, activityLevel]);

  return <div ref={containerRef} className="w-full h-[400px]" />;
}

class Particle {
  // ... particle implementation
}
```

### Dynamic Color Scheme Based on Content

```typescript
// lib/theme-generator.ts
import OpenAI from 'openai';

const openai = new OpenAI();

export async function generateThemeFromContent(recentContent: string[]) {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{
      role: 'system',
      content: `Analyze the mood and themes of the content.
                Return a color palette as JSON:
                {
                  mood: 'creative' | 'technical' | 'reflective' | 'energetic',
                  primary: '#hex',
                  secondary: '#hex',
                  accent: '#hex',
                  background: '#hex',
                  text: '#hex'
                }`
    }, {
      role: 'user',
      content: recentContent.join('\n\n')
    }],
    response_format: { type: 'json_object' }
  });

  return JSON.parse(completion.choices[0].message.content);
}

// Apply theme via CSS variables
export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.style.setProperty('--color-primary', theme.primary);
  root.style.setProperty('--color-secondary', theme.secondary);
  root.style.setProperty('--color-accent', theme.accent);
  root.style.setProperty('--color-background', theme.background);
  root.style.setProperty('--color-text', theme.text);
}
```

### Time-of-Day Variations

```typescript
// lib/time-theme.ts
export function getTimeBasedTheme() {
  const hour = new Date().getHours();

  if (hour >= 6 && hour < 12) {
    return {
      period: 'morning',
      warmth: 0.3,
      brightness: 0.9,
      gradientStart: '#FFE5B4',
      gradientEnd: '#FF9A56'
    };
  } else if (hour >= 12 && hour < 17) {
    return {
      period: 'afternoon',
      warmth: 0.5,
      brightness: 1,
      gradientStart: '#87CEEB',
      gradientEnd: '#4682B4'
    };
  } else if (hour >= 17 && hour < 21) {
    return {
      period: 'evening',
      warmth: 0.7,
      brightness: 0.7,
      gradientStart: '#FF6B6B',
      gradientEnd: '#4A154B'
    };
  } else {
    return {
      period: 'night',
      warmth: 0.2,
      brightness: 0.4,
      gradientStart: '#1A1A2E',
      gradientEnd: '#16213E'
    };
  }
}
```

### Framer Motion State-Based Animations

```typescript
// components/AnimatedCard.tsx
'use client';

import { motion } from 'framer-motion';

interface Props {
  isRecent: boolean;
  isFeatured: boolean;
  children: React.ReactNode;
}

export function AnimatedCard({ isRecent, isFeatured, children }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{
        opacity: 1,
        scale: 1,
        boxShadow: isFeatured
          ? '0 20px 40px rgba(0,0,0,0.2)'
          : '0 4px 6px rgba(0,0,0,0.1)'
      }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      transition={{
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      className={`
        relative rounded-xl p-6
        ${isRecent ? 'ring-2 ring-green-500/50' : ''}
        ${isFeatured ? 'col-span-2' : ''}
      `}
    >
      {isRecent && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full"
        >
          New
        </motion.span>
      )}
      {children}
    </motion.div>
  );
}
```

---

## 4. Self-Assembling Portfolio

### Auto-Categorization with AI

```typescript
// lib/auto-categorize.ts
import OpenAI from 'openai';

const openai = new OpenAI();

const CATEGORIES = [
  'Web Development',
  'Mobile Apps',
  'Data Science',
  'Design',
  'Writing',
  'Open Source',
  'Personal'
];

export async function categorizeContent(content: ContentItem[]) {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{
      role: 'system',
      content: `Categorize each piece of content into one or more categories.
                Available categories: ${CATEGORIES.join(', ')}
                Return JSON: { items: [{ id: string, categories: string[], confidence: number }] }`
    }, {
      role: 'user',
      content: JSON.stringify(content.map(c => ({
        id: c.id,
        title: c.title,
        description: c.description,
        tags: c.tags
      })))
    }],
    response_format: { type: 'json_object' }
  });

  return JSON.parse(completion.choices[0].message.content);
}
```

### Projects from GitHub Commits + Notion Notes

```typescript
// lib/project-assembler.ts
import { Octokit } from '@octokit/rest';

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

export async function assembleProjects() {
  // Get recent GitHub activity
  const { data: events } = await octokit.activity.listEventsForAuthenticatedUser({
    username: process.env.GITHUB_USERNAME!,
    per_page: 100
  });

  // Group commits by repository
  const repoActivity = events
    .filter(e => e.type === 'PushEvent')
    .reduce((acc, event) => {
      const repo = event.repo.name;
      if (!acc[repo]) {
        acc[repo] = { commits: 0, lastActivity: event.created_at };
      }
      acc[repo].commits += event.payload.commits?.length || 0;
      return acc;
    }, {} as Record<string, { commits: number; lastActivity: string }>);

  // Get corresponding Notion pages
  const notionProjects = await getNotionProjects();

  // Merge data
  return notionProjects.map(project => {
    const githubData = project.githubUrl
      ? repoActivity[extractRepoName(project.githubUrl)]
      : null;

    return {
      ...project,
      recentActivity: githubData?.commits || 0,
      lastUpdated: githubData?.lastActivity || project.lastEdited,
      isActive: (githubData?.commits || 0) > 5 // Active if >5 commits recently
    };
  });
}
```

### Auto-Generating Blog Posts from Notion Captures

```typescript
// lib/blog-generator.ts
import OpenAI from 'openai';

const openai = new OpenAI();

export async function generateBlogDraft(notes: NotionNote[]) {
  // Group related notes by topic
  const groupedNotes = await groupNotesByTopic(notes);

  // Generate blog post outline for each group
  const drafts = await Promise.all(
    Object.entries(groupedNotes).map(async ([topic, topicNotes]) => {
      if (topicNotes.length < 3) return null; // Need at least 3 notes

      const completion = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [{
          role: 'system',
          content: `You are a blog post assistant. Given a collection of notes on a topic,
                    create a blog post draft that synthesizes the ideas.
                    Include: title, outline, key points, and a draft introduction.`
        }, {
          role: 'user',
          content: `Topic: ${topic}\n\nNotes:\n${topicNotes.map(n => n.content).join('\n\n---\n\n')}`
        }]
      });

      return {
        topic,
        draft: completion.choices[0].message.content,
        sourceNotes: topicNotes.map(n => n.id),
        generatedAt: new Date().toISOString()
      };
    })
  );

  return drafts.filter(Boolean);
}

async function groupNotesByTopic(notes: NotionNote[]) {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{
      role: 'system',
      content: `Group these notes by topic. Return JSON: { groups: { [topic]: [noteIds] } }`
    }, {
      role: 'user',
      content: JSON.stringify(notes.map(n => ({ id: n.id, content: n.content.slice(0, 500) })))
    }],
    response_format: { type: 'json_object' }
  });

  const { groups } = JSON.parse(completion.choices[0].message.content);

  return Object.fromEntries(
    Object.entries(groups).map(([topic, ids]) => [
      topic,
      notes.filter(n => (ids as string[]).includes(n.id))
    ])
  );
}
```

### Skill Weighting by Recent Activity

```typescript
// lib/skill-weights.ts
interface SkillActivity {
  skill: string;
  sources: Array<{
    type: 'commit' | 'project' | 'note' | 'reading';
    date: Date;
    weight: number;
  }>;
}

export function calculateSkillWeights(activities: SkillActivity[]) {
  const now = Date.now();
  const DECAY_RATE = 0.1; // Decay per month

  return activities.map(({ skill, sources }) => {
    const weightedScore = sources.reduce((total, source) => {
      const monthsAgo = (now - source.date.getTime()) / (30 * 24 * 60 * 60 * 1000);
      const decayFactor = Math.exp(-DECAY_RATE * monthsAgo);
      return total + source.weight * decayFactor;
    }, 0);

    return {
      skill,
      score: weightedScore,
      trend: calculateTrend(sources),
      lastUsed: new Date(Math.max(...sources.map(s => s.date.getTime())))
    };
  }).sort((a, b) => b.score - a.score);
}

function calculateTrend(sources: SkillActivity['sources']) {
  const recent = sources.filter(s =>
    s.date.getTime() > Date.now() - 30 * 24 * 60 * 60 * 1000
  ).length;
  const older = sources.filter(s =>
    s.date.getTime() <= Date.now() - 30 * 24 * 60 * 60 * 1000 &&
    s.date.getTime() > Date.now() - 60 * 24 * 60 * 60 * 1000
  ).length;

  if (recent > older * 1.5) return 'rising';
  if (recent < older * 0.5) return 'falling';
  return 'stable';
}
```

---

## 5. Ambient Awareness

### Living Pulse - Last Updated Indicator

```typescript
// components/LivingPulse.tsx
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';

export function LivingPulse() {
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const fetchLastUpdate = async () => {
      const res = await fetch('/api/last-activity');
      const { timestamp, isActive } = await res.json();
      setLastUpdate(new Date(timestamp));
      setIsLive(isActive);
    };

    fetchLastUpdate();
    const interval = setInterval(fetchLastUpdate, 60000);
    return () => clearInterval(interval);
  }, []);

  if (!lastUpdate) return null;

  const timeSince = formatDistanceToNow(lastUpdate, { addSuffix: true });
  const isRecent = Date.now() - lastUpdate.getTime() < 60 * 60 * 1000; // < 1 hour

  return (
    <motion.div
      className="flex items-center gap-2 text-sm text-gray-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.span
        className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-500' : isRecent ? 'bg-yellow-500' : 'bg-gray-400'}`}
        animate={isLive ? { scale: [1, 1.2, 1] } : {}}
        transition={{ repeat: Infinity, duration: 2 }}
      />
      <span>
        {isLive ? 'Live now' : `Updated ${timeSince}`}
      </span>
    </motion.div>
  );
}
```

### Activity Heatmap Component

```typescript
// components/ActivityHeatmap.tsx
'use client';

import { useEffect, useRef } from 'react';

interface DayActivity {
  date: string;
  count: number;
  activities: Array<{ type: string; title: string }>;
}

export function ActivityHeatmap({ data }: { data: DayActivity[] }) {
  const weeks = groupIntoWeeks(data);

  const getColor = (count: number) => {
    if (count === 0) return 'bg-gray-100 dark:bg-gray-800';
    if (count < 3) return 'bg-green-200 dark:bg-green-900';
    if (count < 6) return 'bg-green-400 dark:bg-green-700';
    if (count < 10) return 'bg-green-600 dark:bg-green-500';
    return 'bg-green-800 dark:bg-green-400';
  };

  return (
    <div className="flex gap-1">
      {weeks.map((week, i) => (
        <div key={i} className="flex flex-col gap-1">
          {week.map((day, j) => (
            <div
              key={`${i}-${j}`}
              className={`w-3 h-3 rounded-sm ${getColor(day?.count || 0)} cursor-pointer transition-transform hover:scale-125`}
              title={day ? `${day.date}: ${day.count} activities` : ''}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function groupIntoWeeks(data: DayActivity[]): (DayActivity | null)[][] {
  // Implementation to group 365 days into weeks...
}
```

### Recent Thoughts Ticker

```typescript
// components/ThoughtsTicker.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Thought {
  id: string;
  content: string;
  createdAt: string;
}

export function ThoughtsTicker({ thoughts }: { thoughts: Thought[] }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % thoughts.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [thoughts.length]);

  return (
    <div className="relative h-24 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={thoughts[current].id}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex items-center"
        >
          <blockquote className="text-lg italic text-gray-600 dark:text-gray-300">
            "{thoughts[current].content}"
          </blockquote>
        </motion.div>
      </AnimatePresence>

      {/* Progress indicators */}
      <div className="absolute bottom-0 left-0 right-0 flex gap-1 justify-center">
        {thoughts.map((_, i) => (
          <motion.div
            key={i}
            className={`h-1 rounded-full ${i === current ? 'w-8 bg-primary' : 'w-2 bg-gray-300'}`}
            layout
          />
        ))}
      </div>
    </div>
  );
}
```

---

## 6. Technical Architecture

### Complete System Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           NOTION WORKSPACE                               │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │ Projects │  │  Notes   │  │ Reading  │  │  Blog    │  │  Now     │  │
│  │    DB    │  │    DB    │  │    DB    │  │    DB    │  │   Page   │  │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘  │
└───────┼─────────────┼─────────────┼─────────────┼─────────────┼────────┘
        │             │             │             │             │
        └─────────────┴──────┬──────┴─────────────┴─────────────┘
                             │
                    ┌────────▼────────┐
                    │  Notion Webhook │
                    │   or API Poll   │
                    └────────┬────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
        ▼                    ▼                    ▼
┌───────────────┐   ┌───────────────┐   ┌───────────────┐
│ Vercel Edge   │   │ GitHub Action │   │  Supabase     │
│  Functions    │   │  Cron (15min) │   │  Database     │
│ (Webhook RX)  │   │  (Fallback)   │   │  (Cache/State)│
└───────┬───────┘   └───────┬───────┘   └───────┬───────┘
        │                   │                   │
        └───────────────────┼───────────────────┘
                           │
                  ┌────────▼────────┐
                  │   AI Processing │
                  │ (OpenAI GPT-4)  │
                  │ - Categorize    │
                  │ - Summarize     │
                  │ - Extract skills│
                  │ - Generate theme│
                  └────────┬────────┘
                           │
                  ┌────────▼────────┐
                  │   Next.js App   │
                  │   (Vercel)      │
                  │                 │
                  │ - ISR Pages     │
                  │ - React Server  │
                  │   Components    │
                  │ - Framer Motion │
                  │ - P5.js/Three.js│
                  └────────┬────────┘
                           │
                  ┌────────▼────────┐
                  │   Portfolio     │
                  │   Website       │
                  │                 │
                  │ ✓ Auto-updating │
                  │ ✓ Living visuals│
                  │ ✓ Zero manual   │
                  │   maintenance   │
                  └─────────────────┘
```

### Supabase Schema

```sql
-- Cache Notion content
CREATE TABLE notion_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  notion_id TEXT UNIQUE NOT NULL,
  type TEXT NOT NULL, -- 'project', 'note', 'reading', etc.
  content JSONB NOT NULL,
  last_edited_time TIMESTAMPTZ NOT NULL,
  synced_at TIMESTAMPTZ DEFAULT NOW(),
  processed_at TIMESTAMPTZ,
  ai_metadata JSONB -- categories, skills, summary, etc.
);

-- Activity log for heatmap/pulse
CREATE TABLE activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL, -- 'commit', 'note', 'project_update', etc.
  source TEXT NOT NULL, -- 'github', 'notion', etc.
  title TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Generated themes
CREATE TABLE generated_themes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mood TEXT NOT NULL,
  colors JSONB NOT NULL,
  generated_from TEXT[], -- notion_ids used to generate
  created_at TIMESTAMPTZ DEFAULT NOW(),
  active BOOLEAN DEFAULT FALSE
);

-- Indexes
CREATE INDEX idx_notion_cache_type ON notion_cache(type);
CREATE INDEX idx_notion_cache_synced ON notion_cache(synced_at);
CREATE INDEX idx_activity_log_date ON activity_log(created_at);
CREATE INDEX idx_activity_log_type ON activity_log(type);
```

### Edge Functions for Dynamic Content

```typescript
// supabase/functions/process-notion-update/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

serve(async (req) => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );

  const { notionId, content, type } = await req.json();

  // Update cache
  await supabase.from('notion_cache').upsert({
    notion_id: notionId,
    type,
    content,
    last_edited_time: content.last_edited_time,
    synced_at: new Date().toISOString()
  });

  // Log activity
  await supabase.from('activity_log').insert({
    type: `${type}_update`,
    source: 'notion',
    title: content.title,
    metadata: { notion_id: notionId }
  });

  // Trigger AI processing if needed
  if (type === 'project' || type === 'note') {
    await fetch(`${Deno.env.get('SITE_URL')}/api/process-content`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ notionId, type })
    });
  }

  return new Response(JSON.stringify({ success: true }));
});
```

### Environment Variables

```env
# Notion
NOTION_TOKEN=secret_xxx
NOTION_WEBHOOK_SECRET=whsec_xxx
NOTION_PROJECTS_DB=xxx
NOTION_NOTES_DB=xxx
NOTION_READING_DB=xxx
NOTION_BLOG_DB=xxx

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx

# GitHub
GITHUB_TOKEN=ghp_xxx
GITHUB_USERNAME=xxx

# OpenAI
OPENAI_API_KEY=sk-xxx

# Vercel
REVALIDATE_SECRET=xxx

# Site
NEXT_PUBLIC_SITE_URL=https://yoursite.com
```

---

## 7. Examples of Living Websites

### /Now Pages
- [Derek Sivers](https://sive.rs/now) - The original, updated Dec 2025 from Bangalore
- [nownownow.com](https://nownownow.com/about) - Directory of 2,300+ /now pages

### Activity-Based Portfolios
- [Foliox](https://www.scriptbyai.com/github-profile-generator-foliox/) - AI-generated from GitHub
- [GitProfile](https://dev.to/arifszn/create-personal-portfolio-using-github-api-with-blog-1a57) - Dynamic GitHub API portfolio

### Generative Art Sites
- [Art Blocks](https://www.artblocks.io/) - On-chain generative art
- [fxhash](https://www.fxhash.xyz/) - Generative art on Tezos
- [Zazow](https://www.zazow.com/) - Algorithmic art generator

### Notable Portfolio Examples
- Karina Sirqueira - Dynamic abstract shapes that shift/transform
- Marco Cornacchia (Vercel) - Rich interactivity with clickable prototypes
- Gianluca Gradogna - Infinite scroll with subtle transitions

---

## 8. Implementation Roadmap

### Phase 1: Foundation (Week 1-2)
- [ ] Set up Next.js 14 with App Router
- [ ] Create Notion databases (Projects, Notes, Reading, Blog)
- [ ] Implement basic Notion API integration
- [ ] Deploy to Vercel with ISR

### Phase 2: Sync System (Week 3-4)
- [ ] Set up Notion webhooks
- [ ] Create GitHub Actions cron backup
- [ ] Implement Supabase caching layer
- [ ] Build delta sync logic

### Phase 3: AI Processing (Week 5-6)
- [ ] Integrate OpenAI for categorization
- [ ] Build skill extraction pipeline
- [ ] Implement blog draft generation
- [ ] Create theme generator

### Phase 4: Living Visuals (Week 7-8)
- [ ] Build generative hero with P5.js
- [ ] Implement Framer Motion animations
- [ ] Create time-of-day themes
- [ ] Add content-based color schemes

### Phase 5: Ambient Features (Week 9-10)
- [ ] Build activity heatmap
- [ ] Create living pulse indicator
- [ ] Implement thoughts ticker
- [ ] Add "currently working on" widget

### Phase 6: Polish (Week 11-12)
- [ ] Performance optimization
- [ ] Error handling and fallbacks
- [ ] Mobile responsiveness
- [ ] Documentation

---

## Sources

### Notion Integration
- [LogRocket - Notion + Next.js ISR](https://blog.logrocket.com/using-notion-next-js-isr-sync-content/)
- [Next.js ISR Guide](https://nextjs.org/docs/app/guides/incremental-static-regeneration)
- [Notion Webhooks Documentation](https://developers.notion.com/reference/webhooks)
- [Notion Webhooks Guide 2025](https://softwareengineeringstandard.com/2025/08/31/notion-webhooks/)
- [Notion API Filter Reference](https://developers.notion.com/reference/post-database-query-filter)
- [react-notion-x GitHub](https://github.com/NotionX/react-notion-x)
- [Next.js Notion Starter Kit](https://github.com/transitive-bullshit/nextjs-notion-starter-kit)

### Automation & Sync
- [GitHub Actions Cron Scheduling](https://cicube.io/blog/github-actions-cron/)
- [Notion Sync with GitHub Actions](https://brunoscheufler.com/blog/2021-10-17-updating-notion-pages-on-a-schedule-with-github-actions)
- [n8n Notion to WordPress](https://thewebsiteengineer.com/blog/use-notion-as-a-cms-backend-for-wordpess-via-n8n-workflow/)

### AI & NLP
- [OpenAI Cookbook - Summarization](https://cookbook.openai.com/examples/summarizing_long_documents)
- [GPT-4 Blog Classification](https://www.rootstrap.com/blog/how-to-classify-blogs-using-openai-api-with-gpt-4)
- [NLP Keyword Extraction](https://www.geeksforgeeks.org/nlp/keyword-extraction-methods-in-nlp/)

### Visual Design
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Three.js Portfolio Example](https://github.com/adrianhajdin/threejs-portfolio)
- [Generative Design with P5.js](https://benedikt-gross.de/projects/generative-design-visualize-program-create-with-javascript-in-p5-js/)
- [CSS Variables Dark Mode](https://lukelowrey.com/css-variable-theme-switcher/)
- [ColorMagic AI Palette Generator](https://colormagic.app)

### Portfolio Platforms
- [Authory - Auto-Updated Portfolio](https://authory.com/use-cases/portfolio-for-content-creator)
- [Foliox - GitHub Portfolio Generator](https://www.scriptbyai.com/github-profile-generator-foliox/)
- [GitHub Portfolio Action](https://towardsdatascience.com/github-action-that-automates-portfolio-generation-bc15835862dc/)

### Living Websites
- [Derek Sivers /Now Page](https://sive.rs/now)
- [nownownow.com](https://nownownow.com/about)
- [Art Blocks](https://www.artblocks.io/)
- [Generative Art Guide](https://www.amygoodchild.com/blog/what-is-generative-art)

### Infrastructure
- [Supabase Edge Functions](https://supabase.com/docs/guides/functions)
- [Vercel On-Demand ISR](https://vercel.com/templates/next.js/on-demand-incremental-static-regeneration)
- [Activity Heatmap Libraries](https://github.com/topics/github-heatmap)
