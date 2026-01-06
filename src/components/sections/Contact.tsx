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
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="chapter-marker mb-6">Contact</div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-foreground mb-6 tracking-tight leading-[1.15] relative inline-block">
            Get In Touch
            {/* Accent red line above title - matching navbar style */}
            <span 
              className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-px block bg-[rgb(var(--accent-red))]"
            />
          </h2>
          <p className="text-foreground-muted text-lg md:text-xl max-w-2xl mx-auto leading-[1.75] font-serif">
            I&apos;m currently looking for new opportunities. Whether you have a
            question or just want to say hi, I&apos;ll do my best to get back to you!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
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
                className="w-full px-6 py-4 rounded-lg bg-accent text-white font-medium hover:bg-accent/90 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-inter"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    Sending...
                  </>
                ) : status === "success" ? (
                  <>
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <CheckCircle className="w-4 h-4 text-white" />
                    </motion.span>
                    Message Sent!
                  </>
                ) : status === "error" ? (
                  <>
                    <XCircle className="w-4 h-4 text-white" />
                    Try Again
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-white" />
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
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col justify-center"
          >
            <div className="space-y-6">
              {/* Email */}
              <div className="p-6 rounded-lg bg-background border border-border/50 hover:border-foreground-subtle/60 transition-colors duration-300">
                <h3 className="text-base font-semibold text-foreground mb-2">
                  Prefer email?
                </h3>
                <p className="text-foreground-muted text-sm mb-3">
                  Feel free to reach out directly at:
                </p>
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 text-foreground hover:text-accent transition-colors"
                >
                  <Mail className="w-4 h-4 text-accent" />
                  {profile.email}
                </a>
              </div>

              {/* Social links - staggered animation */}
              <div>
                <h3 className="text-base font-semibold text-foreground mb-4">
                  Connect with me
                </h3>
                <div className="flex items-center gap-3">
                  {socialLinks.map(({ icon: Icon, href, label }) => (
                    <Link
                      key={label}
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="p-3 rounded-lg border border-border text-foreground-muted hover:text-foreground hover:bg-background-tertiary transition-colors block"
                      aria-label={label}
                    >
                      <Icon className="w-5 h-5 text-accent" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div className="flex items-center gap-3 p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                  Available for opportunities
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
