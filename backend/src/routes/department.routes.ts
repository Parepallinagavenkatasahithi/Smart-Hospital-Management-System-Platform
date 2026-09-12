import { Router } from 'express';
import { getDepartments } from '../controllers/department.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();
router.get('/', authenticateToken, getDepartments);
export default router;
