import { deliveryRepository } from './delivery.repository.js';
import { ordersRepository } from '../orders/orders.repository.js';
import { AppError } from '../../shared/utils/AppError.js';
import { ORDER_STATUS } from '../../shared/constants/orderStatus.js';

export const deliveryService = {
  async assignStaff(data) {
    const assignment = await deliveryRepository.assign({
      orderId: data.order_id,
      staffId: data.staff_id,
      taskType: data.task_type,
      notes: data.notes,
    });
    return assignment;
  },

  async getStaffTasks(staffId) {
    return deliveryRepository.findByStaffId(staffId);
  },

  async updateTaskStatus(assignmentId, staffId, status, notes) {
    const updated = await deliveryRepository.updateStatus(assignmentId, status, notes);
    if (!updated) throw new AppError('Assignment not found', 404);

    // Auto-progress order status if delivery completed
    if (updated.status === 'COMPLETED') {
      const newOrderStatus = updated.task_type === 'PICKUP' ? ORDER_STATUS.PICKED_UP : ORDER_STATUS.DELIVERED;
      await ordersRepository.updateStatus(updated.order_id, newOrderStatus, `Completed by staff (${updated.task_type})`, staffId);
    }
    return updated;
  },
};
