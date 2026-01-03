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
        // Editorial deep blue
        primary: {
          DEFAULT: "#1e3a8a",
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#1e3a8a",
          600: "#1a3278",
          700: "#162a64",
          800: "#122250",
          900: "#0e1a3c",
          950: "#0a1228",
        },
        // Clean grayscale backgrounds
        background: {
          DEFAULT: "rgb(var(--color-background))",
          secondary: "rgb(var(--color-background-secondary))",
          tertiary: "rgb(var(--color-background-tertiary))",
        },
        foreground: {
          DEFAULT: "rgb(var(--color-foreground))",
          muted: "rgb(var(--color-foreground-muted))",
          subtle: "rgb(var(--color-foreground-subtle))",
        },
        border: {
          DEFAULT: "rgb(var(--color-border))",
          subtle: "rgb(var(--color-border-subtle))",
        },
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        serif: ["var(--font-source-serif)", "Georgia", "serif"],
        sans: ["var(--font-source-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      fontSize: {
        // NY Times-inspired type scale
        "body": ["1.0625rem", { lineHeight: "1.7" }],
        "body-lg": ["1.1875rem", { lineHeight: "1.85" }],
      },
      maxWidth: {
        measure: "68ch",
        "measure-narrow": "55ch",
        "measure-wide": "75ch",
        content: "720px",
        container: "1200px",
      },
      spacing: {
        section: "8rem",
        "section-sm": "5rem",
        block: "3rem",
        element: "1.5rem",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            color: "rgb(var(--color-foreground))",
            fontFamily: "var(--font-source-serif), Georgia, serif",
            fontSize: "1.0625rem",
            lineHeight: "1.7",
            a: {
              color: "#1e3a8a",
              textDecoration: "none",
              borderBottom: "1px solid transparent",
              transition: "border-color 0.25s ease",
              "&:hover": {
                borderBottomColor: "#1e3a8a",
              },
            },
            "h1, h2, h3, h4": {
              fontFamily: "var(--font-playfair), Georgia, serif",
              color: "rgb(var(--color-foreground))",
              letterSpacing: "-0.015em",
              fontWeight: "600",
            },
            code: {
              color: "rgb(var(--color-foreground))",
              backgroundColor: "rgb(var(--color-background-tertiary))",
              padding: "2px 6px",
              borderRadius: "4px",
            },
            blockquote: {
              borderLeftColor: "rgb(var(--color-border))",
              color: "rgb(var(--color-foreground-muted))",
              fontStyle: "italic",
              paddingLeft: "2rem",
              background: "transparent",
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
