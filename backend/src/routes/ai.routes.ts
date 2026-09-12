import { Router } from 'express';
import { proxyAIChat, proxyAISummarize } from '../controllers/ai.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();
router.post('/chat', authenticateToken, proxyAIChat);
router.post('/summarize', authenticateToken, proxyAISummarize);
export default router;
