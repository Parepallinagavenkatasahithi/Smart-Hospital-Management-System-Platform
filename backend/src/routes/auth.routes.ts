import { Router } from 'express';
import { login, getMe, register } from '../controllers/auth.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

router.post('/login', login);
router.post('/register', register);
router.get('/me', authenticateToken, getMe);

export default router;
