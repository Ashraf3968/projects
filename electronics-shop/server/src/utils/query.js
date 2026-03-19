import { db } from "../db/index.js";
import { formatSettings, parseJson } from "./helpers.js";

export const getSettings = () => {
  const rows = db.prepare("SELECT key, value FROM settings").all();
  return formatSettings(rows);
};

export const getOpeningHours = () => db.prepare("SELECT * FROM opening_hours ORDER BY sort_order").all();

export const getCategories = () => db.prepare("SELECT * FROM categories ORDER BY name").all();

export const mapProductRow = (row) => ({
  ...row,
  specs: parseJson(row.specs, []),
  in_stock: row.stock > 0,
  category: row.category_name
    ? {
        id: row.category_id,
        name: row.category_name,
        slug: row.category_slug
      }
    : null
});

export const selectProductColumns = `
  p.*, c.name AS category_name, c.slug AS category_slug
  FROM products p
  LEFT JOIN categories c ON c.id = p.category_id
`;
