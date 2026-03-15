import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import ProjectsClient from "@/components/ProjectsClient";

export const metadata: Metadata = {
  title: "Projects | Velora Interiors",
  description: "Explore Velora Interiors case studies and luxury design projects across the globe.",
};

export default function ProjectsPage() {
  return (
    <div className="px-6">
      <section className="section mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Projects"
          title="A portfolio of bespoke environments across continents."
          subtitle="Explore curated case studies that showcase our design process, client outcomes, and signature style."
        />
        <ProjectsClient />
      </section>
    </div>
  );
}
