import { Instagram, MessageCircleMore, PhoneCall } from "lucide-react";
import { useBranding } from "../../hooks/useBranding";

const FloatingContacts = () => {
  const branding = useBranding();

  return (
    <div className="fixed bottom-5 right-5 z-30 flex flex-col gap-3">
      <a href={`tel:${branding.phone}`} className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-500 text-slate-950 shadow-soft transition hover:scale-105"><PhoneCall size={18} /></a>
      <a href={`https://wa.me/${String(branding.whatsapp || "").replace(/[^\d]/g, "")}`} target="_blank" rel="noreferrer" className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-slate-950 shadow-soft transition hover:scale-105"><MessageCircleMore size={18} /></a>
      <a href={branding.instagram} target="_blank" rel="noreferrer" className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-500 text-slate-950 shadow-soft transition hover:scale-105"><Instagram size={18} /></a>
    </div>
  );
};

export default FloatingContacts;
