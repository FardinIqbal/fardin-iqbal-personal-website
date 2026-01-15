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
      <main id="main" className="min-h-screen pt-24 pb-20 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto">
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-sans text-sm text-foreground-muted hover:text-foreground transition-colors mb-12"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>

          {/* Header */}
          <header className="mb-16">
            <h1 className="font-display text-4xl md:text-5xl font-medium text-foreground tracking-tight mb-4">
              Now
            </h1>
            <p className="font-body text-lg text-foreground-secondary max-w-xl">
              What I&apos;m reading, watching, and learning. Updated January 2026.
            </p>
          </header>

          {/* Reading Section */}
          <section className="mb-16">
            <div className="flex items-baseline justify-between mb-8 pb-4 border-b border-border">
              <h2 className="font-sans text-xs font-medium tracking-wider uppercase text-foreground-muted">
                Reading
              </h2>
              <span className="font-sans text-sm text-foreground-muted">
                {completedBooks.length} books
              </span>
            </div>

            {/* Currently Reading */}
            {currentlyReading.length > 0 && (
              <div className="mb-10">
                <p className="font-sans text-xs text-foreground-muted mb-4">Currently</p>
                <div className="space-y-6">
                  {currentlyReading.map((book) => (
                    <article key={book.title}>
                      <h3 className="font-display text-lg font-medium text-foreground mb-1">
                        {book.title}
                      </h3>
                      <p className="font-sans text-sm text-foreground-secondary mb-2">
                        {book.author}
                      </p>
                      {book.thoughts && (
                        <p className="font-body text-sm text-foreground-muted leading-relaxed">
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
              <p className="font-sans text-xs text-foreground-muted mb-4">Favorites</p>
              <div className="divide-y divide-border">
                {completedBooks.slice(0, 8).map((book) => (
                  <div key={book.title} className="py-4">
                    <div className="flex items-baseline justify-between gap-4">
                      <div className="min-w-0">
                        <h3 className="font-display text-foreground font-medium">
                          {book.title}
                        </h3>
                        <p className="font-sans text-sm text-foreground-muted">
                          {book.author}
                        </p>
                      </div>
                      {book.rating && (
                        <span className="font-sans text-sm text-foreground-muted flex-shrink-0">
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
          <section className="mb-16">
            <div className="flex items-baseline justify-between mb-8 pb-4 border-b border-border">
              <h2 className="font-sans text-xs font-medium tracking-wider uppercase text-foreground-muted">
                Watching
              </h2>
              <span className="font-sans text-sm text-foreground-muted">
                {completedMedia.length} watched
              </span>
            </div>

            {/* Currently Watching */}
            {currentlyWatching.length > 0 && (
              <div className="mb-10">
                <p className="font-sans text-xs text-foreground-muted mb-4">Currently</p>
                <div className="space-y-6">
                  {currentlyWatching.map((item) => (
                    <article key={item.title}>
                      <div className="flex items-baseline gap-3 mb-1">
                        <h3 className="font-display text-lg font-medium text-foreground">
                          {item.title}
                        </h3>
                        <span className="font-sans text-xs text-foreground-muted">
                          {item.year}
                        </span>
                      </div>
                      {item.thoughts && (
                        <p className="font-body text-sm text-foreground-muted leading-relaxed">
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
              <p className="font-sans text-xs text-foreground-muted mb-4">Favorites</p>
              <div className="divide-y divide-border">
                {completedMedia.map((item) => (
                  <div key={item.title} className="py-4">
                    <div className="flex items-baseline justify-between gap-4">
                      <div className="min-w-0 flex items-baseline gap-3">
                        <h3 className="font-display text-foreground font-medium">
                          {item.title}
                        </h3>
                        <span className="font-sans text-xs text-foreground-muted">
                          {item.type}
                        </span>
                      </div>
                      <span className="font-sans text-sm text-foreground-muted flex-shrink-0">
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
            <div className="flex items-baseline justify-between mb-8 pb-4 border-b border-border">
              <h2 className="font-sans text-xs font-medium tracking-wider uppercase text-foreground-muted">
                Learning
              </h2>
              <span className="font-sans text-sm text-foreground-muted">
                {completedCourses.length} completed
              </span>
            </div>

            {/* In Progress */}
            {inProgressCourses.length > 0 && (
              <div className="mb-10">
                <p className="font-sans text-xs text-foreground-muted mb-4">In Progress</p>
                <div className="space-y-8">
                  {inProgressCourses.map((course) => (
                    <article key={course.title}>
                      <h3 className="font-display text-lg font-medium text-foreground mb-1">
                        {course.title}
                      </h3>
                      <p className="font-sans text-sm text-foreground-secondary mb-3">
                        {course.platform}
                        {course.instructor && ` · ${course.instructor}`}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {course.topics.map((topic) => (
                          <span
                            key={topic}
                            className="px-2.5 py-1 font-sans text-xs text-foreground-muted bg-background-secondary border border-border rounded-full"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                      {course.thoughts && (
                        <p className="font-body text-sm text-foreground-muted leading-relaxed">
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
              <p className="font-sans text-xs text-foreground-muted mb-4">Completed</p>
              <div className="divide-y divide-border">
                {completedCourses.map((course) => (
                  <div key={course.title} className="py-4">
                    <div className="flex items-center justify-between gap-4">
                      <div className="min-w-0">
                        <h3 className="font-display text-foreground font-medium">
                          {course.title}
                        </h3>
                        <p className="font-sans text-sm text-foreground-muted">
                          {course.platform}
                        </p>
                      </div>
                      {course.link && (
                        <a
                          href={course.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-foreground-muted hover:text-foreground transition-colors flex-shrink-0"
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
          <footer className="mt-16 pt-8 border-t border-border">
            <p className="font-sans text-sm text-foreground-muted">
              Inspired by the{" "}
              <a
                href="https://nownownow.com/about"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground-secondary hover:text-foreground transition-colors underline underline-offset-4"
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
