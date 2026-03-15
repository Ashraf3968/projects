import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-obsidian">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-16 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <Link href="/" className="flex items-center gap-3 font-display text-lg">
            <span className="h-3 w-3 rounded-full bg-gradient-to-br from-gold to-[#fff1c2] shadow-gold" />
            Velora<span className="text-gold">Interiors</span>
          </Link>
          <p className="mt-4 text-sm text-muted">
            Luxury interior design studio crafting bespoke environments for residential estates, hospitality, and
            executive spaces.
          </p>
        </div>
        <div className="space-y-3 text-sm text-muted">
          <p className="text-platinum">Navigation</p>
          <Link href="/about" className="block hover:text-platinum">About</Link>
          <Link href="/services" className="block hover:text-platinum">Services</Link>
          <Link href="/projects" className="block hover:text-platinum">Projects</Link>
          <Link href="/contact" className="block hover:text-platinum">Contact</Link>
        </div>
        <div className="space-y-3 text-sm text-muted">
          <p className="text-platinum">Studio</p>
          <p>Paris • New York • Dubai</p>
          <p>Private consultations by appointment</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-platinum">Instagram</a>
            <a href="#" className="hover:text-platinum">Pinterest</a>
            <a href="#" className="hover:text-platinum">LinkedIn</a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/5 py-6 text-center text-xs text-muted">
        © 2026 Velora Interiors. All rights reserved.
      </div>
    </footer>
  );
}
