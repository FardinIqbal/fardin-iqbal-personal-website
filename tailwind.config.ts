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
        // Vercel-inspired primary blue
        primary: {
          DEFAULT: "#3b82f6",
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          950: "#172554",
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
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "slide-up": "slideUp 0.5s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            color: "rgb(var(--color-foreground))",
            a: {
              color: "#3b82f6",
              "&:hover": {
                color: "#2563eb",
              },
            },
            "h1, h2, h3, h4": {
              color: "rgb(var(--color-foreground))",
              letterSpacing: "-0.02em",
            },
            code: {
              color: "rgb(var(--color-foreground))",
              backgroundColor: "rgb(var(--color-background-tertiary))",
              padding: "2px 6px",
              borderRadius: "4px",
            },
            blockquote: {
              borderLeftColor: "#3b82f6",
              color: "rgb(var(--color-foreground-muted))",
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
