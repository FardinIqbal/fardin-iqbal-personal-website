"use client";

import { useEffect } from "react";

const ASCII_ART = `
%c
   ███████╗ █████╗ ██████╗ ██████╗ ██╗███╗   ██╗
   ██╔════╝██╔══██╗██╔══██╗██╔══██╗██║████╗  ██║
   █████╗  ███████║██████╔╝██║  ██║██║██╔██╗ ██║
   ██╔══╝  ██╔══██║██╔══██╗██║  ██║██║██║╚██╗██║
   ██║     ██║  ██║██║  ██║██████╔╝██║██║ ╚████║
   ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ ╚═╝╚═╝  ╚═══╝

`;

const WELCOME_MESSAGE = `
%cWelcome to my portfolio! 👋

%cI see you like to peek under the hood. Here are some commands you can try:

%cfardin.contact()%c  → Send me an email
%cfardin.resume()%c   → Download my resume
%cfardin.github()%c   → View my GitHub
%cfardin.secret()%c   → ???

%cPress %c⌘K%c to open the command palette.
`;

export function ConsoleEasterEgg() {
  useEffect(() => {
    // Print ASCII art
    console.log(
      ASCII_ART,
      "color: #6366f1; font-family: monospace; font-size: 10px; line-height: 1.2;"
    );

    // Print welcome message
    console.log(
      WELCOME_MESSAGE,
      "color: #a1a1aa; font-size: 14px; font-weight: bold;",
      "color: #a1a1aa; font-size: 12px;",
      "color: #22c55e; font-family: monospace;",
      "color: #a1a1aa;",
      "color: #22c55e; font-family: monospace;",
      "color: #a1a1aa;",
      "color: #22c55e; font-family: monospace;",
      "color: #a1a1aa;",
      "color: #22c55e; font-family: monospace;",
      "color: #a1a1aa;",
      "color: #a1a1aa; font-size: 12px;",
      "color: #6366f1; font-weight: bold; background: #1e1e2e; padding: 2px 6px; border-radius: 4px;",
      "color: #a1a1aa; font-size: 12px;"
    );

    // Add global fardin object with methods
    const fardinAPI = {
      contact: () => {
        console.log("%c📧 Opening email client...", "color: #22c55e; font-size: 14px;");
        window.location.href = "mailto:fardin.iqbal@stonybrook.edu";
        return "Email sent! (Well, email client opened)";
      },
      resume: () => {
        console.log("%c📄 Downloading resume...", "color: #22c55e; font-size: 14px;");
        window.open("/resume.pdf", "_blank");
        return "Resume downloaded!";
      },
      github: () => {
        console.log("%c🐙 Opening GitHub...", "color: #22c55e; font-size: 14px;");
        window.open("https://github.com/FardinIqbal", "_blank");
        return "Welcome to my code!";
      },
      linkedin: () => {
        console.log("%c💼 Opening LinkedIn...", "color: #22c55e; font-size: 14px;");
        window.open("https://linkedin.com/in/fardiniqbal", "_blank");
        return "Let's connect!";
      },
      secret: () => {
        console.log(
          "%c🎉 You found the secret!",
          "color: #f472b6; font-size: 16px; font-weight: bold;"
        );
        console.log(
          "%c\nTry the Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A\n",
          "color: #a1a1aa; font-style: italic;"
        );
        window.dispatchEvent(new CustomEvent("trigger-matrix"));
        return "✨ Something magical happened...";
      },
      help: () => {
        console.log(
          `%c
Available commands:
  fardin.contact()  - Send me an email
  fardin.resume()   - Download my resume
  fardin.github()   - View my GitHub
  fardin.linkedin() - Connect on LinkedIn
  fardin.secret()   - Discover a secret
  fardin.skills     - List my skills
  fardin.projects   - List my projects
  fardin.quote()    - Random quote
          `,
          "color: #a1a1aa; font-family: monospace;"
        );
        return "Type any command to execute it!";
      },
      skills: [
        "TypeScript",
        "React",
        "Next.js",
        "Node.js",
        "C",
        "Python",
        "Ruby on Rails",
        "PostgreSQL",
        "Systems Programming",
        "AI/ML",
      ],
      projects: [
        "Prometheus AI",
        "VerseCraft",
        "LocalElo",
        "Dynamic Memory Allocator",
      ],
      quote: () => {
        const quotes = [
          "The only way to do great work is to love what you do. - Steve Jobs",
          "First, solve the problem. Then, write the code. - John Johnson",
          "Any fool can write code that a computer can understand. Good programmers write code that humans can understand. - Martin Fowler",
          "The best time to plant a tree was 20 years ago. The second best time is now. - Chinese Proverb",
          "Simplicity is the soul of efficiency. - Austin Freeman",
        ];
        const quote = quotes[Math.floor(Math.random() * quotes.length)];
        console.log(`%c"${quote}"`, "color: #a1a1aa; font-style: italic; font-size: 14px;");
        return quote;
      },
    };

    // @ts-expect-error - Adding to window object
    window.fardin = fardinAPI;

    // Clean up
    return () => {
      // @ts-expect-error - Removing from window object
      delete window.fardin;
    };
  }, []);

  return null;
}
