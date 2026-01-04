"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Search,
  Home,
  Briefcase,
  FolderOpen,
  BookOpen,
  Mail,
  Github,
  Linkedin,
  FileText,
  Moon,
  Sun,
  Palette,
  Terminal,
  Sparkles,
  User,
  Compass,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Command {
  id: string;
  label: string;
  description?: string;
  icon: React.ReactNode;
  action: () => void;
  keywords?: string[];
  category: "navigation" | "projects" | "social" | "actions" | "easter-eggs";
}

interface CommandPaletteProps {
  projects?: { id: string; title: string }[];
}

export function CommandPalette({ projects = [] }: CommandPaletteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const commands: Command[] = [
    // Navigation
    {
      id: "home",
      label: "Go to Home",
      icon: <Home className="w-4 h-4" />,
      action: () => { router.push("/"); setIsOpen(false); },
      keywords: ["home", "start", "main"],
      category: "navigation",
    },
    {
      id: "projects",
      label: "Go to Projects",
      icon: <FolderOpen className="w-4 h-4" />,
      action: () => { document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); setIsOpen(false); },
      keywords: ["projects", "work", "portfolio"],
      category: "navigation",
    },
    {
      id: "experience",
      label: "Go to Experience",
      icon: <Briefcase className="w-4 h-4" />,
      action: () => { document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" }); setIsOpen(false); },
      keywords: ["experience", "work", "jobs", "career"],
      category: "navigation",
    },
    {
      id: "blog",
      label: "Go to Blog",
      icon: <BookOpen className="w-4 h-4" />,
      action: () => { router.push("/blog"); setIsOpen(false); },
      keywords: ["blog", "writing", "articles", "posts"],
      category: "navigation",
    },
    {
      id: "now",
      label: "Go to Now",
      icon: <Compass className="w-4 h-4" />,
      action: () => { router.push("/now"); setIsOpen(false); },
      keywords: ["now", "currently", "reading", "watching"],
      category: "navigation",
    },
    {
      id: "uses",
      label: "Go to Uses",
      icon: <Terminal className="w-4 h-4" />,
      action: () => { router.push("/uses"); setIsOpen(false); },
      keywords: ["uses", "setup", "tools", "gear", "stack"],
      category: "navigation",
    },
    {
      id: "about",
      label: "Go to About",
      icon: <User className="w-4 h-4" />,
      action: () => { document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }); setIsOpen(false); },
      keywords: ["about", "bio", "me"],
      category: "navigation",
    },

    // Projects (dynamic)
    ...projects.slice(0, 6).map((project) => ({
      id: `project-${project.id}`,
      label: project.title,
      description: "View project",
      icon: <FolderOpen className="w-4 h-4" />,
      action: () => { router.push(`/projects/${project.id}`); setIsOpen(false); },
      keywords: [project.title.toLowerCase(), "project"],
      category: "projects" as const,
    })),

    // Social
    {
      id: "github",
      label: "GitHub",
      description: "View my code",
      icon: <Github className="w-4 h-4" />,
      action: () => { window.open("https://github.com/FardinIqbal", "_blank"); setIsOpen(false); },
      keywords: ["github", "code", "repos"],
      category: "social",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      description: "Connect with me",
      icon: <Linkedin className="w-4 h-4" />,
      action: () => { window.open("https://linkedin.com/in/fardiniqbal", "_blank"); setIsOpen(false); },
      keywords: ["linkedin", "connect", "network"],
      category: "social",
    },
    {
      id: "email",
      label: "Send Email",
      description: "fardin.iqbal@stonybrook.edu",
      icon: <Mail className="w-4 h-4" />,
      action: () => { window.location.href = "mailto:fardin.iqbal@stonybrook.edu"; setIsOpen(false); },
      keywords: ["email", "contact", "message"],
      category: "social",
    },
    {
      id: "resume",
      label: "Download Resume",
      icon: <FileText className="w-4 h-4" />,
      action: () => { window.open("/resume.pdf", "_blank"); setIsOpen(false); },
      keywords: ["resume", "cv", "download"],
      category: "social",
    },

    // Actions
    {
      id: "theme-toggle",
      label: "Toggle Theme",
      description: "Switch dark/light mode",
      icon: <Moon className="w-4 h-4" />,
      action: () => {
        document.documentElement.classList.toggle("light");
        setIsOpen(false);
      },
      keywords: ["theme", "dark", "light", "mode", "toggle"],
      category: "actions",
    },
    {
      id: "theme-switcher",
      label: "Open Theme Switcher",
      description: "Choose a color theme",
      icon: <Palette className="w-4 h-4" />,
      action: () => {
        window.dispatchEvent(new CustomEvent("open-theme-switcher"));
        setIsOpen(false);
      },
      keywords: ["theme", "color", "palette", "dracula", "nord"],
      category: "actions",
    },

    // Easter Eggs
    {
      id: "matrix",
      label: "Enter the Matrix",
      icon: <Sparkles className="w-4 h-4" />,
      action: () => {
        window.dispatchEvent(new CustomEvent("trigger-matrix"));
        setIsOpen(false);
      },
      keywords: ["matrix", "secret", "easter egg", "hack"],
      category: "easter-eggs",
    },
  ];

  const filteredCommands = commands.filter((cmd) => {
    const searchLower = search.toLowerCase();
    return (
      cmd.label.toLowerCase().includes(searchLower) ||
      cmd.description?.toLowerCase().includes(searchLower) ||
      cmd.keywords?.some((k) => k.includes(searchLower))
    );
  });

  const groupedCommands = {
    navigation: filteredCommands.filter((c) => c.category === "navigation"),
    projects: filteredCommands.filter((c) => c.category === "projects"),
    social: filteredCommands.filter((c) => c.category === "social"),
    actions: filteredCommands.filter((c) => c.category === "actions"),
    "easter-eggs": filteredCommands.filter((c) => c.category === "easter-eggs"),
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Open with Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        setSearch("");
        setSelectedIndex(0);
      }

      if (!isOpen) return;

      // Close with Escape
      if (e.key === "Escape") {
        setIsOpen(false);
      }

      // Navigate with arrows
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, filteredCommands.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      }

      // Execute with Enter
      if (e.key === "Enter" && filteredCommands[selectedIndex]) {
        e.preventDefault();
        filteredCommands[selectedIndex].action();
      }
    },
    [isOpen, filteredCommands, selectedIndex]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - fully opaque for readability */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-background z-50"
            onClick={() => setIsOpen(false)}
          />

          {/* Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-xl z-50 px-4"
          >
            <div className="bg-background border border-border rounded-xl shadow-2xl overflow-hidden">
              {/* Search Input */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
                <Search className="w-5 h-5 text-foreground-subtle" />
                <input
                  ref={inputRef}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Type a command or search..."
                  className="flex-1 bg-transparent text-foreground placeholder:text-foreground-subtle outline-none text-base"
                />
                <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs text-foreground-subtle bg-background-tertiary rounded border border-border">
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <div className="max-h-80 overflow-y-auto py-2">
                {filteredCommands.length === 0 ? (
                  <p className="px-4 py-8 text-center text-foreground-subtle text-sm">
                    No results found.
                  </p>
                ) : (
                  Object.entries(groupedCommands).map(([category, cmds]) =>
                    cmds.length > 0 ? (
                      <div key={category} className="mb-2">
                        <p className="px-4 py-1 text-xs font-medium uppercase tracking-wider text-foreground-subtle">
                          {category === "easter-eggs" ? "Secrets" : category}
                        </p>
                        {cmds.map((cmd) => {
                          const globalIndex = filteredCommands.findIndex((c) => c.id === cmd.id);
                          return (
                            <button
                              key={cmd.id}
                              onClick={cmd.action}
                              onMouseEnter={() => setSelectedIndex(globalIndex)}
                              className={cn(
                                "w-full flex items-center gap-3 px-4 py-2 text-left transition-colors",
                                globalIndex === selectedIndex
                                  ? "bg-foreground/5 text-foreground"
                                  : "text-foreground-muted hover:bg-foreground/[0.02]"
                              )}
                            >
                              <span className="flex-shrink-0 text-foreground-subtle">
                                {cmd.icon}
                              </span>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-sm truncate">{cmd.label}</p>
                                {cmd.description && (
                                  <p className="text-xs text-foreground-subtle truncate">
                                    {cmd.description}
                                  </p>
                                )}
                              </div>
                              {cmd.category === "social" && (
                                <ExternalLink className="w-3 h-3 text-foreground-subtle" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    ) : null
                  )
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-2 border-t border-border flex items-center justify-between text-xs text-foreground-subtle">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-background-tertiary rounded border border-border">↑</kbd>
                    <kbd className="px-1.5 py-0.5 bg-background-tertiary rounded border border-border">↓</kbd>
                    navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-background-tertiary rounded border border-border">↵</kbd>
                    select
                  </span>
                </div>
                <span>
                  <kbd className="px-1.5 py-0.5 bg-background-tertiary rounded border border-border">⌘</kbd>
                  <kbd className="px-1.5 py-0.5 bg-background-tertiary rounded border border-border ml-1">K</kbd>
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Hint component to show in footer or header
export function CommandPaletteHint() {
  return (
    <button
      onClick={() => window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }))}
      className="hidden md:flex items-center gap-2 px-3 py-1.5 text-xs text-foreground-subtle bg-background-tertiary/50 border border-border/50 rounded-lg hover:bg-background-tertiary hover:border-border transition-colors"
    >
      <Search className="w-3 h-3" />
      <span>Search</span>
      <kbd className="ml-2 px-1.5 py-0.5 text-[10px] bg-background rounded border border-border">⌘K</kbd>
    </button>
  );
}
