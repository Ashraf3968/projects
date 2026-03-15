"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { testimonials } from "@/data/site";

export default function TestimonialSlider() {
  const [index, setIndex] = useState(0);
  const testimonial = testimonials[index];

  const next = () => setIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="glass rounded-3xl p-8">
      <div className="flex items-center justify-between">
        <p className="text-sm uppercase tracking-[0.35em] text-gold">Client Voices</p>
        <div className="flex gap-2">
          <button className="btn-ghost h-9 w-9 p-0" onClick={prev} aria-label="Previous">
            ←
          </button>
          <button className="btn-ghost h-9 w-9 p-0" onClick={next} aria-label="Next">
            →
          </button>
        </div>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={testimonial.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="mt-6"
        >
          <div className="text-gold">★★★★★</div>
          <p className="mt-4 text-lg text-platinum">“{testimonial.quote}”</p>
          <div className="mt-6 text-sm text-muted">
            <span className="font-semibold text-platinum">{testimonial.name}</span> · {testimonial.role}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
