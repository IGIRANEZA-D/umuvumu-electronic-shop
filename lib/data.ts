import { z } from 'zod';

/**
 * Professional Product Schema
 * Ensuring data integrity for a world-class storefront
 */
export const ProductSchema = z.object({
  id: z.union([z.number(), z.string()]),
  slug: z.string(), // SEO friendly identifier
  name: z.string().min(1),
  price: z.number().positive(),
  originalPrice: z.number().optional(),
  images: z.array(z.string().url()), // Support for galleries
  category: z.string(),
  rating: z.number().min(0).max(5),
  reviews: z.number().int(),
  badge: z.enum(['New', 'Hot', 'Sale', 'Best Seller']).optional(),
  description: z.string(),
  specs: z.array(z.object({
    label: z.string(),
    value: z.string()
  })),
  inStock: z.boolean(),
  brand: z.string(),
  discountPercentage: z.number().optional(),
  priceRange: z.object({
    min: z.number(),
    max: z.number()
  }).optional(),
});

export interface PriceRange {
  min: number;
  max: number;
}

export interface Product {
  id: number | string;
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  rating: number;
  reviews: number;
  badge?: 'New' | 'Hot' | 'Sale' | 'Best Seller';
  description: string;
  specs: { label: string; value: string }[];
  inStock: boolean;
  brand: string;
  discountPercentage?: number;
  priceRange?: PriceRange;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
  gradient: string;
  color: string;
}

/**
 * Utility to generate SEO-friendly slugs
 */
const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');

const calculateDiscount = (price: number, original?: number) => {
  if (!original) return undefined;
  return Math.round(((original - price) / original) * 100);
};

/**
 * Calculate negotiable price range for products
 * Min: 40% of price | Max: 120% of price
 */
const calculatePriceRange = (price: number): PriceRange => ({
  min: Math.round(price * 0.4),
  max: Math.round(price * 1.2)
});

/**
 * Generate WhatsApp message URL with pre-filled inquiry
 */
export const generateWhatsAppLink = (productName: string, minPrice: number, maxPrice: number, phoneNumber: string = "250781277413"): string => {
  const message = `Hi UMUVUMU, I'm interested in *${productName}*. Can we negotiate the price? (Range: ${formatPrice(minPrice)} - ${formatPrice(maxPrice)} RWF)`;
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
};

