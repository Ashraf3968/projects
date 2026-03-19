import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const submit = async (event) => {
    event.preventDefault();
    try {
      const user = await login(form);
      navigate(user.role === "admin" ? "/admin" : location.state?.from || "/products");
    } catch (submissionError) {
      setError(submissionError.message);
    }
  };

  return (
    <div className="section-shell grid place-items-center">
      <form onSubmit={submit} className="card w-full max-w-lg space-y-5 p-8">
        <h1 className="text-3xl font-semibold">Welcome back</h1>
        <p className="text-sm text-slate-300">Admin login: `admin@digitquo.com` / `digitquo@123`</p>
        <input className="input" placeholder="Username or email" value={form.email} onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))} />
        <input className="input" type="password" placeholder="Password" value={form.password} onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))} />
        {error && <p className="text-sm text-red-300">{error}</p>}
        <button className="btn-primary w-full" type="submit">Login</button>
        <p className="text-sm text-slate-400">New customer? <Link className="text-emerald-300" to="/signup">Create an account</Link></p>
      </form>
    </div>
  );
};

export default LoginPage;
