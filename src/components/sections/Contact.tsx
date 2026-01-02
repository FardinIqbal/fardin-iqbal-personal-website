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
    <section id="contact" className="py-24 bg-background-secondary">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - clean */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Get In Touch
          </h2>
          <p className="text-foreground-muted text-lg max-w-xl mx-auto">
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
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-foreground-subtle transition-colors"
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
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-foreground-subtle transition-colors"
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
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-foreground-subtle transition-colors resize-none"
                  placeholder="Your message..."
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full px-6 py-3 rounded-lg bg-foreground text-background font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : status === "success" ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
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
              </button>

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
              {/* Email */}
              <div className="p-5 rounded-xl bg-background border border-border">
                <h3 className="text-base font-semibold text-foreground mb-2">
                  Prefer email?
                </h3>
                <p className="text-foreground-muted text-sm mb-3">
                  Feel free to reach out directly at:
                </p>
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 text-foreground hover:text-primary-500 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  {profile.email}
                </a>
              </div>

              {/* Social links */}
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
                      className="p-3 rounded-lg border border-border text-foreground-muted hover:text-foreground hover:bg-background-tertiary transition-all"
                      aria-label={label}
                    >
                      <Icon className="w-5 h-5" />
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