// Using Unsplash for high-quality images
export const products: Product[] = [
  {
    id: 1,
    slug: slugify("iPhone 15 Pro Max 256GB"),
    name: "iPhone 15 Pro Max 256GB",
    price: 1299000,
    originalPrice: 1450000,
    images: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&q=80",
      "https://images.unsplash.com/photo-1696446701796-da61225697cc?w=600&q=80"
    ],
    category: "smartphones",
    rating: 4.9,
    reviews: 284,
    badge: "Hot",
    description: "Experience the pinnacle of mobile technology with Apple's most advanced iPhone yet. Titanium design, A17 Pro chip, and a revolutionary camera system.",
    specs: [
      { label: "Storage", value: "256GB" },
      { label: "RAM", value: "8GB" },
      { label: "Display", value: "6.7\" Super Retina XDR" },
      { label: "Battery", value: "4422mAh" },
      { label: "Camera", value: "48MP Triple" },
      { label: "OS", value: "iOS 17" }
    ],
    inStock: true,
    brand: "Apple",
    discountPercentage: calculateDiscount(1299000, 1450000),
    priceRange: calculatePriceRange(1299000)
  },
  {
    id: 2,
    slug: slugify("Samsung Galaxy S24 Ultra"),
    name: "Samsung Galaxy S24 Ultra",
    price: 1199000,
    originalPrice: 1350000,
    images: ["https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&q=80"],
    category: "smartphones",
    rating: 4.8,
    reviews: 312,
    badge: "New",
    description: "Galaxy AI is here. Featuring the most powerful Samsung processor, an advanced 200MP camera, and integrated S Pen for unlimited creativity.",
    specs: [
      { label: "Storage", value: "512GB" },
      { label: "RAM", value: "12GB" },
      { label: "Display", value: "6.8\" Dynamic AMOLED 2X" },
      { label: "Battery", value: "5000mAh" },
      { label: "Camera", value: "200MP Quad" },
      { label: "OS", value: "Android 14" }
    ],
    inStock: true,
    brand: "Samsung",
    discountPercentage: calculateDiscount(1199000, 1350000),
    priceRange: calculatePriceRange(1199000)
  },
  {
    id: 3,
    slug: slugify("MacBook Pro 14 M3 Pro"),
    name: "MacBook Pro 14\" M3 Pro",
    price: 2199000,
    images: ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80"],
    category: "laptops",
    rating: 4.9,
    reviews: 189,
    badge: "Best Seller",
    description: "The most powerful MacBook Pro ever. Built for demanding workflows with the M3 Pro chip, Liquid Retina XDR display, and 22-hour battery life.",
    specs: [
      { label: "Chip", value: "Apple M3 Pro" },
      { label: "RAM", value: "18GB" },
      { label: "Storage", value: "512GB SSD" },
      { label: "Display", value: "14.2\" Liquid Retina XDR" },
      { label: "Battery", value: "22 hrs" },
      { label: "Ports", value: "3x Thunderbolt 4" }
    ],
    inStock: true,
    brand: "Apple",
    priceRange: calculatePriceRange(2199000)
  },
  {
    id: 4,
    slug: slugify("Dell XPS 15 OLED"),
    name: "Dell XPS 15 OLED",
    price: 1799000,
    originalPrice: 1999000,
    images: ["https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=600&q=80"],
    category: "laptops",
    rating: 4.7,
    reviews: 143,
    badge: "Sale",
    description: "Premium performance with a stunning OLED display. The Dell XPS 15 delivers incredible visuals and professional-grade power in a sleek aluminum chassis.",
    specs: [
      { label: "CPU", value: "Intel Core i9-13900H" },
      { label: "RAM", value: "32GB DDR5" },
      { label: "Storage", value: "1TB NVMe" },
      { label: "Display", value: "15.6\" OLED 3.5K" },
      { label: "GPU", value: "RTX 4060" },
      { label: "Battery", value: "86Whr" }
    ],
    inStock: true,
    brand: "Dell",
    discountPercentage: calculateDiscount(1799000, 1999000),
    priceRange: calculatePriceRange(1799000)
  },
  {
    id: 5,
    slug: slugify("Samsung 65 QLED 4K TV"),
    name: "Samsung 65\" QLED 4K TV",
    price: 1499000,
    originalPrice: 1799000,
    images: ["https://images.unsplash.com/photo-1593359677879-a4bb92f4834c?w=600&q=80"],
    category: "tvs",
    rating: 4.7,
    reviews: 97,
    badge: "Sale",
    description: "Quantum dot technology meets Neo QLED precision. Experience brilliant colors, deep contrast, and Dolby Atmos sound in this flagship television.",
    specs: [
      { label: "Size", value: "65 inches" },
      { label: "Resolution", value: "4K Ultra HD" },
      { label: "HDR", value: "Quantum HDR 32X" },
      { label: "Sound", value: "2.2.2ch 60W" },
      { label: "Smart", value: "Tizen OS" },
      { label: "Refresh", value: "120Hz" }
    ],
    inStock: true,
    brand: "Samsung",
    discountPercentage: calculateDiscount(1499000, 1799000),
    priceRange: calculatePriceRange(1499000)
  },
  {
    id: 6,
    slug: slugify("Sony WH-1000XM5 Headphones"),
    name: "Sony WH-1000XM5 Headphones",
    price: 399000,
    originalPrice: 450000,
    images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80"],
    category: "audio",
    rating: 4.9,
    reviews: 567,
    badge: "Best Seller",
    description: "Industry-leading noise cancellation with 8 microphones. 30-hour battery, Multipoint connection, and Sony's best-ever sound quality.",
    specs: [
      { label: "Type", value: "Over-ear" },
      { label: "ANC", value: "8-mic array" },
      { label: "Battery", value: "30 hours" },
      { label: "Connectivity", value: "Bluetooth 5.2" },
      { label: "Codec", value: "LDAC, AAC, SBC" },
      { label: "Weight", value: "250g" }
    ],
    inStock: true,
    brand: "Sony",
    discountPercentage: calculateDiscount(399000, 450000),
    priceRange: calculatePriceRange(399000)
  },
  {
    id: 7,
    slug: slugify("PlayStation 5 Slim Console"),
    name: "PlayStation 5 Slim Console",
    price: 549000,
    images: ["https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=600&q=80"],
    category: "gaming",
    rating: 4.9,
    reviews: 445,
    badge: "Hot",
    description: "Experience lightning-fast loading with the PS5's custom SSD, haptic feedback with the DualSense controller, and breathtaking 4K graphics.",
    specs: [
      { label: "GPU", value: "10.28 TFLOPS RDNA 2" },
      { label: "CPU", value: "Zen 2 3.5GHz" },
      { label: "Storage", value: "825GB SSD" },
      { label: "Resolution", value: "Up to 8K" },
      { label: "FPS", value: "Up to 120fps" },
      { label: "Ray Tracing", value: "Yes" }
    ],
    inStock: true,
    brand: "Sony",
    priceRange: calculatePriceRange(549000)
  },
  {
    id: 8,
    slug: slugify("Apple Watch Series 9"),
    name: "Apple Watch Series 9",
    price: 479000,
    originalPrice: 529000,
    images: ["https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&q=80"],
    category: "accessories",
    rating: 4.8,
    reviews: 321,
    badge: "New",
    description: "The most advanced Apple Watch with the S9 chip, Double Tap gesture, Always-On Retina display, and comprehensive health tracking features.",
    specs: [
      { label: "Chip", value: "S9 SiP" },
      { label: "Display", value: "Always-On Retina" },
      { label: "Water", value: "50m WR" },
      { label: "Health", value: "ECG + Blood O2" },
      { label: "Battery", value: "18 hours" },
      { label: "GPS", value: "L1 + L5" }
    ],
    inStock: true,
    brand: "Apple",
    discountPercentage: calculateDiscount(479000, 529000),
    priceRange: calculatePriceRange(479000)
  },
  {
    id: 9,
    slug: slugify("JBL Xtreme 3 Speaker"),
    name: "JBL Xtreme 3 Speaker",
    price: 349000,
    originalPrice: 399000,
    images: ["https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=80"],
    category: "audio",
    rating: 4.6,
    reviews: 198,
    badge: "Sale",
    description: "Massive stereo sound with 100W output. IP67 waterproof, 15-hour playtime, and JBL PartyBoost to connect multiple speakers.",
    specs: [
      { label: "Power", value: "100W" },
      { label: "Battery", value: "15 hours" },
      { label: "Waterproof", value: "IP67" },
      { label: "Bluetooth", value: "5.1" },
      { label: "Ports", value: "USB-A charging" },
      { label: "Weight", value: "1.9kg" }
    ],
    inStock: true,
    brand: "JBL",
    discountPercentage: calculateDiscount(349000, 399000),
    priceRange: calculatePriceRange(349000)
  },
  {
    id: 10,
    slug: slugify("iPad Pro 12.9 M2 WiFi"),
    name: "iPad Pro 12.9\" M2 WiFi",
    price: 1099000,
    images: ["https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&q=80"],
    category: "accessories",
    rating: 4.8,
    reviews: 156,
    badge: "Hot",
    description: "The ultimate iPad experience with the M2 chip, Liquid Retina XDR display with ProMotion, and Apple Pencil hover capability.",
    specs: [
      { label: "Chip", value: "Apple M2" },
      { label: "Display", value: "12.9\" Liquid Retina XDR" },
      { label: "Storage", value: "256GB" },
      { label: "Camera", value: "12MP Wide + 10MP Ultra Wide" },
      { label: "Connectivity", value: "WiFi 6E" },
      { label: "Battery", value: "10 hours" }
    ],
    inStock: true,
    brand: "Apple",
    priceRange: calculatePriceRange(1099000)
  },
  {
    id: 11,
    slug: slugify("Xiaomi 13T Pro Camera"),
    name: "Xiaomi 13T Pro Camera",
    price: 699000,
    originalPrice: 799000,
    images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80"],
    category: "smartphones",
    rating: 4.6,
    reviews: 89,
    badge: "New",
    description: "Co-engineered with Leica, the Xiaomi 13T Pro delivers professional photography with a 50MP main sensor and Xiaomi's Hyper Engine.",
    specs: [
      { label: "CPU", value: "Dimensity 9200+" },
      { label: "RAM", value: "12GB" },
      { label: "Storage", value: "256GB" },
      { label: "Camera", value: "50MP Leica" },
      { label: "Battery", value: "5000mAh" },
      { label: "Charge", value: "120W Turbo" }
    ],
    inStock: true,
    brand: "Xiaomi",
    discountPercentage: calculateDiscount(699000, 799000),
    priceRange: calculatePriceRange(699000)
  },
  {
    id: 12,
    slug: slugify("ASUS ROG Gaming Laptop"),
    name: "ASUS ROG Gaming Laptop",
    price: 2499000,
    images: ["https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&q=80"],
    category: "laptops",
    rating: 4.7,
    reviews: 76,
    badge: "Hot",
    description: "Dominate every game with RTX 4090 graphics, 240Hz display, and MUX Switch technology. The ultimate weapon for competitive gaming.",
    specs: [
      { label: "GPU", value: "RTX 4090 16GB" },
      { label: "CPU", value: "Intel i9-13950HX" },
      { label: "RAM", value: "32GB DDR5" },
      { label: "Display", value: "18\" QHD 240Hz" },
      { label: "Storage", value: "2TB SSD" },
      { label: "Battery", value: "90Whr" }
    ],
    inStock: true,
    brand: "ASUS",
    priceRange: calculatePriceRange(2499000)
  },
  {
    id: 13,
    slug: slugify("Sony 55 Bravia OLED 4K"),
    name: "Sony 55\" Bravia OLED 4K",
    price: 1299000,
    originalPrice: 1499000,
    images: ["https://images.unsplash.com/photo-1461151304267-38535e780c79?w=600&q=80"],
    category: "tvs",
    rating: 4.8,
    reviews: 134,
    badge: "Sale",
    description: "Sony's XR Cognitive Processor with OLED Contrast and XR OLED Motion Pro delivers the most lifelike picture quality ever seen.",
    specs: [
      { label: "Size", value: "55 inches" },
      { label: "Panel", value: "OLED" },
      { label: "Processor", value: "XR Cognitive" },
      { label: "HDR", value: "Dolby Vision + HDR10" },
      { label: "Sound", value: "XR Sound Pro" },
      { label: "OS", value: "Google TV" }
    ],
    inStock: true,
    brand: "Sony",
    discountPercentage: calculateDiscount(1299000, 1499000),
    priceRange: calculatePriceRange(1299000)
  },
  {
    id: 14,
    slug: slugify("Bose SoundBar 900"),
    name: "Bose SoundBar 900",
    price: 899000,
    images: ["https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&q=80"],
    category: "audio",
    rating: 4.7,
    reviews: 88,
    badge: "Best Seller",
    description: "Cinematic sound from a single soundbar. Bose TrueSpace technology, Dolby Atmos, and Bose Spatial Headtracking for true 3D audio.",
    specs: [
      { label: "Channels", value: "13 drivers, 9-class amp" },
      { label: "Audio", value: "Dolby Atmos + DTS:X" },
      { label: "Connectivity", value: "HDMI eARC, WiFi, BT" },
      { label: "Size", value: "104.5cm" },
      { label: "Smart", value: "Voice assistant" },
      { label: "ADAPTiQ", value: "Yes" }
    ],
    inStock: true,
    brand: "Bose",
    priceRange: calculatePriceRange(899000)
  },
  {
    id: 15,
    slug: slugify("Nikon Z8 Mirrorless Camera"),
    name: "Nikon Z8 Mirrorless Camera",
    price: 3499000,
    images: ["https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&q=80"],
    category: "cameras",
    rating: 4.9,
    reviews: 43,
    badge: "New",
    description: "The flagship compact mirrorless with 45.7MP stacked CMOS sensor, 8K video, and Nikon's most advanced autofocus system.",
    specs: [
      { label: "Sensor", value: "45.7MP BSI Stacked CMOS" },
      { label: "ISO", value: "64–25600" },
      { label: "Video", value: "8K30p RAW" },
      { label: "AF Points", value: "493" },
      { label: "FPS", value: "20fps RAW" },
      { label: "Battery", value: "330 shots" }
    ],
    inStock: true,
    brand: "Nikon",
    priceRange: calculatePriceRange(3499000)
  },
  {
    id: 16,
    slug: slugify("Xbox Series X Console"),
    name: "Xbox Series X Console",
    price: 549000,
    images: ["https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=600&q=80"],
    category: "gaming",
    rating: 4.8,
    reviews: 267,
    badge: "Hot",
    description: "The most powerful Xbox ever. True 4K gaming, 120fps, Xbox Game Pass, and Quick Resume let you jump between games instantly.",
    specs: [
      { label: "CPU", value: "8x Zen 2 3.8GHz" },
      { label: "GPU", value: "12 TFLOPS RDNA 2" },
      { label: "RAM", value: "16GB GDDR6" },
      { label: "Storage", value: "1TB NVMe SSD" },
      { label: "Optical", value: "4K UHD Blu-ray" },
      { label: "Resolution", value: "Up to 8K" }
    ],
    inStock: true,
    brand: "Microsoft",
    priceRange: calculatePriceRange(549000)
  },
  {
    id: 17,
    slug: slugify("Xiaomi Smart TV 75 QLED"),
    name: "Xiaomi Smart TV 75\" QLED",
    price: 1199000,
    originalPrice: 1399000,
    images: ["https://images.unsplash.com/photo-1571415060716-baff5f717c37?w=600&q=80"],
    category: "tvs",
    rating: 4.5,
    reviews: 112,
    badge: "Sale",
    description: "Incredible value with QLED quality. Far-field microphone, Google Assistant built-in, and a stunning bezel-free design.",
    specs: [
      { label: "Size", value: "75 inches" },
      { label: "Panel", value: "QLED" },
      { label: "Resolution", value: "4K UHD" },
      { label: "OS", value: "Google TV" },
      { label: "Refresh", value: "120Hz" },
      { label: "HDR", value: "Dolby Vision IQ" }
    ],
    inStock: true,
    brand: "Xiaomi",
    discountPercentage: calculateDiscount(1199000, 1399000),
    priceRange: calculatePriceRange(1199000)
  },
  {
    id: 18,
    slug: slugify("DJI Mini 4 Pro Drone"),
    name: "DJI Mini 4 Pro Drone",
    price: 899000,
    images: ["https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80"],
    category: "cameras",
    rating: 4.8,
    reviews: 98,
    badge: "New",
    description: "Professional aerial photography under 249g. 4K/60fps HDR video, omnidirectional obstacle sensing, and up to 34-minute flight time.",
    specs: [
      { label: "Weight", value: "249g" },
      { label: "Video", value: "4K/60fps HDR" },
      { label: "Camera", value: "1/1.3\" CMOS" },
      { label: "Range", value: "20km" },
      { label: "Flight", value: "34 minutes" },
      { label: "Wind", value: "Level 6" }
    ],
    inStock: true,
    brand: "DJI",
    priceRange: calculatePriceRange(899000)
  },
  {
    id: 19,
    slug: slugify("Anker 747 GaN Charger 150W"),
    name: "Anker 747 GaN Charger 150W",
    price: 89000,
    originalPrice: 109000,
    images: ["https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&q=80"],
    category: "accessories",
    rating: 4.7,
    reviews: 445,
    badge: "Best Seller",
    description: "The world's most compact 150W GaN charger. Charge a MacBook Pro, iPad, and two iPhones simultaneously with ActiveShield temperature management.",
    specs: [
      { label: "Power", value: "150W Total" },
      { label: "Ports", value: "4 (2 USB-C, 2 USB-A)" },
      { label: "Technology", value: "GaN II" },
      { label: "Safety", value: "ActiveShield" },
      { label: "Size", value: "Compact" },
      { label: "Input", value: "100-240V" }
    ],
    inStock: true,
    brand: "Anker",
    discountPercentage: calculateDiscount(89000, 109000),
    priceRange: calculatePriceRange(89000)
  },
  {
    id: 20,
    slug: slugify("Samsung T7 Portable SSD 2TB"),
    name: "Samsung T7 Portable SSD 2TB",
    price: 179000,
    originalPrice: 219000,
    images: ["https://images.unsplash.com/photo-1597225638896-6a7e18da2b2a?w=600&q=80"],
    category: "accessories",
    rating: 4.8,
    reviews: 334,
    badge: "Sale",
    description: "Pocket-sized portable SSD with 1,050MB/s read speed, AES 256-bit encryption, and shock-resistant metal design for data protection anywhere.",
    specs: [
      { label: "Capacity", value: "2TB" },
      { label: "Read", value: "1,050MB/s" },
      { label: "Write", value: "1,000MB/s" },
      { label: "Interface", value: "USB 3.2 Gen 2" },
      { label: "Security", value: "AES 256-bit" },
      { label: "Shock", value: "1500G" }
    ],
    inStock: true,
    brand: "Samsung",
    discountPercentage: calculateDiscount(179000, 219000),
    priceRange: calculatePriceRange(179000)
  },
  {
    id: 21,
    slug: slugify("TP-Link Archer AXE300 WiFi 6E"),
    name: "TP-Link Archer AXE300 WiFi 6E",
    price: 299000,
    images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80"],
    category: "networking",
    rating: 4.6,
    reviews: 167,
    badge: "New",
    description: "Next-gen WiFi 6E router with 6GHz band, 300 Gbps combined speed, and OFDMA technology for lag-free gaming and streaming.",
    specs: [
      { label: "Speed", value: "AXE300" },
      { label: "Bands", value: "Tri-band 6GHz" },
      { label: "Antennas", value: "12 High-gain" },
      { label: "Coverage", value: "6000 sq ft" },
      { label: "Ports", value: "2.5G WAN + 4x 1G LAN" },
      { label: "Security", value: "HomeShield Pro" }
    ],
    inStock: true,
    brand: "TP-Link",
    priceRange: calculatePriceRange(299000)
  },
  {
    id: 22,
    slug: slugify("Instant Pot Duo 7-in-1"),
    name: "Instant Pot Duo 7-in-1",
    price: 189000,
    originalPrice: 229000,
    images: ["https://images.unsplash.com/photo-1585515320310-259814833e62?w=600&q=80"],
    category: "kitchen",
    rating: 4.7,
    reviews: 892,
    badge: "Best Seller",
    description: "The world's best-selling multi-cooker. Replaces 7 kitchen appliances — pressure cooker, slow cooker, rice cooker, steamer, sauté pan, yogurt maker, and warmer.",
    specs: [
      { label: "Functions", value: "7-in-1" },
      { label: "Capacity", value: "6 Quart" },
      { label: "Programs", value: "13 Smart" },
      { label: "Material", value: "Stainless Steel" },
      { label: "Power", value: "1200W" },
      { label: "Pressure", value: "15 PSI" }
    ],
    inStock: true,
    brand: "Instant Pot",
    discountPercentage: calculateDiscount(189000, 229000),
    priceRange: calculatePriceRange(189000)
  },
  {
    id: 23,
    slug: slugify("Google Nest Hub Max 10"),
    name: "Google Nest Hub Max 10\"",
    price: 229000,
    originalPrice: 279000,
    images: ["https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=600&q=80"],
    category: "smart",
    rating: 4.6,
    reviews: 234,
    badge: "Sale",
    description: "Your smart home control center with a 10\" display, built-in Nest camera, Face Match for personalized results, and brilliant sound.",
    specs: [
      { label: "Display", value: "10\" HD touchscreen" },
      { label: "Speaker", value: "Full-range + tweeter" },
      { label: "Camera", value: "6.5MP wide-angle" },
      { label: "Smart", value: "Google Home hub" },
      { label: "Privacy", value: "Physical camera switch" },
      { label: "Ambient EQ", value: "Yes" }
    ],
    inStock: true,
    brand: "Google",
    discountPercentage: calculateDiscount(229000, 279000),
    priceRange: calculatePriceRange(229000)
  },
  {
    id: 24,
    slug: slugify("Shure SM7dB Active Dynamic Mic"),
    name: "Shure SM7dB Active Dynamic Mic",
    price: 449000,
    images: ["https://images.unsplash.com/photo-1598653222000-6b7b7a552625?w=600&q=80"],
    category: "audio",
    rating: 4.9,
    reviews: 78,
    badge: "New",
    description: "The legendary SM7B reimagined with built-in preamp. Perfect for podcasting, streaming, and studio recording with zero background noise.",
    specs: [
      { label: "Type", value: "Dynamic cardioid" },
      { label: "Gain", value: "+28dB built-in preamp" },
      { label: "Response", value: "50Hz – 20kHz" },
      { label: "Connection", value: "XLR" },
      { label: "EQ", value: "High-pass + presence" },
      { label: "Weight", value: "1.11lbs" }
    ],
    inStock: true,
    brand: "Shure",
    priceRange: calculatePriceRange(449000)
  }
];

