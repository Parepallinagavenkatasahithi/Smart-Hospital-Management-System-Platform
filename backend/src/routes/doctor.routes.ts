import { Router } from 'express';
import { getDoctors } from '../controllers/doctor.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();
router.get('/', authenticateToken, getDoctors);
export default router;
