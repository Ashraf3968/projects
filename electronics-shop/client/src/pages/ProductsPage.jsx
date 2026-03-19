import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { api } from "../api/client";
import { useCart } from "../context/CartContext";
import { useSite } from "../context/SiteContext";
import ProductCard from "../components/shop/ProductCard";
import SectionIntro from "../components/shop/SectionIntro";

const ProductsPage = () => {
  const { data } = useSite();
  const { addItem } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ search: "", category: "", sort: "latest" });

  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.search) params.set("search", filters.search);
    if (filters.category) params.set("category", filters.category);
    if (filters.sort) params.set("sort", filters.sort);

    setLoading(true);
    api.products(`?${params.toString()}`)
      .then((result) => setProducts(result.products))
      .finally(() => setLoading(false));
  }, [filters]);

  return (
    <div className="section-shell space-y-8">
      <SectionIntro eyebrow="Catalog" title="Explore the full electronics collection." body="Search, filter, and sort products across the main electronics categories while keeping the interface clean on every screen size." />
      <div className="card grid gap-4 p-5 lg:grid-cols-[1.3fr_0.8fr_0.8fr]">
        <label className="relative block">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input className="input pl-11" placeholder="Search products" value={filters.search} onChange={(event) => setFilters((current) => ({ ...current, search: event.target.value }))} />
        </label>
        <select className="input" value={filters.category} onChange={(event) => setFilters((current) => ({ ...current, category: event.target.value }))}>
          <option value="">All categories</option>
          {data.categories.map((category) => <option key={category.id} value={category.slug}>{category.name}</option>)}
        </select>
        <select className="input" value={filters.sort} onChange={(event) => setFilters((current) => ({ ...current, sort: event.target.value }))}>
          <option value="latest">Latest</option>
          <option value="popular">Popular</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-slate-400">{loading ? "Loading catalog..." : `${products.length} product${products.length === 1 ? "" : "s"} found`}</p>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => setFilters({ search: "", category: "", sort: "latest" })} className="rounded-full border border-white/10 px-4 py-2 text-xs text-slate-300 transition hover:bg-white/5">Reset Filters</button>
          {data.categories.slice(0, 4).map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setFilters((current) => ({ ...current, category: category.slug }))}
              className={`rounded-full border px-4 py-2 text-xs transition ${filters.category === category.slug ? "border-sky-400/40 bg-sky-400/10 text-sky-200" : "border-white/10 text-slate-300 hover:bg-white/5"}`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
      {loading ? (
        <div className="text-slate-300">Loading products...</div>
      ) : products.length === 0 ? (
        <div className="card p-10 text-center text-slate-300">No products match the current filters.</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => <ProductCard key={product.id} product={product} onAdd={addItem} />)}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
