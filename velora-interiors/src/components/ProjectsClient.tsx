"use client";

import { useMemo, useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/site";

export default function ProjectsClient() {
  const categories = ["All", ...new Set(projects.map((project) => project.category))];
  const [active, setActive] = useState("All");

  const filtered = useMemo(() => {
    if (active === "All") return projects;
    return projects.filter((project) => project.category === active);
  }, [active]);

  return (
    <div>
      <div className="mt-8 flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category}
            className={`rounded-full px-4 py-2 text-sm transition ${
              active === category ? "bg-gold text-ink" : "border border-white/10 text-muted hover:text-platinum"
            }`}
            onClick={() => setActive(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((project) => (
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
  );
}
