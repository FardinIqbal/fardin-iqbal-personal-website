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
  { label: "Work", href: "/#projects" },
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
          "fixed top-0 left-0 right-0 z-40 transition-all duration-200",
          isScrolled
            ? "bg-background/98 backdrop-blur-sm border-b border-border/50"
            : "bg-transparent"
        )}
      >
        <nav className="editorial-container">
          <div className="flex items-center justify-between h-14">
            {/* Logo - Minimal New Yorker style */}
            <Link
              href="/"
              onClick={handleLogoClick}
              className="text-sm font-serif font-normal text-foreground hover:opacity-70 transition-opacity duration-200"
            >
              Fardin Iqbal
            </Link>

            {/* Desktop Navigation - Minimal, New Yorker style */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.replace("/#", "") || pathname === item.href;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      "text-[0.65rem] font-inter font-medium uppercase tracking-[0.15em] transition-colors duration-200",
                      isActive
                        ? "text-foreground"
                        : "text-foreground-subtle hover:text-foreground"
                    )}
                  >
                    {item.label}
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
                className="p-2 text-foreground-subtle hover:text-foreground transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-4 h-4" />
                ) : (
                  <Menu className="w-4 h-4" />
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
              className="absolute inset-0 bg-background/95 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Content */}
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 bottom-0 w-72 bg-background border-l border-border p-6 pt-20"
            >
              <div className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => {
                      haptic("selection");
                      setIsMobileMenuOpen(false);
                    }}
                    className="py-3 font-inter text-xs uppercase tracking-wider text-foreground-muted hover:text-foreground transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                ))}

                <div className="pt-4 mt-4 border-t border-border">
                  <Link
                    href="/resume/Fardin_Iqbal_Resume.pdf"
                    target="_blank"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="inline-flex items-center px-4 py-2 text-xs font-inter font-medium uppercase tracking-wider border border-border hover:bg-background-tertiary transition-all duration-300"
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
