import { Router } from 'express';
import { getLabRequests, createLabRequest, updateLabStatus } from '../controllers/lab.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();
router.get('/', authenticateToken, getLabRequests);
router.post('/', authenticateToken, createLabRequest);
router.patch('/:id/status', authenticateToken, updateLabStatus);
export default router;
