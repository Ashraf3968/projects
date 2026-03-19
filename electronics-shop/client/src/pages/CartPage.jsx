import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { currency } from "../lib/utils";

const CartPage = () => {
  const { items, updateQuantity, removeItem } = useCart();
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="section-shell space-y-6">
      <h1 className="text-4xl font-semibold">Your Cart</h1>
      {items.length === 0 ? (
        <div className="card p-10 text-center text-slate-300">Your cart is empty. <Link className="text-emerald-300" to="/products">Browse products</Link>.</div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1fr_0.4fr]">
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="card flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-semibold">{item.name}</h2>
                  <p className="mt-1 text-sm text-slate-300">{currency(item.price)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <input className="input w-24" type="number" min="1" value={item.quantity} onChange={(event) => updateQuantity(item.id, Number(event.target.value))} />
                  <button type="button" onClick={() => removeItem(item.id)} className="btn-secondary">Remove</button>
                </div>
              </div>
            ))}
          </div>
          <div className="card space-y-4 p-6">
            <h2 className="text-2xl font-semibold">Summary</h2>
            <div className="flex justify-between text-slate-300"><span>Subtotal</span><span>{currency(subtotal)}</span></div>
            <div className="flex justify-between text-slate-300"><span>Shipping</span><span>{subtotal >= 50000 ? "Free" : currency(499)}</span></div>
            <div className="border-t border-white/10 pt-4 text-lg font-semibold flex justify-between"><span>Total</span><span>{currency(subtotal >= 50000 ? subtotal : subtotal + 499)}</span></div>
            <Link to="/checkout" className="btn-primary w-full">Proceed to Checkout</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
