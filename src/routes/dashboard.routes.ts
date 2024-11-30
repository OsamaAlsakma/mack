import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import {
  getDashboardStats,
  getHomeContent,
  updateHomeContent,
  getAboutContent,
  updateAboutContent,
  getSocialLinks,
  addSocialLink,
  updateSocialLink,
  deleteSocialLink
} from '../controllers/dashboard.controller';

const router = Router();

// All routes require authentication
router.use(authenticate);

// Dashboard Statistics
router.get('/stats', getDashboardStats);

// Home Page Content
router.get('/home', getHomeContent);
router.put('/home', updateHomeContent);

// About Page Content
router.get('/about', getAboutContent);
router.put('/about', updateAboutContent);

// Social Links
router.get('/social-links', getSocialLinks);
router.post('/social-links', addSocialLink);
router.put('/social-links/:id', updateSocialLink);
router.delete('/social-links/:id', deleteSocialLink);

export default router;