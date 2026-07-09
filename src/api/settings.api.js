import api from './axios';

export const settingsApi = {
  getAll: () => api.get('/settings'),
  update: (key, value) => api.put(`/settings/${key}`, { value }),
  bulkUpdate: (settings) => api.put('/settings/bulk', { settings }),
  getSeoList: () => api.get('/settings/seo/list'),
  getPageSeo: (pageSlug) => api.get(`/settings/seo/${pageSlug}`),
  upsertPageSeo: (pageSlug, data) => api.put(`/settings/seo/${pageSlug}`, data),
};
