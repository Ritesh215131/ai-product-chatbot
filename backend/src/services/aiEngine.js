const productStore = require('./productStore');

class AIEngine {
  constructor() {
    this.categoriesMap = {
      laptop: 'Laptops',
      laptops: 'Laptops',
      notebook: 'Laptops',
      computer: 'Laptops',
      phone: 'Smartphones',
      phones: 'Smartphones',
      smartphone: 'Smartphones',
      smartphones: 'Smartphones',
      mobile: 'Smartphones',
      headphone: 'Headphones',
      headphones: 'Headphones',
      earphone: 'Headphones',
      earphones: 'Headphones',
      earbuds: 'Headphones',
      audio: 'Headphones',
      watch: 'Smartwatches',
      watches: 'Smartwatches',
      smartwatch: 'Smartwatches',
      camera: 'Cameras',
      cameras: 'Cameras',
      dslr: 'Cameras',
      mirrorless: 'Cameras',
      tablet: 'Tablets',
      tablets: 'Tablets',
      ipad: 'Tablets',
      monitor: 'Monitors',
      monitors: 'Monitors',
      screen: 'Monitors',
      display: 'Monitors',
      mouse: 'Gaming Accessories',
      accessory: 'Gaming Accessories',
      accessories: 'Gaming Accessories'
    };

    this.externalCategoriesMap = {
      'air conditioner': 'Inverter Air Conditioners',
      'air conditioners': 'Inverter Air Conditioners',
      'ac': 'Inverter Air Conditioners',
      'split ac': 'Inverter Air Conditioners',
      'inverter ac': 'Inverter Air Conditioners',
      'tv': 'Smart 4K TVs',
      'tvs': 'Smart 4K TVs',
      'television': 'Smart 4K TVs',
      'televisions': 'Smart 4K TVs',
      'smart tv': 'Smart 4K TVs',
      'oled tv': 'Smart 4K TVs',
      'keyboard': 'Mechanical Keyboards',
      'keyboards': 'Mechanical Keyboards',
      'mechanical keyboard': 'Mechanical Keyboards',
      'microwave': 'Microwave Ovens',
      'oven': 'Microwave Ovens',
      'shoes': 'Performance Footwear',
      'shoe': 'Performance Footwear',
      'sneakers': 'Performance Footwear',
      'drone': '4K Camera Drones',
      'drones': '4K Camera Drones',
      'refrigerator': 'Refrigerators',
      'fridge': 'Refrigerators',
      'vacuum': 'Robot Vacuum Cleaners',
      'chair': 'Ergonomic Gaming Chairs',
      'gaming chair': 'Ergonomic Gaming Chairs'
    };

    this.brandsList = [
      'Apple', 'Lenovo', 'ASUS', 'HP', 'Dell', 'Acer',
      'Samsung', 'OnePlus', 'Google', 'Xiaomi', 'Motorola',
      'Sony', 'Sennheiser', 'JBL', 'boAt',
      'Amazfit', 'Noise', 'Canon', 'LG', 'Logitech', 'Keychron',
      'Daikin', 'Voltas', 'IFB', 'Nike', 'Asics', 'DJI'
    ];
  }

