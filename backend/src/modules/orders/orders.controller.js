import { ordersService } from './orders.service.js';
import { asyncHandler } from '../../shared/utils/asyncHandler.js';

export const ordersController = {
  create: asyncHandler(async (req, res) => {
    const order = await ordersService.placeOrder(req.user.id, req.body);
    res.status(201).json({ success: true, data: order });
  }),

  getMyOrders: asyncHandler(async (req, res) => {
    const orders = await ordersService.getUserOrders(req.user.id);
    res.status(200).json({ success: true, count: orders.length, data: orders });
  }),

  getById: asyncHandler(async (req, res) => {
    const order = await ordersService.getOrderDetails(req.params.id, req.user.id, req.user.role);
    res.status(200).json({ success: true, data: order });
  }),

  cancel: asyncHandler(async (req, res) => {
    const updated = await ordersService.cancelOrder(req.params.id, req.user.id, req.user.role);
    res.status(200).json({ success: true, data: updated });
  }),
};
