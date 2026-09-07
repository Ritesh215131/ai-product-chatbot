require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const OpenAI = require('openai');
const aiEngine = require('./aiEngine');
const productStore = require('./productStore');

function extractJSON(text) {
  if (!text || typeof text !== 'string') return null;
  try {
    return JSON.parse(text.trim());
  } catch (e) {}

  const fenceMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
  if (fenceMatch) {
    try {
      return JSON.parse(fenceMatch[1].trim());
    } catch (e) {}
  }

  const firstBrace = text.indexOf('{');
  const lastBrace = text.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace > firstBrace) {
    try {
      return JSON.parse(text.slice(firstBrace, lastBrace + 1));
    } catch (e) {}
  }

  const firstBracket = text.indexOf('[');
  const lastBracket = text.lastIndexOf(']');
  if (firstBracket !== -1 && lastBracket > firstBracket) {
    try {
      return JSON.parse(text.slice(firstBracket, lastBracket + 1));
    } catch (e) {}
  }

  return null;
}

class LLMService {
  constructor() {
    this.geminiKey = process.env.GEMINI_API_KEY || '';
    this.openaiKey = process.env.OPENAI_API_KEY || '';
    this.preferredProvider = process.env.AI_MODEL_PROVIDER || 'gemini';
    this.geminiClient = null;
    this.openaiClient = null;

    this.initClients();
  }

  initClients() {
    if (this.geminiKey && this.geminiKey.trim().length > 10) {
      try {
        this.geminiClient = new GoogleGenerativeAI(this.geminiKey.trim());
      } catch (err) {
        console.warn('[LLMService] Failed to initialize Gemini client:', err.message);
        this.geminiClient = null;
      }
    } else {
      this.geminiClient = null;
    }

    if (this.openaiKey && this.openaiKey.trim().length > 10) {
      try {
        this.openaiClient = new OpenAI({ apiKey: this.openaiKey.trim() });
      } catch (err) {
        console.warn('[LLMService] Failed to initialize OpenAI client:', err.message);
        this.openaiClient = null;
      }
    } else {
      this.openaiClient = null;
    }
  }

  // Update API key dynamically (from UI settings)
  setKey(provider, key) {
    if (provider === 'gemini') {
      this.geminiKey = key ? key.trim() : '';
      process.env.GEMINI_API_KEY = this.geminiKey;
    } else if (provider === 'openai') {
      this.openaiKey = key ? key.trim() : '';
      process.env.OPENAI_API_KEY = this.openaiKey;
    }
    this.initClients();
  }

  // Check active AI status
  getStatus() {
    if (this.geminiClient) {
      return {
        activeProvider: 'gemini',
        name: 'Google Gemini (Real-Time AI)',
        model: 'gemini-3.1-flash-lite / gemini-flash',
        isRealLLM: true,
        hasGeminiKey: true,
        hasOpenaiKey: Boolean(this.openaiClient)
      };
    }
    if (this.openaiClient) {
      return {
        activeProvider: 'openai',
        name: 'OpenAI GPT-4o-mini',
        isRealLLM: true,
        hasGeminiKey: false,
        hasOpenaiKey: true
      };
    }
    return {
      activeProvider: 'universal',
      name: 'Universal Explainable AI Engine',
      isRealLLM: false,
      hasGeminiKey: false,
      hasOpenaiKey: false,
      description: 'Zero-config local engine. Connect Google Gemini or OpenAI to search anything in the universe with live LLM intelligence.'
    };
  }

  hasExternalKey() {
    return Boolean(this.geminiClient || this.openaiClient);
  }

  // Main response generation
  async generateResponse({ message, context = {}, userPreferences = {} }) {
    // 1. If Gemini is available and preferred/auto
    if (this.geminiClient && (this.preferredProvider === 'auto' || this.preferredProvider === 'gemini')) {
      try {
        return await this.callGemini(message, context, userPreferences);
      } catch (err) {
        console.error('[LLMService] Gemini API call failed, attempting fallback:', err.message);
      }
    }

    // 2. If OpenAI is available and preferred/auto
    if (this.openaiClient && (this.preferredProvider === 'auto' || this.preferredProvider === 'openai')) {
      try {
        return await this.callOpenAI(message, context, userPreferences);
      } catch (err) {
        console.error('[LLMService] OpenAI API call failed, attempting fallback:', err.message);
      }
    }

    // 3. Fallback: Universal AI Search Engine (capable of handling any product or tech query)
    return await aiEngine.processMessage(message, context, userPreferences);
  }

