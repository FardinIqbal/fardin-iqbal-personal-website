"use client";

import { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Eye, EyeOff, TreeDeciduous, Loader2 } from "lucide-react";

interface PasswordGateProps {
  children: React.ReactNode;
}

// Simple hash for client-side verification (not cryptographically secure, but sufficient for privacy)
const VALID_HASH = "a]k#9Xm$2pL@vR7n";

function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  // Convert to base36 and add some obfuscation
  const base = Math.abs(hash).toString(36);
  return base.split('').map((c, i) =>
    String.fromCharCode(c.charCodeAt(0) + (i % 3))
  ).join('');
}

// Pre-computed hash of the correct password
const CORRECT_HASH = "ar49tg";

export function PasswordGate({ children }: PasswordGateProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);

  // Check if already authenticated on mount (via sessionStorage)
  useEffect(() => {
    const stored = sessionStorage.getItem("arboretum_auth");
    setIsAuthenticated(stored === VALID_HASH);
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Small delay to feel more real
    await new Promise(resolve => setTimeout(resolve, 500));

    const inputHash = simpleHash(password);

    if (inputHash === CORRECT_HASH) {
      sessionStorage.setItem("arboretum_auth", VALID_HASH);
      setIsUnlocking(true);
      // Dramatic unlock animation
      setTimeout(() => {
        setIsAuthenticated(true);
      }, 2000);
    } else {
      setError("Invalid password");
      setPassword("");
    }

    setIsLoading(false);
  };

  // Loading state
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <TreeDeciduous className="w-12 h-12 text-emerald-500/50" />
        </motion.div>
      </div>
    );
  }

  // Authenticated - show content
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // Password gate
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0">
        {/* Starfield */}
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Ground glow */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-emerald-900/20 to-transparent" />

        {/* Tree silhouette */}
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 2 }}
        >
          <svg
            width="600"
            height="500"
            viewBox="0 0 600 500"
            className="text-emerald-500"
          >
            {/* Trunk */}
            <path
              d="M280 500 L280 300 Q270 250 260 200 Q250 150 270 100 Q290 50 300 50 Q310 50 330 100 Q350 150 340 200 Q330 250 320 300 L320 500"
              fill="currentColor"
              opacity="0.3"
            />
            {/* Branches */}
            <path
              d="M260 200 Q200 180 150 200 M260 180 Q180 150 120 180 M340 200 Q400 180 450 200 M340 180 Q420 150 480 180"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              opacity="0.2"
            />
            {/* Roots */}
            <path
              d="M280 500 Q200 520 100 500 M320 500 Q400 520 500 500 M290 500 Q280 550 250 580 M310 500 Q320 550 350 580"
              stroke="currentColor"
              strokeWidth="6"
              fill="none"
              opacity="0.2"
            />
          </svg>
        </motion.div>
      </div>

      {/* Unlock animation overlay */}
      <AnimatePresence>
        {isUnlocking && (
          <motion.div
            className="absolute inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative"
              animate={{
                scale: [1, 1.2, 50],
                opacity: [1, 1, 0],
              }}
              transition={{ duration: 2, ease: "easeInOut" }}
            >
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 blur-xl" />
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, ease: "linear" }}
              >
                <TreeDeciduous className="w-16 h-16 text-white" />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gate content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6"
            animate={{
              boxShadow: [
                "0 0 20px rgba(16, 185, 129, 0.1)",
                "0 0 40px rgba(16, 185, 129, 0.2)",
                "0 0 20px rgba(16, 185, 129, 0.1)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <TreeDeciduous className="w-10 h-10 text-emerald-500" />
          </motion.div>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            The Arboretum of the Soul
          </h1>
          <p className="text-foreground-muted max-w-md mx-auto">
            A living visualization of insights, patterns, and the architecture of self.
            This space is private.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-sm"
        >
          <div className="relative mb-4">
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <Lock className="w-5 h-5 text-foreground-subtle" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full pl-12 pr-12 py-4 bg-background-secondary border border-border rounded-xl text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
              disabled={isLoading || isUnlocking}
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground-subtle hover:text-foreground transition-colors"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>

          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-red-400 text-sm text-center mb-4"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <motion.button
            type="submit"
            disabled={isLoading || isUnlocking || !password}
            className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-600/50 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Verifying...
              </>
            ) : isUnlocking ? (
              <>
                <TreeDeciduous className="w-5 h-5" />
                Entering the garden...
              </>
            ) : (
              <>
                <Lock className="w-5 h-5" />
                Enter the Arboretum
              </>
            )}
          </motion.button>
        </motion.form>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 text-foreground-subtle text-sm text-center"
        >
          These insights are synthesized from journal entries and patterns observed over time.
        </motion.p>
      </div>
    </div>
  );
}