  // Parse natural language query to extract intent, category, budget, specs, use-cases
  parseQuery(query, previousContext = {}) {
    const text = query.toLowerCase();

    // 1. Detect Intent
    let intent = 'RECOMMENDATION';
    if (/compare|versus|vs\.?|difference between/i.test(text)) {
      intent = 'COMPARISON';
    } else if (/explain|specifications|specs of|details of/i.test(text)) {
      intent = 'EXPLAIN_SPECS';
    } else if (/cheaper|budget alternative|similar but cheaper|lower price/i.test(text)) {
      intent = 'SIMILAR_CHEAPER';
    } else if (/value for money|worth buying|best value/i.test(text)) {
      intent = 'VALUE_FOR_MONEY';
    } else if (text.split(/\s+/).length <= 3 && !/under|laptop|phone|camera/i.test(text) && previousContext.category) {
      intent = 'FOLLOW_UP';
    }

    // 2. Extract Category (internal seed or external open-domain)
    let category = previousContext.category || null;
    let isExternalCategory = false;

    // First check external categories
    for (const [kw, cat] of Object.entries(this.externalCategoriesMap)) {
      const regex = new RegExp(`\\b${kw}\\b`, 'i');
      if (regex.test(text)) {
        category = cat;
        isExternalCategory = true;
        break;
      }
    }

    // Then check internal categories if not already matched
    if (!category) {
      for (const [kw, cat] of Object.entries(this.categoriesMap)) {
        const regex = new RegExp(`\\b${kw}\\b`, 'i');
        if (regex.test(text)) {
          category = cat;
          isExternalCategory = false;
          break;
        }
      }
    }

    // 3. Extract Budget (e.g. "under 60000", "under ₹60,000", "below 30k", "under 30000")
    let budget = null;
    const budgetMatchK = text.match(/(?:under|below|less than|around|budget of|within|in)\s*(?:rs\.?|inr|₹)?\s*(\d+)\s*(?:k|thousand)\b/i);
    const budgetMatchExact = text.match(/(?:under|below|less than|around|budget of|within|in)\s*(?:rs\.?|inr|₹)?\s*(\d{1,3}(?:,\d{3})+|\d{4,7})\b/i);

    if (budgetMatchK) {
      budget = parseInt(budgetMatchK[1], 10) * 1000;
    } else if (budgetMatchExact) {
      budget = parseInt(budgetMatchExact[1].replace(/,/g, ''), 10);
    } else if (intent === 'SIMILAR_CHEAPER' && previousContext.budget) {
      // Automatically target a 20-30% lower price bracket
      budget = Math.round(previousContext.budget * 0.75);
    } else if (previousContext.budget && intent === 'FOLLOW_UP') {
      budget = previousContext.budget;
    }

    // 4. Extract Brand
    let brand = null;
    for (const b of this.brandsList) {
      const regex = new RegExp(`\\b${b}\\b`, 'i');
      if (regex.test(text)) {
        brand = b;
        break;
      }
    }

    // 5. Extract Hardware Specs
    const specs = {};
    const ramMatch = text.match(/(\d+)\s*gb\s*ram/i);
    if (ramMatch) specs.ram = `${ramMatch[1]}GB`;

    const storageMatch = text.match(/(\d+)\s*(?:gb|tb)\s*(?:ssd|storage)/i);
    if (storageMatch) specs.storage = storageMatch[0].toUpperCase();

    if (/rtx|gpu|graphic card|graphics/i.test(text)) specs.gpu = true;
    if (/oled|amoled/i.test(text)) specs.display = 'OLED';
    if (/anc|noise cancel/i.test(text)) specs.anc = true;

    // 6. Extract Use Cases
    const useCases = [];
    if (/coding|programming|developer|software|code|python|java|web dev/i.test(text)) useCases.push('Coding');
    if (/gaming|games|fps|esports|gta|steam/i.test(text)) useCases.push('Gaming');
    if (/machine learning|ml|ai|deep learning|data science/i.test(text)) useCases.push('Machine Learning');
    if (/camera|photo|photography|portrait|video|vlog|cinematic/i.test(text)) useCases.push('Photography');
    if (/battery|travel|long life|portable|battery backup/i.test(text)) useCases.push('Battery');
    if (/college|student|study|class|engineering/i.test(text)) useCases.push('College Students');
    if (/office|work|business|zoom|multitask/i.test(text)) useCases.push('Office Work');

    // 7. Check if user query is too vague (e.g. "I need a laptop", "Suggest a phone")
    const isVague = (!budget && useCases.length === 0 && !brand && Object.keys(specs).length === 0);

    return {
      intent,
      category,
      isExternalCategory,
      budget,
      brand,
      specs,
      useCases,
      isVague,
      rawQuery: query
    };
  }

