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
  },
  {
    category: "mobiles",
    name: "Orbit Note Air",
    slug: "orbit-note-air",
    image_url: "/products-mobile.svg",
    short_description: "Slim 5G phone with bright display and fast charging.",
    description: "Orbit Note Air balances battery life, clean design, and dependable cameras for daily work and entertainment.",
    price: 42999,
    compare_price: 46999,
    stock: 26,
    featured: 0,
    popular: 1,
    specs: ["6.5-inch OLED", "128GB storage", "45W fast charge", "Dual stereo speakers"]
  },
  {
    category: "laptops",
    name: "TitanBook Creator 16",
    slug: "titanbook-creator-16",
    image_url: "/products-laptop.svg",
    short_description: "Performance laptop for editing, 3D work, and multitasking.",
    description: "TitanBook Creator 16 delivers a large high-refresh display, powerful graphics, and a studio-ready keyboard deck.",
    price: 154999,
    compare_price: 169999,
    stock: 7,
    featured: 1,
    popular: 1,
    specs: ["16-inch 3.2K 120Hz", "32GB RAM", "1TB SSD", "RTX-class graphics"]
  },
  {
    category: "headphones",
    name: "EchoBuds Lite",
    slug: "echobuds-lite",
    image_url: "/products-headphones.svg",
    short_description: "Compact true wireless earbuds with clear calls and punchy sound.",
    description: "EchoBuds Lite keeps daily listening simple with low-latency pairing, reliable microphones, and comfortable all-day fit.",
    price: 5999,
    compare_price: 7499,
    stock: 58,
    featured: 0,
    popular: 1,
    specs: ["ANC earbuds", "Bluetooth 5.4", "28hr case battery", "IPX4 splash resistance"]
  },
  {
    category: "smart-watches",
    name: "Stride Fit Band Pro",
    slug: "stride-fit-band-pro",
    image_url: "/products-watch.svg",
    short_description: "Fitness-first wearable with sleep insights and long battery life.",
    description: "Stride Fit Band Pro tracks workouts, heart rate, and recovery while staying lightweight for daily wear.",
    price: 8999,
    compare_price: 10999,
    stock: 33,
    featured: 0,
    popular: 0,
    specs: ["1.9-inch AMOLED", "14-day battery", "100+ sport modes", "SpO2 tracking"]
  },
  {
    category: "tvs",
    name: "CineView Mini LED 55",
    slug: "cineview-mini-led-55",
    image_url: "/products-tv.svg",
    short_description: "55-inch smart TV with sharp contrast and gaming-ready refresh rate.",
    description: "CineView Mini LED 55 brings bright HDR scenes, smooth sports playback, and a responsive smart interface to modern living rooms.",
    price: 68999,
    compare_price: 75999,
    stock: 12,
    featured: 1,
    popular: 0,
    specs: ["55-inch 4K mini LED", "144Hz gaming mode", "Dolby Atmos", "Hands-free voice control"]
  },
  {
    category: "accessories",
    name: "ChargeSphere 3-in-1 Stand",
    slug: "chargesphere-3-in-1-stand",
    image_url: "/products-hub.svg",
    short_description: "Wireless charging dock for phone, earbuds, and smartwatch.",
    description: "ChargeSphere keeps bedside and desk setups tidy with one compact stand for all your everyday charging needs.",
    price: 4999,
    compare_price: 6299,
    stock: 48,
    featured: 0,
    popular: 1,
    specs: ["15W phone charging", "Earbuds pad", "Watch puck mount", "Fold-flat design"]
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
