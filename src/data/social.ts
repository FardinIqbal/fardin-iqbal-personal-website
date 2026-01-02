import type { SocialLink, NavItem } from "@/types";

export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/FardinIqbal",
    icon: "github",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/fardin-iqbal",
    icon: "linkedin",
  },
  {
    name: "Email",
    url: "mailto:fardin.iqbal1@gmail.com",
    icon: "mail",
  },
];

export const navItems: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Blog", href: "/blog" },
  { label: "Now", href: "/now" },
  { label: "Contact", href: "#contact" },
];
