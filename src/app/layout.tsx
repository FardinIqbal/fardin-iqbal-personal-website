import type { Metadata } from "next";
import {
  EB_Garamond,
  Lora,
  IBM_Plex_Sans,
  IBM_Plex_Mono,
} from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ClerkWrapper } from "@/components/ClerkWrapper";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

// Display font for headlines - scholarly, timeless
const garamond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-display",
  display: "swap",
});

// Body font for reading - exceptional readability
const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-body",
  display: "swap",
});

// UI font - technical credibility, professional
const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

// Monospace for code blocks
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fardiniqbal.github.io"),
  title: {
    default: "Fardin Iqbal | Software Engineer",
    template: "%s | Fardin Iqbal",
  },
  description:
    "Computer Science student at Stony Brook University. Full-stack developer passionate about building impactful technologies.",
  keywords: [
    "Fardin Iqbal",
    "Software Engineer",
    "Full Stack Developer",
    "React",
    "Next.js",
    "Ruby on Rails",
    "Python",
    "Stony Brook University",
    "Web Developer",
    "Portfolio",
  ],
  authors: [{ name: "Fardin Iqbal" }],
  creator: "Fardin Iqbal",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://fardiniqbal.github.io",
    siteName: "Fardin Iqbal",
    title: "Fardin Iqbal | Software Engineer",
    description:
      "Computer Science student at Stony Brook University. Full-stack developer passionate about building impactful technologies.",
    images: [
      {
        url: "/images/profile/profile-pic.png",
        width: 1200,
        height: 630,
        alt: "Fardin Iqbal - Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fardin Iqbal | Software Engineer",
    description: "Computer Science student at Stony Brook University.",
    images: ["/images/profile/profile-pic.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

// JSON-LD structured data for SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Fardin Iqbal",
  url: "https://fardin-portfolio-beryl.vercel.app",
  image: "https://fardin-portfolio-beryl.vercel.app/images/profile/profile-pic.png",
  jobTitle: "Software Engineer",
  description:
    "Computer Science student at Stony Brook University. Full-stack developer passionate about building impactful technologies.",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Stony Brook University",
  },
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "Python",
    "Ruby on Rails",
    "Full Stack Development",
  ],
  sameAs: [
    "https://github.com/FardinIqbal",
    "https://linkedin.com/in/fardiniqbal",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Prevent flash of wrong theme - dark is default */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme') || 'dark';
                  if (theme === 'light' || theme === 'dark') {
                    document.documentElement.classList.add(theme);
                  } else {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${garamond.variable} ${lora.variable} ${plexSans.variable} ${plexMono.variable} antialiased bg-background text-foreground`}
      >
        {/* Skip to main content link for accessibility */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-foreground focus:text-background focus:rounded-md focus:outline-none"
        >
          Skip to main content
        </a>
        <ClerkWrapper>
          <ThemeProvider defaultTheme="dark">
            {children}
          </ThemeProvider>
        </ClerkWrapper>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
