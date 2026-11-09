import { z } from 'zod';
import { DELIVERY_STATUS } from '../../shared/constants/orderStatus.js';

export const assignDeliverySchema = z.object({
  order_id: z.string().uuid('Invalid order ID'),
  staff_id: z.string().uuid('Invalid staff ID'),
  task_type: z.enum(['PICKUP', 'DELIVERY']),
  notes: z.string().optional(),
});

export const updateDeliveryStatusSchema = z.object({
  status: z.nativeEnum(DELIVERY_STATUS),
  notes: z.string().optional(),
});
