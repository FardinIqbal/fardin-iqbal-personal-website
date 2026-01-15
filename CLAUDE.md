# Fardin Iqbal Portfolio

Personal portfolio & blog with editorial design aesthetic.

## AI Instructions

**Skills to use:**
1. **Krug Skill** - Apply Steve Krug's usability principles. Every page self-evident.
2. **frontend-design Skill** - Distinctive, production-grade interfaces. Vercel aesthetic.

## Quick Context

- **URL:** https://fardin-portfolio-beryl.vercel.app
- **Hosting:** Vercel (auto-deploys on push to main)
- **Type:** Full-stack Next.js (NOT static - has API routes)
- **Deploy:** Just `git push origin main`

## Stack

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS 4, Framer Motion, GSAP
- MDX for essays, Three.js for arboretum
- Clerk auth (optional), Vercel Analytics

## Key Directories

```
src/app/                    # Next.js App Router pages
src/components/             # 100+ React components
  ├── layout/               # Header, Footer, Navigation
  ├── sections/             # Home page sections
  ├── essays/               # Blog components
  ├── arboretum/            # 3D tree visualization
  ├── dashboard/            # Admin dashboard
  ├── ui/                   # Reusable primitives
  ├── effects/              # Animations
  └── immersive/            # Reading experience
src/lib/                    # Utilities & content loading
src/data/                   # Static data (skills, interests)
src/types/                  # TypeScript definitions
content/                    # JSON + MDX content files
  ├── blog/                 # MDX essays (10+)
  ├── profile.json          # Personal info
  ├── projects.json         # Portfolio (15+)
  ├── experience.json       # Work history
  ├── books.json            # Reading list
  ├── media.json            # Movies/shows
  └── courses.json          # Learning materials
```

## Pages

| Route | Purpose |
|-------|---------|
| `/` | Home - all portfolio sections |
| `/essays` | Blog listing with tag filters |
| `/essays/[slug]` | Individual essay with TOC |
| `/projects/[slug]` | Project detail |
| `/now` | Current activities |
| `/uses` | Tech stack & tools |
| `/arboretum` | 3D tree visualization (password-gated) |
| `/insights` | Personal journal analysis (protected) |
| `/dashboard` | Analytics (protected by Clerk) |

## Content Management

### MDX Essays
Location: `content/blog/*.mdx`

Frontmatter:
```yaml
title: "Essay Title"
date: "2026-01-02"
description: "SEO description"
image: "/images/blog/image.png"
tags: ["Tag1", "Tag2"]
published: true
featured: false
```

### JSON Content
- `profile.json` - name, bio, education, social links
- `projects.json` - id, title, category, tech[], description, narrative
- `experience.json` - company, role, period, description[], tech[]
- `books.json` - title, author, status, rating, thoughts
- `media.json` - title, type, status, rating
- `courses.json` - title, platform, status, topics[]

## Design System

**Aesthetic:** New Yorker / Editorial magazine

**Typography:**
- Display: Playfair Display (serif)
- Body: Source Serif 4 (serif)
- UI: Source Sans 3, Inter (sans)
- Code: JetBrains Mono

**Colors:**
- Dark (default): `#0a0a0a` bg, `#fafafa` text
- Light: `#faf9f7` bg, `#1a1a1a` text
- Accent: `#c41e3a` (editorial red)

## Commands

```bash
npm run dev         # Start dev server (usually :3001 if 3000 busy)
npm run build       # Production build
npm run lint        # Lint check
```

## Features

- **Navigation:** Sticky header, mobile swipe menu, command palette (Cmd+K)
- **Essays:** Auto TOC, syntax highlighting, reading time, tag filtering
- **Effects:** Text scramble, tilt cards, magnetic buttons, cursor glow
- **Easter eggs:** Konami code, console ASCII art
- **Dashboard:** Traffic charts, device breakdown, activity stream

## API Routes

```
POST /api/contact   # Contact form (rate-limited 5/min, sanitized)
GET /api/health     # Health check
```

## Important Notes

- DO NOT use GitHub Pages (won't work - needs Vercel)
- DO NOT run `vercel --prod` manually (auto-deploys)
- Clerk auth is optional - graceful fallback if not configured
- See `docs/SITE_DOCUMENTATION.md` for comprehensive details

## Session Learnings

<!-- Auto-updated by update-project-context hook -->

---
