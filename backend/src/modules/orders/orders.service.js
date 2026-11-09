import { ordersRepository } from './orders.repository.js';
import { catalogRepository } from '../catalog/catalog.repository.js';
import { AppError } from '../../shared/utils/AppError.js';
import { ORDER_STATUS } from '../../shared/constants/orderStatus.js';

export const ordersService = {
  async placeOrder(userId, data) {
    const { pickup_address, delivery_address, pickup_date, notes, items } = data;

    // Resolve prices from database
    let totalAmount = 0;
    const resolvedItems = [];

    for (const item of items) {
      const service = await catalogRepository.getById(item.service_id);
      if (!service || !service.is_active) {
        throw new AppError(`Service ${item.service_id} is unavailable.`, 400);
      }
      const unitPrice = parseFloat(service.price_per_unit);
      const subtotal = unitPrice * item.quantity;
      totalAmount += subtotal;

      resolvedItems.push({
        service_id: service.id,
        quantity: item.quantity,
        unit_price: unitPrice,
        subtotal,
      });
    }

    return ordersRepository.createWithItems({
      userId,
      pickupAddress: pickup_address,
      deliveryAddress: delivery_address,
      pickupDate: pickup_date,
      notes,
      items: resolvedItems,
      totalAmount,
    });
  },

  async getUserOrders(userId) {
    return ordersRepository.findByUserId(userId);
  },

  async getOrderDetails(orderId, userId, role) {
    const order = await ordersRepository.findById(orderId);
    if (!order) throw new AppError('Order not found', 404);

    if (role === 'CUSTOMER' && order.user_id !== userId) {
      throw new AppError('Access denied for this order.', 403);
    }
    return order;
  },

  async cancelOrder(orderId, userId, role) {
    const order = await ordersRepository.findById(orderId);
    if (!order) throw new AppError('Order not found', 404);

    if (role === 'CUSTOMER' && order.user_id !== userId) {
      throw new AppError('Access denied.', 403);
    }
    if (order.status !== ORDER_STATUS.PLACED) {
      throw new AppError('Orders can only be cancelled while in PLACED status.', 400);
    }

    return ordersRepository.updateStatus(orderId, ORDER_STATUS.CANCELLED, 'Cancelled by user', userId);
  },
};
