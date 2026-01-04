import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/mdx";
import { EssayPage } from "@/components/essays/EssayPage";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Script from "next/script";

interface Props {
  params: Promise<{ slug: string }>;
}

function generateArticleJsonLd(post: {
  title: string;
  description: string;
  date: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: "Fardin Iqbal",
      url: "https://fardin-portfolio-beryl.vercel.app",
    },
    publisher: {
      "@type": "Person",
      name: "Fardin Iqbal",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://fardin-portfolio-beryl.vercel.app/essays/${post.slug}`,
    },
  };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: "Essay Not Found" };
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

export default async function EssayPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const jsonLd = generateArticleJsonLd({
    title: post.title,
    description: post.description,
    date: post.date,
    slug,
  });

  return (
    <>
      <Script
        id="article-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <EssayPage
        title={post.title}
        description={post.description}
        date={post.date}
        readingTime={post.readingTime}
        tags={post.tags}
        compiledContent={post.compiledContent}
      />
      <Footer />
    </>
  );
}