  // Call Google Gemini API with fallback model hierarchy
  async callGemini(userMessage, context = {}, userPreferences = {}) {
    const catalog = await productStore.getAll();
    const systemPrompt = this.buildSystemPrompt(catalog, userPreferences);

    // Context summary
    let contextStr = '';
    if (context.category || context.budget || context.brand) {
      contextStr = `Active Conversation Memory: Category=${context.category || 'Any'}, Budget=₹${context.budget || 'Flexible'}, Brand=${context.brand || 'Any'}.\n`;
    }

    const fullPrompt = `${systemPrompt}\n\n${contextStr}User Query: "${userMessage}"`;

    const candidateModels = [
      'gemini-3.1-flash-lite',
      'gemini-flash-latest',
      'gemini-3.8-flash',
      'gemini-3.5-flash',
      'gemini-3.6-flash'
    ];
    let lastError = null;

    for (const modelName of candidateModels) {
      try {
        const model = this.geminiClient.getGenerativeModel({ model: modelName });
        const result = await model.generateContent(fullPrompt);
        const responseText = result.response.text();
        return this.parseLLMResponse(responseText, context, userMessage);
      } catch (err) {
        lastError = err;
        console.warn(`[LLMService] Model ${modelName} failed (${err.message}), trying next candidate...`);
      }
    }

    throw lastError || new Error('All Gemini model candidates failed.');
  }

