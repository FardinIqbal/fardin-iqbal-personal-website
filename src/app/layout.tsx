import type { Metadata } from "next";
import {
  Playfair_Display,
  Source_Serif_4,
  Source_Sans_3,
  Inter,
  JetBrains_Mono,
} from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ClerkWrapper } from "@/components/ClerkWrapper";
import { MusicPlayer } from "@/components/MusicPlayer";
import { PortfolioEnhancements } from "@/components/ui/PortfolioEnhancements";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

// Elegant display serif for headings
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

// Readable serif for body text
const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  display: "swap",
});

// Clean sans for UI elements
const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
});

// Inter for New Yorker-style UI elements
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Monospace for code
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
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
        {/* Prevent flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme') || 'light';
                  if (theme === 'light' || theme === 'dark' || theme === 'sepia') {
                    document.documentElement.classList.add(theme);
                  } else {
                    document.documentElement.classList.add('light');
                  }
                } catch (e) {
                  document.documentElement.classList.add('light');
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${playfair.variable} ${sourceSerif.variable} ${sourceSans.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground`}
      >
        {/* Skip to main content link for accessibility */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-foreground focus:text-background focus:rounded-md focus:outline-none"
        >
          Skip to main content
        </a>
        <ClerkWrapper>
          <ThemeProvider defaultTheme="light">
            {children}
            <MusicPlayer />
            <PortfolioEnhancements />
          </ThemeProvider>
        </ClerkWrapper>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
