export const slugify = (value = "") =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || `item-${Date.now()}`;

export const parseJson = (value, fallback) => {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

export const formatSettings = (rows) =>
  rows.reduce((acc, row) => {
    acc[row.key] = parseJson(row.value, row.value);
    return acc;
  }, {});
