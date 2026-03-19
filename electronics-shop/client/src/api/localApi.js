const STORAGE_KEY = "nexora_local_db_v1";

const defaultSettings = {
  shop_name: "Nexora Electronics",
  logo_text: "NX",
  phone: "+91 98765 43210",
  whatsapp: "+919876543210",
  instagram: "https://instagram.com/nexoraelectronics",
  email: "hello@nexora-electronics.local",
  address: "24 Tech Park Road, Bangalore, India",
  hero_title: "Premium electronics for work, gaming, and modern living.",
  hero_subtitle: "Discover flagship devices, trusted support, flexible ordering, and a showroom-quality buying experience.",
  offer_banner: "Weekend Offer: Save up to 20% on laptops, TVs, and audio gear.",
  business_summary: "Nexora Electronics curates reliable consumer tech with fast local service, expert guidance, and premium after-sales support.",
  trust_blurb: "Authorized products, transparent pricing, and fast delivery from a team customers can trust.",
  map_placeholder: "Interactive map placeholder. Replace with your embedded map or showroom coordinates later.",
  footer_note: "Trusted electronics retail for homes, creators, and businesses.",
  instagram_handle: "@nexoraelectronics"
};

const categorySeeds = [
  ["Mobiles", "mobiles", "Latest smartphones with fast delivery."],
  ["Laptops", "laptops", "Productivity and gaming laptops."],
  ["Accessories", "accessories", "Everyday tech accessories and essentials."],
  ["Headphones", "headphones", "Wireless audio and studio-grade sound."],
  ["Smart Watches", "smart-watches", "Fitness and lifestyle smart wearables."],
  ["TVs", "tvs", "Immersive entertainment displays."]
];

const productSeeds = [
  {
    category: "mobiles",
    name: "Astra X Pro 5G",
    slug: "astra-x-pro-5g",
    image_url: "/products-mobile.svg",
    short_description: "Flagship smartphone with pro camera and all-day battery.",
    description: "Astra X Pro 5G delivers smooth performance, a vivid AMOLED display, and advanced imaging for creators and professionals.",
    price: 79999,
    compare_price: 85999,
    stock: 18,
    featured: true,
    popular: true,
    specs: ["6.7-inch AMOLED", "256GB storage", "50MP triple camera", "5000mAh battery"]
  },
  {
    category: "laptops",
    name: "VoltBook Ultra 14",
    slug: "voltbook-ultra-14",
    image_url: "/products-laptop.svg",
    short_description: "Thin premium laptop for work, design, and travel.",
    description: "VoltBook Ultra pairs a lightweight aluminum build with long battery life and a color-accurate display.",
    price: 112500,
    compare_price: 125000,
    stock: 10,
    featured: true,
    popular: true,
    specs: ["14-inch 2.8K display", "16GB RAM", "1TB SSD", "AI-ready processor"]
  },
  {
    category: "headphones",
    name: "Pulse ANC Studio",
    slug: "pulse-anc-studio",
    image_url: "/products-headphones.svg",
    short_description: "Wireless noise-canceling headphones with premium sound.",
    description: "Pulse ANC Studio is tuned for travel, office, and immersive music sessions with adaptive noise cancellation.",
    price: 18999,
    compare_price: 21999,
    stock: 36,
    featured: true,
    popular: false,
    specs: ["40hr battery", "Adaptive ANC", "Hi-Res audio", "Fast charge"]
  },
  {
    category: "smart-watches",
    name: "Nova Watch S4",
    slug: "nova-watch-s4",
    image_url: "/products-watch.svg",
    short_description: "Health, fitness, and productivity in one elegant smartwatch.",
    description: "Nova Watch S4 brings premium materials, deep health tracking, and crisp notifications to your wrist.",
    price: 24999,
    compare_price: 27999,
    stock: 22,
    featured: false,
    popular: true,
    specs: ["AMOLED always-on display", "GPS", "7-day battery", "Water resistant"]
  },
  {
    category: "tvs",
    name: "VisionMax QLED 65",
    slug: "visionmax-qled-65",
    image_url: "/products-tv.svg",
    short_description: "Cinema-grade 4K QLED TV with rich contrast and smart features.",
    description: "VisionMax QLED 65 is built for living rooms that demand striking brightness, sound, and streaming performance.",
    price: 94999,
    compare_price: 104999,
    stock: 8,
    featured: true,
    popular: true,
    specs: ["65-inch 4K QLED", "120Hz panel", "Dolby Vision", "Smart TV OS"]
  },
  {
    category: "accessories",
    name: "CoreDock 9-in-1 Hub",
    slug: "coredock-9-in-1-hub",
    image_url: "/products-hub.svg",
    short_description: "Professional USB-C hub for creators and remote teams.",
    description: "CoreDock expands your workspace with display, ethernet, charging, and storage options in one compact hub.",
    price: 6999,
    compare_price: 8499,
    stock: 42,
    featured: false,
    popular: false,
    specs: ["HDMI 4K", "100W pass-through", "Gigabit ethernet", "SD + microSD"]
  }
];

