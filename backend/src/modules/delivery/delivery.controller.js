import { deliveryService } from './delivery.service.js';
import { asyncHandler } from '../../shared/utils/asyncHandler.js';

export const deliveryController = {
  assign: asyncHandler(async (req, res) => {
    const result = await deliveryService.assignStaff(req.body);
    res.status(201).json({ success: true, data: result });
  }),

  getMyTasks: asyncHandler(async (req, res) => {
    const tasks = await deliveryService.getStaffTasks(req.user.id);
    res.status(200).json({ success: true, data: tasks });
  }),

  updateStatus: asyncHandler(async (req, res) => {
    const { status, notes } = req.body;
    const updated = await deliveryService.updateTaskStatus(req.params.id, req.user.id, status, notes);
    res.status(200).json({ success: true, data: updated });
  }),
};
