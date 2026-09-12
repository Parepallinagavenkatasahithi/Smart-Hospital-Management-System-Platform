import { Router } from 'express';
import { getInvoices, createInvoice, recordPayment } from '../controllers/billing.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();
router.get('/', authenticateToken, getInvoices);
router.post('/', authenticateToken, createInvoice);
router.post('/payments', authenticateToken, recordPayment);
export default router;
