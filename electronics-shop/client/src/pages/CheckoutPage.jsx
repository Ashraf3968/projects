import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/client";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { currency } from "../lib/utils";

const CheckoutPage = () => {
  const { user } = useAuth();
  const { items, clear } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    customerName: user?.name || "",
    customerEmail: user?.email || "",
    customerPhone: user?.phone || "",
    address: "",
    city: "",
    notes: ""
  });
  const [error, setError] = useState("");
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal >= 50000 ? subtotal : subtotal + 499;

  const submit = async (event) => {
    event.preventDefault();
    try {
      const result = await api.createOrder({
        ...form,
        items: items.map((item) => ({ productId: item.id, quantity: item.quantity }))
      });
      clear();
      navigate("/order-success", { state: { order: result.order } });
    } catch (submissionError) {
      setError(submissionError.message);
    }
  };

  return (
    <div className="section-shell grid gap-8 lg:grid-cols-[1fr_0.4fr]">
      <form onSubmit={submit} className="card grid gap-4 p-8 sm:grid-cols-2">
        <h1 className="sm:col-span-2 text-3xl font-semibold">Checkout</h1>
        <input className="input" placeholder="Full name" value={form.customerName} onChange={(event) => setForm((current) => ({ ...current, customerName: event.target.value }))} />
        <input className="input" placeholder="Email" value={form.customerEmail} onChange={(event) => setForm((current) => ({ ...current, customerEmail: event.target.value }))} />
        <input className="input" placeholder="Phone" value={form.customerPhone} onChange={(event) => setForm((current) => ({ ...current, customerPhone: event.target.value }))} />
        <input className="input" placeholder="City" value={form.city} onChange={(event) => setForm((current) => ({ ...current, city: event.target.value }))} />
        <textarea className="input min-h-28 sm:col-span-2" placeholder="Address" value={form.address} onChange={(event) => setForm((current) => ({ ...current, address: event.target.value }))} />
        <textarea className="input min-h-24 sm:col-span-2" placeholder="Order notes (optional)" value={form.notes} onChange={(event) => setForm((current) => ({ ...current, notes: event.target.value }))} />
        {error && <p className="sm:col-span-2 text-sm text-red-300">{error}</p>}
        <button className="btn-primary sm:col-span-2" type="submit" disabled={items.length === 0}>Place Order</button>
      </form>
      <aside className="card space-y-4 p-6">
        <h2 className="text-2xl font-semibold">Order Summary</h2>
        {items.length === 0 ? <p className="text-slate-300">Your cart is empty.</p> : items.map((item) => (
          <div key={item.id} className="flex justify-between gap-4 text-sm text-slate-300"><span>{item.name} x {item.quantity}</span><span>{currency(item.price * item.quantity)}</span></div>
        ))}
        <div className="border-t border-white/10 pt-4 text-lg font-semibold flex justify-between"><span>Total</span><span>{currency(total)}</span></div>
      </aside>
    </div>
  );
};

export default CheckoutPage;
