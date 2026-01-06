import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { EssaysList } from "@/components/essays/EssaysList";
import { getAllPosts, getAllTags } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Essays",
  description:
    "Reflections on technology, philosophy, and the craft of building software.",
};

export default async function EssaysPage() {
  const posts = await getAllPosts();
  const allTags = await getAllTags();

  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 pb-20 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Editorial New Yorker Header */}
          <div className="mb-16">
            <div className="mb-6">
              <span className="chapter-marker">Essays</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-foreground tracking-tight mb-4 leading-tight">
              Essays
            </h1>
            <p className="text-foreground-muted font-serif text-lg leading-relaxed max-w-2xl">
              Reflections on technology, philosophy, and the craft of building software.
            </p>
            <div className="h-px bg-border mt-8"></div>
          </div>

          <EssaysList posts={posts} allTags={allTags} />
        </div>
      </main>
      <Footer />
    </>
  );
}
