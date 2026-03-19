import { Clock3, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { useSite } from "../../context/SiteContext";

const Footer = () => {
  const { data } = useSite();
  const { settings, openingHours } = data;

  return (
    <footer className="border-t border-white/10 bg-slate-950/80 py-14">
      <div className="section-shell grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-sky-200">{settings.shop_name}</p>
          <h3 className="mt-3 text-3xl font-semibold">Modern electronics retail, built for trust.</h3>
          <p className="mt-4 max-w-xl text-sm text-slate-300">{settings.business_summary}</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-200">Quick Links</h4>
          <div className="mt-5 grid gap-3 text-sm text-slate-300">
            <Link to="/">Home</Link>
            <Link to="/about">About Us</Link>
            <Link to="/products">Products</Link>
            <Link to="/contact">Contact Us</Link>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-200">Opening Hours</h4>
          <div className="mt-5 space-y-3 text-sm text-slate-300">
            {openingHours.map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-4">
                <span>{item.day}</span>
                <span>{item.is_closed ? "Closed" : `${item.opens_at} - ${item.closes_at}`}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-200">Contact</h4>
          <div className="mt-5 space-y-4 text-sm text-slate-300">
            <p className="flex gap-3"><Phone size={16} className="mt-0.5 text-emerald-300" /> {settings.phone}</p>
            <p className="flex gap-3"><Mail size={16} className="mt-0.5 text-sky-300" /> {settings.email}</p>
            <p className="flex gap-3"><MapPin size={16} className="mt-0.5 text-amber-300" /> {settings.address}</p>
            <a className="flex gap-3" href={settings.instagram} target="_blank" rel="noreferrer"><Instagram size={16} className="mt-0.5 text-pink-300" /> {settings.instagram_handle}</a>
            <p className="flex gap-3"><Clock3 size={16} className="mt-0.5 text-slate-200" /> {settings.footer_note}</p>
          </div>
        </div>
      </div>
      <div className="section-shell mt-10 border-t border-white/10 pt-6 text-sm text-slate-400">© {new Date().getFullYear()} {settings.shop_name}. All rights reserved.</div>
    </footer>
  );
};

export default Footer;
