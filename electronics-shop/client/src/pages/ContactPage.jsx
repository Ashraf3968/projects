import { useState } from "react";
import { Instagram, Mail, MapPin, MessageCircleMore, PhoneCall } from "lucide-react";
import { api } from "../api/client";
import { useSite } from "../context/SiteContext";
import SectionIntro from "../components/shop/SectionIntro";

const ContactPage = () => {
  const { data } = useSite();
  const { settings } = data;
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [feedback, setFeedback] = useState({ type: "", message: "" });

  const submit = async (event) => {
    event.preventDefault();
    try {
      const result = await api.contact(form);
      setFeedback({ type: "success", message: result.message });
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      setFeedback({ type: "error", message: error.message });
    }
  };

  return (
    <div className="section-shell space-y-8">
      <SectionIntro eyebrow="Contact" title="Speak with the team through the channel your customers prefer." body="The page includes local form handling plus direct call, WhatsApp, and Instagram actions, all controlled from admin-managed settings." />
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="card space-y-5 p-8">
          <a href={`tel:${settings.phone}`} className="flex items-center gap-3 rounded-[22px] border border-white/10 p-4 text-sm text-slate-200"><PhoneCall className="text-sky-300" /> {settings.phone}</a>
          <a href={`mailto:${settings.email}`} className="flex items-center gap-3 rounded-[22px] border border-white/10 p-4 text-sm text-slate-200"><Mail className="text-emerald-300" /> {settings.email}</a>
          <a href={`https://wa.me/${String(settings.whatsapp || "").replace(/[^\d]/g, "")}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-[22px] border border-white/10 p-4 text-sm text-slate-200"><MessageCircleMore className="text-emerald-300" /> WhatsApp Chat</a>
          <a href={settings.instagram} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-[22px] border border-white/10 p-4 text-sm text-slate-200"><Instagram className="text-pink-300" /> Instagram</a>
          <div className="rounded-[22px] border border-white/10 p-4 text-sm text-slate-200"><MapPin className="mb-3 text-amber-300" /> {settings.address}</div>
          <div className="rounded-[22px] border border-dashed border-white/10 p-5 text-sm text-slate-400">{settings.map_placeholder}</div>
        </div>
        <form onSubmit={submit} className="card grid gap-4 p-8 sm:grid-cols-2">
          <input className="input" placeholder="Full name" value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} />
          <input className="input" placeholder="Email address" value={form.email} onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))} />
          <input className="input" placeholder="Phone number" value={form.phone} onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))} />
          <input className="input" placeholder="Subject" value={form.subject} onChange={(event) => setForm((current) => ({ ...current, subject: event.target.value }))} />
          <textarea className="input min-h-40 sm:col-span-2" placeholder="How can we help?" value={form.message} onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))} />
          {feedback.message && <p className={`text-sm sm:col-span-2 ${feedback.type === "success" ? "text-emerald-300" : "text-red-300"}`}>{feedback.message}</p>}
          <button className="btn-primary sm:col-span-2" type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
