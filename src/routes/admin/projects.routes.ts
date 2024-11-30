import { Router } from 'express';
import multer from 'multer';
import { authenticate } from '../../middleware/auth';
import {
  getProjects,
  getProjectById,
  addProject,
  updateProject,
  deleteProject,
  updateProjectOrder,
  toggleProjectFeatured,
} from '../../controllers/admin/projects.controller';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

// All routes require authentication
router.use(authenticate);

// Projects management
router.get('/', getProjects);
router.get('/:id', getProjectById);
router.post('/', upload.single('image'), addProject);
router.put('/:id', upload.single('image'), updateProject);
router.delete('/:id', deleteProject);
router.put('/:id/order', updateProjectOrder);
router.put('/:id/featured', toggleProjectFeatured);

export default router;