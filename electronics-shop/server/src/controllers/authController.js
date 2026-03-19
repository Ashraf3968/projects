import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import { db } from "../db/index.js";
import { createToken } from "../middleware/auth.js";

const authResponse = (user) => ({
  token: createToken(user),
  user: {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    created_at: user.created_at
  }
});

export const signup = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: "Validation failed.", errors: errors.array() });
  }

  const { name, email, phone, password } = req.body;
  const normalizedEmail = email.toLowerCase();
  const existing = db.prepare("SELECT id FROM users WHERE email = ?").get(normalizedEmail);
  if (existing) {
    return res.status(409).json({ message: "An account with this email already exists." });
  }

  const passwordHash = bcrypt.hashSync(password, 10);
  const result = db.prepare(`
    INSERT INTO users (name, email, phone, password_hash, role, created_at)
    VALUES (?, ?, ?, ?, 'user', ?)
  `).run(name, normalizedEmail, phone || "", passwordHash, new Date().toISOString());

  const user = db.prepare("SELECT id, name, email, phone, role, created_at FROM users WHERE id = ?").get(result.lastInsertRowid);
  res.status(201).json(authResponse(user));
};

export const login = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: "Validation failed.", errors: errors.array() });
  }

  const { email, password } = req.body;
  const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email.toLowerCase());
  if (!user || !bcrypt.compareSync(password, user.password_hash)) {
    return res.status(401).json({ message: "Invalid email or password." });
  }

  res.json(authResponse(user));
};

export const me = (req, res) => {
  res.json({ user: req.user });
};
