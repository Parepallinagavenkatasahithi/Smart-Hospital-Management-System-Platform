import { Router } from 'express';
import { getMedicines, addMedicine } from '../controllers/pharmacy.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();
router.get('/', authenticateToken, getMedicines);
router.post('/', authenticateToken, addMedicine);
export default router;
