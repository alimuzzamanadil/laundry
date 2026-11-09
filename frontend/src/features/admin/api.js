import { apiClient } from '../../lib/apiClient';

export const adminApi = {
  getDashboardStats: () => apiClient.get('/admin/dashboard'),
  getAllOrders: (params) => apiClient.get('/admin/orders', { params }),
  updateOrderStatus: (id, payload) => apiClient.patch(`/admin/orders/${id}/status`, payload),
  getStaff: () => apiClient.get('/admin/staff'),
  assignDelivery: (payload) => apiClient.post('/delivery/assign', payload),
};
