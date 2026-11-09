import { adminService } from './admin.service.js';
import { asyncHandler } from '../../shared/utils/asyncHandler.js';

export const adminController = {
  getStats: asyncHandler(async (req, res) => {
    const stats = await adminService.getDashboardStats();
    res.status(200).json({ success: true, data: stats });
  }),

  getOrders: asyncHandler(async (req, res) => {
    const orders = await adminService.getAllOrders(req.query);
    res.status(200).json({ success: true, count: orders.length, data: orders });
  }),

  updateOrderStatus: asyncHandler(async (req, res) => {
    const { status, notes } = req.body;
    const updated = await adminService.updateOrderStatus(req.params.id, status, notes, req.user.id);
    res.status(200).json({ success: true, data: updated });
  }),

  getStaff: asyncHandler(async (req, res) => {
    const staff = await adminService.getStaffList();
    res.status(200).json({ success: true, data: staff });
  }),
};
