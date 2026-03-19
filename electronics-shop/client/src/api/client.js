const API_BASE = "http://localhost:5000/api";

const request = async (path, options = {}) => {
  const token = localStorage.getItem("electronics_token");
  const headers = {
    ...(options.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {})
  };

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || "Request failed.");
  }
  return data;
};

export const api = {
  bootstrap: () => request("/store/bootstrap"),
  products: (params = "") => request(`/store/products${params}`),
  product: (slug) => request(`/store/products/${slug}`),
  contact: (payload) => request("/store/contact", { method: "POST", body: JSON.stringify(payload) }),
  signup: (payload) => request("/auth/signup", { method: "POST", body: JSON.stringify(payload) }),
  login: (payload) => request("/auth/login", { method: "POST", body: JSON.stringify(payload) }),
  me: () => request("/auth/me"),
  createOrder: (payload) => request("/store/orders", { method: "POST", body: JSON.stringify(payload) }),
  submitReview: (payload) => request("/store/reviews", { method: "POST", body: JSON.stringify(payload) }),
  adminDashboard: () => request("/admin/dashboard"),
  adminProducts: () => request("/admin/products"),
  adminSaveProduct: (formData) => request("/admin/products", { method: "POST", body: formData }),
  adminDeleteProduct: (id) => request(`/admin/products/${id}`, { method: "DELETE" }),
  adminCategories: () => request("/admin/categories"),
  adminSaveCategory: (payload) => request("/admin/categories", { method: "POST", body: JSON.stringify(payload) }),
  adminDeleteCategory: (id) => request(`/admin/categories/${id}`, { method: "DELETE" }),
  adminOrders: () => request("/admin/orders"),
  adminOrderStatus: (id, status) => request(`/admin/orders/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }) }),
  adminReviews: () => request("/admin/reviews"),
  adminReviewStatus: (id, status) => request(`/admin/reviews/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }) }),
  adminDeleteReview: (id) => request(`/admin/reviews/${id}`, { method: "DELETE" }),
  adminMessages: () => request("/admin/messages"),
  adminUsers: () => request("/admin/users"),
  adminSettings: () => request("/admin/settings"),
  adminSaveSettings: (payload) => request("/admin/settings", { method: "PUT", body: JSON.stringify(payload) })
};
