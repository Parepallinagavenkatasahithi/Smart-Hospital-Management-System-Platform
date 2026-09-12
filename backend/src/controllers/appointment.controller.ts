import { Response } from 'express';
import { PrismaClient, AppointmentStatus } from '@prisma/client';
import { AuthRequest } from '../middleware/auth.middleware';

const prisma = new PrismaClient();

export const getAppointments = async (req: AuthRequest, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const status = req.query.status as string;
    const doctorId = req.query.doctorId as string;
    const patientId = req.query.patientId as string;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (status) where.status = status;
    if (doctorId) where.doctorId = doctorId;
    if (patientId) where.patientId = patientId;

    if (req.user?.role === 'PATIENT') {
      const patient = await prisma.patient.findUnique({ where: { userId: req.user.userId } });
      if (patient) where.patientId = patient.id;
    } else if (req.user?.role === 'DOCTOR') {
      const staff = await prisma.staff.findUnique({ where: { userId: req.user.userId } });
      if (staff) where.doctorId = staff.id;
    }

    const [appointments, total] = await Promise.all([
      prisma.appointment.findMany({
        where,
        skip,
        take: limit,
        include: {
          patient: { include: { user: true } },
          doctor: { include: { user: true } },
          department: true
        },
        orderBy: { appointmentDate: 'desc' }
      }),
      prisma.appointment.count({ where })
    ]);

    return res.status(200).json({
      success: true,
      data: appointments,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) }
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: error.message } });
  }
};

export const createAppointment = async (req: AuthRequest, res: Response) => {
  try {
    const { patientId, doctorId, departmentId, appointmentDate, timeSlot, reason } = req.body;

    let targetPatientId = patientId;
    if (req.user?.role === 'PATIENT') {
      const p = await prisma.patient.findUnique({ where: { userId: req.user.userId } });
      if (p) targetPatientId = p.id;
    }

    if (!targetPatientId || !doctorId || !departmentId || !appointmentDate) {
      return res.status(400).json({ success: false, error: { code: 'BAD_REQUEST', message: 'Missing required appointment parameters' } });
    }

    const appointment = await prisma.appointment.create({
      data: {
        appointmentNo: `APT-${Date.now()}`,
        patientId: targetPatientId,
        doctorId,
        departmentId,
        appointmentDate: new Date(appointmentDate),
        timeSlot: timeSlot || '09:00 AM',
        reason,
        status: AppointmentStatus.SCHEDULED
      },
      include: {
        patient: { include: { user: true } },
        doctor: { include: { user: true } },
        department: true
      }
    });

    return res.status(201).json({ success: true, data: appointment });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: error.message } });
  }
};

export const updateAppointmentStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    const appointment = await prisma.appointment.update({
      where: { id },
      data: {
        status: status as AppointmentStatus,
        notes: notes || undefined
      }
    });

    return res.status(200).json({ success: true, data: appointment });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: error.message } });
  }
};
