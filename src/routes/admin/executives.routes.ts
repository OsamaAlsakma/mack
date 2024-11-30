import { Router } from 'express';
import multer from 'multer';
import { authenticate } from '../../middleware/auth';
import {
  getExecutives,
  getExecutiveById,
  addExecutive,
  updateExecutive,
  deleteExecutive,
  updateExecutiveOrder,
} from '../../controllers/admin/executives.controller';
import { validateExecutive, validateExecutiveOrder } from '../../validators/executive.validator';
import { validate } from '../../middleware/validate';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

// All routes require authentication
router.use(authenticate);

// Executive quotes management
router.get('/', getExecutives);
router.get('/:id', getExecutiveById);

router.post('/', 
  upload.single('image'),
  validateExecutive,
  validate,
  addExecutive
);

router.put('/:id',
  upload.single('image'),
  validateExecutive,
  validate,
  updateExecutive
);

router.delete('/:id', deleteExecutive);

router.put('/:id/order',
  validateExecutiveOrder,
  validate,
  updateExecutiveOrder
);

export default router;