const SectionIntro = ({ eyebrow, title, body, align = "left" }) => (
  <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}>
    <p className="text-xs uppercase tracking-[0.35em] text-sky-200">{eyebrow}</p>
    <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">{title}</h2>
    {body && <p className="mt-4 text-base text-slate-300">{body}</p>}
  </div>
);

export default SectionIntro;
