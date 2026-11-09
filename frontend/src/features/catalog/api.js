import { apiClient } from '../../lib/apiClient';

export const catalogApi = {
  getServices: () => apiClient.get('/catalog'),
  getServiceById: (id) => apiClient.get(`/catalog/${id}`),
};
