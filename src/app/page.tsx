import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { SkillsSection } from "@/components/sections/Skills";
import { ExperienceSection } from "@/components/sections/Experience";
import { ProjectsSection } from "@/components/sections/Projects";
import { InterestsSection } from "@/components/sections/Interests";
import { Contact } from "@/components/sections/Contact";
import { ImmersivePortfolioWrapper } from "@/components/immersive";

// Content loaders - run at build time for static export
import {
  getProfile,
  getExperience,
  getProjects,
  getProjectCategories,
  getSkillCategories,
  getBooks,
  getMedia,
  getCourses,
} from "@/lib/content";

export default function Home() {
  // All data loading happens at build time (static export)
  const profile = getProfile();
  const experience = getExperience();
  const projects = getProjects();
  const projectCategories = getProjectCategories();
  const skills = getSkillCategories();
  const books = getBooks();
  const media = getMedia();
  const courses = getCourses();

  return (
    <ImmersivePortfolioWrapper>
      <Header />
      <main>
        <Hero profile={profile} />
        <About profile={profile} />
        <SkillsSection skills={skills} />
        <ExperienceSection experience={experience} />
        <ProjectsSection
          projects={projects}
          categories={projectCategories}
        />
        <InterestsSection books={books} media={media} courses={courses} />
        <Contact profile={profile} />
      </main>
      <Footer />
    </ImmersivePortfolioWrapper>
  );
}
