import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjects } from "@/lib/content";
import { ProjectEssay } from "@/components/projects/ProjectEssay";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = getProjects();
  return projects.map((project) => ({ slug: project.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const projects = getProjects();
  const project = projects.find((p) => p.id === slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: `${project.title} | Fardin Iqbal`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: "article",
      authors: ["Fardin Iqbal"],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const projects = getProjects();
  const project = projects.find((p) => p.id === slug);

  if (!project) {
    notFound();
  }

  return <ProjectEssay project={project} />;
}
