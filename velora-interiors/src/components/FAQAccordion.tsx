"use client";

import { useState } from "react";

const faqs = [
  {
    question: "How long does a typical project take?",
    answer:
      "Most residential commissions span 12–20 weeks depending on scope and fabrication timelines. We deliver a detailed schedule after discovery.",
  },
  {
    question: "Do you work internationally?",
    answer:
      "Yes. Our studio supports projects across Europe, the Middle East, and North America with dedicated local partners for execution.",
  },
  {
    question: "Can you integrate existing furniture or art?",
    answer:
      "Absolutely. We specialize in integrating heirloom pieces into a refreshed design narrative that feels cohesive and modern.",
  },
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={faq.question} className="glass rounded-2xl">
            <button
              className="flex w-full items-center justify-between px-6 py-5 text-left text-sm font-semibold"
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              {faq.question}
              <span className="text-gold">{isOpen ? "–" : "+"}</span>
            </button>
            {isOpen ? <p className="px-6 pb-5 text-sm text-muted">{faq.answer}</p> : null}
          </div>
        );
      })}
    </div>
  );
}
