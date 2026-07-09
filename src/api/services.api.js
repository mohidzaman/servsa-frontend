import api from './axios';

export const servicesApi = {
  getAll: (params) => api.get('/services', { params }),
  getById: (id) => api.get(`/services/${id}`),
  getCategories: () => api.get('/services/categories'),
  create: (data) => api.post('/services', data),
  update: (id, data) => api.put(`/services/${id}`, data),
  delete: (id) => api.delete(`/services/${id}`),
  togglePublish: (id) => api.patch(`/services/${id}/publish`),
  toggleFeatured: (id) => api.patch(`/services/${id}/featured`),
  createCategory: (data) => api.post('/services/categories', data),
  updateCategory: (id, data) => api.put(`/services/categories/${id}`, data),
  deleteCategory: (id) => api.delete(`/services/categories/${id}`),
};
