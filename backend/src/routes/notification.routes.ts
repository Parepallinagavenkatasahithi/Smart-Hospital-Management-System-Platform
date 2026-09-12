import { Router } from 'express';
import { getNotifications, markAsRead } from '../controllers/notification.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();
router.get('/', authenticateToken, getNotifications);
router.patch('/:id/read', authenticateToken, markAsRead);
export default router;
