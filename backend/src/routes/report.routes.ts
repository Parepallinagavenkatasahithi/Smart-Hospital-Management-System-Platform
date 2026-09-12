import { Router } from 'express';
import { getExecutiveAnalytics } from '../controllers/report.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();
router.get('/executive', authenticateToken, getExecutiveAnalytics);
export default router;
