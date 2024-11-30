import { Router } from 'express';
import { login, verifyToken } from '../controllers/admin.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

router.post('/login', login);
router.get('/verify', authenticate, verifyToken);

export default router;