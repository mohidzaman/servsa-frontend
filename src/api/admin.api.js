import api from './axios';

export const adminApi = {
  getAll: () => api.get('/admin'),
  getStats: () => api.get('/admin/stats'),
  create: (data) => api.post('/admin', data),
  update: (id, data) => api.put(`/admin/${id}`, data),
  delete: (id) => api.delete(`/admin/${id}`),
  getActivity: (params) => api.get('/admin/activity', { params }),
  getActivityStats: () => api.get('/admin/activity/stats'),
};
