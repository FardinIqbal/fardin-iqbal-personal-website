import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BlogCard } from "@/components/blog/BlogCard";
import { getAllPosts } from "@/lib/mdx";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Thoughts on software development, technology, and building things for the web.",
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Blog"
            subtitle="Thoughts on software development, technology, and building things"
          />

          {posts.length > 0 ? (
            <div className="grid gap-6">
              {posts.map((post, index) => (
                <BlogCard key={post.slug} post={post} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-foreground-muted text-lg">
                No posts yet. Check back soon!
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
