import { validationResult } from "express-validator";
import { db } from "../db/index.js";
import { sendMail } from "../services/mailService.js";
import { getCategories, getOpeningHours, getSettings, mapProductRow, selectProductColumns } from "../utils/query.js";

const safeNumber = (value, fallback = 0) => Number(value || fallback);

export const getBootstrap = (req, res) => {
  const settings = getSettings();
  const categories = getCategories();
  const openingHours = getOpeningHours();
  const banners = db.prepare("SELECT * FROM homepage_banners WHERE active = 1 ORDER BY id DESC").all();
  const featuredProducts = db.prepare(`SELECT ${selectProductColumns} WHERE p.featured = 1 ORDER BY p.id DESC LIMIT 4`).all().map(mapProductRow);
  const approvedReviews = db.prepare("SELECT id, name, rating, comment, created_at FROM reviews WHERE status = 'approved' ORDER BY id DESC LIMIT 6").all();
  res.json({ settings, categories, openingHours, banners, featuredProducts, reviews: approvedReviews });
};

export const listProducts = (req, res) => {
  const { search = "", category = "", sort = "latest" } = req.query;
  const clauses = [];
  const params = [];

  if (search) {
    clauses.push("(p.name LIKE ? OR p.short_description LIKE ? OR p.description LIKE ?)");
    params.push(`%${search}%`, `%${search}%`, `%${search}%`);
  }

  if (category) {
    clauses.push("c.slug = ?");
    params.push(category);
  }

  const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";
  const sortSql = {
    price_asc: "ORDER BY p.price ASC",
    price_desc: "ORDER BY p.price DESC",
    popular: "ORDER BY p.popular DESC, p.id DESC",
    latest: "ORDER BY p.id DESC"
  }[sort] || "ORDER BY p.id DESC";

  const rows = db.prepare(`SELECT ${selectProductColumns} ${where} ${sortSql}`).all(...params);
  res.json({ products: rows.map(mapProductRow) });
};

export const getProductBySlug = (req, res) => {
  const product = db.prepare(`SELECT ${selectProductColumns} WHERE p.slug = ?`).get(req.params.slug);
  if (!product) {
    return res.status(404).json({ message: "Product not found." });
  }

  const reviews = db.prepare(`
    SELECT id, name, rating, comment, created_at
    FROM reviews
    WHERE product_id = ? AND status = 'approved'
    ORDER BY id DESC
  `).all(product.id);

  res.json({ product: mapProductRow(product), reviews });
};

export const getCategoriesList = (req, res) => {
  res.json({ categories: getCategories() });
};

export const getApprovedReviews = (req, res) => {
  const reviews = db.prepare(`
    SELECT r.id, r.name, r.rating, r.comment, r.created_at, p.name AS product_name
    FROM reviews r
    LEFT JOIN products p ON p.id = r.product_id
    WHERE r.status = 'approved'
    ORDER BY r.id DESC
  `).all();
  res.json({ reviews });
};

export const submitReview = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: "Validation failed.", errors: errors.array() });
  }

  const { productId, rating, comment } = req.body;
  const product = db.prepare("SELECT id FROM products WHERE id = ?").get(productId);
  if (!product) {
    return res.status(404).json({ message: "Product not found." });
  }

  db.prepare(`
    INSERT INTO reviews (user_id, product_id, name, rating, comment, status, created_at)
    VALUES (?, ?, ?, ?, ?, 'pending', ?)
  `).run(req.user.id, productId, req.user.name, rating, comment, new Date().toISOString());

  res.status(201).json({ message: "Review submitted for moderation." });
};

export const submitContact = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: "Validation failed.", errors: errors.array() });
  }

  const { name, email, phone, subject, message } = req.body;
  db.prepare(`
    INSERT INTO contact_messages (name, email, phone, subject, message, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(name, email, phone || "", subject || "", message, new Date().toISOString());

  const settings = getSettings();
  await sendMail({
    kind: "contact",
    recipient: settings.email,
    subject: `New contact enquiry from ${name}`,
    html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Phone:</strong> ${phone || "-"}</p><p><strong>Subject:</strong> ${subject || "General enquiry"}</p><p>${message}</p>`
  });

  res.status(201).json({ message: "Your message has been received." });
};

export const createOrder = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: "Validation failed.", errors: errors.array() });
  }

  const { customerName, customerEmail, customerPhone, address, city, notes, items } = req.body;
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: "Cart is empty." });
  }

  const getProduct = db.prepare("SELECT * FROM products WHERE id = ?");
  let subtotal = 0;
  const normalizedItems = [];

  for (const item of items) {
    const product = getProduct.get(item.productId);
    if (!product) {
      return res.status(404).json({ message: `Product ${item.productId} not found.` });
    }
    const quantity = safeNumber(item.quantity, 1);
    if (product.stock < quantity) {
      return res.status(400).json({ message: `${product.name} does not have enough stock.` });
    }
    subtotal += safeNumber(product.price) * quantity;
    normalizedItems.push({ product, quantity });
  }

  const shippingFee = subtotal >= 50000 ? 0 : 499;
  const total = subtotal + shippingFee;
  const orderNumber = `NX-${Date.now()}`;
  const createdAt = new Date().toISOString();

  const orderId = db.transaction(() => {
    const orderResult = db.prepare(`
      INSERT INTO orders (
        user_id, order_number, customer_name, customer_email, customer_phone, address, city,
        notes, subtotal, shipping_fee, total, status, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?)
    `).run(
      req.user?.id || null,
      orderNumber,
      customerName,
      customerEmail,
      customerPhone,
      address,
      city,
      notes || "",
      subtotal,
      shippingFee,
      total,
      createdAt
    );

    const insertItem = db.prepare(`
      INSERT INTO order_items (order_id, product_id, product_name, price, quantity, image_url)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    const updateStock = db.prepare("UPDATE products SET stock = stock - ?, updated_at = ? WHERE id = ?");

    normalizedItems.forEach(({ product, quantity }) => {
      insertItem.run(orderResult.lastInsertRowid, product.id, product.name, product.price, quantity, product.image_url);
      updateStock.run(quantity, createdAt, product.id);
    });

    return orderResult.lastInsertRowid;
  })();

  const order = db.prepare("SELECT * FROM orders WHERE id = ?").get(orderId);
  const settings = getSettings();
  await sendMail({
    kind: "order",
    recipient: customerEmail,
    subject: `Order confirmation ${order.order_number}`,
    html: `<p>Thank you for shopping with ${settings.shop_name}.</p><p>Your order <strong>${order.order_number}</strong> has been placed successfully.</p><p>Total: <strong>Rs. ${order.total.toLocaleString("en-IN")}</strong></p>`
  });

  res.status(201).json({
    message: "Order placed successfully.",
    order: {
      ...order,
      items: db.prepare("SELECT * FROM order_items WHERE order_id = ?").all(order.id)
    }
  });
};
