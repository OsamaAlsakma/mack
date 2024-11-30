import { Router } from 'express';
import multer from 'multer';
import { authenticate } from '../middleware/auth';
import {
  // Executives
  getExecutives,
  addExecutive,
  updateExecutive,
  deleteExecutive,
  // Projects
  addProject,
  updateProject,
  deleteProject,
  // Services
  addService,
  updateService,
  deleteService,
} from '../controllers/content.controller';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

// Executive Routes
router.get('/executives', getExecutives);
router.post('/executives', authenticate, upload.single('image'), addExecutive);
router.put('/executives/:id', authenticate, upload.single('image'), updateExecutive);
router.delete('/executives/:id', authenticate, deleteExecutive);

// Project Routes
router.post('/projects', authenticate, upload.single('image'), addProject);
router.put('/projects/:id', authenticate, upload.single('image'), updateProject);
router.delete('/projects/:id', authenticate, deleteProject);

// Service Routes
router.post('/services', authenticate, addService);
router.put('/services/:id', authenticate, updateService);
router.delete('/services/:id', authenticate, deleteService);

export default router;