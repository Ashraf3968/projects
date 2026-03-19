import { useEffect, useState } from "react";
import { api } from "../../api/client";
import { useSite } from "../../context/SiteContext";
import { currency, formatDate } from "../../lib/utils";

const tabs = ["Overview", "Products", "Orders", "Reviews", "Messages", "Branding", "Users", "Categories"];

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

  useEffect(() => {
    load();
  }, []);

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

  if (loading) return <div className="section-shell text-slate-300">Loading admin dashboard...</div>;

  return (
    <div className="section-shell grid gap-6 xl:grid-cols-[240px_1fr]">
      <aside className="card h-fit space-y-2 p-4">
        <p className="px-3 py-2 text-xs uppercase tracking-[0.3em] text-sky-200">Admin Panel</p>
        {tabs.map((item) => (
          <button key={item} type="button" onClick={() => setTab(item)} className={`rounded-2xl px-4 py-3 text-left text-sm transition ${tab === item ? "bg-white/10 text-white" : "text-slate-300 hover:bg-white/5"}`}>{item}</button>
        ))}
      </aside>
      <section className="space-y-6">
        {status && <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">{status}</div>}

        {tab === "Overview" && (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {Object.entries(data.dashboard.stats).map(([key, value]) => (
                <div key={key} className="card p-5">
                  <p className="text-sm capitalize text-slate-400">{key.replace(/([A-Z])/g, " $1")}</p>
                  <p className="mt-3 text-3xl font-semibold">{key === "revenue" ? currency(value) : value}</p>
                </div>
              ))}
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="card p-6">
                <h2 className="text-2xl font-semibold">Recent Orders</h2>
                <div className="mt-5 space-y-4">
                  {data.dashboard.recentOrders.map((order) => (
                    <div key={order.id} className="rounded-2xl border border-white/10 p-4 text-sm text-slate-300">
                      <div className="flex justify-between gap-4"><span>{order.order_number}</span><span>{currency(order.total)}</span></div>
                      <p className="mt-2">{order.customer_name} • {order.status}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card p-6">
                <h2 className="text-2xl font-semibold">Low Stock Alerts</h2>
                <div className="mt-5 space-y-4">
                  {data.dashboard.lowStock.map((product) => (
                    <div key={product.id} className="rounded-2xl border border-white/10 p-4 text-sm text-slate-300 flex justify-between gap-4">
                      <span>{product.name}</span><span>{product.stock} left</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === "Products" && (
          <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
            <form onSubmit={saveProduct} className="card grid gap-4 p-6">
              <h2 className="text-2xl font-semibold">Add Product</h2>
              <input className="input" placeholder="Product name" value={productForm.name} onChange={(event) => setProductForm((current) => ({ ...current, name: event.target.value }))} />
              <select className="input" value={productForm.categoryId} onChange={(event) => setProductForm((current) => ({ ...current, categoryId: event.target.value }))}>
                <option value="">Select category</option>
                {data.categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
              </select>
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
              <label className="flex items-center gap-3 text-sm text-slate-300"><input type="checkbox" checked={productForm.featured} onChange={(event) => setProductForm((current) => ({ ...current, featured: event.target.checked }))} /> Featured</label>
              <label className="flex items-center gap-3 text-sm text-slate-300"><input type="checkbox" checked={productForm.popular} onChange={(event) => setProductForm((current) => ({ ...current, popular: event.target.checked }))} /> Popular</label>
              <button className="btn-primary" type="submit">Save Product</button>
            </form>
            <div className="card p-6">
              <h2 className="text-2xl font-semibold">Product Inventory</h2>
              <div className="mt-5 space-y-4 max-h-[700px] overflow-auto pr-1">
                {data.products.map((product) => (
                  <div key={product.id} className="rounded-2xl border border-white/10 p-4">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="font-semibold">{product.name}</h3>
                        <p className="mt-1 text-sm text-slate-400">{product.category?.name} • {currency(product.price)} • {product.stock} in stock</p>
                      </div>
                      <button type="button" onClick={async () => { await api.adminDeleteProduct(product.id); await load(); await refresh(); }} className="btn-secondary">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === "Orders" && (
          <div className="card p-6">
            <h2 className="text-2xl font-semibold">Orders</h2>
            <div className="mt-5 space-y-4">
              {data.orders.map((order) => (
                <div key={order.id} className="rounded-2xl border border-white/10 p-5">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold">{order.order_number}</h3>
                      <p className="mt-2 text-sm text-slate-300">{order.customer_name} • {order.customer_email} • {formatDate(order.created_at)}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <select className="input w-40" value={order.status} onChange={async (event) => { await api.adminOrderStatus(order.id, event.target.value); await load(); }}>
                        {['pending', 'processing', 'shipped', 'completed', 'cancelled'].map((value) => <option key={value} value={value}>{value}</option>)}
                      </select>
                      <span className="text-lg font-semibold">{currency(order.total)}</span>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2 text-sm text-slate-300">
                    {order.items.map((item) => <div key={item.id}>{item.product_name} x {item.quantity}</div>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "Reviews" && (
          <div className="card p-6">
            <h2 className="text-2xl font-semibold">Review Moderation</h2>
            <div className="mt-5 space-y-4">
              {data.reviews.map((review) => (
                <div key={review.id} className="rounded-2xl border border-white/10 p-5">
                  <div className="flex flex-wrap justify-between gap-4">
                    <div>
                      <h3 className="font-semibold">{review.name} • {review.rating}/5</h3>
                      <p className="mt-2 text-sm text-slate-400">{review.product_name || "Store review"} • {review.status}</p>
                    </div>
                    <div className="flex gap-3">
                      <button type="button" onClick={async () => { await api.adminReviewStatus(review.id, 'approved'); await load(); await refresh(); }} className="btn-primary">Approve</button>
                      <button type="button" onClick={async () => { await api.adminReviewStatus(review.id, 'rejected'); await load(); await refresh(); }} className="btn-secondary">Reject</button>
                      <button type="button" onClick={async () => { await api.adminDeleteReview(review.id); await load(); await refresh(); }} className="btn-secondary">Delete</button>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-slate-300">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "Messages" && (
          <div className="card p-6">
            <h2 className="text-2xl font-semibold">Contact Messages</h2>
            <div className="mt-5 space-y-4">
              {data.messages.map((message) => (
                <div key={message.id} className="rounded-2xl border border-white/10 p-5">
                  <h3 className="font-semibold">{message.name} • {message.email}</h3>
                  <p className="mt-2 text-sm text-slate-400">{message.subject || 'General enquiry'} • {formatDate(message.created_at)}</p>
                  <p className="mt-4 text-sm text-slate-300">{message.message}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "Branding" && (
          <form onSubmit={saveSettings} className="space-y-6">
            <div className="card grid gap-4 p-6 md:grid-cols-2">
              <h2 className="md:col-span-2 text-2xl font-semibold">Store Settings</h2>
              {[
                ["shop_name", "Shop name"], ["logo_text", "Logo text"], ["phone", "Phone"], ["whatsapp", "WhatsApp number"], ["instagram", "Instagram link"], ["instagram_handle", "Instagram handle"], ["email", "Email"], ["address", "Address"]
              ].map(([key, label]) => (
                <input key={key} className="input" placeholder={label} value={settingsForm.settings[key] || ""} onChange={(event) => setSettingsForm((current) => ({ ...current, settings: { ...current.settings, [key]: event.target.value } }))} />
              ))}
              <textarea className="input md:col-span-2 min-h-24" placeholder="Hero title" value={settingsForm.settings.hero_title || ""} onChange={(event) => setSettingsForm((current) => ({ ...current, settings: { ...current.settings, hero_title: event.target.value } }))} />
              <textarea className="input md:col-span-2 min-h-24" placeholder="Hero subtitle" value={settingsForm.settings.hero_subtitle || ""} onChange={(event) => setSettingsForm((current) => ({ ...current, settings: { ...current.settings, hero_subtitle: event.target.value } }))} />
              <textarea className="input md:col-span-2 min-h-24" placeholder="Offer banner" value={settingsForm.settings.offer_banner || ""} onChange={(event) => setSettingsForm((current) => ({ ...current, settings: { ...current.settings, offer_banner: event.target.value } }))} />
              <textarea className="input md:col-span-2 min-h-24" placeholder="Business summary" value={settingsForm.settings.business_summary || ""} onChange={(event) => setSettingsForm((current) => ({ ...current, settings: { ...current.settings, business_summary: event.target.value } }))} />
            </div>
            <div className="card p-6">
              <h2 className="text-2xl font-semibold">Opening Hours</h2>
              <div className="mt-5 grid gap-4">
                {settingsForm.openingHours.map((item, index) => (
                  <div key={item.id} className="grid gap-4 rounded-2xl border border-white/10 p-4 md:grid-cols-[1fr_1fr_1fr_auto]">
                    <div className="self-center text-sm font-semibold">{item.day}</div>
                    <input className="input" placeholder="Opens" value={item.opens_at || ""} onChange={(event) => setSettingsForm((current) => {
                      const next = [...current.openingHours];
                      next[index] = { ...next[index], opens_at: event.target.value };
                      return { ...current, openingHours: next };
                    })} />
                    <input className="input" placeholder="Closes" value={item.closes_at || ""} onChange={(event) => setSettingsForm((current) => {
                      const next = [...current.openingHours];
                      next[index] = { ...next[index], closes_at: event.target.value };
                      return { ...current, openingHours: next };
                    })} />
                    <label className="flex items-center gap-3 text-sm text-slate-300"><input type="checkbox" checked={Boolean(item.is_closed)} onChange={(event) => setSettingsForm((current) => {
                      const next = [...current.openingHours];
                      next[index] = { ...next[index], is_closed: event.target.checked };
                      return { ...current, openingHours: next };
                    })} /> Closed</label>
                  </div>
                ))}
              </div>
            </div>
            <div className="card p-6">
              <h2 className="text-2xl font-semibold">Homepage Banners</h2>
              <div className="mt-5 space-y-4">
                {settingsForm.banners.map((banner, index) => (
                  <div key={banner.id || index} className="grid gap-4 rounded-2xl border border-white/10 p-4 md:grid-cols-2">
                    <input className="input" placeholder="Title" value={banner.title || ""} onChange={(event) => setSettingsForm((current) => {
                      const next = [...current.banners];
                      next[index] = { ...next[index], title: event.target.value };
                      return { ...current, banners: next };
                    })} />
                    <input className="input" placeholder="Accent text" value={banner.accent_text || ""} onChange={(event) => setSettingsForm((current) => {
                      const next = [...current.banners];
                      next[index] = { ...next[index], accent_text: event.target.value };
                      return { ...current, banners: next };
                    })} />
                    <input className="input" placeholder="CTA label" value={banner.cta_label || ""} onChange={(event) => setSettingsForm((current) => {
                      const next = [...current.banners];
                      next[index] = { ...next[index], cta_label: event.target.value };
                      return { ...current, banners: next };
                    })} />
                    <input className="input" placeholder="CTA link" value={banner.cta_link || ""} onChange={(event) => setSettingsForm((current) => {
                      const next = [...current.banners];
                      next[index] = { ...next[index], cta_link: event.target.value };
                      return { ...current, banners: next };
                    })} />
                    <textarea className="input md:col-span-2 min-h-20" placeholder="Subtitle" value={banner.subtitle || ""} onChange={(event) => setSettingsForm((current) => {
                      const next = [...current.banners];
                      next[index] = { ...next[index], subtitle: event.target.value };
                      return { ...current, banners: next };
                    })} />
                  </div>
                ))}
              </div>
              <button type="button" onClick={() => setSettingsForm((current) => ({ ...current, banners: [...current.banners, { title: "", subtitle: "", cta_label: "", cta_link: "", accent_text: "", active: true }] }))} className="btn-secondary mt-4">Add Banner</button>
            </div>
            <button className="btn-primary" type="submit">Save Settings</button>
          </form>
        )}

        {tab === "Users" && (
          <div className="card p-6">
            <h2 className="text-2xl font-semibold">Registered Users</h2>
            <div className="mt-5 space-y-4">
              {data.users.map((user) => (
                <div key={user.id} className="rounded-2xl border border-white/10 p-4 text-sm text-slate-300 flex flex-wrap justify-between gap-3">
                  <span>{user.name} • {user.email}</span>
                  <span>{user.role} • {formatDate(user.created_at)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "Categories" && (
          <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
            <form onSubmit={saveCategory} className="card space-y-4 p-6">
              <h2 className="text-2xl font-semibold">Manage Categories</h2>
              <input className="input" placeholder="Category name" value={categoryForm.name} onChange={(event) => setCategoryForm((current) => ({ ...current, name: event.target.value }))} />
              <textarea className="input min-h-24" placeholder="Description" value={categoryForm.description} onChange={(event) => setCategoryForm((current) => ({ ...current, description: event.target.value }))} />
              <button className="btn-primary" type="submit">Save Category</button>
            </form>
            <div className="card p-6">
              <div className="space-y-4">
                {data.categories.map((category) => (
                  <div key={category.id} className="rounded-2xl border border-white/10 p-4 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="font-semibold">{category.name}</h3>
                      <p className="mt-1 text-sm text-slate-400">{category.description}</p>
                    </div>
                    <button type="button" onClick={async () => { await api.adminDeleteCategory(category.id); await load(); await refresh(); }} className="btn-secondary">Delete</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminDashboardPage;
