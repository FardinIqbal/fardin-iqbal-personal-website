"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { slugify } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface Heading {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Extract headings from the article
  useEffect(() => {
    const extractHeadings = () => {
      const article = document.querySelector(".prose-article");
      if (!article) return;

      const headingElements = article.querySelectorAll("h2, h3, h4, h5, h6");
      const extractedHeadings: Heading[] = [];

      headingElements.forEach((heading) => {
        const text = heading.textContent || "";
        if (!text.trim()) return;

        // Get or generate ID
        let id = heading.id;
        if (!id) {
          id = slugify(text);
          // Ensure uniqueness
          let uniqueId = id;
          let counter = 1;
          while (document.getElementById(uniqueId)) {
            uniqueId = `${id}-${counter}`;
            counter++;
          }
          id = uniqueId;
          heading.id = id;
        }

        const level = parseInt(heading.tagName.charAt(1));

        extractedHeadings.push({
          id,
          text: text.trim(),
          level,
        });
      });

      setHeadings(extractedHeadings);
    };

    // Wait for content to render
    const timer = setTimeout(extractHeadings, 100);
    return () => clearTimeout(timer);
  }, []);

  // Scroll spy to detect active section
  useEffect(() => {
    if (headings.length === 0) return;

    const headingIds = headings.map((h) => h.id);

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // Offset for better detection
      let currentActive = "";

      // Find the heading that's currently in view
      for (let i = 0; i < headingIds.length; i++) {
        const element = document.getElementById(headingIds[i]);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          const elementBottom = offsetTop + offsetHeight;
          
          // Check if this heading is in the viewport
          if (scrollPosition >= offsetTop && scrollPosition < elementBottom) {
            currentActive = headingIds[i];
            break;
          }
        }
      }

      // If no heading is in view, find the last one we've passed
      if (!currentActive) {
        for (let i = headingIds.length - 1; i >= 0; i--) {
          const element = document.getElementById(headingIds[i]);
          if (element) {
            const { offsetTop } = element;
            if (scrollPosition >= offsetTop) {
              currentActive = headingIds[i];
              break;
            }
          }
        }
      }

      // If scrolled to top, clear active
      if (window.scrollY < 100) {
        setActiveId("");
      } else {
        setActiveId(currentActive);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [headings]);

  // Handle smooth scroll to section
  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Use Lenis if available, otherwise native smooth scroll
      if (typeof window !== "undefined" && (window as any).lenis) {
        (window as any).lenis.scrollTo(element, {
          offset: -100,
          duration: 1.2,
        });
      } else {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        // Adjust for fixed header
        setTimeout(() => {
          window.scrollBy(0, -100);
        }, 100);
      }
      setIsMobileMenuOpen(false);
    }
  };

  if (headings.length === 0) return null;

  return (
    <>
      {/* Desktop: Floating Sidebar */}
      <motion.aside
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="hidden lg:block fixed right-8 top-1/2 -translate-y-1/2 z-40 w-60 max-h-[70vh] overflow-y-auto"
      >
        <div className="toc-container">
          <nav className="toc-nav" aria-label="Table of contents">
            <ul className="toc-list">
              {headings.map((heading) => {
                const isActive = activeId === heading.id;
                const indentLevel = heading.level - 2; // h2 = 0, h3 = 1, etc.
                const paddingValue = indentLevel * 1.25;

                return (
                  <li
                    key={heading.id}
                    className={cn(
                      "toc-item",
                      `toc-level-${heading.level}`,
                      isActive && "toc-active"
                    )}
                    style={{
                      paddingLeft: `${paddingValue}rem`,
                    }}
                  >
                    <button
                      onClick={() => scrollToHeading(heading.id)}
                      className={cn(
                        "toc-link",
                        isActive && "toc-link-active"
                      )}
                      aria-current={isActive ? "true" : undefined}
                    >
                      <span className="toc-link-text">{heading.text}</span>
                      {isActive && (
                        <motion.span
                          layoutId="toc-indicator"
                          className="toc-indicator"
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                          }}
                        />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </motion.aside>

      {/* Mobile: Floating Button & Menu */}
      <div className="lg:hidden">
        {/* Floating Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-background border border-border shadow-lg flex items-center justify-center hover:bg-background-secondary transition-colors"
          aria-label="Toggle table of contents"
        >
          <AnimatePresence mode="wait">
            {isMobileMenuOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-5 h-5 text-foreground" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="w-5 h-5 text-foreground" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
                onClick={() => setIsMobileMenuOpen(false)}
              />

              {/* Menu Panel */}
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{
                  type: "spring",
                  damping: 30,
                  stiffness: 300,
                }}
                className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border rounded-t-2xl shadow-2xl max-h-[70vh] overflow-hidden flex flex-col"
              >
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <h3 className="font-sans text-sm font-semibold text-foreground uppercase tracking-wider">
                    Contents
                  </h3>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1 hover:bg-background-secondary rounded transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5 text-foreground-muted" />
                  </button>
                </div>

                <nav className="flex-1 overflow-y-auto p-4">
                  <ul className="space-y-1">
                    {headings.map((heading) => {
                      const isActive = activeId === heading.id;
                      const indentLevel = heading.level - 2;
                      const paddingValue = indentLevel;

                      return (
                        <li
                          key={heading.id}
                          className={cn(
                            "toc-mobile-item",
                            isActive && "toc-mobile-active"
                          )}
                          style={{
                            paddingLeft: `${paddingValue}rem`,
                          }}
                        >
                          <button
                            onClick={() => scrollToHeading(heading.id)}
                            className={cn(
                              "toc-mobile-link",
                              isActive && "toc-mobile-link-active"
                            )}
                          >
                            {heading.text}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

