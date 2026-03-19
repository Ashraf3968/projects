import { Link, useLocation } from "react-router-dom";
import { currency } from "../lib/utils";

const OrderSuccessPage = () => {
  const location = useLocation();
  const order = location.state?.order;

  return (
    <div className="section-shell grid place-items-center">
      <div className="card w-full max-w-2xl space-y-5 p-8 text-center">
        <h1 className="text-4xl font-semibold">Order Confirmed</h1>
        {order ? (
          <>
            <p className="text-slate-300">Your order <span className="font-semibold text-white">{order.order_number}</span> has been saved locally and a confirmation email log has been generated.</p>
            <p className="text-2xl font-bold text-emerald-300">{currency(order.total)}</p>
          </>
        ) : (
          <p className="text-slate-300">Your order was placed successfully.</p>
        )}
        <div className="flex justify-center gap-4">
          <Link to="/products" className="btn-secondary">Continue Shopping</Link>
          <Link to="/contact" className="btn-primary">Need Help?</Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