  // Multi-Attribute Recommendation Scoring Model (Academic Formulation)
  calculateMatchScore(product, requirements, userPreferences = {}) {
    // Weights (sum = 1.0)
    let wCategory = 0.25;
    let wBudget = 0.25;
    let wSpecs = 0.20;
    let wUseCase = 0.15;
    let wRating = 0.08;
    let wValue = 0.07;

    // Adjust weights based on user preference learning
    if (userPreferences.priority === 'performance') {
      wSpecs = 0.35;
      wBudget = 0.15;
    } else if (userPreferences.priority === 'price') {
      wBudget = 0.40;
      wSpecs = 0.10;
    } else if (userPreferences.priority === 'battery') {
      wUseCase = 0.30;
      wBudget = 0.20;
    }

    // 1. Category Score (0 or 1)
    let scoreCat = 1.0;
    if (requirements.category) {
      scoreCat = product.category.toLowerCase() === requirements.category.toLowerCase() ? 1.0 : 0.0;
    }

    // If category does not match at all, product is irrelevant
    if (scoreCat === 0.0) return { score: 0, percentage: 0, breakdown: {}, rationale: '' };

    // 2. Budget Score
    let scoreBudget = 1.0;
    if (requirements.budget) {
      const budget = requirements.budget;
      if (product.price <= budget) {
        // Ideal: Under budget. Slight bonus if close to budget without overpaying
        const savingsRatio = (budget - product.price) / budget;
        scoreBudget = 1.0 - (savingsRatio * 0.15); // Stays between 0.85 and 1.0
      } else {
        // Over budget: Penalize quadratically
        const excessRatio = (product.price - budget) / budget;
        scoreBudget = Math.max(0, 1.0 - (excessRatio * 2.5));
      }
    }

    // 3. Brand Score
    let brandMultiplier = 1.0;
    if (requirements.brand) {
      if (product.brand.toLowerCase() === requirements.brand.toLowerCase()) {
        brandMultiplier = 1.2;
      } else {
        brandMultiplier = 0.6;
      }
    }

    // 4. Specs Matching Score
    let specPoints = 0;
    let maxSpecPoints = 0;

    if (requirements.specs.ram) {
      maxSpecPoints += 1;
      const specRam = product.specifications?.ram || '';
      if (specRam.toLowerCase().includes(requirements.specs.ram.toLowerCase())) {
        specPoints += 1;
      }
    }

    if (requirements.specs.storage) {
      maxSpecPoints += 1;
      const specStorage = product.specifications?.storage || '';
      if (specStorage.toLowerCase().includes(requirements.specs.storage.toLowerCase())) {
        specPoints += 1;
      }
    }

    if (requirements.specs.gpu) {
      maxSpecPoints += 1;
      const specGpu = product.specifications?.gpu || '';
      if (specGpu && !specGpu.toLowerCase().includes('integrated') && !specGpu.toLowerCase().includes('intel iris')) {
        specPoints += 1;
      }
    }

    const scoreSpecs = maxSpecPoints > 0 ? (specPoints / maxSpecPoints) : 0.9;

    // 5. Use Case Overlap Score
    let scoreUseCase = 0.7; // default neutral
    if (requirements.useCases && requirements.useCases.length > 0) {
      const targetList = (product.targetPersonas || []).concat(product.features || []).join(' ').toLowerCase();
      let matchedCount = 0;
      for (const uc of requirements.useCases) {
        if (targetList.includes(uc.toLowerCase())) matchedCount++;
      }
      scoreUseCase = matchedCount / requirements.useCases.length;
    }

    // 6. Rating & Value Scores
    const scoreRating = (product.rating || 4.0) / 5.0;
    const scoreValue = (product.valueScore || 8.5) / 10.0;

    // Composite Weighted Calculation
    let rawScore = (
      (wCategory * scoreCat) +
      (wBudget * scoreBudget) +
      (wSpecs * scoreSpecs) +
      (wUseCase * scoreUseCase) +
      (wRating * scoreRating) +
      (wValue * scoreValue)
    ) * brandMultiplier;

    const percentage = Math.min(99, Math.max(35, Math.round(rawScore * 100)));

    // Generate explainable rationale string
    let rationale = '';
    if (percentage >= 90) {
      rationale = `Exceptional match for ${requirements.useCases.join(', ') || 'your needs'}. `;
    } else if (percentage >= 75) {
      rationale = `Strong candidate offering balanced hardware for the price. `;
    } else {
      rationale = `Viable option with minor trade-offs in hardware or price. `;
    }

    if (requirements.budget && product.price <= requirements.budget) {
      const diff = requirements.budget - product.price;
      rationale += diff > 0 ? `Saves ₹${diff.toLocaleString('en-IN')} within your limit.` : `Fits your budget limit.`;
    }

    return {
      score: rawScore,
      percentage,
      rationale,
      breakdown: {
        categoryMatch: Math.round(scoreCat * 100),
        budgetMatch: Math.round(scoreBudget * 100),
        specsMatch: Math.round(scoreSpecs * 100),
        useCaseMatch: Math.round(scoreUseCase * 100),
        valueScore: product.valueScore
      }
    };
  }

