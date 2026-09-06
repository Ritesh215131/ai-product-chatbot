const express = require('express');
const router = express.Router();
const {
  sendMessage,
  getHistory,
  getConversation,
  createConversation,
  updateTitle,
  deleteConversation,
  clearMessages,
  getAIStatus,
  updateAISettings
} = require('../controllers/chatController');
const { protect, optionalAuth } = require('../middleware/authMiddleware');

// Real AI Model Status and Key Management
router.get('/ai-status', getAIStatus);
router.post('/ai-settings', updateAISettings);

// Message sending allows optionalAuth (anonymous users can chat, registered users have persistence)
router.post('/message', optionalAuth, sendMessage);

// History and conversation management requires authentication
router.get('/history', protect, getHistory);
router.post('/conversations', protect, createConversation);
router.get('/conversations/:id', protect, getConversation);
router.put('/conversations/:id', protect, updateTitle);
router.delete('/conversations/:id', protect, deleteConversation);
router.post('/conversations/:id/clear', protect, clearMessages);

module.exports = router;
