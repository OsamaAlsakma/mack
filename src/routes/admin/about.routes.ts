import { Router } from 'express';
import { authenticate } from '../../middleware/auth';
import {
  getAboutContent,
  updateAboutContent,
  updateVisionMission,
  updateStats,
  updateValues,
  updateExpertise,
  updateTeam,
} from '../../controllers/admin/about.controller';

const router = Router();

// All routes require authentication
router.use(authenticate);

// Get all about page content
router.get('/', getAboutContent);

// Update entire about page content
router.put('/', updateAboutContent);

// Update specific sections
router.put('/vision-mission', updateVisionMission);
router.put('/stats', updateStats);
router.put('/values', updateValues);
router.put('/expertise', updateExpertise);
router.put('/team', updateTeam);

export default router;