const reviewSeeds = [
  ["Ananya Sharma", 5, "Fast delivery, genuine products, and the support team actually helped me choose the right laptop.", "approved", 2],
  ["Rahul Mehta", 5, "The TV installation experience felt premium from start to finish.", "approved", 5],
  ["Neha Kapoor", 4, "Clean ordering flow and good communication on WhatsApp.", "approved", 1]
];

const bannerSeeds = [
  ["Upgrade Your Setup", "Premium laptops, phones, and audio for modern living.", "Shop Now", "/products", "Trusted local electronics store", true],
  ["Weekend Flash Deals", "Exclusive savings across TVs, wearables, and accessories.", "View Offers", "/products?sort=popular", "Limited-time savings", true]
];

const openingHourSeeds = [
  ["Monday", "10:00", "20:00", false],
  ["Tuesday", "10:00", "20:00", false],
  ["Wednesday", "10:00", "20:00", false],
  ["Thursday", "10:00", "20:00", false],
  ["Friday", "10:00", "20:00", false],
  ["Saturday", "11:00", "21:00", false],
  ["Sunday", "", "", true]
];

const slugify = (value = "") =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const nowIso = () => new Date().toISOString();
const clone = (value) => JSON.parse(JSON.stringify(value));
const nextId = (items) => items.reduce((max, item) => Math.max(max, Number(item.id) || 0), 0) + 1;

const createInitialDb = () => {
  const createdAt = nowIso();
  const categories = categorySeeds.map(([name, slug, description], index) => ({
    id: index + 1,
    name,
    slug,
    description,
    created_at: createdAt
  }));

  const products = productSeeds.map((product, index) => {
    const category = categories.find((item) => item.slug === product.category);
    return {
      id: index + 1,
      category_id: category?.id || null,
      name: product.name,
      slug: product.slug,
      short_description: product.short_description,
      description: product.description,
      price: product.price,
      compare_price: product.compare_price,
      stock: product.stock,
      featured: product.featured,
      popular: product.popular,
      image_url: product.image_url || null,
      video_url: "",
      specs: product.specs,
      created_at: createdAt,
      updated_at: createdAt
    };
  });

  const reviews = reviewSeeds.map(([name, rating, comment, status, productId], index) => ({
    id: index + 1,
    user_id: null,
    product_id: productId,
    name,
    rating,
    comment,
    status,
    created_at: createdAt
  }));

  const banners = bannerSeeds.map(([title, subtitle, ctaLabel, ctaLink, accentText, active], index) => ({
    id: index + 1,
    title,
    subtitle,
    cta_label: ctaLabel,
    cta_link: ctaLink,
    accent_text: accentText,
    active,
    created_at: createdAt
  }));

  const openingHours = openingHourSeeds.map(([day, opensAt, closesAt, isClosed], index) => ({
    id: index + 1,
    day,
    opens_at: opensAt,
    closes_at: closesAt,
    is_closed: isClosed,
    sort_order: index
  }));

  const users = [
    { id: 1, name: "Admin User", email: "admin@digitquo.com", phone: "+91 99999 11111", password: "digitquo@123", role: "admin", created_at: createdAt },
    { id: 2, name: "Demo Shopper", email: "user@nexora.local", phone: "+91 99999 22222", password: "User123!", role: "user", created_at: createdAt }
  ];

  return {
    settings: defaultSettings,
    categories,
    products,
    reviews,
    banners,
    openingHours,
    users,
    orders: [],
    messages: []
  };
};

const migrateDb = (db) => {
  const productImageMap = Object.fromEntries(productSeeds.map((item) => [item.slug, item.image_url || null]));
  db.products = db.products.map((item) => ({
    ...item,
    image_url: item.image_url || productImageMap[item.slug] || null
  }));

  const admin = db.users.find((item) => item.role === "admin");
  if (admin) {
    admin.email = "admin@digitquo.com";
    admin.password = "digitquo@123";
  }

  return db;
};

