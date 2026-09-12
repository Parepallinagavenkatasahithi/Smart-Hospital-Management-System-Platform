import { Router } from 'express';
import { getMedicalRecords, createMedicalRecord } from '../controllers/record.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();
router.get('/', authenticateToken, getMedicalRecords);
router.post('/', authenticateToken, createMedicalRecord);
export default router;
