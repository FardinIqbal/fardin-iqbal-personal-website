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
    <section id="interests" className="editorial-section bg-background">
      <div className="editorial-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] }}
          className="mb-20"
        >
          <div className="chapter-marker mb-6">Interests</div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-foreground tracking-tight leading-[1.15] mb-6">
            Beyond Code
          </h2>
          <p className="text-foreground-muted text-lg md:text-xl max-w-2xl leading-[1.75] font-serif">
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
            <div className="flex items-baseline justify-between mb-8">
              <h3 className="text-xs font-inter font-medium tracking-[0.12em] uppercase text-foreground-subtle">
                Reading
              </h3>
              <span className="text-xs text-foreground-subtle font-inter">
                {completedBooks.length} books
              </span>
            </div>

            <div className="space-y-4">
              {/* Currently Reading */}
              {currentlyReading.slice(0, 1).map((book) => (
                <div key={book.id} className="pb-5 border-b border-border/30 mb-5">
                  <p className="text-xs font-inter text-foreground-subtle mb-3 uppercase tracking-wide">Now</p>
                  <p className="text-foreground font-serif font-medium text-base mb-1.5">{book.title}</p>
                  <p className="text-foreground-muted text-sm font-serif">{book.author}</p>
                </div>
              ))}

              {/* Favorites */}
              {completedBooks.slice(0, 4).map((book) => (
                <div
                  key={book.id}
                  className="group py-3 hover:bg-foreground/[0.02] -mx-2 px-2 rounded transition-colors duration-300"
                >
                  <p className="text-foreground font-serif font-medium text-sm mb-1">{book.title}</p>
                  <p className="text-foreground-subtle text-xs font-serif">{book.author}</p>
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
            <div className="flex items-baseline justify-between mb-8">
              <h3 className="text-xs font-inter font-medium tracking-[0.12em] uppercase text-foreground-subtle">
                Watching
              </h3>
              <span className="text-xs text-foreground-subtle font-inter">
                {completedMedia.length} watched
              </span>
            </div>

            <div className="space-y-4">
              {/* Currently Watching */}
              {currentlyWatching.slice(0, 1).map((item) => (
                <div key={item.id} className="pb-5 border-b border-border/30 mb-5">
                  <p className="text-xs font-inter text-foreground-subtle mb-3 uppercase tracking-wide">Now</p>
                  <p className="text-foreground font-serif font-medium text-base mb-1.5">{item.title}</p>
                  <p className="text-foreground-muted text-sm font-serif">{item.type} · {item.year}</p>
                </div>
              ))}

              {/* Favorites */}
              {completedMedia
                .filter((m) => m.rating === 5)
                .slice(0, 4)
                .map((item) => (
                  <div
                    key={item.id}
                    className="group py-3 hover:bg-foreground/[0.02] -mx-2 px-2 rounded transition-colors duration-300"
                  >
                    <p className="text-foreground font-serif font-medium text-sm mb-1">{item.title}</p>
                    <p className="text-foreground-subtle text-xs font-serif">{item.type} · {item.year}</p>
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
            <div className="flex items-baseline justify-between mb-8">
              <h3 className="text-xs font-inter font-medium tracking-[0.12em] uppercase text-foreground-subtle">
                Learning
              </h3>
              <span className="text-xs text-foreground-subtle font-inter">
                {completedCourses.length} completed
              </span>
            </div>

            <div className="space-y-4">
              {/* In Progress - limit to 2 */}
              {currentlyLearning.slice(0, 2).map((course, i) => (
                <div
                  key={course.id}
                  className={i === 0 ? "pb-5 border-b border-border/30 mb-5" : "pb-4"}
                >
                  {i === 0 && <p className="text-xs font-inter text-foreground-subtle mb-3 uppercase tracking-wide">Now</p>}
                  <p className="text-foreground font-serif font-medium text-sm mb-1">{course.title}</p>
                  <p className="text-foreground-subtle text-xs font-serif">{course.platform}</p>
                </div>
              ))}

              {/* Completed */}
              {completedCourses.slice(0, 2).map((course) => (
                <div
                  key={course.id}
                  className="group py-3 hover:bg-foreground/[0.02] -mx-2 px-2 rounded transition-colors duration-300"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-foreground font-serif font-medium text-sm mb-1">{course.title}</p>
                      <p className="text-foreground-subtle text-xs font-serif">{course.platform}</p>
                    </div>
                    {course.link && (
                      <a
                        href={course.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground-subtle hover:text-accent transition-colors opacity-0 group-hover:opacity-100"
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
          className="mt-20 pt-10 border-t border-border/30"
        >
          <Link
            href="/now"
            className="inline-flex items-center gap-2 text-foreground-muted hover:text-accent transition-colors text-sm"
          >
            View all
            <ArrowUpRight className="w-4 h-4 text-accent" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
