import { Router } from 'express';
import { getAuditLogs } from '../controllers/audit.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();
router.get('/', authenticateToken, getAuditLogs);
export default router;
