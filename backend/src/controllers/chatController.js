const chatStore = require('../services/chatStore');
const llmService = require('../services/llmService');

// @desc    Process a chat message & return AI recommendations
// @route   POST /api/chat/message
const sendMessage = async (req, res) => {
  try {
    const { message, conversationId, context = {} } = req.body;
    const userId = req.user ? req.user.id : 'anonymous';
    const userPreferences = req.user ? (req.user.preferences || {}) : {};

    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, message: 'Message cannot be empty.' });
    }

    // 1. Ensure or retrieve active conversation
    let currentConv = null;
    let targetConvId = conversationId;

    if (userId !== 'anonymous') {
      if (targetConvId) {
        currentConv = await chatStore.getConversationById(targetConvId, userId);
      }
      if (!currentConv) {
        currentConv = await chatStore.createConversation(userId, message);
        targetConvId = currentConv.id;
      }

      // Record user message
      await chatStore.addMessage(targetConvId, {
        role: 'user',
        content: message
      });
    }

    // 2. Generate AI recommendation/response
    const aiResponse = await llmService.generateResponse({
      message,
      context,
      userPreferences
    });

    // 3. Record assistant response in conversation
    if (userId !== 'anonymous' && targetConvId) {
      await chatStore.addMessage(targetConvId, {
        role: 'assistant',
        content: aiResponse.reply,
        products: aiResponse.products || [],
        followUpChips: aiResponse.followUpChips || []
      });
    }

    res.status(200).json({
      success: true,
      conversationId: targetConvId,
      reply: aiResponse.reply,
      products: aiResponse.products || [],
      followUpChips: aiResponse.followUpChips || [],
      context: aiResponse.context || {},
      intent: aiResponse.intent || 'RECOMMENDATION',
      extractedRequirements: aiResponse.extractedRequirements || null
    });
  } catch (err) {
    console.error('Error in sendMessage:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Get user conversation history list
// @route   GET /api/chat/history
const getHistory = async (req, res) => {
  try {
    const conversations = await chatStore.getConversations(req.user.id);
    res.status(200).json({ success: true, count: conversations.length, conversations });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Get single conversation with messages
// @route   GET /api/chat/conversations/:id
const getConversation = async (req, res) => {
  try {
    const { id } = req.params;
    const conversation = await chatStore.getConversationById(id, req.user.id);

    if (!conversation) {
      return res.status(404).json({ success: false, message: 'Conversation not found.' });
    }

    res.status(200).json({ success: true, conversation });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Create new conversation
// @route   POST /api/chat/conversations
const createConversation = async (req, res) => {
  try {
    const { title } = req.body;
    const conv = await chatStore.createConversation(req.user.id, title);
    res.status(201).json({ success: true, conversation: conv });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Rename conversation title
// @route   PUT /api/chat/conversations/:id
const updateTitle = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ success: false, message: 'Title cannot be empty.' });
    }

    const conv = await chatStore.updateTitle(id, title, req.user.id);
    res.status(200).json({ success: true, conversation: conv });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Delete conversation
// @route   DELETE /api/chat/conversations/:id
const deleteConversation = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await chatStore.deleteConversation(id, req.user.id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Conversation not found.' });
    }

    res.status(200).json({ success: true, message: 'Conversation deleted.' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Clear messages in conversation
// @route   POST /api/chat/conversations/:id/clear
const clearMessages = async (req, res) => {
  try {
    const { id } = req.params;
    const conv = await chatStore.clearMessages(id, req.user.id);
    res.status(200).json({ success: true, conversation: conv });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Get active AI model status
// @route   GET /api/chat/ai-status
const getAIStatus = async (req, res) => {
  try {
    const status = llmService.getStatus();
    res.status(200).json({ success: true, ...status });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Update AI model API key & settings
// @route   POST /api/chat/ai-settings
const updateAISettings = async (req, res) => {
  try {
    const { provider, apiKey } = req.body;

    if (!provider || !['gemini', 'openai', 'universal'].includes(provider)) {
      return res.status(400).json({ success: false, message: 'Invalid provider. Must be "gemini", "openai", or "universal".' });
    }

    if (provider === 'universal') {
      llmService.setKey('gemini', '');
      llmService.setKey('openai', '');
      return res.status(200).json({
        success: true,
        message: 'Switched to Universal AI Engine.',
        status: llmService.getStatus()
      });
    }

    if (!apiKey || !apiKey.trim()) {
      return res.status(400).json({ success: false, message: 'API key is required.' });
    }

    // Set key in llmService
    llmService.setKey(provider, apiKey.trim());

    // Validate key with a test call
    try {
      if (provider === 'gemini') {
        const candidateModels = ['gemini-3.6-flash', 'gemini-flash-latest', 'gemini-2.5-flash-lite', 'gemini-1.5-flash'];
        let ok = false;
        let lastErr = null;
        for (const m of candidateModels) {
          try {
            const model = llmService.geminiClient.getGenerativeModel({ model: m });
            await model.generateContent('Say OK');
            ok = true;
            break;
          } catch (e) {
            lastErr = e;
          }
        }
        if (!ok) throw lastErr;
      } else if (provider === 'openai') {
        await llmService.openaiClient.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: [{ role: 'user', content: 'Say "OK" in one word.' }],
          max_tokens: 5
        });
      }
    } catch (testErr) {
      // Revert if test fails
      llmService.setKey(provider, '');
      return res.status(400).json({
        success: false,
        message: `Verification failed for ${provider}: ${testErr.message}`
      });
    }

    res.status(200).json({
      success: true,
      message: `Successfully connected to ${provider === 'gemini' ? 'Google Gemini 1.5 Flash' : 'OpenAI'}! Real AI model is now active.`,
      status: llmService.getStatus()
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  sendMessage,
  getHistory,
  getConversation,
  createConversation,
  updateTitle,
  deleteConversation,
  clearMessages,
  getAIStatus,
  updateAISettings
};
