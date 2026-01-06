"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Send, Loader2, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";
import type { Profile } from "@/lib/content";

interface ContactProps {
  profile: Profile;
}

type FormStatus = "idle" | "loading" | "success" | "error";

export function Contact({ profile }: ContactProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong"
      );
    }
  };

  const socialLinks = [
    { icon: Github, href: profile.social.github, label: "GitHub" },
    { icon: Linkedin, href: profile.social.linkedin, label: "LinkedIn" },
    { icon: Mail, href: `mailto:${profile.email}`, label: "Email" },
  ];

  return (
    <section id="contact" className="editorial-section bg-background">
      <div className="editorial-container">
        {/* Section Header - editorial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] }}
          className="text-center mb-16"
        >
          <div className="chapter-marker mb-6">Contact</div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-foreground mb-6 tracking-tight leading-[1.15]">
            Get In Touch
          </h2>
          <p className="text-foreground-muted text-lg md:text-xl max-w-2xl mx-auto leading-[1.75] font-serif">
            I&apos;m currently looking for new opportunities. Whether you have a
            question or just want to say hi, I&apos;ll do my best to get back to you!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-5 py-4 rounded-lg bg-background border border-border/50 text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-accent/60 transition-colors duration-300 font-serif"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-5 py-4 rounded-lg bg-background border border-border/50 text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-accent/60 transition-colors duration-300 font-serif"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-5 py-4 rounded-lg bg-background border border-border/50 text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-accent/60 transition-colors resize-none duration-300 font-serif"
                  placeholder="Your message..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={status === "loading"}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full px-6 py-4 rounded-lg bg-accent text-white font-medium hover:bg-accent/90 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-inter"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : status === "success" ? (
                  <>
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <CheckCircle className="w-4 h-4" />
                    </motion.span>
                    Message Sent!
                  </>
                ) : status === "error" ? (
                  <>
                    <XCircle className="w-4 h-4" />
                    Try Again
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </motion.button>

              {status === "error" && errorMessage && (
                <p className="text-sm text-red-500">{errorMessage}</p>
              )}
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <div className="space-y-6">
              {/* Email - with hover animation */}
              <motion.div
                className="p-6 rounded-lg bg-background border border-border/50 hover:border-foreground-subtle/60 transition-colors duration-500"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                whileHover={{ y: -2 }}
              >
                <h3 className="text-base font-semibold text-foreground mb-2">
                  Prefer email?
                </h3>
                <p className="text-foreground-muted text-sm mb-3">
                  Feel free to reach out directly at:
                </p>
                <motion.a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 text-foreground hover:text-accent transition-colors"
                  whileHover={{ x: 2 }}
                >
                  <Mail className="w-4 h-4" />
                  {profile.email}
                </motion.a>
              </motion.div>

              {/* Social links - staggered animation */}
              <div>
                <h3 className="text-base font-semibold text-foreground mb-4">
                  Connect with me
                </h3>
                <div className="flex items-center gap-3">
                  {socialLinks.map(({ icon: Icon, href, label }, index) => (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="p-3 rounded-lg border border-border text-foreground-muted hover:text-foreground hover:bg-background-tertiary transition-all block"
                        aria-label={label}
                      >
                        <Icon className="w-5 h-5" />
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Availability - with animation */}
              <motion.div
                className="flex items-center gap-3 p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 }}
                whileHover={{ scale: 1.02 }}
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                  Available for opportunities
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
