import { Router } from 'express';
import { getPatients, getPatientById, createPatient } from '../controllers/patient.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

router.get('/', authenticateToken, getPatients);
router.get('/:id', authenticateToken, getPatientById);
router.post('/', authenticateToken, createPatient);

export default router;
