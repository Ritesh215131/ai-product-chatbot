export const formatPrice = (amount) => {
  if (amount === undefined || amount === null || isNaN(amount)) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

export const formatDiscount = (price, originalPrice) => {
  if (!originalPrice || originalPrice <= price) return null;
  const discount = Math.round(((originalPrice - price) / originalPrice) * 100);
  return `${discount}% OFF`;
};

export const formatDate = (isoString) => {
  if (!isoString) return '';
  const date = new Date(isoString);
  return date.toLocaleDateString('en-IN', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

export const groupConversationsByDate = (conversations = []) => {
  const groups = {
    Today: [],
    Yesterday: [],
    'Previous 7 Days': [],
    Older: []
  };

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const yesterday = today - 86400000;
  const sevenDaysAgo = today - 7 * 86400000;

  conversations.forEach((conv) => {
    const convTime = new Date(conv.updatedAt || conv.createdAt).getTime();

    if (convTime >= today) {
      groups.Today.push(conv);
    } else if (convTime >= yesterday) {
      groups.Yesterday.push(conv);
    } else if (convTime >= sevenDaysAgo) {
      groups['Previous 7 Days'].push(conv);
    } else {
      groups.Older.push(conv);
    }
  });

  return groups;
};

// Lightweight markdown text parser for chat responses
export const parseMarkdown = (text) => {
  if (!text) return '';

  let html = text
    // Headings
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^#### (.*$)/gim, '<h4>$1</h4>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    // Bold & italic
    .replace(/\*\*\*(.*?)\*\*\*/gim, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/gim, '<em>$1</em>')
    // Inline code
    .replace(/`([^`]+)`/gim, '<code>$1</code>')
    // Blockquote
    .replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>')
    // Bullet points
    .replace(/^\* (.*$)/gim, '<li>$1</li>')
    .replace(/^- (.*$)/gim, '<li>$1</li>')
    // Line breaks
    .replace(/\n\n/gim, '<p></p>')
    .replace(/\n/gim, '<br/>');

  return html;
};
