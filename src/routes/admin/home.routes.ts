import { Router } from 'express';
import { authenticate } from '../../middleware/auth';
import {
  getHomeContent,
  updateHomeContent,
  updateHeroSection,
  updateStatsSection,
  updateProcessSteps,
  updateSolutions,
  updateTechnologies,
} from '../../controllers/admin/home.controller';

const router = Router();

// All routes require authentication
router.use(authenticate);

// Get all home page content
router.get('/', getHomeContent);

// Update entire home page content
router.put('/', updateHomeContent);

// Update specific sections
router.put('/hero', updateHeroSection);
router.put('/stats', updateStatsSection);
router.put('/process', updateProcessSteps);
router.put('/solutions', updateSolutions);
router.put('/technologies', updateTechnologies);

export default router;