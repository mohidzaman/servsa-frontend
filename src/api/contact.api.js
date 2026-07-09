import api from './axios';

export const contactApi = {
  // Public
  submitContact: (data) => api.post('/contact', data),
  submitQuote: (data) => api.post('/contact/quotes', data),

  // Authenticated
  getMessages: (params) => api.get('/contact', { params }),
  getMessage: (id) => api.get(`/contact/${id}`),
  markRead: (id) => api.patch(`/contact/${id}/read`),
  getQuotes: (params) => api.get('/contact/quotes', { params }),
  getQuote: (id) => api.get(`/contact/quotes/${id}`),
  updateQuoteStatus: (id, data) => api.patch(`/contact/quotes/${id}/status`, data),
  deleteMessage: (id) => api.delete(`/contact/${id}`),
  deleteQuote: (id) => api.delete(`/contact/quotes/${id}`),
};
