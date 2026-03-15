"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navLinks } from "@/data/site";
import { motion, AnimatePresence } from "framer-motion";

const projectMenu = [
  { href: "/projects", label: "Portfolio" },
  { href: "/projects/emberline-penthouse", label: "Case Studies" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-ink/70 backdrop-blur-xl">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-3 font-display text-lg">
          <span className="h-3 w-3 rounded-full bg-gradient-to-br from-gold to-[#fff1c2] shadow-gold" />
          Velora<span className="text-gold">Interiors</span>
        </Link>

        <div className="hidden items-center gap-8 text-sm text-muted lg:flex">
          {navLinks.map((link) => {
            if (link.href === "/projects") {
              return (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => setOpen(true)}
                  onMouseLeave={() => setOpen(false)}
                >
                  <button className={`flex items-center gap-2 ${pathname.startsWith("/projects") ? "text-platinum" : ""}`}>
                    Projects
                    <span className="text-xs">▾</span>
                  </button>
                  <AnimatePresence>
                    {open && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        className="absolute left-0 mt-3 w-48 rounded-2xl border border-white/10 bg-obsidian/90 p-3 shadow-glow"
                      >
                        {projectMenu.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="block rounded-xl px-3 py-2 text-sm text-muted transition hover:bg-white/10 hover:text-platinum"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            const isActive = pathname === link.href;
            return (
              <Link key={link.href} href={link.href} className={isActive ? "text-platinum" : "hover:text-platinum"}>
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/projects" className="btn-ghost">
            View Portfolio
          </Link>
          <Link href="/contact" className="btn-primary">
            Book Consultation
          </Link>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-platinum lg:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          <span className="text-lg">☰</span>
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-white/5 bg-ink/90 px-6 pb-6 lg:hidden"
          >
            <div className="mt-4 flex flex-col gap-4 text-sm text-muted">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={pathname === link.href ? "text-platinum" : ""}
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/contact" className="btn-primary w-full" onClick={() => setMenuOpen(false)}>
                Book Consultation
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
