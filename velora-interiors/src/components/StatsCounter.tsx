"use client";

import { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type Props = {
  value: number;
  label: string;
};

export default function StatsCounter({ value, label }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let current = 0;
    const increment = Math.max(1, Math.floor(value / 60));
    const step = () => {
      current += increment;
      if (current >= value) {
        setCount(value);
      } else {
        setCount(current);
        requestAnimationFrame(step);
      }
    };
    step();
  }, [inView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="glass rounded-3xl p-6 text-center"
    >
      <div className="font-display text-3xl text-platinum">{count}</div>
      <p className="mt-2 text-sm text-muted">{label}</p>
    </motion.div>
  );
}
