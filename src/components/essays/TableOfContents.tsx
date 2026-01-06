"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
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
  const [isMobile, setIsMobile] = useState(false);
  const [mobileNavVisible, setMobileNavVisible] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [sidebarDragX, setSidebarDragX] = useState(0);
  const [sidebarTouchStart, setSidebarTouchStart] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const activeItemRef = useRef<HTMLLIElement>(null);
  const tocWrapperRef = useRef<HTMLElement>(null);

  // Swipe gesture detection from right edge to open
  useEffect(() => {
    if (typeof window === "undefined" || isMobileMenuOpen) return;

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      const screenWidth = window.innerWidth;
      const edgeThreshold = 50; // Detect swipe from within 50px of right edge
      
      // Only detect if starting from right edge
      if (touch.clientX >= screenWidth - edgeThreshold) {
        setTouchStartX(touch.clientX);
        setTouchStartY(touch.clientY);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartX || !touchStartY) return;
      
      const touch = e.touches[0];
      const deltaX = touchStartX - touch.clientX; // Positive = swiping left
      const deltaY = Math.abs(touch.clientY - touchStartY);
      
      // Only trigger if horizontal swipe is dominant (more horizontal than vertical)
      if (deltaX > 0 && deltaX > deltaY && deltaX > 100) {
        setIsMobileMenuOpen(true);
        setTouchStartX(null);
        setTouchStartY(null);
      }
    };

    const handleTouchEnd = () => {
      setTouchStartX(null);
      setTouchStartY(null);
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [touchStartX, touchStartY, isMobileMenuOpen]);

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

  // Scroll spy to detect active section with debouncing
  useEffect(() => {
    if (headings.length === 0) return;

    const headingIds = headings.map((h) => h.id);
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPosition = window.scrollY + 100; // Offset to match scroll-to offset
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
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [headings]);

  // Auto-scroll active item into view
  useEffect(() => {
    if (!activeId || !activeItemRef.current || !scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const activeItem = activeItemRef.current;

    // Calculate positions
    const containerRect = container.getBoundingClientRect();
    const itemRect = activeItem.getBoundingClientRect();
    const containerScrollTop = container.scrollTop;
    const itemOffsetTop = activeItem.offsetTop;
    const containerHeight = container.clientHeight;
    const itemHeight = activeItem.offsetHeight;

    // Check if item is outside visible area
    const itemTop = itemOffsetTop - containerScrollTop;
    const itemBottom = itemTop + itemHeight;

    if (itemTop < 0 || itemBottom > containerHeight) {
      // Smoothly scroll to center the active item
      const targetScroll = itemOffsetTop - containerHeight / 2 + itemHeight / 2;
      
      container.scrollTo({
        top: Math.max(0, targetScroll),
        behavior: "smooth",
      });
    }
  }, [activeId]);

  // Handle wheel events to scroll TOC instead of page when hovering
  useEffect(() => {
    const wrapper = tocWrapperRef.current;
    if (!wrapper) return;

    const handleWheel = (e: WheelEvent) => {
      const container = scrollContainerRef.current;
      if (!container) return;

      // Check if mouse is over the TOC
      const rect = wrapper.getBoundingClientRect();
      const isOverTOC = 
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (isOverTOC) {
        // Check if we can scroll in the direction of the wheel
        const { scrollTop, scrollHeight, clientHeight } = container;
        const canScrollUp = scrollTop > 0;
        const canScrollDown = scrollTop < scrollHeight - clientHeight;

        if ((e.deltaY < 0 && canScrollUp) || (e.deltaY > 0 && canScrollDown)) {
          e.preventDefault();
          e.stopPropagation();
          container.scrollTop += e.deltaY;
        }
      }
    };

    wrapper.addEventListener("wheel", handleWheel, { passive: false });
    return () => wrapper.removeEventListener("wheel", handleWheel);
  }, []);

  // Close sidebar and reset drag state
  const closeSidebar = useCallback(() => {
    setIsMobileMenuOpen(false);
    setSidebarDragX(0);
    setSidebarTouchStart(null);
  }, []);

  // Handle smooth scroll to section with enhanced easing
  const scrollToHeading = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Use Lenis if available, otherwise native smooth scroll with better timing
      if (typeof window !== "undefined" && (window as any).lenis) {
        (window as any).lenis.scrollTo(element, {
          offset: -100,
          duration: 1.2,
          easing: (t: number) => 1 - Math.pow(1 - t, 3), // Ease out cubic
        });
      } else {
        // Enhanced smooth scroll with proper offset
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - 100;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
      closeSidebar();
    }
  }, [closeSidebar]);

  if (headings.length === 0) return null;

  return (
    <>
      {/* Desktop: Floating Sidebar */}
      <motion.aside
        ref={tocWrapperRef}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="hidden lg:block fixed right-8 top-1/2 -translate-y-1/2 z-40 w-56 max-h-[70vh]"
      >
        <div 
          ref={scrollContainerRef}
          className="toc-container toc-scrollable"
        >
          <nav className="toc-nav" aria-label="Table of contents">
            <motion.ul
              className="toc-list"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.05,
                    delayChildren: 0.1,
                  },
                },
              }}
            >
              {headings.map((heading, index) => {
                const isActive = activeId === heading.id;
                const indentLevel = heading.level - 2; // h2 = 0, h3 = 1, etc.
                const paddingValue = indentLevel * 1.25;

                return (
                  <motion.li
                    key={heading.id}
                    ref={isActive ? activeItemRef : null}
                    className={cn(
                      "toc-item",
                      `toc-level-${heading.level}`,
                      isActive && "toc-active"
                    )}
                    style={{
                      paddingLeft: `${paddingValue}rem`,
                    }}
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                          duration: 0.3,
                          ease: [0.4, 0, 0.2, 1],
                        },
                      },
                    }}
                  >
                    <motion.button
                      onClick={() => scrollToHeading(heading.id)}
                      className={cn(
                        "toc-link",
                        isActive && "toc-link-active"
                      )}
                      aria-current={isActive ? "true" : undefined}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                      }}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="toc-indicator"
                          className="toc-indicator"
                          initial={false}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                          }}
                        />
                      )}
                      <span className="toc-link-text">{heading.text}</span>
                    </motion.button>
                  </motion.li>
                );
              })}
            </motion.ul>
          </nav>
        </div>
      </motion.aside>

      {/* Mobile: Swipeable Sidebar */}
      <div className="lg:hidden">
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
                onClick={closeSidebar}
              />

              {/* Sidebar Panel */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: sidebarDragX || 0 }}
                exit={{ x: "100%" }}
                transition={
                  sidebarDragX > 0
                    ? { duration: 0 } // No transition during drag
                    : {
                        type: "spring",
                        damping: 30,
                        stiffness: 300,
                      }
                }
                className="fixed right-0 top-0 bottom-0 z-50 w-80 max-w-[85vw] bg-background border-l border-border shadow-2xl flex flex-col"
                onTouchStart={(e) => {
                  setSidebarTouchStart(e.touches[0].clientX);
                }}
                onTouchMove={(e) => {
                  if (!sidebarTouchStart) return;
                  
                  const currentX = e.touches[0].clientX;
                  const deltaX = currentX - sidebarTouchStart; // Positive = swiping right (closing)
                  
                  // Only allow dragging to the right (closing direction)
                  if (deltaX > 0) {
                    setSidebarDragX(deltaX);
                  }
                }}
                onTouchEnd={() => {
                  if (sidebarDragX > 100) {
                    // If dragged more than 100px, close the sidebar
                    closeSidebar();
                  } else {
                    // Reset drag position if not closed
                    setSidebarDragX(0);
                    setSidebarTouchStart(null);
                  }
                }}
              >
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <h3 className="font-sans text-sm font-semibold text-foreground uppercase tracking-wider">
                    Contents
                  </h3>
                  <button
                    onClick={closeSidebar}
                    className="p-1 hover:bg-background-secondary rounded transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5 text-foreground-muted" />
                  </button>
                </div>

                <nav className="flex-1 overflow-y-auto p-4">
                  <motion.ul
                    className="space-y-1"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      visible: {
                        transition: {
                          staggerChildren: 0.03,
                          delayChildren: 0.1,
                        },
                      },
                    }}
                  >
                    {headings.map((heading) => {
                      const isActive = activeId === heading.id;
                      const indentLevel = heading.level - 2;
                      const paddingValue = indentLevel;

                      return (
                        <motion.li
                          key={heading.id}
                          className={cn(
                            "toc-mobile-item",
                            isActive && "toc-mobile-active"
                          )}
                          style={{
                            paddingLeft: `${paddingValue}rem`,
                          }}
                          variants={{
                            hidden: { opacity: 0, x: -10 },
                            visible: {
                              opacity: 1,
                              x: 0,
                              transition: {
                                duration: 0.25,
                                ease: [0.4, 0, 0.2, 1],
                              },
                            },
                          }}
                        >
                          <motion.button
                            onClick={() => scrollToHeading(heading.id)}
                            className={cn(
                              "toc-mobile-link",
                              isActive && "toc-mobile-link-active"
                            )}
                            whileTap={{ scale: 0.98 }}
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 25,
                            }}
                          >
                            {heading.text}
                          </motion.button>
                        </motion.li>
                      );
                    })}
                  </motion.ul>
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

