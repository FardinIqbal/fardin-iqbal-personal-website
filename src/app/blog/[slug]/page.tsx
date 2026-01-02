import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getAllPosts, getPostBySlug } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";
import { SkillBadge } from "@/components/ui/SkillBadge";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: ["Fardin Iqbal"],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 pb-20">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-foreground-muted hover:text-primary-400 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to blog
          </Link>

          {/* Header */}
          <header className="mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span className="gradient-text">{post.title}</span>
            </h1>

            <p className="text-foreground-muted text-lg mb-6">
              {post.description}
            </p>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-foreground-muted mb-6">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {post.readingTime}
              </span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <SkillBadge key={tag} name={tag} size="sm" />
              ))}
            </div>
          </header>

          {/* Content */}
          <div
            className="prose prose-lg max-w-none
              prose-headings:text-foreground prose-headings:font-semibold
              prose-h1:text-3xl prose-h1:mt-12 prose-h1:mb-4
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-foreground-muted prose-p:leading-relaxed prose-p:mb-4
              prose-a:text-primary-400 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-foreground prose-strong:font-semibold
              prose-code:text-foreground prose-code:bg-background-tertiary prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
              prose-pre:bg-background-tertiary prose-pre:border prose-pre:border-border prose-pre:rounded-lg prose-pre:p-0 prose-pre:my-6
              prose-blockquote:border-l-primary-500 prose-blockquote:text-foreground-muted prose-blockquote:italic
              prose-ul:text-foreground-muted prose-ol:text-foreground-muted
              prose-li:marker:text-foreground-subtle
              prose-hr:border-border"
            dangerouslySetInnerHTML={{ __html: post.compiledContent }}
          />
        </article>
      </main>
      <Footer />
    </>
  );
}
