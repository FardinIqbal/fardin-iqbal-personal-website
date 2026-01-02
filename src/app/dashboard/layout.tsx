"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  BarChart3,
  MessageSquare,
  FileText,
  Settings,
  Menu,
  X,
  LogOut,
  ChevronRight,
  Hexagon,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Conditional Clerk UserButton - only renders if Clerk is configured
function ConditionalUserButton() {
  const [ClerkUserButton, setClerkUserButton] = useState<React.ComponentType<any> | null>(null);

  useEffect(() => {
    // Only import Clerk if the publishable key is available
    if (process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
      import("@clerk/nextjs").then(({ UserButton }) => {
        setClerkUserButton(() => UserButton);
      });
    }
  }, []);

  if (!ClerkUserButton) {
    // Fallback avatar when Clerk isn't configured
    return (
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center">
        <User className="w-5 h-5 text-white" />
      </div>
    );
  }

  return (
    <ClerkUserButton
      appearance={{
        elements: {
          avatarBox: "w-10 h-10",
        },
      }}
    />
  );
}

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Overview" },
  { href: "/dashboard/analytics", icon: BarChart3, label: "Analytics" },
  { href: "/dashboard/messages", icon: MessageSquare, label: "Messages" },
  { href: "/dashboard/content", icon: FileText, label: "Content" },
  { href: "/dashboard/settings", icon: Settings, label: "Settings" },
];

function Sidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: isOpen ? 0 : -280,
        }}
        className={cn(
          "fixed left-0 top-0 bottom-0 w-[280px] bg-background-secondary border-r border-white/5 z-50",
          "lg:translate-x-0 lg:static"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-white/5">
            <Link href="/dashboard" className="flex items-center gap-3">
              <motion.div
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center"
                whileHover={{ scale: 1.05, rotate: 5 }}
              >
                <Hexagon className="w-5 h-5 text-white" />
              </motion.div>
              <div>
                <h1 className="font-bold text-foreground">Dashboard</h1>
                <p className="text-xs text-foreground-muted">Admin Panel</p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.href} href={item.href} onClick={onClose}>
                  <motion.div
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl transition-colors relative group",
                      isActive
                        ? "bg-primary-500/10 text-primary-400"
                        : "text-foreground-muted hover:text-foreground hover:bg-white/5"
                    )}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary-500 rounded-r-full"
                      />
                    )}
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                    <ChevronRight
                      className={cn(
                        "w-4 h-4 ml-auto opacity-0 -translate-x-2 transition-all",
                        "group-hover:opacity-100 group-hover:translate-x-0"
                      )}
                    />
                  </motion.div>
                </Link>
              );
            })}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-white/5">
            <div className="flex items-center gap-3 px-4 py-3">
              <ConditionalUserButton />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  Admin
                </p>
                <p className="text-xs text-foreground-muted">Manage site</p>
              </div>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 h-16 bg-background/80 backdrop-blur-xl border-b border-white/5 flex items-center px-4 lg:px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-white/5 lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex-1" />

          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-sm text-foreground-muted hover:text-foreground transition-colors"
            >
              View Site
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
