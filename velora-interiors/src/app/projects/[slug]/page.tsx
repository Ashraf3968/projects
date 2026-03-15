import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { projects } from "@/data/site";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = projects.find((item) => item.slug === params.slug);
  if (!project) {
    return { title: "Project | Velora Interiors" };
  }
  return {
    title: `${project.title} | Velora Interiors`,
    description: project.summary,
  };
}
export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = projects.find((item) => item.slug === params.slug);

  if (!project) {
    notFound();
  }

  const currentIndex = projects.findIndex((item) => item.slug === project.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <div className="px-6">
      <section className="section mx-auto max-w-7xl space-y-10">
        <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-glass p-8">
          <img src={project.image} alt={project.title} className="h-80 w-full rounded-3xl object-cover" />
          <div className="mt-8 space-y-3">
            <p className="text-xs uppercase tracking-[0.35em] text-gold">Case Study</p>
            <h1 className="font-display text-4xl">{project.title}</h1>
            <p className="text-muted">{project.location} • {project.category}</p>
          </div>
        </div>
      </section>

      <section className="section mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <SectionHeading
              eyebrow="Overview"
              title="Project overview"
              subtitle={project.summary}
            />
            <Reveal>
              <div className="glass rounded-3xl p-6 text-sm text-muted">
                <p><span className="text-platinum">Client:</span> {project.client}</p>
                <p className="mt-2"><span className="text-platinum">Scope:</span> {project.scope}</p>
                <p className="mt-2"><span className="text-platinum">Location:</span> {project.location}</p>
              </div>
            </Reveal>
            <Reveal>
              <div className="glass rounded-3xl p-6">
                <h3 className="font-display text-2xl">Client goals</h3>
                <p className="mt-4 text-sm text-muted">{project.goals}</p>
              </div>
            </Reveal>
            <Reveal>
              <div className="glass rounded-3xl p-6">
                <h3 className="font-display text-2xl">Challenges</h3>
                <p className="mt-4 text-sm text-muted">{project.challenge}</p>
              </div>
            </Reveal>
            <Reveal>
              <div className="glass rounded-3xl p-6">
                <h3 className="font-display text-2xl">Design solution</h3>
                <p className="mt-4 text-sm text-muted">{project.solution}</p>
              </div>
            </Reveal>
          </div>
          <Reveal>
            <div className="glass rounded-3xl p-6">
              <h3 className="font-display text-2xl">Results</h3>
              <p className="mt-4 text-sm text-muted">{project.results}</p>
              <div className="mt-6 rounded-2xl border border-white/10 bg-obsidian/80 p-5">
                <p className="text-sm text-muted">Client testimonial</p>
                <p className="mt-3 text-platinum">“{project.testimonial}”</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Gallery"
          title="Visual moments from the project."
          subtitle="A glimpse into the textures, lighting, and curated storytelling layers."
        />
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {project.gallery.map((image) => (
            <Reveal key={image}>
              <img src={image} alt={project.title} className="h-60 w-full rounded-3xl object-cover" />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="glass-strong flex flex-col items-start justify-between gap-6 rounded-[36px] px-8 py-10 md:flex-row md:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-gold">Next project</p>
              <h3 className="mt-3 font-display text-2xl">{nextProject.title}</h3>
              <p className="text-sm text-muted">{nextProject.summary}</p>
            </div>
            <Link href={`/projects/${nextProject.slug}`} className="btn-primary">
              View Case Study
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}




