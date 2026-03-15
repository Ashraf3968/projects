import Link from "next/link";

type ProjectCardProps = {
  image: string;
  title: string;
  category: string;
  description: string;
  href: string;
};

export default function ProjectCard({ image, title, category, description, href }: ProjectCardProps) {
  return (
    <Link href={href} className="group glass rounded-3xl p-5 transition hover:-translate-y-1 hover:shadow-glow">
      <div className="relative overflow-hidden rounded-2xl">
        <img src={image} alt={title} className="h-52 w-full object-cover transition duration-500 group-hover:scale-105" />
        <span className="absolute left-4 top-4 rounded-full bg-ink/70 px-3 py-1 text-xs uppercase tracking-[0.2em] text-platinum">
          {category}
        </span>
      </div>
      <div className="mt-5 space-y-2">
        <h3 className="font-display text-xl text-platinum">{title}</h3>
        <p className="text-sm text-muted">{description}</p>
        <div className="text-sm text-gold">View Project →</div>
      </div>
    </Link>
  );
}