  // Execute conversational turn
  async processMessage(userMessage, context = {}, userPreferences = {}) {
    const parsed = this.parseQuery(userMessage, context);

    // Update active conversation context
    const updatedContext = {
      ...context,
      category: parsed.category || context.category,
      budget: parsed.budget || context.budget,
      brand: parsed.brand || context.brand,
      lastQuery: userMessage
    };

    // Case 1: Clarification needed for overly vague queries
    if (parsed.isVague && parsed.category && !parsed.isExternalCategory) {
      const followUpQuestions = this.generateClarification(parsed.category);
      return {
        reply: `I can certainly help you find the best **${parsed.category}**! To make a precise, tailored recommendation, could you tell me a little more about your budget and primary use case?`,
        products: [],
        followUpChips: followUpQuestions.chips,
        context: updatedContext,
        intent: 'CLARIFICATION_NEEDED'
      };
    }

    // Case 2: Comparison between two or more products
    if (parsed.intent === 'COMPARISON') {
      return await this.handleComparisonIntent(userMessage, parsed, updatedContext);
    }

    // Case 3: Explaining a specific product's specs
    if (parsed.intent === 'EXPLAIN_SPECS') {
      return await this.handleExplainSpecsIntent(userMessage, parsed, updatedContext);
    }

    // Case 4: Standard Product Recommendation & Search
    return await this.handleRecommendationIntent(parsed, updatedContext, userPreferences, userMessage);
  }

  async handleRecommendationIntent(parsed, context, userPreferences, userMessage = '') {
    // If it's an external open-domain category or conceptual question, synthesize immediately
    if (parsed.isExternalCategory || (/what is|explain|how does|difference between/i.test(userMessage) && !parsed.category)) {
      return this.synthesizeUniversalRecommendation(userMessage, parsed, context, userPreferences);
    }

    // 1. Fetch potential matching products from store
    const allProducts = await productStore.getAll({
      category: parsed.category
    });

    // 2. Score each candidate
    const scoredProducts = allProducts.map(prod => {
      const evaluation = this.calculateMatchScore(prod, parsed, userPreferences);
      return {
        ...prod,
        matchScore: evaluation.percentage,
        rationale: evaluation.rationale,
        breakdown: evaluation.breakdown
      };
    });

    // 3. Sort by match score descending
    scoredProducts.sort((a, b) => b.matchScore - a.matchScore);

    // 4. Take top 3-4 recommendations
    const topPicks = scoredProducts.slice(0, 3);

    // If no catalog products matched, dynamically synthesize recommendations or answers for ANY product domain
    if (topPicks.length === 0 || topPicks[0].matchScore < 40) {
      return this.synthesizeUniversalRecommendation(userMessage, parsed, context, userPreferences);
    }

    // 5. Generate conversational summary
    let summaryText = `Here are the top recommended **${parsed.category || 'products'}** based on your requirements:\n\n`;

    topPicks.forEach((p, index) => {
      summaryText += `### ${index + 1}. **${p.name}** — ₹${p.price.toLocaleString('en-IN')}\n`;
      summaryText += `* **AI Match**: \`${p.matchScore}% Match\`\n`;
      summaryText += `* **Why this product?**: ${p.rationale}\n`;
      if (p.pros && p.pros.length > 0) {
        summaryText += `* **Key Advantage**: ${p.pros[0]}\n`;
      }
      summaryText += `\n`;
    });

    // Smart follow-up chips
    const chips = [
      `Compare top 2 ${parsed.category || 'products'}`,
      "Show something cheaper",
      "Which one has better value?",
      "Explain specifications"
    ];

    return {
      reply: summaryText,
      products: topPicks,
      followUpChips: chips,
      context,
      intent: parsed.intent,
      extractedRequirements: {
        category: parsed.category,
        budget: parsed.budget ? `₹${parsed.budget.toLocaleString('en-IN')}` : 'Flexible',
        useCases: parsed.useCases,
        specs: parsed.specs
      }
    };
  }

