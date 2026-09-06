// ProductAI Comprehensive Electronics Seed Database (40+ Products across 8 Categories)
// Prices in INR (₹) with realistic specifications, pros, cons, and target personas.

const productsSeed = [
  // ==================== 1. LAPTOPS ====================
  {
    id: "laptop-1",
    name: "Lenovo LOQ 15 Gen 9 (Core i7 / RTX 4060)",
    brand: "Lenovo",
    category: "Laptops",
    price: 74999,
    originalPrice: 92999,
    rating: 4.6,
    reviews: 1420,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80",
    description: "High-performance gaming and coding laptop engineered with 13th Gen Intel Core i7, NVIDIA RTX 4060 GPU, and advanced Legion Coldfront 5.0 thermal cooling.",
    specifications: {
      processor: "Intel Core i7-13650HX (14 Cores, up to 4.9 GHz)",
      ram: "16GB DDR5 5200MHz (Upgradable to 32GB)",
      storage: "512GB NVMe PCIe Gen4 SSD",
      gpu: "NVIDIA GeForce RTX 4060 (8GB GDDR6, 115W TGP)",
      display: "15.6-inch FHD (1920x1080) IPS, 144Hz, 100% sRGB, G-Sync",
      battery: "60Wh with Super Rapid Charge Pro (80% in 30 min)",
      weight: "2.4 kg",
      os: "Windows 11 Home",
      ports: "3x USB-A 3.2, 1x USB-C (140W PD), HDMI 2.1, RJ45 Ethernet, Audio Jack"
    },
    features: [
      "AI Engine+ powered by LA1 AI Chip for dynamic power balancing",
      "Full-sized ergonomic keyboard with 1.5mm key travel and white backlight",
      "Military-grade MIL-STD 810H durability standard certified",
      "Nahimic Audio 3D spatial surround sound for gaming and media"
    ],
    pros: [
      "Outstanding price-to-performance ratio with 115W RTX 4060",
      "Superb cooling under heavy machine learning and compiler loads",
      "Easily expandable dual RAM and dual M.2 SSD slots"
    ],
    cons: [
      "Moderate battery life (3.5 - 4.5 hours on non-gaming tasks)",
      "Bulky 230W power brick increases carry weight"
    ],
    targetPersonas: ["Coding", "Machine Learning", "Gaming", "College Students", "Engineering"],
    valueScore: 9.4
  },
  {
    id: "laptop-2",
    name: "Apple MacBook Air M3 (13.6-inch)",
    brand: "Apple",
    category: "Laptops",
    price: 104900,
    originalPrice: 114900,
    rating: 4.8,
    reviews: 2890,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    description: "The world's most popular laptop, now turbocharged by Apple's next-generation 3-nanometer M3 chip. Phenomenal 18-hour battery life and silent fanless architecture.",
    specifications: {
      processor: "Apple M3 Chip (8-core CPU, 10-core GPU, 16-core Neural Engine)",
      ram: "16GB Unified Memory",
      storage: "512GB Ultra-fast SSD",
      gpu: "Integrated 10-core GPU with Hardware-accelerated Ray Tracing",
      display: "13.6-inch Liquid Retina (2560x1664), 500 nits, P3 Wide Color, True Tone",
      battery: "52.6Wh Lithium-Polymer, up to 18 hours battery life",
      weight: "1.24 kg",
      os: "macOS Sonoma",
      ports: "MagSafe 3, 2x Thunderbolt / USB 4, 3.5mm Headphone jack with high-impedance support"
    },
    features: [
      "Fanless silent design even under intensive web development",
      "1080p FaceTime HD camera with computational video enhancement",
      "Support for up to two external displays with laptop lid closed",
      "Touch ID biometric sensor built into Magic Keyboard"
    ],
    pros: [
      "Industry-leading 18+ hours real-world battery endurance",
      "Exceptional build quality with 100% recycled aluminum chassis",
      "Unmatched CPU efficiency and instant-on wake responsiveness"
    ],
    cons: [
      "Non-upgradable unified memory and internal SSD storage",
      "Not suited for AAA Windows-exclusive PC gaming"
    ],
    targetPersonas: ["Programming", "Web Development", "Productivity", "College Students", "Travelers"],
    valueScore: 9.1
  },
  {
    id: "laptop-3",
    name: "ASUS ROG Zephyrus G16 (OLED Gaming & Creator)",
    brand: "ASUS",
    category: "Laptops",
    price: 169990,
    originalPrice: 189990,
    rating: 4.7,
    reviews: 640,
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80",
    description: "Ultra-slim CNC machined aluminum gaming flagship boasting an exquisite 2.5K 240Hz OLED display, Intel Core Ultra 9 processor, and RTX 4070 graphics.",
    specifications: {
      processor: "Intel Core Ultra 9 185H (16 Cores, NPU AI Acceleration)",
      ram: "32GB LPDDR5X 7467MHz",
      storage: "1TB PCIe Gen4 NVMe SSD",
      gpu: "NVIDIA GeForce RTX 4070 (8GB GDDR6, 105W)",
      display: "16-inch ROG Nebula OLED (2560x1600), 240Hz, 0.2ms, 100% DCI-P3, G-Sync",
      battery: "90Wh with 100W USB-C Power Delivery",
      weight: "1.85 kg",
      os: "Windows 11 Pro",
      ports: "1x Thunderbolt 4, 1x USB-C 3.2 Gen 2, 2x USB-A, HDMI 2.1, UHS-II SD card reader"
    },
    features: [
      "Slash Lighting customizable LED array on aluminum lid",
      "6-speaker sound system with dual force-cancelling woofers",
      "Liquid metal thermal compound by Thermal Grizzly on CPU",
      "Dedicated Copilot key and Windows Hello IR webcam"
    ],
    pros: [
      "Breathtaking 240Hz OLED panel with true blacks and HDR 500",
      "Incredible 1.85 kg lightweight profile for an RTX 4070 machine",
      "Large 90Wh battery offering 7-8 hours productivity usage"
    ],
    cons: [
      "Premium price bracket",
      "Soldered RAM limits future memory expansion"
    ],
    targetPersonas: ["High-End Gaming", "Machine Learning", "Video Editing", "Content Creation"],
    valueScore: 8.9
  },
  {
    id: "laptop-4",
    name: "Acer Aspire 5 Thin & Light (Core i5 13th Gen)",
    brand: "Acer",
    category: "Laptops",
    price: 48990,
    originalPrice: 59990,
    rating: 4.3,
    reviews: 3200,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80",
    description: "The quintessential student and entry-developer powerhouse delivering 13th Gen Core i5 performance, 16GB RAM, and vibrant FHD IPS visuals within an accessible budget.",
    specifications: {
      processor: "Intel Core i5-1335U (10 Cores, 12 Threads, up to 4.6 GHz)",
      ram: "16GB LPDDR5 Dual Channel",
      storage: "512GB PCIe NVMe SSD",
      gpu: "Intel Iris Xe Graphics",
      display: "15.6-inch FHD (1920x1080) Acer ComfyView LED-backlit IPS",
      battery: "50Wh with 65W fast charger (up to 7.5 hours)",
      weight: "1.7 kg",
      os: "Windows 11 Home + MS Office 2021",
      ports: "1x USB-C Thunderbolt 4, 2x USB-A 3.2, HDMI 2.1, 3.5mm jack"
    },
    features: [
      "Elevated hinge design for improved typing ergonomics and cooling airflow",
      "Acer PurifiedVoice with AI noise reduction for online classes & Zoom",
      "Full HD 1080p webcam with temporal noise reduction",
      "Fingerprint reader integrated into the precision touchpad"
    ],
    pros: [
      "Tremendous value under ₹50,000 with 16GB RAM out of the box",
      "Lightweight and durable aluminum top cover",
      "Thunderbolt 4 support rarely found at this price tier"
    ],
    cons: [
      "Integrated graphics not suited for heavy 3D gaming",
      "Speakers are moderately quiet"
    ],
    targetPersonas: ["Students", "Office Work", "Entry-level Programming", "Budget Shoppers"],
    valueScore: 9.5
  },
  {
    id: "laptop-5",
    name: "HP Pavilion 15 (Ryzen 7 7730U)",
    brand: "HP",
    category: "Laptops",
    price: 61990,
    originalPrice: 72990,
    rating: 4.4,
    reviews: 1850,
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80",
    description: "Versatile, elegant computing built with AMD's 8-core Ryzen 7 7730U processor, 16GB RAM, and crisp Bang & Olufsen tuned audio for work and entertainment.",
    specifications: {
      processor: "AMD Ryzen 7 7730U (8 Cores, 16 Threads, up to 4.5 GHz)",
      ram: "16GB DDR4 3200MHz",
      storage: "512GB PCIe M.2 SSD",
      gpu: "AMD Radeon Vega 8 Graphics",
      display: "15.6-inch FHD (1920x1080) Micro-edge IPS, 300 nits, Anti-glare",
      battery: "43Wh with HP Fast Charge (50% in 45 min)",
      weight: "1.75 kg",
      os: "Windows 11 Home",
      ports: "1x USB-C (USB Power Delivery, DisplayPort 1.4), 2x USB-A, HDMI 2.1, Headphone/mic"
    },
    features: [
      "Audio by B&O with dual custom-tuned dynamic speakers",
      "HP Wide Vision 720p HD camera with dual array digital microphones",
      "Full-size backlit keyboard with numeric keypad"
    ],
    pros: [
      "Multi-threaded 8-core processor handles multiple IDEs seamlessly",
      "Clean, minimalist natural silver metallic finish",
      "Comfortable keyboard layout with dedicated number pad"
    ],
    cons: [
      "Battery capacity could be larger for long travel",
      "Uses DDR4 rather than DDR5 RAM"
    ],
    targetPersonas: ["Programming", "College Students", "Business", "Multitasking"],
    valueScore: 9.0
  },
  {
    id: "laptop-6",
    name: "Dell XPS 15 9530 (Core i7 / RTX 4050)",
    brand: "Dell",
    category: "Laptops",
    price: 189990,
    originalPrice: 209990,
    rating: 4.6,
    reviews: 780,
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80",
    description: "The gold standard of premium Windows craftsmanship. Machined aluminum and carbon fiber palm rest with InfinityEdge display and RTX 4050 creative muscle.",
    specifications: {
      processor: "Intel Core i7-13700H (14 Cores, up to 5.0 GHz)",
      ram: "32GB DDR5 4800MHz (Dual Channel, Expandable to 64GB)",
      storage: "1TB PCIe NVMe M.2 SSD",
      gpu: "NVIDIA GeForce RTX 4050 (6GB GDDR6)",
      display: "15.6-inch 3.5K (3456x2160) OLED Touchscreen, 400 nits, 100% DCI-P3",
      battery: "86Wh with 130W USB-C power delivery",
      weight: "1.92 kg",
      os: "Windows 11 Pro",
      ports: "2x Thunderbolt 4, 1x USB-C 3.2 Gen 2, Full-sized SD card slot, 3.5mm jack"
    },
    features: [
      "Quad-speaker studio sound design with Waves Nx 3D audio",
      "CNC machined aluminum chassis with aerospace carbon fiber",
      "Windows Hello facial recognition + fingerprint biometric sensors"
    ],
    pros: [
      "Hypnotic 3.5K OLED touchscreen display with ultra-thin bezels",
      "Class-leading touchpad size and keyboard comfort",
      "Upgradable RAM slots unlike many modern ultra-portables"
    ],
    cons: [
      "Expensive price point",
      "Requires USB-C dongles for traditional USB-A accessories"
    ],
    targetPersonas: ["Creative Professionals", "Executive Work", "Full-Stack Engineers"],
    valueScore: 8.7
  },

  // ==================== 2. SMARTPHONES ====================
  {
    id: "phone-1",
    name: "OnePlus 12R 5G (16GB RAM + 256GB)",
    brand: "OnePlus",
    category: "Smartphones",
    price: 42999,
    originalPrice: 45999,
    rating: 4.7,
    reviews: 4320,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80",
    description: "The flagship killer re-imagined. Snapdragon 8 Gen 2, 4th Gen LTPO 120Hz ProXDR display, huge 5500mAh battery, and blistering 100W SUPERVOOC charging.",
    specifications: {
      processor: "Qualcomm Snapdragon 8 Gen 2 (4nm, up to 3.2 GHz)",
      ram: "16GB LPDDR5X with RAM-Vita performance booster",
      storage: "256GB UFS 3.1 Super-speed Storage",
      display: "6.78-inch 1.5K (2780x1264) 1-120Hz LTPO 4.0 AMOLED, 4500 nits peak, Dolby Vision",
      battery: "5500mAh dual-cell with 100W wired fast charging (1-100% in 26 min)",
      cameraRear: "50MP Sony IMX890 OIS + 8MP Ultra-wide + 2MP Macro",
      cameraFront: "16MP selfie camera",
      os: "OxygenOS 14 (based on Android 14)",
      weight: "207 g"
    },
    features: [
      "Dual Cryo-velocity VC cooling chamber with 9,140mm² surface area",
      "Aqua Touch technology enables seamless touch response with wet fingers",
      "Infrared remote blaster and NFC included",
      "Corning Gorilla Glass Victus 2 drop protection"
    ],
    pros: [
      "Colossal 5500mAh battery gives 1.5-2 days of intense usage",
      "Blazing performance powered by Snapdragon 8 Gen 2",
      "Ultra-bright 4500 nits display visible under direct sunlight"
    ],
    cons: [
      "Secondary macro camera is basic 2MP",
      "No wireless charging support"
    ],
    targetPersonas: ["Gamers", "Heavy Users", "Performance Seekers", "Value Flagship Shoppers"],
    valueScore: 9.6
  },
  {
    id: "phone-2",
    name: "Samsung Galaxy S24 5G (AI Edition)",
    brand: "Samsung",
    category: "Smartphones",
    price: 74999,
    originalPrice: 82999,
    rating: 4.6,
    reviews: 3100,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80",
    description: "Compact flagship with Galaxy AI built-in. Circle to Search, live call translation, 50MP pro-grade camera, and 7 years of guaranteed Android OS upgrades.",
    specifications: {
      processor: "Samsung Exynos 2400 (4nm 10-core architecture)",
      ram: "8GB LPDDR5X",
      storage: "256GB UFS 4.0 Storage",
      display: "6.2-inch FHD+ Dynamic AMOLED 2X, 1-120Hz adaptive, 2600 nits peak, Vision Booster",
      battery: "4000mAh with 25W wired and 15W wireless charging + Wireless PowerShare",
      cameraRear: "50MP Main (OIS, Dual Pixel) + 12MP Ultra-wide + 10MP Telephoto (3x Optical Zoom)",
      cameraFront: "12MP Dual Pixel AF",
      os: "One UI 6.1 (Android 14) with 7 years of OS & security updates",
      weight: "167 g"
    },
    features: [
      "Galaxy AI suite: Live Translate, Note Assist, Generative Photo Edit",
      "Armor Aluminum 2.0 frame and IP68 dust/water resistance",
      "Ultra-compact form factor tailored for one-handed operation",
      "Samsung Knox vault enterprise security"
    ],
    pros: [
      "Industry-leading 7 years of software update guarantee",
      "Versatile triple camera setup with dedicated 3x optical telephoto",
      "Pocketable, lightweight and premium ergonomic design"
    ],
    cons: [
      "Charging capped at 25W (slower than competitors)",
      "4000mAh battery requires nightly charging under heavy gaming"
    ],
    targetPersonas: ["Compact Phone Lovers", "Camera Enthusiasts", "Business Executives"],
    valueScore: 9.1
  },
  {
    id: "phone-3",
    name: "Google Pixel 8a 5G (Tensor G3)",
    brand: "Google",
    category: "Smartphones",
    price: 49999,
    originalPrice: 52999,
    rating: 4.5,
    reviews: 1950,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80",
    description: "The supreme camera champion under ₹50,000. Packed with Google Tensor G3, Best Take, Magic Audio Eraser, and 7 years of Feature Drops and security patches.",
    specifications: {
      processor: "Google Tensor G3 with Titan M2 security coprocessor",
      ram: "8GB LPDDR5X",
      storage: "128GB UFS 3.1",
      display: "6.1-inch Actua OLED (1080x2400), 120Hz refresh rate, 2000 nits peak",
      battery: "4492mAh with 18W wired and Qi wireless charging",
      cameraRear: "64MP Quad PD wide camera with OIS + 13MP Ultrawide (120° FOV)",
      cameraFront: "13MP ultrawide front camera",
      os: "Pure Android 14 with 7 years OS, security, and Feature Drops",
      weight: "188 g"
    },
    features: [
      "Google AI Camera: Best Take, Magic Editor, Real Tone, Night Sight",
      "IP67 water and dust resistance with matte composite rear finish",
      "Call Screen with AI spam detection and Clear Calling"
    ],
    pros: [
      "Best computational point-and-shoot camera quality in its class",
      "Pure bloatware-free Google Android experience",
      "Wireless charging included at mid-tier pricing"
    ],
    cons: [
      "18W charging speed is slow by modern standards",
      "Thicker bezels around the display compared to Pixel 8"
    ],
    targetPersonas: ["Photography Enthusiasts", "Stock Android Fans", "Casual Shoppers"],
    valueScore: 9.2
  },
  {
    id: "phone-4",
    name: "Apple iPhone 15 Pro (128GB)",
    brand: "Apple",
    category: "Smartphones",
    price: 127990,
    originalPrice: 134900,
    rating: 4.8,
    reviews: 5200,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
    description: "Forged in aerospace-grade titanium with the groundbreaking A17 Pro 3nm chip, customizable Action button, 48MP Pro camera system, and universal USB-C.",
    specifications: {
      processor: "Apple A17 Pro (6-core CPU, 6-core GPU, Hardware Ray Tracing)",
      ram: "8GB Unified",
      storage: "128GB NVMe",
      display: "6.1-inch Super Retina XDR OLED, 120Hz ProMotion, Always-On, 2000 nits peak",
      battery: "3274mAh with 20W wired and 15W MagSafe wireless charging",
      cameraRear: "48MP Main (Sensor-shift OIS) + 12MP Ultra-wide + 12MP 3x Telephoto",
      cameraFront: "12MP TrueDepth front camera with autofocus",
      os: "iOS 17 (Upgradable to iOS 18 with Apple Intelligence)",
      weight: "187 g"
    },
    features: [
      "Aerospace-grade Grade 5 titanium enclosure with textured matte glass back",
      "Action Button for instant access to camera, flashlight, or voice memo",
      "USB-C connector with USB 3 speeds (up to 10Gb/s for direct external SSD recording)",
      "ProRes video recording at 4K 60 fps with Log encoding"
    ],
    pros: [
      "Console-quality AAA gaming performance (Resident Evil, Death Stranding)",
      "Industry-benchmark 4K ProRes video capture",
      "Noticeably lighter and more comfortable titanium hand feel"
    ],
    cons: [
      "128GB base storage is tight for 4K video recording",
      "High acquisition cost"
    ],
    targetPersonas: ["Content Creators", "Mobile Videographers", "Apple Ecosystem Users"],
    valueScore: 8.8
  },
  {
    id: "phone-5",
    name: "Redmi Note 13 Pro+ 5G (12GB + 256GB)",
    brand: "Xiaomi",
    category: "Smartphones",
    price: 29999,
    originalPrice: 33999,
    rating: 4.4,
    reviews: 6200,
    image: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80",
    description: "Setting the benchmark under ₹30,000 with a 3D curved 1.5K AMOLED display, mammoth 200MP OIS camera, IP68 water resistance, and 120W HyperCharge.",
    specifications: {
      processor: "MediaTek Dimensity 7200-Ultra (4nm, up to 2.8 GHz)",
      ram: "12GB LPDDR5",
      storage: "256GB UFS 3.1",
      display: "6.67-inch 1.5K (2712x1220) Curved AMOLED, 120Hz, 1800 nits, Dolby Vision",
      battery: "5000mAh with 120W HyperCharge in box (0 to 100% in 19 minutes)",
      cameraRear: "200MP Samsung ISOCELL HP3 (OIS) + 8MP Ultra-wide + 2MP Macro",
      cameraFront: "16MP selfie camera",
      os: "MIUI 14 / Xiaomi HyperOS (Android 14)",
      weight: "204 g"
    },
    features: [
      "Flagship-grade IP68 dust and water resistance certified",
      "In-display fingerprint scanner with built-in heart rate monitor",
      "Corning Gorilla Glass Victus curved glass front"
    ],
    pros: [
      "120W HyperCharge fully charges the battery in under 20 minutes",
      "Stunning curved 1.5K display feels like an ₹80,000 phone",
      "Sharp 200MP main camera captures great daylight detail"
    ],
    cons: [
      "Pre-installed system apps and occasional notification spam",
      "Low-light performance on ultrawide lens is mediocre"
    ],
    targetPersonas: ["Budget Flagship Seekers", "Media Consumers", "College Students"],
    valueScore: 9.7
  },

  // ==================== 3. HEADPHONES & AUDIO ====================
  {
    id: "audio-1",
    name: "Sony WH-1000XM5 Wireless ANC Headphones",
    brand: "Sony",
    category: "Headphones",
    price: 26990,
    originalPrice: 34990,
    rating: 4.8,
    reviews: 4500,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    description: "Industry-leading Active Noise Cancellation powered by dual processors and 8 microphones. Specially designed 30mm carbon fiber driver unit delivers pristine Hi-Res audio.",
    specifications: {
      driver: "30mm Precision-engineered Carbon Fiber Composite Dome",
      anc: "Auto NC Optimizer with Integrated Processor V1 + HD Noise Cancelling QN1",
      battery: "Up to 30 hours with ANC ON (40 hours with ANC OFF)",
      charging: "USB-PD quick charge (3 min gives 3 hours playback)",
      codecs: "LDAC, AAC, SBC, Hi-Res Audio Wireless Certified",
      connectivity: "Bluetooth 5.2, Multipoint Connection (pair 2 devices simultaneously)",
      weight: "250 g",
      microphones: "8 microphones with beamforming and AI bone-conduction noise reduction"
    },
    features: [
      "Speak-to-Chat automatically pauses music when you begin speaking",
      "Intuitive touch sensor controls on right ear cup for playback and volume",
      "Wearing sensor automatically pauses playback when headphones are removed",
      "Collapsible carrying case included with magnetic accessory pouch"
    ],
    pros: [
      "Unrivaled noise cancellation blocks aircraft and office hum effortlessly",
      "Supremely plush soft-fit leatherette headband and earcups",
      "Crystal clear phone call voice pickup in noisy street environments"
    ],
    cons: [
      "Earcups rotate flat but do not fold inward like older XM4",
      "Touch controls can register accidental taps in rain"
    ],
    targetPersonas: ["Commuters", "Office Workers", "Audiophiles", "Programmers requiring focus"],
    valueScore: 9.4
  },
  {
    id: "audio-2",
    name: "Apple AirPods Pro (2nd Gen, USB-C)",
    brand: "Apple",
    category: "Headphones",
    price: 20999,
    originalPrice: 24900,
    rating: 4.8,
    reviews: 7300,
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80",
    description: "Up to 2x more Active Noise Cancellation powered by the Apple H2 chip. Adaptive Audio dynamically blends transparency and noise cancellation based on your surroundings.",
    specifications: {
      driver: "Custom high-excursion Apple driver with custom high dynamic range amplifier",
      chip: "Apple H2 headphone chip + Apple U1 chip in MagSafe Charging Case",
      battery: "Up to 6 hours listening time with ANC; up to 30 hours with case",
      charging: "USB-C, MagSafe, Apple Watch charger, and Qi-certified chargers",
      codecs: "AAC, SBC, Spatial Audio with dynamic head tracking",
      waterResistance: "IP54 dust, sweat, and water resistant (earbuds and case)",
      weight: "5.3 g per earbud; 50.8 g case"
    },
    features: [
      "Adaptive Audio, Personalized Spatial Audio with dynamic head tracking",
      "Conversation Awareness automatically lowers volume when you talk to someone",
      "Precision Finding with Find My app and built-in case speaker",
      "Touch control swipe on stems for seamless volume adjustment"
    ],
    pros: [
      "The most natural transparency mode in any consumer earphone",
      "Effortless automatic switching across all Apple devices",
      "Compact pocketable charging case with lanyard loop"
    ],
    cons: [
      "Advanced features (Spatial audio personalization) limited to Apple devices",
      "Battery life per charge is average at 6 hours"
    ],
    targetPersonas: ["iPhone Users", "Fitness & Gym", "Commuters", "Travelers"],
    valueScore: 9.2
  },
  {
    id: "audio-3",
    name: "Sennheiser Momentum 4 Wireless",
    brand: "Sennheiser",
    category: "Headphones",
    price: 24990,
    originalPrice: 34990,
    rating: 4.7,
    reviews: 1400,
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80",
    description: "Audiophile-grade 42mm transducer system delivering signature Sennheiser dynamics and an unmatched 60-hour marathon battery life on a single charge.",
    specifications: {
      driver: "42mm Audiophile-inspired Transducer System",
      battery: "Incredible 60 hours playback with ANC enabled",
      charging: "Fast charge (10 min charging yields 6 hours music)",
      codecs: "aptX, aptX Adaptive, AAC, SBC, Hi-Res Audio",
      connectivity: "Bluetooth 5.2 class 1, Multipoint support",
      weight: "293 g"
    },
    features: [
      "Built-in 5-band equalizer with Sound Personalization test in app",
      "Adaptive Hybrid ANC with adjustable Transparency Mode",
      "Smart Pause automatically halts music when headphones come off"
    ],
    pros: [
      "Astonishing 60-hour battery life—triple the industry average",
      "Rich, deep bass and wide soundstage ideal for critical music listening",
      "Comprehensive high-resolution aptX Adaptive codec support"
    ],
    cons: [
      "ANC is slightly behind Sony XM5 in eliminating high frequencies",
      "Fabric headband requires careful handling to avoid stains"
    ],
    targetPersonas: ["Music Enthusiasts", "Frequent Flyers", "Remote Workers"],
    valueScore: 9.3
  },
  {
    id: "audio-4",
    name: "JBL Tune 770NC Wireless Over-Ear ANC",
    brand: "JBL",
    category: "Headphones",
    price: 5999,
    originalPrice: 9999,
    rating: 4.3,
    reviews: 5800,
    image: "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?auto=format&fit=crop&w=800&q=80",
    description: "JBL Pure Bass Sound with Adaptive Noise Cancelling under ₹6,000. Up to 70 hours of battery life and lightweight foldable design for daily college commutes.",
    specifications: {
      driver: "40mm Dynamic drivers with JBL Pure Bass sound",
      battery: "70 hours (ANC off), 44 hours (ANC on)",
      charging: "Speed charge: 5 min gives 3 hours playback (USB-C)",
      connectivity: "Bluetooth 5.3 with LE Audio, Multi-Point Connection",
      weight: "232 g"
    },
    features: [
      "Ambient Aware and TalkThru technologies",
      "JBL Headphones App customizable EQ presets",
      "Hands-free voice assistant integration (Google / Alexa)"
    ],
    pros: [
      "Punchy, satisfying bass signature favored by student listeners",
      "Exceptional 70-hour battery life at an affordable price",
      "Lightweight, foldable, easily slips into college backpacks"
    ],
    cons: [
      "Plastic build quality feels modest",
      "ANC is basic compared to premium Sony/Bose models"
    ],
    targetPersonas: ["Students", "Gym Goers", "Budget Audio Buyers"],
    valueScore: 9.5
  },

  // ==================== 4. SMARTWATCHES ====================
  {
    id: "watch-1",
    name: "Apple Watch Series 9 GPS (45mm Aluminum)",
    brand: "Apple",
    category: "Smartwatches",
    price: 41900,
    originalPrice: 44900,
    rating: 4.7,
    reviews: 2100,
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80",
    description: "S9 SiP processor brings a magical new Double Tap gesture, on-device Siri, brighter 2000 nits display, and comprehensive ECG & blood oxygen health tracking.",
    specifications: {
      processor: "Apple S9 SiP (64-bit dual-core, 4-core Neural Engine)",
      display: "45mm Always-On Retina OLED (up to 2000 nits, down to 1 nit)",
      sensors: "ECG app, Blood Oxygen sensor, Optical Heart Sensor Gen 3, Temperature sensor",
      safety: "Crash Detection, Fall Detection, Emergency SOS",
      battery: "18 hours regular use (up to 36 hours in Low Power Mode), Fast Magnetic Charging",
      waterResistance: "WR50 (Swimproof up to 50 meters), IP6X dust resistant",
      connectivity: "GPS, Wi-Fi 4, Bluetooth 5.3, UWB 2nd Gen chip"
    },
    features: [
      "Double Tap gesture lets you answer calls or pause timers without touching the screen",
      "Precision Finding for iPhone with distance and directional guidance",
      "Sleep stage tracking (REM, Core, Deep sleep analysis)"
    ],
    pros: [
      "Smooth, fluid watchOS ecosystem with thousands of third-party apps",
      "Medical-grade health metrics (ECG, Afib history, temperature tracking)",
      "Double tap gesture is genuinely practical in daily life"
    ],
    cons: [
      "Daily charging required (18-24 hour battery)",
      "Strictly compatible with Apple iPhone only"
    ],
    targetPersonas: ["iPhone Users", "Fitness Enthusiasts", "Health Monitoring"],
    valueScore: 9.0
  },
  {
    id: "watch-2",
    name: "Samsung Galaxy Watch 6 Classic (47mm LTE)",
    brand: "Samsung",
    category: "Smartwatches",
    price: 36999,
    originalPrice: 43999,
    rating: 4.5,
    reviews: 1680,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    description: "The return of the iconic physical rotating bezel. Stainless steel craftsmanship, BioActive sensor for body composition (BIA) analysis, and advanced sleep coaching.",
    specifications: {
      processor: "Exynos W930 (Dual Core 1.4GHz, 5nm)",
      ram: "2GB RAM + 16GB Storage",
      display: "1.5-inch Super AMOLED (480x480), Sapphire Crystal glass, 2000 nits",
      sensors: "Samsung BioActive Sensor (Optical Heart + Electrical Heart ECG + Bioelectrical Impedance)",
      battery: "425mAh (up to 40 hours runtime), WPC wireless fast charging",
      waterResistance: "5ATM + IP68 water/dust proof + MIL-STD-810H compliant"
    },
    features: [
      "Tactile physical rotating bezel for effortless menu navigation",
      "Body Composition BIA tool measures body fat percentage and skeletal muscle",
      "Personalized Heart Rate Zones for targeted cardiovascular training"
    ],
    pros: [
      "Physical rotating bezel is the best hardware interface on WearOS",
      "Scratch-proof sapphire crystal glass and stainless steel chassis",
      "Full Google Wear OS with Google Maps, Assistant, and WhatsApp"
    ],
    cons: [
      "Blood pressure and ECG features require Samsung Galaxy phone",
      "Slightly heavy on smaller wrists"
    ],
    targetPersonas: ["Android Flagship Users", "Fitness & Gym Athletes", "Classic Watch Lovers"],
    valueScore: 9.2
  },
  {
    id: "watch-3",
    name: "Amazfit GTR 4 Classic Smartwatch",
    brand: "Amazfit",
    category: "Smartwatches",
    price: 16999,
    originalPrice: 23999,
    rating: 4.4,
    reviews: 3400,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=800&q=80",
    description: "14-day battery endurance champion equipped with dual-band circularly-polarized GPS antenna, 150+ sports modes, and Bluetooth phone calling.",
    specifications: {
      display: "1.43-inch HD AMOLED, 326 PPI, Anti-fingerprint tempered glass",
      battery: "475mAh battery delivering up to 14 days typical usage",
      gps: "Dual-band & 6 Satellite positioning systems with route import",
      sensors: "BioTracker 4.0 PPG biometric sensor (blood oxygen, heart rate, stress, sleep)",
      waterResistance: "5 ATM water resistance (50 meters swimproof)"
    },
    features: [
      "14 days of battery life eliminates frequent charging anxiety",
      "Bluetooth calling with microphone and speaker",
      "Music storage for independent offline playback without phone"
    ],
    pros: [
      "Outstanding two-week battery life",
      "Precise outdoor GPS tracking for runners and cyclists",
      "Cross-platform compatibility (works identically on Android and iOS)"
    ],
    cons: [
      "Third-party app ecosystem is minimal compared to Apple/WearOS",
      "Cannot reply to notifications with full keyboard on iOS"
    ],
    targetPersonas: ["Runners", "Marathoners", "Battery Conscious Buyers"],
    valueScore: 9.6
  },

  // ==================== 5. CAMERAS ====================
  {
    id: "camera-1",
    name: "Sony Alpha 7 IV Full-Frame Mirrorless",
    brand: "Sony",
    category: "Cameras",
    price: 219990,
    originalPrice: 242990,
    rating: 4.9,
    reviews: 890,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
    description: "The benchmark hybrid full-frame camera. 33MP Exmor R back-illuminated sensor, BIONZ XR processing engine, 4K 60p 10-bit 4:2:2 video, and real-time AI eye autofocus.",
    specifications: {
      sensor: "33.0 MP 35mm full-frame Exmor R CMOS sensor",
      processor: "BIONZ XR image processing engine (8x more processing power)",
      iso: "Standard ISO 100-51200 (expandable to 50-204800)",
      autofocus: "759 phase-detection AF points covering 94% of image area with AI Real-time tracking",
      video: "4K 60p (Super 35) & 4K 30p (7K oversampled), 10-bit 4:2:2, S-Cinetone, S-Log3",
      stabilization: "5-axis in-body optical image stabilization with 5.5-step compensation",
      display: "3.0-inch vari-angle touch LCD (1.03M dots) + 3.68M dot OLED electronic viewfinder",
      storage: "Dual media slots (Slot 1: CFexpress Type A / SD UHS-II; Slot 2: SD UHS-II)"
    },
    features: [
      "Real-time Eye AF for Humans, Animals, and Birds in both photo and movie modes",
      "Focus Breathing Compensation for smooth cinematic focal transitions",
      "Live 4K USB webcam streaming plug-and-play without capture card"
    ],
    pros: [
      "Exceptional dynamic range and color science with S-Cinetone",
      "Class-dominating autofocus tracking speed and accuracy",
      "Dual card slots ensure zero data loss during wedding/commercial shoots"
    ],
    cons: [
      "4K 60p recording introduces a 1.5x Super 35 crop factor",
      "Menu system has a steep learning curve for beginner photographers"
    ],
    targetPersonas: ["Professional Photographers", "Cinematographers", "Wedding Filmmakers"],
    valueScore: 9.3
  },
  {
    id: "camera-2",
    name: "Canon EOS R50 Mirrorless (with 18-45mm Lens)",
    brand: "Canon",
    category: "Cameras",
    price: 58990,
    originalPrice: 65990,
    rating: 4.6,
    reviews: 1450,
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=800&q=80",
    description: "Compact and lightweight mirrorless camera built for content creators. 24.2MP APS-C sensor, uncropped 6K-oversampled 4K 30p video, and Dual Pixel CMOS AF II.",
    specifications: {
      sensor: "24.2 MP APS-C CMOS Sensor",
      processor: "DIGIC X Image Processor",
      autofocus: "Dual Pixel CMOS AF II with Deep Learning subject detection (People, Animals, Vehicles)",
      video: "Uncropped 4K UHD at 30 fps (6K oversampled), Full HD at 120 fps for slow motion",
      burst: "Up to 15 fps electronic shutter, 12 fps electronic first-curtain",
      display: "3.0-inch 1.62M-dot Vari-Angle Touchscreen LCD",
      weight: "375 g (body only)"
    },
    features: [
      "Movie for Close-up Demos mode automatically shifts focus to product held in front",
      "Vertical video shooting mode tailored for Instagram Reels and YouTube Shorts",
      "UVC/UAC support allows high-definition streaming directly through USB"
    ],
    pros: [
      "Phenomenal value under ₹60,000 for creators graduating from smartphone cameras",
      "Sharp, vibrant Canon skin tones with uncropped 4K 30p video",
      "Featherweight 375g design easy to vlog on handheld gimbals"
    ],
    cons: [
      "No in-body image stabilization (relies on lens IS and digital IS)",
      "Single SD card slot"
    ],
    targetPersonas: ["Vloggers", "YouTubers", "Content Creators", "Beginners"],
    valueScore: 9.5
  },

  // ==================== 6. TABLETS ====================
  {
    id: "tablet-1",
    name: "Apple iPad Air M2 (11-inch, 128GB Wi-Fi)",
    brand: "Apple",
    category: "Tablets",
    price: 59900,
    originalPrice: 64900,
    rating: 4.8,
    reviews: 1890,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80",
    description: "Supercharged by the formidable Apple M2 chip. Support for Apple Pencil Pro with squeeze gestures and Magic Keyboard transforms it into a versatile creative workstation.",
    specifications: {
      processor: "Apple M2 Chip (8-core CPU, 9-core GPU, 16-core Neural Engine)",
      ram: "8GB RAM",
      storage: "128GB High-speed Storage",
      display: "11-inch Liquid Retina (2360x1640), 500 nits, P3 Wide Color, True Tone, Anti-reflective",
      cameraRear: "12MP Wide camera with Smart HDR 4 and 4K video recording",
      cameraFront: "Landscape 12MP Ultra Wide front camera with Center Stage",
      battery: "28.93Wh (up to 10 hours web surfing on Wi-Fi)",
      weight: "462 g",
      os: "iPadOS 17 (Stage Manager multitasking)"
    },
    features: [
      "Landscape oriented front camera perfect for video calls and online lectures",
      "Compatible with Apple Pencil Pro (barrel roll, squeeze, haptic feedback)",
      "Touch ID fingerprint sensor integrated into top power button"
    ],
    pros: [
      "Desktop-class M2 processing power handles 4K multi-stream video editing",
      "Extensive ecosystem of tablet-optimized creative apps (Procreate, DaVinci Resolve)",
      "Slim, premium aluminum unibody build"
    ],
    cons: [
      "Display is 60Hz (ProMotion 120Hz reserved for iPad Pro)",
      "Accessories (Pencil Pro and Magic Keyboard) sold separately at premium prices"
    ],
    targetPersonas: ["Students for Note Taking", "Digital Artists", "Mobile Professionals"],
    valueScore: 9.2
  },
  {
    id: "tablet-2",
    name: "Samsung Galaxy Tab S9 (11-inch AMOLED 128GB)",
    brand: "Samsung",
    category: "Tablets",
    price: 64999,
    originalPrice: 72999,
    rating: 4.7,
    reviews: 1250,
    image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=800&q=80",
    description: "The pinnacle of Android tablets. 120Hz Dynamic AMOLED 2X display, IP68 water resistance, Snapdragon 8 Gen 2, and S-Pen stylus included right in the box.",
    specifications: {
      processor: "Qualcomm Snapdragon 8 Gen 2 for Galaxy (3.36 GHz)",
      ram: "8GB LPDDR5X",
      storage: "128GB (Expandable up to 1TB via microSD card)",
      display: "11.0-inch Dynamic AMOLED 2X (2560x1600), 120Hz adaptive, HDR10+, Vision Booster",
      battery: "8400mAh with 45W fast charging support",
      waterResistance: "IP68 water and dust resistant (both tablet and S-Pen)",
      audio: "Quad Stereo Speakers tuned by AKG with Dolby Atmos",
      weight: "498 g"
    },
    features: [
      "Samsung DeX mode provides a full desktop-like multi-window windowed UI",
      "IP68 certified water and dust resistance allows use poolside or in the bath",
      "Low-latency magnetic S-Pen included free in the box"
    ],
    pros: [
      "Gorgeous 120Hz Dynamic AMOLED 2X panel blows LCD tablets away",
      "Free S-Pen in box saves ₹10,000 compared to Apple's separate pencil",
      "MicroSD card expansion slot allows cheap storage upgrades"
    ],
    cons: [
      "Android tablet app ecosystem still lags iPadOS in niche pro software",
      "45W charger not included in retail package"
    ],
    targetPersonas: ["Movie & Media Consumers", "Engineers & Students", "Power Multitaskers"],
    valueScore: 9.4
  },

  // ==================== 7. MONITORS ====================
  {
    id: "monitor-1",
    name: "LG UltraGear 27GR75Q 27-inch QHD Gaming Monitor",
    brand: "LG",
    category: "Monitors",
    price: 22499,
    originalPrice: 31000,
    rating: 4.6,
    reviews: 3800,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80",
    description: "27-inch QHD (2560x1440) IPS display with 165Hz refresh rate, 1ms MBR, AMD FreeSync Premium, and NVIDIA G-Sync compatibility for tear-free gaming and coding.",
    specifications: {
      screenSize: "27-inch (68.5 cm)",
      resolution: "QHD 2K (2560 x 1440 pixels)",
      panelType: "IPS with 99% sRGB color gamut",
      refreshRate: "165Hz",
      responseTime: "1ms (GtG at Faster)",
      sync: "AMD FreeSync Premium, NVIDIA G-Sync Compatible",
      brightness: "300 nits, HDR10 support",
      ports: "2x HDMI 2.0, 1x DisplayPort 1.4, Headphone out",
      stand: "Tilt, Height, and Pivot (90° vertical rotation) adjustable"
    },
    features: [
      "Pivot adjustable stand rotates 90 degrees into portrait mode for code reviewing",
      "Black Stabilizer reveals hidden details in dark gaming scenes",
      "Reader Mode & Flicker Safe reduces blue light eye fatigue during long sessions"
    ],
    pros: [
      "Crisp 2K resolution is the sweet spot for 27-inch screen size",
      "Full ergonomic stand with 90° portrait pivot ideal for developers",
      "Fast 165Hz IPS panel with zero noticeable ghosting"
    ],
    cons: [
      "HDR10 is entry-level (no local dimming)",
      "No built-in internal speakers"
    ],
    targetPersonas: ["Software Developers", "Competitive Gamers", "Desk Setup Enthusiasts"],
    valueScore: 9.5
  },
  {
    id: "monitor-2",
    name: "Dell UltraSharp U2724D 27-inch IPS Black 4K/QHD",
    brand: "Dell",
    category: "Monitors",
    price: 38990,
    originalPrice: 48900,
    rating: 4.8,
    reviews: 950,
    image: "https://images.unsplash.com/photo-1585792180666-f7347c490ee2?auto=format&fit=crop&w=800&q=80",
    description: "World's leading productivity monitor with IPS Black technology delivering 2000:1 contrast ratio, 120Hz smooth refresh rate, and 98% DCI-P3 color precision.",
    specifications: {
      screenSize: "27-inch",
      resolution: "QHD (2560 x 1440) at 120Hz",
      panelType: "IPS Black (2000:1 static contrast ratio)",
      colorAccuracy: "98% DCI-P3, 100% sRGB, Delta E < 2 factory calibration",
      ports: "1x DisplayPort 1.4, 1x DP out (daisy chain), 1x HDMI 2.0, USB-C upstream/downstream hubs, 3x USB-A 10Gbps",
      features: "Built-in ambient light sensor, Auto-KVM switch"
    },
    features: [
      "IPS Black technology delivers 2x deeper blacks than conventional IPS panels",
      "Built-in ambient light sensor intelligently adjusts brightness and color temperature",
      "Internal KVM switch lets you control 2 PCs using a single keyboard and mouse"
    ],
    pros: [
      "Remarkable contrast and deep inky blacks for an IPS panel",
      "Smooth 120Hz refresh rate makes coding and window scrolling effortless",
      "Abundant USB-C and USB hub ports declutter your desk"
    ],
    cons: [
      "Higher price point than standard gaming monitors",
      "Not designed for high refresh competitive esports"
    ],
    targetPersonas: ["Software Engineers", "UI/UX Designers", "Office Professionals"],
    valueScore: 9.2
  },

  // ==================== 8. GAMING ACCESSORIES ====================
  {
    id: "acc-1",
    name: "Logitech G Pro X Superlight 2 Wireless Mouse",
    brand: "Logitech",
    category: "Gaming Accessories",
    price: 13995,
    originalPrice: 16995,
    rating: 4.8,
    reviews: 3200,
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80",
    description: "The championship-winning esports mouse weighing an unbelievable 60 grams. LIGHTFORCE hybrid optical-mechanical switches, HERO 2 sensor with 32,000 DPI, and 4K polling.",
    specifications: {
      sensor: "HERO 2 (100 - 32,000 DPI, >500 IPS tracking)",
      switches: "LIGHTFORCE Hybrid Optical-Mechanical",
      pollingRate: "Up to 4000Hz (4K report rate)",
      weight: "60 grams ultra-lightweight",
      battery: "Up to 95 hours constant motion battery life (USB-C charging)",
      connectivity: "LIGHTSPEED wireless + USB-C wired"
    },
    features: [
      "Zero-additive PTFE mouse feet ensure an effortless, buttery-smooth glide",
      "No honeycomb holes needed to achieve 60g ultralight weight",
      "Powerplay wireless charging pad compatible"
    ],
    pros: [
      "Incredible 60g weight reduces wrist strain during 8-hour sessions",
      "Flawless sensor tracking with zero wireless latency",
      "Hybrid optical switches will never suffer from mechanical double-clicking"
    ],
    cons: [
      "Symmetrical shape lacks ergonomic thumb rest",
      "Premium price for a two-button competitive mouse"
    ],
    targetPersonas: ["Esports Gamers", "Fast Typists & Developers", "FPS Competitors"],
    valueScore: 9.1
  },
  {
    id: "laptop-7",
    name: "Lenovo IdeaPad Slim 3 15 (Ryzen 5 7520U / 16GB / 512GB)",
    brand: "Lenovo",
    category: "Laptops",
    price: 43990,
    originalPrice: 56990,
    rating: 4.4,
    reviews: 2600,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
    description: "Ideal programming laptop for CSE students on a budget. AMD Ryzen 5 processor, 16GB LPDDR5 RAM, fast 512GB NVMe SSD, and 15.6-inch anti-glare display.",
    specifications: {
      processor: "AMD Ryzen 5 7520U (4 Cores, 8 Threads, up to 4.3 GHz)",
      ram: "16GB LPDDR5 5500MHz Dual Channel",
      storage: "512GB PCIe Gen4 NVMe SSD",
      gpu: "AMD Radeon 610M Graphics",
      display: "15.6-inch FHD (1920x1080) Anti-glare, 250 nits",
      battery: "47Wh with Rapid Charge Boost (2 hours use from 15 min charge)",
      weight: "1.62 kg",
      os: "Windows 11 Home + MS Office 2021",
      ports: "1x USB-C 3.2, 2x USB-A 3.2, HDMI 1.4, SD Card Reader, Audio combo"
    },
    features: [
      "Physical camera privacy shutter protects your privacy during study sessions",
      "Dolby Audio stereo speakers for crisp tutorial and lecture playback",
      "Ergonomic full-size keyboard with numeric keypad"
    ],
    pros: [
      "Incredible price under ₹45,000 with 16GB LPDDR5 RAM included",
      "Speedy boot times with Gen4 NVMe SSD",
      "Lightweight 1.62kg body makes it easy to carry around campus"
    ],
    cons: [
      "250 nits display is best used indoors",
      "Entry-level Radeon 610M graphics not meant for AAA gaming"
    ],
    targetPersonas: ["Coding", "CSE Students", "Budget Shoppers", "Office Productivity"],
    valueScore: 9.6
  },
  {
    id: "laptop-8",
    name: "ASUS TUF Gaming F15 (Core i5 11th Gen / RTX 2050 / 16GB / 512GB)",
    brand: "ASUS",
    category: "Laptops",
    price: 52990,
    originalPrice: 74990,
    rating: 4.4,
    reviews: 4100,
    image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=800&q=80",
    description: "The ultimate budget gaming and engineering laptop under ₹55,000. Features dedicated NVIDIA RTX 2050 4GB GPU, 144Hz IPS display, and military-grade toughness.",
    specifications: {
      processor: "Intel Core i5-11400H (6 Cores, 12 Threads, up to 4.5 GHz)",
      ram: "16GB DDR4 3200MHz (Dual-channel, upgradable to 32GB)",
      storage: "512GB PCIe 3.0 NVMe M.2 SSD",
      gpu: "NVIDIA GeForce RTX 2050 (4GB GDDR6, 70W TGP)",
      display: "15.6-inch FHD (1920x1080) 144Hz vIPS, Adaptive-Sync",
      battery: "48Wh with 150W AC adapter",
      weight: "2.3 kg",
      os: "Windows 11 Home",
      ports: "1x Thunderbolt 4 / USB-C, 3x USB-A 3.2, HDMI 2.0b, RJ45 LAN, 3.5mm jack"
    },
    features: [
      "Self-cleaning dual fans with anti-dust technology prolong system lifespan",
      "One-zone RGB backlit keyboard highlighted WASD keys",
      "MIL-STD-810H military construction resists drops and vibrations"
    ],
    pros: [
      "Dedicated RTX 2050 ray-tracing GPU under ₹55,000 budget",
      "Smooth 144Hz display for esports gaming and fluid scrolling",
      "Solid thermal design handles continuous coding and rendering"
    ],
    cons: [
      "11th Gen CPU is an older generation architecture",
      "Modest battery life under gaming workloads"
    ],
    targetPersonas: ["Budget Gaming", "Programming under 60000", "Engineering Students"],
    valueScore: 9.4
  },
  {
    id: "phone-6",
    name: "Samsung Galaxy A35 5G (8GB RAM + 128GB)",
    brand: "Samsung",
    category: "Smartphones",
    price: 27999,
    originalPrice: 33999,
    rating: 4.5,
    reviews: 2400,
    image: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=800&q=80",
    description: "Premium glass design with 50MP OIS camera, vibrant 120Hz Super AMOLED display, IP67 water/dust resistance, and guaranteed 4 OS upgrades under ₹30,000.",
    specifications: {
      processor: "Samsung Exynos 1380 (5nm Octa-core with NPU)",
      ram: "8GB RAM + RAM Plus expansion",
      storage: "128GB Internal (MicroSD expandable up to 1TB)",
      display: "6.6-inch FHD+ Super AMOLED, 120Hz, 1000 nits Vision Booster",
      battery: "5000mAh with 25W fast charging",
      cameraRear: "50MP Main with OIS + 8MP Ultra-wide + 5MP Macro",
      cameraFront: "13MP selfie camera",
      os: "One UI 6.1 (Android 14), 4 OS upgrades + 5 years security patches",
      weight: "209 g"
    },
    features: [
      "IP67 dust and water resistance protects against splashes and rain",
      "Samsung Knox Vault hardware-isolated EAL5+ security",
      "Corning Gorilla Glass Victus+ on front and premium glass back"
    ],
    pros: [
      "Superb 50MP camera with OIS takes crisp, blur-free photos in low light",
      "Flagship-like glass back construction under ₹30,000",
      "4 major Android OS updates provide long-term peace of mind"
    ],
    cons: [
      "No charging brick included in retail box",
      "Gaming performance is adequate but not flagship-tier"
    ],
    targetPersonas: ["Camera under 30000", "Samsung Lovers", "Students & Daily Shoppers"],
    valueScore: 9.5
  },
  {
    id: "phone-7",
    name: "Motorola Edge 50 Fusion 5G (12GB + 256GB)",
    brand: "Motorola",
    category: "Smartphones",
    price: 24999,
    originalPrice: 27999,
    rating: 4.6,
    reviews: 3800,
    image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80",
    description: "Segment's best Sony LYTIA 700C camera sensor with OIS, 144Hz 3D curved pOLED display, IP68 underwater protection, and clean bloatware-free Hello UI.",
    specifications: {
      processor: "Qualcomm Snapdragon 7s Gen 2 (4nm)",
      ram: "12GB LPDDR4X",
      storage: "256GB UFS 2.2",
      display: "6.7-inch Endless Edge 144Hz 10-bit pOLED, 1600 nits, Gorilla Glass 5",
      battery: "5000mAh with 68W TurboPower in box (50% in 15 min)",
      cameraRear: "50MP Sony LYT-700C with OIS + 13MP Ultra-wide/Macro",
      cameraFront: "32MP Quad Pixel selfie camera with 4K video",
      os: "Hello UI (Android 14, Clean & Bloatware-free)",
      weight: "175 g"
    },
    features: [
      "IP68 submerged water protection up to 1.5 meters for 30 minutes",
      "Vegan leather back cover feels luxurious and warm in the hand",
      "Moto Gestures: Chop for flashlight, twist for camera"
    ],
    pros: [
      "Sony LYTIA 700C sensor punches far above its weight for photography",
      "Ultra-fluid 144Hz curved pOLED display looks breathtaking",
      "IP68 rating and 68W fast charger in the box under ₹25,000"
    ],
    cons: [
      "Curved screens are slightly more susceptible to corner drops without case",
      "UFS 2.2 storage speed rather than UFS 3.1"
    ],
    targetPersonas: ["Photography on a Budget", "Clean Android Lovers", "Style Conscious"],
    valueScore: 9.8
  },
  {
    id: "audio-5",
    name: "boAt Rockerz 550 Over-Ear Wireless Headphones",
    brand: "boAt",
    category: "Headphones",
    price: 1999,
    originalPrice: 4999,
    rating: 4.2,
    reviews: 14200,
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80",
    description: "India's bestselling budget over-ear wireless headphones. 50mm dynamic drivers, 20 hours playback, and dual connectivity (Bluetooth v5.0 + AUX).",
    specifications: {
      driver: "50mm High-bass dynamic acoustic drivers",
      battery: "500mAh battery providing up to 20 hours music playback",
      connectivity: "Bluetooth v5.0 and 3.5mm AUX wired jack",
      weight: "245 g"
    },
    features: [
      "Signature boAt Super Extra Bass tailored for EDM and hip-hop",
      "Plush cushioned earcups designed for long listening comfort",
      "Integrated microphone with voice assistant one-click activation"
    ],
    pros: [
      "Super budget friendly under ₹2,000",
      "Huge 50mm drivers give room-filling bass response",
      "AUX wired mode works even when battery is completely drained"
    ],
    cons: [
      "No active noise cancellation (passive isolation only)",
      "Bulky frame does not fold into a compact pouch"
    ],
    targetPersonas: ["Budget Shoppers", "Bass Lovers", "Casual Listeners"],
    valueScore: 9.7
  },
  {
    id: "watch-4",
    name: "Noise ColorFit Pro 5 Max Smartwatch (1.96-inch AMOLED)",
    brand: "Noise",
    category: "Smartwatches",
    price: 3999,
    originalPrice: 8999,
    rating: 4.3,
    reviews: 5100,
    image: "https://images.unsplash.com/photo-1544117519-31a4b719223d?auto=format&fit=crop&w=800&q=80",
    description: "Massive 1.96-inch AMOLED display with post-training VO2 max calculation, rapid optical heart rate and SpO2 tracking, and TruSync Bluetooth calling.",
    specifications: {
      display: "1.96-inch AMOLED (410x502), Always-on display",
      battery: "Up to 7 days normal usage, 2 days with heavy BT calling",
      connectivity: "Bluetooth 5.3 TruSync single-chip calling",
      sensors: "Heart rate, SpO2, Sleep monitor, Stress tracking, VO2 max",
      waterResistance: "IP68 water resistant"
    },
    features: [
      "Noise Health Suite with comprehensive 24/7 wellness metrics",
      "100+ sports modes with automatic workout detection",
      "SOS emergency calling and quick message replies"
    ],
    pros: [
      "Large, vivid AMOLED screen with crisp text and bright colors",
      "Full Bluetooth calling with loudspeaker under ₹4,000",
      "Up to 7-day battery life"
    ],
    cons: [
      "Proprietary OS without downloadable third-party apps",
      "Plastic frame with metallic paint finish"
    ],
    targetPersonas: ["College Students", "Entry-level Fitness", "Budget Shoppers"],
    valueScore: 9.6
  }
];

module.exports = productsSeed;
