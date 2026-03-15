import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-6">
      <div className="glass rounded-3xl px-10 py-12 text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-gold">Error 404</p>
        <h1 className="mt-4 font-display text-3xl">This page has moved into a private collection.</h1>
        <p className="mt-4 text-sm text-muted">Let’s guide you back to the curated spaces.</p>
        <Link href="/" className="btn-primary mt-6 inline-flex">
          Return Home
        </Link>
      </div>
    </div>
  );
}
