import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Uses",
  description: "The tools, software, and gear I use for development, productivity, and life.",
};

interface UsesItem {
  name: string;
  description: string;
  link?: string;
}

interface UsesCategory {
  title: string;
  items: UsesItem[];
}

const uses: UsesCategory[] = [
  {
    title: "Editor & Terminal",
    items: [
      {
        name: "Cursor",
        description: "AI-powered code editor. VS Code fork with built-in AI that actually understands context.",
        link: "https://cursor.sh",
      },
      {
        name: "Claude Code",
        description: "Anthropic's CLI for Claude. The backbone of my Prometheus AI infrastructure.",
        link: "https://claude.ai",
      },
      {
        name: "Warp",
        description: "Modern terminal with AI command search. Makes the command line feel like 2025.",
        link: "https://warp.dev",
      },
      {
        name: "Monaspace",
        description: "GitHub's new monospace font family. Using Argon variant with texture healing.",
        link: "https://monaspace.githubnext.com",
      },
    ],
  },
  {
    title: "Development",
    items: [
      {
        name: "Next.js",
        description: "React framework for production. App Router + Server Components changed everything.",
        link: "https://nextjs.org",
      },
      {
        name: "TypeScript",
        description: "Type safety is not optional. Catches bugs before they happen.",
        link: "https://typescriptlang.org",
      },
      {
        name: "Tailwind CSS",
        description: "Utility-first CSS. Skeptical at first, now can't imagine going back.",
        link: "https://tailwindcss.com",
      },
      {
        name: "Framer Motion",
        description: "Animation library for React. Makes everything feel polished.",
        link: "https://framer.com/motion",
      },
      {
        name: "Drizzle ORM",
        description: "TypeScript ORM that feels like writing SQL. Better than Prisma for my use cases.",
        link: "https://orm.drizzle.team",
      },
      {
        name: "tRPC",
        description: "End-to-end typesafe APIs. No more API documentation to maintain.",
        link: "https://trpc.io",
      },
    ],
  },
  {
    title: "Infrastructure",
    items: [
      {
        name: "Vercel",
        description: "Deploy with git push. Zero-config deployments that just work.",
        link: "https://vercel.com",
      },
      {
        name: "Supabase",
        description: "Postgres + Auth + Realtime. Firebase alternative that doesn't lock you in.",
        link: "https://supabase.com",
      },
      {
        name: "Cloudflare",
        description: "DNS, CDN, and edge computing. R2 for storage, Workers for serverless.",
        link: "https://cloudflare.com",
      },
    ],
  },
  {
    title: "Productivity",
    items: [
      {
        name: "Notion",
        description: "Second brain for everything. Life captures, project docs, reading notes.",
        link: "https://notion.so",
      },
      {
        name: "Raycast",
        description: "Spotlight replacement on steroids. Clipboard history, snippets, window management.",
        link: "https://raycast.com",
      },
      {
        name: "Arc Browser",
        description: "Browser that feels designed for how I actually work. Spaces are a game changer.",
        link: "https://arc.net",
      },
      {
        name: "Obsidian",
        description: "Markdown-based notes with bidirectional linking. For deeper thinking.",
        link: "https://obsidian.md",
      },
    ],
  },
  {
    title: "Hardware",
    items: [
      {
        name: 'MacBook Pro 14"',
        description: "M3 Pro, 18GB RAM. Silent, all-day battery, handles everything I throw at it.",
      },
      {
        name: "Sony WH-1000XM5",
        description: "Noise canceling headphones. Essential for deep work.",
      },
      {
        name: "Keychron K3",
        description: "Low-profile mechanical keyboard. Gateron Brown switches.",
      },
    ],
  },
  {
    title: "Learning",
    items: [
      {
        name: "Kindle Paperwhite",
        description: "Distraction-free reading. Syncs highlights to Notion.",
      },
      {
        name: "Anki",
        description: "Spaced repetition for retaining what I learn. Use it for systems concepts.",
        link: "https://apps.ankiweb.net",
      },
    ],
  },
  {
    title: "BJJ",
    items: [
      {
        name: "Shoyoroll Gi",
        description: "Premium gi that fits well. Worth the hype.",
        link: "https://shoyoroll.com",
      },
      {
        name: "BJJ Mental Models",
        description: "Podcast for the conceptual side of jiu-jitsu. Systems thinking applied to grappling.",
        link: "https://bjjmentalmodels.com",
      },
    ],
  },
];

export default function UsesPage() {
  return (
    <>
      <Header />
      <main id="main" className="min-h-screen pt-24 pb-20 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto">
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-sans text-sm text-foreground-muted hover:text-foreground transition-colors mb-12"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>

          {/* Header */}
          <header className="mb-16">
            <h1 className="font-display text-4xl md:text-5xl font-medium text-foreground tracking-tight mb-4">
              Uses
            </h1>
            <p className="font-body text-lg text-foreground-secondary max-w-xl">
              The tools, software, and gear I use for development, productivity, and life.
              Inspired by{" "}
              <a
                href="https://uses.tech"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground-secondary underline underline-offset-4 hover:text-foreground transition-colors"
              >
                uses.tech
              </a>
              .
            </p>
          </header>

          {/* Categories */}
          <div className="space-y-16">
            {uses.map((category) => (
              <section key={category.title}>
                <h2 className="font-sans text-xs font-medium tracking-wider uppercase text-foreground-muted mb-6 pb-4 border-b border-border">
                  {category.title}
                </h2>
                <div className="space-y-6">
                  {category.items.map((item) => (
                    <div key={item.name}>
                      <div className="flex items-baseline gap-2 mb-1">
                        {item.link ? (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-display text-foreground font-medium hover:text-accent transition-colors"
                          >
                            {item.name}
                          </a>
                        ) : (
                          <span className="font-display text-foreground font-medium">{item.name}</span>
                        )}
                      </div>
                      <p className="font-body text-foreground-muted text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Footer note */}
          <footer className="mt-16 pt-8 border-t border-border">
            <p className="font-sans text-sm text-foreground-muted">
              Last updated January 2026. This page is updated as my setup evolves.
            </p>
          </footer>
        </div>
      </main>
      <Footer />
    </>
  );
}