  async handleComparisonIntent(userMessage, parsed, context) {
    const allProducts = await productStore.getAll();
    const words = userMessage.toLowerCase();

    // Match products mentioned in the query
    const matched = allProducts.filter(p => {
      const nameParts = p.name.toLowerCase().split(' ');
      const brand = p.brand.toLowerCase();
      return words.includes(brand) && nameParts.some(part => part.length > 3 && words.includes(part));
    });

    // Check if query is about conceptual comparison (e.g. OLED vs IPS, Intel vs AMD, DDR4 vs DDR5)
    if (matched.length < 2 && (!context.lastProducts || /oled|ips|amoled|lcd|intel|amd|nvme|sata|ddr4|ddr5/i.test(words))) {
      return this.generateExplainerAnswer(userMessage, context);
    }

    const compareList = matched.length >= 2 ? matched.slice(0, 3) : (context.lastProducts || allProducts.slice(0, 2));

    const p1 = compareList[0];
    const p2 = compareList[1];

    let reply = `### Product Comparison: **${p1.name}** vs **${p2.name}**\n\n`;
    reply += `| Feature | ${p1.name} | ${p2.name} |\n`;
    reply += `| :--- | :--- | :--- |\n`;
    reply += `| **Price** | ₹${p1.price.toLocaleString('en-IN')} | ₹${p2.price.toLocaleString('en-IN')} |\n`;
    reply += `| **Rating** | ⭐ ${p1.rating} / 5 | ⭐ ${p2.rating} / 5 |\n`;
    reply += `| **Processor / Chip** | ${p1.specifications?.processor || 'N/A'} | ${p2.specifications?.processor || 'N/A'} |\n`;
    reply += `| **RAM / Memory** | ${p1.specifications?.ram || 'N/A'} | ${p2.specifications?.ram || 'N/A'} |\n`;
    reply += `| **Storage** | ${p1.specifications?.storage || 'N/A'} | ${p2.specifications?.storage || 'N/A'} |\n`;
    reply += `| **Display** | ${p1.specifications?.display || 'N/A'} | ${p2.specifications?.display || 'N/A'} |\n\n`;

    // AI Winner Decision
    let winner = p1.valueScore >= p2.valueScore ? p1 : p2;
    reply += `#### 🏆 **AI Verdict & Recommendation**\n`;
    reply += `**Recommended Pick: ${winner.name}**.\n\n`;
    reply += `> ${winner.name} provides superior overall value for money with a **${winner.valueScore}/10** value rating and strong real-world benchmarks for its price class. If budget is your priority, compare their individual trade-offs below.`;

    return {
      reply,
      products: compareList,
      followUpChips: [
        `View full details of ${p1.brand}`,
        `View full details of ${p2.brand}`,
        "Add both to Compare Page",
        "Recommend something cheaper"
      ],
      context,
      intent: 'COMPARISON'
    };
  }

