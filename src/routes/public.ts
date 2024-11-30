import { Router } from 'express';
import {
  getHomeContent,
  getAboutContent,
  getExecutives,
  getProjects,
  getProjectById,
  getServices,
  getServiceById,
  getSocialLinks,
  getContactInfo,
} from '../controllers/public.controller';

const router = Router();

// Public routes for frontend consumption
router.get('/home', getHomeContent);
router.get('/about', getAboutContent);
router.get('/executives', getExecutives);
router.get('/projects', getProjects);
router.get('/projects/:id', getProjectById);
router.get('/services', getServices);
router.get('/services/:id', getServiceById);
router.get('/social', getSocialLinks);
router.get('/contact', getContactInfo);

export default router;