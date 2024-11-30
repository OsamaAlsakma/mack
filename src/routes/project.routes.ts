import { Router } from 'express';
import multer from 'multer';
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  uploadProjectImage,
} from '../controllers/project.controller';
import { validateProject } from '../validators/project.validator';
import { authorize } from '../middleware/auth';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', validateProject, createProject);
router.get('/', getProjects);
router.get('/:id', getProjectById);
router.put('/:id', authorize('ADMIN'), validateProject, updateProject);
router.post('/:id/images', authorize('ADMIN'), upload.single('image'), uploadProjectImage);

export default router;