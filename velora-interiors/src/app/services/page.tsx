import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import Reveal from "@/components/Reveal";
import FAQAccordion from "@/components/FAQAccordion";
import { services } from "@/data/site";

export const metadata: Metadata = {
  title: "Services | Velora Interiors",
  description:
    "Explore luxury interior design services including residential, commercial, space planning, and bespoke curation.",
};
export default function ServicesPage() {
  return (
    <div className="px-6">
      <section className="section mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Services"
          title="Luxury design services crafted for elevated living."
          subtitle="Our studio delivers comprehensive design leadership for residential estates, hospitality spaces, and executive environments."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </section>

      <section className="section mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <div className="glass rounded-3xl p-8">
              <p className="text-xs uppercase tracking-[0.3em] text-gold">White-Glove Service</p>
              <h3 className="mt-4 font-display text-2xl">What clients receive</h3>
              <ul className="mt-6 space-y-3 text-sm text-muted">
                <li>Dedicated design lead and concierge project manager.</li>
                <li>Access to global artisan partners and custom fabrication.</li>
                <li>Weekly reporting with timeline, procurement, and build updates.</li>
                <li>Full post-install styling and handover experience.</li>
              </ul>
            </div>
          </Reveal>
          <Reveal>
            <div className="glass rounded-3xl p-8">
              <p className="text-xs uppercase tracking-[0.3em] text-gold">FAQ</p>
              <h3 className="mt-4 font-display text-2xl">Planning a luxury project?</h3>
              <div className="mt-6">
                <FAQAccordion />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="glass-strong grid gap-6 rounded-[36px] px-8 py-12 md:grid-cols-[1.2fr_0.8fr] md:px-12">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-gold">Elevate your space</p>
              <h3 className="mt-4 font-display text-3xl">Let’s design an environment that feels unmistakably yours.</h3>
              <p className="mt-4 text-muted">
                We curate a tailored proposal with timelines, investment range, and a creative roadmap within days.
              </p>
            </div>
            <div className="flex flex-col justify-center gap-4">
              <Link href="/contact" className="btn-primary w-full">
                Request a Proposal
              </Link>
              <Link href="/projects" className="btn-outline w-full">
                View Case Studies
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}



