import { ShieldCheck, Store, Wrench } from "lucide-react";
import { useSite } from "../context/SiteContext";
import SectionIntro from "../components/shop/SectionIntro";

const AboutPage = () => {
  const { data } = useSite();
  const { settings } = data;
  const values = [
    { icon: ShieldCheck, title: "Trust First", body: "Every product selection is guided by reliability, supportability, and transparent value." },
    { icon: Store, title: "Storefront Ready", body: "The site, catalog, and admin tools are organized to feel like a serious retail operation." },
    { icon: Wrench, title: "Built to Grow", body: "Local SQLite today, structured backend tomorrow. The codebase is prepared for future migration." }
  ];

  return (
    <div className="section-shell space-y-10">
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <div className="card p-8">
          <SectionIntro eyebrow="About Us" title={`Inside ${settings.shop_name}`} body={settings.business_summary} />
          <p className="mt-6 text-slate-300">We focus on practical premium electronics retail: clean buying experiences, strong category merchandising, and dependable local operations. This project is designed to look ready for real clients and real customers.</p>
          <p className="mt-4 text-slate-300">Because branding lives inside admin-managed settings, you can change the shop name, logo text, contact details, social links, address, and opening hours without touching code.</p>
        </div>
        <div className="card overflow-hidden">
          <img src="/placeholder-product.svg" alt="Showroom preview" className="h-full w-full object-cover" />
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {values.map((value) => (
          <div key={value.title} className="card p-6">
            <value.icon className="text-emerald-300" />
            <h3 className="mt-4 text-xl font-semibold">{value.title}</h3>
            <p className="mt-3 text-sm text-slate-300">{value.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutPage;
