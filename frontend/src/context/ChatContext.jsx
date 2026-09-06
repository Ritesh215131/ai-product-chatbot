import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';
import { chatApi } from '../services/api';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const toast = useToast();

  const [conversations, setConversations] = useState([]);
  const [currentConversationId, setCurrentConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [followUpChips, setFollowUpChips] = useState([]);
  const [activeContext, setActiveContext] = useState({});
  const stopGenerationRef = useRef(false);

  // Fetch chat history whenever user is authenticated
  const fetchHistory = useCallback(async () => {
    if (!isAuthenticated) {
      setConversations([]);
      return;
    }
    try {
      const data = await chatApi.getHistory();
      setConversations(data.conversations || []);
    } catch (err) {
      console.warn('Failed to load history:', err.message);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  // Load an existing conversation
  const loadConversation = async (id) => {
    try {
      const data = await chatApi.getConversation(id);
      setCurrentConversationId(data.conversation.id);
      setMessages(data.conversation.messages || []);

      // Extract last assistant followUpChips if available
      const lastMsg = (data.conversation.messages || []).slice().reverse().find(m => m.role === 'assistant');
      setFollowUpChips(lastMsg?.followUpChips || []);
    } catch (err) {
      toast.error('Failed to load conversation history.');
    }
  };

  // Start fresh chat
  const startNewChat = () => {
    setCurrentConversationId(null);
    setMessages([]);
    setFollowUpChips([]);
    setActiveContext({});
  };

  // Send message with streaming simulation
  const sendMessage = async (userText) => {
    if (!userText || !userText.trim() || isGenerating) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: userText.trim(),
      timestamp: new Date().toISOString()
    };

    // Optimistically append user message
    setMessages(prev => [...prev, userMessage]);
    setIsGenerating(true);
    setFollowUpChips([]);
    stopGenerationRef.current = false;

    try {
      const response = await chatApi.sendMessage({
        message: userText.trim(),
        conversationId: currentConversationId,
        context: activeContext
      });

      if (response.conversationId && !currentConversationId) {
        setCurrentConversationId(response.conversationId);
      }

      setActiveContext(response.context || {});

      // Simulate streaming response text effect for lifelike modern AI feel
      const fullText = response.reply;
      const assistantMsgId = `asst-${Date.now()}`;
      let displayedText = '';
      const chunkSize = Math.max(1, Math.floor(fullText.length / 30));

      // Create placeholder assistant message
      setMessages(prev => [
        ...prev,
        {
          id: assistantMsgId,
          role: 'assistant',
          content: '',
          products: [],
          followUpChips: [],
          timestamp: new Date().toISOString(),
          isStreaming: true
        }
      ]);

      let index = 0;
      const interval = setInterval(() => {
        if (stopGenerationRef.current || index >= fullText.length) {
          clearInterval(interval);
          setMessages(prev =>
            prev.map(m =>
              m.id === assistantMsgId
                ? {
                    ...m,
                    content: fullText,
                    products: response.products || [],
                    followUpChips: response.followUpChips || [],
                    isStreaming: false
                  }
                : m
            )
          );
          setFollowUpChips(response.followUpChips || []);
          setIsGenerating(false);
          fetchHistory();
          return;
        }

        displayedText = fullText.slice(0, index + chunkSize);
        index += chunkSize;

        setMessages(prev =>
          prev.map(m => (m.id === assistantMsgId ? { ...m, content: displayedText } : m))
        );
      }, 25);
    } catch (err) {
      setIsGenerating(false);
      toast.error(err.message || 'Error communicating with AI shopping assistant.');
      setMessages(prev => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: 'assistant',
          content: `⚠️ **Error**: ${err.message || 'Unable to connect to AI engine. Please check your network and try again.'}`,
          timestamp: new Date().toISOString()
        }
      ]);
    }
  };

  const stopGenerating = () => {
    stopGenerationRef.current = true;
    setIsGenerating(false);
  };

  const regenerateResponse = async () => {
    const lastUserMsg = [...messages].reverse().find(m => m.role === 'user');
    if (!lastUserMsg) return;

    // Remove last assistant message
    setMessages(prev => {
      const copy = [...prev];
      if (copy.length > 0 && copy[copy.length - 1].role === 'assistant') {
        copy.pop();
      }
      return copy;
    });

    await sendMessage(lastUserMsg.content);
  };

  const deleteConversation = async (id) => {
    try {
      await chatApi.deleteConversation(id);
      setConversations(prev => prev.filter(c => c.id !== id));
      if (currentConversationId === id) {
        startNewChat();
      }
      toast.success('Conversation removed.');
    } catch (err) {
      toast.error('Failed to delete conversation.');
    }
  };

  const clearCurrentChat = async () => {
    if (!currentConversationId) {
      setMessages([]);
      setFollowUpChips([]);
      return;
    }

    try {
      await chatApi.clearMessages(currentConversationId);
      setMessages([]);
      setFollowUpChips([]);
      toast.info('Chat history cleared.');
    } catch (err) {
      toast.error('Failed to clear chat.');
    }
  };

  return (
    <ChatContext.Provider
      value={{
        conversations,
        currentConversationId,
        messages,
        isGenerating,
        followUpChips,
        activeContext,
        sendMessage,
        stopGenerating,
        regenerateResponse,
        loadConversation,
        startNewChat,
        deleteConversation,
        clearCurrentChat,
        fetchHistory
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
