"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

interface ImmersiveBlogWrapperProps {
  children: ReactNode;
  content: string;
  tags?: string[];
  overrideMood?: string;
  title: string;
  description?: string;
}

export function ImmersiveBlogWrapper({
  children,
  title,
  description,
}: ImmersiveBlogWrapperProps) {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-24 pb-20">
        {/* Hero section */}
        <header className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight"
          >
            {title}
          </motion.h1>

          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-foreground-muted max-w-2xl mx-auto leading-relaxed"
            >
              {description}
            </motion.p>
          )}
        </header>

        {/* Content */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="prose prose-lg max-w-none dark:prose-invert
            prose-headings:font-bold prose-headings:tracking-tight
            prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:border-l-4 prose-h2:border-primary-500 prose-h2:pl-4
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-foreground-muted prose-p:leading-relaxed
            prose-a:text-primary-500 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-foreground prose-strong:font-semibold
            prose-blockquote:border-l-4 prose-blockquote:border-primary-500 prose-blockquote:bg-background-secondary prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic
            prose-code:bg-background-tertiary prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-normal prose-code:before:content-none prose-code:after:content-none
            prose-pre:bg-background-secondary prose-pre:border prose-pre:border-border prose-pre:rounded-xl
            prose-img:rounded-xl prose-img:shadow-lg
            prose-hr:border-border
            prose-li:text-foreground-muted
          ">
            {children}
          </div>
        </motion.article>
      </main>
      <Footer />
    </>
  );
}

// Export placeholder components for backward compatibility
export function GlowText({ children }: { children: ReactNode }) {
  return <span className="text-primary-500 font-semibold">{children}</span>;
}

export function PullQuote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="text-xl italic text-foreground-muted border-l-4 border-primary-500 pl-6 my-8">
      {children}
    </blockquote>
  );
}

export function ScrollReveal({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function SectionDivider() {
  return <hr className="my-12 border-border" />;
}