export const categories: Category[] = [
  { id: "smartphones", name: "Smartphones", icon: "Smartphone", count: 124, gradient: "from-blue-500 to-indigo-600", color: "#4F46E5" },
  { id: "laptops", name: "Laptops", icon: "Laptop", count: 87, gradient: "from-gray-700 to-gray-900", color: "#1F2937" },
  { id: "tvs", name: "Televisions", icon: "Tv", count: 56, gradient: "from-purple-500 to-pink-600", color: "#9333EA" },
  { id: "audio", name: "Audio & Sound", icon: "Headphones", count: 93, gradient: "from-green-500 to-teal-600", color: "#059669" },
  { id: "gaming", name: "Gaming", icon: "Gamepad2", count: 142, gradient: "from-red-500 to-rose-600", color: "#DC2626" },
  { id: "accessories", name: "Accessories", icon: "Watch", count: 215, gradient: "from-orange-500 to-amber-500", color: "#F59E0B" },
  { id: "cameras", name: "Cameras", icon: "Camera", count: 48, gradient: "from-yellow-600 to-orange-600", color: "#D97706" },
  { id: "smart", name: "Smart Devices", icon: "Home", count: 76, gradient: "from-cyan-500 to-blue-500", color: "#0891B2" },
  { id: "networking", name: "Networking", icon: "Wifi", count: 34, gradient: "from-slate-500 to-gray-700", color: "#475569" },
  { id: "kitchen", name: "Kitchen Electronics", icon: "Utensils", count: 65, gradient: "from-lime-500 to-green-600", color: "#65A30D" },
];

