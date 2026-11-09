import { Router } from 'express';
import { adminController } from './admin.controller.js';
import { authenticate } from '../../shared/middleware/authenticate.js';
import { authorize } from '../../shared/middleware/authorize.js';

const router = Router();

router.use(authenticate, authorize('ADMIN'));

router.get('/dashboard', adminController.getStats);
router.get('/orders', adminController.getOrders);
router.patch('/orders/:id/status', adminController.updateOrderStatus);
router.get('/staff', adminController.getStaff);

export default router;
