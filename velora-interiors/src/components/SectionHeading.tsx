type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
};

export default function SectionHeading({ eyebrow, title, subtitle, align = "left" }: SectionHeadingProps) {
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      <p className="text-xs uppercase tracking-[0.35em] text-gold">{eyebrow}</p>
      <h2 className="mt-4 font-display text-3xl md:text-4xl">{title}</h2>
      {subtitle ? <p className="mt-4 text-muted">{subtitle}</p> : null}
    </div>
  );
}
