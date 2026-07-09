import api from './axios';

export const portfolioApi = {
  getAll: (params) => api.get('/portfolio', { params }),
  getById: (id) => api.get(`/portfolio/${id}`),
  create: (data) => api.post('/portfolio', data),
  update: (id, data) => api.put(`/portfolio/${id}`, data),
  delete: (id) => api.delete(`/portfolio/${id}`),
  togglePublish: (id) => api.patch(`/portfolio/${id}/publish`),
  toggleFeatured: (id) => api.patch(`/portfolio/${id}/featured`),
  addImage: (id, data) => api.post(`/portfolio/${id}/images`, data),
  updateImage: (id, imageId, data) => api.put(`/portfolio/${id}/images/${imageId}`, data),
  deleteImage: (id, imageId) => api.delete(`/portfolio/${id}/images/${imageId}`),
};
