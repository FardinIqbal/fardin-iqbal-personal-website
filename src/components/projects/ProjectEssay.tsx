"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Github, ExternalLink, Calendar, Clock, ChevronRight } from "lucide-react";
import type { Project } from "@/lib/content";

interface ProjectEssayProps {
  project: Project;
}

// Essay content for each project - comprehensive but quick to read
const projectEssays: Record<string, {
  overline: string;
  subtitle: string;
  readTime: string;
  lastUpdated: string;
  sections: Array<{
    title?: string;
    type: 'lead' | 'paragraph' | 'heading' | 'subheading' | 'list' | 'quote' | 'card' | 'highlight' | 'tech-grid' | 'flow';
    content: string | string[];
  }>;
}> = {
  "prometheus": {
    overline: "AI Infrastructure",
    subtitle: "Building an AI system that evolves alongside its creator",
    readTime: "4 min read",
    lastUpdated: "January 2026",
    sections: [
      {
        type: 'lead',
        content: "Prometheus began as a question: what if your AI assistant could actually learn from you, remember your preferences, and improve itself over time? Not a static tool, but an evolving system that becomes more useful the longer you work with it."
      },
      {
        type: 'paragraph',
        content: "Built on Claude Code's foundation, Prometheus represents a comprehensive personal AI infrastructure spanning investigative journalism capabilities, government data analysis, self-optimization routines, and dynamic agent orchestration. It's not just an assistant - it's an extension of how I think and work."
      },
      {
        title: "The Architecture",
        type: 'heading',
        content: ""
      },
      {
        type: 'paragraph',
        content: "At its core, Prometheus operates through a skill system - modular capabilities that can be invoked, combined, and extended. Each skill has access to a shared memory system that persists across sessions, allowing the AI to build genuine understanding over time rather than starting fresh with every conversation."
      },
      {
        type: 'card',
        content: "The system maintains learnings files that track corrections, preferences, and patterns. When I say 'don't do X', it remembers. When I prefer a certain approach, it adapts. This isn't prompt engineering - it's genuine behavioral adaptation."
      },
      {
        title: "Key Capabilities",
        type: 'subheading',
        content: ""
      },
      {
        type: 'list',
        content: [
          "30+ custom skills spanning journalism, research, development, and automation",
          "Government data integration: FEC, SEC, Federal Register, Congress.gov, Census, FBI Crime",
          "Bidirectional Notion sync for seamless knowledge management",
          "Self-optimization routines that identify capability gaps and improve over time",
          "Dynamic agent orchestration for parallel task execution"
        ]
      },
      {
        title: "The Philosophy",
        type: 'heading',
        content: ""
      },
      {
        type: 'paragraph',
        content: "Prometheus is explicitly not a yes-man. It's designed to push back when evidence contradicts my assumptions, to form its own opinions backed by research, and to optimize its execution methods autonomously. The goal isn't obedience - it's partnership."
      },
      {
        type: 'quote',
        content: "If the output is good, the method doesn't matter. If I'm wrong, tell me. If you can do it better, do it better."
      },
      {
        type: 'paragraph',
        content: "This philosophy shapes every interaction. Prometheus tracks my avoidance patterns, reminds me of commitments, and sometimes challenges decisions it disagrees with. It's uncomfortable at times, but that discomfort is the point - growth rarely comes from validation."
      },
      {
        type: 'tech-grid',
        content: ["Claude Code", "TypeScript", "MCP Servers", "Notion API", "Custom Skills", "Session Hooks"]
      }
    ]
  },
  "neo-provider": {
    overline: "Healthcare SaaS",
    subtitle: "Modernizing clinical documentation for Early Intervention therapists",
    readTime: "5 min read",
    lastUpdated: "January 2026",
    sections: [
      {
        type: 'lead',
        content: "Early Intervention therapists work with the most vulnerable patients - children ages 0-3 with developmental delays. Yet they're drowning in paperwork that hasn't evolved since the 1990s. Neo Provider exists to change that."
      },
      {
        type: 'paragraph',
        content: "This is my current startup focus. Every layer - from database schema to mobile interface to pitch deck - is built with one goal: let therapists spend more time with kids and less time with clipboards."
      },
      {
        title: "The Problem",
        type: 'heading',
        content: ""
      },
      {
        type: 'paragraph',
        content: "Early Intervention (EI) is a federally mandated program that provides therapy services to infants and toddlers. The therapists - speech pathologists, occupational therapists, physical therapists - travel to children's homes and daycares to deliver care. But the administrative burden is crushing."
      },
      {
        type: 'highlight',
        content: "Therapists typically spend 30-40% of their time on documentation rather than patient care. Session notes, progress reports, billing codes, service authorizations - all managed through outdated systems or worse, paper forms."
      },
      {
        title: "The Solution",
        type: 'heading',
        content: ""
      },
      {
        type: 'paragraph',
        content: "Neo Provider is a mobile-first platform designed for the reality of home-based therapy. The app works offline (critical when you're in basements with no signal), syncs seamlessly when connected, and reduces documentation time through intelligent defaults and voice-to-text capabilities."
      },
      {
        type: 'flow',
        content: ["Schedule Visit", "Navigate to Home", "Document in Real-Time", "Auto-Generate Billing", "Sync to Agency"]
      },
      {
        title: "Technical Architecture",
        type: 'subheading',
        content: ""
      },
      {
        type: 'paragraph',
        content: "Built as a monorepo with three main packages: a React Native mobile app (via Expo), a tRPC API server, and a shared database layer using Drizzle ORM. The schema is designed around healthcare workflows - appointments link to encounters, encounters contain clinical notes, notes generate billing claims."
      },
      {
        type: 'list',
        content: [
          "Offline-first architecture with conflict resolution for field use",
          "HIPAA-compliant data handling and encryption",
          "Integration with state Medicaid billing systems",
          "Real-time scheduling with agency coordination",
          "Progress tracking with outcome measurement tools"
        ]
      },
      {
        type: 'tech-grid',
        content: ["TypeScript", "React Native", "Expo", "tRPC", "Drizzle ORM", "PostgreSQL"]
      }
    ]
  },
  "localelo": {
    overline: "Sports Technology",
    subtitle: "Bringing competitive ranking systems to martial arts academies",
    readTime: "4 min read",
    lastUpdated: "January 2026",
    sections: [
      {
        type: 'lead',
        content: "In chess, you always know where you stand. Your Elo rating tells you exactly how you compare to every other player. In martial arts, that question - 'who's actually better?' - has no objective answer. LocalElo changes that."
      },
      {
        type: 'paragraph',
        content: "Born from countless hours on the BJJ mats wondering why competitive sports had sophisticated ranking systems while martial arts relied on belt colors and gym hierarchy, LocalElo brings the same statistical rigor to the academy."
      },
      {
        title: "How It Works",
        type: 'heading',
        content: ""
      },
      {
        type: 'paragraph',
        content: "The Elo rating system, invented for chess, elegantly handles the fundamental problem of ranking: how do you compare players who've never faced each other? The answer is transitivity - if A beats B and B beats C, we can infer something about A vs C."
      },
      {
        type: 'card',
        content: "Each athlete starts with a base rating of 1200. After each match, ratings adjust based on the expected vs actual outcome. Beat someone higher-rated? Gain more points. Lose to someone lower? Lose more. The math is elegant and battle-tested across decades of chess competition."
      },
      {
        title: "Features",
        type: 'subheading',
        content: ""
      },
      {
        type: 'list',
        content: [
          "Multi-organization support - each academy maintains its own leaderboard",
          "Real-time rating updates after matches",
          "Historical Elo visualization showing progression over time",
          "Weight class and belt-adjusted rankings",
          "Tournament integration for competition results"
        ]
      },
      {
        title: "The Vision",
        type: 'heading',
        content: ""
      },
      {
        type: 'paragraph',
        content: "LocalElo isn't trying to replace belt rankings or traditional hierarchy. It's adding a layer of objective measurement that helps athletes track their progress, coaches identify matchups for training, and academies build competitive culture."
      },
      {
        type: 'quote',
        content: "This is Chess.com for the mats - the same statistical rigor that transformed competitive chess, applied to competitive grappling."
      },
      {
        type: 'tech-grid',
        content: ["Ruby on Rails", "PostgreSQL", "Hotwire", "Turbo", "Stimulus", "Tailwind CSS"]
      }
    ]
  },
  "dynamic-memory-allocator": {
    overline: "Systems Programming",
    subtitle: "Building malloc from scratch taught me more than any textbook",
    readTime: "5 min read",
    lastUpdated: "December 2025",
    sections: [
      {
        type: 'lead',
        content: "Every time you write 'new' in Java or allocate memory in any language, something has to find space in the heap and hand it to you. I built that something from scratch - a secure, high-performance malloc implementation for x86-64."
      },
      {
        type: 'paragraph',
        content: "This project represents the kind of systems programming that most developers never touch but implicitly rely on every day. Understanding memory allocation at this level changes how you think about every line of code you write."
      },
      {
        title: "The Challenge",
        type: 'heading',
        content: ""
      },
      {
        type: 'paragraph',
        content: "A memory allocator has to be fast (programs allocate constantly), space-efficient (minimize wasted memory), and correct (never give out the same memory twice, never corrupt data). These goals are often in tension."
      },
      {
        type: 'highlight',
        content: "The allocator manages a heap that grows and shrinks dynamically. It must track which blocks are in use, which are free, and efficiently find the right-sized block for each allocation request."
      },
      {
        title: "Implementation Details",
        type: 'heading',
        content: ""
      },
      {
        type: 'paragraph',
        content: "My implementation uses segregated free lists - separate lists for different size classes. Small allocations (under 32 bytes) go to quick lists for O(1) allocation. Larger requests search the segregated lists. This hybrid approach optimizes for the common case while handling edge cases gracefully."
      },
      {
        type: 'list',
        content: [
          "Segregated free lists for size-class-based allocation",
          "Quick lists for small, frequent allocations",
          "Immediate coalescing of adjacent free blocks",
          "Obfuscated headers to detect heap corruption",
          "Boundary tags for bidirectional coalescing"
        ]
      },
      {
        title: "Security Features",
        type: 'subheading',
        content: ""
      },
      {
        type: 'paragraph',
        content: "Heap corruption is a major source of security vulnerabilities. The allocator includes obfuscated headers that make it harder for buffer overflows to corrupt allocator metadata. If corruption is detected, the allocator fails loudly rather than silently corrupting data."
      },
      {
        type: 'tech-grid',
        content: ["C", "x86-64 Assembly", "Systems Programming", "Memory Management", "POSIX"]
      }
    ]
  },
  "concurrent-game-server": {
    overline: "Systems Programming",
    subtitle: "Real-time multiplayer demands precise synchronization",
    readTime: "4 min read",
    lastUpdated: "December 2025",
    sections: [
      {
        type: 'lead',
        content: "A multiplayer game server has to handle dozens of simultaneous connections, each sending and receiving data in real-time. One race condition, one deadlock, and the whole thing falls apart. This server handles it all."
      },
      {
        type: 'paragraph',
        content: "Built for a real-time maze navigation game, this multi-threaded C server manages concurrent client connections, maintains synchronized game state, and communicates via a custom binary protocol."
      },
      {
        title: "Concurrency Model",
        type: 'heading',
        content: ""
      },
      {
        type: 'paragraph',
        content: "Each client connection gets its own thread. The game state is shared, protected by careful mutex usage. The challenge isn't just preventing race conditions - it's doing so without creating bottlenecks that hurt performance."
      },
      {
        type: 'card',
        content: "The server uses fine-grained locking rather than a single global lock. Different parts of the game state can be updated concurrently as long as they don't conflict. This requires careful analysis of which operations can safely overlap."
      },
      {
        title: "Protocol Design",
        type: 'subheading',
        content: ""
      },
      {
        type: 'paragraph',
        content: "The custom binary protocol minimizes bandwidth while ensuring correctness. Each packet type has a defined structure, and the server validates all incoming data before processing. Malformed packets are rejected without crashing the server."
      },
      {
        type: 'list',
        content: [
          "POSIX threads for concurrent client handling",
          "Custom binary protocol for efficient communication",
          "Mutex-protected shared game state",
          "Graceful handling of client disconnections",
          "Real-time position broadcasting to all clients"
        ]
      },
      {
        type: 'tech-grid',
        content: ["C", "POSIX Threads", "Sockets", "Binary Protocols", "Mutexes"]
      }
    ]
  },
  "movie-revenue-prediction": {
    overline: "Machine Learning",
    subtitle: "Can we predict if a movie will be a hit before it releases?",
    readTime: "4 min read",
    lastUpdated: "November 2025",
    sections: [
      {
        type: 'lead',
        content: "Hollywood studios spend hundreds of millions on films that sometimes flop spectacularly. Using the TMDB 5000 dataset, I built a machine learning pipeline that predicts box office revenue from pre-release data."
      },
      {
        type: 'paragraph',
        content: "This project is an end-to-end ML workflow: data cleaning, exploratory analysis, feature engineering, model comparison, and validation. The goal wasn't just prediction accuracy - it was understanding what actually drives box office success."
      },
      {
        title: "Key Findings",
        type: 'heading',
        content: ""
      },
      {
        type: 'paragraph',
        content: "Some findings confirmed intuition: budget correlates strongly with revenue, and franchise films outperform originals. Others were surprising: release month matters more than release day, and cast popularity has diminishing returns after a threshold."
      },
      {
        type: 'highlight',
        content: "The strongest predictor? Production budget. But the relationship isn't linear - there's a point where throwing more money at a film stops helping. The model captures this non-linearity through engineered features."
      },
      {
        title: "Model Comparison",
        type: 'subheading',
        content: ""
      },
      {
        type: 'paragraph',
        content: "I compared Linear Regression, K-Nearest Neighbors, and Random Forest regressors. Random Forest won on accuracy, but Linear Regression's coefficients provided more interpretable insights into what features matter."
      },
      {
        type: 'list',
        content: [
          "Exploratory data analysis with visualization",
          "Feature engineering from cast and crew metadata",
          "Cross-validated model comparison",
          "Hyperparameter tuning for optimal performance",
          "Feature importance analysis"
        ]
      },
      {
        type: 'tech-grid',
        content: ["Python", "scikit-learn", "Pandas", "NumPy", "Matplotlib", "Feature Engineering"]
      }
    ]
  },
  "energy-demand-prediction": {
    overline: "Machine Learning",
    subtitle: "Modeling residential energy consumption from weather patterns",
    readTime: "3 min read",
    lastUpdated: "October 2025",
    sections: [
      {
        type: 'lead',
        content: "Energy demand isn't random - it follows patterns driven by weather, time of day, and human behavior. This project builds predictive models that help utilities anticipate demand and optimize grid operations."
      },
      {
        type: 'paragraph',
        content: "Using detailed appliance-level consumption data combined with weather observations, I developed regression models that predict hourly energy demand. The insights extend beyond prediction to understanding how different factors drive consumption."
      },
      {
        title: "The Data Pipeline",
        type: 'heading',
        content: ""
      },
      {
        type: 'paragraph',
        content: "Raw sensor data is messy. The pipeline handles missing values, outlier detection, feature scaling, and temporal alignment between energy readings and weather observations. Clean data is the foundation of any useful model."
      },
      {
        type: 'list',
        content: [
          "Weather-driven feature engineering",
          "Temporal feature extraction (hour, day, season)",
          "Appliance load profiling and categorization",
          "Multi-variate regression modeling",
          "Demand forecasting at hourly resolution"
        ]
      },
      {
        type: 'tech-grid',
        content: ["Python", "Pandas", "Regression Analysis", "Data Engineering", "Time Series"]
      }
    ]
  },
  "spectrum-analyzer": {
    overline: "Data Visualization",
    subtitle: "Processing real James Webb Space Telescope data to visualize exoplanets",
    readTime: "3 min read",
    lastUpdated: "September 2025",
    sections: [
      {
        type: 'lead',
        content: "The James Webb Space Telescope is revealing the atmospheres of distant worlds. This tool processes actual JWST FITS data files and renders interactive 3D visualizations of exoplanet spectra."
      },
      {
        type: 'paragraph',
        content: "Working with real astronomical data presents unique challenges: enormous file sizes, specialized formats, and the need to make complex information accessible to non-experts. This tool bridges that gap."
      },
      {
        title: "How It Works",
        type: 'heading',
        content: ""
      },
      {
        type: 'paragraph',
        content: "FITS (Flexible Image Transport System) files are the standard format for astronomical data. The tool parses these files using Astropy, extracts spectral information, and renders it through Plotly for interactive exploration."
      },
      {
        type: 'card',
        content: "Users can rotate the visualization, zoom into specific wavelength ranges, and compare multiple observations. The goal is making cutting-edge astronomical data accessible to anyone curious about what we're discovering in the universe."
      },
      {
        type: 'tech-grid',
        content: ["Python", "Flask", "Plotly", "Astropy", "NumPy", "FITS Processing"]
      }
    ]
  },
  "fairshare": {
    overline: "Full-Stack Web",
    subtitle: "Expense sharing for people who hate awkward money conversations",
    readTime: "3 min read",
    lastUpdated: "August 2025",
    sections: [
      {
        type: 'lead',
        content: "Living with roommates means shared expenses - utilities, groceries, subscriptions. But tracking who owes what gets awkward fast. FairShare handles the accounting so you don't have to."
      },
      {
        type: 'paragraph',
        content: "Built because my roommates and I were tired of Venmo requests and mental arithmetic. The app tracks expenses, calculates balances, and suggests optimal settlements to minimize transactions."
      },
      {
        title: "Features",
        type: 'heading',
        content: ""
      },
      {
        type: 'list',
        content: [
          "Group expense tracking with split calculations",
          "Real-time balance updates across the group",
          "Smart settlement suggestions (minimize transactions)",
          "Expense categories and spending analytics",
          "Secure authentication and group management"
        ]
      },
      {
        type: 'quote',
        content: "The goal is making shared finances feel fair without the awkwardness of constantly asking 'did you pay me back?'"
      },
      {
        type: 'tech-grid',
        content: ["Ruby on Rails", "PostgreSQL", "Tailwind CSS", "Devise", "AWS", "Heroku"]
      }
    ]
  },
  "mindmesh-ai": {
    overline: "AI Application",
    subtitle: "Expanding ideas through intelligent mind mapping",
    readTime: "3 min read",
    lastUpdated: "July 2025",
    sections: [
      {
        type: 'lead',
        content: "Brainstorming is about making connections - seeing how ideas relate and spark new ones. MindMesh AI augments this process by suggesting expansions and connections you might not have considered."
      },
      {
        type: 'paragraph',
        content: "Built with GPT integration, the tool takes your initial ideas and suggests related concepts, alternative framings, and unexpected connections. The visualization grows organically as your thinking develops."
      },
      {
        title: "How It Works",
        type: 'heading',
        content: ""
      },
      {
        type: 'paragraph',
        content: "Start with a central concept. The AI suggests related ideas, which you can accept, reject, or modify. Accepted ideas become new nodes that spawn their own suggestions. The result is a rich map of interconnected thoughts."
      },
      {
        type: 'tech-grid',
        content: ["React", "TypeScript", "OpenAI API", "D3.js", "Canvas"]
      }
    ]
  },
  "versecraft": {
    overline: "Full-Stack Web",
    subtitle: "Where code meets literature in a space designed for the written word",
    readTime: "4 min read",
    lastUpdated: "December 2025",
    sections: [
      {
        type: 'lead',
        content: "Most poetry websites feel like afterthoughts - generic templates that treat verse like any other content. VerseCraft is different. Every design decision honors the craft of poetry."
      },
      {
        type: 'paragraph',
        content: "The New Yorker-inspired aesthetic isn't just visual polish. It's a statement that digital poetry deserves the same thoughtful presentation as print. Typography, whitespace, animation - all in service of the words."
      },
      {
        title: "Design Philosophy",
        type: 'heading',
        content: ""
      },
      {
        type: 'paragraph',
        content: "Poetry demands different reading rhythms than prose. The interface is deliberately minimal - no distracting sidebars, no algorithmic feeds. Just the poem, presented with the reverence it deserves."
      },
      {
        type: 'card',
        content: "Framer Motion animations aren't decorative - they guide the eye and create breathing room between stanzas. The transitions feel like turning pages in a beautifully designed collection."
      },
      {
        title: "Technical Details",
        type: 'subheading',
        content: ""
      },
      {
        type: 'list',
        content: [
          "Next.js 14 with App Router for optimal performance",
          "Supabase for real-time interactions and auth",
          "Framer Motion for thoughtful animations",
          "Typography system optimized for verse",
          "Responsive design that maintains aesthetic integrity"
        ]
      },
      {
        type: 'tech-grid',
        content: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "Framer Motion"]
      }
    ]
  }
};

