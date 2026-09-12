import { Router } from 'express';
import { getAppointments, createAppointment, updateAppointmentStatus } from '../controllers/appointment.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

router.get('/', authenticateToken, getAppointments);
router.post('/', authenticateToken, createAppointment);
router.patch('/:id/status', authenticateToken, updateAppointmentStatus);

export default router;
