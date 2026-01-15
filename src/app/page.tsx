import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { WorkSection } from "@/components/sections/Work";
import { WritingSection } from "@/components/sections/Writing";
import { Contact } from "@/components/sections/Contact";

// Content loaders - run at build time
import { getProfile, getProjects } from "@/lib/content";
import { getAllPosts } from "@/lib/mdx";

export default async function Home() {
  const profile = getProfile();
  const projects = getProjects();
  const posts = await getAllPosts();

  return (
    <>
      <Header />
      <main id="main">
        <Hero profile={profile} />
        <WorkSection projects={projects} />
        <WritingSection posts={posts} />
        <About profile={profile} />
        <Contact profile={profile} />
      </main>
      <Footer />
    </>
  );
}