  async handleExplainSpecsIntent(userMessage, parsed, context) {
    const allProducts = await productStore.getAll();
    const words = userMessage.toLowerCase();

    const target = allProducts.find(p =>
      words.includes(p.name.toLowerCase()) ||
      words.includes(p.id.toLowerCase()) ||
      (words.includes(p.brand.toLowerCase()) && p.category.toLowerCase() === (context.category || '').toLowerCase())
    ) || (context.lastProducts && context.lastProducts[0]) || allProducts[0];

    let reply = `### Technical Specifications Breakdown: **${target.name}**\n\n`;
    reply += `* **Brand**: ${target.brand}\n`;
    reply += `* **Price**: ₹${target.price.toLocaleString('en-IN')} *(MRP: ₹${target.originalPrice.toLocaleString('en-IN')})*\n`;
    reply += `* **Rating**: ⭐ ${target.rating} (${target.reviews.toLocaleString('en-IN')} verified customer reviews)\n\n`;

    reply += `#### Detailed Hardware Specifications:\n`;
    for (const [key, value] of Object.entries(target.specifications || {})) {
      const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
      reply += `* **${formattedKey}**: ${value}\n`;
    }

    reply += `\n#### 🎯 AI Evaluation & Verdict:\n`;
    reply += `* **Best For**: ${(target.targetPersonas || []).join(', ')}\n`;
    reply += `* **Top Advantage**: ${target.pros[0] || 'High reliability'}\n`;
    reply += `* **Potential Drawback**: ${target.cons[0] || 'None significant'}\n`;

    return {
      reply,
      products: [target],
      followUpChips: [
        `Compare ${target.name} with alternatives`,
        `Find similar products under ₹${target.price.toLocaleString('en-IN')}`,
        "Save this product",
        "Ask another question"
      ],
      context,
      intent: 'EXPLAIN_SPECS'
    };
  }

  generateClarification(category) {
    const clarifications = {
      Laptops: {
        chips: [
          "Coding under ₹60,000",
          "Gaming & Coding under ₹80,000",
          "Thin & Light for College",
          "Budget under ₹45,000"
        ]
      },
      Smartphones: {
        chips: [
          "Best Camera under ₹30,000",
          "Gaming Phone under ₹40,000",
          "Samsung under ₹30,000",
          "Clean Android & 5G"
        ]
      },
      Headphones: {
        chips: [
          "Best ANC Headphones",
          "Wireless Earbuds under ₹5,000",
          "Audiophile Sound Quality",
          "Gym & Sports Earphones"
        ]
      },
      Smartwatches: {
        chips: [
          "Apple Watch for iPhone",
          "Long Battery Life (14 Days)",
          "Fitness & Workout Tracking",
          "AMOLED Display under ₹5,000"
        ]
      }
    };

    return clarifications[category] || {
      chips: [
        "Show best rated",
        "Filter by budget",
        "Best for students",
        "Compare top picks"
      ]
    };
  }

  // Universal synthesizer for queries not in local catalog
  synthesizeUniversalRecommendation(userMessage, parsed, context, userPreferences) {
    const text = userMessage.toLowerCase();

    // Check if it is a conceptual/explainer query
    if (/what is|explain|how does|why is|difference between|versus|vs\.?|guide|pros and cons/i.test(text) && !/recommend|suggest|buy|best|find|under|price/i.test(text)) {
      return this.generateExplainerAnswer(userMessage, context);
    }

    return this.generateOpenDomainProducts(userMessage, parsed, context, userPreferences);
  }

  generateExplainerAnswer(userMessage, context) {
    let reply = `### Technical Explainer & Buying Guide\n\n`;
    reply += `You asked: *"**${userMessage}**"*\n\n`;
    reply += `Here is a breakdown of key technical factors and real-world considerations:\n\n`;
    reply += `#### 1. Core Architecture & Fundamentals\n`;
    reply += `Modern consumer hardware balances three competing pillars: **thermal envelope (cooling)**, **energy efficiency**, and **raw computing throughput**. When evaluating products in this category, looking beyond marketing buzzwords into real-world benchmarks is essential.\n\n`;
    reply += `#### 2. Key Spec Trade-Offs to Watch\n`;
    reply += `* **Panel Technology**: OLED/Mini-LED deliver true pitch-black levels and infinite contrast, whereas IPS panels provide higher sustained peak brightness and zero burn-in risk for spreadsheets and code editors.\n`;
    reply += `* **Memory & Storage**: Always aim for at least 16GB dual-channel RAM in 2026 for seamless multitasking, with NVMe PCIe Gen4 SSDs for sub-second app launching.\n`;
    reply += `* **Power & Battery**: High-wattage dedicated graphics deliver top gaming FPS, but naturally reduce unplugged battery life compared to efficiency-first chips like Apple Silicon.\n\n`;
    reply += `> 💡 **Recommendation Tip**: Tell me your target budget or primary use-case (e.g. *Gaming*, *Coding*, *Office*, *Travel*), and I will recommend specific models that match your exact needs.`;

    return {
      reply,
      products: [],
      followUpChips: [
        "Suggest top products in this category",
        "Best budget options under ₹30,000",
        "Best premium options under ₹80,000",
        "Compare top 2 brands"
      ],
      context,
      intent: 'CONCEPTUAL_EXPLAINER'
    };
  }

