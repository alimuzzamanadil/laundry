import { Router } from 'express';
import authRoutes from './modules/auth/index.js';
import catalogRoutes from './modules/catalog/index.js';
import ordersRoutes from './modules/orders/index.js';
import deliveryRoutes from './modules/delivery/index.js';
import adminRoutes from './modules/admin/index.js';

const router = Router();

router.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

router.use('/auth', authRoutes);
router.use('/catalog', catalogRoutes);
router.use('/orders', ordersRoutes);
router.use('/delivery', deliveryRoutes);
router.use('/admin', adminRoutes);

export default router;
