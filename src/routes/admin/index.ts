import { Router } from 'express';
import homeRoutes from './home.routes';
import aboutRoutes from './about.routes';
import executivesRoutes from './executives.routes';
import projectsRoutes from './projects.routes';
import servicesRoutes from './services.routes';
import socialRoutes from './social.routes';
import contactRoutes from './contact.routes';

const router = Router();

// Mount all admin routes
router.use('/home', homeRoutes);
router.use('/about', aboutRoutes);
router.use('/executives', executivesRoutes);
router.use('/projects', projectsRoutes);
router.use('/services', servicesRoutes);
router.use('/social', socialRoutes);
router.use('/contact', contactRoutes);

export default router;