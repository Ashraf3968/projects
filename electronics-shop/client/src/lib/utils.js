export const currency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(Number(value || 0));

export const formatDate = (value) => new Date(value).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

export const classNames = (...values) => values.filter(Boolean).join(" ");

export const resolveMediaUrl = (value) => {
  if (!value) return "/placeholder-product.svg";
  if (/^(data:|https?:\/\/)/i.test(value)) return value;
  if (value.startsWith("/")) return `http://localhost:5000${value}`;
  return value;
};
