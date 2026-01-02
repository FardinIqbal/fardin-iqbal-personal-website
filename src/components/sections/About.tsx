"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { GraduationCap, MapPin, Code2, Lightbulb } from "lucide-react";
import type { Profile } from "@/lib/content";

interface AboutProps {
  profile: Profile;
}

export function About({ profile }: AboutProps) {
  return (
    <section id="about" data-section="about" className="py-24 bg-background-secondary/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            About Me
          </h2>
          <p className="text-foreground-muted text-lg">
            Get to know me a little better
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-sm mx-auto lg:mx-0">
              <div className="relative rounded-xl overflow-hidden bg-background-tertiary border border-border">
                <Image
                  src="/images/profile/profile-pic.png"
                  alt={profile.name}
                  width={400}
                  height={400}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="space-y-5">
              {profile.bio.map((paragraph, index) => (
                <p key={index} className="text-foreground-muted leading-relaxed">
                  {paragraph}
                </p>
              ))}

              {/* Info cards */}
              <div className="grid sm:grid-cols-2 gap-4 pt-4">
                <div className="flex items-start gap-3 p-4 rounded-lg bg-background border border-border">
                  <GraduationCap className="w-5 h-5 text-foreground-muted mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground text-sm">Education</p>
                    <p className="text-sm text-foreground-muted">
                      {profile.education.degree} {profile.education.major}
                    </p>
                    <p className="text-sm text-foreground-subtle">
                      {profile.education.school}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg bg-background border border-border">
                  <MapPin className="w-5 h-5 text-foreground-muted mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground text-sm">Location</p>
                    <p className="text-sm text-foreground-muted">
                      {profile.location}
                    </p>
                    <p className="text-sm text-foreground-subtle">
                      Open to relocation
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg bg-background border border-border">
                  <Code2 className="w-5 h-5 text-foreground-muted mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground text-sm">Focus Areas</p>
                    <p className="text-sm text-foreground-muted">
                      Full-Stack Development
                    </p>
                    <p className="text-sm text-foreground-subtle">
                      Systems Programming
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg bg-background border border-border">
                  <Lightbulb className="w-5 h-5 text-foreground-muted mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground text-sm">Interests</p>
                    <p className="text-sm text-foreground-muted">
                      AI/ML Applications
                    </p>
                    <p className="text-sm text-foreground-subtle">
                      Open Source
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
