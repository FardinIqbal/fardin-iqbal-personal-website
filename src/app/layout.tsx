import type { Metadata } from "next";
import {
  Playfair_Display,
  Source_Serif_4,
  Source_Sans_3,
  JetBrains_Mono,
} from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ClerkWrapper } from "@/components/ClerkWrapper";
import { MusicPlayer } from "@/components/MusicPlayer";
import { PortfolioEnhancements } from "@/components/ui/PortfolioEnhancements";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Prevent flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme') || 'light';
                  document.documentElement.classList.add(theme);
                } catch (e) {
                  document.documentElement.classList.add('light');
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${playfair.variable} ${sourceSerif.variable} ${sourceSans.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground`}
      >
        <ClerkWrapper>
          <ThemeProvider defaultTheme="light">
            {children}
            <MusicPlayer />
            <PortfolioEnhancements />
          </ThemeProvider>
        </ClerkWrapper>
      </body>
    </html>
  );
}
