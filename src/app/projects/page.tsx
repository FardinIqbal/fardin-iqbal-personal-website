import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProjectsList } from "@/components/projects/ProjectsList";
import { getProjects, getProjectCategories } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A collection of projects spanning systems programming, AI infrastructure, and full-stack development.",
};

export default function ProjectsPage() {
  const projects = getProjects();
  const categories = getProjectCategories();

  return (
    <>
      <Header />
      <main id="main" className="min-h-screen pt-24 pb-20 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-16">
            <h1 className="font-display text-4xl md:text-5xl font-medium text-foreground tracking-tight mb-4">
              Projects
            </h1>
            <p className="font-body text-lg text-foreground-secondary max-w-2xl">
              A collection of projects spanning systems programming, AI infrastructure, and full-stack development.
            </p>
          </div>

          <ProjectsList projects={projects} categories={categories} />
        </div>
      </main>
      <Footer />
    </>
  );
}
