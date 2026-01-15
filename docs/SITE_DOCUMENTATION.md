# Fardin Iqbal Portfolio - Complete Site Documentation

> This document provides a comprehensive overview of every aspect of this Next.js portfolio site. Use this to understand the architecture, components, features, content structure, and technical decisions.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Technology Stack](#2-technology-stack)
3. [Project Structure](#3-project-structure)
4. [Pages & Routes](#4-pages--routes)
5. [Components Architecture](#5-components-architecture)
6. [Styling System](#6-styling-system)
7. [Content Management](#7-content-management)
8. [Features & Interactions](#8-features--interactions)
9. [API Routes](#9-api-routes)
10. [Configuration Files](#10-configuration-files)
11. [Type System](#11-type-system)
12. [Third-Party Integrations](#12-third-party-integrations)
13. [Deployment](#13-deployment)
14. [Design Philosophy](#14-design-philosophy)
15. [Known Patterns & Conventions](#15-known-patterns--conventions)

---

## 1. Project Overview

**Site Owner**: Fardin Iqbal
**Type**: Personal portfolio & blog
**Framework**: Next.js 16 (App Router, Full-Stack)
**Hosting**: Vercel (auto-deploys on push to main)
**Production URL**: https://fardin-portfolio-beryl.vercel.app
**Repository**: FardinIqbal/FardinIqbal.github.io

### Purpose
This is a sophisticated personal portfolio showcasing:
- Professional experience and projects
- Technical blog/essays on philosophy, systems thinking, BJJ, and technology
- Personal interests (books, media, courses)
- Interactive experiences (arboretum visualization, command palette)
- Admin dashboard for analytics and content management

### Key Characteristics
- **Full-Stack**: Has API routes, server actions, and dynamic features (NOT static export)
- **Content-Driven**: All portfolio content stored in JSON/MDX files
- **Animation-Rich**: Framer Motion, GSAP, Three.js for polished UX
- **Mobile-First**: Responsive with mobile-specific features (haptics, bottom nav)
- **Editorial Design**: New Yorker/high-end magazine aesthetic

---

## 2. Technology Stack

### Core Framework
| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.1.1 | React framework with App Router |
| React | 19.2.3 | UI library |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 4.x | Utility-first CSS |

### Animation & Graphics
| Technology | Version | Purpose |
|------------|---------|---------|
| Framer Motion | 12.23.26 | React animations |
| GSAP | 3.14.2 | Advanced timeline animations |
| Three.js | 0.182.0 | 3D graphics (arboretum) |
| Canvas Confetti | - | Celebration effects |

### Content Processing
| Technology | Version | Purpose |
|------------|---------|---------|
| MDX | - | Markdown with JSX components |
| Gray Matter | 4.0.3 | YAML frontmatter parsing |
| Shiki | 3.20.0 | Syntax highlighting |
| Remark/Rehype | - | Markdown to HTML pipeline |
| Reading Time | 1.5.0 | Calculate reading estimates |

### UI & Charts
| Technology | Version | Purpose |
|------------|---------|---------|
| Lucide React | 0.562.0 | Icon library |
| Recharts | 3.6.0 | Interactive charts |
| @tanstack/react-table | 8.21.3 | Table utilities |

### Authentication & Security
| Technology | Version | Purpose |
|------------|---------|---------|
| Clerk | 6.36.5 | User authentication (optional) |
| bcryptjs | 3.0.3 | Password hashing |

### Audio & Media
| Technology | Version | Purpose |
|------------|---------|---------|
| Tone.js | 15.1.22 | Audio synthesis |
| HTML2Canvas | - | Screenshots |
| jsPDF | - | PDF generation |

### Utilities
| Technology | Version | Purpose |
|------------|---------|---------|
| Lenis | 1.3.17 | Smooth scrolling |
| date-fns | - | Date formatting |

---

## 3. Project Structure

```
FardinIqbal.github.io/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx                # Root layout (fonts, providers, analytics)
│   │   ├── page.tsx                  # Home page
│   │   ├── globals.css               # Global styles & CSS variables
│   │   ├── essays/
│   │   │   ├── page.tsx              # Essays listing
│   │   │   └── [slug]/
│   │   │       └── page.tsx          # Individual essay
│   │   ├── projects/
│   │   │   └── [slug]/
│   │   │       └── page.tsx          # Individual project
│   │   ├── now/
│   │   │   └── page.tsx              # /now page
│   │   ├── uses/
│   │   │   └── page.tsx              # Tech stack page
│   │   ├── arboretum/
│   │   │   └── page.tsx              # 3D tree visualization
│   │   ├── insights/
│   │   │   └── page.tsx              # Personal insights (protected)
│   │   ├── dashboard/
│   │   │   ├── page.tsx              # Analytics overview
│   │   │   ├── analytics/
│   │   │   ├── messages/
│   │   │   ├── content/
│   │   │   └── settings/
│   │   ├── sign-in/[[...sign-in]]/   # Clerk auth
│   │   ├── sign-up/[[...sign-up]]/   # Clerk auth
│   │   └── api/
│   │       ├── contact/route.ts      # Contact form endpoint
│   │       └── health/route.ts       # Health check
│   │
│   ├── components/                   # React components (100+)
│   │   ├── layout/                   # Header, Footer, Navigation
│   │   ├── sections/                 # Home page sections
│   │   ├── essays/                   # Blog-related components
│   │   ├── arboretum/                # 3D tree components
│   │   ├── dashboard/                # Admin dashboard
│   │   ├── ui/                       # Reusable UI primitives
│   │   ├── effects/                  # Animation effects
│   │   └── immersive/                # Immersive reading features
│   │
│   ├── lib/                          # Utilities
│   │   ├── content.ts                # Content loading (JSON/MDX)
│   │   ├── mdx.ts                    # MDX compilation
│   │   ├── utils.ts                  # Helper functions
│   │   └── rate-limit.ts             # API rate limiting
│   │
│   ├── data/                         # Static data files
│   │   ├── skills.ts
│   │   ├── interests.ts
│   │   └── uses.ts
│   │
│   ├── types/                        # TypeScript definitions
│   │   ├── blog.ts
│   │   ├── project.ts
│   │   └── index.ts
│   │
│   ├── hooks/                        # Custom React hooks
│   │   ├── useScrollDirection.ts
│   │   ├── useActiveSection.ts
│   │   └── ...
│   │
│   └── middleware.ts                 # Clerk auth middleware
│
├── content/                          # Content files
│   ├── blog/                         # MDX essays (10+)
│   │   ├── why-love-needs-no-reason.mdx
│   │   ├── big-history-thinking.mdx
│   │   ├── complexity-paradox.mdx
│   │   └── ...
│   ├── profile.json                  # Personal info
│   ├── projects.json                 # Project portfolio (15+)
│   ├── experience.json               # Work history
│   ├── skills.json                   # Skills by category
│   ├── books.json                    # Reading list
│   ├── media.json                    # Movies/shows
│   ├── courses.json                  # Learning materials
│   └── arboretum.json                # Tree visualization data
│
├── public/                           # Static assets
│   ├── images/
│   │   ├── blog/                     # Essay images
│   │   ├── projects/                 # Project screenshots
│   │   └── profile/                  # Profile photos
│   ├── fonts/
│   └── ...
│
├── scripts/                          # Build automation
│
├── docs/                             # Documentation
│
└── Configuration files
    ├── next.config.ts
    ├── tailwind.config.ts
    ├── tsconfig.json
    ├── package.json
    ├── postcss.config.mjs
    └── .env.local
```

---

## 4. Pages & Routes

### Public Pages

#### `/` - Home Page
The main landing page with all portfolio sections:
- **Hero**: Profile introduction, photo, tagline
- **About**: Bio sections with animated text reveals
- **Skills**: Skill categories displayed as badges
- **Experience**: Work history timeline/cards
- **Projects**: Featured projects with category filters
- **Essays**: Blog preview with featured highlights
- **Interests**: Books, media, courses grids
- **Contact**: Contact form section
- **Footer**: Links and social icons

#### `/essays` - Blog Listing
- All published essays with metadata
- Tag-based filtering
- Reading time estimates
- Featured essays highlighted at top
- Responsive grid layout

#### `/essays/[slug]` - Individual Essay
- Full MDX content rendering
- Auto-generated table of contents with scroll tracking
- Reading controls (font size adjustment)
- Code syntax highlighting with copy buttons
- SEO optimized with JSON-LD structured data
- Music player integration
- Immersive reading mode

#### `/projects/[slug]` - Individual Project
- Full project narrative and description
- Tech stack display with badges
- GitHub and live demo links
- Project images/screenshots

#### `/now` - Now Page
Inspired by nownownow.com, shows current activities:
- Currently reading (books)
- Currently watching (media)
- Currently learning (courses)
- Favorites in each category

#### `/uses` - Uses Page
Tech stack and tools breakdown:
- Editor & Terminal
- Development stack
- Infrastructure
- Productivity tools
- Hardware
- Learning resources
- BJJ equipment/resources

#### `/arboretum` - Interactive Tree Visualization
Special interactive experience:
- 3D tree rendered with Three.js
- Password-gated access for private insights
- Season slider for visual changes
- Bloom particle effects
- Control panel for interactions
- Memory thread visualizations

#### `/insights` - Personal Insights
Protected journal analysis page:
- Deep self-insights from journal analysis
- Core patterns visualization
- Emotional triggers analysis
- Shadow work section
- Leverage points and growth paths

### Protected Dashboard Routes

#### `/dashboard` - Analytics Overview
- Live visitor count indicator
- Traffic charts (views/visitors over time)
- Device breakdown (pie chart)
- Recent activity stream
- Quick action shortcuts

#### `/dashboard/analytics` - Detailed Analytics
Extended analytics views and data

#### `/dashboard/messages` - Contact Submissions
View and manage contact form submissions

#### `/dashboard/content` - Content Management
Content editing and management interface

#### `/dashboard/settings` - Admin Settings
Configuration and preferences

### Authentication Routes

#### `/sign-in/[[...sign-in]]` - Sign In
Clerk-powered sign-in modal

#### `/sign-up/[[...sign-up]]` - Sign Up
Clerk-powered registration modal

---

## 5. Components Architecture

### Layout Components

#### Header (`src/components/layout/Header.tsx`)
- Sticky navigation with scroll detection
- Logo with hover animation
- Desktop nav with active section tracking
- Mobile menu with swipe animations
- Auto-hides on essay pages when scrolling down
- Theme toggle integration

#### Footer (`src/components/layout/Footer.tsx`)
- Site links and navigation
- Social media icons
- Copyright information

#### MobileBottomNav
- Fixed bottom navigation for mobile
- Haptic feedback on interactions
- Quick access to key sections

### Section Components (Home Page)

| Component | Purpose |
|-----------|---------|
| Hero | Profile intro with image, name, tagline |
| About | Multi-paragraph bio with animations |
| Skills | Skill categories with badges |
| Experience | Work history timeline |
| Projects | Featured projects grid with filters |
| Essays | Blog preview section |
| Interests | Books, media, courses display |
| Contact | Contact form |

### Essay/Blog Components

| Component | Purpose |
|-----------|---------|
| EssayPage | Full essay layout wrapper |
| EssaysList | List view with tag filtering |
| TableOfContents | Auto-generated from headings, tracks scroll |
| ReadingControls | Font size adjustment, reading mode |
| PullQuote | Styled quote callouts |
| Callout | Highlighted info boxes |
| ProblemCard | Problem-focused cards |
| ProblemGrid | Grid layout for problem cards |
| StatsRow | Statistics display row |
| LogBlock | Log/code-style blocks |
| Journey | Timeline/journey visualization |
| MusicPlayer | Embedded audio player |
| CodeCopyButton | One-click code copying |

### Arboretum Components

| Component | Purpose |
|-----------|---------|
| ArboretumPage | Main wrapper |
| TreeVisualization | 3D tree with Three.js |
| ArboretumTree | Tree data visualization |
| BloomMesh | 3D bloom particle rendering |
| PasswordGate | Authentication gate |
| InsightCard | Individual insight display |
| InsightDetail | Expanded insight view |
| ControlPanel | Tree interaction controls |
| SeasonSlider | Season selector UI |
| MemoryThread | Visual connection effects |

### UI Components (35+)

| Component | Purpose |
|-----------|---------|
| Button | Styled button variants |
| Card | Card container |
| AnimatedLink | Links with animations |
| AnimatedSection | Section fade/slide |
| AnimatedSignature | SVG signature animation |
| AnimatedProfilePicture | Profile image animation |
| AnimatedProjectVisual | Project preview animation |
| SkillBadge | Skill tag styling |
| ExperienceCard | Work experience card |
| ProjectCard | Project preview card |
| ProjectVisual | Project visual/image |
| SectionHeader | Section titles |
| SectionHeading | Heading variants |
| AvailabilityStatus | Status indicator |
| ScrollProgress | Page scroll progress bar |
| CursorSpotlight | Cursor glow effect |
| CustomCursor | Custom cursor replacement |
| TextScramble | Scrambling text animation |
| ThemeSwitcher | Theme toggle control |
| TiltCard | 3D tilt effect card |
| MagneticButton | Magnetic cursor tracking |
| NoiseOrb | Animated noise orb |
| TouchRipple | Ripple effect on touch |
| Skeleton | Loading skeleton UI |
| MicroButton | Small button variant |
| SoundToggle | Audio toggle |
| CommandPalette | Cmd+K command palette |
| ConsoleEasterEgg | Console ASCII art |
| KonamiCode | Konami code easter egg |
| GitHubActivity | GitHub activity display |

### Effects/Animation Components

| Component | Purpose |
|-----------|---------|
| GlobalEffects | Global effect orchestrator |
| ParallaxSection | Parallax scrolling |
| CursorGlow | Cursor glow effect |
| PageTransition | Page transition animations |
| AnimatedGradient | Animated gradient background |
| CinematicScene | Cinematic intro scene |
| LiquidBackground | Liquid/fluid background |
| TextReveal | Text reveal animation |
| AmbientBackground | Ambient animated background |
| ParticleBackground | Particle effect background |

### Immersive Components

| Component | Purpose |
|-----------|---------|
| ImmersiveBlogWrapper | Wraps essay content |
| ImmersiveBlogClient | Client-side immersive features |
| MoodSystem | Mood-based styling |
| ScrollAnimations | Scroll-triggered animations |
| AmbientAudio | Background audio system |

### Provider Components

| Component | Purpose |
|-----------|---------|
| ClerkWrapper | Clerk authentication provider |
| ThemeProvider | Theme context provider |
| SmoothScroll | Lenis smooth scroll wrapper |
| PortfolioEnhancements | Feature orchestrator |

---

## 6. Styling System

### Design Philosophy
- **Aesthetic**: New Yorker / High-end editorial magazine
- **Theme**: Dark-first with warm accents
- **Typography**: Serif-heavy for elegance
- **Animation**: Subtle, purposeful micro-interactions

### Color Palette

```css
/* Light Mode */
--background: #faf9f7      /* Warm cream */
--foreground: #1a1a1a      /* Near black */
--muted: #f4f3f1           /* Light gray */
--accent: #c41e3a          /* Editorial red */

/* Dark Mode (Default) */
--background: #0a0a0a      /* Deep black */
--foreground: #fafafa      /* Warm white */
--muted: #1a1a1a           /* Dark gray */
--accent: #e85d75          /* Softer red */

/* Shared */
--primary: #1e3a8a         /* Deep editorial blue */
--border: varies by theme
```

### Typography

| Font | Usage | Fallback |
|------|-------|----------|
| Playfair Display | Headings, display text | Georgia, serif |
| Source Serif 4 | Body text, essays | Georgia, serif |
| Source Sans 3 | UI elements | system-ui, sans-serif |
| Inter | New Yorker-style UI | system-ui, sans-serif |
| JetBrains Mono | Code blocks | monospace |

### Type Scale
```css
--text-xs: 0.75rem      /* 12px */
--text-sm: 0.875rem     /* 14px */
--text-base: 1rem       /* 16px */
--text-lg: 1.125rem     /* 18px */
--text-xl: 1.25rem      /* 20px */
--text-2xl: 1.5rem      /* 24px */
--text-3xl: 1.875rem    /* 30px */
--text-4xl: 2.25rem     /* 36px */
--text-5xl: 3rem        /* 48px */
--text-6xl: 3.75rem     /* 60px */
--text-7xl: 4.5rem      /* 72px */
```

### Spacing Scale
```css
--spacing-section: 8rem     /* Between major sections */
--spacing-block: 3rem       /* Between blocks */
--spacing-element: 1.5rem   /* Between elements */
```

### Key Tailwind Extensions
- `max-w-measure: 68ch` - Optimal reading width
- Typography plugin for prose styling
- Custom keyframe animations (fadeIn, slideUp)
- Hover utilities (lift, glow effects)

### Theme Modes
1. **Dark Mode** (default) - Deep black with warm white text
2. **Light Mode** - Warm cream backgrounds with dark text
3. **Sepia Mode** (configured but optional) - Vintage sepia tones

---

## 7. Content Management

### MDX Essays

Located in `/content/blog/`. Each essay is an MDX file with:

**Frontmatter Schema:**
```yaml
---
title: "Essay Title"
date: "2026-01-02"
description: "Short summary for SEO and previews"
image: "/images/blog/image.png"
tags: ["Philosophy", "Technology", "Systems"]
published: true
featured: false
externalUrl: "https://..." # Optional, for external redirects
---
```

**Current Essays:**
1. `why-love-needs-no-reason.mdx` - Philosophy on unconditional love
2. `big-history-thinking.mdx` - Big history perspective
3. `can-a-dictator-be-good.mdx` - Political philosophy
4. `complexity-paradox.mdx` - Systems thinking
5. `the-surveillance-tax.mdx` - Privacy & surveillance
6. `lessons-from-building-malloc.mdx` - Systems programming
7. `grappler-to-engineer.mdx` - Martial arts to engineering
8. `axioms-of-jiu-jitsu.mdx` - BJJ first principles
9. `building-prometheus.mdx` - AI infrastructure
10. `building-modern-portfolio-nextjs.mdx` - Technical tutorial

**MDX Features:**
- Custom components (Callout, PullQuote, ProblemCard, etc.)
- Code syntax highlighting with language labels
- Auto-generated heading IDs
- GitHub Flavored Markdown support

### JSON Content Files

#### profile.json
```json
{
  "name": "Fardin Iqbal",
  "tagline": "...",
  "bio": ["paragraph1", "paragraph2", ...],
  "education": {
    "school": "Stony Brook University",
    "degree": "Bachelor of Science",
    "major": "Computer Science",
    "graduation": "May 2026",
    "gpa": "..."
  },
  "location": "New York",
  "email": "...",
  "social": {
    "github": "...",
    "linkedin": "...",
    "twitter": "..."
  },
  "resumeUrl": "...",
  "topSkills": [...]
}
```

#### projects.json
```json
[
  {
    "id": "project-slug",
    "title": "Project Name",
    "category": "systems|ml|web|tools|ai",
    "featured": true,
    "year": "2024",
    "description": "Short description",
    "narrative": "Full project story...",
    "tech": ["Next.js", "TypeScript", ...],
    "github": "https://github.com/...",
    "live": "https://...",
    "image": "/images/projects/..."
  }
]
```

**Project Categories:**
- `systems` - Systems & Low-Level
- `ml` - ML & Data Science
- `web` - Full-Stack Applications
- `tools` - Tools & Experiments
- `ai` - AI & Infrastructure

#### experience.json
```json
[
  {
    "id": "experience-id",
    "company": "Company Name",
    "role": "Job Title",
    "period": "Jan 2024 - Present",
    "location": "New York, NY",
    "type": "full-time|internship|fellowship|...",
    "description": ["Bullet point 1", "Bullet point 2"],
    "tech": ["Technology1", "Technology2"]
  }
]
```

#### books.json
```json
[
  {
    "title": "Book Title",
    "author": "Author Name",
    "status": "reading|completed|want-to-read",
    "rating": 5,
    "thoughts": "Brief review or notes"
  }
]
```

#### media.json
```json
[
  {
    "title": "Title",
    "type": "movie|show|documentary|anime",
    "status": "watching|completed|want-to-watch",
    "rating": 5,
    "year": "2024",
    "thoughts": "Brief review"
  }
]
```

#### courses.json
```json
[
  {
    "title": "Course Title",
    "platform": "Coursera|Udemy|...",
    "instructor": "Instructor Name",
    "status": "in-progress|completed|want-to-take",
    "topics": ["Topic1", "Topic2"],
    "link": "https://...",
    "thoughts": "Notes or review"
  }
]
```

#### skills.json
```json
{
  "Languages": ["Python", "TypeScript", ...],
  "Frontend": ["React", "Next.js", ...],
  "Backend": ["Node.js", "FastAPI", ...],
  "DevOps": ["Docker", "AWS", ...],
  ...
}
```

#### arboretum.json
Structured data for the 3D tree visualization with insights and bloom positions.

### Content Loading System

**MDX Processing Pipeline:**
1. `gray-matter` parses YAML frontmatter
2. `unified` with remark plugins processes markdown
3. Custom rehype plugins:
   - Auto-generate heading IDs from text
   - Add language labels to code blocks
4. `rehype-pretty-code` with Shiki for syntax highlighting (github-dark theme)
5. Output: compiled HTML + metadata

**JSON Loading:**
- Server-side file reading at build time
- Type-safe with TypeScript interfaces
- Filter functions for status-based queries
- Cached for performance

---

## 8. Features & Interactions

### Navigation

| Feature | Implementation |
|---------|----------------|
| Sticky header | Scroll detection, auto-hide on scroll down |
| Mobile menu | Swipe animations, hamburger toggle |
| Active section | Intersection Observer tracks current section |
| Smooth scroll | Lenis library for buttery scrolling |
| Mobile bottom nav | Fixed position, haptic feedback |
| Command palette | Cmd+K opens searchable command menu |

### Interactive Elements

| Feature | Description |
|---------|-------------|
| Theme toggle | Light/dark mode with persistence |
| Command palette | Quick navigation via keyboard (Cmd+K) |
| Konami code | Easter egg triggers particle effect |
| Console easter egg | ASCII art in browser console |
| Sound toggle | Enable/disable ambient audio |

### Animations & Effects

| Effect | Technology | Description |
|--------|------------|-------------|
| Text scramble | Custom | Characters scramble then resolve |
| Text reveal | Framer Motion | Words fade in sequentially |
| Tilt card | Custom | 3D tilt follows cursor |
| Magnetic button | Custom | Button moves toward cursor |
| Cursor glow | CSS | Glow follows cursor |
| Custom cursor | Custom | Replaces default cursor |
| Scroll progress | Custom | Progress bar at top of page |
| Parallax | Framer Motion | Depth effect on scroll |
| Page transitions | Framer Motion | Fade/slide between pages |
| Touch ripple | Custom | Material Design ripple on tap |
| Particle effects | Canvas | Particles on interactions |
| Noise orb | Canvas/WebGL | Animated noise sphere |

### Essay Features

| Feature | Description |
|---------|-------------|
| Table of contents | Auto-generated from headings |
| Scroll tracking | TOC highlights current section |
| Reading time | Calculated from word count |
| Syntax highlighting | Shiki with github-dark theme |
| Code copy | One-click copy button |
| Tag filtering | Filter essays by tags |
| Featured essays | Highlighted at top of list |
| Reading controls | Adjust font size |
| Music player | Ambient audio while reading |
| Immersive mode | Distraction-free reading |

### Dashboard Features

| Feature | Description |
|---------|-------------|
| Live visitors | Real-time visitor indicator |
| Traffic charts | Views/visitors over time (Recharts) |
| Device breakdown | Pie chart of device types |
| Activity stream | Recent messages, views |
| Quick actions | Shortcuts to common tasks |

### Contact Form

| Feature | Implementation |
|---------|----------------|
| Rate limiting | 5 requests/minute per IP |
| Validation | Email format, message length |
| Sanitization | HTML entities, XSS prevention |
| Error handling | User-friendly error messages |

### Special Experiences

**Arboretum (`/arboretum`):**
- 3D tree rendered with Three.js
- Interactive camera controls
- Season slider changes visual appearance
- Password protection for private content
- Bloom particle effects
- Insight cards with detailed views

**Insights (`/insights`):**
- Journal analysis visualization
- Pattern recognition display
- Shadow work insights
- Growth path recommendations

---

## 9. API Routes

### POST `/api/contact`

**Request:**
```json
{
  "name": "string (required, 2-100 chars)",
  "email": "string (required, valid email)",
  "message": "string (required, 10-5000 chars)"
}
```

**Response (Success):**
```json
{
  "message": "Message sent successfully"
}
```

**Response (Error):**
```json
{
  "error": "Error description"
}
```

**Features:**
- Rate limiting: 5 requests per minute per IP
- Input validation and sanitization
- XSS protection via HTML entity encoding
- Ready for email service integration (SendGrid, etc.)

### GET `/api/contact`
Health check - returns "Contact API is working"

### GET `/api/health`
Basic health check endpoint

---

## 10. Configuration Files

### next.config.ts
```typescript
{
  // MDX support
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],

  // Image optimization
  images: {
    remotePatterns: [{ hostname: '**' }],
    dangerousSvg: true // with CSP
  },

  // Server Actions
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb'
    }
  }
}
```

### tailwind.config.ts
```typescript
{
  darkMode: 'class',
  theme: {
    extend: {
      colors: { /* CSS variable references */ },
      fontFamily: {
        serif: ['Source Serif 4', ...],
        display: ['Playfair Display', ...],
        sans: ['Source Sans 3', ...],
        mono: ['JetBrains Mono', ...]
      },
      maxWidth: {
        measure: '68ch'
      },
      spacing: {
        section: '8rem',
        block: '3rem',
        element: '1.5rem'
      }
    }
  },
  plugins: [typography]
}
```

### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "strict": true,
    "jsx": "react-jsx",
    "moduleResolution": "bundler",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Environment Variables (.env.local)
```
# Clerk Authentication (optional)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...

# Clerk Routes
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```

---

## 11. Type System

### BlogPost
```typescript
interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  image?: string;
  published: boolean;
  featured: boolean;
  readingTime: string;
  content: string;
  compiledContent?: string;
  externalUrl?: string;
}
```

### Project
```typescript
interface Project {
  id: string;
  title: string;
  description: string;
  narrative?: string;
  category: 'web' | 'systems' | 'ml' | 'mobile' | 'game' | 'tools' | 'ai';
  image?: string;
  tech: string[];
  github?: string;
  live?: string;
  featured: boolean;
  year?: string;
}
```

### Experience
```typescript
interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  type: 'full-time' | 'part-time' | 'internship' | 'fellowship' | 'contract';
  description: string[];
  tech: string[];
}
```

### Profile
```typescript
interface Profile {
  name: string;
  tagline: string;
  bio: string[];
  education: {
    school: string;
    degree: string;
    major: string;
    graduation: string;
    gpa?: string;
  };
  location: string;
  email: string;
  social: {
    github: string;
    linkedin: string;
    twitter?: string;
  };
  resumeUrl?: string;
  topSkills: string[];
}
```

### Book / Media / Course
```typescript
interface Book {
  title: string;
  author: string;
  status: 'reading' | 'completed' | 'want-to-read';
  rating?: number;
  thoughts?: string;
}

interface Media {
  title: string;
  type: 'movie' | 'show' | 'documentary' | 'anime';
  status: 'watching' | 'completed' | 'want-to-watch';
  rating?: number;
  year?: string;
  thoughts?: string;
}

interface Course {
  title: string;
  platform: string;
  instructor?: string;
  status: 'in-progress' | 'completed' | 'want-to-take';
  topics: string[];
  link?: string;
  thoughts?: string;
}
```

---

## 12. Third-Party Integrations

### Authentication
- **Clerk**: Optional user auth, graceful fallback if not configured

### Analytics
- **Vercel Analytics**: Page view tracking
- **Vercel Speed Insights**: Performance monitoring

### Fonts
- **Google Fonts**: Playfair Display, Source Serif 4, Source Sans 3, Inter, JetBrains Mono

### Icons
- **Lucide React**: 50+ icons used throughout

### Charts
- **Recharts**: Interactive charts in dashboard

### 3D Graphics
- **Three.js**: Arboretum tree visualization

### Audio
- **Tone.js**: Audio synthesis for ambient sounds

### PDF/Screenshots
- **HTML2Canvas**: Screenshot capability
- **jsPDF**: PDF generation

---

## 13. Deployment

### Platform
- **Vercel** (optimized for Next.js)

### Process
1. Push to `main` branch
2. Vercel automatically builds and deploys
3. Production URL: https://fardin-portfolio-beryl.vercel.app

### Features
- Automatic HTTPS
- Global CDN (Edge Network)
- Image optimization
- Serverless functions for API routes
- Environment variable management

### Build Command
```bash
npm run build
```

### Important Notes
- NOT a static export - requires Vercel for API routes
- Do NOT use GitHub Pages (won't work)
- No need to manually run `vercel --prod`

---

## 14. Design Philosophy

### Visual Identity
- **Aesthetic**: High-end editorial magazine (The New Yorker inspired)
- **Mood**: Sophisticated, thoughtful, intellectually curious
- **Colors**: Deep blacks, warm creams, editorial red accents

### Typography Principles
- Serif fonts for elegance and readability
- Generous line heights (1.6-1.8)
- Optimal measure (55-75 characters per line)
- Clear hierarchy through size and weight

### Animation Philosophy
- Subtle, purposeful micro-interactions
- Performance-first (no jank)
- Enhances rather than distracts
- Respects reduced motion preferences

### Content Philosophy
- Long-form essays on meaningful topics
- Technical depth balanced with accessibility
- Personal voice and perspective
- Cross-disciplinary thinking (tech, philosophy, BJJ)

---

## 15. Known Patterns & Conventions

### File Naming
- Components: PascalCase (`AnimatedSection.tsx`)
- Utilities: camelCase (`content.ts`)
- Content: kebab-case (`big-history-thinking.mdx`)

### Component Structure
```typescript
// 1. Imports
import { ... } from '...'

// 2. Types/Interfaces
interface Props { ... }

// 3. Component
export function ComponentName({ props }: Props) {
  // Hooks first
  const [state, setState] = useState()

  // Derived values
  const computed = useMemo(() => ...)

  // Effects
  useEffect(() => ...)

  // Handlers
  const handleClick = () => ...

  // Render
  return (...)
}
```

### CSS Conventions
- Tailwind utility classes preferred
- CSS variables for theme values
- `cn()` utility for conditional classes
- Dark mode via `dark:` prefix

### Content Conventions
- Essays: 1000-3000 words
- Tags: 2-4 per essay
- Images: WebP format, optimized
- Descriptions: 150-160 characters for SEO

### Code Style
- TypeScript strict mode
- Explicit return types on public functions
- Destructured props
- Early returns for guards

---

## Summary

This portfolio is a sophisticated, full-featured web application that combines:

1. **Elegant Design**: Editorial aesthetic with careful typography
2. **Technical Depth**: Custom animations, 3D graphics, MDX processing
3. **Content Focus**: Long-form essays, project narratives, personal interests
4. **Interactive Features**: Command palette, easter eggs, immersive reading
5. **Admin Dashboard**: Analytics, messages, content management
6. **Type Safety**: 100% TypeScript with comprehensive type definitions
7. **Performance**: Optimized builds, lazy loading, efficient animations
8. **Accessibility**: Semantic HTML, keyboard navigation, screen reader support

The site serves as both a personal portfolio and a demonstration of technical capabilities, showcasing the ability to build polished, production-ready applications.
