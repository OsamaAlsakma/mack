import { Router } from 'express';
import {
  createService,
  getServices,
  getServiceById,
  updateService,
} from '../controllers/service.controller';
import { validateService } from '../validators/service.validator';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.get('/', getServices);
router.get('/:id', getServiceById);
router.post('/', authenticate, authorize('ADMIN'), validateService, createService);
router.put('/:id', authenticate, authorize('ADMIN'), validateService, updateService);

export default router;