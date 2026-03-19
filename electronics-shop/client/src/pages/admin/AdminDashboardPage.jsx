import { useEffect, useMemo, useState } from "react";
import { Boxes, ClipboardList, LayoutTemplate, MessageSquareText, PackagePlus, Palette, Search, Star, Users } from "lucide-react";
import { api } from "../../api/client";
import { useSite } from "../../context/SiteContext";
import { currency, formatDate, resolveMediaUrl } from "../../lib/utils";

const tabs = [
  { key: "Overview", icon: LayoutTemplate },
  { key: "Products", icon: PackagePlus },
  { key: "Orders", icon: ClipboardList },
  { key: "Reviews", icon: Star },
  { key: "Messages", icon: MessageSquareText },
  { key: "Branding", icon: Palette },
  { key: "Users", icon: Users },
  { key: "Categories", icon: Boxes }
];

const orderStatuses = ["pending", "processing", "shipped", "completed", "cancelled"];
const labelize = (value) => value.replace(/([A-Z])/g, " $1").replace(/^./, (char) => char.toUpperCase());
const tone = (value) => ({
  approved: "bg-emerald-400/10 text-emerald-200",
  pending: "bg-amber-400/10 text-amber-200",
  rejected: "bg-rose-400/10 text-rose-200",
  completed: "bg-emerald-400/10 text-emerald-200",
  processing: "bg-sky-400/10 text-sky-200",
  shipped: "bg-indigo-400/10 text-indigo-200",
  cancelled: "bg-rose-400/10 text-rose-200"
}[value] || "bg-white/10 text-slate-200");

const EmptyState = ({ title, body }) => (
  <div className="rounded-[24px] border border-dashed border-white/10 p-8 text-center">
    <p className="text-lg font-semibold text-white">{title}</p>
    <p className="mt-2 text-sm text-slate-400">{body}</p>
  </div>
);

