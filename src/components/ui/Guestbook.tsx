"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, User } from "lucide-react";
import confetti from "canvas-confetti";
import { cn } from "@/lib/utils";

interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  timestamp: number;
  color: string;
}

const COLORS = [
  "text-blue-400",
  "text-green-400",
  "text-purple-400",
  "text-pink-400",
  "text-yellow-400",
  "text-orange-400",
  "text-cyan-400",
];

// Demo entries for initial state
const DEMO_ENTRIES: GuestbookEntry[] = [
  {
    id: "demo-1",
    name: "Visitor",
    message: "Great portfolio! Love the design.",
    timestamp: Date.now() - 86400000,
    color: "text-blue-400",
  },
  {
    id: "demo-2",
    name: "Developer",
    message: "The command palette is such a nice touch",
    timestamp: Date.now() - 172800000,
    color: "text-green-400",
  },
];

export function Guestbook() {
  const [isOpen, setIsOpen] = useState(false);
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Load entries from localStorage
    const saved = localStorage.getItem("guestbook-entries");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setEntries(parsed);
      } catch {
        setEntries(DEMO_ENTRIES);
      }
    } else {
      setEntries(DEMO_ENTRIES);
    }

    // Load saved name
    const savedName = localStorage.getItem("guestbook-name");
    if (savedName) setName(savedName);
  }, []);

  const triggerConfetti = useCallback(() => {
    const defaults = {
      spread: 360,
      ticks: 50,
      gravity: 0.8,
      decay: 0.94,
      startVelocity: 20,
      colors: ["#6366f1", "#8b5cf6", "#a855f7", "#3b82f6", "#22c55e"],
    };

    confetti({
      ...defaults,
      particleCount: 30,
      scalar: 1.2,
      shapes: ["circle", "square"],
      origin: { x: 0.9, y: 0.9 },
    });

    setTimeout(() => {
      confetti({
        ...defaults,
        particleCount: 20,
        scalar: 0.8,
        shapes: ["circle"],
        origin: { x: 0.85, y: 0.85 },
      });
    }, 100);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    const newEntry: GuestbookEntry = {
      id: Date.now().toString(),
      name: name.trim(),
      message: message.trim(),
      timestamp: Date.now(),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    };

    const updatedEntries = [newEntry, ...entries];
    setEntries(updatedEntries);
    localStorage.setItem("guestbook-entries", JSON.stringify(updatedEntries));
    localStorage.setItem("guestbook-name", name.trim());

    setMessage("");
    setIsSubmitting(false);

    // Celebrate!
    triggerConfetti();
  };

  const formatTime = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-background-secondary border border-border shadow-lg hover:bg-background-tertiary transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title="Leave a message"
      >
        <MessageSquare className="w-5 h-5 text-foreground-muted" />
        {entries.length > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary-500 text-white text-xs rounded-full flex items-center justify-center">
            {entries.length > 9 ? "9+" : entries.length}
          </span>
        )}
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-background border border-border rounded-xl shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-foreground-subtle" />
                  <h3 className="font-medium text-foreground">Guestbook</h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 text-foreground-subtle hover:text-foreground transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Messages */}
              <div className="max-h-64 overflow-y-auto p-4 space-y-3">
                {entries.length === 0 ? (
                  <p className="text-sm text-foreground-subtle text-center py-4">
                    Be the first to leave a message!
                  </p>
                ) : (
                  entries.map((entry) => (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="group"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <User className={cn("w-3 h-3", entry.color)} />
                        <span className={cn("text-sm font-medium", entry.color)}>
                          {entry.name}
                        </span>
                        <span className="text-xs text-foreground-subtle ml-auto">
                          {formatTime(entry.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm text-foreground-muted pl-5">
                        {entry.message}
                      </p>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="p-4 border-t border-border bg-background-secondary/30"
              >
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="flex-1 px-3 py-1.5 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-foreground/20 text-foreground placeholder:text-foreground-subtle"
                    maxLength={30}
                  />
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Leave a message..."
                    className="flex-1 px-3 py-1.5 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-foreground/20 text-foreground placeholder:text-foreground-subtle"
                    maxLength={200}
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting || !name.trim() || !message.trim()}
                    className="px-3 py-1.5 bg-foreground text-background rounded-md hover:bg-foreground/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
