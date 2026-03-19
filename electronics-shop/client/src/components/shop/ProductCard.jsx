import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { currency } from "../../lib/utils";

const ProductCard = ({ product, onAdd }) => (
  <article className="card overflow-hidden">
    <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
      <img src={product.image_url ? `http://localhost:5000${product.image_url}` : "/placeholder-product.svg"} alt={product.name} className="h-full w-full object-cover transition duration-500 hover:scale-105" />
      <div className="absolute left-4 top-4 rounded-full bg-black/50 px-3 py-1 text-xs text-slate-200">{product.category?.name || "General"}</div>
    </div>
    <div className="space-y-4 p-5">
      <div>
        <h3 className="text-xl font-semibold text-white">{product.name}</h3>
        <p className="mt-2 text-sm text-slate-300">{product.short_description}</p>
      </div>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-2xl font-bold text-white">{currency(product.price)}</p>
          {product.compare_price && <p className="text-sm text-slate-500 line-through">{currency(product.compare_price)}</p>}
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${product.in_stock ? "bg-emerald-500/15 text-emerald-300" : "bg-red-500/15 text-red-300"}`}>{product.in_stock ? `${product.stock} in stock` : "Out of stock"}</span>
      </div>
      <div className="flex gap-3">
        <Link to={`/products/${product.slug}`} className="btn-secondary flex-1">Details</Link>
        <button type="button" onClick={() => onAdd(product)} className="btn-primary flex-1 gap-2"><ShoppingBag size={16} /> Add</button>
      </div>
    </div>
  </article>
);

export default ProductCard;
