import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth.middleware';

const prisma = new PrismaClient();

export const getMedicalRecords = async (req: AuthRequest, res: Response) => {
  try {
    const patientId = req.query.patientId as string;
    const doctorId = req.query.doctorId as string;

    const where: any = {};
    if (patientId) where.patientId = patientId;
    if (doctorId) where.doctorId = doctorId;

    if (req.user?.role === 'PATIENT') {
      const patient = await prisma.patient.findUnique({ where: { userId: req.user.userId } });
      if (patient) where.patientId = patient.id;
    }

    const records = await prisma.medicalRecord.findMany({
      where,
      include: {
        patient: { include: { user: true } },
        doctor: { include: { user: true } },
        clinicalNotesList: true,
        diagnoses: true,
        procedures: true
      },
      orderBy: { visitDate: 'desc' }
    });

    return res.status(200).json({ success: true, data: records });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: error.message } });
  }
};

export const createMedicalRecord = async (req: AuthRequest, res: Response) => {
  try {
    const { patientId, doctorId, symptoms, diagnosis, clinicalNotes, vitals, followUpInstructions } = req.body;

    let docId = doctorId;
    if (req.user?.role === 'DOCTOR') {
      const staff = await prisma.staff.findUnique({ where: { userId: req.user.userId } });
      if (staff) docId = staff.id;
    }

    const record = await prisma.medicalRecord.create({
      data: {
        recordNo: `REC-${Date.now()}`,
        patientId,
        doctorId: docId,
        symptoms,
        diagnosis,
        clinicalNotes,
        vitals,
        followUpInstructions
      },
      include: {
        patient: { include: { user: true } },
        doctor: { include: { user: true } }
      }
    });

    return res.status(201).json({ success: true, data: record });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: error.message } });
  }
};
