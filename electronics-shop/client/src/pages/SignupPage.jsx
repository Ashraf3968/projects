import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const SignupPage = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [error, setError] = useState("");

  const submit = async (event) => {
    event.preventDefault();
    try {
      await signup(form);
      navigate("/products");
    } catch (submissionError) {
      setError(submissionError.message);
    }
  };

  return (
    <div className="section-shell grid place-items-center">
      <form onSubmit={submit} className="card w-full max-w-xl space-y-5 p-8">
        <h1 className="text-3xl font-semibold">Create your account</h1>
        <div className="grid gap-4 sm:grid-cols-2">
          <input className="input" placeholder="Full name" value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} />
          <input className="input" placeholder="Phone" value={form.phone} onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))} />
          <input className="input sm:col-span-2" placeholder="Email" value={form.email} onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))} />
          <input className="input sm:col-span-2" type="password" placeholder="Password" value={form.password} onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))} />
        </div>
        {error && <p className="text-sm text-red-300">{error}</p>}
        <button className="btn-primary w-full" type="submit">Sign Up</button>
        <p className="text-sm text-slate-400">Already registered? <Link className="text-emerald-300" to="/login">Login</Link></p>
      </form>
    </div>
  );
};

export default SignupPage;
