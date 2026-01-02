import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Book, Tv, GraduationCap, Star, ExternalLink } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { books, media, courses } from "@/data/interests";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Now",
  description:
    "What I'm currently reading, watching, and learning. A glimpse into my interests and ongoing personal development.",
};

function RatingStars({ rating }: { rating?: number }) {
  if (!rating) return null;
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            "w-3.5 h-3.5",
            star <= rating
              ? "fill-yellow-400 text-yellow-400"
              : "text-foreground-subtle"
          )}
        />
      ))}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    reading: "bg-emerald-500/20 text-emerald-400",
    watching: "bg-purple-500/20 text-purple-400",
    "in-progress": "bg-blue-500/20 text-blue-400",
    completed: "bg-green-500/20 text-green-400",
    "want-to-read": "bg-gray-500/20 text-gray-400",
    "want-to-watch": "bg-gray-500/20 text-gray-400",
    "want-to-take": "bg-gray-500/20 text-gray-400",
  };

  return (
    <span
      className={cn(
        "px-2 py-0.5 text-xs rounded-full font-medium capitalize",
        colors[status] || "bg-gray-500/20 text-gray-400"
      )}
    >
      {status.replace("-", " ")}
    </span>
  );
}

export default function NowPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-foreground-muted hover:text-primary-400 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back home
          </Link>

          {/* Header */}
          <AnimatedSection className="mb-16">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span className="gradient-text">What I&apos;m Into Right Now</span>
            </h1>
            <p className="text-foreground-muted text-lg max-w-2xl">
              A living document of what I&apos;m currently reading, watching, and learning.
              Inspired by the{" "}
              <Link
                href="https://nownownow.com/about"
                target="_blank"
                className="text-primary-400 hover:underline"
              >
                /now page movement
              </Link>
              .
            </p>
            <p className="text-foreground-muted text-sm mt-4">
              Last updated: January 2026
            </p>
          </AnimatedSection>

          {/* Books Section */}
          <AnimatedSection delay={0.1} className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-emerald-500/10">
                <Book className="w-6 h-6 text-emerald-400" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Reading</h2>
            </div>

            <div className="space-y-4">
              {books.map((book) => (
                <div
                  key={book.title}
                  className="p-5 rounded-xl bg-background-secondary border border-border hover:border-emerald-500/30 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold text-foreground">
                          {book.title}
                        </h3>
                        <StatusBadge status={book.status} />
                      </div>
                      <p className="text-sm text-foreground-muted mb-2">
                        by {book.author}
                      </p>
                      {book.thoughts && (
                        <p className="text-sm text-foreground-muted italic">
                          &ldquo;{book.thoughts}&rdquo;
                        </p>
                      )}
                    </div>
                    <RatingStars rating={book.rating} />
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Shows/Movies Section */}
          <AnimatedSection delay={0.2} className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-purple-500/10">
                <Tv className="w-6 h-6 text-purple-400" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Watching</h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {media.map((item) => (
                <div
                  key={item.title}
                  className="p-5 rounded-xl bg-background-secondary border border-border hover:border-purple-500/30 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "px-2 py-0.5 text-xs rounded uppercase font-medium",
                          item.type === "show"
                            ? "bg-blue-500/20 text-blue-400"
                            : item.type === "movie"
                            ? "bg-orange-500/20 text-orange-400"
                            : item.type === "documentary"
                            ? "bg-teal-500/20 text-teal-400"
                            : "bg-pink-500/20 text-pink-400"
                        )}
                      >
                        {item.type}
                      </span>
                      <StatusBadge status={item.status} />
                    </div>
                    <RatingStars rating={item.rating} />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">
                    {item.title}
                  </h3>
                  {item.year && (
                    <p className="text-xs text-foreground-muted mb-2">
                      {item.year}
                    </p>
                  )}
                  {item.thoughts && (
                    <p className="text-sm text-foreground-muted italic">
                      &ldquo;{item.thoughts}&rdquo;
                    </p>
                  )}
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Courses Section */}
          <AnimatedSection delay={0.3}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <GraduationCap className="w-6 h-6 text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Learning</h2>
            </div>

            <div className="space-y-4">
              {courses.map((course) => (
                <div
                  key={course.title}
                  className="p-5 rounded-xl bg-background-secondary border border-border hover:border-blue-500/30 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold text-foreground">
                          {course.title}
                        </h3>
                        <StatusBadge status={course.status} />
                      </div>
                      <p className="text-sm text-foreground-muted mb-2">
                        {course.platform}
                        {course.instructor && ` • ${course.instructor}`}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {course.topics.map((topic) => (
                          <span
                            key={topic}
                            className="px-2 py-0.5 text-xs rounded-full bg-primary-500/10 text-primary-400"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                      {course.thoughts && (
                        <p className="text-sm text-foreground-muted italic">
                          &ldquo;{course.thoughts}&rdquo;
                        </p>
                      )}
                    </div>
                    {course.link && (
                      <Link
                        href={course.link}
                        target="_blank"
                        className="p-2 rounded-lg text-foreground-muted hover:text-primary-400 hover:bg-primary-500/10 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </main>
      <Footer />
    </>
  );
}
