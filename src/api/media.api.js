import api from './axios';

export const mediaApi = {
  upload: (formData) =>
    api.post('/media/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  getAll: (params) => api.get('/media', { params }),
  getFolders: () => api.get('/media/folders'),
  getById: (id) => api.get(`/media/${id}`),
  update: (id, data) => api.put(`/media/${id}`, data),
  delete: (id) => api.delete(`/media/${id}`),
  batchDelete: (ids) => api.delete('/media/batch', { data: { ids } }),
  replace: (id, formData) =>
    api.put(`/media/${id}/replace`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
};
