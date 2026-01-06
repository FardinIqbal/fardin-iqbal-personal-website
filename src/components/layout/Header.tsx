"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { haptic } from "@/lib/haptics";

const navItems = [
  { label: "About", href: "/#about" },
  { label: "Work", href: "/#experience" },
  { label: "Projects", href: "/#projects" },
  { label: "Essays", href: "/essays" },
  { label: "Contact", href: "/#contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const pathname = usePathname();

  const handleLogoClick = (e: React.MouseEvent) => {
    // If on home page, scroll to top instead of navigating
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Detect active section
      const sections = navItems
        .filter((item) => item.href.startsWith("/#"))
        .map((item) => item.href.replace("/#", ""));

      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-500",
          isScrolled
            ? "bg-background/98 backdrop-blur-xl border-b border-border/40 shadow-sm"
            : "bg-transparent"
        )}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo - Refined New Yorker style */}
            <Link
              href="/"
              onClick={handleLogoClick}
              className="text-lg font-serif font-normal text-foreground hover:opacity-80 transition-opacity duration-300 tracking-tight whitespace-nowrap"
            >
              Fardin Iqbal
            </Link>

            {/* Desktop Navigation - Clean and readable */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.replace("/#", "") || pathname === item.href;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      "text-sm font-inter font-medium transition-all duration-300 relative py-2 px-1",
                      isActive
                        ? "text-foreground"
                        : "text-foreground-muted hover:text-foreground"
                    )}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[rgb(var(--accent-red))] opacity-80" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Mobile: Menu Button */}
            <div className="flex md:hidden items-center">
              <button
                onClick={() => {
                  haptic("light");
                  setIsMobileMenuOpen(!isMobileMenuOpen);
                }}
                className="p-2.5 text-foreground hover:text-foreground-muted transition-colors duration-300"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu - clean */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-background/98 backdrop-blur-md"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Content */}
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 bottom-0 w-80 bg-background border-l border-border/40 p-8 pt-28 shadow-xl"
            >
              <div className="flex flex-col gap-1">
                {navItems.map((item) => {
                  const isActive = activeSection === item.href.replace("/#", "") || pathname === item.href;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => {
                        haptic("selection");
                        setIsMobileMenuOpen(false);
                      }}
                      className={cn(
                        "py-4 font-inter text-base text-foreground-muted hover:text-foreground transition-colors duration-300 border-b border-border/20 last:border-0",
                        isActive && "text-foreground font-medium"
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}

                <div className="pt-8 mt-4 border-t border-border/40">
                  <Link
                    href="/resume/Fardin_Iqbal_Resume.pdf"
                    target="_blank"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="inline-flex items-center justify-center px-6 py-3 text-sm font-inter font-medium border border-border/50 hover:border-foreground-subtle hover:bg-background-tertiary transition-all duration-300 rounded-md w-full"
                  >
                    Resume
                  </Link>
                </div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
