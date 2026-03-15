import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact | Velora Interiors",
  description:
    "Connect with Velora Interiors for luxury residential and commercial design consultations worldwide.",
};
export default function ContactPage() {
  return (
    <div className="px-6">
      <section className="section mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Contact"
          title="Begin your Velora experience."
          subtitle="Share the scope and timeline of your project. Our team responds within two business days."
        />
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <ContactForm />
          <div className="space-y-6">
            <Reveal>
              <div className="glass rounded-3xl p-6">
                <h3 className="font-display text-2xl">Studio</h3>
                <p className="mt-3 text-sm text-muted">18 Rue Saint-Honoré, Paris</p>
                <p className="text-sm text-muted">+33 1 84 22 11 98</p>
                <p className="text-sm text-muted">concierge@velorainteriors.com</p>
              </div>
            </Reveal>
            <Reveal>
              <div className="glass rounded-3xl p-6">
                <h3 className="font-display text-2xl">Office Locations</h3>
                <p className="mt-3 text-sm text-muted">Paris • New York • Dubai</p>
                <p className="text-sm text-muted">Private consultations by appointment</p>
              </div>
            </Reveal>
            <Reveal>
              <div className="glass rounded-3xl p-6">
                <h3 className="font-display text-2xl">Social</h3>
                <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted">
                  <a href="#" className="hover:text-platinum">Instagram</a>
                  <a href="#" className="hover:text-platinum">Pinterest</a>
                  <a href="#" className="hover:text-platinum">Behance</a>
                  <a href="#" className="hover:text-platinum">LinkedIn</a>
                </div>
              </div>
            </Reveal>
            <Reveal>
              <div className="glass rounded-3xl p-6 text-center">
                <p className="text-xs uppercase tracking-[0.3em] text-muted">Map Preview</p>
                <div className="mt-4 h-40 rounded-2xl border border-white/10 bg-obsidian/70" />
                <p className="mt-3 text-sm text-muted">Luxury design district, Paris</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}