const readDb = () => {
  const existing = localStorage.getItem(STORAGE_KEY);
  if (existing) {
    const migrated = migrateDb(JSON.parse(existing));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
    return migrated;
  }
  const initial = createInitialDb();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
  return initial;
};

const writeDb = (db) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
  return db;
};

const publicUser = (user) => {
  if (!user) return null;
  const { password, ...safe } = user;
  return safe;
};

const getCurrentUser = (db) => {
  const token = localStorage.getItem("electronics_token") || "";
  const match = token.match(/^local-(\d+)$/);
  if (!match) return null;
  return db.users.find((user) => user.id === Number(match[1])) || null;
};

const requireUser = (db) => {
  const user = getCurrentUser(db);
  if (!user) throw new Error("Please log in to continue.");
  return user;
};

const requireAdmin = (db) => {
  const user = requireUser(db);
  if (user.role !== "admin") throw new Error("Admin access required.");
  return user;
};

const withCategory = (db, product) => {
  const category = db.categories.find((item) => item.id === product.category_id) || null;
  return {
    ...clone(product),
    in_stock: product.stock > 0,
    category: category ? { id: category.id, name: category.name, slug: category.slug } : null
  };
};

const sortProducts = (products, sort) => {
  const list = [...products];
  switch (sort) {
    case "price_asc":
      return list.sort((a, b) => a.price - b.price);
    case "price_desc":
      return list.sort((a, b) => b.price - a.price);
    case "popular":
      return list.sort((a, b) => Number(b.popular) - Number(a.popular) || b.id - a.id);
    default:
      return list.sort((a, b) => b.id - a.id);
  }
};

const fileToDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Could not read the selected file."));
    reader.readAsDataURL(file);
  });

