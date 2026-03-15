export default function ProjectLoading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-2 border-white/20 border-t-gold" />
        <p className="text-xs uppercase tracking-[0.35em] text-muted">Loading case study</p>
      </div>
    </div>
  );
}
