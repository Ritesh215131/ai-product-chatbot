const { v4: uuidv4 } = require('uuid');

class ChatStore {
  constructor() {
    this.conversations = [];
    this.initDefaultConversations();
  }

  initDefaultConversations() {
    const today = new Date();
    const yesterday = new Date(Date.now() - 86400000);

    this.conversations = [
      {
        id: 'conv-demo-today-1',
        userId: 'user-demo-1',
        title: 'Best laptop under ₹80K for coding & ML',
        createdAt: today.toISOString(),
        updatedAt: today.toISOString(),
        messages: [
          {
            id: 'msg-1',
            role: 'user',
            content: 'I need a laptop for coding, machine learning and gaming under ₹80,000.',
            timestamp: new Date(today.getTime() - 3600000).toISOString()
          },
          {
            id: 'msg-2',
            role: 'assistant',
            content: `Here are the top recommended **Laptops** based on your requirements:\n\n### 1. **Lenovo LOQ 15 Gen 9 (Core i7 / RTX 4060)** — ₹74,999\n* **AI Match**: \`96% Match\`\n* **Why this product?**: Recommended because it is priced at ₹74,999, saving ₹5,001 within your ₹80,000 budget, optimized for Coding and Machine Learning, features 16GB DDR5 RAM, and comes equipped with an NVIDIA RTX 4060 GPU.\n* **Key Advantage**: Outstanding price-to-performance ratio with 115W RTX 4060.\n\n### 2. **ASUS TUF Gaming F15** — ₹52,990\n* **AI Match**: \`91% Match\`\n* **Why this product?**: Recommended because it provides a dedicated RTX 2050 GPU, 16GB RAM and fast NVMe storage while remaining ₹27,010 below your budget.\n* **Key Advantage**: Dedicated RTX 2050 ray-tracing GPU under ₹55,000 budget.`,
            products: [
              {
                id: 'laptop-1',
                name: 'Lenovo LOQ 15 Gen 9 (Core i7 / RTX 4060)',
                brand: 'Lenovo',
                category: 'Laptops',
                price: 74999,
                originalPrice: 92999,
                rating: 4.6,
                reviews: 1420,
                image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80',
                specifications: {
                  processor: 'Intel Core i7-13650HX',
                  ram: '16GB DDR5',
                  storage: '512GB SSD',
                  gpu: 'NVIDIA RTX 4060 (8GB)'
                },
                matchScore: 96,
                rationale: 'Priced at ₹74,999, saving ₹5,001 within your ₹80,000 budget, optimized for Coding and ML with 16GB RAM and RTX 4060.'
              },
              {
                id: 'laptop-8',
                name: 'ASUS TUF Gaming F15',
                brand: 'ASUS',
                category: 'Laptops',
                price: 52990,
                originalPrice: 74990,
                rating: 4.4,
                reviews: 4100,
                image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=800&q=80',
                specifications: {
                  processor: 'Intel Core i5-11400H',
                  ram: '16GB DDR4',
                  storage: '512GB SSD',
                  gpu: 'NVIDIA RTX 2050 (4GB)'
                },
                matchScore: 91,
                rationale: 'Budget-friendly alternative offering dedicated GPU and 16GB RAM well below ₹80k.'
              }
            ],
            followUpChips: [
              'Compare Lenovo LOQ vs ASUS TUF',
              'Show something cheaper',
              'Explain specifications of Lenovo LOQ',
              'Save Lenovo LOQ'
            ],
            timestamp: new Date(today.getTime() - 3590000).toISOString()
          }
        ]
      },
      {
        id: 'conv-demo-yest-1',
        userId: 'user-demo-1',
        title: 'Smartphone with great camera under ₹30K',
        createdAt: yesterday.toISOString(),
        updatedAt: yesterday.toISOString(),
        messages: [
          {
            id: 'msg-3',
            role: 'user',
            content: 'I need a phone with a good camera under ₹30,000.',
            timestamp: yesterday.toISOString()
          },
          {
            id: 'msg-4',
            role: 'assistant',
            content: `Here are the top camera-centric **Smartphones** under ₹30,000:\n\n### 1. **Motorola Edge 50 Fusion 5G** — ₹24,999\n* **AI Match**: \`98% Match\`\n* **Why this product?**: Sony LYTIA 700C flagship camera with OIS, 144Hz curved pOLED display, and IP68 underwater rating.\n\n### 2. **Samsung Galaxy A35 5G** — ₹27,999\n* **AI Match**: \`95% Match\`\n* **Why this product?**: 50MP OIS camera, vibrant 120Hz Super AMOLED, and 4 major Android updates.`,
            products: [],
            followUpChips: [
              'What about Samsung?',
              'Compare Motorola vs Samsung',
              'Show battery life specs'
            ],
            timestamp: new Date(yesterday.getTime() + 10000).toISOString()
          }
        ]
      }
    ];
  }

  async getConversations(userId) {
    const userConvs = this.conversations
      .filter(c => c.userId === userId)
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

    return userConvs.map(c => ({
      id: c.id,
      title: c.title,
      updatedAt: c.updatedAt,
      createdAt: c.createdAt,
      messageCount: c.messages.length,
      lastMessage: c.messages.length > 0 ? c.messages[c.messages.length - 1].content.slice(0, 60) : ''
    }));
  }

  async getConversationById(id, userId) {
    const conv = this.conversations.find(c => c.id === id && (!userId || c.userId === userId));
    return conv || null;
  }

  async createConversation(userId, firstMessage = null) {
    let title = 'New Conversation';
    if (firstMessage) {
      title = firstMessage.length > 35 ? `${firstMessage.slice(0, 35)}...` : firstMessage;
    }

    const newConv = {
      id: `conv-${uuidv4()}`,
      userId,
      title,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: []
    };

    this.conversations.unshift(newConv);
    return newConv;
  }

  async addMessage(conversationId, { role, content, products = [], followUpChips = [] }) {
    const conv = this.conversations.find(c => c.id === conversationId);
    if (!conv) throw new Error('Conversation not found.');

    const msg = {
      id: `msg-${uuidv4()}`,
      role,
      content,
      products,
      followUpChips,
      timestamp: new Date().toISOString()
    };

    conv.messages.push(msg);
    conv.updatedAt = new Date().toISOString();

    // Auto-update conversation title from first user query if still generic
    if (role === 'user' && (conv.title === 'New Conversation' || conv.messages.length <= 2)) {
      conv.title = content.length > 35 ? `${content.slice(0, 35)}...` : content;
    }

    return msg;
  }

  async updateTitle(id, newTitle, userId) {
    const conv = this.conversations.find(c => c.id === id && (!userId || c.userId === userId));
    if (!conv) throw new Error('Conversation not found.');
    conv.title = newTitle;
    conv.updatedAt = new Date().toISOString();
    return conv;
  }

  async deleteConversation(id, userId) {
    const index = this.conversations.findIndex(c => c.id === id && (!userId || c.userId === userId));
    if (index === -1) return false;
    this.conversations.splice(index, 1);
    return true;
  }

  async clearMessages(id, userId) {
    const conv = this.conversations.find(c => c.id === id && (!userId || c.userId === userId));
    if (!conv) throw new Error('Conversation not found.');
    conv.messages = [];
    conv.updatedAt = new Date().toISOString();
    return conv;
  }

  async getTotalStats() {
    let totalMessages = 0;
    this.conversations.forEach(c => {
      totalMessages += c.messages.length;
    });

    return {
      totalConversations: this.conversations.length,
      totalMessages
    };
  }
}

const chatStore = new ChatStore();
module.exports = chatStore;
