require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: String,
  brand: String,
  price: Number,
  originalPrice: Number,
  category: String,
  description: String,
  specs: [String],
  image: String,
  rating: Number,
  reviews: Number,
  inStock: Boolean,
  featured: Boolean,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const products = [
  {
    name: "iPhone 15 Pro",
    brand: "Apple",
    price: 134900,
    originalPrice: 149900,
    category: "smartphones",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop",
    rating: 4.8,
    reviews: 1247,
    description: "The most advanced iPhone yet with titanium design, A17 Pro chip, and professional camera system.",
    specs: ["A17 Pro chip with 6-core GPU", "6.1-inch Super Retina XDR display", "Pro camera system (48MP Main)", "Up to 23 hours video playback", "Titanium design"],
    inStock: true,
    featured: true
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    brand: "Samsung",
    price: 124900,
    originalPrice: 134900,
    category: "smartphones",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&h=500&fit=crop",
    rating: 4.7,
    reviews: 892,
    description: "Ultimate productivity powerhouse with S Pen, 200MP camera, and AI-powered features.",
    specs: ["Snapdragon 8 Gen 3 processor", "6.8-inch Dynamic AMOLED 2X", "200MP main camera with 100x zoom", "5000mAh battery", "Built-in S Pen"],
    inStock: true,
    featured: true
  },
  {
    name: "Google Pixel 8 Pro",
    brand: "Google",
    price: 84900,
    originalPrice: 94900,
    category: "smartphones",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop",
    rating: 4.6,
    reviews: 634,
    description: "Pure Android experience with advanced AI photography and Google's latest Tensor G3 chip.",
    specs: ["Google Tensor G3 chip", "6.7-inch LTPO OLED display", "50MP main camera with AI features", "24-hour battery life", "7 years of OS updates"],
    inStock: true,
    featured: false
  },
  {
    name: "OnePlus 12",
    brand: "OnePlus",
    price: 69900,
    originalPrice: 79900,
    category: "smartphones",
    image: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=500&h=500&fit=crop",
    rating: 4.5,
    reviews: 423,
    description: "Flagship killer with Snapdragon 8 Gen 3, ultra-fast charging, and premium design.",
    specs: ["Snapdragon 8 Gen 3", "6.82-inch AMOLED display", "50MP triple camera system", "100W SuperVOOC charging", "OxygenOS 14"],
    inStock: true,
    featured: false
  },
  {
    name: "MacBook Air M3",
    brand: "Apple",
    price: 114900,
    originalPrice: 124900,
    category: "laptops",
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500&h=500&fit=crop",
    rating: 4.9,
    reviews: 1567,
    description: "Incredibly thin and light laptop with M3 chip delivering exceptional performance and battery life.",
    specs: ["Apple M3 chip with 8-core CPU", "13.6-inch Liquid Retina display", "Up to 18 hours battery life", "8GB unified memory", "256GB SSD storage"],
    inStock: true,
    featured: true
  },
  {
    name: "Dell XPS 13 Plus",
    brand: "Dell",
    price: 99900,
    originalPrice: 109900,
    category: "laptops",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop",
    rating: 4.4,
    reviews: 789,
    description: "Premium ultrabook with stunning InfinityEdge display and cutting-edge design.",
    specs: ["12th Gen Intel Core i7", "13.4-inch OLED InfinityEdge", "16GB LPDDR5 RAM", "512GB PCIe SSD", "Intel Iris Xe Graphics"],
    inStock: true,
    featured: true
  },
  {
    name: "HP Pavilion 15",
    brand: "HP",
    price: 54900,
    originalPrice: 64900,
    category: "laptops",
    image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=500&h=500&fit=crop",
    rating: 4.2,
    reviews: 456,
    description: "Versatile laptop perfect for work and entertainment with reliable performance.",
    specs: ["AMD Ryzen 5 processor", "15.6-inch Full HD display", "8GB DDR4 RAM", "256GB SSD", "AMD Radeon Graphics"],
    inStock: true,
    featured: false
  },
  {
    name: "Lenovo ThinkPad X1 Carbon",
    brand: "Lenovo",
    price: 134900,
    originalPrice: 149900,
    category: "laptops",
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&h=500&fit=crop",
    rating: 4.6,
    reviews: 892,
    description: "Business-grade laptop with military-grade durability and enterprise security features.",
    specs: ["12th Gen Intel Core i7", "14-inch WUXGA display", "16GB LPDDR5 RAM", "1TB PCIe SSD", "Intel Iris Xe Graphics"],
    inStock: true,
    featured: false
  },
  {
    name: "AirPods Pro (2nd Gen)",
    brand: "Apple",
    price: 24900,
    originalPrice: 27900,
    category: "audio",
    image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=500&h=500&fit=crop",
    rating: 4.7,
    reviews: 2134,
    description: "Premium wireless earbuds with active noise cancellation and spatial audio.",
    specs: ["Active Noise Cancellation", "Transparency mode", "Spatial audio with head tracking", "Up to 6 hours listening time", "MagSafe charging case"],
    inStock: true,
    featured: true
  },
  {
    name: "Sony WH-1000XM5",
    brand: "Sony",
    price: 29900,
    originalPrice: 34900,
    category: "audio",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&h=500&fit=crop",
    rating: 4.8,
    reviews: 1456,
    description: "Industry-leading noise canceling headphones with exceptional sound quality.",
    specs: ["Industry-leading noise canceling", "30-hour battery life", "Quick charge (3 min = 3 hours)", "Multipoint connection", "Touch sensor controls"],
    inStock: true,
    featured: true
  },
  {
    name: "JBL Flip 6",
    brand: "JBL",
    price: 8900,
    originalPrice: 10900,
    category: "audio",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop",
    rating: 4.5,
    reviews: 678,
    description: "Portable Bluetooth speaker with powerful sound and waterproof design.",
    specs: ["12 hours of playtime", "IP67 waterproof rating", "JBL Pro Sound", "PartyBoost feature", "Eco-friendly packaging"],
    inStock: true,
    featured: false
  },
  {
    name: "Bose QuietComfort Earbuds",
    brand: "Bose",
    price: 22900,
    originalPrice: 26900,
    category: "audio",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&h=500&fit=crop",
    rating: 4.6,
    reviews: 834,
    description: "True wireless earbuds with world-class noise cancellation technology.",
    specs: ["World-class noise cancellation", "6 hours battery + 12 with case", "Weather and sweat resistant", "Touch controls", "Bose Music app"],
    inStock: true,
    featured: false
  },
  {
    name: "Anker PowerCore 10000",
    brand: "Anker",
    price: 2499,
    originalPrice: 2999,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1609592806596-4d1b5b1d2e8e?w=500&h=500&fit=crop",
    rating: 4.4,
    reviews: 3456,
    description: "Ultra-compact portable charger with high-speed charging technology.",
    specs: ["10,000mAh capacity", "PowerIQ and VoltageBoost", "Ultra-compact design", "MultiProtect safety system", "18-month warranty"],
    inStock: true,
    featured: false
  },
  {
    name: "Belkin 3-in-1 Wireless Charger",
    brand: "Belkin",
    price: 12900,
    originalPrice: 14900,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500&h=500&fit=crop",
    rating: 4.3,
    reviews: 567,
    description: "Charge your iPhone, Apple Watch, and AirPods simultaneously with MagSafe technology.",
    specs: ["MagSafe compatible", "15W fast wireless charging", "Charges 3 devices at once", "LED indicator lights", "Non-slip base"],
    inStock: true,
    featured: false
  },
  {
    name: "USB-C to Lightning Cable",
    brand: "Apple",
    price: 1599,
    originalPrice: 1999,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop",
    rating: 4.2,
    reviews: 1234,
    description: "Official Apple cable for fast charging and data transfer.",
    specs: ["1 meter length", "Fast charging support", "Data transfer up to 480 Mbps", "Durable braided design", "MFi certified"],
    inStock: true,
    featured: false
  },
  {
    name: "Logitech MX Master 3S",
    brand: "Logitech",
    price: 8499,
    originalPrice: 9999,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop",
    rating: 4.7,
    reviews: 892,
    description: "Advanced wireless mouse with ultra-precise scrolling and customizable buttons.",
    specs: ["Darkfield 4000 DPI sensor", "70-day battery life", "USB-C quick charging", "Multi-device connectivity", "Customizable buttons"],
    inStock: true,
    featured: false
  }
];

async function seedProducts() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const Product = mongoose.model('Product', ProductSchema);

    const existingCount = await Product.countDocuments();
    if (existingCount > 0) {
      console.log(`⚠️  Database already has ${existingCount} products. Skipping seed.`);
      console.log('💡 To reseed, clear the database first.');
      process.exit(0);
    }

    const result = await Product.insertMany(products);
    console.log(`✅ Successfully seeded ${result.length} products`);
    console.log('📊 Products by category:');
    console.log(`   - Smartphones: 4`);
    console.log(`   - Laptops: 4`);
    console.log(`   - Audio: 4`);
    console.log(`   - Accessories: 4`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

seedProducts();