export const brands = ["Apple", "Samsung", "Sony", "LG", "Xiaomi", "Dell", "HP", "ASUS", "JBL", "Bose", "DJI", "Microsoft", "Google", "Nikon"];

export const testimonials = [
  {
    id: 1,
    name: "Gatete David",
    location: "Founder & CEO",
    rating: 5,
    text: "UMUVUMU represents our commitment to revolutionizing electronics retail in Musanze. We've built this platform with genuine, high-quality products at competitive prices, ensuring every customer receives authentic devices with exceptional service. Our mission is to make premium electronics accessible while maintaining trust and reliability—that's the foundation of our business.",
    product: "MacBook Pro M3",
    avatar: "/David.png"
  },
  {
    id: 2,
    name: "Amina Uwimana",
    location: "Musanze, Rwanda",
    rating: 5,
    text: "I was hesitant buying online but the WhatsApp support team walked me through everything. My Samsung TV arrived perfectly packaged. Highly recommend!",
    product: "Samsung QLED 65\"",
    avatar: "AU"
  },
  {
    id: 3,
    name: "David Nkurunziza",
    location: "Butare, Rwanda",
    rating: 5,
    text: "Best electronics shop in Rwanda period. Bought iPhone 15 Pro Max and it's 100% original. The return policy gave me confidence. Shopping again soon!",
    product: "iPhone 15 Pro Max",
    avatar: "DN"
  },
  {
    id: 4,
    name: "Grace Mukamana",
    location: "Ruhengeri, Rwanda",
    rating: 5,
    text: "Professional team, authentic products, fair prices. Bought PS5 and gaming accessories — everything works perfectly. UMUVUMU is truly trusted!",
    product: "PlayStation 5",
    avatar: "GM"
  }
];

