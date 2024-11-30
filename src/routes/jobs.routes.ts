import { Router } from 'express';
import multer from 'multer';
import {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  submitApplication,
  getApplications,
  updateApplicationStatus
} from '../controllers/jobs.controller';
import { authenticate, authorize } from '../middleware/auth';
import { validateJob, validateApplication } from '../validators/job.validator';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

// Public routes
router.get('/', getJobs);
router.get('/:id', getJobById);
router.post('/:jobId/apply', upload.single('resume'), validateApplication, submitApplication);

// Admin routes
router.use(authenticate);
router.use(authorize('ADMIN'));

router.post('/', validateJob, createJob);
router.put('/:id', validateJob, updateJob);
router.get('/applications', getApplications);
router.put('/applications/:id/status', updateApplicationStatus);

export default router;