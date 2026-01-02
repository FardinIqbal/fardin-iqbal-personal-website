import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BlogFilter } from "@/components/blog/BlogFilter";
import { getAllPosts, getAllTags } from "@/lib/mdx";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Thoughts on software development, technology, book reviews, and building things for the web.",
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  const allTags = await getAllTags();

  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Blog"
            subtitle="Technical deep-dives, book reviews, course notes, and random thoughts"
          />

          <BlogFilter posts={posts} allTags={allTags} />
        </div>
      </main>
      <Footer />
    </>
  );
}
