import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import {
  // Project Types
  getProjectTypes,
  addProjectType,
  updateProjectType,
  deleteProjectType,
  // Budget Ranges
  getBudgetRanges,
  addBudgetRange,
  updateBudgetRange,
  deleteBudgetRange,
  // Timelines
  getTimelines,
  addTimeline,
  updateTimeline,
  deleteTimeline,
  // Project Requests
  getProjectRequests,
  getProjectRequestById,
  submitProjectRequest,
  updateProjectRequestStatus
} from '../controllers/project-request.controller';
import {
  validateProjectType,
  validateBudgetRange,
  validateTimeline,
  validateProjectRequest
} from '../validators/project-request.validator';

const router = Router();

// Public routes
router.get('/types', getProjectTypes);
router.get('/budgets', getBudgetRanges);
router.get('/timelines', getTimelines);
router.post('/submit', validateProjectRequest, submitProjectRequest);

// Protected routes (require authentication)
router.use(authenticate);

// Project Types Management
router.post('/types', validateProjectType, addProjectType);
router.put('/types/:id', validateProjectType, updateProjectType);
router.delete('/types/:id', deleteProjectType);

// Budget Ranges Management
router.post('/budgets', validateBudgetRange, addBudgetRange);
router.put('/budgets/:id', validateBudgetRange, updateBudgetRange);
router.delete('/budgets/:id', deleteBudgetRange);

// Timeline Options Management
router.post('/timelines', validateTimeline, addTimeline);
router.put('/timelines/:id', validateTimeline, updateTimeline);
router.delete('/timelines/:id', deleteTimeline);

// Project Requests Management
router.get('/requests', getProjectRequests);
router.get('/requests/:id', getProjectRequestById);
router.put('/requests/:id/status', updateProjectRequestStatus);

export default router;