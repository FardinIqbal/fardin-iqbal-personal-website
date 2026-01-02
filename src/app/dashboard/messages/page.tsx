"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Star,
  Trash2,
  Archive,
  Search,
  Filter,
  MoreVertical,
  Clock,
  User,
  ChevronRight,
  X,
  Reply,
  CheckCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock messages - in production, fetch from database
const mockMessages = [
  {
    id: 1,
    name: "Sarah Chen",
    email: "sarah.chen@techcorp.com",
    subject: "Interested in your work",
    message:
      "Hi Fardin, I came across your portfolio and was really impressed by your FairShare project. We're looking for a developer who can build similar fintech applications. Would you be interested in chatting about a potential opportunity?",
    date: "2024-01-15T10:30:00",
    read: false,
    starred: true,
  },
  {
    id: 2,
    name: "Alex Rivera",
    email: "alex@startup.io",
    subject: "Collaboration opportunity",
    message:
      "Hey! I'm working on an AI startup and love your VerseCraft project. Would be great to discuss how we could work together on some NLP features.",
    date: "2024-01-14T15:45:00",
    read: true,
    starred: false,
  },
  {
    id: 3,
    name: "Jordan Taylor",
    email: "jtaylor@bigtech.com",
    subject: "Full-stack position",
    message:
      "Your experience with Ruby on Rails and React is exactly what we need. I'd love to schedule a call to discuss our open positions.",
    date: "2024-01-13T09:20:00",
    read: true,
    starred: true,
  },
  {
    id: 4,
    name: "Morgan Lee",
    email: "morgan@agency.design",
    subject: "Freelance project inquiry",
    message:
      "We have a client looking for a custom web application. Based on your portfolio, you'd be a great fit. Budget is flexible. Let me know if you're available.",
    date: "2024-01-12T14:00:00",
    read: false,
    starred: false,
  },
  {
    id: 5,
    name: "Casey Kim",
    email: "casey@university.edu",
    subject: "Guest lecture invitation",
    message:
      "Hi Fardin, I'm a professor at the CS department and would love to invite you to give a guest lecture on modern web development to our students.",
    date: "2024-01-10T11:30:00",
    read: true,
    starred: false,
  },
];

interface Message {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
  starred: boolean;
}

