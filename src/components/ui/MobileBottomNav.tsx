"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Briefcase, FolderOpen, BookOpen, Mail, Command } from "lucide-react";
import { cn } from "@/lib/utils";
import { haptic } from "@/lib/haptics";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  isSection?: boolean;
}

const navItems: NavItem[] = [
  { icon: <Home className="w-5 h-5" />, label: "Home", href: "/", isSection: false },
  { icon: <Briefcase className="w-5 h-5" />, label: "Experience", href: "#experience", isSection: true },
  { icon: <FolderOpen className="w-5 h-5" />, label: "Projects", href: "#projects", isSection: true },
  { icon: <BookOpen className="w-5 h-5" />, label: "Blog", href: "/blog", isSection: false },
  { icon: <Mail className="w-5 h-5" />, label: "Contact", href: "#contact", isSection: true },
];

export function MobileBottomNav() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  // Show on home page and all blog pages (including /blog/[slug])
  const isHomePage = pathname === "/";
  const isBlogPage = pathname.startsWith("/blog");
  const showNav = isHomePage || isBlogPage;

  useEffect(() => {
    if (!showNav) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);

      // Only detect active section on home page
      if (isHomePage) {
        const sections = ["experience", "projects", "contact", "about", "skills"];
        let foundSection = "";
        for (const section of sections.reverse()) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 200) {
              foundSection = section;
              break;
            }
          }
        }
        setActiveSection(foundSection);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, showNav, isHomePage]);

  const handleNavClick = (item: NavItem) => {
    haptic("selection");

    if (item.isSection) {
      const sectionId = item.href.replace("#", "");

      if (isHomePage) {
        // On home page, scroll to section
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        // On other pages, navigate to home page with hash
        router.push(`/${item.href}`);
      }
    } else if (item.href === "/") {
      if (isHomePage) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        router.push("/");
      }
    } else {
      // Non-section links like /blog
      router.push(item.href);
    }
  };

  const openCommandPalette = () => {
    haptic("medium");
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }));
  };

  if (!showNav) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-40 md:hidden"
        >
          {/* Glass background */}
          <div className="mx-3 mb-3 rounded-2xl bg-background/90 backdrop-blur-xl border border-border shadow-2xl">
            <div className="flex items-center justify-around px-2 py-2">
              {navItems.map((item) => {
                const isActive =
                  (item.href === "/" && isHomePage && !activeSection) ||
                  (item.href === "/blog" && isBlogPage) ||
                  (item.isSection === true && activeSection === item.href.replace("#", ""));

                return (
                  <NavButton
                    key={item.label}
                    item={item}
                    isActive={isActive}
                    onClick={() => handleNavClick(item)}
                  />
                );
              })}

              {/* Command Palette Button */}
              <button
                onClick={openCommandPalette}
                className="flex flex-col items-center justify-center w-14 h-14 rounded-xl text-foreground-subtle active:scale-95 transition-transform"
              >
                <Command className="w-5 h-5" />
                <span className="text-[10px] mt-1 font-medium">Search</span>
              </button>
            </div>
          </div>

          {/* Safe area padding for notched phones */}
          <div className="h-safe-area-inset-bottom bg-background/90" />
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

interface NavButtonProps {
  item: NavItem;
  isActive: boolean;
  onClick: () => void;
}

function NavButton({ item, isActive, onClick }: NavButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = () => {
    setIsPressed(true);
    onClick();
    setTimeout(() => setIsPressed(false), 150);
  };

  return (
    <button
      onClick={handlePress}
      className={cn(
        "relative flex flex-col items-center justify-center w-14 h-14 rounded-xl transition-all",
        isActive
          ? "text-foreground bg-foreground/5"
          : "text-foreground-subtle active:scale-95"
      )}
    >
      <motion.div
        animate={{ scale: isPressed ? 0.85 : 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        {item.icon}
      </motion.div>
      <span className={cn(
        "text-[10px] mt-1 font-medium",
        isActive && "text-foreground"
      )}>
        {item.label}
      </span>
      {isActive && (
        <motion.div
          layoutId="activeTab"
          className="absolute -bottom-1 w-1 h-1 rounded-full bg-foreground"
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
    </button>
  );
}
