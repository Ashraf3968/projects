import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import ServiceCard from "@/components/ServiceCard";
import ProjectCard from "@/components/ProjectCard";
import StatsCounter from "@/components/StatsCounter";
import TestimonialSlider from "@/components/TestimonialSlider";
import FAQAccordion from "@/components/FAQAccordion";
import { projects, services, stats, processSteps } from "@/data/site";

export const metadata: Metadata = {
  title: "Velora Interiors | Luxury Interior Design",
  description:
    "Luxury interior design and architecture studio creating bespoke residential and commercial environments worldwide.",
};
export default function HomePage() {
  return (
    <div>
      <section className="relative overflow-hidden px-6 pb-16 pt-20 md:pb-24 lg:pt-28">
        <div className="grid-dots absolute inset-0 opacity-30" />
        <div className="absolute -right-32 top-16 h-80 w-80 rounded-full bg-gold/30 blur-3xl" />
        <div className="absolute -left-24 bottom-10 h-72 w-72 rounded-full bg-indigo-500/30 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.35em] text-gold">Velora Interiors</p>
            <h1 className="font-display text-4xl leading-tight md:text-6xl">
              Luxury spaces curated for those who lead with taste.
            </h1>
            <p className="max-w-xl text-muted">
              We craft bespoke residential and commercial interiors that blend timeless elegance with modern precision. Every
              detail is orchestrated to elevate how you live, host, and inspire.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="btn-primary">
                Start a Project
              </Link>
              <Link href="/projects" className="btn-outline">
                Explore Work
              </Link>
            </div>
            <div className="grid gap-6 rounded-3xl border border-white/10 bg-glass px-6 py-5 md:grid-cols-3">
              <div>
                <p className="font-display text-2xl">4.9/5</p>
                <p className="text-xs text-muted">Client satisfaction</p>
              </div>
              <div>
                <p className="font-display text-2xl">120+</p>
                <p className="text-xs text-muted">Spaces elevated</p>
              </div>
              <div>
                <p className="font-display text-2xl">12</p>
                <p className="text-xs text-muted">Design awards</p>
              </div>
            </div>
          </div>
          <Reveal>
            <div className="glass rounded-[32px] p-4 shadow-glow">
              <img
                src="https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80"
                alt="Velora luxury interior"
                className="h-80 w-full rounded-3xl object-cover"
              />
              <div className="mt-5 space-y-2 px-2">
                <p className="text-xs uppercase tracking-[0.3em] text-muted">Signature Project</p>
                <p className="font-display text-xl">Emberline Penthouse</p>
                <p className="text-sm text-muted">Paris • Residential</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section px-6">
        <div className="mx-auto max-w-7xl space-y-12">
          <SectionHeading
            eyebrow="Services"
            title="Luxury design services crafted for every scale."
            subtitle="From private residences to flagship spaces, our team orchestrates every detail with restraint, harmony, and precision."
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {services.slice(0, 6).map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </div>
      </section>

      <section className="section px-6">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-6">
            <SectionHeading
              eyebrow="Featured Project"
              title="A sculptural penthouse layered with stone, brass, and panoramic city views."
              subtitle="Emberline Penthouse is a signature residential commission that blends heritage architecture with contemporary craft."
            />
            <Link href="/projects/emberline-penthouse" className="btn-primary">
              View Case Study
            </Link>
          </div>
          <Reveal>
            <div className="glass rounded-3xl p-6">
              <img
                src={projects[0].image}
                alt={projects[0].title}
                className="h-72 w-full rounded-2xl object-cover"
              />
              <div className="mt-5 grid gap-3 text-sm text-muted">
                <p>Client: {projects[0].client}</p>
                <p>Scope: {projects[0].scope}</p>
                <p>Location: {projects[0].location}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section px-6">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1fr]">
          <Reveal>
            <div className="glass rounded-3xl p-8">
              <p className="text-xs uppercase tracking-[0.3em] text-gold">Why Velora</p>
              <h3 className="mt-4 font-display text-2xl">Precision, discretion, and a white-glove experience.</h3>
              <ul className="mt-6 space-y-3 text-sm text-muted">
                <li>Exclusive access to global ateliers and bespoke makers.</li>
                <li>Weekly concierge updates with timeline transparency.</li>
                <li>Immersive 3D visualization before fabrication begins.</li>
                <li>Dedicated project leadership from concept to reveal.</li>
              </ul>
            </div>
          </Reveal>
          <div className="space-y-6">
            <SectionHeading
              eyebrow="Process"
              title="A refined journey from discovery to final styling."
              subtitle="Our approach ensures every milestone is clear, collaborative, and elevated."
            />
            <div className="space-y-4">
              {processSteps.map((step, index) => (
                <Reveal key={step.title} delay={index * 0.1}>
                  <div className="flex items-start gap-4 rounded-3xl border border-white/10 bg-glass px-6 py-5">
                    <div className="font-display text-2xl text-gold">0{index + 1}</div>
                    <div>
                      <h4 className="font-display text-lg">{step.title}</h4>
                      <p className="text-sm text-muted">{step.detail}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section px-6">
        <div className="mx-auto max-w-7xl space-y-12">
          <SectionHeading
            eyebrow="Portfolio"
            title="Curated environments with a signature Velora presence."
            subtitle="Each project blends architectural legacy, material innovation, and storytelling design."
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard
                key={project.slug}
                image={project.image}
                title={project.title}
                category={project.category}
                description={project.summary}
                href={`/projects/${project.slug}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section px-6">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8">
            <SectionHeading
              eyebrow="Testimonials"
              title="Trusted by discerning clients worldwide."
              subtitle="We partner with collectors, hospitality leaders, and visionaries who expect a seamless, white-glove experience."
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {stats.map((stat) => (
                <StatsCounter key={stat.label} value={stat.value} label={stat.label} />
              ))}
            </div>
          </div>
          <TestimonialSlider />
        </div>
      </section>

      <section className="section px-6">
        <div className="mx-auto max-w-7xl space-y-10">
          <SectionHeading
            eyebrow="FAQ"
            title="Answers to the questions we hear most."
            subtitle="Luxury projects deserve clarity. Here is what clients typically ask before partnering with us."
          />
          <FAQAccordion />
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="glass-strong grid gap-8 rounded-[36px] px-8 py-12 md:grid-cols-[1.2fr_0.8fr] md:px-12">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-gold">Begin your project</p>
              <h3 className="mt-4 font-display text-3xl">Ready to craft a space with lasting presence?</h3>
              <p className="mt-4 text-muted">
                Share your scope and timeline. Our concierge team responds within two business days with a curated next step.
              </p>
            </div>
            <div className="flex flex-col justify-center gap-4">
              <Link href="/contact" className="btn-primary w-full">
                Book a Consultation
              </Link>
              <Link href="/projects" className="btn-outline w-full">
                Explore the Portfolio
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}