export const localApi = {
  async bootstrap() {
    const db = readDb();
    return {
      settings: clone(db.settings),
      categories: clone(db.categories),
      openingHours: clone(db.openingHours).sort((a, b) => a.sort_order - b.sort_order),
      banners: clone(db.banners).filter((item) => item.active),
      featuredProducts: db.products.filter((item) => item.featured).slice().sort((a, b) => b.id - a.id).slice(0, 4).map((item) => withCategory(db, item)),
      reviews: clone(db.reviews).filter((item) => item.status === "approved").sort((a, b) => b.id - a.id).slice(0, 6)
    };
  },

  async products(params = "") {
    const db = readDb();
    const query = new URLSearchParams(params.startsWith("?") ? params.slice(1) : params);
    const search = (query.get("search") || "").toLowerCase();
    const category = query.get("category") || "";
    const sort = query.get("sort") || "latest";

    let products = db.products.filter((product) => {
      const matchesSearch =
        !search ||
        product.name.toLowerCase().includes(search) ||
        product.short_description.toLowerCase().includes(search) ||
        product.description.toLowerCase().includes(search);
      const relatedCategory = db.categories.find((item) => item.id === product.category_id);
      const matchesCategory = !category || relatedCategory?.slug === category;
      return matchesSearch && matchesCategory;
    });

    products = sortProducts(products, sort);
    return { products: products.map((item) => withCategory(db, item)) };
  },

  async product(slug) {
    const db = readDb();
    const product = db.products.find((item) => item.slug === slug);
    if (!product) throw new Error("Product not found.");
    const reviews = db.reviews.filter((item) => item.product_id === product.id && item.status === "approved").sort((a, b) => b.id - a.id);
    return { product: withCategory(db, product), reviews: clone(reviews) };
  },

  async contact(payload) {
    const db = readDb();
    const message = {
      id: nextId(db.messages),
      name: payload.name?.trim() || "",
      email: payload.email?.trim() || "",
      phone: payload.phone?.trim() || "",
      subject: payload.subject?.trim() || "",
      message: payload.message?.trim() || "",
      created_at: nowIso()
    };
    if (!message.name || !message.email || message.message.length < 10) {
      throw new Error("Please fill out name, email, and a longer message.");
    }
    db.messages.unshift(message);
    writeDb(db);
    return { message: "Your message has been saved locally." };
  },

  async signup(payload) {
    const db = readDb();
    const email = (payload.email || "").trim().toLowerCase();
    if (!payload.name?.trim() || !email || !payload.password) {
      throw new Error("Name, email, and password are required.");
    }
    if (db.users.some((item) => item.email.toLowerCase() === email)) {
      throw new Error("An account with this email already exists.");
    }
    const user = {
      id: nextId(db.users),
      name: payload.name.trim(),
      email,
      phone: payload.phone?.trim() || "",
      password: payload.password,
      role: "user",
      created_at: nowIso()
    };
    db.users.unshift(user);
    writeDb(db);
    return { token: `local-${user.id}`, user: publicUser(user) };
  },

  async login(payload) {
    const db = readDb();
    const identifier = (payload.email || "").trim().toLowerCase();
    const user = db.users.find((item) => (item.email.toLowerCase() === identifier || item.name.toLowerCase() === identifier) && item.password === payload.password);
    if (!user) throw new Error("Invalid email or password.");
    return { token: `local-${user.id}`, user: publicUser(user) };
  },

  async me() {
    const db = readDb();
    const user = requireUser(db);
    return { user: publicUser(user) };
  },

  async createOrder(payload) {
    const db = readDb();
    if (!Array.isArray(payload.items) || payload.items.length === 0) {
      throw new Error("Cart is empty.");
    }

    const orderItems = payload.items.map((item) => {
      const product = db.products.find((entry) => entry.id === Number(item.productId));
      if (!product) throw new Error(`Product ${item.productId} not found.`);
      const quantity = Math.max(1, Number(item.quantity) || 1);
      if (product.stock < quantity) throw new Error(`${product.name} does not have enough stock.`);
      return { product, quantity };
    });

    const subtotal = orderItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const shippingFee = subtotal >= 50000 ? 0 : 499;
    const total = subtotal + shippingFee;
    const createdAt = nowIso();
    const order = {
      id: nextId(db.orders),
      user_id: getCurrentUser(db)?.id || null,
      order_number: `NX-${Date.now()}`,
      customer_name: payload.customerName?.trim() || "",
      customer_email: payload.customerEmail?.trim() || "",
      customer_phone: payload.customerPhone?.trim() || "",
      address: payload.address?.trim() || "",
      city: payload.city?.trim() || "",
      notes: payload.notes?.trim() || "",
      subtotal,
      shipping_fee: shippingFee,
      total,
      status: "pending",
      created_at: createdAt,
      items: orderItems.map((item, index) => ({
        id: index + 1,
        product_id: item.product.id,
        product_name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        image_url: item.product.image_url
      }))
    };

    orderItems.forEach(({ product, quantity }) => {
      product.stock -= quantity;
      product.updated_at = createdAt;
    });

    db.orders.unshift(order);
    writeDb(db);
    return { message: "Order placed successfully.", order: clone(order) };
  },

  async submitReview(payload) {
    const db = readDb();
    const user = requireUser(db);
    const product = db.products.find((item) => item.id === Number(payload.productId));
    if (!product) throw new Error("Product not found.");
    const comment = payload.comment?.trim() || "";
    if (comment.length < 10) throw new Error("Please write a longer review.");
    db.reviews.unshift({
      id: nextId(db.reviews),
      user_id: user.id,
      product_id: product.id,
      name: user.name,
      rating: Number(payload.rating) || 5,
      comment,
      status: "pending",
      created_at: nowIso()
    });
    writeDb(db);
    return { message: "Review saved locally and marked as pending moderation." };
  },

  async adminDashboard() {
    const db = readDb();
    requireAdmin(db);
    return {
      stats: {
        products: db.products.length,
        orders: db.orders.length,
        messages: db.messages.length,
        revenue: db.orders.filter((item) => item.status !== "cancelled").reduce((sum, item) => sum + item.total, 0)
      },
      recentOrders: clone(db.orders).slice(0, 5),
      lowStock: db.products.filter((item) => item.stock <= 10).sort((a, b) => a.stock - b.stock).slice(0, 5).map((item) => withCategory(db, item))
    };
  },

  async adminProducts() {
    const db = readDb();
    requireAdmin(db);
    return { products: sortProducts(db.products, "latest").map((item) => withCategory(db, item)) };
  },

  async adminSaveProduct(formData) {
    const db = readDb();
    requireAdmin(db);

    const image = formData.get("image");
    const imageUrl = image && image.size ? await fileToDataUrl(image) : null;
    const categoryId = Number(formData.get("categoryId")) || null;
    const createdAt = nowIso();
    const product = {
      id: nextId(db.products),
      category_id: categoryId,
      name: String(formData.get("name") || "").trim(),
      slug: slugify(String(formData.get("name") || "")),
      short_description: String(formData.get("shortDescription") || "").trim(),
      description: String(formData.get("description") || "").trim(),
      price: Number(formData.get("price")) || 0,
      compare_price: Number(formData.get("comparePrice")) || 0,
      stock: Number(formData.get("stock")) || 0,
      featured: String(formData.get("featured")) === "true",
      popular: String(formData.get("popular")) === "true",
      video_url: String(formData.get("videoUrl") || "").trim(),
      image_url: imageUrl,
      specs: String(formData.get("specs") || "")
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
      created_at: createdAt,
      updated_at: createdAt
    };
    if (!product.name) throw new Error("Product name is required.");
    db.products.unshift(product);
    writeDb(db);
    return { product: withCategory(db, product) };
  },

  async adminDeleteProduct(id) {
    const db = readDb();
    requireAdmin(db);
    db.products = db.products.filter((item) => item.id !== Number(id));
    writeDb(db);
    return { message: "Product deleted." };
  },

  async adminCategories() {
    const db = readDb();
    requireAdmin(db);
    return { categories: clone(db.categories).sort((a, b) => a.name.localeCompare(b.name)) };
  },

  async adminSaveCategory(payload) {
    const db = readDb();
    requireAdmin(db);
    const name = payload.name?.trim() || "";
    if (!name) throw new Error("Category name is required.");
    db.categories.unshift({
      id: nextId(db.categories),
      name,
      slug: slugify(name),
      description: payload.description?.trim() || "",
      created_at: nowIso()
    });
    writeDb(db);
    return { message: "Category saved." };
  },

  async adminDeleteCategory(id) {
    const db = readDb();
    requireAdmin(db);
    const categoryId = Number(id);
    db.categories = db.categories.filter((item) => item.id !== categoryId);
    db.products = db.products.map((item) => (item.category_id === categoryId ? { ...item, category_id: null } : item));
    writeDb(db);
    return { message: "Category deleted." };
  },

  async adminOrders() {
    const db = readDb();
    requireAdmin(db);
    return { orders: clone(db.orders) };
  },

  async adminOrderStatus(id, status) {
    const db = readDb();
    requireAdmin(db);
    const order = db.orders.find((item) => item.id === Number(id));
    if (!order) throw new Error("Order not found.");
    order.status = status;
    writeDb(db);
    return { message: "Order updated." };
  },

  async adminReviews() {
    const db = readDb();
    requireAdmin(db);
    return {
      reviews: clone(db.reviews)
        .sort((a, b) => b.id - a.id)
        .map((review) => ({
          ...review,
          product_name: db.products.find((item) => item.id === review.product_id)?.name || "Store review"
        }))
    };
  },

  async adminReviewStatus(id, status) {
    const db = readDb();
    requireAdmin(db);
    const review = db.reviews.find((item) => item.id === Number(id));
    if (!review) throw new Error("Review not found.");
    review.status = status;
    writeDb(db);
    return { message: "Review updated." };
  },

  async adminDeleteReview(id) {
    const db = readDb();
    requireAdmin(db);
    db.reviews = db.reviews.filter((item) => item.id !== Number(id));
    writeDb(db);
    return { message: "Review deleted." };
  },

  async adminMessages() {
    const db = readDb();
    requireAdmin(db);
    return { messages: clone(db.messages) };
  },

  async adminUsers() {
    const db = readDb();
    requireAdmin(db);
    return { users: db.users.map(publicUser) };
  },

  async adminSettings() {
    const db = readDb();
    requireAdmin(db);
    return {
      settings: clone(db.settings),
      openingHours: clone(db.openingHours).sort((a, b) => a.sort_order - b.sort_order),
      banners: clone(db.banners)
    };
  },

  async adminSaveSettings(payload) {
    const db = readDb();
    requireAdmin(db);
    db.settings = { ...db.settings, ...clone(payload.settings) };
    db.openingHours = clone(payload.openingHours).map((item, index) => ({ ...item, sort_order: index }));
    db.banners = clone(payload.banners).map((item, index) => ({
      id: item.id || index + 1,
      title: item.title || "",
      subtitle: item.subtitle || "",
      cta_label: item.cta_label || "",
      cta_link: item.cta_link || "",
      accent_text: item.accent_text || "",
      active: item.active !== false,
      created_at: item.created_at || nowIso()
    }));
    writeDb(db);
    return { message: "Settings updated." };
  }
};
