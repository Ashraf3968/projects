"use client";

import { useEffect, useState } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-6 right-6 z-40 h-11 w-11 rounded-full border border-white/15 bg-obsidian/80 text-sm text-platinum transition ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-label="Back to top"
    >
      ↑
    </button>
  );
}
