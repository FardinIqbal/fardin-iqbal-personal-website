import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ClerkWrapper } from "@/components/ClerkWrapper";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
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
                  var theme = localStorage.getItem('theme') || 'dark';
                  if (theme === 'system') {
                    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  }
                  document.documentElement.classList.add(theme);
                } catch (e) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-background text-foreground`}
      >
        <ClerkWrapper>
          <ThemeProvider defaultTheme="dark">
            {children}
          </ThemeProvider>
        </ClerkWrapper>
      </body>
    </html>
  );
}