export const stats = [
  { label: "Happy Customers", value: "15,000+", icon: "Users" },
  { label: "Products Available", value: "5,000+", icon: "Package" },
  { label: "Brands Stocked", value: "100+", icon: "Award" },
  { label: "Years of Trust", value: "8+", icon: "Clock" }
];

export const faqs = [
  {
    q: "Do you sell genuine/original products?",
    a: "Absolutely. Every product sold at UMUVUMU Electronic Shop is 100% genuine and original. We source directly from authorized distributors and manufacturers. All products come with manufacturer warranty."
  },
  {
    q: "What is your delivery policy?",
    a: "We offer same-day delivery within Musanze City for orders placed before 2PM. For other parts of Rwanda, we deliver within 1–3 business days via trusted courier partners. Delivery fees vary by location."
  },
  {
    q: "Can I return a product if I'm not satisfied?",
    a: "Yes. We offer a 7-day return policy on all products in original, unopened condition. For defective items, we offer exchange or full refund within 30 days of purchase."
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept Mobile Money (MTN MoMo, Airtel Money), Bank Transfer, Cash on Delivery (Musanze area), and card payments. Payment plans available for select items."
  },
  {
    q: "Do products come with warranty?",
    a: "All products come with manufacturer's warranty ranging from 6 months to 2 years depending on the product. We also offer extended warranty packages for peace of mind."
  },
  {
    q: "How can I contact you for support?",
    a: "Our team is available via WhatsApp (+250 781 277 413), Instagram, Facebook, and in-store at Goico Plaza, Musanze City. We're open every day of the week."
  }
];

/**
 * Formats a number as a currency string, with optional locale and currency.
 * @param price The number to format.
 * @param locale The locale string (e.g., 'en-RW', 'en-US', 'fr-FR'). Defaults to 'en-RW'.
 * @param currency The currency code (e.g., 'RWF', 'USD', 'EUR'). Defaults to 'RWF'.
 * @returns A formatted currency string.
 */
export const formatPrice = (price: number, locale: string = 'en-RW', currency: string = 'RWF'): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    // Adjust minimum/maximumFractionDigits based on currency conventions if needed
    // For RWF, often whole numbers are used, so setting both to 0 is common.
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

/**
 * Format price range for display (e.g., "100,000RWF-200,000RWF")
 */
export const formatPriceRange = (min: number, max: number): string => {
  const minFormatted = new Intl.NumberFormat('en-RW', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(min);
  
  const maxFormatted = new Intl.NumberFormat('en-RW', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(max);
  
  return `${minFormatted}RWF-${maxFormatted}RWF`;
};
