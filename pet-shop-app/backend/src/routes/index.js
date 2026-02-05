import express from 'express';
const router = express.Router();
import PackageController from '../controllers/PackageController.js';
import AppointmentController from '../controllers/AppointmentController.js';

// 套餐路由
router.get('/packages', PackageController.getAll);
router.get('/packages/:id', PackageController.getById);
router.post('/packages', PackageController.create);
router.put('/packages/:id', PackageController.update);
router.delete('/packages/:id', PackageController.delete);

// 预约路由
router.get('/appointments', AppointmentController.getAll);
router.get('/appointments/:id', AppointmentController.getById);
router.get('/appointments/date/:date', AppointmentController.getByDate);
router.post('/appointments', AppointmentController.create);
router.put('/appointments/:id', AppointmentController.update);
router.delete('/appointments/:id', AppointmentController.delete);

export default router;