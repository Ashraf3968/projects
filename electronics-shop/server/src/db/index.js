import fs from "fs";
import path from "path";
import Database from "better-sqlite3";
import bcrypt from "bcryptjs";
import { paths } from "../config/env.js";
import { schema } from "./schema.js";
import { bannerSeeds, categories, defaultSettings, products, reviewSeeds } from "./seedData.js";

fs.mkdirSync(paths.dataDir, { recursive: true });
fs.mkdirSync(paths.uploadsDir, { recursive: true });

const dbPath = path.join(paths.dataDir, "electronics-shop.sqlite");
export const db = new Database(dbPath);
db.pragma("journal_mode = WAL");
db.exec(schema);

const nowIso = () => new Date().toISOString();

const ensureSettings = () => {
  const upsert = db.prepare(`
    INSERT INTO settings (key, value, updated_at)
    VALUES (?, ?, ?)
    ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at
  `);

  Object.entries(defaultSettings).forEach(([key, value]) => {
    if (!db.prepare("SELECT key FROM settings WHERE key = ?").get(key)) {
      upsert.run(key, JSON.stringify(value), nowIso());
    }
  });
};

const ensureOpeningHours = () => {
  const days = [
    ["Monday", "10:00", "20:00", 0, 1],
    ["Tuesday", "10:00", "20:00", 0, 2],
    ["Wednesday", "10:00", "20:00", 0, 3],
    ["Thursday", "10:00", "20:00", 0, 4],
    ["Friday", "10:00", "21:00", 0, 5],
    ["Saturday", "10:00", "21:00", 0, 6],
    ["Sunday", null, null, 1, 7]
  ];

  const stmt = db.prepare(`
    INSERT OR IGNORE INTO opening_hours (day, opens_at, closes_at, is_closed, sort_order)
    VALUES (?, ?, ?, ?, ?)
  `);

  days.forEach((entry) => stmt.run(...entry));
};

const ensureUsers = () => {
  const count = db.prepare("SELECT COUNT(*) AS count FROM users").get().count;
  if (count > 0) return;

  const insert = db.prepare(`
    INSERT INTO users (name, email, phone, password_hash, role, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  insert.run("Admin User", "admin@digitquo.com", "+91 90000 11111", bcrypt.hashSync("digitquo@123", 10), "admin", nowIso());
  insert.run("Demo Shopper", "user@nexora.local", "+91 90000 22222", bcrypt.hashSync("User123!", 10), "user", nowIso());
};

const ensureCatalog = () => {
  const categoryCount = db.prepare("SELECT COUNT(*) AS count FROM categories").get().count;
  if (categoryCount === 0) {
    const insertCategory = db.prepare("INSERT INTO categories (name, slug, description, created_at) VALUES (?, ?, ?, ?)");
    categories.forEach((category) => insertCategory.run(...category, nowIso()));
  }

  const productCount = db.prepare("SELECT COUNT(*) AS count FROM products").get().count;
  if (productCount === 0) {
    const insertProduct = db.prepare(`
      INSERT INTO products (
        category_id, name, slug, short_description, description, price, compare_price, stock,
        featured, popular, image_url, video_url, specs, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    products.forEach((product) => {
      const category = db.prepare("SELECT id FROM categories WHERE slug = ?").get(product.category);
      insertProduct.run(
        category?.id || null,
        product.name,
        product.slug,
        product.short_description,
        product.description,
        product.price,
        product.compare_price,
        product.stock,
        product.featured,
        product.popular,
        product.image_url || null,
        null,
        JSON.stringify(product.specs),
        nowIso(),
        nowIso()
      );
    });
  }

  const reviewCount = db.prepare("SELECT COUNT(*) AS count FROM reviews").get().count;
  if (reviewCount === 0) {
    const demoUser = db.prepare("SELECT id FROM users WHERE role = 'user' LIMIT 1").get();
    const product = db.prepare("SELECT id FROM products ORDER BY id LIMIT 1").get();
    const insertReview = db.prepare(`
      INSERT INTO reviews (user_id, product_id, name, rating, comment, status, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    reviewSeeds.forEach((review) => insertReview.run(demoUser?.id || null, product?.id || null, ...review, nowIso()));
  }

  const bannerCount = db.prepare("SELECT COUNT(*) AS count FROM homepage_banners").get().count;
  if (bannerCount === 0) {
    const insertBanner = db.prepare(`
      INSERT INTO homepage_banners (title, subtitle, cta_label, cta_link, accent_text, active, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    bannerSeeds.forEach((banner) => insertBanner.run(...banner, nowIso()));
  }
};

export const initializeDatabase = () => {
  ensureSettings();
  ensureOpeningHours();
  ensureUsers();
  ensureCatalog();
};

initializeDatabase();
