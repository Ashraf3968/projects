import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { ShoppingCart, User, Menu, PhoneCall } from "lucide-react";
import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useSite } from "../../context/SiteContext";
import Footer from "./Footer";
import FloatingContacts from "./FloatingContacts";
import { classNames } from "../../lib/utils";

const MainLayout = () => {
  const [open, setOpen] = useState(false);
  const { items } = useCart();
  const { user, logout } = useAuth();
  const { data } = useSite();
  const navigate = useNavigate();
  const settings = data.settings;

  const navItems = [
    ["/", "Home"],
    ["/about", "About"],
    ["/products", "Products"],
    ["/contact", "Contact"]
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="section-shell pt-5">
        <header className="glass sticky top-4 z-30 rounded-full px-5 py-3 shadow-soft">
          <div className="flex items-center justify-between gap-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-emerald-400 font-black text-slate-950">{settings.logo_text}</div>
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-sky-200">Electronics Shop</p>
                <p className="text-lg font-semibold text-white">{settings.shop_name}</p>
              </div>
            </Link>

            <nav className="hidden items-center gap-1 lg:flex">
              {navItems.map(([to, label]) => (
                <NavLink key={to} to={to} className={({ isActive }) => classNames("rounded-full px-4 py-2 text-sm transition", isActive ? "bg-white/10 text-white" : "text-slate-300 hover:bg-white/5 hover:text-white")}>{label}</NavLink>
              ))}
            </nav>

            <div className="hidden items-center gap-3 lg:flex">
              <a href={`tel:${settings.phone}`} className="btn-secondary gap-2"><PhoneCall size={16} /> Call</a>
              <Link to="/cart" className="relative rounded-full border border-white/10 p-3 text-white transition hover:bg-white/10">
                <ShoppingCart size={18} />
                {items.length > 0 && <span className="absolute -right-1 -top-1 rounded-full bg-accent px-1.5 text-xs font-bold text-slate-950">{items.length}</span>}
              </Link>
              {user ? (
                <div className="flex items-center gap-3">
                  <button type="button" onClick={() => navigate(user.role === "admin" ? "/admin" : "/products")} className="btn-secondary gap-2"><User size={16} /> {user.name.split(" ")[0]}</button>
                  <button type="button" onClick={logout} className="text-sm text-slate-300 hover:text-white">Logout</button>
                </div>
              ) : (
                <Link to="/login" className="btn-primary">Login</Link>
              )}
            </div>

            <button type="button" onClick={() => setOpen((value) => !value)} className="rounded-full border border-white/10 p-3 text-white lg:hidden">
              <Menu size={18} />
            </button>
          </div>
          {open && (
            <div className="mt-4 grid gap-2 lg:hidden">
              {navItems.map(([to, label]) => (
                <NavLink key={to} to={to} onClick={() => setOpen(false)} className="rounded-2xl border border-white/10 px-4 py-3 text-sm text-slate-200 hover:bg-white/5">{label}</NavLink>
              ))}
              <Link to="/cart" onClick={() => setOpen(false)} className="rounded-2xl border border-white/10 px-4 py-3 text-sm text-slate-200 hover:bg-white/5">Cart ({items.length})</Link>
              {user ? (
                <>
                  {user.role === "admin" && <Link to="/admin" onClick={() => setOpen(false)} className="rounded-2xl border border-white/10 px-4 py-3 text-sm text-slate-200 hover:bg-white/5">Admin Panel</Link>}
                  <button type="button" onClick={() => { logout(); setOpen(false); }} className="rounded-2xl border border-white/10 px-4 py-3 text-left text-sm text-slate-200 hover:bg-white/5">Logout</button>
                </>
              ) : (
                <Link to="/login" onClick={() => setOpen(false)} className="rounded-2xl border border-white/10 px-4 py-3 text-sm text-slate-200 hover:bg-white/5">Login</Link>
              )}
            </div>
          )}
        </header>
      </div>
      <main className="pb-24 pt-10">
        <Outlet />
      </main>
      <Footer />
      <FloatingContacts />
    </div>
  );
};

export default MainLayout;
