import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BlogList } from "@/components/blog/BlogList";
import { getAllPosts, getAllTags } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Reflections on technology, philosophy, and the craft of building software.",
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  const allTags = await getAllTags();

  return (
    <>
      <Header />
      <main id="main" className="min-h-screen pt-24 pb-20 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-16">
            <h1 className="font-display text-4xl md:text-5xl font-medium text-foreground tracking-tight mb-4">
              Blog
            </h1>
            <p className="font-body text-lg text-foreground-secondary">
              Reflections on technology, philosophy, and the craft of building software.
            </p>
          </div>

          <BlogList posts={posts} allTags={allTags} />
        </div>
      </main>
      <Footer />
    </>
  );
}