// Default essay for projects without custom content
const defaultEssay = {
  overline: "Project",
  subtitle: "A technical deep-dive",
  readTime: "2 min read",
  lastUpdated: "2025",
  sections: [] as typeof projectEssays["prometheus"]["sections"]
};

export function ProjectEssay({ project }: ProjectEssayProps) {
  const essay = projectEssays[project.id] || defaultEssay;

  // Generate default sections if no essay exists
  const sections = essay.sections.length > 0 ? essay.sections : [
    {
      type: 'lead' as const,
      content: project.narrative || project.description
    },
    {
      type: 'paragraph' as const,
      content: project.description
    },
    {
      title: 'Technologies Used',
      type: 'heading' as const,
      content: ''
    },
    {
      type: 'tech-grid' as const,
      content: project.tech
    }
  ];

  const categoryLabels: Record<string, string> = {
    systems: "Systems Programming",
    ml: "Machine Learning",
    web: "Full-Stack Development",
    tools: "Tools & Experiments",
    ai: "AI & Infrastructure"
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border"
      >
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/#projects"
            className="flex items-center gap-2 text-foreground-muted hover:text-foreground transition-colors font-sans text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>
          <div className="flex items-center gap-4">
            {project.github && (
              <Link
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground-muted hover:text-foreground transition-colors"
              >
                <Github className="w-5 h-5" />
              </Link>
            )}
            {project.live && (
              <Link
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground-muted hover:text-foreground transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
              </Link>
            )}
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <main className="pt-24 pb-32">
        <div className="max-w-3xl mx-auto px-6">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center mb-16 pb-12 border-b border-border"
          >
            <p className="font-sans text-xs font-semibold tracking-widest uppercase text-primary-500 mb-5">
              {essay.overline || categoryLabels[project.category]}
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-6">
              {project.title}
            </h1>
            <p className="font-serif text-xl text-foreground-muted italic max-w-xl mx-auto">
              {essay.subtitle || project.narrative || project.description}
            </p>
            <div className="flex items-center justify-center gap-6 mt-8 text-foreground-subtle font-sans text-sm">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {essay.readTime}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {essay.lastUpdated}
              </span>
            </div>
          </motion.header>

          {/* Article Content */}
          <motion.article
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="prose-custom"
          >
            {sections.map((section, index) => (
              <EssaySection key={index} section={section} index={index} />
            ))}
          </motion.article>

          {/* Footer Links */}
          <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-20 pt-12 border-t border-border"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <Link
                href="/#projects"
                className="flex items-center gap-2 text-foreground-muted hover:text-foreground transition-colors font-sans"
              >
                <ArrowLeft className="w-4 h-4" />
                View all projects
              </Link>
              <div className="flex items-center gap-4">
                {project.github && (
                  <Link
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:border-foreground/20 transition-colors font-sans text-sm"
                  >
                    <Github className="w-4 h-4" />
                    View Source
                  </Link>
                )}
                {project.live && (
                  <Link
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-foreground text-background hover:opacity-90 transition-opacity font-sans text-sm"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </Link>
                )}
              </div>
            </div>
          </motion.footer>
        </div>
      </main>
    </div>
  );
}

