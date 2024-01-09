import express from 'express';
import authRoutes from './auth.routes.js';
import userRoutes from './user.routes.js';
import courierServiceRoutes from './courierService.routes.js';
import vehiclesRoutes from './vehicle.routes.js';
import visitsRouter from './visit.routes.js';
import newsRouter from './new.routes.js';
import dashboardRouter from './dashboard.routes.js';

const router = express.Router();

router.use('/api/v1/auth', authRoutes)
router.use('/api/v1/users', userRoutes);
router.use('/api/v1/courierServices', courierServiceRoutes);
router.use('/api/v1/vehicles', vehiclesRoutes);
router.use('/api/v1/visits', visitsRouter);
router.use('/api/v1/news', newsRouter);
router.use('/api/v1/dashboard', dashboardRouter);

export default router;