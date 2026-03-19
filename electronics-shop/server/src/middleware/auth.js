import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { db } from "../db/index.js";

export const createToken = (user) =>
  jwt.sign({ id: user.id, role: user.role, email: user.email }, env.jwtSecret, { expiresIn: "7d" });

export const requireAuth = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authentication required." });
  }

  try {
    const decoded = jwt.verify(header.split(" ")[1], env.jwtSecret);
    const user = db.prepare("SELECT id, name, email, phone, role, created_at FROM users WHERE id = ?").get(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "User not found." });
    }
    req.user = user;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

export const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access required." });
  }
  next();
};