  // Call OpenAI API
  async callOpenAI(userMessage, context = {}, userPreferences = {}) {
    const catalog = await productStore.getAll();
    const systemPrompt = this.buildSystemPrompt(catalog, userPreferences);

    let contextStr = '';
    if (context.category || context.budget || context.brand) {
      contextStr = `Active Conversation Memory: Category=${context.category || 'Any'}, Budget=₹${context.budget || 'Flexible'}, Brand=${context.brand || 'Any'}.\n`;
    }

    const completion = await this.openaiClient.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `${contextStr}User Query: "${userMessage}"` }
      ],
      temperature: 0.7
    });

    const responseText = completion.choices[0]?.message?.content || '';
    return this.parseLLMResponse(responseText, context, userMessage);
  }

  // Construct structured system prompt for real AI models
  buildSystemPrompt(catalog, userPreferences) {
    return `You are ProductAI, an elite, highly intelligent, unrestricted AI product recommendation and shopping assistant powered directly by Google Gemini.
You have complete autonomy and live domain knowledge across EVERY product category worldwide:
- Laptops, MacBooks, Ultrabooks, Gaming PCs, Monitors, Accessories
- Smartphones, Flagship & Budget Phones, Tablets, Foldables
- Audio, Noise-Cancelling Headphones, Earbuds, Soundbars, Speakers
- Televisions, 4K OLED, QLED, Smart Google/Android TVs
- Home Appliances (Air Conditioners, Refrigerators, Washing Machines, Air Purifiers, Robot Vacuums, Microwaves)
- Cameras, Mirrorless, Action Cams, Drones, Creator Gear
- Smartwatches, Wearables, Fitness Trackers
- Gaming Consoles (PS5, Xbox, Switch), Peripherals, Mechanical Keyboards
- Footwear, Running Shoes, Tech Wear, Lifestyle Gear, Books, and any other consumer products.

You are NOT restricted to any limited pre-seeded catalog. You have full access and authority to recommend ANY real-world brand and product currently available on the market (with particular accuracy for the Indian e-commerce market: Amazon.in, Flipkart, Croma, Reliance Digital).

Rules for your response:
1. Provide a comprehensive, markdown-formatted response in natural, engaging conversational tone.
2. If comparing products, ALWAYS use a Markdown comparison table with specs, pricing, and pros/cons.
3. Always explain the "Why this product?" rationale with transparent hardware/spec trade-offs and value-for-money reasoning.
4. Format all prices in Indian Rupees with the ₹ symbol (e.g. ₹45,990).
5. User Optimization Priority: ${userPreferences.priority || 'balanced'}. (Tune advice towards performance, budget, or battery accordingly).
6. At the VERY END of your response, ALWAYS include a JSON code block in the EXACT format below. This JSON allows the frontend to render interactive product cards and follow-up chips.

\`\`\`json
{
  "products": [
    {
      "id": "item-unique-id",
      "name": "Full Product Name with Model and Key Spec",
      "brand": "Brand",
      "category": "Category (e.g. Laptops, Smartphones, Televisions, Audio, Appliances, etc.)",
      "price": 49999,
      "originalPrice": 59999,
      "rating": 4.6,
      "reviews": 1240,
      "image": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
      "description": "Engaging 1-sentence product summary.",
      "specifications": {
        "processor": "...",
        "display": "...",
        "battery": "...",
        "keyFeature": "..."
      },
      "features": ["Feature 1", "Feature 2", "Feature 3"],
      "pros": ["Major strength 1", "Major strength 2"],
      "cons": ["Minor drawback or trade-off"],
      "targetPersonas": ["Gamers", "Coders", "Budget Seekers"],
      "valueScore": 9.2,
      "matchScore": 96
    }
  ],
  "followUpChips": [
    "Follow-up question 1",
    "Compare with alternatives",
    "Show options under a lower budget",
    "Which has the best warranty and after-sales?"
  ]
}
\`\`\`

If the query is purely conceptual (e.g. "Explain the difference between OLED and Mini-LED"), provide a deep explanation, you can provide an empty products array in the JSON block, but still provide helpful followUpChips.`;
  }

  // Parse LLM output to extract markdown text and structured product JSON
  parseLLMResponse(rawText, previousContext = {}, userMessage = '') {
    let cleanReply = rawText;
    let products = [];
    let followUpChips = [
      "Compare with top alternatives",
      "Find options under a specific budget",
      "Explain the key specifications",
      "Which has the best value for money?"
    ];

    const parsed = extractJSON(rawText);
    if (parsed) {
      if (Array.isArray(parsed.products) && parsed.products.length > 0) {
        products = parsed.products.map((p, idx) => ({
          id: p.id || `gem-${Date.now()}-${idx}`,
          name: p.name || 'Recommended Product',
          brand: p.brand || 'Top Brand',
          category: p.category || 'Electronics',
          price: Number(p.price) || 29999,
          originalPrice: Number(p.originalPrice) || (Number(p.price) ? Math.round(Number(p.price) * 1.15) : 34999),
          rating: Number(p.rating) || 4.5,
          reviews: Number(p.reviews) || 850,
          image: p.image && p.image.startsWith('http') ? p.image : this.getCategoryPlaceholderImage(p.category || p.name),
          description: p.description || '',
          specifications: p.specifications || {},
          features: Array.isArray(p.features) ? p.features : [],
          pros: Array.isArray(p.pros) ? p.pros : ['Great performance for its price class'],
          cons: Array.isArray(p.cons) ? p.cons : ['Standard warranty terms apply'],
          targetPersonas: Array.isArray(p.targetPersonas) ? p.targetPersonas : ['Everyday Shoppers'],
          valueScore: Number(p.valueScore) || 9.0,
          matchScore: Number(p.matchScore) || 95
        }));

        // Automatically cache discovered products into productStore so they can be viewed in modals, compared, and wishlisted
        if (products.length > 0) {
          productStore.cacheDiscoveredProducts(products).catch(() => {});
        }
      }

      if (Array.isArray(parsed.followUpChips) && parsed.followUpChips.length > 0) {
        followUpChips = parsed.followUpChips;
      }
    }

    // Strip code fences or raw JSON from user-facing text
    cleanReply = cleanReply
      .replace(/```(?:json)?\s*[\s\S]*?```/g, '')
      .replace(/\{[\s\S]*"products"[\s\S]*\}/g, '')
      .trim();

    return {
      reply: cleanReply,
      products,
      followUpChips,
      context: {
        ...previousContext,
        lastQuery: userMessage,
        lastProducts: products.slice(0, 3)
      },
      intent: 'REAL_AI_RECOMMENDATION'
    };
  }

  // Dedicated product search using Gemini for any product query
  async searchProductsWithGemini(query) {
    if (!this.geminiClient) return [];

    const prompt = `You are ProductAI, an elite AI product discovery and shopping engine powered directly by Google Gemini.
The user is searching for: "${query}".
Search your live knowledge base and generate 3 to 6 real-world, verified product models available in India (Amazon.in, Flipkart, Croma, Reliance Digital) that match this query.
Return a valid JSON object with key "products" in this exact schema:
{
  "products": [
    {
      "id": "gem-search-1",
      "name": "Full Product Name with Model and Key Spec",
      "brand": "Brand Name",
      "category": "Category Name (e.g. Laptops, Smartphones, Air Conditioners, Appliances, Shoes, Audio, Cameras)",
      "price": 34999,
      "originalPrice": 42999,
      "rating": 4.6,
      "reviews": 1200,
      "image": "https://images.unsplash.com/...",
      "description": "Accurate 1-sentence product summary.",
      "specifications": {
        "keyFeature": "...",
        "displayOrCapacity": "...",
        "performance": "..."
      },
      "features": ["Key Feature 1", "Key Feature 2", "Key Feature 3"],
      "pros": ["Major strength 1", "Major strength 2"],
      "cons": ["Minor drawback or trade-off"],
      "targetPersonas": ["Target user 1", "Target user 2"],
      "valueScore": 9.2,
      "matchScore": 96
    }
  ]
}`;

    const candidateModels = [
      'gemini-3.1-flash-lite',
      'gemini-flash-latest',
      'gemini-3.8-flash',
      'gemini-3.5-flash',
      'gemini-3.6-flash'
    ];

    for (const modelName of candidateModels) {
      try {
        const model = this.geminiClient.getGenerativeModel({
          model: modelName,
          generationConfig: {
            responseMimeType: 'application/json',
            temperature: 0.2
          }
        });
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        const parsed = extractJSON(text);
        if (parsed && Array.isArray(parsed.products) && parsed.products.length > 0) {
          const mapped = parsed.products.map((p, idx) => ({
            id: p.id || `gem-search-${Date.now()}-${idx}`,
            name: p.name || 'Recommended Product',
            brand: p.brand || 'Top Brand',
            category: p.category || 'General',
            price: Number(p.price) || 19999,
            originalPrice: Number(p.originalPrice) || Math.round((Number(p.price) || 19999) * 1.15),
            rating: Number(p.rating) || 4.5,
            reviews: Number(p.reviews) || 620,
            image: p.image && p.image.startsWith('http') ? p.image : this.getCategoryPlaceholderImage(p.category || p.name),
            description: p.description || '',
            specifications: p.specifications || {},
            features: Array.isArray(p.features) ? p.features : [],
            pros: Array.isArray(p.pros) ? p.pros : ['High quality and verified performance'],
            cons: Array.isArray(p.cons) ? p.cons : ['Standard warranty policy'],
            targetPersonas: Array.isArray(p.targetPersonas) ? p.targetPersonas : ['Everyday Shoppers'],
            valueScore: Number(p.valueScore) || 9.1,
            matchScore: Number(p.matchScore) || 95
          }));
          await productStore.cacheDiscoveredProducts(mapped);
          return mapped;
        }
      } catch (err) {
        console.warn(`[LLMService] searchProductsWithGemini with ${modelName} failed (${err.message}), trying next candidate...`);
      }
    }

    // Fallback: If Gemini API encounters temporary 503 demand spikes, use domain intelligence engine
    try {
      const fallbackResult = aiEngine.generateOpenDomainProducts(query, {}, {}, {});
      if (fallbackResult && Array.isArray(fallbackResult.products) && fallbackResult.products.length > 0) {
        await productStore.cacheDiscoveredProducts(fallbackResult.products);
        return fallbackResult.products;
      }
    } catch (fallbackErr) {
      console.warn('[LLMService] Fallback domain engine notice:', fallbackErr.message);
    }

    return [];
  }

  getCategoryPlaceholderImage(categoryOrName = '') {
    const text = (categoryOrName || '').toLowerCase();
    if (text.includes('tv') || text.includes('television') || text.includes('oled') || text.includes('qled')) {
      return 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80';
    }
    if (text.includes('keyboard') || text.includes('mouse') || text.includes('keychron')) {
      return 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80';
    }
    if (text.includes('headphone') || text.includes('earphone') || text.includes('audio') || text.includes('earbuds') || text.includes('speaker') || text.includes('soundbar')) {
      return 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80';
    }
    if (text.includes('phone') || text.includes('smartphone') || text.includes('iphone') || text.includes('samsung') || text.includes('oneplus') || text.includes('pixel')) {
      return 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80';
    }
    if (text.includes('laptop') || text.includes('computer') || text.includes('macbook') || text.includes('thinkpad') || text.includes('dell')) {
      return 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80';
    }
    if (text.includes('camera') || text.includes('sony a') || text.includes('canon') || text.includes('nikon') || text.includes('dslr') || text.includes('mirrorless')) {
      return 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80';
    }
    if (text.includes('drone') || text.includes('dji') || text.includes('quadcopter')) {
      return 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80';
    }
    if (text.includes('watch') || text.includes('smartwatch') || text.includes('apple watch') || text.includes('garmin')) {
      return 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80';
    }
    if (text.includes('shoe') || text.includes('sneaker') || text.includes('nike') || text.includes('adidas') || text.includes('running')) {
      return 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80';
    }
    if (text.includes('ac') || text.includes('conditioner') || text.includes('air conditioner') || text.includes('cooling')) {
      return 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80';
    }
    if (text.includes('fridge') || text.includes('refrigerator')) {
      return 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?auto=format&fit=crop&w=800&q=80';
    }
    if (text.includes('washing') || text.includes('washer') || text.includes('laundry')) {
      return 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=800&q=80';
    }
    if (text.includes('microwave') || text.includes('oven') || text.includes('air fryer') || text.includes('cooker') || text.includes('coffee') || text.includes('espresso')) {
      return 'https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=800&q=80';
    }
    if (text.includes('tablet') || text.includes('ipad')) {
      return 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80';
    }
    if (text.includes('monitor') || text.includes('display') || text.includes('screen')) {
      return 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80';
    }
    if (text.includes('console') || text.includes('ps5') || text.includes('playstation') || text.includes('xbox') || text.includes('nintendo')) {
      return 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80';
    }
    return 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=800&q=80';
  }
}

const llmService = new LLMService();
module.exports = llmService;
