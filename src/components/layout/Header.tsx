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
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
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
    const isEssayPage = pathname.startsWith("/essays");
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show navbar at the top
      if (currentScrollY < 50) {
        setIsVisible(true);
        setIsScrolled(false);
      } else {
        setIsScrolled(true);
        
        // Only auto-hide on essay pages
        if (isEssayPage) {
          const scrollThreshold = 100;
          // Hide when scrolling down, show when scrolling up
          if (currentScrollY > lastScrollY && currentScrollY > scrollThreshold) {
            setIsVisible(false);
          } else if (currentScrollY < lastScrollY) {
            setIsVisible(true);
          }
        } else {
          // Always visible on non-essay pages
          setIsVisible(true);
        }
      }

      setLastScrollY(currentScrollY);

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
  }, [lastScrollY, pathname]);

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

  // Reset visibility when navigating away from essay pages
  useEffect(() => {
    const isEssayPage = pathname.startsWith("/essays");
    if (!isEssayPage) {
      setIsVisible(true);
    }
  }, [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ 
          y: isVisible ? 0 : -100 
        }}
        transition={{ 
          duration: 0.3, 
          ease: [0.4, 0, 0.2, 1] 
        }}
        className={cn(
          "fixed top-0 left-0 right-0 z-40",
          isScrolled
            ? "bg-background/95 backdrop-blur-xl border-b border-border/30"
            : "bg-transparent"
        )}
      >
        <nav className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo - Elegant serif with accent red */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="/"
                onClick={handleLogoClick}
                className="text-xl font-serif font-normal tracking-tight whitespace-nowrap relative group"
              >
                <span className="relative inline-block">
                  <span className="relative z-10 text-foreground group-hover:text-[rgb(var(--accent-red))] transition-colors duration-300">
                    Fardin
                  </span>
                  <motion.span
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[rgb(var(--accent-red))] origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                </span>
                <span className="ml-1.5 text-foreground-muted group-hover:text-foreground transition-colors duration-300">
                  Iqbal
                </span>
              </Link>
            </motion.div>

            {/* Desktop Navigation - Elegant and refined */}
            <div className="hidden md:flex items-center gap-10">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.replace("/#", "") || pathname === item.href;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      "text-sm font-inter font-normal transition-all duration-300 relative py-2.5 px-2 group",
                      isActive
                        ? "text-foreground"
                        : "text-foreground-muted hover:text-foreground"
                    )}
                  >
                    <span className="relative z-10">{item.label}</span>
                    {isActive && (
                      <motion.span
                        layoutId="activeIndicator"
                        className="absolute bottom-1.5 left-2 right-2 h-px bg-[rgb(var(--accent-red))]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    {!isActive && (
                      <span className="absolute bottom-1.5 left-2 right-2 h-px bg-[rgb(var(--accent-red))] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
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
                className="p-2.5 text-foreground hover:text-foreground-muted transition-colors duration-300 rounded-md hover:bg-background-tertiary/50"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-accent" />
                ) : (
                  <Menu className="w-5 h-5 text-accent" />
                )}
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

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
              className="absolute right-0 top-0 bottom-0 w-72 bg-background/98 backdrop-blur-xl border-l border-border/30 p-8 pt-24 shadow-2xl"
            >
              <div className="flex flex-col gap-0.5">
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
                        "py-3.5 px-2 font-inter text-base text-foreground-muted hover:text-foreground transition-all duration-300 rounded-md hover:bg-background-tertiary/50 relative group",
                        isActive && "text-foreground"
                      )}
                    >
                      {item.label}
                      {isActive && (
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-[rgb(var(--accent-red))] rounded-r" />
                      )}
                    </Link>
                  );
                })}

                <div className="pt-6 mt-4 border-t border-border/30">
                  <Link
                    href="/resume/Fardin_Iqbal_Resume.pdf"
                    target="_blank"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-inter font-normal border border-border/40 hover:border-[rgb(var(--accent-red))]/50 hover:bg-background-tertiary/50 transition-all duration-300 rounded-md w-full"
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
