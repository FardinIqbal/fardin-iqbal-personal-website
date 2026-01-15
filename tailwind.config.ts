import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/content/**/*.{md,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "rgb(var(--bg-primary))",
          secondary: "rgb(var(--bg-secondary))",
          elevated: "rgb(var(--bg-elevated))",
          hover: "rgb(var(--bg-hover))",
        },
        foreground: {
          DEFAULT: "rgb(var(--text-primary))",
          secondary: "rgb(var(--text-secondary))",
          muted: "rgb(var(--text-muted))",
        },
        accent: {
          DEFAULT: "rgb(var(--accent))",
          hover: "rgb(var(--accent-hover))",
        },
        border: {
          DEFAULT: "rgb(var(--border))",
          hover: "rgb(var(--border-hover))",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "Charter", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      fontSize: {
        "hero": ["4.5rem", { lineHeight: "1.0", fontWeight: "500" }],
        "page-title": ["3rem", { lineHeight: "1.1", fontWeight: "500" }],
        "section": ["2.25rem", { lineHeight: "1.2", fontWeight: "500" }],
        "card-title": ["1.5rem", { lineHeight: "1.3", fontWeight: "500" }],
        "body": ["1.125rem", { lineHeight: "1.7", fontWeight: "400" }],
        "small": ["0.875rem", { lineHeight: "1.5", fontWeight: "400" }],
        "tiny": ["0.75rem", { lineHeight: "1.4", fontWeight: "500" }],
      },
      maxWidth: {
        prose: "68ch",
        content: "48rem",
        wide: "64rem",
        full: "80rem",
      },
      spacing: {
        section: "8rem",
        "section-sm": "6rem",
        block: "3rem",
        element: "1.5rem",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-out forwards",
        "slide-up": "slideUp 0.3s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            color: "rgb(var(--text-secondary))",
            fontFamily: "var(--font-body), Charter, Georgia, serif",
            fontSize: "1.125rem",
            lineHeight: "1.7",
            maxWidth: "68ch",
            a: {
              color: "rgb(var(--accent))",
              textDecoration: "none",
              fontWeight: "500",
              "&:hover": {
                textDecoration: "underline",
              },
            },
            "h1, h2, h3, h4": {
              fontFamily: "var(--font-display), Georgia, serif",
              color: "rgb(var(--text-primary))",
              letterSpacing: "-0.02em",
              fontWeight: "500",
            },
            h2: {
              fontSize: "2rem",
              marginTop: "2.5rem",
              marginBottom: "1rem",
            },
            h3: {
              fontSize: "1.35rem",
              marginTop: "2rem",
              marginBottom: "0.75rem",
            },
            code: {
              color: "rgb(var(--text-primary))",
              backgroundColor: "rgb(var(--code-bg))",
              padding: "0.2em 0.4em",
              borderRadius: "0.25rem",
              fontWeight: "400",
            },
            "code::before": { content: "none" },
            "code::after": { content: "none" },
            blockquote: {
              borderLeftColor: "rgb(var(--accent))",
              borderLeftWidth: "3px",
              color: "rgb(var(--text-secondary))",
              fontStyle: "italic",
              paddingLeft: "1.5rem",
            },
            strong: {
              color: "rgb(var(--text-primary))",
              fontWeight: "600",
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
