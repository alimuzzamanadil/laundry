import { z } from 'zod';

export const serviceSchema = z.object({
  name: z.string().min(2, 'Service name is required'),
  description: z.string().optional(),
  price_per_unit: z.number().positive('Price must be greater than 0'),
  unit_type: z.enum(['KG', 'PIECE', 'PAIR', 'ITEM']).default('KG'),
  category: z.string().default('GENERAL'),
  is_active: z.boolean().default(true),
});
