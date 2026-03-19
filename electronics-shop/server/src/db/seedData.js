export const defaultSettings = {
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

export const categories = [
  ["Mobiles", "mobiles", "Latest smartphones with fast delivery."],
  ["Laptops", "laptops", "Productivity and gaming laptops."],
  ["Accessories", "accessories", "Everyday tech accessories and essentials."],
  ["Headphones", "headphones", "Wireless audio and studio-grade sound."],
  ["Smart Watches", "smart-watches", "Fitness and lifestyle smart wearables."],
  ["TVs", "tvs", "Immersive entertainment displays."]
];

export const products = [
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
    featured: 1,
    popular: 1,
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
    featured: 1,
    popular: 1,
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
    featured: 1,
    popular: 0,
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
    featured: 0,
    popular: 1,
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
    featured: 1,
    popular: 1,
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
    featured: 0,
    popular: 0,
    specs: ["HDMI 4K", "100W pass-through", "Gigabit ethernet", "SD + microSD"]
  }
];

export const reviewSeeds = [
  ["Ananya Sharma", 5, "Fast delivery, genuine products, and the support team actually helped me choose the right laptop.", "approved"],
  ["Rahul Mehta", 5, "The TV installation experience felt premium from start to finish.", "approved"],
  ["Neha Kapoor", 4, "Clean ordering flow and good communication on WhatsApp.", "approved"]
];

export const bannerSeeds = [
  ["Upgrade Your Setup", "Premium laptops, phones, and audio for modern living.", "Shop Now", "/products", "Trusted local electronics store", 1],
  ["Weekend Flash Deals", "Exclusive savings across TVs, wearables, and accessories.", "View Offers", "/products?sort=popular", "Limited-time savings", 1]
];
