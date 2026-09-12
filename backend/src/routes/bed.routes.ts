import { Router } from 'express';
import { getWards, updateBedStatus } from '../controllers/bed.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();
router.get('/wards', authenticateToken, getWards);
router.patch('/beds/:id/status', authenticateToken, updateBedStatus);
export default router;
