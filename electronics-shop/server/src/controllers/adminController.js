import fs from "fs";
import path from "path";
import { validationResult } from "express-validator";
import { db } from "../db/index.js";
import { slugify } from "../utils/helpers.js";
import { getCategories, getOpeningHours, getSettings, mapProductRow, selectProductColumns } from "../utils/query.js";

const parseBoolean = (value) => value === true || value === "true" || value === 1 || value === "1";

const deleteFileIfExists = (filePath) => {
  if (!filePath) return;
  const relative = filePath.replace(/^\//, "");
  const absolute = path.resolve(process.cwd(), "src", relative);
  if (fs.existsSync(absolute)) {
    fs.unlinkSync(absolute);
  }
};

export const dashboardStats = (req, res) => {
  const stats = {
    products: db.prepare("SELECT COUNT(*) AS count FROM products").get().count,
    orders: db.prepare("SELECT COUNT(*) AS count FROM orders").get().count,
    pendingOrders: db.prepare("SELECT COUNT(*) AS count FROM orders WHERE status = 'pending'").get().count,
    users: db.prepare("SELECT COUNT(*) AS count FROM users WHERE role = 'user'").get().count,
    reviewsPending: db.prepare("SELECT COUNT(*) AS count FROM reviews WHERE status = 'pending'").get().count,
    messages: db.prepare("SELECT COUNT(*) AS count FROM contact_messages").get().count,
    revenue: db.prepare("SELECT COALESCE(SUM(total), 0) AS total FROM orders").get().total
  };

  const recentOrders = db.prepare("SELECT * FROM orders ORDER BY id DESC LIMIT 5").all();
  const lowStock = db.prepare(`SELECT ${selectProductColumns} WHERE p.stock <= 10 ORDER BY p.stock ASC LIMIT 5`).all().map(mapProductRow);

  res.json({ stats, recentOrders, lowStock });
};

export const listAdminProducts = (req, res) => {
  const products = db.prepare(`SELECT ${selectProductColumns} ORDER BY p.id DESC`).all().map(mapProductRow);
  res.json({ products });
};

export const upsertProduct = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: "Validation failed.", errors: errors.array() });
  }

  const { id, name, categoryId, shortDescription, description, price, comparePrice, stock, featured, popular, videoUrl, specs } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : req.body.imageUrl || null;
  const createdAt = new Date().toISOString();
  const slug = slugify(name);
  const specsJson = JSON.stringify((specs || "").split("\n").map((item) => item.trim()).filter(Boolean));
  const featuredValue = parseBoolean(featured) ? 1 : 0;
  const popularValue = parseBoolean(popular) ? 1 : 0;

  if (id) {
    const existing = db.prepare("SELECT * FROM products WHERE id = ?").get(id);
    if (!existing) {
      return res.status(404).json({ message: "Product not found." });
    }
    db.prepare(`
      UPDATE products
      SET category_id = ?, name = ?, slug = ?, short_description = ?, description = ?, price = ?, compare_price = ?,
          stock = ?, featured = ?, popular = ?, image_url = ?, video_url = ?, specs = ?, updated_at = ?
      WHERE id = ?
    `).run(
      categoryId || null,
      name,
      slug,
      shortDescription || "",
      description || "",
      Number(price),
      comparePrice ? Number(comparePrice) : null,
      Number(stock || 0),
      featuredValue,
      popularValue,
      imageUrl,
      videoUrl || "",
      specsJson,
      createdAt,
      Number(id)
    );
    if (req.file && existing.image_url && existing.image_url !== imageUrl && existing.image_url.startsWith("/uploads/")) {
      deleteFileIfExists(existing.image_url);
    }
  } else {
    db.prepare(`
      INSERT INTO products (
        category_id, name, slug, short_description, description, price, compare_price, stock,
        featured, popular, image_url, video_url, specs, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      categoryId || null,
      name,
      slug,
      shortDescription || "",
      description || "",
      Number(price),
      comparePrice ? Number(comparePrice) : null,
      Number(stock || 0),
      featuredValue,
      popularValue,
      imageUrl,
      videoUrl || "",
      specsJson,
      createdAt,
      createdAt
    );
  }

  res.status(id ? 200 : 201).json({ message: `Product ${id ? "updated" : "created"} successfully.` });
};

export const deleteProduct = (req, res) => {
  const product = db.prepare("SELECT * FROM products WHERE id = ?").get(req.params.id);
  if (!product) {
    return res.status(404).json({ message: "Product not found." });
  }
  db.prepare("DELETE FROM products WHERE id = ?").run(req.params.id);
  if (product.image_url?.startsWith("/uploads/")) {
    deleteFileIfExists(product.image_url);
  }
  res.json({ message: "Product deleted." });
};

export const listCategories = (req, res) => {
  res.json({ categories: getCategories() });
};

export const upsertCategory = (req, res) => {
  const { id, name, description } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Category name is required." });
  }
  const slug = slugify(name);
  if (id) {
    db.prepare("UPDATE categories SET name = ?, slug = ?, description = ? WHERE id = ?").run(name, slug, description || "", id);
  } else {
    db.prepare("INSERT INTO categories (name, slug, description, created_at) VALUES (?, ?, ?, ?)").run(name, slug, description || "", new Date().toISOString());
  }
  res.status(id ? 200 : 201).json({ message: `Category ${id ? "updated" : "created"}.` });
};

export const deleteCategory = (req, res) => {
  db.prepare("DELETE FROM categories WHERE id = ?").run(req.params.id);
  res.json({ message: "Category deleted." });
};

export const listOrders = (req, res) => {
  const orders = db.prepare("SELECT * FROM orders ORDER BY id DESC").all().map((order) => ({
    ...order,
    items: db.prepare("SELECT * FROM order_items WHERE order_id = ?").all(order.id)
  }));
  res.json({ orders });
};

export const updateOrderStatus = (req, res) => {
  const { status } = req.body;
  db.prepare("UPDATE orders SET status = ? WHERE id = ?").run(status, req.params.id);
  res.json({ message: "Order status updated." });
};

export const listReviews = (req, res) => {
  const reviews = db.prepare(`
    SELECT r.*, p.name AS product_name
    FROM reviews r
    LEFT JOIN products p ON p.id = r.product_id
    ORDER BY r.id DESC
  `).all();
  res.json({ reviews });
};

export const updateReviewStatus = (req, res) => {
  db.prepare("UPDATE reviews SET status = ? WHERE id = ?").run(req.body.status, req.params.id);
  res.json({ message: "Review status updated." });
};

export const deleteReview = (req, res) => {
  db.prepare("DELETE FROM reviews WHERE id = ?").run(req.params.id);
  res.json({ message: "Review deleted." });
};

export const listMessages = (req, res) => {
  const messages = db.prepare("SELECT * FROM contact_messages ORDER BY id DESC").all();
  res.json({ messages });
};

export const listUsers = (req, res) => {
  const users = db.prepare("SELECT id, name, email, phone, role, created_at FROM users ORDER BY id DESC").all();
  res.json({ users });
};

export const getSettingsBundle = (req, res) => {
  const settings = getSettings();
  const openingHours = getOpeningHours();
  const banners = db.prepare("SELECT * FROM homepage_banners ORDER BY id DESC").all();
  res.json({ settings, openingHours, banners });
};

export const updateSettingsBundle = (req, res) => {
  const { settings = {}, openingHours = [], banners = [] } = req.body;
  const upsertSetting = db.prepare(`
    INSERT INTO settings (key, value, updated_at)
    VALUES (?, ?, ?)
    ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at
  `);

  const now = new Date().toISOString();
  Object.entries(settings).forEach(([key, value]) => upsertSetting.run(key, JSON.stringify(value), now));

  const updateHour = db.prepare("UPDATE opening_hours SET opens_at = ?, closes_at = ?, is_closed = ? WHERE id = ?");
  openingHours.forEach((entry) => updateHour.run(entry.opens_at || null, entry.closes_at || null, entry.is_closed ? 1 : 0, entry.id));

  db.prepare("DELETE FROM homepage_banners").run();
  const insertBanner = db.prepare(`
    INSERT INTO homepage_banners (title, subtitle, cta_label, cta_link, accent_text, active, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  banners.forEach((banner) => {
    if (banner.title) {
      insertBanner.run(banner.title, banner.subtitle || "", banner.cta_label || "", banner.cta_link || "", banner.accent_text || "", parseBoolean(banner.active) ? 1 : 0, now);
    }
  });

  res.json({ message: "Settings updated." });
};