const AdminDashboardPage = () => {
  const { refresh } = useSite();
  const [tab, setTab] = useState("Overview");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [productForm, setProductForm] = useState({ name: "", categoryId: "", shortDescription: "", description: "", price: "", comparePrice: "", stock: "", featured: false, popular: false, videoUrl: "", specs: "" });
  const [categoryForm, setCategoryForm] = useState({ name: "", description: "" });
  const [settingsForm, setSettingsForm] = useState({ settings: {}, openingHours: [], banners: [] });
  const [productImage, setProductImage] = useState(null);
  const [status, setStatus] = useState("");
  const [productSearch, setProductSearch] = useState("");

  const load = async () => {
    setLoading(true);
    const [dashboard, products, orders, reviews, messages, users, categories, settings] = await Promise.all([
      api.adminDashboard(),
      api.adminProducts(),
      api.adminOrders(),
      api.adminReviews(),
      api.adminMessages(),
      api.adminUsers(),
      api.adminCategories(),
      api.adminSettings()
    ]);
    setData({
      dashboard,
      products: products.products,
      orders: orders.orders,
      reviews: reviews.reviews,
      messages: messages.messages,
      users: users.users,
      categories: categories.categories,
      settings: settings.settings,
      openingHours: settings.openingHours,
      banners: settings.banners
    });
    setSettingsForm({ settings: settings.settings, openingHours: settings.openingHours, banners: settings.banners });
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const saveProduct = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    Object.entries(productForm).forEach(([key, value]) => formData.append(key, value));
    if (productImage) formData.append("image", productImage);
    await api.adminSaveProduct(formData);
    setStatus("Product saved.");
    setProductForm({ name: "", categoryId: "", shortDescription: "", description: "", price: "", comparePrice: "", stock: "", featured: false, popular: false, videoUrl: "", specs: "" });
    setProductImage(null);
    await load();
    await refresh();
  };

  const saveCategory = async (event) => {
    event.preventDefault();
    await api.adminSaveCategory(categoryForm);
    setStatus("Category saved.");
    setCategoryForm({ name: "", description: "" });
    await load();
    await refresh();
  };

  const saveSettings = async (event) => {
    event.preventDefault();
    await api.adminSaveSettings(settingsForm);
    setStatus("Branding and settings updated.");
    await load();
    await refresh();
  };

  const counts = useMemo(() => ({
    Products: data.products?.length || 0,
    Orders: data.orders?.length || 0,
    Reviews: data.reviews?.length || 0,
    Messages: data.messages?.length || 0,
    Users: data.users?.length || 0,
    Categories: data.categories?.length || 0
  }), [data]);

  const filteredProducts = useMemo(() => {
    const query = productSearch.trim().toLowerCase();
    if (!query) return data.products || [];
    return (data.products || []).filter((product) => product.name.toLowerCase().includes(query) || product.category?.name?.toLowerCase().includes(query) || product.short_description.toLowerCase().includes(query));
  }, [data.products, productSearch]);

  if (loading) return <div className="section-shell text-slate-300">Loading admin dashboard...</div>;

  return (
    <div className="section-shell grid gap-6 xl:grid-cols-[260px_1fr]">
      <aside className="card h-fit space-y-3 p-4 xl:sticky xl:top-6">
        <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
          <p className="text-xs uppercase tracking-[0.35em] text-sky-200">Digitquo Admin</p>
          <p className="mt-3 text-lg font-semibold text-white">{data.settings.shop_name}</p>
          <p className="mt-2 text-sm text-slate-400">Admin login: `admin@digitquo.com` / `digitquo@123`</p>
        </div>
        {tabs.map(({ key, icon: Icon }) => (
          <button key={key} type="button" onClick={() => setTab(key)} className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm transition ${tab === key ? "bg-white/10 text-white" : "text-slate-300 hover:bg-white/5"}`}>
            <span className="flex items-center gap-3"><Icon size={16} />{key}</span>
            {counts[key] ? <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs">{counts[key]}</span> : null}
          </button>
        ))}
      </aside>

      <section className="space-y-6">
        <div className="card overflow-hidden p-6">
          <div className="grid gap-6 lg:grid-cols-[1.35fr_0.85fr]">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-emerald-200">Control Center</p>
              <h1 className="mt-4 text-3xl font-semibold text-white">Manage storefront data, media, orders, and branding.</h1>
              <p className="mt-4 max-w-2xl text-sm text-slate-300">The panel now includes bundled product artwork, quick counts, product search, and cleaner review of local storefront data.</p>
              <div className="mt-5 flex flex-wrap gap-3 text-xs">
                <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-emerald-200">Local images enabled</span>
                <span className="rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-1.5 text-sky-200">No external database</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-slate-200">{data.products.length} products</span>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {Object.entries(data.dashboard.stats).map(([key, value]) => (
                <div key={key} className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-400">{labelize(key)}</p>
                  <p className="mt-3 text-2xl font-semibold text-white">{key === "revenue" ? currency(value) : value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {status && <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">{status}</div>}

        {tab === "Overview" && <div className="grid gap-6 lg:grid-cols-2">
          <div className="card p-6">
            <h2 className="text-2xl font-semibold">Recent Orders</h2>
            <div className="mt-5 space-y-4">
              {data.dashboard.recentOrders.length === 0 ? <EmptyState title="No orders yet" body="Placed orders will appear here for quick review." /> : data.dashboard.recentOrders.map((order) => (
                <div key={order.id} className="rounded-2xl border border-white/10 p-4 text-sm text-slate-300">
                  <div className="flex items-center justify-between gap-4"><span className="font-semibold text-white">{order.order_number}</span><span className="text-white">{currency(order.total)}</span></div>
                  <p className="mt-2">{order.customer_name} • {formatDate(order.created_at)}</p>
                  <span className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs ${tone(order.status)}`}>{order.status}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="card p-6">
            <h2 className="text-2xl font-semibold">Low Stock Alerts</h2>
            <div className="mt-5 space-y-4">
              {data.dashboard.lowStock.length === 0 ? <EmptyState title="Stock levels look healthy" body="Products with low quantity will appear here automatically." /> : data.dashboard.lowStock.map((product) => (
                <div key={product.id} className="flex items-center gap-4 rounded-2xl border border-white/10 p-4">
                  <img src={resolveMediaUrl(product.image_url)} alt={product.name} className="h-16 w-16 rounded-2xl object-cover" />
                  <div className="flex-1"><p className="font-semibold text-white">{product.name}</p><p className="mt-1 text-sm text-slate-400">{product.category?.name || "General"}</p></div>
                  <span className="rounded-full bg-amber-400/10 px-3 py-1 text-sm text-amber-200">{product.stock} left</span>
                </div>
              ))}
            </div>
          </div>
        </div>}

        {tab === "Products" && <div className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
          <form onSubmit={saveProduct} className="card grid gap-4 p-6">
            <div><h2 className="text-2xl font-semibold">Add Product</h2><p className="mt-2 text-sm text-slate-400">Upload a product image or keep the bundled artwork. Enter specs one per line.</p></div>
            <input className="input" placeholder="Product name" value={productForm.name} onChange={(event) => setProductForm((current) => ({ ...current, name: event.target.value }))} />
            <select className="input" value={productForm.categoryId} onChange={(event) => setProductForm((current) => ({ ...current, categoryId: event.target.value }))}><option value="">Select category</option>{data.categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select>
            <textarea className="input min-h-20" placeholder="Short description" value={productForm.shortDescription} onChange={(event) => setProductForm((current) => ({ ...current, shortDescription: event.target.value }))} />
            <textarea className="input min-h-32" placeholder="Full description" value={productForm.description} onChange={(event) => setProductForm((current) => ({ ...current, description: event.target.value }))} />
            <div className="grid gap-4 sm:grid-cols-2">
              <input className="input" placeholder="Price" value={productForm.price} onChange={(event) => setProductForm((current) => ({ ...current, price: event.target.value }))} />
              <input className="input" placeholder="Compare price" value={productForm.comparePrice} onChange={(event) => setProductForm((current) => ({ ...current, comparePrice: event.target.value }))} />
              <input className="input" placeholder="Stock" value={productForm.stock} onChange={(event) => setProductForm((current) => ({ ...current, stock: event.target.value }))} />
              <input className="input" placeholder="Video URL" value={productForm.videoUrl} onChange={(event) => setProductForm((current) => ({ ...current, videoUrl: event.target.value }))} />
            </div>
            <textarea className="input min-h-24" placeholder="Specs, one per line" value={productForm.specs} onChange={(event) => setProductForm((current) => ({ ...current, specs: event.target.value }))} />
            <input className="input" type="file" accept="image/*,video/*" onChange={(event) => setProductImage(event.target.files?.[0] || null)} />
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="flex items-center gap-3 rounded-2xl border border-white/10 px-4 py-3 text-sm text-slate-300"><input type="checkbox" checked={productForm.featured} onChange={(event) => setProductForm((current) => ({ ...current, featured: event.target.checked }))} /> Featured</label>
              <label className="flex items-center gap-3 rounded-2xl border border-white/10 px-4 py-3 text-sm text-slate-300"><input type="checkbox" checked={productForm.popular} onChange={(event) => setProductForm((current) => ({ ...current, popular: event.target.checked }))} /> Popular</label>
            </div>
            <button className="btn-primary" type="submit">Save Product</button>
          </form>
          <div className="card p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div><h2 className="text-2xl font-semibold">Product Inventory</h2><p className="mt-2 text-sm text-slate-400">Search products, review thumbnails, and remove items quickly.</p></div>
              <label className="relative block w-full max-w-sm"><Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} /><input className="input pl-11" placeholder="Search product inventory" value={productSearch} onChange={(event) => setProductSearch(event.target.value)} /></label>
            </div>
            <div className="mt-5 space-y-4 max-h-[760px] overflow-auto pr-1">
              {filteredProducts.length === 0 ? <EmptyState title="No matching products" body="Try another search or add a new product to the catalog." /> : filteredProducts.map((product) => (
                <div key={product.id} className="rounded-[26px] border border-white/10 p-4">
                  <div className="flex flex-wrap gap-4">
                    <img src={resolveMediaUrl(product.image_url)} alt={product.name} className="h-24 w-24 rounded-[22px] object-cover" />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div><h3 className="font-semibold text-white">{product.name}</h3><p className="mt-1 text-sm text-slate-400">{product.category?.name || "General"} • {currency(product.price)} • {product.stock} in stock</p></div>
                        <button type="button" onClick={async () => { await api.adminDeleteProduct(product.id); await load(); await refresh(); }} className="btn-secondary">Delete</button>
                      </div>
                      <p className="mt-3 text-sm text-slate-300">{product.short_description}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {product.featured ? <span className="rounded-full bg-sky-400/10 px-3 py-1 text-xs text-sky-200">Featured</span> : null}
                        {product.popular ? <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs text-emerald-200">Popular</span> : null}
                        <span className={`rounded-full px-3 py-1 text-xs ${product.in_stock ? "bg-white/10 text-slate-200" : "bg-rose-400/10 text-rose-200"}`}>{product.in_stock ? "In stock" : "Out of stock"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>}

        {tab === "Orders" && <div className="card p-6"><h2 className="text-2xl font-semibold">Orders</h2><div className="mt-5 space-y-4">{data.orders.length === 0 ? <EmptyState title="No orders captured yet" body="Customer orders will appear here once the checkout flow is used." /> : data.orders.map((order) => <div key={order.id} className="rounded-[26px] border border-white/10 p-5"><div className="flex flex-wrap items-start justify-between gap-4"><div><h3 className="font-semibold text-white">{order.order_number}</h3><p className="mt-2 text-sm text-slate-300">{order.customer_name} • {order.customer_email} • {formatDate(order.created_at)}</p><p className="mt-2 text-sm text-slate-400">{order.city} • {order.address}</p></div><div className="flex items-center gap-3"><select className="input w-40" value={order.status} onChange={async (event) => { await api.adminOrderStatus(order.id, event.target.value); await load(); }}>{orderStatuses.map((value) => <option key={value} value={value}>{value}</option>)}</select><span className="text-lg font-semibold text-white">{currency(order.total)}</span></div></div><div className="mt-4 grid gap-2 text-sm text-slate-300">{order.items.map((item) => <div key={item.id}>{item.product_name} x {item.quantity}</div>)}</div></div>)}</div></div>}

        {tab === "Reviews" && <div className="card p-6"><h2 className="text-2xl font-semibold">Review Moderation</h2><div className="mt-5 space-y-4">{data.reviews.length === 0 ? <EmptyState title="No reviews yet" body="Customer feedback will appear here for approval or rejection." /> : data.reviews.map((review) => <div key={review.id} className="rounded-[26px] border border-white/10 p-5"><div className="flex flex-wrap justify-between gap-4"><div><h3 className="font-semibold text-white">{review.name} • {review.rating}/5</h3><div className="mt-2 flex flex-wrap items-center gap-2 text-sm"><span className="text-slate-400">{review.product_name || "Store review"}</span><span className={`rounded-full px-3 py-1 text-xs ${tone(review.status)}`}>{review.status}</span></div></div><div className="flex flex-wrap gap-3"><button type="button" onClick={async () => { await api.adminReviewStatus(review.id, "approved"); await load(); await refresh(); }} className="btn-primary">Approve</button><button type="button" onClick={async () => { await api.adminReviewStatus(review.id, "rejected"); await load(); await refresh(); }} className="btn-secondary">Reject</button><button type="button" onClick={async () => { await api.adminDeleteReview(review.id); await load(); await refresh(); }} className="btn-secondary">Delete</button></div></div><p className="mt-4 text-sm text-slate-300">{review.comment}</p></div>)}</div></div>}

        {tab === "Messages" && <div className="card p-6"><h2 className="text-2xl font-semibold">Contact Messages</h2><div className="mt-5 space-y-4">{data.messages.length === 0 ? <EmptyState title="Inbox is empty" body="Contact form submissions will land here and stay in browser-local storage." /> : data.messages.map((message) => <div key={message.id} className="rounded-[26px] border border-white/10 p-5"><div className="flex flex-wrap items-start justify-between gap-4"><div><h3 className="font-semibold text-white">{message.name} • {message.email}</h3><p className="mt-2 text-sm text-slate-400">{message.subject || "General enquiry"} • {formatDate(message.created_at)}</p></div><a href={`mailto:${message.email}`} className="btn-secondary">Reply</a></div><p className="mt-4 text-sm text-slate-300">{message.message}</p></div>)}</div></div>}

        {tab === "Branding" && <form onSubmit={saveSettings} className="space-y-6">
          <div className="card grid gap-4 p-6 md:grid-cols-2">
            <div className="md:col-span-2"><h2 className="text-2xl font-semibold">Store Settings</h2><p className="mt-2 text-sm text-slate-400">Branding changes are applied immediately to the storefront and saved in browser-local admin data.</p></div>
            {[["shop_name", "Shop name"], ["logo_text", "Logo text"], ["phone", "Phone"], ["whatsapp", "WhatsApp number"], ["instagram", "Instagram link"], ["instagram_handle", "Instagram handle"], ["email", "Email"], ["address", "Address"]].map(([key, label]) => <input key={key} className="input" placeholder={label} value={settingsForm.settings[key] || ""} onChange={(event) => setSettingsForm((current) => ({ ...current, settings: { ...current.settings, [key]: event.target.value } }))} />)}
            <textarea className="input md:col-span-2 min-h-24" placeholder="Hero title" value={settingsForm.settings.hero_title || ""} onChange={(event) => setSettingsForm((current) => ({ ...current, settings: { ...current.settings, hero_title: event.target.value } }))} />
            <textarea className="input md:col-span-2 min-h-24" placeholder="Hero subtitle" value={settingsForm.settings.hero_subtitle || ""} onChange={(event) => setSettingsForm((current) => ({ ...current, settings: { ...current.settings, hero_subtitle: event.target.value } }))} />
            <textarea className="input md:col-span-2 min-h-24" placeholder="Offer banner" value={settingsForm.settings.offer_banner || ""} onChange={(event) => setSettingsForm((current) => ({ ...current, settings: { ...current.settings, offer_banner: event.target.value } }))} />
            <textarea className="input md:col-span-2 min-h-24" placeholder="Business summary" value={settingsForm.settings.business_summary || ""} onChange={(event) => setSettingsForm((current) => ({ ...current, settings: { ...current.settings, business_summary: event.target.value } }))} />
          </div>
          <div className="card p-6"><h2 className="text-2xl font-semibold">Opening Hours</h2><div className="mt-5 grid gap-4">{settingsForm.openingHours.map((item, index) => <div key={item.id} className="grid gap-4 rounded-2xl border border-white/10 p-4 md:grid-cols-[1fr_1fr_1fr_auto]"><div className="self-center text-sm font-semibold text-white">{item.day}</div><input className="input" placeholder="Opens" value={item.opens_at || ""} onChange={(event) => setSettingsForm((current) => { const next = [...current.openingHours]; next[index] = { ...next[index], opens_at: event.target.value }; return { ...current, openingHours: next }; })} /><input className="input" placeholder="Closes" value={item.closes_at || ""} onChange={(event) => setSettingsForm((current) => { const next = [...current.openingHours]; next[index] = { ...next[index], closes_at: event.target.value }; return { ...current, openingHours: next }; })} /><label className="flex items-center gap-3 text-sm text-slate-300"><input type="checkbox" checked={Boolean(item.is_closed)} onChange={(event) => setSettingsForm((current) => { const next = [...current.openingHours]; next[index] = { ...next[index], is_closed: event.target.checked }; return { ...current, openingHours: next }; })} /> Closed</label></div>)}</div></div>
          <div className="card p-6"><h2 className="text-2xl font-semibold">Homepage Banners</h2><div className="mt-5 space-y-4">{settingsForm.banners.map((banner, index) => <div key={banner.id || index} className="grid gap-4 rounded-2xl border border-white/10 p-4 md:grid-cols-2"><input className="input" placeholder="Title" value={banner.title || ""} onChange={(event) => setSettingsForm((current) => { const next = [...current.banners]; next[index] = { ...next[index], title: event.target.value }; return { ...current, banners: next }; })} /><input className="input" placeholder="Accent text" value={banner.accent_text || ""} onChange={(event) => setSettingsForm((current) => { const next = [...current.banners]; next[index] = { ...next[index], accent_text: event.target.value }; return { ...current, banners: next }; })} /><input className="input" placeholder="CTA label" value={banner.cta_label || ""} onChange={(event) => setSettingsForm((current) => { const next = [...current.banners]; next[index] = { ...next[index], cta_label: event.target.value }; return { ...current, banners: next }; })} /><input className="input" placeholder="CTA link" value={banner.cta_link || ""} onChange={(event) => setSettingsForm((current) => { const next = [...current.banners]; next[index] = { ...next[index], cta_link: event.target.value }; return { ...current, banners: next }; })} /><textarea className="input md:col-span-2 min-h-20" placeholder="Subtitle" value={banner.subtitle || ""} onChange={(event) => setSettingsForm((current) => { const next = [...current.banners]; next[index] = { ...next[index], subtitle: event.target.value }; return { ...current, banners: next }; })} /></div>)}</div><button type="button" onClick={() => setSettingsForm((current) => ({ ...current, banners: [...current.banners, { title: "", subtitle: "", cta_label: "", cta_link: "", accent_text: "", active: true }] }))} className="btn-secondary mt-4">Add Banner</button></div>
          <button className="btn-primary" type="submit">Save Settings</button>
        </form>}

        {tab === "Users" && <div className="card p-6"><h2 className="text-2xl font-semibold">Registered Users</h2><div className="mt-5 space-y-4">{data.users.length === 0 ? <EmptyState title="No users found" body="Customer and admin accounts will appear here once they exist in local data." /> : data.users.map((user) => <div key={user.id} className="flex flex-wrap items-center justify-between gap-3 rounded-[24px] border border-white/10 p-4 text-sm text-slate-300"><div><span className="font-semibold text-white">{user.name}</span><span className="ml-2">{user.email}</span></div><div className="flex items-center gap-3"><span className={`rounded-full px-3 py-1 text-xs ${user.role === "admin" ? "bg-sky-400/10 text-sky-200" : "bg-white/10 text-slate-200"}`}>{user.role}</span><span>{formatDate(user.created_at)}</span></div></div>)}</div></div>}

        {tab === "Categories" && <div className="grid gap-6 xl:grid-cols-[0.86fr_1.14fr]">
          <form onSubmit={saveCategory} className="card space-y-4 p-6"><div><h2 className="text-2xl font-semibold">Manage Categories</h2><p className="mt-2 text-sm text-slate-400">Create or remove catalog sections for the storefront.</p></div><input className="input" placeholder="Category name" value={categoryForm.name} onChange={(event) => setCategoryForm((current) => ({ ...current, name: event.target.value }))} /><textarea className="input min-h-24" placeholder="Description" value={categoryForm.description} onChange={(event) => setCategoryForm((current) => ({ ...current, description: event.target.value }))} /><button className="btn-primary" type="submit">Save Category</button></form>
          <div className="card p-6"><h2 className="text-2xl font-semibold">Category List</h2><div className="mt-5 space-y-4">{data.categories.length === 0 ? <EmptyState title="No categories yet" body="Create a category to organize the storefront catalog." /> : data.categories.map((category) => <div key={category.id} className="flex flex-wrap items-center justify-between gap-3 rounded-[24px] border border-white/10 p-4"><div><h3 className="font-semibold text-white">{category.name}</h3><p className="mt-1 text-sm text-slate-400">{category.description}</p></div><button type="button" onClick={async () => { await api.adminDeleteCategory(category.id); await load(); await refresh(); }} className="btn-secondary">Delete</button></div>)}</div></div>
        </div>}

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-400"><span className="font-semibold text-slate-200">Storage mode:</span> browser-local data. Admin changes persist in this browser after deployment.</div>
      </section>
    </div>
  );
};

export default AdminDashboardPage;
