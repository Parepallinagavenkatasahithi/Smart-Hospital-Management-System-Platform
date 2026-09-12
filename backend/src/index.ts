import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import patientRoutes from './routes/patient.routes';
import appointmentRoutes from './routes/appointment.routes';
import doctorRoutes from './routes/doctor.routes';
import recordRoutes from './routes/record.routes';
import prescriptionRoutes from './routes/prescription.routes';
import pharmacyRoutes from './routes/pharmacy.routes';
import labRoutes from './routes/lab.routes';
import bedRoutes from './routes/bed.routes';
import billingRoutes from './routes/billing.routes';
import notificationRoutes from './routes/notification.routes';
import reportRoutes from './routes/report.routes';
import aiRoutes from './routes/ai.routes';
import auditRoutes from './routes/audit.routes';
import departmentRoutes from './routes/department.routes';
import userRoutes from './routes/user.routes';
import { errorHandler } from './middleware/error.middleware';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/records', recordRoutes);
app.use('/api/prescriptions', prescriptionRoutes);
app.use('/api/pharmacy', pharmacyRoutes);
app.use('/api/lab', labRoutes);
app.use('/api/beds', bedRoutes);
app.use('/api/billing', billingRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/audit', auditRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/users', userRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', service: 'Smart Hospital Management System API', version: '2.0.0' });
});

// Centralized error handling
app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
