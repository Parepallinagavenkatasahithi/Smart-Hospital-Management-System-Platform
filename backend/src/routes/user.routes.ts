import { Router } from 'express';
import { getUsers, toggleUserStatus } from '../controllers/user.controller';
import { authenticateToken, authorizeRoles } from '../middleware/auth.middleware';

const router = Router();
router.get('/', authenticateToken, authorizeRoles('ADMIN', 'MANAGEMENT'), getUsers);
router.patch('/:id/toggle-status', authenticateToken, authorizeRoles('ADMIN', 'MANAGEMENT'), toggleUserStatus);
export default router;
