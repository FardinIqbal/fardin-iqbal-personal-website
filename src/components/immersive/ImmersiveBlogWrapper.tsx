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
}: ImmersiveBlogWrapperProps) {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      </main>
      <Footer />
    </>
  );
}

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
