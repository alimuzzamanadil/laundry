import { apiClient } from '../../lib/apiClient';

export const ordersApi = {
  createOrder: (payload) => apiClient.post('/orders', payload),
  getMyOrders: () => apiClient.get('/orders/my-orders'),
  getOrderById: (id) => apiClient.get(`/orders/${id}`),
  cancelOrder: (id) => apiClient.patch(`/orders/${id}/cancel`),
};
