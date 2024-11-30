import { Router } from 'express';
import { authenticate } from '../../middleware/auth';
import {
  getServices,
  getServiceById,
  addService,
  updateService,
  deleteService,
  updateServiceOrder,
} from '../../controllers/admin/services.controller';

const router = Router();

// All routes require authentication
router.use(authenticate);

// Services management
router.get('/', getServices);
router.get('/:id', getServiceById);
router.post('/', addService);
router.put('/:id', updateService);
router.delete('/:id', deleteService);
router.put('/:id/order', updateServiceOrder);

export default router;