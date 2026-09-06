const BASE_URL = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL.replace(/\/+$/, '')}/api` 
  : '/api';

const getHeaders = () => {
  const token = localStorage.getItem('productai_token');
  const headers = {
    'Content-Type': 'application/json'
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

const handleResponse = async (res) => {
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || `Request failed with status ${res.status}`);
  }
  return data;
};

export const api = {
  get: async (endpoint) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: getHeaders()
    });
    return handleResponse(res);
  },

  post: async (endpoint, body) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(body)
    });
    return handleResponse(res);
  },

  put: async (endpoint, body) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(body)
    });
    return handleResponse(res);
  },

  delete: async (endpoint) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    return handleResponse(res);
  }
};

// API Services
export const authApi = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (data) => api.put('/auth/profile', data),
  toggleSaveProduct: (productId) => api.post(`/auth/save-product/${productId}`, {})
};

export const productApi = {
  getProducts: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return api.get(`/products${query ? `?${query}` : ''}`);
  },
  getProductById: (id) => api.get(`/products/${id}`),
  getCategories: () => api.get('/products/meta/categories'),
  getBrands: (category) => api.get(`/products/meta/brands${category ? `?category=${category}` : ''}`),
  getSavedProducts: () => api.get('/products/user/saved'),
  getRecentlyViewed: () => api.get('/products/user/recently-viewed')
};

export const chatApi = {
  sendMessage: (payload) => api.post('/chat/message', payload),
  getHistory: () => api.get('/chat/history'),
  getConversation: (id) => api.get(`/chat/conversations/${id}`),
  createConversation: (title) => api.post('/chat/conversations', { title }),
  updateTitle: (id, title) => api.put(`/chat/conversations/${id}`, { title }),
  deleteConversation: (id) => api.delete(`/chat/conversations/${id}`),
  clearMessages: (id) => api.post(`/chat/conversations/${id}/clear`, {}),
  getAIStatus: () => api.get('/chat/ai-status'),
  updateAISettings: (payload) => api.post('/chat/ai-settings', payload)
};

export const compareApi = {
  compareProducts: (productIds) => api.post('/compare', { productIds })
};
