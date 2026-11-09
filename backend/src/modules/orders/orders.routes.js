import { Router } from 'express';
import { ordersController } from './orders.controller.js';
import { authenticate } from '../../shared/middleware/authenticate.js';
import { validate } from '../../shared/middleware/validate.js';
import { createOrderSchema } from './orders.validation.js';

const router = Router();

router.use(authenticate);

router.post('/', validate(createOrderSchema), ordersController.create);
router.get('/my-orders', ordersController.getMyOrders);
router.get('/:id', ordersController.getById);
router.patch('/:id/cancel', ordersController.cancel);

export default router;
