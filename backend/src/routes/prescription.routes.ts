import { Router } from 'express';
import { getPrescriptions, createPrescription, dispensePrescription } from '../controllers/prescription.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();
router.get('/', authenticateToken, getPrescriptions);
router.post('/', authenticateToken, createPrescription);
router.patch('/:id/dispense', authenticateToken, dispensePrescription);
export default router;
