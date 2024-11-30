import { Router } from 'express';
import { authenticate } from '../../middleware/auth';
import {
  getContactInfo,
  updateContactInfo,
} from '../../controllers/admin/contact.controller';

const router = Router();

// All routes require authentication
router.use(authenticate);

// Contact information management
router.get('/', getContactInfo);
router.put('/', updateContactInfo);

export default router;