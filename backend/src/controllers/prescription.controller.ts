import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth.middleware';

const prisma = new PrismaClient();

export const getPrescriptions = async (req: AuthRequest, res: Response) => {
  try {
    const patientId = req.query.patientId as string;
    const where: any = {};
    if (patientId) where.patientId = patientId;

    if (req.user?.role === 'PATIENT') {
      const p = await prisma.patient.findUnique({ where: { userId: req.user.userId } });
      if (p) where.patientId = p.id;
    }

    const prescriptions = await prisma.prescription.findMany({
      where,
      include: {
        patient: { include: { user: true } },
        doctor: { include: { user: true } },
        items: { include: { medicine: true } }
      },
      orderBy: { createdAt: 'desc' }
    });

    return res.status(200).json({ success: true, data: prescriptions });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: error.message } });
  }
};

export const createPrescription = async (req: AuthRequest, res: Response) => {
  try {
    const { patientId, doctorId, notes, items } = req.body;
    let docId = doctorId;
    if (req.user?.role === 'DOCTOR') {
      const staff = await prisma.staff.findUnique({ where: { userId: req.user.userId } });
      if (staff) docId = staff.id;
    }

    const prescription = await prisma.prescription.create({
      data: {
        rxNo: `RX-${Date.now()}`,
        patientId,
        doctorId: docId,
        notes,
        items: {
          create: items.map((item: any) => ({
            medicineId: item.medicineId,
            dosage: item.dosage,
            frequency: item.frequency,
            duration: item.duration,
            instructions: item.instructions
          }))
        }
      },
      include: { items: { include: { medicine: true } } }
    });

    return res.status(201).json({ success: true, data: prescription });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: error.message } });
  }
};

export const dispensePrescription = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const prescription = await prisma.prescription.update({
      where: { id },
      data: {
        isDispensed: true,
        dispensedAt: new Date()
      }
    });

    return res.status(200).json({ success: true, data: prescription });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: { code: 'SERVER_ERROR', message: error.message } });
  }
};
