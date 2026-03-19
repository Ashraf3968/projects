import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../api/client";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { currency, formatDate } from "../lib/utils";
import RatingStars from "../components/shop/RatingStars";

const ProductPage = () => {
  const { slug } = useParams();
  const { addItem } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [payload, setPayload] = useState({ loading: true, product: null, reviews: [] });
  const [review, setReview] = useState({ rating: 5, comment: "" });
  const [status, setStatus] = useState("");

  useEffect(() => {
    api.product(slug).then((data) => setPayload({ loading: false, ...data }));
  }, [slug]);

  if (payload.loading) return <div className="section-shell text-slate-300">Loading product...</div>;
  const { product, reviews } = payload;

  const submitReview = async (event) => {
    event.preventDefault();
    if (!user) {
      navigate("/login");
      return;
    }
    const response = await api.submitReview({ productId: product.id, ...review, rating: Number(review.rating) });
    setStatus(response.message);
    setReview({ rating: 5, comment: "" });
  };

  return (
    <div className="section-shell space-y-10">
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <div className="card overflow-hidden">
          <img src={product.image_url ? `http://localhost:5000${product.image_url}` : "/placeholder-product.svg"} alt={product.name} className="h-full w-full object-cover" />
        </div>
        <div className="card p-8">
          <p className="text-xs uppercase tracking-[0.3em] text-sky-200">{product.category?.name}</p>
          <h1 className="mt-4 text-4xl font-semibold">{product.name}</h1>
          <p className="mt-4 text-slate-300">{product.description}</p>
          <div className="mt-6 flex items-center gap-4">
            <span className="text-3xl font-bold text-white">{currency(product.price)}</span>
            {product.compare_price && <span className="text-slate-500 line-through">{currency(product.compare_price)}</span>}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            {product.specs.map((spec) => <span key={spec} className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200">{spec}</span>)}
          </div>
          <div className="mt-8 flex gap-4">
            <button type="button" onClick={() => addItem(product)} className="btn-primary">Add to Cart</button>
            <button type="button" onClick={() => { addItem(product); navigate("/checkout"); }} className="btn-secondary">Buy Now</button>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <div className="card p-8">
          <h2 className="text-2xl font-semibold">Customer Reviews</h2>
          <div className="mt-6 space-y-4">
            {reviews.length === 0 ? <p className="text-slate-300">No approved reviews yet.</p> : reviews.map((item) => (
              <div key={item.id} className="rounded-[24px] border border-white/10 p-5">
                <RatingStars value={item.rating} />
                <p className="mt-3 text-slate-300">{item.comment}</p>
                <p className="mt-3 text-sm font-semibold">{item.name} • {formatDate(item.created_at)}</p>
              </div>
            ))}
          </div>
        </div>
        <form onSubmit={submitReview} className="card space-y-4 p-8">
          <h2 className="text-2xl font-semibold">Write a Review</h2>
          <select className="input" value={review.rating} onChange={(event) => setReview((current) => ({ ...current, rating: event.target.value }))}>
            {[5, 4, 3, 2, 1].map((value) => <option key={value} value={value}>{value} Stars</option>)}
          </select>
          <textarea className="input min-h-36" placeholder="Share your buying experience" value={review.comment} onChange={(event) => setReview((current) => ({ ...current, comment: event.target.value }))} />
          {status && <p className="text-sm text-emerald-300">{status}</p>}
          <button className="btn-primary" type="submit">Submit Review</button>
        </form>
      </div>
    </div>
  );
};

export default ProductPage;