function MessageRow({
  message,
  isSelected,
  onClick,
  onStar,
  onDelete,
}: {
  message: Message;
  isSelected: boolean;
  onClick: () => void;
  onStar: () => void;
  onDelete: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={cn(
        "flex items-center gap-4 p-4 border-b border-white/5 cursor-pointer transition-all",
        !message.read && "bg-primary-500/5",
        isSelected && "bg-primary-500/10 border-l-2 border-l-primary-500",
        isHovered && "bg-white/5"
      )}
    >
      {/* Star */}
      <motion.button
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        onClick={(e) => {
          e.stopPropagation();
          onStar();
        }}
        className="p-1"
      >
        <Star
          className={cn(
            "w-5 h-5 transition-colors",
            message.starred
              ? "fill-yellow-400 text-yellow-400"
              : "text-foreground-subtle hover:text-yellow-400"
          )}
        />
      </motion.button>

      {/* Avatar */}
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center flex-shrink-0">
        <span className="text-white font-medium text-sm">
          {message.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span
            className={cn(
              "font-medium truncate",
              !message.read ? "text-foreground" : "text-foreground-muted"
            )}
          >
            {message.name}
          </span>
          {!message.read && (
            <span className="w-2 h-2 rounded-full bg-primary-500 flex-shrink-0" />
          )}
        </div>
        <p
          className={cn(
            "text-sm truncate",
            !message.read ? "text-foreground" : "text-foreground-muted"
          )}
        >
          {message.subject}
        </p>
        <p className="text-xs text-foreground-subtle truncate mt-0.5">
          {message.message}
        </p>
      </div>

      {/* Date & Actions */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-foreground-muted whitespace-nowrap">
          {new Date(message.date).toLocaleDateString()}
        </span>

        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-1"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
                className="p-1.5 rounded-lg hover:bg-red-500/10 text-foreground-muted hover:text-red-400 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
                className="p-1.5 rounded-lg hover:bg-white/10 text-foreground-muted hover:text-foreground transition-colors"
              >
                <Archive className="w-4 h-4" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        <ChevronRight className="w-4 h-4 text-foreground-subtle" />
      </div>
    </motion.div>
  );
}

function MessageDetail({
  message,
  onClose,
  onMarkRead,
}: {
  message: Message;
  onClose: () => void;
  onMarkRead: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="h-full flex flex-col"
    >
      {/* Header */}
      <div className="p-4 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/5 lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
          <h2 className="text-lg font-semibold text-foreground">
            {message.subject}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          {!message.read && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onMarkRead}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary-500/10 text-primary-400 text-sm font-medium hover:bg-primary-500/20 transition-colors"
            >
              <CheckCircle className="w-4 h-4" />
              Mark as read
            </motion.button>
          )}
        </div>
      </div>

      {/* Sender info */}
      <div className="p-4 border-b border-white/5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center">
            <span className="text-white font-medium">
              {message.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </div>
          <div>
            <p className="font-medium text-foreground">{message.name}</p>
            <p className="text-sm text-foreground-muted">{message.email}</p>
          </div>
          <div className="ml-auto text-right">
            <p className="text-sm text-foreground-muted flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {new Date(message.date).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Message body */}
      <div className="flex-1 p-6 overflow-auto">
        <p className="text-foreground leading-relaxed whitespace-pre-wrap">
          {message.message}
        </p>
      </div>

      {/* Reply section */}
      <div className="p-4 border-t border-white/5">
        <motion.a
          href={`mailto:${message.email}?subject=Re: ${message.subject}`}
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-primary-500 text-white font-medium hover:bg-primary-600 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Reply className="w-5 h-5" />
          Reply via Email
        </motion.a>
      </div>
    </motion.div>
  );
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "unread" | "starred">("all");

  const filteredMessages = messages.filter((msg) => {
    const matchesSearch =
      msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.message.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      filter === "all" ||
      (filter === "unread" && !msg.read) ||
      (filter === "starred" && msg.starred);

    return matchesSearch && matchesFilter;
  });

  const handleStar = (id: number) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === id ? { ...msg, starred: !msg.starred } : msg
      )
    );
  };

  const handleDelete = (id: number) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
    if (selectedMessage?.id === id) {
      setSelectedMessage(null);
    }
  };

  const handleMarkRead = (id: number) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, read: true } : msg))
    );
  };

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div className="h-[calc(100vh-8rem)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Messages</h1>
          <p className="text-foreground-muted">
            {unreadCount} unread message{unreadCount !== 1 && "s"}
          </p>
        </div>
      </div>

      <div className="flex gap-6 h-[calc(100%-4rem)]">
        {/* Message list */}
        <motion.div
          className={cn(
            "flex-1 rounded-2xl bg-gradient-to-br from-background-secondary to-background-tertiary border border-white/5 overflow-hidden flex flex-col",
            selectedMessage && "hidden lg:flex"
          )}
        >
          {/* Search & Filter */}
          <div className="p-4 border-b border-white/5 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-subtle" />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-background border border-white/10 text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-primary-500/50"
              />
            </div>

            <div className="flex gap-2">
              {(["all", "unread", "starred"] as const).map((f) => (
                <motion.button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-sm font-medium transition-colors",
                    filter === f
                      ? "bg-primary-500 text-white"
                      : "bg-white/5 text-foreground-muted hover:bg-white/10"
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-auto">
            <AnimatePresence>
              {filteredMessages.length > 0 ? (
                filteredMessages.map((msg) => (
                  <MessageRow
                    key={msg.id}
                    message={msg}
                    isSelected={selectedMessage?.id === msg.id}
                    onClick={() => setSelectedMessage(msg)}
                    onStar={() => handleStar(msg.id)}
                    onDelete={() => handleDelete(msg.id)}
                  />
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center h-full text-foreground-muted"
                >
                  <Mail className="w-12 h-12 mb-4 opacity-50" />
                  <p>No messages found</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Message detail */}
        <AnimatePresence>
          {selectedMessage && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className={cn(
                "w-full lg:w-[500px] rounded-2xl bg-gradient-to-br from-background-secondary to-background-tertiary border border-white/5 overflow-hidden",
                "fixed inset-0 lg:static lg:flex"
              )}
            >
              <MessageDetail
                message={selectedMessage}
                onClose={() => setSelectedMessage(null)}
                onMarkRead={() => handleMarkRead(selectedMessage.id)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
