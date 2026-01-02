"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Book, Tv, GraduationCap, Star, ExternalLink, Compass } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Book as BookType, Media, Course } from "@/lib/content";

function RatingStars({ rating }: { rating?: number | null }) {
  if (!rating) return null;
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.div
          key={star}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: star * 0.1, type: "spring", stiffness: 200 }}
        >
          <Star
            className={cn(
              "w-3 h-3",
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-foreground-subtle"
            )}
          />
        </motion.div>
      ))}
    </div>
  );
}

function InterestCard({
  children,
  icon: Icon,
  title,
  subtitle,
  iconColor,
  index = 0,
}: {
  children: React.ReactNode;
  icon: React.ElementType;
  title: string;
  subtitle: string;
  iconColor: string;
  index?: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
    >
      {/* Glow effect */}
      <motion.div
        className={cn(
          "absolute -inset-0.5 rounded-2xl blur-xl opacity-0 transition-opacity duration-500",
          iconColor === "emerald" && "bg-emerald-500/30",
          iconColor === "purple" && "bg-purple-500/30",
          iconColor === "blue" && "bg-blue-500/30"
        )}
        animate={{ opacity: isHovered ? 0.5 : 0 }}
      />

      <motion.div
        className="relative h-full p-6 rounded-2xl bg-gradient-to-br from-background-secondary to-background-tertiary border border-white/5 overflow-hidden"
        animate={{ y: isHovered ? -4 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Animated background gradient */}
        <motion.div
          className={cn(
            "absolute inset-0 opacity-0 transition-opacity duration-500",
            iconColor === "emerald" && "bg-gradient-to-br from-emerald-500/5 to-transparent",
            iconColor === "purple" && "bg-gradient-to-br from-purple-500/5 to-transparent",
            iconColor === "blue" && "bg-gradient-to-br from-blue-500/5 to-transparent"
          )}
          animate={{ opacity: isHovered ? 1 : 0 }}
        />

        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: isHovered ? "100%" : "-100%", opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.6 }}
        />

        {/* Header */}
        <div className="relative flex items-center gap-3 mb-6">
          <motion.div
            className={cn(
              "p-2.5 rounded-xl",
              iconColor === "emerald" && "bg-emerald-500/10 border border-emerald-500/20",
              iconColor === "purple" && "bg-purple-500/10 border border-purple-500/20",
              iconColor === "blue" && "bg-blue-500/10 border border-blue-500/20"
            )}
            animate={{ rotate: isHovered ? 360 : 0 }}
            transition={{ duration: 0.6 }}
          >
            <Icon
              className={cn(
                "w-5 h-5",
                iconColor === "emerald" && "text-emerald-400",
                iconColor === "purple" && "text-purple-400",
                iconColor === "blue" && "text-blue-400"
              )}
            />
          </motion.div>
          <div>
            <motion.h3
              className="font-semibold text-foreground"
              animate={{ x: isHovered ? 4 : 0 }}
            >
              {title}
            </motion.h3>
            <p className="text-sm text-foreground-muted">{subtitle}</p>
          </div>
        </div>

        {/* Content */}
        <div className="relative space-y-4">{children}</div>

        {/* Corner accent */}
        <motion.div
          className={cn(
            "absolute top-0 right-0 w-32 h-32 rounded-bl-full",
            iconColor === "emerald" && "bg-gradient-to-bl from-emerald-500/10 to-transparent",
            iconColor === "purple" && "bg-gradient-to-bl from-purple-500/10 to-transparent",
            iconColor === "blue" && "bg-gradient-to-bl from-blue-500/10 to-transparent"
          )}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.5 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
}

function ItemCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ x: 6, scale: 1.02 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative p-3 rounded-lg bg-background/50 border border-white/5 backdrop-blur-sm overflow-hidden transition-colors hover:border-white/10",
        className
      )}
    >
      {/* Subtle glow on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary-500/5 via-transparent to-transparent"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
      <div className="relative">{children}</div>
    </motion.div>
  );
}

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
    <section id="interests" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 -left-64 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[128px]"
          animate={{ y: [0, 50, 0], x: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-64 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[128px]"
          animate={{ y: [0, -50, 0], x: [0, -30, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 mb-6"
          >
            <motion.div
              animate={{ rotate: [0, 15, 0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Compass className="w-4 h-4 text-primary-400" />
            </motion.div>
            <span className="text-sm font-medium text-primary-400">
              Beyond Code
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-foreground via-foreground to-foreground-muted bg-clip-text text-transparent">
              What I&apos;m{" "}
            </span>
            <span className="bg-gradient-to-r from-primary-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Into
            </span>
          </h2>

          <p className="text-foreground-muted text-lg md:text-xl max-w-2xl mx-auto">
            Books I&apos;m reading, shows I&apos;m watching, and courses I&apos;m taking
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Books */}
          <InterestCard
            icon={Book}
            title="Reading"
            subtitle={`${completedBooks.length} books completed`}
            iconColor="emerald"
            index={0}
          >
            {currentlyReading.length > 0 && (
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-wider text-foreground-muted font-medium">
                  Currently Reading
                </p>
                {currentlyReading.map((book, i) => (
                  <motion.div
                    key={book.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <ItemCard>
                      <p className="font-medium text-foreground text-sm">
                        {book.title}
                      </p>
                      <p className="text-xs text-foreground-muted">by {book.author}</p>
                    </ItemCard>
                  </motion.div>
                ))}
              </div>
            )}

            <div className="space-y-3">
              <p className="text-xs uppercase tracking-wider text-foreground-muted font-medium">
                Recently Finished
              </p>
              {completedBooks.slice(0, 2).map((book, i) => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (currentlyReading.length + i) * 0.1 }}
                >
                  <ItemCard>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-medium text-foreground text-sm">
                          {book.title}
                        </p>
                        <p className="text-xs text-foreground-muted">
                          by {book.author}
                        </p>
                      </div>
                      <RatingStars rating={book.rating} />
                    </div>
                  </ItemCard>
                </motion.div>
              ))}
            </div>
          </InterestCard>

          {/* Shows/Movies */}
          <InterestCard
            icon={Tv}
            title="Watching"
            subtitle={`${completedMedia.length} watched`}
            iconColor="purple"
            index={1}
          >
            {currentlyWatching.length > 0 && (
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-wider text-foreground-muted font-medium">
                  Currently Watching
                </p>
                {currentlyWatching.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <ItemCard>
                      <div className="flex items-center gap-2">
                        <span
                          className={cn(
                            "px-1.5 py-0.5 text-[10px] rounded uppercase font-semibold",
                            item.type === "show"
                              ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                              : item.type === "movie"
                              ? "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                              : "bg-pink-500/20 text-pink-400 border border-pink-500/30"
                          )}
                        >
                          {item.type}
                        </span>
                        <p className="font-medium text-foreground text-sm">
                          {item.title}
                        </p>
                      </div>
                      {item.year && (
                        <p className="text-xs text-foreground-muted mt-1">
                          {item.year}
                        </p>
                      )}
                    </ItemCard>
                  </motion.div>
                ))}
              </div>
            )}

            <div className="space-y-3">
              <p className="text-xs uppercase tracking-wider text-foreground-muted font-medium">
                Favorites
              </p>
              {completedMedia
                .filter((m) => m.rating === 5)
                .slice(0, 2)
                .map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (currentlyWatching.length + i) * 0.1 }}
                  >
                    <ItemCard>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span
                              className={cn(
                                "px-1.5 py-0.5 text-[10px] rounded uppercase font-semibold",
                                item.type === "show"
                                  ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                                  : "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                              )}
                            >
                              {item.type}
                            </span>
                            <p className="font-medium text-foreground text-sm">
                              {item.title}
                            </p>
                          </div>
                        </div>
                        <RatingStars rating={item.rating} />
                      </div>
                    </ItemCard>
                  </motion.div>
                ))}
            </div>
          </InterestCard>

          {/* Courses */}
          <InterestCard
            icon={GraduationCap}
            title="Learning"
            subtitle={`${completedCourses.length} courses completed`}
            iconColor="blue"
            index={2}
          >
            {currentlyLearning.length > 0 && (
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-wider text-foreground-muted font-medium">
                  In Progress
                </p>
                {currentlyLearning.map((course, i) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <ItemCard>
                      <p className="font-medium text-foreground text-sm">
                        {course.title}
                      </p>
                      <p className="text-xs text-foreground-muted">
                        {course.platform}
                        {course.instructor && ` • ${course.instructor}`}
                      </p>
                    </ItemCard>
                  </motion.div>
                ))}
              </div>
            )}

            <div className="space-y-3">
              <p className="text-xs uppercase tracking-wider text-foreground-muted font-medium">
                Completed
              </p>
              {completedCourses.slice(0, 2).map((course, i) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (currentlyLearning.length + i) * 0.1 }}
                >
                  <ItemCard>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-medium text-foreground text-sm">
                          {course.title}
                        </p>
                        <p className="text-xs text-foreground-muted">
                          {course.platform}
                        </p>
                      </div>
                      {course.link && (
                        <motion.div whileHover={{ scale: 1.2, rotate: 15 }}>
                          <Link
                            href={course.link}
                            target="_blank"
                            className="text-foreground-muted hover:text-primary-400 transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                        </motion.div>
                      )}
                    </div>
                  </ItemCard>
                </motion.div>
              ))}
            </div>
          </InterestCard>
        </div>

        {/* Link to full page */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              href="/now"
              className="group inline-flex items-center gap-2 px-8 py-4 text-sm font-medium rounded-full border border-primary-500/30 text-primary-400 hover:bg-primary-500/10 hover:border-primary-500/50 transition-all duration-300"
            >
              View Full Reading & Watching Lists
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ExternalLink className="w-4 h-4" />
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
