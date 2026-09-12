import { Router } from 'express';
import { login, registerPatient } from '../controllers/auth.controller';

const router = Router();

router.post('/login', login);
router.post('/register', registerPatient);

export default router;
