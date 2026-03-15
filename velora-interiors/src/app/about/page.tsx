import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About | Velora Interiors",
  description:
    "Discover the story, mission, and leadership behind Velora Interiors, a luxury interior design and architecture studio.",
};
export default function AboutPage() {
  return (
    <div className="px-6">
      <section className="section mx-auto max-w-7xl space-y-10">
        <SectionHeading
          eyebrow="About Velora"
          title="Designing environments that feel effortlessly refined."
          subtitle="Velora Interiors is a boutique studio trusted by collectors, hospitality leaders, and visionaries who expect a seamless, white-glove experience from concept to final styling."
        />
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <div className="glass rounded-3xl p-8">
              <h3 className="font-display text-2xl">Brand Story</h3>
              <p className="mt-4 text-sm text-muted">
                Founded in 2012, Velora emerged from a desire to translate heritage architecture into contemporary sanctuaries.
                Our studio is known for restrained palettes, impeccable craftsmanship, and an obsessive attention to detail.
              </p>
              <p className="mt-4 text-sm text-muted">
                From private residences to landmark hospitality spaces, we approach every commission with the same precision and
                discretion.
              </p>
            </div>
          </Reveal>
          <Reveal>
            <div className="glass rounded-3xl p-8">
              <h3 className="font-display text-2xl">Mission & Vision</h3>
              <p className="mt-4 text-sm text-muted">
                Our mission is to create interiors that reflect the identity of our clients while advancing sustainable luxury
                through conscious sourcing, artisanal partnerships, and intelligent planning.
              </p>
              <p className="mt-4 text-sm text-muted">
                We envision spaces that continue to appreciate in cultural relevance and emotional resonance over time.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-2">
          <Reveal>
            <div className="glass rounded-3xl p-8">
              <h3 className="font-display text-2xl">Values</h3>
              <ul className="mt-5 space-y-3 text-sm text-muted">
                <li>Discretion and trust with every client relationship.</li>
                <li>Craftsmanship anchored in global artisan partnerships.</li>
                <li>Curated storytelling through texture, light, and form.</li>
                <li>Precision project management with white-glove updates.</li>
              </ul>
            </div>
          </Reveal>
          <Reveal>
            <div className="glass rounded-3xl p-8">
              <h3 className="font-display text-2xl">Why We’re Trusted</h3>
              <p className="mt-4 text-sm text-muted">
                Clients trust Velora for our discretion, our ability to synthesize complex requirements, and our disciplined
                ability to deliver on time. Every project is led by principal designers with a dedicated concierge team.
              </p>
              <p className="mt-4 text-sm text-muted">
                We create calm within complexity and elevate each environment to feel unmistakably personal.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Leadership"
          title="A multidisciplinary team of design strategists and artisans."
          subtitle="Our studio blends architecture, interior styling, and project management expertise to deliver high-performing spaces."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {["Isla Montclair", "Theo Renaud", "Selene Park"].map((name) => (
            <Reveal key={name}>
              <div className="glass rounded-3xl p-6">
                <img
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80"
                  alt={name}
                  className="h-56 w-full rounded-2xl object-cover"
                />
                <h4 className="mt-4 font-display text-lg">{name}</h4>
                <p className="text-sm text-muted">Principal Designer</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Journey"
          title="A decade of shaping iconic interiors."
          subtitle="From boutique residences to global hospitality, Velora has expanded with a measured, intentional approach."
        />
        <div className="mt-8 space-y-4">
          {[
            { year: "2012", detail: "Velora Interiors founded in Paris with a focus on heritage apartments." },
            { year: "2016", detail: "Expanded to New York with a dedicated commercial design team." },
            { year: "2019", detail: "Awarded International Design Guild recognition for hospitality excellence." },
            { year: "2023", detail: "Opened Dubai studio to serve Middle East luxury hospitality." },
          ].map((item) => (
            <Reveal key={item.year}>
              <div className="flex items-center gap-6 rounded-3xl border border-white/10 bg-glass px-6 py-5">
                <div className="font-display text-2xl text-gold">{item.year}</div>
                <p className="text-sm text-muted">{item.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}