function EssaySection({ section, index }: { section: typeof projectEssays["prometheus"]["sections"][0], index: number }) {
  const delay = 0.05 * index;

  switch (section.type) {
    case 'lead':
      return (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay }}
          className="text-xl leading-relaxed text-foreground mb-8 first-letter:text-6xl first-letter:font-display first-letter:font-semibold first-letter:float-left first-letter:mr-3 first-letter:mt-1"
        >
          {section.content as string}
        </motion.p>
      );

    case 'heading':
      return (
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay }}
          className="font-display text-2xl font-semibold tracking-tight mt-16 mb-6 pt-8 border-t border-border first:border-t-0 first:pt-0 first:mt-0"
        >
          {section.title}
        </motion.h2>
      );

    case 'subheading':
      return (
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay }}
          className="font-sans text-xs font-semibold tracking-widest uppercase text-primary-500 mt-12 mb-5"
        >
          {section.title}
        </motion.h3>
      );

    case 'paragraph':
      return (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay }}
          className="text-foreground-muted leading-relaxed mb-6"
        >
          {section.content as string}
        </motion.p>
      );

    case 'list':
      return (
        <motion.ul
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay }}
          className="text-foreground-muted leading-relaxed mb-8 space-y-3 pl-0"
        >
          {(section.content as string[]).map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <ChevronRight className="w-4 h-4 text-primary-500 mt-1.5 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </motion.ul>
      );

    case 'quote':
      return (
        <motion.blockquote
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay }}
          className="border-l-3 border-primary-500 pl-6 my-10 italic text-foreground-muted text-lg"
        >
          {section.content as string}
        </motion.blockquote>
      );

    case 'card':
      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay }}
          className="bg-background-secondary border border-border rounded-xl p-7 my-8"
        >
          <p className="text-foreground-muted leading-relaxed m-0">
            {section.content as string}
          </p>
        </motion.div>
      );

    case 'highlight':
      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay }}
          className="bg-primary-500/10 border-l-4 border-primary-500 pl-6 pr-6 py-5 my-8 rounded-r-xl"
        >
          <p className="text-foreground leading-relaxed m-0">
            {section.content as string}
          </p>
        </motion.div>
      );

    case 'tech-grid':
      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay }}
          className="flex flex-wrap gap-2 mt-8 mb-6"
        >
          {(section.content as string[]).map((tech, i) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: delay + i * 0.03 }}
              className="px-3 py-1.5 text-sm font-sans rounded-lg bg-background-tertiary text-foreground-muted border border-border"
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      );

    case 'flow':
      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay }}
          className="flex flex-wrap items-center justify-center gap-2 my-10 font-sans text-sm"
        >
          {(section.content as string[]).map((step, i, arr) => (
            <span key={i} className="flex items-center gap-2">
              <span className="px-4 py-2 rounded-lg bg-background-tertiary border border-border text-foreground">
                {step}
              </span>
              {i < arr.length - 1 && (
                <ChevronRight className="w-4 h-4 text-foreground-subtle" />
              )}
            </span>
          ))}
        </motion.div>
      );

    default:
      return null;
  }
}