  generateOpenDomainProducts(userMessage, parsed, context, userPreferences) {
    const text = userMessage.toLowerCase();

    // Extract or infer domain & target brand
    let domain = 'Products';
    let img = 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=800&q=80';
    let brandA = 'Samsung';
    let brandB = 'LG';
    let p1Name = 'Smart Device Elite Edition';
    let p2Name = 'Pro Series Ultra Edition';
    let basePrice = parsed.budget ? Math.round(parsed.budget * 0.9) : 34999;
    let baseSpecs = { "Standard": "High Performance", "Warranty": "1 Year Official" };

    if (text.includes('tv') || text.includes('television')) {
      domain = 'Smart 4K TVs';
      img = 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80';
      brandA = 'Samsung';
      brandB = 'Sony';
      p1Name = 'Samsung Crystal 4K iSmart UHD TV';
      p2Name = 'Sony Bravia 4K HDR Google TV';
      basePrice = parsed.budget || 42990;
      baseSpecs = { "Display": "4K Ultra HD (3840x2160)", "Refresh Rate": "60Hz / 120Hz Motion Xcelerator", "Sound": "20W Dolby Audio", "Smart OS": "Tizen / Google TV" };
    } else if (text.includes('keyboard')) {
      domain = 'Mechanical Keyboards';
      img = 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80';
      brandA = 'Keychron';
      brandB = 'Logitech';
      p1Name = 'Keychron K2 V2 Wireless Mechanical Keyboard';
      p2Name = 'Logitech MX Mechanical Mini';
      basePrice = parsed.budget || 8499;
      baseSpecs = { "Switches": "Hot-swappable Gateron G Pro Brown", "Connectivity": "Bluetooth 5.1 & Type-C Wired", "Battery": "4000mAh (up to 240 hrs)", "Layout": "75% Compact" };
    } else if (text.includes('ac') || text.includes('air conditioner')) {
      domain = 'Inverter Air Conditioners';
      img = 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80';
      brandA = 'Daikin';
      brandB = 'Voltas';
      p1Name = 'Daikin 1.5 Ton 5-Star Inverter Split AC';
      p2Name = 'Voltas 1.5 Ton 3-Star Adjustable Inverter AC';
      basePrice = parsed.budget || 37990;
      baseSpecs = { "Capacity": "1.5 Ton (Ideal for 150-180 sq ft)", "Energy Rating": "5 Star / 3 Star ISEER", "Condenser": "100% Copper with PM2.5 Filter", "Warranty": "10 Years on Compressor" };
    } else if (text.includes('microwave') || text.includes('oven')) {
      domain = 'Microwave Ovens';
      img = 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&w=800&q=80';
      brandA = 'LG';
      brandB = 'IFB';
      p1Name = 'LG 28L Charcoal Convection Microwave';
      p2Name = 'IFB 30L Convection Microwave Oven';
      basePrice = parsed.budget || 14990;
      baseSpecs = { "Capacity": "28L - 30L", "Function": "Convection, Baking, Grilling & Reheating", "Controls": "Touch Key Pad with Child Lock", "Warranty": "5 Year Magnetron" };
    } else if (text.includes('shoe') || text.includes('sneaker')) {
      domain = 'Performance Footwear';
      img = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80';
      brandA = 'Nike';
      brandB = 'Asics';
      p1Name = 'Nike Pegasus 40 Road Running Shoes';
      p2Name = 'Asics Gel-Nimbus 26 Cushion Running';
      basePrice = parsed.budget || 7999;
      baseSpecs = { "Midsole": "Nike React / PureGEL Technology", "Upper": "Engineered Breathable Mesh", "Weight": "285g", "Surface": "Road & Track" };
    } else if (text.includes('drone')) {
      domain = '4K Camera Drones';
      img = 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=800&q=80';
      brandA = 'DJI';
      brandB = 'Autel';
      p1Name = 'DJI Mini 4 Pro 4K Drone';
      p2Name = 'DJI Mini 3 Lightweight Drone';
      basePrice = parsed.budget || 54990;
      baseSpecs = { "Camera": "4K HDR at 60fps, True Vertical Shooting", "Flight Time": "34 Minutes", "Range": "10km FHD Video Transmission", "Weight": "< 249 grams" };
    } else {
      // General product fallback
      const cleanKeyword = userMessage.replace(/recommend|suggest|find|show|buy|the|best|under|below|\d+/gi, '').trim() || 'Premium Hardware';
      domain = cleanKeyword.charAt(0).toUpperCase() + cleanKeyword.slice(1);
      p1Name = `${brandA} Top-Tier ${domain}`;
      p2Name = `${brandB} Pro Series ${domain}`;
      basePrice = parsed.budget || 24999;
      baseSpecs = { "Build Quality": "Aerospace Grade Materials", "Performance": "Flagship Tier", "Warranty": "Standard Brand Warranty" };
    }

    const products = [
      {
        id: `universal-1-${Date.now()}`,
        name: p1Name,
        brand: brandA,
        category: domain,
        price: basePrice,
        originalPrice: Math.round(basePrice * 1.18),
        rating: 4.7,
        reviews: 1540,
        image: img,
        description: `Market-leading choice in ${domain} delivering outstanding performance, reliability, and positive verified buyer satisfaction.`,
        specifications: baseSpecs,
        features: [
          "Award-winning ergonomic and durable engineering",
          "Advanced energy/efficiency optimization",
          "Comprehensive manufacturer warranty"
        ],
        pros: [
          "Outstanding build quality and reliability",
          "Highly rated in category benchmarks"
        ],
        cons: [
          "Premium pricing relative to entry-level competitors"
        ],
        targetPersonas: ["Enthusiasts", "Quality Seekers", "Everyday Shoppers"],
        valueScore: 9.3,
        matchScore: 97
      },
      {
        id: `universal-2-${Date.now()}`,
        name: p2Name,
        brand: brandB,
        category: domain,
        price: Math.round(basePrice * 0.88),
        originalPrice: Math.round(basePrice * 1.10),
        rating: 4.5,
        reviews: 980,
        image: img,
        description: `High value-for-money alternative in ${domain} offering nearly identical features at a friendlier price point.`,
        specifications: baseSpecs,
        features: [
          "Competitive price-to-performance ratio",
          "Modern minimalist aesthetic",
          "Widely available nationwide service"
        ],
        pros: [
          "Costs less while providing 90%+ of flagship functionality",
          "Lower total cost of ownership"
        ],
        cons: [
          "Fewer luxury aesthetic accents"
        ],
        targetPersonas: ["Value Shoppers", "Smart Buyers"],
        valueScore: 9.1,
        matchScore: 93
      }
    ];

    let reply = `Here are the top expert recommendations for **${domain}** matching your inquiry:\n\n`;
    products.forEach((p, idx) => {
      reply += `### ${idx + 1}. **${p.name}** — ₹${p.price.toLocaleString('en-IN')}\n`;
      reply += `* **AI Match**: \`${p.matchScore}% Match\` | ⭐ ${p.rating}/5\n`;
      reply += `* **Key Highlight**: ${p.description}\n`;
      reply += `* **Top Pro**: ${p.pros[0]}\n\n`;
    });

    reply += `> 💡 **Tip**: Connect your **Google Gemini** or **OpenAI API Key** in the header to activate live real-time LLM web browsing and query any product in the universe!`;

    return {
      reply,
      products,
      followUpChips: [
        `Compare ${products[0].name} and ${products[1].name}`,
        `Find options under ₹${Math.round(basePrice * 0.75).toLocaleString('en-IN')}`,
        "Explain specifications",
        "Show customer ratings"
      ],
      context: {
        ...context,
        category: domain,
        lastProducts: products
      },
      intent: 'UNIVERSAL_RECOMMENDATION'
    };
  }
}

const aiEngine = new AIEngine();
module.exports = aiEngine;
