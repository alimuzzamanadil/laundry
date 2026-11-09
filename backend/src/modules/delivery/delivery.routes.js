import { Router } from 'express';
import { deliveryController } from './delivery.controller.js';
import { authenticate } from '../../shared/middleware/authenticate.js';
import { authorize } from '../../shared/middleware/authorize.js';
import { validate } from '../../shared/middleware/validate.js';
import { assignDeliverySchema, updateDeliveryStatusSchema } from './delivery.validation.js';

const router = Router();

router.use(authenticate);

router.post('/assign', authorize('ADMIN'), validate(assignDeliverySchema), deliveryController.assign);
router.get('/my-tasks', authorize('STAFF', 'ADMIN'), deliveryController.getMyTasks);
router.patch('/:id/status', authorize('STAFF', 'ADMIN'), validate(updateDeliveryStatusSchema), deliveryController.updateStatus);

export default router;
