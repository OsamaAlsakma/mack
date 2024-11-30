import { Router } from 'express';
import { authenticate } from '../../middleware/auth';
import {
  getSocialLinks,
  addSocialLink,
  updateSocialLink,
  deleteSocialLink,
  updateSocialLinkOrder,
} from '../../controllers/admin/social.controller';

const router = Router();

// All routes require authentication
router.use(authenticate);

// Social links management
router.get('/', getSocialLinks);
router.post('/', addSocialLink);
router.put('/:id', updateSocialLink);
router.delete('/:id', deleteSocialLink);
router.put('/:id/order', updateSocialLinkOrder);

export default router;