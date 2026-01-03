import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { books, media, courses } from "@/data/interests";

export const metadata: Metadata = {
  title: "Now",
  description:
    "What I'm currently reading, watching, and learning. A glimpse into my interests.",
};

export default function NowPage() {
  const currentlyReading = books.filter((b) => b.status === "reading");
  const completedBooks = books.filter((b) => b.status === "completed");
  const currentlyWatching = media.filter((m) => m.status === "watching");
  const completedMedia = media.filter((m) => m.status === "completed");
  const inProgressCourses = courses.filter((c) => c.status === "in-progress");
  const completedCourses = courses.filter((c) => c.status === "completed");

  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-foreground-subtle hover:text-foreground transition-colors text-sm mb-16"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>

          {/* Header */}
          <header className="mb-20">
            <h1 className="text-4xl md:text-5xl font-display font-medium text-foreground tracking-tight mb-6">
              Now
            </h1>
            <p className="text-foreground-muted text-lg leading-relaxed max-w-xl">
              What I&apos;m reading, watching, and learning. Updated January 2026.
            </p>
          </header>

          {/* Reading Section */}
          <section className="mb-20">
            <div className="flex items-baseline justify-between mb-8">
              <h2 className="text-sm font-medium tracking-widest uppercase text-foreground-subtle">
                Reading
              </h2>
              <span className="text-sm text-foreground-subtle">
                {completedBooks.length} books
              </span>
            </div>

            {/* Currently Reading */}
            {currentlyReading.length > 0 && (
              <div className="mb-10">
                <p className="text-xs text-foreground-subtle mb-4">Currently</p>
                <div className="space-y-6">
                  {currentlyReading.map((book) => (
                    <article key={book.title} className="group">
                      <h3 className="text-lg font-medium text-foreground mb-1">
                        {book.title}
                      </h3>
                      <p className="text-foreground-muted text-sm mb-2">
                        {book.author}
                      </p>
                      {book.thoughts && (
                        <p className="text-foreground-subtle text-sm leading-relaxed">
                          {book.thoughts}
                        </p>
                      )}
                    </article>
                  ))}
                </div>
              </div>
            )}

            {/* Completed Books */}
            <div>
              <p className="text-xs text-foreground-subtle mb-4">Favorites</p>
              <div className="grid gap-px bg-border/30 rounded-lg overflow-hidden">
                {completedBooks.slice(0, 8).map((book) => (
                  <div
                    key={book.title}
                    className="bg-background p-4 hover:bg-foreground/[0.02] transition-colors"
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <div className="min-w-0">
                        <h3 className="text-foreground font-medium truncate">
                          {book.title}
                        </h3>
                        <p className="text-foreground-subtle text-sm">
                          {book.author}
                        </p>
                      </div>
                      {book.rating && (
                        <span className="text-foreground-subtle text-sm flex-shrink-0">
                          {book.rating}/5
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Watching Section */}
          <section className="mb-20">
            <div className="flex items-baseline justify-between mb-8">
              <h2 className="text-sm font-medium tracking-widest uppercase text-foreground-subtle">
                Watching
              </h2>
              <span className="text-sm text-foreground-subtle">
                {completedMedia.length} watched
              </span>
            </div>

            {/* Currently Watching */}
            {currentlyWatching.length > 0 && (
              <div className="mb-10">
                <p className="text-xs text-foreground-subtle mb-4">Currently</p>
                <div className="space-y-6">
                  {currentlyWatching.map((item) => (
                    <article key={item.title} className="group">
                      <div className="flex items-baseline gap-3 mb-1">
                        <h3 className="text-lg font-medium text-foreground">
                          {item.title}
                        </h3>
                        <span className="text-xs text-foreground-subtle">
                          {item.year}
                        </span>
                      </div>
                      {item.thoughts && (
                        <p className="text-foreground-subtle text-sm leading-relaxed">
                          {item.thoughts}
                        </p>
                      )}
                    </article>
                  ))}
                </div>
              </div>
            )}

            {/* Completed Media */}
            <div>
              <p className="text-xs text-foreground-subtle mb-4">Favorites</p>
              <div className="grid gap-px bg-border/30 rounded-lg overflow-hidden">
                {completedMedia.map((item) => (
                  <div
                    key={item.title}
                    className="bg-background p-4 hover:bg-foreground/[0.02] transition-colors"
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <div className="min-w-0 flex items-baseline gap-3">
                        <h3 className="text-foreground font-medium">
                          {item.title}
                        </h3>
                        <span className="text-foreground-subtle text-xs">
                          {item.type}
                        </span>
                      </div>
                      <span className="text-foreground-subtle text-sm flex-shrink-0">
                        {item.year}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Learning Section */}
          <section>
            <div className="flex items-baseline justify-between mb-8">
              <h2 className="text-sm font-medium tracking-widest uppercase text-foreground-subtle">
                Learning
              </h2>
              <span className="text-sm text-foreground-subtle">
                {completedCourses.length} completed
              </span>
            </div>

            {/* In Progress */}
            {inProgressCourses.length > 0 && (
              <div className="mb-10">
                <p className="text-xs text-foreground-subtle mb-4">In Progress</p>
                <div className="space-y-8">
                  {inProgressCourses.map((course) => (
                    <article key={course.title} className="group">
                      <h3 className="text-lg font-medium text-foreground mb-1">
                        {course.title}
                      </h3>
                      <p className="text-foreground-muted text-sm mb-3">
                        {course.platform}
                        {course.instructor && ` · ${course.instructor}`}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {course.topics.map((topic) => (
                          <span
                            key={topic}
                            className="px-2 py-0.5 text-xs rounded-full bg-foreground/5 text-foreground-subtle"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                      {course.thoughts && (
                        <p className="text-foreground-subtle text-sm leading-relaxed">
                          {course.thoughts}
                        </p>
                      )}
                    </article>
                  ))}
                </div>
              </div>
            )}

            {/* Completed Courses */}
            <div>
              <p className="text-xs text-foreground-subtle mb-4">Completed</p>
              <div className="grid gap-px bg-border/30 rounded-lg overflow-hidden">
                {completedCourses.map((course) => (
                  <div
                    key={course.title}
                    className="bg-background p-4 hover:bg-foreground/[0.02] transition-colors"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="min-w-0">
                        <h3 className="text-foreground font-medium">
                          {course.title}
                        </h3>
                        <p className="text-foreground-subtle text-sm">
                          {course.platform}
                        </p>
                      </div>
                      {course.link && (
                        <a
                          href={course.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-foreground-subtle hover:text-foreground transition-colors flex-shrink-0"
                        >
                          <ArrowUpRight className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Footer note */}
          <footer className="mt-20 pt-8 border-t border-border/30">
            <p className="text-foreground-subtle text-sm">
              Inspired by the{" "}
              <a
                href="https://nownownow.com/about"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground-muted hover:text-foreground transition-colors"
              >
                /now page movement
              </a>
              .
            </p>
          </footer>
        </div>
      </main>
      <Footer />
    </>
  );
}
