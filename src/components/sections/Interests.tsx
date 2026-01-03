"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { Book as BookType, Media, Course } from "@/lib/content";

interface InterestsSectionProps {
  books: BookType[];
  media: Media[];
  courses: Course[];
}

export function InterestsSection({ books, media, courses }: InterestsSectionProps) {
  const currentlyReading = books.filter((b) => b.status === "reading");
  const completedBooks = books.filter((b) => b.status === "completed");
  const currentlyWatching = media.filter((m) => m.status === "watching");
  const completedMedia = media.filter((m) => m.status === "completed");
  const currentlyLearning = courses.filter((c) => c.status === "in-progress");
  const completedCourses = courses.filter((c) => c.status === "completed");

  return (
    <section id="interests" className="relative py-32 md:py-40 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-display font-medium text-foreground tracking-tight mb-6">
            Beyond Code
          </h2>
          <p className="text-foreground-muted text-lg md:text-xl max-w-xl leading-relaxed">
            What I read, watch, and learn when I&apos;m not building.
          </p>
        </motion.div>

        {/* Three Column Grid */}
        <div className="grid md:grid-cols-3 gap-12 md:gap-8">
          {/* Reading Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0 }}
          >
            <div className="flex items-baseline justify-between mb-6">
              <h3 className="text-sm font-medium tracking-widest uppercase text-foreground-subtle">
                Reading
              </h3>
              <span className="text-xs text-foreground-subtle">
                {completedBooks.length} books
              </span>
            </div>

            <div className="space-y-4">
              {/* Currently Reading */}
              {currentlyReading.slice(0, 1).map((book) => (
                <div key={book.id} className="pb-4 border-b border-border/30">
                  <p className="text-xs text-foreground-subtle mb-2">Now</p>
                  <p className="text-foreground font-medium">{book.title}</p>
                  <p className="text-foreground-muted text-sm">{book.author}</p>
                </div>
              ))}

              {/* Favorites */}
              {completedBooks.slice(0, 4).map((book) => (
                <div
                  key={book.id}
                  className="group py-2 hover:bg-foreground/[0.02] -mx-2 px-2 rounded transition-colors"
                >
                  <p className="text-foreground font-medium text-sm">{book.title}</p>
                  <p className="text-foreground-subtle text-xs">{book.author}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Watching Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-baseline justify-between mb-6">
              <h3 className="text-sm font-medium tracking-widest uppercase text-foreground-subtle">
                Watching
              </h3>
              <span className="text-xs text-foreground-subtle">
                {completedMedia.length} watched
              </span>
            </div>

            <div className="space-y-4">
              {/* Currently Watching */}
              {currentlyWatching.slice(0, 1).map((item) => (
                <div key={item.id} className="pb-4 border-b border-border/30">
                  <p className="text-xs text-foreground-subtle mb-2">Now</p>
                  <p className="text-foreground font-medium">{item.title}</p>
                  <p className="text-foreground-muted text-sm">{item.type} · {item.year}</p>
                </div>
              ))}

              {/* Favorites */}
              {completedMedia
                .filter((m) => m.rating === 5)
                .slice(0, 4)
                .map((item) => (
                  <div
                    key={item.id}
                    className="group py-2 hover:bg-foreground/[0.02] -mx-2 px-2 rounded transition-colors"
                  >
                    <p className="text-foreground font-medium text-sm">{item.title}</p>
                    <p className="text-foreground-subtle text-xs">{item.type} · {item.year}</p>
                  </div>
                ))}
            </div>
          </motion.div>

          {/* Learning Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-baseline justify-between mb-6">
              <h3 className="text-sm font-medium tracking-widest uppercase text-foreground-subtle">
                Learning
              </h3>
              <span className="text-xs text-foreground-subtle">
                {completedCourses.length} completed
              </span>
            </div>

            <div className="space-y-4">
              {/* In Progress - limit to 2 */}
              {currentlyLearning.slice(0, 2).map((course, i) => (
                <div
                  key={course.id}
                  className={i === 0 ? "pb-4 border-b border-border/30" : "pb-4"}
                >
                  {i === 0 && <p className="text-xs text-foreground-subtle mb-2">Now</p>}
                  <p className="text-foreground font-medium text-sm">{course.title}</p>
                  <p className="text-foreground-subtle text-xs">{course.platform}</p>
                </div>
              ))}

              {/* Completed */}
              {completedCourses.slice(0, 2).map((course) => (
                <div
                  key={course.id}
                  className="group py-2 hover:bg-foreground/[0.02] -mx-2 px-2 rounded transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-foreground font-medium text-sm">{course.title}</p>
                      <p className="text-foreground-subtle text-xs">{course.platform}</p>
                    </div>
                    {course.link && (
                      <a
                        href={course.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground-subtle hover:text-foreground transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Link to full page */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 pt-8 border-t border-border/30"
        >
          <Link
            href="/now"
            className="inline-flex items-center gap-2 text-foreground-muted hover:text-foreground transition-colors text-sm"
          >
            View all
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
