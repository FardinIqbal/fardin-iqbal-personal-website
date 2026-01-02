"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Lock, ArrowLeft, Key } from "lucide-react";

function ClerkNotConfigured() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 -left-64 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-[150px]"
          animate={{ y: [0, 50, 0], x: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-64 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[150px]"
          animate={{ y: [0, -50, 0], x: [0, -30, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative bg-background-secondary border border-white/10 rounded-2xl p-8 max-w-md text-center"
      >
        <motion.div
          className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <Key className="w-8 h-8 text-white" />
        </motion.div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Authentication Setup Required</h1>
        <p className="text-foreground-muted mb-6">
          To enable authentication, configure Clerk by adding your API keys to the environment variables.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-xl transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Return Home
        </Link>
      </motion.div>
    </div>
  );
}

export default function SignInPage() {
  const [SignIn, setSignIn] = useState<React.ComponentType<any> | null>(null);
  const [isConfigured, setIsConfigured] = useState<boolean | null>(null);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
      import("@clerk/nextjs").then(({ SignIn }) => {
        setSignIn(() => SignIn);
        setIsConfigured(true);
      });
    } else {
      setIsConfigured(false);
    }
  }, []);

  // Show loading state while checking
  if (isConfigured === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  if (!isConfigured || !SignIn) {
    return <ClerkNotConfigured />;
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 -left-64 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-[150px]"
          animate={{ y: [0, 50, 0], x: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-64 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[150px]"
          animate={{ y: [0, -50, 0], x: [0, -30, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <SignIn
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "bg-background-secondary border border-white/10 shadow-2xl",
              headerTitle: "text-foreground",
              headerSubtitle: "text-foreground-muted",
              formFieldLabel: "text-foreground-muted",
              formFieldInput: "bg-background border-white/10 text-foreground",
              formButtonPrimary: "bg-primary-500 hover:bg-primary-600",
              footerActionLink: "text-primary-400 hover:text-primary-300",
              identityPreviewText: "text-foreground",
              identityPreviewEditButton: "text-primary-400",
            },
          }}
        />
      </motion.div>
    </div>
  );
}
