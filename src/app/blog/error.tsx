"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { FileText, RefreshCw, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function BlogError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Blog error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary-500/10 flex items-center justify-center"
        >
          <FileText className="w-8 h-8 text-primary-500" />
        </motion.div>

        <h1 className="text-2xl font-display font-semibold text-foreground mb-3">
          Couldn&apos;t load this article
        </h1>

        <p className="text-foreground-muted mb-8">
          There was an issue loading the blog content. This might be a temporary
          problem.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <motion.button
            onClick={reset}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-foreground text-background font-medium hover:opacity-90 transition-opacity"
          >
            <RefreshCw className="w-4 h-4" />
            Try again
          </motion.button>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-foreground-muted hover:text-foreground hover:border-foreground-subtle transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to blog
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
