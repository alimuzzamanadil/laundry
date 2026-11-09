import { z } from 'zod';
import { ORDER_STATUS } from '../../shared/constants/orderStatus.js';

export const createOrderSchema = z.object({
  pickup_address: z.string().min(5, 'Pickup address is required'),
  delivery_address: z.string().min(5, 'Delivery address is required'),
  pickup_date: z.string(),
  notes: z.string().optional(),
  items: z.array(
    z.object({
      service_id: z.string().uuid('Invalid service ID'),
      quantity: z.number().positive('Quantity must be greater than 0'),
    })
  ).min(1, 'Order must contain at least one item'),
});

export const updateStatusSchema = z.object({
  status: z.nativeEnum(ORDER_STATUS),
  notes: z.string().optional(),
});
