import Reveal from "@/components/Reveal";

type ServiceCardProps = {
  title: string;
  description: string;
  icon: string;
};

export default function ServiceCard({ title, description, icon }: ServiceCardProps) {
  return (
    <Reveal>
      <div className="glass rounded-3xl p-6 transition hover:-translate-y-1 hover:shadow-glow">
        <div className="text-2xl">{icon}</div>
        <h3 className="mt-4 font-display text-xl">{title}</h3>
        <p className="mt-3 text-sm text-muted">{description}</p>
        <div className="mt-5 text-sm text-gold">Explore →</div>
      </div>
    </Reveal>
  );
}
