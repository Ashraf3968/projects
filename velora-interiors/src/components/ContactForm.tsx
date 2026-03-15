"use client";

import { useState } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      className="glass rounded-3xl p-6"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-xs uppercase tracking-[0.3em] text-muted">Full Name</label>
          <input
            className="mt-2 w-full rounded-2xl border border-white/10 bg-obsidian/70 px-4 py-3 text-sm"
            placeholder="Sophia Laurent"
            required
          />
        </div>
        <div>
          <label className="text-xs uppercase tracking-[0.3em] text-muted">Email</label>
          <input
            type="email"
            className="mt-2 w-full rounded-2xl border border-white/10 bg-obsidian/70 px-4 py-3 text-sm"
            placeholder="you@example.com"
            required
          />
        </div>
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-xs uppercase tracking-[0.3em] text-muted">Project Type</label>
          <select className="mt-2 w-full rounded-2xl border border-white/10 bg-obsidian/70 px-4 py-3 text-sm" required>
            <option value="">Select a service</option>
            <option>Luxury Residential</option>
            <option>Commercial / Hospitality</option>
            <option>Renovation Consulting</option>
          </select>
        </div>
        <div>
          <label className="text-xs uppercase tracking-[0.3em] text-muted">Estimated Budget</label>
          <select className="mt-2 w-full rounded-2xl border border-white/10 bg-obsidian/70 px-4 py-3 text-sm" required>
            <option value="">Choose range</option>
            <option>$150k - $300k</option>
            <option>$300k - $750k</option>
            <option>$750k+</option>
          </select>
        </div>
      </div>
      <div className="mt-4">
        <label className="text-xs uppercase tracking-[0.3em] text-muted">Project Details</label>
        <textarea
          className="mt-2 w-full rounded-2xl border border-white/10 bg-obsidian/70 px-4 py-3 text-sm"
          rows={4}
          placeholder="Tell us about your vision..."
          required
        />
      </div>
      <button type="submit" className="btn-primary mt-6 w-full">
        Submit Request
      </button>
      {submitted ? (
        <p className="mt-3 text-xs text-gold">Thank you. Our concierge team will respond within two business days.</p>
      ) : (
        <p className="mt-3 text-xs text-muted">By submitting, you agree to our privacy policy and concierge follow-up.</p>
      )}
    </form>
  );
}
