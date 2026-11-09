import { Router } from 'express';
import { catalogController } from './catalog.controller.js';
import { authenticate } from '../../shared/middleware/authenticate.js';
import { authorize } from '../../shared/middleware/authorize.js';
import { validate } from '../../shared/middleware/validate.js';
import { serviceSchema } from './catalog.validation.js';

const router = Router();

router.get('/', catalogController.getAll);
router.get('/:id', catalogController.getById);

// Admin-only endpoints
router.post('/', authenticate, authorize('ADMIN'), validate(serviceSchema), catalogController.create);
router.put('/:id', authenticate, authorize('ADMIN'), validate(serviceSchema), catalogController.update);
router.delete('/:id', authenticate, authorize('ADMIN'), catalogController.remove);

export default router;
