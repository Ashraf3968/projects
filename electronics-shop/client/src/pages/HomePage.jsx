import { ArrowRight, ShieldCheck, Truck, Headphones, Star, BadgePercent } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useSite } from "../context/SiteContext";
import SectionIntro from "../components/shop/SectionIntro";
import ProductCard from "../components/shop/ProductCard";
import RatingStars from "../components/shop/RatingStars";

const highlights = [
  { icon: ShieldCheck, title: "Verified Products", body: "Reliable sourcing, transparent pricing, and support you can trust." },
  { icon: Truck, title: "Fast Fulfillment", body: "Local delivery-ready workflows for quick dispatch and smooth order updates." },
  { icon: Headphones, title: "Real Assistance", body: "Human guidance across product selection, setup, and after-sales questions." }
];

const HomePage = () => {
  const { data } = useSite();
  const { addItem } = useCart();
  const { settings, banners, featuredProducts, reviews } = data;

  return (
    <div className="space-y-24">
      <section className="section-shell grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-emerald-200">
            <BadgePercent size={14} /> {settings.offer_banner}
          </div>
          <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-tight text-white sm:text-6xl">{settings.hero_title}</h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-300">{settings.hero_subtitle}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/products" className="btn-primary gap-2">Shop Now <ArrowRight size={16} /></Link>
            <Link to="/about" className="btn-secondary">Why Choose Us</Link>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {highlights.map((item) => (
              <div key={item.title} className="glass rounded-[24px] p-5">
                <item.icon className="text-sky-300" />
                <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-300">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="card relative overflow-hidden p-6">
          <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 via-transparent to-emerald-500/10" />
          <div className="relative space-y-5">
            {banners.map((banner) => (
              <div key={banner.id} className="rounded-[28px] border border-white/10 bg-slate-950/70 p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-sky-200">{banner.accent_text}</p>
                <h3 className="mt-3 text-2xl font-semibold">{banner.title}</h3>
                <p className="mt-3 text-sm text-slate-300">{banner.subtitle}</p>
                <Link to={banner.cta_link || "/products"} className="mt-5 inline-flex text-sm font-semibold text-emerald-300">{banner.cta_label || "Explore"}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell space-y-8">
        <SectionIntro eyebrow="Featured" title="Best-selling electronics curated for modern buyers." body="High-performance devices, lifestyle tech, and reliable accessories selected to make the storefront feel client-ready and trustworthy." />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {featuredProducts.map((product) => <ProductCard key={product.id} product={product} onAdd={addItem} />)}
        </div>
      </section>

      <section className="section-shell grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="card p-8">
          <SectionIntro eyebrow="Trust" title="Why customers choose us again and again." body={settings.trust_blurb} />
          <div className="mt-8 space-y-4 text-sm text-slate-300">
            <p>Premium product mix across mobiles, laptops, TVs, audio, wearables, and accessories.</p>
            <p>Single settings area for branding, contact methods, opening hours, and homepage content.</p>
            <p>Order records, reviews, enquiries, and email logs stored entirely in a local SQLite database.</p>
          </div>
        </div>
        <div className="card p-8">
          <SectionIntro eyebrow="Reviews" title="What shoppers say about the experience." body="Approved customer feedback appears here after moderation, reinforcing a genuine storefront feel." />
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {reviews.map((review) => (
              <div key={review.id} className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                <RatingStars value={review.rating} />
                <p className="mt-4 text-sm text-slate-300">“{review.comment}”</p>
                <p className="mt-4 text-sm font-semibold text-white">{review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
