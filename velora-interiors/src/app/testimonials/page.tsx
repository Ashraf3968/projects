import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { testimonials, clients } from "@/data/site";

export const metadata: Metadata = {
  title: "Testimonials | Velora Interiors",
  description:
    "Read client testimonials and trust indicators from luxury residential, commercial, and hospitality partners.",
};
export default function TestimonialsPage() {
  return (
    <div className="px-6">
      <section className="section mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Testimonials"
          title="Trusted by discerning clients worldwide."
          subtitle="Our partnerships span private estates, hospitality groups, and executive headquarters." 
        />
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {testimonials.map((item) => (
            <Reveal key={item.name}>
              <div className="glass rounded-3xl p-6">
                <div className="text-gold">?????</div>
                <p className="mt-4 text-sm text-muted">“{item.quote}”</p>
                <p className="mt-4 text-sm text-platinum">
                  {item.name} · <span className="text-muted">{item.role}</span>
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Clients"
          title="Global partners who trust our discretion."
          subtitle="We collaborate with hospitality groups, investment firms, and private estates across continents."
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {clients.map((client) => (
            <Reveal key={client}>
              <div className="glass rounded-3xl px-6 py-5 text-center text-sm text-muted">
                {client}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Case Study Snippets"
          title="Highlights from recent commissions."
          subtitle="A glimpse into the outcomes delivered across residential and hospitality spaces."
        />
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Montclair Residence",
              detail: "Expanded the estate footprint with a light-driven gallery wing and couture dressing suite.",
            },
            {
              title: "Lumiere Boutique Hotel",
              detail: "Reimagined the lobby experience, increasing guest dwell time by 26%.",
            },
            {
              title: "Citrine Executive Suites",
              detail: "Designed a calm, private environment for global leadership briefings.",
            },
          ].map((snippet) => (
            <Reveal key={snippet.title}>
              <div className="glass rounded-3xl p-6">
                <h4 className="font-display text-lg">{snippet.title}</h4>
                <p className="mt-3 text-sm text-muted">{snippet.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}




