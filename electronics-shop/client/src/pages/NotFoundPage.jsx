import { Link } from "react-router-dom";

const NotFoundPage = () => (
  <div className="section-shell grid place-items-center">
    <div className="card max-w-xl space-y-4 p-10 text-center">
      <p className="text-sm uppercase tracking-[0.3em] text-sky-200">404</p>
      <h1 className="text-4xl font-semibold">Page not found</h1>
      <p className="text-slate-300">The page you requested does not exist. Use the navigation to continue browsing the shop.</p>
      <Link to="/" className="btn-primary">Back to Home</Link>
    </div>
  </div>
);

export default NotFoundPage;
