import { localApi } from "./localApi";

const defaultApiBase = import.meta.env.PROD ? "/api" : "http://localhost:5000/api";
const API_BASE = (import.meta.env.VITE_API_BASE_URL || defaultApiBase).replace(/\/$/, "");
const USE_LOCAL_DATA = import.meta.env.VITE_USE_LOCAL_DATA === "true" || (import.meta.env.PROD && !import.meta.env.VITE_API_BASE_URL);

const remoteRequest = async (path, options = {}) => {
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

  const contentType = response.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
  const data = isJson ? await response.json().catch(() => ({})) : {};

  if (!response.ok) {
    throw new Error(data.message || "Request failed.");
  }

  if (!isJson) {
    throw new Error("Store API returned a non-JSON response.");
  }

  return data;
};

const execute = async (path, fallback, options) => {
  if (USE_LOCAL_DATA) {
    return fallback();
  }

  try {
    return await remoteRequest(path, options);
  } catch (error) {
    if (import.meta.env.PROD) {
      return fallback();
    }
    throw error;
  }
};

export const api = {
  bootstrap: () => execute("/store/bootstrap", () => localApi.bootstrap()),
  products: (params = "") => execute(`/store/products${params}`, () => localApi.products(params)),
  product: (slug) => execute(`/store/products/${slug}`, () => localApi.product(slug)),
  contact: (payload) => execute("/store/contact", () => localApi.contact(payload), { method: "POST", body: JSON.stringify(payload) }),
  signup: (payload) => execute("/auth/signup", () => localApi.signup(payload), { method: "POST", body: JSON.stringify(payload) }),
  login: (payload) => execute("/auth/login", () => localApi.login(payload), { method: "POST", body: JSON.stringify(payload) }),
  me: () => execute("/auth/me", () => localApi.me()),
  createOrder: (payload) => execute("/store/orders", () => localApi.createOrder(payload), { method: "POST", body: JSON.stringify(payload) }),
  submitReview: (payload) => execute("/store/reviews", () => localApi.submitReview(payload), { method: "POST", body: JSON.stringify(payload) }),
  adminDashboard: () => execute("/admin/dashboard", () => localApi.adminDashboard()),
  adminProducts: () => execute("/admin/products", () => localApi.adminProducts()),
  adminSaveProduct: (formData) => execute("/admin/products", () => localApi.adminSaveProduct(formData), { method: "POST", body: formData }),
  adminDeleteProduct: (id) => execute(`/admin/products/${id}`, () => localApi.adminDeleteProduct(id), { method: "DELETE" }),
  adminCategories: () => execute("/admin/categories", () => localApi.adminCategories()),
  adminSaveCategory: (payload) => execute("/admin/categories", () => localApi.adminSaveCategory(payload), { method: "POST", body: JSON.stringify(payload) }),
  adminDeleteCategory: (id) => execute(`/admin/categories/${id}`, () => localApi.adminDeleteCategory(id), { method: "DELETE" }),
  adminOrders: () => execute("/admin/orders", () => localApi.adminOrders()),
  adminOrderStatus: (id, status) => execute(`/admin/orders/${id}/status`, () => localApi.adminOrderStatus(id, status), { method: "PATCH", body: JSON.stringify({ status }) }),
  adminReviews: () => execute("/admin/reviews", () => localApi.adminReviews()),
  adminReviewStatus: (id, status) => execute(`/admin/reviews/${id}/status`, () => localApi.adminReviewStatus(id, status), { method: "PATCH", body: JSON.stringify({ status }) }),
  adminDeleteReview: (id) => execute(`/admin/reviews/${id}`, () => localApi.adminDeleteReview(id), { method: "DELETE" }),
  adminMessages: () => execute("/admin/messages", () => localApi.adminMessages()),
  adminUsers: () => execute("/admin/users", () => localApi.adminUsers()),
  adminSettings: () => execute("/admin/settings", () => localApi.adminSettings()),
  adminSaveSettings: (payload) => execute("/admin/settings", () => localApi.adminSaveSettings(payload), { method: "PUT", body: JSON.stringify(payload) })
};
